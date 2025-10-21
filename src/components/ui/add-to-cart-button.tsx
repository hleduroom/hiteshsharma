'use client';

import { Button } from './button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/context/CartContext';
import { Book } from '@/lib/data/book';
import { useState } from 'react';

// Define the precise type of the item being added to the cart
// This must match the CartItemPayload in CartContext exactly
interface CartItemPayload {
  id: string;
  title: string;
  author: string; // ADDED: This was missing
  price: number;
  currency: string;
  format: 'ebook' | 'paperback' | 'hardcover';
  coverImage: string;
  deliveryCost?: number; // ADDED: For delivery fee calculation
}

interface AddToCartButtonProps {
  book: Book;
  format?: 'ebook' | 'paperback' | 'hardcover';
}

export function AddToCartButton({ book, format = 'ebook' }: AddToCartButtonProps) {
  const { dispatch } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  // Calculate required variables
  const formatPrice = book.formats[format].price;
  const formatName = format.charAt(0).toUpperCase() + format.slice(1);
  const deliveryCost = format === 'ebook' ? 0 : 150;

  const handleAddToCart = () => {
    setIsAdding(true);

    // Construct the payload object to match CartContext's expected type exactly
    const cartItem = {
      id: book.id,
      title: book.title,
      author: book.author, // ADDED: This was missing
      price: formatPrice,
      currency: book.currency,
      quantity: 1,
      format: format,
      coverImage: book.coverImage,
      deliveryCost: deliveryCost // ADDED: For delivery fee tracking
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