"use client";

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Book } from '../data/book';

// ⚠️ FIX 1: Define the strict CartItem payload structure
// This is the clean object that should be passed for cart operations.
interface CartItemPayload {
  id: string;
  title: string;
  price: number; // Required for calculation
  currency: string;
  quantity: number;
  format: 'ebook' | 'paperback' | 'hardcover';
  coverImage: string;
}

// ⚠️ FIX 2: Simplify CartItem to hold the necessary book details, not the entire Book type.
// This is what the ADD_TO_CART payload will become.
interface CartItem extends CartItemPayload {
    // Note: We use the simplified payload here. 
    // The previous structure 'book: Book & { bookFormat?: string }' was problematic.
    // The quantity property is already included in CartItemPayload, but we redefine it
    // here to match the reducer's item structure.
    book: Omit<CartItemPayload, 'quantity'>; // The book details without quantity
    quantity: number;
}


interface CartState {
  items: CartItem[];
  total: number;
}

// ⚠️ FIX 3: Update ADD_TO_CART action to expect the clean CartItemPayload
type CartAction =
  | { type: 'ADD_TO_CART'; payload: CartItemPayload } // Expect a clean payload object
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | undefined>(undefined);

// ⚠️ Remove the redundant getBookPrice helper function as the ADD_TO_CART
// action now provides the exact price in its payload.

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // Create a unique ID for the item based on book ID and format
      const uniqueId = `${action.payload.id}-${action.payload.format}`;
      
      const existingItem = state.items.find(item => 
        `${item.book.id}-${item.book.format}` === uniqueId
      );

      const itemPrice = action.payload.price; // Price is now directly in the payload

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            `${item.book.id}-${item.book.format}` === uniqueId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + itemPrice
        };
      }
      
      // Construct the item for the state
      const newItem: CartItem = {
          book: {
              id: action.payload.id,
              title: action.payload.title,
              price: action.payload.price,
              currency: action.payload.currency,
              format: action.payload.format,
              coverImage: action.payload.coverImage,
          },
          quantity: 1, // Always start with 1 on ADD_TO_CART
      };
      
      return {
        ...state,
        items: [...state.items, newItem],
        total: state.total + itemPrice
      };

    case 'REMOVE_FROM_CART':
      const itemToRemove = state.items.find(item => 
        `${item.book.id}-${item.book.format}` === action.payload
      );
      // The price is now on the cart item object
      const removePrice = itemToRemove ? itemToRemove.book.price * itemToRemove.quantity : 0; 
      
      return {
        ...state,
        items: state.items.filter(item => 
          `${item.book.id}-${item.book.format}` !== action.payload
        ),
        total: state.total - removePrice
      };

    case 'UPDATE_QUANTITY':
      // The payload.id here must be the unique ID (bookId-format)
      const itemToUpdate = state.items.find(item => 
        `${item.book.id}-${item.book.format}` === action.payload.id
      );
      if (!itemToUpdate) return state;

      const updatePrice = itemToUpdate.book.price; // Price is on the item
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
