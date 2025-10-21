import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { emailService } from '@/lib/server/email';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, notes } = body;

    const order = await prisma.order.update({
      where: { id },
      data: {
        status,
        notes
      },
      include: {
        items: {
          include: {
            book: true
          }
        }
      }
    });

    // Send status update email to customer
    if (status === 'CONFIRMED' || status === 'SHIPPED' || status === 'DELIVERED') {
      await emailService.sendStatusUpdate({
        customerEmail: order.customerEmail,
        customerName: order.customerName,
        orderId: order.orderId,
        bookTitle: order.items[0].book.title,
        status,
        notes
      });
    }

    return NextResponse.json({ 
      success: true, 
      order,
      message: 'Order status updated successfully' 
    });
  } catch (error) {
    console.error('Order update error:', error);
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            book: true
          }
        }
      }
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}