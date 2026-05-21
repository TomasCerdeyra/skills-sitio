"use client";

import { createContext, useContext, useEffect, useReducer, useState } from "react";

export type CartItem = {
  id: string;
  productId: string;
  variantId?: string;
  name: string;
  variantName?: string;
  price: number;
  image: string;
  slug: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: "ADD"; item: CartItem }
  | { type: "REMOVE"; id: string }
  | { type: "UPDATE_QTY"; id: string; quantity: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; items: CartItem[] };

function cartKey(productId: string, variantId?: string) {
  return variantId ? `${productId}__${variantId}` : productId;
}

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { items: action.items };

    case "ADD": {
      const key = cartKey(action.item.productId, action.item.variantId);
      const exists = state.items.find(
        (i) => cartKey(i.productId, i.variantId) === key
      );
      if (exists) {
        return {
          items: state.items.map((i) =>
            cartKey(i.productId, i.variantId) === key
              ? { ...i, quantity: i.quantity + action.item.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, { ...action.item, id: key }] };
    }

    case "REMOVE":
      return { items: state.items.filter((i) => i.id !== action.id) };

    case "UPDATE_QTY":
      return {
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: action.quantity } : i
        ),
      };

    case "CLEAR":
      return { items: [] };

    default:
      return state;
  }
}

type CartContextType = {
  items: CartItem[];
  count: number;
  total: number;
  hydrated: boolean;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("gorras-cart");
      if (stored) dispatch({ type: "HYDRATE", items: JSON.parse(stored) });
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("gorras-cart", JSON.stringify(state.items));
  }, [state.items, hydrated]);

  const count = state.items.reduce((acc, i) => acc + i.quantity, 0);
  const total = state.items.reduce((acc, i) => acc + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        count,
        total,
        hydrated,
        addItem: (item) =>
          dispatch({ type: "ADD", item: { ...item, id: cartKey(item.productId, item.variantId) } }),
        removeItem: (id) => dispatch({ type: "REMOVE", id }),
        updateQty: (id, quantity) => dispatch({ type: "UPDATE_QTY", id, quantity }),
        clearCart: () => dispatch({ type: "CLEAR" }),
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
