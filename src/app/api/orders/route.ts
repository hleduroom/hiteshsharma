import { NextRequest, NextResponse } from 'next/server';
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

    // Send confirmation email to customer
    await emailService.sendOrderConfirmation({
      customerEmail: customer.email,
      customerName: `${customer.firstName} ${customer.lastName}`,
      orderId,
      bookTitle: items[0].book.title,
      format: items[0].bookFormat || 'ebook',
      price: total,
      currency: items[0].book.currency,
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
      bookTitle: items[0].book.title,
      format: items[0].bookFormat || 'ebook',
      price: total,
      currency: items[0].book.currency,
      transactionId,
      paymentMethod: getPaymentMethodName(paymentMethod)
    });

    return NextResponse.json({ 
      success: true, 
      orderId,
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

function getPaymentMethodName(method: string): string {
  const methods: { [key: string]: string } = {
    card: 'Credit/Debit Card',
    esewa: 'eSewa',
    khalti: 'Khalti',
    bank_transfer: 'Bank Transfer'
  };
  return methods[method] || method;
}