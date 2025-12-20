"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Printer, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SuccessPage() {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("lastOrder");
    if (data) {
      try {
        const parsed = JSON.parse(data);
        // Support both normalized payload (customer nested) and older flattened shape
        if (parsed.customer) {
          const payload = {
            orderId: parsed.orderId,
            firstName: parsed.customer.firstName,
            email: parsed.customer.email,
            phone: parsed.customer.phone,
            address: parsed.customer.address,
            city: parsed.customer.city,
            district: parsed.customer.district,
            transactionId: parsed.transactionId,
            items: parsed.items,
            total: parsed.total,
          };
          setOrder(payload);
        } else {
          setOrder(parsed);
        }
      } catch (err) {
        console.error("Failed to parse lastOrder:", err);
      }
    }
  }, []);

  if (!order) return <p className="text-center py-20">Loading Receipt...</p>;

  const itemsTotal = order.items?.reduce((acc: number, curr: any) => acc + (curr.book?.price || curr.book?.price || 0), 0) || 0;
  const deliveryFee = (order.total || 0) - itemsTotal;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-2xl rounded-sm border-t-8 border-green-500">
        <div className="text-center mb-10">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold">Payment Receipt</h1>
          <p className="text-slate-500">Order #{order.orderId}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-10 border-b pb-8">
          <div>
            <h3 className="font-bold text-slate-400 uppercase text-xs mb-2">Billed To</h3>
            <p className="font-bold">{order.firstName}</p>
            <p>{order.email}</p>
            <p>{order.phone}</p>
          </div>
          <div className="md:text-right">
            <h3 className="font-bold text-slate-400 uppercase text-xs mb-2">Delivery Details</h3>
            <p>{order.address || "Digital Delivery (E-book)"}</p>
            <p>{order.city} {order.district}</p>
            <p className="text-blue-600 font-bold">Transaction ID: {order.transactionId}</p>
          </div>
        </div>

        <table className="w-full mb-10">
          <thead>
            <tr className="border-b text-left text-slate-400 text-sm">
              <th className="py-2">Item</th>
              <th className="py-2 text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            {order.items?.map((item: any, idx: number) => (
              <tr key={idx} className="border-b">
                <td className="py-4">{item.book?.title || "Untitled"} <span className="text-xs text-slate-400">({item.book?.format || item.bookFormat || "ebook"})</span></td>
                <td className="py-4 text-right font-bold">NPR {item.book?.price || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex flex-col items-end space-y-2 mb-10">
          <div className="w-full md:w-64 flex justify-between">
            <span>Delivery Fee:</span>
            <span>NPR {deliveryFee}</span>
          </div>
          <div className="w-full md:w-64 flex justify-between text-2xl font-bold text-green-600">
            <span>Total Paid:</span>
            <span>NPR {order.total}</span>
          </div>
        </div>

        <div className="flex gap-4 justify-center no-print">
          <Button onClick={() => window.print()} variant="outline"><Printer className="mr-2 h-4 w-4" /> Print Receipt</Button>
          <Button asChild><Link href="/"><Home className="mr-2 h-4 w-4" /> Back to Store</Link></Button>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white; }
        }
      `}</style>
    </div>
  );
}
