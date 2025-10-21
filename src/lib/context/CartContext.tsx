"use client";

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface CartItemPayload {
  id: string;
  title: string;
  author: string;
  price: number;
  currency: string;
  format: 'ebook' | 'paperback' | 'hardcover';
  coverImage: string;
  deliveryCost?: number;
}

interface CartItem {
  book: CartItemPayload;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  deliveryFee: number;
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: CartItemPayload & { quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'UPDATE_DELIVERY_FEE'; payload: number };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const uniqueId = `${action.payload.id}-${action.payload.format}`;
      const existingItem = state.items.find(item => 
        `${item.book.id}-${item.book.format}` === uniqueId
      );

      const itemPrice = action.payload.price;
      const deliveryCost = action.payload.format === 'ebook' ? 0 : 150;
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

      const newItem: CartItem = {
        book: {
          id: action.payload.id,
          title: action.payload.title,
          author: action.payload.author,
          price: action.payload.price,
          currency: action.payload.currency,
          format: action.payload.format,
          coverImage: action.payload.coverImage,
          deliveryCost
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

    case 'UPDATE_DELIVERY_FEE':
      return {
        ...state,
        deliveryFee: action.payload
      };

    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
        deliveryFee: 0
      };

    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    deliveryFee: 0
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