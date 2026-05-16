"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

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
  updateQuantity: (id: string, qty: number, variant_id?: string) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Cargar del localStorage al montar
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cart");
      if (saved) setItems(JSON.parse(saved));
    } catch {
      // Ignorar errores de parse
    }
  }, []);

  // Persistir en localStorage al cambiar
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      const idx = prev.findIndex(
        (i) => i.id === item.id && i.variant_id === item.variant_id
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + item.quantity };
        return next;
      }
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback((id: string, variant_id?: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.id === id && i.variant_id === variant_id))
    );
  }, []);

  const updateQuantity = useCallback((id: string, qty: number, variant_id?: string) => {
    if (qty <= 0) {
      setItems((prev) =>
        prev.filter((i) => !(i.id === id && i.variant_id === variant_id))
      );
    } else {
      setItems((prev) =>
        prev.map((i) =>
          i.id === id && i.variant_id === variant_id ? { ...i, quantity: qty } : i
        )
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
