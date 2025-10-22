"use client";

import { useState, useEffect } from 'react';
import { useCart } from '@/lib/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, QrCode, Smartphone, MapPin, Truck, Mail } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { NEPAL_LOCATIONS } from '@/lib/data/nepal-locations';

type PaymentMethod = 'esewa' | 'khalti' | 'bank_transfer';

export default function CheckoutPage() {
  const { state, dispatch } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('esewa');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [showMap, setShowMap] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    transactionId: '',
    province: '',
    district: '',
    latitude: '',
    longitude: ''
  });

  useEffect(() => {
    if (state.items.length === 0) {
      router.push('/cart');
    }
  }, [state.items.length, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const province = e.target.value;
    setSelectedProvince(province);
    setSelectedDistrict('');
    setFormData({
      ...formData,
      province,
      district: ''
    });
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    setFormData({
      ...formData,
      district
    });
  };

  const generateOrderId = () => {
    return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setFormData({
      ...formData,
      latitude: lat.toString(),
      longitude: lng.toString()
    });
    setShowMap(false);
  };

  const saveOrderToLocalStorage = (orderData: any) => {
    const existingOrders = JSON.parse(localStorage.getItem('bookOrders') || '[]');
    const updatedOrders = [...existingOrders, orderData];
    localStorage.setItem('bookOrders', JSON.stringify(updatedOrders));
  };

  const generateReceipt = (orderData: any) => {
    const receipt = {
      receiptId: `RCP-${Date.now()}`,
      orderId: orderData.orderId,
      date: new Date().toISOString(),
      customer: orderData.customer,
      items: orderData.items,
      paymentMethod: orderData.paymentMethod,
      total: orderData.total,
      deliveryFee: state.deliveryFee,
      subtotal: state.total
    };
    
    const existingReceipts = JSON.parse(localStorage.getItem('paymentReceipts') || '[]');
    const updatedReceipts = [...existingReceipts, receipt];
    localStorage.setItem('paymentReceipts', JSON.stringify(updatedReceipts));
    
    return receipt;
  };

  const sendOrderEmail = async (orderData: any) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      
      if (result.success) {
        console.log('Email sent successfully:', result.messageId);
        return true;
      } else {
        console.warn('Failed to send email:', result.message);
        return false;
      }
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const orderId = generateOrderId();
      const totalAmount = state.total + state.deliveryFee;

      const orderData = {
        orderId,
        customer: formData,
        items: state.items.map(item => ({
          book: {
            title: item.book.title,
            author: item.book.author,
            format: item.book.format,
            price: item.book.price,
            deliveryCost: item.book.deliveryCost
          },
          quantity: item.quantity
        })),
        paymentMethod,
        transactionId: formData.transactionId || undefined,
        subtotal: state.total,
        deliveryFee: state.deliveryFee,
        total: totalAmount,
        status: 'confirmed',
        timestamp: new Date().toISOString()
      };

      // Save to localStorage
      saveOrderToLocalStorage(orderData);
      generateReceipt(orderData);

      // Send email confirmation
      const emailSent = await sendOrderEmail(orderData);
      
      if (!emailSent) {
        console.warn('Email sending failed, but order was processed successfully');
        // Continue with order even if email fails
      }

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      dispatch({ type: 'CLEAR_CART' });
      
      // Redirect to success page
      router.push(`/order/success?orderId=${orderId}&amount=${totalAmount}&currency=NPR&email=${encodeURIComponent(formData.email)}`);
      
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p>Redirecting to cart...</p>
        </div>
      </div>
    );
  }

  const totalAmount = state.total + state.deliveryFee;
  const currency = 'NPR';

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    Contact Information
                  </CardTitle>
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
                      placeholder="your.email@example.com"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Order confirmation will be sent to this email
                    </p>
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

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Shipping Address
                  </CardTitle>
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

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="province">Province *</Label>
                      <select
                        id="province"
                        name="province"
                        value={selectedProvince}
                        onChange={handleProvinceChange}
                        className="w-full p-2 border rounded-md"
                        required
                      >
                        <option value="">Select Province</option>
                        {NEPAL_LOCATIONS.provinces.map(province => (
                          <option key={province.id} value={province.name}>
                            {province.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="district">District *</Label>
                      <select
                        id="district"
                        name="district"
                        value={selectedDistrict}
                        onChange={handleDistrictChange}
                        className="w-full p-2 border rounded-md"
                        disabled={!selectedProvince}
                        required
                      >
                        <option value="">Select District</option>
                        {selectedProvince && NEPAL_LOCATIONS.provinces
                          .find(p => p.name === selectedProvince)
                          ?.districts.map(district => (
                            <option key={district} value={district}>
                              {district}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="Street address, Ward No., Landmark"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City/Municipality *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowMap(!showMap)}
                      className="flex items-center"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      {showMap ? 'Hide Map' : 'Pick Location on Map'}
                    </Button>
                    
                    {showMap && (
                      <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                        <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                          <p className="text-muted-foreground">
                            Map Integration - Use Google Maps API or similar service
                          </p>
                        </div>
                        <div className="mt-4 text-sm text-muted-foreground">
                          <p>📍 Click on the map to select your exact delivery location</p>
                          <p>🗺️ This helps our delivery partner find you easily</p>
                        </div>
                        <Button
                          type="button"
                          onClick={() => handleLocationSelect(27.7172, 85.3240)}
                          className="mt-2"
                          variant="outline"
                        >
                          Use Current Location (Kathmandu)
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <Button
                      type="button"
                      variant={paymentMethod === 'esewa' ? 'default' : 'outline'}
                      onClick={() => setPaymentMethod('esewa')}
                      className="h-16 flex-col"
                    >
                      <QrCode className="w-6 h-6 mb-1" />
                      <span className="text-xs">eSewa</span>
                    </Button>
                    <Button
                      type="button"
                      variant={paymentMethod === 'khalti' ? 'default' : 'outline'}
                      onClick={() => setPaymentMethod('khalti')}
                      className="h-16 flex-col"
                    >
                      <Smartphone className="w-6 h-6 mb-1" />
                      <span className="text-xs">Khalti</span>
                    </Button>
                    <Button
                      type="button"
                      variant={paymentMethod === 'bank_transfer' ? 'default' : 'outline'}
                      onClick={() => setPaymentMethod('bank_transfer')}
                      className="h-16 flex-col"
                    >
                      <Lock className="w-6 h-6 mb-1" />
                      <span className="text-xs">Bank Transfer</span>
                    </Button>
                  </div>

                  {(paymentMethod === 'esewa' || paymentMethod === 'khalti') && (
                    <div className="border-t pt-4 space-y-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-900 mb-2">
                          {paymentMethod === 'esewa' ? 'eSewa Payment Instructions' : 'Khalti Payment Instructions'}
                        </h4>
                        <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
                          <li>Open your {paymentMethod === 'esewa' ? 'eSewa' : 'Khalti'} app</li>
                          <li>Scan the QR code below or enter merchant ID: <strong>HLEDUROOM</strong></li>
                          <li>Pay the amount: <strong>{currency} {totalAmount.toFixed(2)}</strong></li>
                          <li>Enter the transaction ID below after payment</li>
                        </ol>
                      </div>

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

                  {paymentMethod === 'bank_transfer' && (
                    <div className="border-t pt-4 space-y-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-semibold text-green-900 mb-2">Bank Transfer Details</h4>
                        <div className="text-sm text-green-800 space-y-2">
                          <p><strong>Bank:</strong> Nepal Investment Mega Bank</p>
                          <p><strong>Account Name:</strong> H.L.-Eduroom</p>
                          <p><strong>Account Number:</strong> 1234567890123456</p>
                          <p><strong>Amount:</strong> {currency} {totalAmount.toFixed(2)}</p>
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

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {state.items.map((item) => {
                      const itemTotal = (item.book.price * item.quantity).toFixed(2);
                      const formatName = item.book.format.charAt(0).toUpperCase() + item.book.format.slice(1);
                      
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
                              by {item.book.author} | Format: {formatName} | Qty: {item.quantity}
                            </p>
                            {item.book.deliveryCost > 0 && (
                              <p className="text-xs text-blue-600">
                                + {currency} {item.book.deliveryCost} delivery
                              </p>
                            )}
                          </div>
                          <span className="font-medium">
                            {currency} {itemTotal}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t mt-4 pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{currency} {state.total.toFixed(2)}</span>
                    </div>
                    {state.deliveryFee > 0 && (
                      <div className="flex justify-between">
                        <span className="flex items-center">
                          <Truck className="w-4 h-4 mr-1" />
                          Delivery Fee
                        </span>
                        <span>{currency} {state.deliveryFee.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total</span>
                      <span>{currency} {totalAmount.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full mt-6"
                    size="lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing Payment & Sending Email...
                      </div>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Complete Order - {currency} {totalAmount.toFixed(2)}
                      </>
                    )}
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    Order confirmation will be sent to {formData.email || 'your email'}
                  </p>
                </CardContent>
              </Card>

              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <Lock className="w-4 h-4 mr-2" />
                Secure payment • Email confirmation • 24/7 support
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}