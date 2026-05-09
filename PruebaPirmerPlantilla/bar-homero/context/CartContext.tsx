"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";

export interface CartItem {
  id: string;
  variant_id?: string;
  name: string;
  variant_name?: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; item: CartItem }
  | { type: "REMOVE_ITEM"; id: string; variant_id?: string }
  | { type: "UPDATE_QUANTITY"; id: string; variant_id?: string; quantity: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; items: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const key = action.item.variant_id ?? action.item.id;
      const existing = state.items.find(
        (i) => (i.variant_id ?? i.id) === key
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            (i.variant_id ?? i.id) === key
              ? { ...i, quantity: i.quantity + action.item.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, action.item] };
    }
    case "REMOVE_ITEM": {
      const key = action.variant_id ?? action.id;
      return { items: state.items.filter((i) => (i.variant_id ?? i.id) !== key) };
    }
    case "UPDATE_QUANTITY": {
      const key = action.variant_id ?? action.id;
      if (action.quantity <= 0) {
        return { items: state.items.filter((i) => (i.variant_id ?? i.id) !== key) };
      }
      return {
        items: state.items.map((i) =>
          (i.variant_id ?? i.id) === key ? { ...i, quantity: action.quantity } : i
        ),
      };
    }
    case "CLEAR":
      return { items: [] };
    case "HYDRATE":
      return { items: action.items };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, variant_id?: string) => void;
  updateQuantity: (id: string, quantity: number, variant_id?: string) => void;
  clearCart: () => void;
  itemCount: number;
  total: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "bar-homero-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) dispatch({ type: "HYDRATE", items: JSON.parse(saved) });
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {}
  }, [state.items]);

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const total = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem: (item) => dispatch({ type: "ADD_ITEM", item }),
        removeItem: (id, variant_id) => dispatch({ type: "REMOVE_ITEM", id, variant_id }),
        updateQuantity: (id, quantity, variant_id) =>
          dispatch({ type: "UPDATE_QUANTITY", id, variant_id, quantity }),
        clearCart: () => dispatch({ type: "CLEAR" }),
        itemCount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
