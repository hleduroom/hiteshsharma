import { NextRequest, NextResponse } from 'next/server';
import { emailService } from '@/lib/server/email';

// Temporary in-memory storage for development
let orders: any[] = [];

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

    const newOrder = {
      id: Date.now().toString(),
      orderId,
      customerEmail: customer.email,
      customerName: `${customer.firstName} ${customer.lastName}`,
      customerPhone: customer.phone,
      shippingAddress: `${customer.address}, ${customer.city}, ${customer.postalCode}`,
      totalAmount: total,
      paymentMethod,
      transactionId,
      status: 'PENDING',
      items: items.map((item: any) => ({
        book: {
          title: item.book.title,
          author: item.book.author
        },
        format: item.book.bookFormat || 'ebook',
        quantity: item.quantity,
        price: item.book.formats[item.book.bookFormat || 'ebook']?.price || item.book.formats.ebook.price
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    orders.push(newOrder);

    const firstItem = newOrder.items[0];
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
      orderId: newOrder.orderId,
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

    let filteredOrders = [...orders];

    if (status) {
      filteredOrders = filteredOrders.filter(order => order.status === status);
    }

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

    return NextResponse.json({
      orders: paginatedOrders,
      pagination: {
        page,
        limit,
        total: filteredOrders.length,
        pages: Math.ceil(filteredOrders.length / limit)
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