"use client";

import { useCart } from "@/lib/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CartPage() {
  const { state, dispatch } = useCart();

  const handleRemove = (id: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: "REMOVE_FROM_CART", payload: id });
      return;
    }
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="mb-6">Browse the store and add books you love.</p>
        <Link href="/book">
          <Button>Browse Books</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="grid gap-6">
        {state.items.map((item) => {
          const key = `${item.book.id}-${item.book.format}`;
          return (
            <div key={key} className="flex items-center justify-between border rounded p-4">
              <div className="flex items-center gap-4">
                <div className="w-24 h-32 relative">
                  <Image src={item.book.coverImage} alt={item.book.title} width={80} height={120} className="object-cover rounded" />
                </div>
                <div>
                  <h3 className="font-semibold">{item.book.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.book.format}</p>
                  <p className="mt-2 font-bold">NPR {item.book.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded">
                  <button className="px-3" onClick={() => handleQuantityChange(key, item.quantity - 1)}>-</button>
                  <Input value={String(item.quantity)} onChange={(e) => handleQuantityChange(key, Math.max(1, parseInt(e.target.value || "1")))} className="w-12 text-center" />
                  <button className="px-3" onClick={() => handleQuantityChange(key, item.quantity + 1)}>+</button>
                </div>

                <div className="text-right">
                  <p className="font-bold">NPR {item.book.price * item.quantity}</p>
                  <button className="text-sm text-red-600 mt-2" onClick={() => handleRemove(key)}>Remove</button>
                </div>
              </div>
            </div>
          );
        })}

        <div className="flex justify-end items-center gap-6">
          <div className="text-right">
            <p className="text-sm text-slate-600">Subtotal</p>
            <p className="text-2xl font-bold">NPR {state.total}</p>
          </div>
          <Link href="/checkout">
            <Button>Proceed to Checkout</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
