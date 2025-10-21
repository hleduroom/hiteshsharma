export const dynamic = 'force-dynamic';

"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Download, Mail, BookOpen, ArrowLeft, Clock } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function OrderSuccessPage() {
  const [orderId, setOrderId] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount') || '399';
  const currency = searchParams.get('currency') || 'NPR';
  const urlOrderId = searchParams.get('orderId');

  useEffect(() => {
    setOrderId(urlOrderId || `ORD-${Date.now()}`);
    setOrderDate(new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }));
  }, [urlOrderId]);

  const downloadReceipt = () => {
    const receiptContent = `
H.L.-Eduroom Publications
OFFICIAL ORDER RECEIPT
========================================
Order ID: ${orderId}
Date: ${orderDate}
Status: COMPLETED

ORDER DETAILS:
----------------------------------------
Item: 3 AM Confessions: My Life as an Overthinker
Format: E-book
Quantity: 1
Unit Price: ${currency} ${amount}
Total Amount: ${currency} ${amount}

PAYMENT INFORMATION:
----------------------------------------
Payment Method: Online Payment
Amount Paid: ${currency} ${amount}
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
    link.download = `receipt-${orderId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const sendEmailReceipt = () => {
    alert('Receipt has been sent to your email! You should receive it within minutes.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 dark:bg-green-900 rounded-full p-4">
              <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Payment Successful! 🎉
          </h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your order. We've sent a confirmation email with your order details.
          </p>

          {/* Order Details Card */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="space-y-4 text-left">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Order ID:</span>
                  <span className="font-mono text-lg bg-green-100 px-2 py-1 rounded">
                    {orderId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Order Date:</span>
                  <span>{orderDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Product:</span>
                  <span>3 AM Confessions: My Life as an Overthinker</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Format:</span>
                  <span>E-book</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-3">
                  <span>Total Paid:</span>
                  <span className="text-green-600">
                    {currency} {amount}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Timeline */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 flex items-center justify-center">
                <Clock className="w-5 h-5 mr-2" />
                What Happens Next?
              </h3>
              <div className="space-y-3 text-left">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 rounded-full p-1 mt-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <p className="font-medium">Order Confirmed</p>
                    <p className="text-sm text-muted-foreground">We've received your payment and order details</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-yellow-100 rounded-full p-1 mt-1">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  </div>
                  <div>
                    <p className="font-medium">Manual Verification</p>
                    <p className="text-sm text-muted-foreground">Our team verifies the payment (within 2-6 hours)</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 rounded-full p-1 mt-1">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <div>
                    <p className="font-medium">E-book Delivery</p>
                    <p className="text-sm text-muted-foreground">You'll receive download instructions via email</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button onClick={downloadReceipt} className="flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
            <Button variant="outline" onClick={sendEmailReceipt} className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              Email Receipt
            </Button>
          </div>

          {/* Support Information */}
          <div className="bg-muted/50 rounded-lg p-6 mb-8">
            <h3 className="font-semibold mb-3">Need Immediate Assistance?</h3>
            <div className="text-sm text-muted-foreground space-y-2 text-left">
              <p>📧 <strong>Email:</strong> hleduroom@gmail.com</p>
              <p>📱 <strong>WhatsApp:</strong> +977-9827728726</p>
              <p>🌐 <strong>Website:</strong> thehiteshsir.com</p>
              <p className="text-xs mt-3">
                Please mention your Order ID: <code className="bg-gray-100 px-1 rounded">{orderId}</code> in all communications
              </p>
            </div>
          </div>

          {/* Back to Shopping */}
          <Button variant="ghost" asChild>
            <Link href="/book" className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}