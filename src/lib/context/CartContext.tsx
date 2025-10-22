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
  deliveryCost: number;
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
  | { type: 'CLEAR_CART' };

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
      const deliveryCost = action.payload.deliveryCost;
      const newQuantity = action.payload.quantity || 1;

      if (existingItem) {
        const updatedItems = state.items.map(item =>
          `${item.book.id}-${item.book.format}` === uniqueId
            ? { ...item, quantity: item.quantity + newQuantity }
            : item
        );
        
        const newTotal = updatedItems.reduce((total, item) => 
          total + (item.book.price * item.quantity), 0
        );
        
        const newDeliveryFee = updatedItems.reduce((fee, item) => 
          fee + (item.book.deliveryCost * item.quantity), 0
        );

        return {
          ...state,
          items: updatedItems,
          total: newTotal,
          deliveryFee: newDeliveryFee
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
          deliveryCost: action.payload.deliveryCost
        },
        quantity: newQuantity,
      };

      return {
        ...state,
        items: [...state.items, newItem],
        total: state.total + (itemPrice * newQuantity),
        deliveryFee: state.deliveryFee + (deliveryCost * newQuantity)
      };

    case 'REMOVE_FROM_CART':
      const itemToRemove = state.items.find(item => 
        `${item.book.id}-${item.book.format}` === action.payload
      );
      
      if (!itemToRemove) return state;

      const removePrice = itemToRemove.book.price * itemToRemove.quantity;
      const removeDelivery = itemToRemove.book.deliveryCost * itemToRemove.quantity;

      return {
        ...state,
        items: state.items.filter(item => 
          `${item.book.id}-${item.book.format}` !== action.payload
        ),
        total: state.total - removePrice,
        deliveryFee: state.deliveryFee - removeDelivery
      };

    case 'UPDATE_QUANTITY':
      const itemToUpdate = state.items.find(item => 
        `${item.book.id}-${item.book.format}` === action.payload.id
      );
      if (!itemToUpdate) return state;

      const updatePrice = itemToUpdate.book.price;
      const updateDelivery = itemToUpdate.book.deliveryCost;
      const quantityDiff = action.payload.quantity - itemToUpdate.quantity;

      const updatedItems = state.items.map(item =>
        `${item.book.id}-${item.book.format}` === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

      const newTotal = updatedItems.reduce((total, item) => 
        total + (item.book.price * item.quantity), 0
      );
      
      const newDeliveryFee = updatedItems.reduce((fee, item) => 
        fee + (item.book.deliveryCost * item.quantity), 0
      );

      return {
        ...state,
        items: updatedItems,
        total: newTotal,
        deliveryFee: newDeliveryFee
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