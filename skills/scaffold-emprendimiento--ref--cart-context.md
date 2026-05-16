# Reference: `context/CartContext.tsx`

Path destino: `context/CartContext.tsx`

Context + hook para el carrito de compras. Persiste en `localStorage`. Requerido por `app/(public)/carrito/page.tsx` y por `components/ui/Header.tsx` (para mostrar el contador de items).

## ⚠️ Obligatorio para Emprendimiento y Empresa

El carrito page (`scaffold-emprendimiento--ref--carrito-page.md`) usa `useCart()`. Sin este archivo el proyecto no compila.

Pasos:
1. Crear `context/CartContext.tsx` (este archivo)
2. Envolver `{children}` en `app/layout.tsx` con `<CartProvider>`
3. El header puede leer `useCart().itemCount` para mostrar el badge del carrito

```typescript
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

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
  itemCount: number;
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string, variant_id?: string) => void;
  updateQuantity: (id: string, quantity: number, variant_id?: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Cargar desde localStorage al montar
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cart");
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  // Persistir en localStorage al cambiar
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const itemCount = items.reduce((s, i) => s + i.quantity, 0);
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

  function addItem(item: CartItem) {
    setItems((prev) => {
      const idx = prev.findIndex(
        (i) => i.id === item.id && i.variant_id === item.variant_id
      );
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + item.quantity };
        return updated;
      }
      return [...prev, item];
    });
  }

  function removeItem(id: string, variant_id?: string) {
    setItems((prev) =>
      prev.filter((i) => !(i.id === id && i.variant_id === variant_id))
    );
  }

  function updateQuantity(id: string, quantity: number, variant_id?: string) {
    if (quantity <= 0) {
      removeItem(id, variant_id);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.id === id && i.variant_id === variant_id ? { ...i, quantity } : i
      )
    );
  }

  function clearCart() {
    setItems([]);
  }

  return (
    <CartContext.Provider
      value={{ items, itemCount, total, addItem, removeItem, updateQuantity, clearCart }}
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
```

## Integración en `app/layout.tsx`

Después de crear el archivo, envolver `{children}` en el root layout:

```tsx
import { CartProvider } from "@/context/CartContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
```

## Uso en componentes

```tsx
// En cualquier componente client
"use client";
import { useCart } from "@/context/CartContext";

export function CartBadge() {
  const { itemCount } = useCart();
  return <span>{itemCount}</span>;
}

// En AddToCartButton
const { addItem } = useCart();
addItem({ id, name, price, quantity: 1, image });

// En carrito/page.tsx
const { items, removeItem, updateQuantity, total, itemCount } = useCart();
```

## Notas

- El carrito persiste en `localStorage` — sobrevive refreshes y navegación.
- `clearCart()` se llama después del pago exitoso (en checkout/status o en process-payment).
- `updateQuantity(id, 0)` equivale a `removeItem` — el botón "−" con quantity 1 elimina el item.
- La key en `CartItemRow` debe combinar `id + variant_id` para distinguir variantes del mismo producto.
