"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Download, Mail, BookOpen, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { bookData } from '@/lib/data/book';

export default function OrderSuccessPage() {
  const [orderId, setOrderId] = useState('');
  const [orderDate, setOrderDate] = useState('');

  useEffect(() => {
    // Generate random order ID and current date
    setOrderId(`ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
    setOrderDate(new Date().toLocaleDateString());
  }, []);

  const downloadReceipt = () => {
    const receiptContent = `
H.L.-Eduroom Publications
Order Confirmation Receipt
----------------------------------------
Order ID: ${orderId}
Date: ${orderDate}

Item: ${bookData.title}
Author: ${bookData.author}
Quantity: 1
Price: ${bookData.currency} ${bookData.price}

Total Amount: ${bookData.currency} ${bookData.price}
Payment Method: Credit Card
Status: Completed

Thank you for your purchase!
Your e-book download link will be sent to your email.

Contact: hleduroom@gmail.com
Website: thehiteshsir.com
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
    // In a real app, this would send an email via your backend
    alert('Receipt has been sent to your email!');
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
            Order Confirmed!
          </h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your purchase. Your order has been successfully processed.
          </p>

          {/* Order Details Card */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="space-y-4 text-left">
                <div className="flex justify-between">
                  <span className="font-semibold">Order ID:</span>
                  <span className="font-mono">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Date:</span>
                  <span>{orderDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Item:</span>
                  <span>{bookData.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Amount:</span>
                  <span className="font-bold text-lg">
                    {bookData.currency} {bookData.price}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Status:</span>
                  <span className="text-green-600 font-semibold">Completed</span>
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
            <Button variant="outline" asChild className="flex items-center">
              <Link href={`/ebook/${bookData.id}`}>
                <BookOpen className="w-4 h-4 mr-2" />
                Read E-book
              </Link>
            </Button>
          </div>

          {/* Additional Info */}
          <div className="bg-muted/50 rounded-lg p-6 mb-8">
            <h3 className="font-semibold mb-2">What's Next?</h3>
            <ul className="text-sm text-muted-foreground space-y-1 text-left">
              <li>• Your e-book download link has been sent to your email</li>
              <li>• You can also access your e-book from your account</li>
              <li>• For any questions, contact: hleduroom@gmail.com</li>
            </ul>
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