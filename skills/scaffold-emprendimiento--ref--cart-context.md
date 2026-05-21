# Reference: `context/CartContext.tsx`

Path destino: `context/CartContext.tsx`

Context + hook para el carrito de compras. Persiste en `localStorage`. Requerido por `app/(public)/carrito/page.tsx` y por `components/ui/Header.tsx` (para mostrar el contador de items).

## Obligatorio para Emprendimiento y Empresa

El carrito page (`scaffold-emprendimiento--ref--carrito-page.md`) usa `useCart()`. Sin este archivo el proyecto no compila.

## CartProvider va en el ROOT LAYOUT — no en sub-layouts

**Error critico:** colocar `<CartProvider>` en `app/(public)/layout.tsx` o en `app/checkout/layout.tsx` crea instancias separadas con estado aislado. El carrito aparece vacio al navegar entre rutas porque cada layout tiene su propio estado.

**Solucion correcta:** `CartProvider` en `app/layout.tsx` (root). Pero el root layout es un Server Component, asi que se necesita un wrapper client:

### Paso 1 - Crear `app/providers.tsx`

```tsx
"use client";

import { CartProvider } from "@/context/CartContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
```

### Paso 2 - Usar `<Providers>` en `app/layout.tsx`

```tsx
import { Providers } from "./providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

**Verificar que NO haya `<CartProvider>` en sub-layouts** (`app/(public)/layout.tsx`, `app/checkout/layout.tsx`). Si esta, quitarlo.

---

## Flag `hydrated` - evitar flash de carrito vacio

Sin el flag `hydrated`, el primer render (antes de que `useEffect` cargue `localStorage`) muestra el carrito vacio aunque el usuario tenga items. Esto causa que la pagina de carrito muestre "Tu carrito esta vacio" o redirija prematuramente.

La solucion es exponer `hydrated: boolean` en el contexto y no mostrar el estado de carrito vacio hasta que `hydrated === true`.

---

## Implementacion completa

```typescript
"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  ReactNode,
} from "react";

export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  name: string;
  variantName?: string;
  price: number;
  quantity: number;
  image?: string;
  slug: string;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD"; item: CartItem }
  | { type: "REMOVE"; id: string }
  | { type: "UPDATE_QTY"; id: string; qty: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; items: CartItem[] };

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { items: action.items };
    case "ADD": {
      const existing = state.items.findIndex((i) => i.id === action.item.id);
      if (existing >= 0) {
        const updated = [...state.items];
        updated[existing] = {
          ...updated[existing],
          quantity: updated[existing].quantity + action.item.quantity,
        };
        return { items: updated };
      }
      return { items: [...state.items, action.item] };
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.id !== action.id) };
    case "UPDATE_QTY":
      if (action.qty <= 0) {
        return { items: state.items.filter((i) => i.id !== action.id) };
      }
      return {
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: action.qty } : i
        ),
      };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

interface CartContextType {
  items: CartItem[];
  count: number;
  total: number;
  hydrated: boolean;
  addItem: (item: Omit<CartItem, "id"> & { productId: string; variantId?: string }) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cart");
      if (stored) dispatch({ type: "HYDRATE", items: JSON.parse(stored) });
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("cart", JSON.stringify(state.items));
  }, [state.items, hydrated]);

  const count = state.items.reduce((s, i) => s + i.quantity, 0);
  const total = state.items.reduce((s, i) => s + i.price * i.quantity, 0);

  function addItem(
    item: Omit<CartItem, "id"> & { productId: string; variantId?: string }
  ) {
    const id = `${item.productId}-${item.variantId ?? "default"}`;
    dispatch({ type: "ADD", item: { ...item, id } });
  }

  function removeItem(id: string) {
    dispatch({ type: "REMOVE", id });
  }

  function updateQty(id: string, qty: number) {
    dispatch({ type: "UPDATE_QTY", id, qty });
  }

  function clearCart() {
    dispatch({ type: "CLEAR" });
  }

  return (
    <CartContext.Provider
      value={{ items: state.items, count, total, hydrated, addItem, removeItem, updateQty, clearCart }}
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
```

---

## Uso en componentes

```tsx
// Header - badge con count
"use client";
import { useCart } from "@/context/CartContext";

export function CartBadge() {
  const { count, hydrated } = useCart();
  if (!hydrated) return null;
  return count > 0 ? <span>{count}</span> : null;
}

// ProductDetail - agregar al carrito
const { addItem } = useCart();
addItem({
  productId: product.id,
  variantId: selectedVariant?.id,
  name: product.name,
  variantName: selectedVariant?.name,
  price: product.price,
  image: product.images[0],
  slug: product.slug,
  quantity: 1,
});

// Carrito page
const { items, removeItem, updateQty, total, count, hydrated } = useCart();
```

## Notas

- `clearCart()` se llama despues del pago exitoso (en `checkout/status`).
- La key de `CartItem` en listas usa `item.id` que es `productId-variantId` (unico por linea).
- El flag `hydrated` SIEMPRE debe estar en el tipo del contexto. Cualquier pagina que lea `items` o `count` debe esperar `hydrated === true` antes de mostrar estado vacio o redirigir.
