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

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, variant_id?: string) => void;
  updateQuantity: (id: string, quantity: number, variant_id?: string) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        return JSON.parse(localStorage.getItem("cart") ?? "[]");
      } catch {
        return [];
      }
    }
    return [];
  });

  const syncToStorage = useCallback((newItems: CartItem[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(newItems));
    }
  }, []);

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.id === item.id && i.variant_id === item.variant_id
      );
      let newItems: CartItem[];
      if (existingIdx >= 0) {
        newItems = prev.map((i, idx) =>
          idx === existingIdx ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        newItems = [...prev, item];
      }
      syncToStorage(newItems);
      return newItems;
    });
  }, [syncToStorage]);

  const removeItem = useCallback((id: string, variant_id?: string) => {
    setItems((prev) => {
      const newItems = prev.filter(
        (i) => !(i.id === id && i.variant_id === variant_id)
      );
      syncToStorage(newItems);
      return newItems;
    });
  }, [syncToStorage]);

  const updateQuantity = useCallback((id: string, quantity: number, variant_id?: string) => {
    setItems((prev) => {
      let newItems: CartItem[];
      if (quantity <= 0) {
        newItems = prev.filter(
          (i) => !(i.id === id && i.variant_id === variant_id)
        );
      } else {
        newItems = prev.map((i) =>
          i.id === id && i.variant_id === variant_id ? { ...i, quantity } : i
        );
      }
      syncToStorage(newItems);
      return newItems;
    });
  }, [syncToStorage]);

  const clearCart = useCallback(() => {
    setItems([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
  }, []);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

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
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
