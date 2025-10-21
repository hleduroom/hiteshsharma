'use client';

import { Button } from './button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/context/CartContext';
import { Book } from '@/lib/data/book';
import { useState } from 'react';

// Define the precise type of the item being added to the cart
interface CartItemPayload {
  id: string;
  title: string;
  price: number;
  currency: string;
  quantity: number;
  format: 'ebook' | 'paperback' | 'hardcover';
  coverImage: string;
}

interface AddToCartButtonProps {
  // We still need the full book data to calculate the price
  book: Book;
  // This prop tells us which price to use
  format?: 'ebook' | 'paperback' | 'hardcover';
}

export function AddToCartButton({ book, format = 'ebook' }: AddToCartButtonProps) {
  const { dispatch } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  // Calculate required variables
  const formatPrice = book.formats[format].price;
  const formatName = format.charAt(0).toUpperCase() + format.slice(1);

  const handleAddToCart = () => {
    setIsAdding(true);

    // FIX: Explicitly construct the payload object to match CartContext's expected type
    const cartItem: CartItemPayload = {
      id: book.id,
      title: book.title,
      price: formatPrice, // Use the calculated price
      currency: book.currency,
      quantity: 1, // Default to 1
      format: format, // Use the selected format
      coverImage: book.coverImage,
    };

    dispatch({ type: 'ADD_TO_CART', payload: cartItem });

    // Reset animation
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <Button
      size="lg"
      className={`flex-1 transition-all duration-300 ${
        isAdding ? 'scale-110 bg-green-600' : ''
      }`}
      onClick={handleAddToCart}
    >
      <ShoppingCart className={`w-4 h-4 mr-2 transition-all ${
        isAdding ? 'scale-125' : ''
      }`} />
      {isAdding ? 'Added!' : `Add ${formatName} - ${book.currency} ${formatPrice.toFixed(2)}`}
    </Button>
  );
}
