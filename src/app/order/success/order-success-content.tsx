"use client";

import { useEffect, useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Download, Mail, Truck, BookOpen, ArrowLeft, Clock } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const urlOrderId = searchParams.get('orderId');
  const amount = searchParams.get('amount') || '0.00';
  const currency = searchParams.get('currency') || 'NPR';
  const isPhysical = searchParams.get('isPhysical') === 'true'; 
  const shipCost = searchParams.get('shipCost') || '0.00';

  const [orderId, setOrderId] = useState(urlOrderId || `ORD-${Date.now()}`);
  const [orderDate, setOrderDate] = useState('');

  // Determine delivery information dynamically
  const deliveryInfo = useMemo(() => isPhysical ? {
    icon: Truck,
    message: "Your physical book(s) are being prepared for shipping.",
    timeline: [
      { step: "Payment Verification", detail: "Verified via E-Sewa/Khalti/Bank (2-6 Hrs)" },
      { step: "Order Processing", detail: "Book packaging and label creation." },
      { step: "Dispatched", detail: "Handed over to courier. Expected delivery: 5-7 working days." },
    ]
  } : {
    icon: BookOpen,
    message: "Your e-book(s) download links are on the way!",
    timeline: [
      { step: "Payment Verification", detail: "Verified via E-Sewa/Khalti/Bank (2-6 Hrs)" },
      { step: "E-book Link Generation", detail: "Creating your personalized, secured download link." },
      { step: "Email Delivery", detail: "Download instructions sent to your email." },
    ]
  }, [isPhysical]);

  useEffect(() => {
    setOrderDate(new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }));
  }, []);

  // 8. Payment Receipt Generator (Basic Text/Plain)
  const downloadReceipt = () => {
    const totalAmount = parseFloat(amount).toFixed(2);
    const shipping = isPhysical ? `${currency} ${parseFloat(shipCost).toFixed(2)}` : 'FREE';
    const subtotal = (parseFloat(totalAmount) - parseFloat(shipCost)).toFixed(2);

    const receiptContent = `
H.L.-Eduroom Publications
========================================
    OFFICIAL ORDER RECEIPT
========================================
Order ID: ${orderId}
Date: ${orderDate}
Status: COMPLETED

ORDER SUMMARY:
----------------------------------------
Subtotal: ${currency} ${subtotal}
Delivery Charge: ${shipping}
Tax (0%): ${currency} 0.00
----------------------------------------
TOTAL PAID: ${currency} ${totalAmount}

DELIVERY TYPE: ${isPhysical ? 'Physical Book' : 'E-book Digital'}

PAYMENT INFORMATION:
----------------------------------------
Method: E-Sewa / Khalti / Bank Transfer
Payment Status: Pending Verification (2-6 Hrs)

IMPORTANT NOTES:
----------------------------------------
• Keep this receipt for reference.
• ${deliveryInfo.timeline[2].detail}
• For queries, email hleduroom@gmail.com
========================================
Thank you for your purchase!
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
    // 6. Simulate email sending via Gmail app pass (backend action)
    alert('A detailed receipt has been sent to your email! (Simulated backend email service)');
  };

  return (
    // 🎨 Apply handwriting font
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-slate-900 font-handwriting">
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
            Order Placed! 🎉
          </h1>
          <p className="text-muted-foreground mb-8">
            {deliveryInfo.message} You will receive a definitive confirmation email after payment verification.
          </p>

          {/* Order Details Card */}
          <Card className="mb-8 border-2 border-green-300 shadow-xl">
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
                  <span className="font-semibold">Delivery Type:</span>
                  <span className="font-medium text-blue-600 flex items-center">
                     <deliveryInfo.icon className="w-4 h-4 mr-1" /> {isPhysical ? 'Physical Book Delivery' : 'E-book Digital Download'}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-3">
                  <span>Total Paid:</span>
                  <span className="text-green-600">
                    {currency} {parseFloat(amount).toFixed(2)}
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
                {deliveryInfo.timeline.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="bg-blue-100 rounded-full p-1 mt-1">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      </div>
                      <div>
                        <p className="font-medium">{item.step}</p>
                        <p className="text-sm text-muted-foreground">{item.detail}</p>
                      </div>
                    </div>
                ))}
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
