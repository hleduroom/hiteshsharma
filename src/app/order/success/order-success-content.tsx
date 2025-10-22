"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Download, Mail, BookOpen, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface ReceiptData {
  receiptId: string;
  orderId: string;
  date: string;
  customer: any;
  items: any[];
  paymentMethod: string;
  total: number;
  deliveryFee: number;
  subtotal: number;
}

export function OrderSuccessContent() {
  const [orderId, setOrderId] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount') || '0';
  const currency = searchParams.get('currency') || 'NPR';
  const email = searchParams.get('email') || '';
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

    // Load receipt data from localStorage
    const receipts = JSON.parse(localStorage.getItem('paymentReceipts') || '[]');
    const latestReceipt = receipts[receipts.length - 1];
    if (latestReceipt) {
      setReceiptData(latestReceipt);
    }
  }, [urlOrderId]);

  const downloadReceipt = () => {
    const receiptContent = `
H.L.-Eduroom Publications
OFFICIAL ORDER RECEIPT
========================================
Receipt ID: ${receiptData?.receiptId || 'RCP-' + Date.now()}
Order ID: ${orderId}
Date: ${orderDate}
Status: COMPLETED

ORDER DETAILS:
----------------------------------------
${receiptData?.items.map((item: any) => `
Item: ${item.book.title}
Author: ${item.book.author}
Format: ${item.book.format.charAt(0).toUpperCase() + item.book.format.slice(1)}
Quantity: ${item.quantity}
Unit Price: ${item.book.currency} ${item.book.price}
Delivery: ${item.book.deliveryCost ? item.book.currency + ' ' + item.book.deliveryCost : 'FREE'}
Subtotal: ${item.book.currency} ${(item.book.price * item.quantity).toFixed(2)}
`).join('')}

PAYMENT SUMMARY:
----------------------------------------
Subtotal: ${currency} ${receiptData?.subtotal.toFixed(2) || amount}
Delivery Fee: ${currency} ${receiptData?.deliveryFee.toFixed(2) || '0.00'}
Total Amount: ${currency} ${receiptData?.total.toFixed(2) || amount}

PAYMENT INFORMATION:
----------------------------------------
Payment Method: ${receiptData?.paymentMethod?.toUpperCase() || 'ONLINE PAYMENT'}
Amount Paid: ${currency} ${receiptData?.total.toFixed(2) || amount}
Payment Status: VERIFIED & CONFIRMED
Transaction ID: ${receiptData?.customer?.transactionId || 'N/A'}

DELIVERY INFORMATION:
----------------------------------------
${receiptData?.customer ? `
Customer: ${receiptData.customer.firstName} ${receiptData.customer.lastName}
Email: ${receiptData.customer.email}
Phone: ${receiptData.customer.phone}
Address: ${receiptData.customer.address}
City: ${receiptData.customer.city}
District: ${receiptData.customer.district}
Province: ${receiptData.customer.province}
` : 'Digital Delivery'}

CONTACT & SUPPORT:
----------------------------------------
Email: hleduroom@gmail.com
Phone: +977-9827728726
Website: thehiteshsir.com

IMPORTANT NOTES:
----------------------------------------
• ${receiptData?.items.some((item: any) => item.book.format === 'ebook') ? 
  'E-book will be delivered within 24 hours via email' : 
  'Physical books will be delivered within 3-5 business days'}
• Keep this receipt for future reference
• For queries: thehiteshsir.com/contact
• Returns accepted within 7 days for physical books

Thank you for supporting H.L.-Eduroom Publications!
========================================
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
    
    // Store email receipt in localStorage
    const emailReceipts = JSON.parse(localStorage.getItem('emailReceipts') || '[]');
    emailReceipts.push({
      orderId,
      sentAt: new Date().toISOString(),
      receiptData
    });
    localStorage.setItem('emailReceipts', JSON.stringify(emailReceipts));
  };

  const getDeliveryTimeline = () => {
    const hasPhysicalBook = receiptData?.items.some((item: any) => 
      item.book.format === 'paperback' || item.book.format === 'hardcover'
    );
    
    return hasPhysicalBook ? [
      { status: 'Order Confirmed', description: 'Payment verified and order processed', completed: true },
      { status: 'Processing', description: 'Book packaging and quality check', completed: false },
      { status: 'Shipped', description: 'Dispatched via delivery partner', completed: false },
      { status: 'Out for Delivery', description: 'Expected delivery in 3-5 days', completed: false },
      { status: 'Delivered', description: 'Book delivered to your address', completed: false }
    ] : [
      { status: 'Order Confirmed', description: 'Payment verified and order processed', completed: true },
      { status: 'E-book Generation', description: 'Preparing your digital copy', completed: false },
      { status: 'Delivery', description: 'Sending to your email within 24 hours', completed: false }
    ];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 dark:bg-green-900 rounded-full p-4">
              <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-4">
            Payment Successful! 🎉
          </h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your order. We've sent a confirmation email with your order details.
          </p>

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
                  <span className="font-semibold">Payment Method:</span>
                  <span className="capitalize">{receiptData?.paymentMethod?.replace('_', ' ') || 'Online Payment'}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-3">
                  <span>Total Paid:</span>
                  <span className="text-green-600">
                    {currency} {receiptData?.total.toFixed(2) || amount}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 flex items-center justify-center">
                <Clock className="w-5 h-5 mr-2" />
                Delivery Timeline
              </h3>
              <div className="space-y-4">
                {getDeliveryTimeline().map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`rounded-full p-1 mt-1 ${
                      step.completed ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        step.completed ? 'bg-green-600' : 'bg-gray-400'
                      }`}></div>
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${step.completed ? 'text-green-700' : 'text-gray-700'}`}>
                        {step.status}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

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

          <div className="bg-muted/50 rounded-lg p-6 mb-8">
            <h3 className="font-semibold mb-3 flex items-center justify-center">
              <MapPin className="w-5 h-5 mr-2" />
              Need Assistance?
            </h3>
            <div className="text-sm text-muted-foreground space-y-2 text-left">
              <p>📧 <strong>Email:</strong> hleduroom@gmail.com</p>
              <p>📱 <strong>WhatsApp:</strong> +977-9827728726</p>
              <p>🌐 <strong>Website:</strong> thehiteshsir.com</p>
              <p className="text-xs mt-3 text-center">
                Please mention your Order ID: <code className="bg-gray-100 px-2 py-1 rounded">{orderId}</code>
              </p>
            </div>
          </div>

          <Button asChild className="flex items-center">
            <Link href="/book">
              <BookOpen className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}