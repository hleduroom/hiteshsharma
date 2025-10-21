"use client";

import { useState, useEffect } from 'react';
import { useCart } from '@/lib/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CreditCard, Lock, QrCode, Smartphone } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type PaymentMethod = 'card' | 'esewa' | 'khalti' | 'bank_transfer';

export default function CheckoutPage() {
  const { state, dispatch } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    transactionId: ''
  });

  // Handle empty cart redirect
  useEffect(() => {
    if (state.items.length === 0) {
      router.push('/cart');
    }
  }, [state.items.length, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Helper function to get item details
  const getItemDetails = (item: any) => {
    const format = item.book.bookFormat || 'ebook';
    const price = item.book.formats[format]?.price || item.book.formats.ebook.price;
    const currency = item.book.currency || 'NPR';
    const formatName = format.charAt(0).toUpperCase() + format.slice(1);
    
    return { price, currency, format, formatName };
  };

  const generateOrderId = () => {
    return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const orderId = generateOrderId();
      
      // Simulate API call to your backend
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          customer: formData,
          items: state.items,
          paymentMethod,
          transactionId: formData.transactionId,
          total: state.total
        }),
      });

      if (response.ok) {
        dispatch({ type: 'CLEAR_CART' });
        router.push(`/order/success?orderId=${orderId}&amount=${state.total}`);
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Show loading or nothing while redirecting
  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p>Redirecting to cart...</p>
        </div>
      </div>
    );
  }

  const selectedBook = state.items[0]?.book;
  const itemDetails = getItemDetails(state.items[0]);
  const currency = itemDetails.currency;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div className="space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="98XXXXXXXX"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="Street address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Postal Code *</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Payment Method Selection */}
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      type="button"
                      variant={paymentMethod === 'card' ? 'default' : 'outline'}
                      onClick={() => setPaymentMethod('card')}
                      className="h-16"
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Card
                    </Button>
                    <Button
                      type="button"
                      variant={paymentMethod === 'esewa' ? 'default' : 'outline'}
                      onClick={() => setPaymentMethod('esewa')}
                      className="h-16"
                    >
                      <QrCode className="w-4 h-4 mr-2" />
                      eSewa
                    </Button>
                    <Button
                      type="button"
                      variant={paymentMethod === 'khalti' ? 'default' : 'outline'}
                      onClick={() => setPaymentMethod('khalti')}
                      className="h-16"
                    >
                      <Smartphone className="w-4 h-4 mr-2" />
                      Khalti
                    </Button>
                    <Button
                      type="button"
                      variant={paymentMethod === 'bank_transfer' ? 'default' : 'outline'}
                      onClick={() => setPaymentMethod('bank_transfer')}
                      className="h-16"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Bank Transfer
                    </Button>
                  </div>

                  {/* Card Payment Form */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-4 border-t pt-4">
                      <div>
                        <Label htmlFor="nameOnCard">Name on Card *</Label>
                        <Input
                          id="nameOnCard"
                          name="nameOnCard"
                          value={formData.nameOnCard}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardNumber">Card Number *</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date *</Label>
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV *</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Digital Wallet Instructions */}
                  {(paymentMethod === 'esewa' || paymentMethod === 'khalti') && (
                    <div className="border-t pt-4 space-y-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-900 mb-2">
                          {paymentMethod === 'esewa' ? 'eSewa Payment Instructions' : 'Khalti Payment Instructions'}
                        </h4>
                        <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
                          <li>Open your {paymentMethod === 'esewa' ? 'eSewa' : 'Khalti'} app</li>
                          <li>Scan the QR code below or enter the merchant ID</li>
                          <li>Pay the amount: <strong>{currency} {state.total}</strong></li>
                          <li>Enter the transaction ID below after payment</li>
                        </ol>
                      </div>

                      {/* QR Code Placeholder */}
                      <div className="flex justify-center">
                        <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300">
                          <div className="w-48 h-48 bg-gray-100 flex items-center justify-center">
                            <QrCode className="w-16 h-16 text-gray-400" />
                          </div>
                          <p className="text-center text-sm text-gray-600 mt-2">
                            Scan with {paymentMethod === 'esewa' ? 'eSewa' : 'Khalti'} app
                          </p>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="transactionId">Transaction ID *</Label>
                        <Input
                          id="transactionId"
                          name="transactionId"
                          placeholder={`Enter ${paymentMethod === 'esewa' ? 'eSewa' : 'Khalti'} transaction ID`}
                          value={formData.transactionId}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Bank Transfer Instructions */}
                  {paymentMethod === 'bank_transfer' && (
                    <div className="border-t pt-4 space-y-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-semibold text-green-900 mb-2">Bank Transfer Details</h4>
                        <div className="text-sm text-green-800 space-y-2">
                          <p><strong>Bank:</strong> Nepal Investment Mega Bank</p>
                          <p><strong>Account Name:</strong> H.L.-Eduroom</p>
                          <p><strong>Account Number:</strong> 1234567890123456</p>
                          <p><strong>Amount:</strong> {currency} {state.total}</p>
                          <p><strong>Reference:</strong> Order {generateOrderId()}</p>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="transactionId">Transaction Reference Number *</Label>
                        <Input
                          id="transactionId"
                          name="transactionId"
                          placeholder="Enter bank transaction reference"
                          value={formData.transactionId}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {state.items.map((item) => {
                      const itemDetails = getItemDetails(item);
                      return (
                        <div key={`${item.book.id}-${itemDetails.format}`} className="flex items-center space-x-3">
                          <Image
                            src={item.book.coverImage}
                            alt={item.book.title}
                            width={60}
                            height={80}
                            className="rounded object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.book.title}</h4>
                            <p className="text-xs text-muted-foreground">
                              Format: {itemDetails.formatName} | Qty: {item.quantity}
                            </p>
                          </div>
                          <span className="font-medium">
                            {itemDetails.currency} {itemDetails.price * item.quantity}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t mt-4 pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{currency} {state.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total</span>
                      <span>{currency} {state.total}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full mt-6"
                    size="lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>Processing Payment...</>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Complete Order - {currency} {state.total}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <Lock className="w-4 h-4 mr-2" />
                Secure payment • 24/7 support • Instant confirmation
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}