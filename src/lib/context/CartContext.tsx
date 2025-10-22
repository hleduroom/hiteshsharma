"use client";

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// --- CONSTANTS ---
const SHIPPING_COST = 150;
const NEPAL_CURRENCY = 'NPR';

// --- UPDATED INTERFACES ---

interface CartItemPayload {
  id: string;
  title: string;
  author: string; 
  price: number; 
  currency: string;
  format: 'ebook' | 'paperback' | 'hardcover';
  coverImage: string;
}

interface CartItem {
    book: CartItemPayload; 
    quantity: number;
}

interface CartState {
  items: CartItem[];
  subtotal: number; // Sum of item prices * quantity
  shipping: number; // 0 or 150
  total: number; // subtotal + shipping
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: CartItemPayload & { quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } } 
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | undefined>(undefined);

// --- HELPER FUNCTION FOR CALCULATION (CORE LOGIC) ---

const calculateCartTotals = (items: CartItem[]): Pick<CartState, 'subtotal' | 'shipping' | 'total'> => {
    let subtotal = 0;
    let needsShipping = false;

    for (const item of items) {
        subtotal += item.book.price * item.quantity;
        // Logic: If any item is paperback or hardcover, shipping is charged.
        if (item.book.format !== 'ebook') {
            needsShipping = true;
        }
    }

    const shipping = needsShipping ? SHIPPING_COST : 0;
    const total = subtotal + shipping;

    return { subtotal, shipping, total };
};

// --- REDUCER LOGIC ---

const cartReducer = (state: CartState, action: CartAction): CartState => {
  let newItems: CartItem[] = [];
  let totals;

  switch (action.type) {
    case 'ADD_TO_CART':
      const uniqueId = `${action.payload.id}-${action.payload.format}`;
      const newQuantity = action.payload.quantity || 1; 

      const existingItemIndex = state.items.findIndex(item => 
        `${item.book.id}-${item.book.format}` === uniqueId
      );

      if (existingItemIndex > -1) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + newQuantity }
            : item
        );
      } else {
        const newItem: CartItem = {
            book: action.payload,
            quantity: newQuantity,
        };
        newItems = [...state.items, newItem];
      }
      
      totals = calculateCartTotals(newItems);
      return { ...state, items: newItems, ...totals };

    case 'REMOVE_FROM_CART':
      newItems = state.items.filter(item => 
        `${item.book.id}-${item.book.format}` !== action.payload
      );
      
      totals = calculateCartTotals(newItems);
      return { ...state, items: newItems, ...totals };

    case 'UPDATE_QUANTITY':
      newItems = state.items.map(item =>
        `${item.book.id}-${item.book.format}` === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0);

      totals = calculateCartTotals(newItems);
      return { ...state, items: newItems, ...totals };

    case 'CLEAR_CART':
      return {
        items: [],
        subtotal: 0,
        shipping: 0,
        total: 0
      };

    default:
      return state;
  }
};

// --- PROVIDER AND HOOK ---

const initialState: CartState = {
    items: [],
    subtotal: 0,
    shipping: 0,
    total: 0
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

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
