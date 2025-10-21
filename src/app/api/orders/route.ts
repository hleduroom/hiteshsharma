import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { emailService } from '@/lib/server/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      orderId,
      customer,
      items,
      paymentMethod,
      transactionId,
      total
    } = body;

    // Create order in database
    const order = await prisma.order.create({
      data: {
        orderId,
        customerEmail: customer.email,
        customerName: `${customer.firstName} ${customer.lastName}`,
        customerPhone: customer.phone,
        shippingAddress: `${customer.address}, ${customer.city}, ${customer.postalCode}`,
        totalAmount: total,
        paymentMethod,
        transactionId,
        status: 'PENDING',
        items: {
          create: items.map((item: any) => ({
            bookId: item.book.id,
            format: item.book.bookFormat || 'ebook',
            quantity: item.quantity,
            price: item.book.formats[item.book.bookFormat || 'ebook']?.price || item.book.formats.ebook.price
          }))
        }
      },
      include: {
        items: {
          include: {
            book: true
          }
        }
      }
    });

    const firstItem = order.items[0];
    const format = firstItem.format;
    const formatName = format.charAt(0).toUpperCase() + format.slice(1);

    // Send confirmation email to customer
    await emailService.sendOrderConfirmation({
      customerEmail: customer.email,
      customerName: `${customer.firstName} ${customer.lastName}`,
      orderId,
      bookTitle: firstItem.book.title,
      format: formatName,
      price: total,
      currency: 'NPR',
      transactionId,
      paymentMethod: getPaymentMethodName(paymentMethod)
    });

    // Send notification to admin
    await emailService.sendAdminNotification({
      customerEmail: customer.email,
      customerName: `${customer.firstName} ${customer.lastName}`,
      customerPhone: customer.phone,
      shippingAddress: `${customer.address}, ${customer.city}, ${customer.postalCode}`,
      orderId,
      bookTitle: firstItem.book.title,
      format: formatName,
      price: total,
      currency: 'NPR',
      transactionId,
      paymentMethod: getPaymentMethodName(paymentMethod)
    });

    return NextResponse.json({ 
      success: true, 
      orderId: order.orderId,
      message: 'Order processed successfully' 
    });
  } catch (error) {
    console.error('Order processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process order' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');

    const skip = (page - 1) * limit;

    const where = status ? { status } : {};

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          items: {
            include: {
              book: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit
      }),
      prisma.order.count({ where })
    ]);

    return NextResponse.json({
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

function getPaymentMethodName(method: string): string {
  const methods: { [key: string]: string } = {
    card: 'Credit/Debit Card',
    esewa: 'eSewa',
    khalti: 'Khalti',
    bank_transfer: 'Bank Transfer'
  };
  return methods[method] || method;
}