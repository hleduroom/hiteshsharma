"use client";

import { useCart } from '@/lib/context/CartContext';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { state, dispatch } = useCart();

  const getItemUniqueId = (item: any) => {
    return `${item.book.id}-${item.book.format}`;
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <ShoppingCart className="w-24 h-24 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any books to your cart yet.
            </p>
            <Button asChild>
              <Link href="/book">
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currency = state.items[0]?.book.currency || 'NPR';
  const totalAmount = state.total + state.deliveryFee;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => {
              const itemPrice = item.book.price;
              const itemCurrency = item.book.currency;
              const format = item.book.format;
              const deliveryCost = item.book.deliveryCost;

              const uniqueId = getItemUniqueId(item);
              const formatName = format.charAt(0).toUpperCase() + format.slice(1);
              const itemTotal = (itemPrice * item.quantity).toFixed(2);

              return (
                <div key={uniqueId} className="bg-white border rounded-lg p-4 flex items-center space-x-4 shadow-sm">
                  <Image
                    src={item.book.coverImage}
                    alt={item.book.title}
                    width={80}
                    height={120}
                    className="rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.book.title}</h3>
                    <p className="text-sm text-muted-foreground">by {item.book.author}</p>
                    <p className="text-sm text-muted-foreground">Format: {formatName}</p>
                    {deliveryCost > 0 && (
                      <p className="text-sm text-blue-600">+ {currency} {deliveryCost} delivery per item</p>
                    )}
                    <p className="font-bold text-lg mt-2">{itemCurrency} {itemTotal}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(uniqueId, item.quantity - 1)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(uniqueId, item.quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(uniqueId)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              );
            })}
          </div>

          <div className="bg-white border rounded-lg p-6 h-fit shadow-sm">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{currency} {state.total.toFixed(2)}</span>
              </div>
              {state.deliveryFee > 0 && (
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>{currency} {state.deliveryFee.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{currency} {totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <Button className="w-full" size="lg" asChild>
              <Link href="/checkout">
                Proceed to Checkout
              </Link>
            </Button>

            <Button variant="outline" className="w-full mt-2" asChild>
              <Link href="/book">
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}