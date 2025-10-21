"use client";

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Book } from '../data/book'; 

// --- UPDATED INTERFACES ---

// FIX 1: Define the core data needed for a cart item (what is passed in the ADD_TO_CART payload)
interface CartItemPayload {
  id: string;
  title: string;
  author: string; // Needed for display
  price: number; 
  currency: string;
  format: 'ebook' | 'paperback' | 'hardcover';
  coverImage: string;
}

// FIX 2: Define the strict structure of an item as stored in the CartState
// This MUST NOT extend CartItemPayload.
interface CartItem {
    // We store the static book details under 'book'
    book: CartItemPayload; 
    // We store the dynamic quantity at the top level
    quantity: number;
}


interface CartState {
  items: CartItem[];
  total: number;
}

// FIX 3: The action uses the CartItemPayload plus the quantity being added.
type CartAction =
  | { type: 'ADD_TO_CART'; payload: CartItemPayload & { quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } } // ID is the unique 'bookId-format' string
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | undefined>(undefined);

// --- REDUCER LOGIC ---

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const uniqueId = `${action.payload.id}-${action.payload.format}`;
      
      const existingItem = state.items.find(item => 
        `${item.book.id}-${item.book.format}` === uniqueId
      );

      const itemPrice = action.payload.price; 
      const newQuantity = action.payload.quantity || 1; 

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            `${item.book.id}-${item.book.format}` === uniqueId
              ? { ...item, quantity: item.quantity + newQuantity }
              : item
          ),
          total: state.total + (itemPrice * newQuantity)
        };
      }
      
      // FIX 4: Construct the newItem object to strictly match the CartItem interface
      const newItem: CartItem = {
          book: {
              id: action.payload.id,
              title: action.payload.title,
              author: action.payload.author, 
              price: action.payload.price,
              currency: action.payload.currency,
              format: action.payload.format,
              coverImage: action.payload.coverImage,
          },
          quantity: newQuantity,
      };
      
      return {
        ...state,
        items: [...state.items, newItem],
        total: state.total + (itemPrice * newQuantity)
      };

    case 'REMOVE_FROM_CART':
      const itemToRemove = state.items.find(item => 
        `${item.book.id}-${item.book.format}` === action.payload
      );
      
      const removePrice = itemToRemove ? itemToRemove.book.price * itemToRemove.quantity : 0; 
      
      return {
        ...state,
        items: state.items.filter(item => 
          `${item.book.id}-${item.book.format}` !== action.payload
        ),
        total: state.total - removePrice
      };

    case 'UPDATE_QUANTITY':
      const itemToUpdate = state.items.find(item => 
        `${item.book.id}-${item.book.format}` === action.payload.id
      );
      if (!itemToUpdate) return state;

      const updatePrice = itemToUpdate.book.price; 
      const quantityDiff = action.payload.quantity - itemToUpdate.quantity;
      
      return {
        ...state,
        items: state.items.map(item =>
          `${item.book.id}-${item.book.format}` === action.payload.id
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

// --- PROVIDER AND HOOK ---

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
