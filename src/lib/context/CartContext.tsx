"use client";

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Book } from '../data/book';

interface CartItem {
  book: Book & { bookFormat?: string };
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: Book & { bookFormat?: string } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | undefined>(undefined);

// Helper function to get price based on format
const getBookPrice = (book: Book & { bookFormat?: string }) => {
  const format = book.bookFormat || 'ebook';
  return book.formats[format]?.price || book.formats.ebook.price;
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => 
        item.book.id === action.payload.id && 
        item.book.bookFormat === action.payload.bookFormat
      );
      
      const itemPrice = getBookPrice(action.payload);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.book.id === action.payload.id && 
            item.book.bookFormat === action.payload.bookFormat
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + itemPrice
        };
      }
      return {
        ...state,
        items: [...state.items, { book: action.payload, quantity: 1 }],
        total: state.total + itemPrice
      };

    case 'REMOVE_FROM_CART':
      const itemToRemove = state.items.find(item => 
        `${item.book.id}-${item.book.bookFormat}` === action.payload
      );
      const removePrice = itemToRemove ? getBookPrice(itemToRemove.book) * itemToRemove.quantity : 0;
      return {
        ...state,
        items: state.items.filter(item => 
          `${item.book.id}-${item.book.bookFormat}` !== action.payload
        ),
        total: state.total - removePrice
      };

    case 'UPDATE_QUANTITY':
      const itemToUpdate = state.items.find(item => 
        `${item.book.id}-${item.book.bookFormat}` === action.payload.id
      );
      if (!itemToUpdate) return state;
      
      const updatePrice = getBookPrice(itemToUpdate.book);
      const quantityDiff = action.payload.quantity - itemToUpdate.quantity;
      return {
        ...state,
        items: state.items.map(item =>
          `${item.book.id}-${item.book.bookFormat}` === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        total: state.total + (updatePrice * quantityDiff)
      };

    case 'CLEAR_CART':
      return {
        items: [],
        total: 0
      };

    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0
  });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};