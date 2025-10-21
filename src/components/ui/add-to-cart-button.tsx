"use client";

import { Button } from './button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/context/CartContext';
import { Book } from '@/lib/data/book';
import { useState } from 'react';

interface AddToCartButtonProps {
  book: Book;
  format?: 'ebook' | 'paperback' | 'hardcover';
}

export function AddToCartButton({ book, format = 'ebook' }: AddToCartButtonProps) {
  const { dispatch } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    
    // Create a book object with the selected format price
    const bookWithFormat = {
      ...book,
      price: book.formats[format].price,
      bookFormat: format
    };
    
    dispatch({ type: 'ADD_TO_CART', payload: bookWithFormat });
    
    // Reset animation
    setTimeout(() => setIsAdding(false), 1000);
  };

  const formatPrice = book.formats[format].price;
  const formatName = format.charAt(0).toUpperCase() + format.slice(1);

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
      {isAdding ? 'Added!' : `Add ${formatName} - ${book.currency} ${formatPrice}`}
    </Button>
  );
}