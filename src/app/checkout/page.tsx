"use client";

import { useState, useEffect, Suspense } from 'react';
import { useCart } from '@/lib/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Lock, QrCode, Smartphone, MapPin, Truck } from 'lucide-react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

type PaymentMethod = 'esewa' | 'khalti' | 'bank_transfer';

interface NepalLocation {
  id: string;
  name: string;
  type: 'province' | 'district' | 'municipality';
  parentId?: string;
}

const nepalLocations: NepalLocation[] = [
  // Provinces
  { id: 'p1', name: 'Province 1', type: 'province' },
  { id: 'p2', name: 'Madhesh Province', type: 'province' },
  { id: 'p3', name: 'Bagmati Province', type: 'province' },
  { id: 'p4', name: 'Gandaki Province', type: 'province' },
  { id: 'p5', name: 'Lumbini Province', type: 'province' },
  { id: 'p6', name: 'Karnali Province', type: 'province' },
  { id: 'p7', name: 'Sudurpashchim Province', type: 'province' },
  
  // Kathmandu Valley Districts
  { id: 'd1', name: 'Kathmandu', type: 'district', parentId: 'p3' },
  { id: 'd2', name: 'Lalitpur', type: 'district', parentId: 'p3' },
  { id: 'd3', name: 'Bhaktapur', type: 'district', parentId: 'p3' },
  
  // Municipalities in Kathmandu
  { id: 'm1', name: 'Kathmandu Metropolitan City', type: 'municipality', parentId: 'd1' },
  { id: 'm2', name: 'Lalitpur Metropolitan City', type: 'municipality', parentId: 'd2' },
  { id: 'm3', name: 'Bhaktapur Municipality', type: 'municipality', parentId: 'd3' },
  { id: 'm4', name: 'Kirtipur Municipality', type: 'municipality', parentId: 'd1' },
  { id: 'm5', name: 'Madhyapur Thimi Municipality', type: 'municipality', parentId: 'd3' },
];

function CheckoutContent() {
  const { state, dispatch } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEbookOnly = searchParams.get('ebook') === 'true';
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('esewa');
  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    province: '',
    district: '',
    municipality: ''
  });

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    transactionId: ''
  });

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

  const handleLocationChange = (type: 'province' | 'district' | 'municipality', value: string) => {
    setSelectedLocation(prev => ({
      ...prev,
      [type]: value,
      ...(type === 'province' ? { district: '', municipality: '' } : {}),
      ...(type === 'district' ? { municipality: '' } : {})
    }));
  };

  const getFilteredLocations = (type: 'province' | 'district' | 'municipality', parentId?: string) => {
    return nepalLocations.filter(loc => 
      loc.type === type && (!parentId || loc.parentId === parentId)
    );
  };

  const generateOrderId = () => {
    return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const orderId = generateOrderId();
      const orderData = {
        orderId,
        customer: formData,
        location: selectedLocation,
        items: state.items,
        paymentMethod,
        transactionId: formData.transactionId,
        total: state.total + state.deliveryFee,
        deliveryFee: state.deliveryFee,
        isEbook: isEbookOnly
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      dispatch({ type: 'CLEAR_CART' });
      router.push(`/order/success?orderId=${orderId}&amount=${state.total + state.deliveryFee}&currency=NPR`);
      
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
          <p className="font-handwriting">Redirecting to cart...</p>
        </div>
      </div>
    );
  }

  const hasPhysicalBooks = state.items.some(item => 
    item.book.format === 'paperback' || item.book.format === 'hardcover'
  );
  const currency = 'NPR';
  const grandTotal = state.total + state.deliveryFee;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 font-handwriting">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-handwriting">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="font-handwriting">Email *</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="font-handwriting"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="font-handwriting">Phone Number *</Label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="98XXXXXXXX"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="font-handwriting"
                    />
                  </div>
                </CardContent>
              </Card>

              {hasPhysicalBooks && !isEbookOnly && (
                <Card>
                  <CardHeader>
                    <CardTitle className="font-handwriting">Delivery Address</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="font-handwriting">First Name *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="font-handwriting"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="font-handwriting">Last Name *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="font-handwriting"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="font-handwriting">Location in Nepal *</Label>
                      
                      <div className="grid grid-cols-3 gap-2">
                        <select
                          value={selectedLocation.province}
                          onChange={(e) => handleLocationChange('province', e.target.value)}
                          className="p-2 border rounded text-sm font-handwriting"
                          required
                        >
                          <option value="">Select Province</option>
                          {getFilteredLocations('province').map(province => (
                            <option key={province.id} value={province.id}>
                              {province.name}
                            </option>
                          ))}
                        </select>

                        <select
                          value={selectedLocation.district}
                          onChange={(e) => handleLocationChange('district', e.target.value)}
                          className="p-2 border rounded text-sm font-handwriting"
                          required
                          disabled={!selectedLocation.province}
                        >
                          <option value="">Select District</option>
                          {getFilteredLocations('district', selectedLocation.province).map(district => (
                            <option key={district.id} value={district.id}>
                              {district.name}
                            </option>
                          ))}
                        </select>

                        <select
                          value={selectedLocation.municipality}
                          onChange={(e) => handleLocationChange('municipality', e.target.value)}
                          className="p-2 border rounded text-sm font-handwriting"
                          required
                          disabled={!selectedLocation.district}
                        >
                          <option value="">Select Municipality</option>
                          {getFilteredLocations('municipality', selectedLocation.district).map(municipality => (
                            <option key={municipality.id} value={municipality.id}>
                              {municipality.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address" className="font-handwriting">Street Address *</Label>
                      <Input
                        id="address"
                        name="address"
                        placeholder="Ward No, Tole, Street"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="font-handwriting"
                      />
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowMap(true)}
                      className="flex items-center gap-2 font-handwriting"
                    >
                      <MapPin className="w-4 h-4" />
                      Choose Location on Map
                    </Button>

                    {showMap && (
                      <div className="border rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-semibold font-handwriting">Select Your Location</h4>
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setShowMap(false)}
                            className="font-handwriting"
                          >
                            Close
                          </Button>
                        </div>
                        <div className="bg-white border rounded h-64 flex items-center justify-center">
                          <div className="text-center text-gray-500">
                            <MapPin className="w-12 h-12 mx-auto mb-2" />
                            <p className="font-handwriting">Map integration would go here</p>
                            <p className="text-sm font-handwriting">(Google Maps/OpenStreetMap integration)</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle className="font-handwriting">Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <Button
                      type="button"
                      variant={paymentMethod === 'esewa' ? 'default' : 'outline'}
                      onClick={() => setPaymentMethod('esewa')}
                      className="h-16 font-handwriting"
                    >
                      <QrCode className="w-4 h-4 mr-2" />
                      eSewa
                    </Button>
                    <Button
                      type="button"
                      variant={paymentMethod === 'khalti' ? 'default' : 'outline'}
                      onClick={() => setPaymentMethod('khalti')}
                      className="h-16 font-handwriting"
                    >
                      <Smartphone className="w-4 h-4 mr-2" />
                      Khalti
                    </Button>
                    <Button
                      type="button"
                      variant={paymentMethod === 'bank_transfer' ? 'default' : 'outline'}
                      onClick={() => setPaymentMethod('bank_transfer')}
                      className="h-16 font-handwriting"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Bank Transfer
                    </Button>
                  </div>

                  {(paymentMethod === 'esewa' || paymentMethod === 'khalti') && (
                    <div className="border-t pt-4 space-y-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-900 mb-2 font-handwriting">
                          {paymentMethod === 'esewa' ? 'eSewa Payment Instructions' : 'Khalti Payment Instructions'}
                        </h4>
                        <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800 font-handwriting">
                          <li>Open your {paymentMethod === 'esewa' ? 'eSewa' : 'Khalti'} app</li>
                          <li>Scan the QR code below</li>
                          <li>Pay the amount: <strong>{currency} {grandTotal}</strong></li>
                          <li>Enter the transaction ID below after payment</li>
                        </ol>
                      </div>

                      <div className="flex justify-center">
                        <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
                          <div className="w-48 h-48 bg-gray-100 flex items-center justify-center">
                            <QrCode className="w-16 h-16 text-gray-400" />
                          </div>
                          <p className="text-center text-sm text-gray-600 mt-2 font-handwriting">
                            Scan with {paymentMethod === 'esewa' ? 'eSewa' : 'Khalti'} app
                          </p>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="transactionId" className="font-handwriting">Transaction ID *</Label>
                        <Input
                          id="transactionId"
                          name="transactionId"
                          placeholder={`Enter ${paymentMethod === 'esewa' ? 'eSewa' : 'Khalti'} transaction ID`}
                          value={formData.transactionId}
                          onChange={handleInputChange}
                          required
                          className="font-handwriting"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'bank_transfer' && (
                    <div className="border-t pt-4 space-y-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-semibold text-green-900 mb-2 font-handwriting">Bank Transfer Details</h4>
                        <div className="text-sm text-green-800 space-y-2 font-handwriting">
                          <p><strong>Bank:</strong> Nepal Investment Mega Bank</p>
                          <p><strong>Account Name:</strong> H.L.-Eduroom</p>
                          <p><strong>Account Number:</strong> 1234567890123456</p>
                          <p><strong>Amount:</strong> {currency} {grandTotal}</p>
                          <p><strong>Reference:</strong> Order {generateOrderId()}</p>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="transactionId" className="font-handwriting">Transaction Reference Number *</Label>
                        <Input
                          id="transactionId"
                          name="transactionId"
                          placeholder="Enter bank transaction reference"
                          value={formData.transactionId}
                          onChange={handleInputChange}
                          required
                          className="font-handwriting"
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
                  <CardTitle className="font-handwriting">Order Summary</CardTitle>
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
                            <h4 className="font-medium text-sm font-handwriting">{item.book.title}</h4>
                            <p className="text-xs text-muted-foreground font-handwriting">
                              Format: {formatName} | Qty: {item.quantity}
                            </p>
                            {item.book.deliveryCost && item.book.deliveryCost > 0 && (
                              <p className="text-xs text-green-600 flex items-center gap-1 font-handwriting">
                                <Truck className="w-3 h-3" />
                                Delivery: {currency} {item.book.deliveryCost}
                              </p>
                            )}
                          </div>
                          <span className="font-medium font-handwriting">
                            {currency} {itemTotal}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t mt-4 pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="font-handwriting">Subtotal</span>
                      <span className="font-handwriting">{currency} {state.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-handwriting">Delivery Fee</span>
                      <span className="font-handwriting">
                        {state.deliveryFee > 0 ? `${currency} ${state.deliveryFee.toFixed(2)}` : 'Free'}
                      </span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span className="font-handwriting">Total</span>
                      <span className="font-handwriting">{currency} {grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full mt-6 font-handwriting"
                    size="lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>Processing Payment...</>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Complete Order - {currency} {grandTotal}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <div className="flex items-center justify-center text-sm text-muted-foreground font-handwriting">
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

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="font-handwriting">Loading checkout...</p>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}