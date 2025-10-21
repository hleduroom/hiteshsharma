"use client";

import { Button } from './button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/context/CartContext';
import { Book } from '@/lib/data/book';
import { useState } from 'react';

interface AddToCartButtonProps {
  book: Book;
}

export function AddToCartButton({ book }: AddToCartButtonProps) {
  const { dispatch } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    dispatch({ type: 'ADD_TO_CART', payload: book });
    
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
      {isAdding ? 'Added!' : 'Add to Cart'}
    </Button>
  );
}