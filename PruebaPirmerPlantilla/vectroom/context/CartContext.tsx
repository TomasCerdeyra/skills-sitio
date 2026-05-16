"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface CartItem {
  id: string;
  variant_id?: string;
  name: string;
  variant_name?: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, variant_id?: string) => void;
  updateQuantity: (id: string, quantity: number, variant_id?: string) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("cart") ?? "[]");
    } catch {
      return [];
    }
  });

  const persist = useCallback((next: CartItem[]) => {
    setItems(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(next));
    }
  }, []);

  const addItem = useCallback(
    (item: CartItem) => {
      setItems((prev) => {
        const idx = prev.findIndex(
          (i) => i.id === item.id && i.variant_id === item.variant_id
        );
        let next: CartItem[];
        if (idx >= 0) {
          next = prev.map((i, index) =>
            index === idx ? { ...i, quantity: i.quantity + item.quantity } : i
          );
        } else {
          next = [...prev, item];
        }
        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify(next));
        }
        return next;
      });
    },
    []
  );

  const removeItem = useCallback(
    (id: string, variant_id?: string) => {
      const next = items.filter(
        (i) => !(i.id === id && i.variant_id === variant_id)
      );
      persist(next);
    },
    [items, persist]
  );

  const updateQuantity = useCallback(
    (id: string, quantity: number, variant_id?: string) => {
      if (quantity <= 0) {
        removeItem(id, variant_id);
        return;
      }
      const next = items.map((i) =>
        i.id === id && i.variant_id === variant_id ? { ...i, quantity } : i
      );
      persist(next);
    },
    [items, persist, removeItem]
  );

  const clearCart = useCallback(() => {
    persist([]);
  }, [persist]);

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, total, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}
