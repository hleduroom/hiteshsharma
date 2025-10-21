"use client";

import { useCart } from '@/lib/context/CartContext';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { state, dispatch } = useCart();

  // Helper function to create the unique ID for dispatching actions
  // The CartContext now uses 'id-format' as the unique key for items
  const getItemUniqueId = (item: any) => {
    // We assume the cart item object has the final 'format' property
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

  // ❌ REMOVE: getItemPrice is no longer needed; price is directly on item.book.price
  // ❌ REMOVE: getItemCurrency is no longer needed; currency is directly on item.book.currency

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

  // Use the currency of the first item for the total summary display
  const totalCurrency = state.items[0]?.book.currency || 'USD';

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => {
              // ⚠️ FIX: Access price and currency directly from the simplified cart item object
              const itemPrice = item.book.price; 
              const itemCurrency = item.book.currency;
              const format = item.book.format; // Format is now a string property
              
              const uniqueId = getItemUniqueId(item);
              const formatName = format.charAt(0).toUpperCase() + format.slice(1);
              const itemTotal = (itemPrice * item.quantity).toFixed(2);

              return (
                // ⚠️ FIX: Use the new unique ID for the key
                <div key={uniqueId} className="bg-card border rounded-lg p-4 flex items-center space-x-4">
                  <Image
                    src={item.book.coverImage}
                    alt={item.book.title}
                    width={80}
                    height={120}
                    className="rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold">{item.book.title}</h3>
                    {/* The author and full book properties are not available on the simplified CartItem type.
                        If you need them, you must add them back to the CartItemPayload definition.
                        I'm assuming they are NOT needed for the cart state.
                        
                        If author is still required, you must re-add it to CartItemPayload and CartContext logic.
                        For now, I'll comment out the author to fix the type error.
                    */}
                    {/* <p className="text-sm text-muted-foreground">by {item.book.author}</p> */} 
                    <p className="text-sm text-muted-foreground">Format: {formatName}</p>
                    {/* Display item total price (price * quantity) is often better here */}
                    <p className="font-bold text-lg">{itemCurrency} {itemTotal}</p> 
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(uniqueId, item.quantity - 1)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
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
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="bg-card border rounded-lg p-6 h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                {/* ⚠️ FIX: Use totalCurrency */}
                <span>{totalCurrency} {state.total.toFixed(2)}</span> 
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                {/* ⚠️ FIX: Use totalCurrency */}
                <span>{totalCurrency} 0.00</span> 
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total</span>
                {/* ⚠️ FIX: Use totalCurrency */}
                <span>{totalCurrency} {state.total.toFixed(2)}</span> 
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
