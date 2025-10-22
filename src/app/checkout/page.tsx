"use client";

import { useState, useEffect, useMemo } from 'react';
import { useCart } from '@/lib/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, QrCode, Smartphone, Banknote, Package, BookOpen, Lock } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// 🇳🇵 NEPAL LOCATIONS DATA
const NEPAL_PROVINCES = [
    { id: '1', name: 'Koshi Province', districts: ['Taplejung', 'Jhapa', 'Morang', 'Sunsari', 'Dhankuta', 'Ilam', 'Udayapur'] },
    { id: '2', name: 'Madhesh Province', districts: ['Saptari', 'Siraha', 'Dhanusha', 'Mahottari', 'Sarlahi', 'Rautahat', 'Bara', 'Parsa'] },
    { id: '3', name: 'Bagmati Province', districts: ['Kathmandu', 'Lalitpur', 'Bhaktapur', 'Chitwan', 'Makwanpur', 'Dhading', 'Nuwakot'] },
    { id: '4', name: 'Gandaki Province', districts: ['Kaski', 'Tanahun', 'Syangja', 'Gorkha', 'Lamjung', 'Manang', 'Mustang'] },
    { id: '5', name: 'Lumbini Province', districts: ['Rupandehi', 'Kapilvastu', 'Banke', 'Bardiya', 'Dang', 'Palpa', 'Gulmi'] },
    { id: '6', name: 'Karnali Province', districts: ['Surkhet', 'Dailekh', 'Jumla', 'Kalikot', 'Mugu', 'Humla', 'Dolpa'] },
    { id: '7', name: 'Sudurpashchim Province', districts: ['Kailali', 'Kanchanpur', 'Doti', 'Achham', 'Bajhang', 'Baitadi', 'Darchula'] },
];

type PaymentMethod = 'esewa' | 'khalti' | 'bank_transfer';

// 5. Secure QR Code Paths
const QR_PATHS = {
  esewa: '/esewa-qr.png',
  khalti: '/khalti-qr.png',
  bank_transfer: '/mbl-qr.png', // mbl-qr.png for bank transfer
}

export default function CheckoutPage() {
  const { state, dispatch } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('esewa');
  const [selectedProvince, setSelectedProvince] = useState<string>('3'); // Default to Bagmati
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Kathmandu');

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    transactionId: '',
  });

  // 4. Check if any physical book is in the cart
  const needsShipping = useMemo(() => {
    return state.items.some(item => item.book.format !== 'ebook');
  }, [state.items]);

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

  const currentProvince = NEPAL_PROVINCES.find(p => p.id === selectedProvince);
  const totalCurrency = state.items[0]?.book.currency || 'NPR';

  const generateOrderId = () => {
    return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 4. Ebook flow validation: Skip shipping validation if ebook only
    if (needsShipping) {
        if (!selectedProvince || !selectedDistrict || !formData.address) {
            alert('Please complete the **Delivery Address** details for your physical book(s).');
            return;
        }
    }

    if (!formData.transactionId) {
         alert('Please enter the Transaction ID/Reference to verify your payment.');
         return;
    }

    setIsProcessing(true);

    try {
      const orderId = generateOrderId();
      const shippingAddress = needsShipping ? {
          province: currentProvince?.name,
          district: selectedDistrict,
          address: formData.address,
      } : { province: 'Digital', district: 'Digital', address: 'N/A' };


      // 6. Simulate API call to your backend
      // In a real application, the backend handles storing the order, verifying payment,
      // and sending the email receipt via Gmail App Pass.
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          customer: { ...formData, name: `${formData.firstName} ${formData.lastName}` },
          shippingAddress,
          items: state.items,
          paymentMethod,
          transactionId: formData.transactionId,
          subtotal: state.subtotal,
          shipping: state.shipping,
          total: state.total
        }),
      });

      if (response.ok) {
        // 7. Clear cart and redirect to success page with full order details for receipt generation
        dispatch({ type: 'CLEAR_CART' });
        router.push(`/order/success?orderId=${orderId}&amount=${state.total.toFixed(2)}&currency=${totalCurrency}&isPhysical=${needsShipping}&shipCost=${state.shipping.toFixed(2)}`);
      } else {
        throw new Error('Order processing failed.');
      }
    } catch (error) {
      console.error('Order error:', error);
      alert('Order failed. Please check your details and try again.');
    } finally {
      setIsProcessing(false);
    }
  };


  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 flex items-center justify-center font-handwriting">
        <div className="text-center">
          <p>Redirecting to cart...</p>
        </div>
      </div>
    );
  }

  return (
    // 🎨 Apply handwriting font
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 font-handwriting">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Secure Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div className="space-y-6">
              
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><Smartphone className="w-5 h-5 mr-2" /> Contact & Name</CardTitle>
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
                      placeholder="e.g., yourname@gmail.com"
                    />
                  </div>
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
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="98XXXXXXXX (For updates)"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address - Conditional Display */}
              {needsShipping ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center"><Package className="w-5 h-5 mr-2" /> Delivery Address (Nepal)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* 3. Nepal Locations */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="province">Province *</Label>
                            <Select onValueChange={setSelectedProvince} value={selectedProvince} required>
                                <SelectTrigger id="province">
                                    <SelectValue placeholder="Select Province" />
                                </SelectTrigger>
                                <SelectContent>
                                    {NEPAL_PROVINCES.map(p => (
                                        <SelectItem key={p.id} value={p.id}>
                                            {p.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="district">District *</Label>
                             <Select onValueChange={setSelectedDistrict} value={selectedDistrict} required>
                                <SelectTrigger id="district" disabled={!selectedProvince}>
                                    <SelectValue placeholder="Select District" />
                                </SelectTrigger>
                                <SelectContent>
                                    {currentProvince?.districts.map(d => (
                                        <SelectItem key={d} value={d}>
                                            {d}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Full Address */}
                    <div>
                      <Label htmlFor="address">Tole/Street Address *</Label>
                      <Input
                        id="address"
                        name="address"
                        placeholder="Tole name, House/Flat No."
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    {/* Map Integration Placeholder */}
                    <div className="border-t pt-4">
                         <h4 className="font-semibold mb-2 flex items-center"><MapPin className="w-4 h-4 mr-2" /> Pinpoint Location (Accurate Delivery)</h4>
                         <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center border-dashed border-2 border-gray-300">
                             <span className="text-gray-500 text-sm">Interactive Map Component Placeholder</span>
                         </div>
                    </div>

                  </CardContent>
                </Card>
              ) : (
                <Card className="border-green-500 bg-green-50/50">
                    <CardContent className="p-4 flex items-center">
                        <BookOpen className="w-5 h-5 text-green-600 mr-3" />
                        <p className="text-sm font-semibold text-green-800">
                           **E-book Only:** Delivery address is not required! You will receive your download link via email.
                        </p>
                    </CardContent>
                </Card>
              )}


              {/* Payment Method - No Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><Banknote className="w-5 h-5 mr-2" /> Select Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  
                  <div className="grid grid-cols-3 gap-4">
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
                      <Banknote className="w-4 h-4 mr-2" />
                      Bank Pay
                    </Button>
                  </div>

                  {/* Payment Instructions & QR Codes */}
                  {(paymentMethod === 'esewa' || paymentMethod === 'khalti' || paymentMethod === 'bank_transfer') && (
                    <div className="border-t pt-4 space-y-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-900 mb-2">
                           Payment Instructions
                        </h4>
                        <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
                          <li>Scan the QR code or use the details provided below.</li>
                          <li>Pay the **exact amount**: <strong>{totalCurrency} {state.total.toFixed(2)}</strong></li>
                          <li>**Crucial:** Enter the transaction ID/Reference below for verification.</li>
                        </ol>
                      </div>

                      {/* QR Code and Bank Details */}
                      <div className="flex justify-center flex-col items-center gap-4">
                        <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300">
                          <Image
                            src={QR_PATHS[paymentMethod]}
                            alt={`${paymentMethod} QR Code`}
                            width={200}
                            height={200}
                            className="w-48 h-48 object-contain"
                          />
                          <p className="text-center text-sm text-gray-600 mt-2">
                            Scan to Pay (Path: {QR_PATHS[paymentMethod]})
                          </p>
                        </div>
                        
                        {paymentMethod === 'bank_transfer' && (
                            <div className="text-sm bg-gray-100 p-4 rounded-lg">
                              <p><strong>Bank:</strong> Mega Bank Nepal Ltd. (MBL)</p>
                              <p><strong>Account Name:</strong> H.L.-Eduroom</p>
                              <p><strong>Account Number:</strong> 1234567890123456</p>
                            </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Transaction ID Input */}
                  <div>
                    <Label htmlFor="transactionId">Transaction ID / Reference Number *</Label>
                    <Input
                      id="transactionId"
                      name="transactionId"
                      placeholder={`Enter the reference from your ${paymentMethod} app`}
                      value={formData.transactionId}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
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
                      const itemFormat = item.book.format;
                      const itemTotal = (item.book.price * item.quantity).toFixed(2);
                      return (
                        <div key={`${item.book.id}-${item.book.format}`} className="flex items-center space-x-3">
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
                              Format: {itemFormat.charAt(0).toUpperCase() + itemFormat.slice(1)} | Qty: {item.quantity}
                            </p>
                          </div>
                          <span className="font-medium">
                            {totalCurrency} {itemTotal}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* 3. Correct Value Calculation */}
                  <div className="border-t mt-4 pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal (Items)</span>
                      <span>{totalCurrency} {state.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`${state.shipping > 0 ? 'text-red-600 font-bold' : 'text-green-600 font-bold'}`}>Delivery Charge</span>
                      <span className={`${state.shipping > 0 ? 'text-red-600 font-bold' : 'text-green-600 font-bold'}`}>
                          {state.shipping > 0 ? `${totalCurrency} ${state.shipping.toFixed(2)}` : 'FREE'}
                      </span>
                    </div>
                     <div className="flex justify-between">
                      <span>Tax (0%)</span>
                      <span>{totalCurrency} 0.00</span>
                    </div>
                    <div className="flex justify-between font-bold text-xl border-t pt-2">
                      <span>Grand Total</span>
                      <span>{totalCurrency} {state.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full mt-6 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white"
                    size="lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>Processing Order...</>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Complete Order - {totalCurrency} {state.total.toFixed(2)}
                      </>
                    )}
                  </Button>
                  
                </CardContent>
              </Card>
              
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <Lock className="w-4 h-4 mr-2" />
                Payment is manually verified. Please allow 2-6 hours for confirmation.
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
