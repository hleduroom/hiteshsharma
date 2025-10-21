'use client';

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

  const formatPrice = book.formats[format].price;
  const formatName = format.charAt(0).toUpperCase() + format.slice(1);
  const deliveryCost = format === 'ebook' ? 0 : 150;

  const handleAddToCart = () => {
    setIsAdding(true);

    const cartItem = {
      id: book.id,
      title: book.title,
      author: book.author,
      price: formatPrice,
      currency: book.currency,
      quantity: 1,
      format: format,
      coverImage: book.coverImage,
      deliveryCost: deliveryCost
    };

    dispatch({ type: 'ADD_TO_CART', payload: cartItem });

    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <Button
      size="lg"
      variant="outline"
      className={`flex-1 transition-all duration-300 ${
        isAdding ? 'scale-110 bg-green-600 text-white' : 'border-blue-300 hover:bg-blue-50'
      }`}
      onClick={handleAddToCart}
    >
      <ShoppingCart className={`w-4 h-4 mr-2 transition-all ${
        isAdding ? 'scale-125' : ''
      }`} />
      {isAdding ? 'Added!' : `Add to Cart - ${book.currency} ${formatPrice.toFixed(2)}`}
    </Button>
  );
}