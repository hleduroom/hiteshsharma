"use client";

import { useState } from "react";
import { useCart } from "@/lib/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MapPin } from "lucide-react";

export default function CheckoutPage() {
  const { state, dispatch } = useCart();
  const router = useRouter();

  // Check if cart contains physical books
  const hasPhysicalBooks = state.items.some((item) => item.book.format !== "ebook");

  const [paymentMethod, setPaymentMethod] = useState<"esewa" | "khalti" | "bank">("esewa");
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    district: "",
    city: "",
    postalCode: "",
    transactionId: "",
    lat: 27.7172,
    lng: 85.324,
  });

  const deliveryFee = hasPhysicalBooks ? 150 : 0;
  const totalWithDelivery = state.total + deliveryFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderId = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Build a normalized payload that the API expects.
    const customer = {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName || "",
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      district: formData.district,
      postalCode: formData.postalCode || "",
    };

    const items = state.items.map((item) => ({
      id: item.book.id,
      quantity: item.quantity,
      book: {
        id: item.book.id,
        title: item.book.title,
        author: (item.book as any).author || "Hitesh Sharma",
        price: item.book.price,
        format: item.book.format,
        coverImage: item.book.coverImage,
      },
    }));

    const orderPayload = {
      orderId,
      customer,
      items,
      paymentMethod,
      transactionId: formData.transactionId,
      total: totalWithDelivery,
      createdAt: new Date().toISOString(),
    };

    // Persist receipt locally for the success page (normalized shape)
    localStorage.setItem("lastOrder", JSON.stringify(orderPayload));

    // Send to the orders API with JSON content-type.
    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });
    } catch (err) {
      console.error("Failed to send order:", err);
      // still clear cart and show receipt locally
    }

    dispatch({ type: "CLEAR_CART" });
    router.push(`/order/success?orderId=${orderId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Complete Your Purchase</h1>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card className="border-2 border-slate-200">
            <CardHeader>
              <CardTitle>1. Contact & Delivery</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Email Address"
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="First Name"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
                <Input
                  placeholder="Last Name (optional)"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
              <Input
                placeholder="Phone (NTC/Ncell)"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />

              {hasPhysicalBooks && (
                <div className="space-y-4 animate-in fade-in duration-500">
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      className="p-2 border rounded"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    >
                      <option value="">Select District</option>
                      <option>Kathmandu</option>
                      <option>Lalitpur</option>
                      <option>Bhaktapur</option>
                      <option>Kaski</option>
                    </select>
                    <Input
                      placeholder="City/Tol"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>
                  <Input
                    placeholder="Address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                  <div className="h-48 bg-slate-100 rounded-xl relative flex items-center justify-center border-2 border-dashed border-slate-300">
                    <MapPin className="absolute top-2 left-2 text-red-500" />
                    <p className="text-sm text-center px-4">Map Integration Placeholder — Click to Pin Location</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-2 border-slate-200">
            <CardHeader>
              <CardTitle>2. Payment (Select One)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-2">
                <Button type="button" onClick={() => setPaymentMethod("esewa")} className={paymentMethod === "esewa" ? "h-16 bg-slate-800 text-white" : "h-16"}>
                  eSewa
                </Button>
                <Button type="button" onClick={() => setPaymentMethod("khalti")} className={paymentMethod === "khalti" ? "h-16 bg-slate-800 text-white" : "h-16"}>
                  Khalti
                </Button>
                <Button type="button" onClick={() => setPaymentMethod("bank")} className={paymentMethod === "bank" ? "h-16 bg-slate-800 text-white" : "h-16"}>
                  Bank
                </Button>
              </div>

              <div className="text-center p-4 bg-white rounded-lg border">
                <p className="mb-2 font-bold text-sm">Scan to Pay NPR {totalWithDelivery}</p>
                <Image src={paymentMethod === "esewa" ? "/esewa-qr.png" : paymentMethod === "khalti" ? "/khalti-qr.png" : "/mbl-qr.png"} alt="QR Code" width={200} height={200} className="mx-auto border-4 border-white shadow-sm" />
                <Input className="mt-4" placeholder="Enter Transaction ID" required value={formData.transactionId} onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="sticky top-8 bg-slate-50 border-none shadow-xl">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              {state.items.map((item) => (
                <div key={`${item.book.id}-${item.book.format}`} className="flex justify-between py-2 border-b">
                  <span>{item.book.title} ({item.book.format})</span>
                  <span>NPR {item.book.price * item.quantity}</span>
                </div>
              ))}
              <div className="pt-4 space-y-2">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>NPR {state.total}</span>
                </div>
                <div className="flex justify-between text-blue-600">
                  <span>Delivery ({hasPhysicalBooks ? "Standard" : "Digital"})</span>
                  <span>{hasPhysicalBooks ? "NPR 150" : "FREE"}</span>
                </div>
                <div className="flex justify-between text-2xl font-bold pt-4 border-t border-slate-300">
                  <span>Total</span>
                  <span>NPR {totalWithDelivery}</span>
                </div>
              </div>
              <button type="submit" className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white h-14 text-xl rounded">
                Confirm Order & Get Receipt
              </button>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
