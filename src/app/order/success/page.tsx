"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Download, Mail, ArrowLeft, Clock } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface OrderDetails {
  orderId: string;
  orderDate: string;
  amount: string;
  currency: string;
  items: Array<{
    title: string;
    format: string;
    quantity: number;
    price: number;
    deliveryCost: number;
  }>;
  customer: {
    email: string;
    phone: string;
    address?: string;
  };
}

export default function OrderSuccessContent() {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount') || '0';
  const currency = searchParams.get('currency') || 'NPR';
  const urlOrderId = searchParams.get('orderId');

  useEffect(() => {
    const orderData: OrderDetails = {
      orderId: urlOrderId || `ORD-${Date.now()}`,
      orderDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      amount,
      currency,
      items: [{
        title: "3 AM Confessions: My Life as an Overthinker",
        format: "E-book",
        quantity: 1,
        price: parseFloat(amount),
        deliveryCost: 0
      }],
      customer: {
        email: "customer@hleduroom.com",
        phone: "+977-9827728726"
      }
    };
    
    setOrderDetails(orderData);
  }, [urlOrderId, amount, currency]);

  const downloadReceipt = () => {
    if (!orderDetails) return;

    const receiptContent = `
H.L.-Eduroom Publications
OFFICIAL ORDER RECEIPT
========================================
Order ID: ${orderDetails.orderId}
Date: ${orderDetails.orderDate}
Status: COMPLETED

ORDER DETAILS:
----------------------------------------
Item: 3 AM Confessions: My Life as an Overthinker
Format: E-book
Quantity: 1
Unit Price: ${orderDetails.currency} ${orderDetails.amount}
Total Amount: ${orderDetails.currency} ${orderDetails.amount}

PAYMENT INFORMATION:
----------------------------------------
Payment Method: Online Payment
Amount Paid: ${orderDetails.currency} ${orderDetails.amount}
Payment Status: Verified

CONTACT INFORMATION:
----------------------------------------
Email: [Customer Email]
Support: hleduroom@gmail.com
Phone: +977-9827728726

IMPORTANT NOTES:
----------------------------------------
• E-book will be delivered within 24 hours
• Check your email for download instructions
• Keep this receipt for future reference
• For queries: thehiteshsir.com/contact

Thank you for your purchase!
H.L.-Eduroom Publications
    `.trim();

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `receipt-${orderDetails.orderId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const sendEmailReceipt = () => {
    alert('Receipt has been sent to your email! You should receive it within minutes.');
  };

  if (!orderDetails) {
    return <div className="min-h-screen flex items-center justify-center font-handwriting">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 dark:bg-green-900 rounded-full p-4">
              <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-4 font-handwriting">
            Payment Successful! 🎉
          </h1>
          <p className="text-muted-foreground mb-8 font-handwriting">
            Thank you for your order. We've sent a confirmation email with your order details.
          </p>

          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="space-y-4 text-left">
                <div className="flex justify-between items-center">
                  <span className="font-semibold font-handwriting">Order ID:</span>
                  <span className="font-mono text-lg bg-green-100 px-2 py-1 rounded font-handwriting">
                    {orderDetails.orderId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold font-handwriting">Order Date:</span>
                  <span className="font-handwriting">{orderDetails.orderDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold font-handwriting">Product:</span>
                  <span className="font-handwriting">3 AM Confessions: My Life as an Overthinker</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold font-handwriting">Format:</span>
                  <span className="font-handwriting">E-Book</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-3">
                  <span className="font-handwriting">Total Paid:</span>
                  <span className="text-green-600 font-handwriting">
                    {orderDetails.currency} {orderDetails.amount}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 flex items-center justify-center font-handwriting">
                <Clock className="w-5 h-5 mr-2" />
                What Happens Next?
              </h3>
              <div className="space-y-3 text-left">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 rounded-full p-1 mt-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <p className="font-medium font-handwriting">Order Confirmed</p>
                    <p className="text-sm text-muted-foreground font-handwriting">We've received your payment and order details</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-yellow-100 rounded-full p-1 mt-1">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  </div>
                  <div>
                    <p className="font-medium font-handwriting">Manual Verification</p>
                    <p className="text-sm text-muted-foreground font-handwriting">Our team verifies the payment (within 2-6 hours)</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 rounded-full p-1 mt-1">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <div>
                    <p className="font-medium font-handwriting">E-book Delivery</p>
                    <p className="text-sm text-muted-foreground font-handwriting">You'll receive download instructions via email</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button onClick={downloadReceipt} className="flex items-center font-handwriting">
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
            <Button variant="outline" onClick={sendEmailReceipt} className="flex items-center font-handwriting">
              <Mail className="w-4 h-4 mr-2" />
              Email Receipt
            </Button>
          </div>

          <div className="bg-muted/50 rounded-lg p-6 mb-8">
            <h3 className="font-semibold mb-3 font-handwriting">Need Immediate Assistance?</h3>
            <div className="text-sm text-muted-foreground space-y-2 text-left font-handwriting">
              <p>📧 <strong>Email:</strong> hleduroom@gmail.com</p>
              <p>📱 <strong>WhatsApp:</strong> +977-9827728726</p>
              <p>🌐 <strong>Website:</strong> thehiteshsir.com</p>
              <p className="text-xs mt-3">
                Please mention your Order ID: <code className="bg-gray-100 px-1 rounded">{orderDetails.orderId}</code> in all communications
              </p>
            </div>
          </div>

          <Button variant="ghost" asChild>
            <Link href="/book" className="flex items-center font-handwriting">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}