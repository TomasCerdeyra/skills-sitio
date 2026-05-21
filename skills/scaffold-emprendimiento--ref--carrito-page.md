# Reference: Pagina de carrito

Path: `app/(public)/carrito/page.tsx` (o `app/checkout/page.tsx` en plan Empresa)

## Regla critica: esperar `hydrated` antes de mostrar estado vacio

Sin este check, la primera renderizacion muestra el carrito vacio aunque el usuario tenga items guardados en localStorage. El usuario ve "Tu carrito esta vacio" y no puede continuar.

**Patron obligatorio:**

```tsx
const { items, removeItem, updateQty, total, count, hydrated } = useCart();

// 1. Esperar hydration
if (!hydrated) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

// 2. Recien despues verificar si esta vacio
if (items.length === 0) {
  return <EstadoVacioUI />;
}
```

---

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

function CartItemRow({ item, onRemove, onQty }: {
  item: { id: string; name: string; variantName?: string; price: number; quantity: number; image?: string };
  onRemove: () => void;
  onQty: (delta: number) => void;
}) {
  return (
    <div className="flex gap-4 p-4 bg-white rounded-2xl border border-neutral-100">
      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0">
        {item.image && (
          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-neutral-900 truncate">{item.name}</p>
        {item.variantName && (
          <p className="text-sm text-neutral-400 mt-0.5">{item.variantName}</p>
        )}
        <p className="text-sm font-semibold text-brand-primary mt-1">
          ${(item.price * item.quantity).toLocaleString("es-AR")}
        </p>
        <div className="flex items-center gap-3 mt-2">
          <button onClick={() => onQty(-1)} className="w-7 h-7 rounded-full border border-neutral-200 text-neutral-500 hover:border-brand-primary flex items-center justify-center">-</button>
          <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
          <button onClick={() => onQty(1)} className="w-7 h-7 rounded-full border border-neutral-200 text-neutral-500 hover:border-brand-primary flex items-center justify-center">+</button>
          <button onClick={onRemove} className="ml-auto text-neutral-400 hover:text-red-400 text-xs">Eliminar</button>
        </div>
      </div>
    </div>
  );
}

export default function CarritoPage() {
  const { items, removeItem, updateQty, total, count, hydrated } = useCart();

  // Esperar hydration - sin esto el carrito siempre aparece vacio al navegar
  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="font-display text-3xl text-neutral-900 mb-4">Tu carrito esta vacio</h1>
          <p className="text-neutral-500 mb-8">Encontra lo que buscas en nuestro catalogo.</p>
          <Link href="/catalogo" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary text-white rounded-full font-semibold hover:bg-brand-primary/90 transition-colors">
            Ver el catalogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="font-display text-3xl text-neutral-900 mb-8">Tu pedido</h1>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                onRemove={() => removeItem(item.id)}
                onQty={(delta) => updateQty(item.id, item.quantity + delta)}
              />
            ))}
            <Link href="/catalogo" className="block text-sm text-brand-primary font-medium hover:underline mt-4">
              Agregar mas productos
            </Link>
          </div>
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
              <h2 className="font-display text-xl text-neutral-900">Resumen</h2>
              <div className="flex justify-between text-sm text-neutral-500">
                <span>{count} {count === 1 ? "producto" : "productos"}</span>
                <span>${total.toLocaleString("es-AR")}</span>
              </div>
              <div className="border-t border-neutral-100 pt-4 flex justify-between font-semibold text-neutral-900">
                <span>Subtotal</span>
                <span>${total.toLocaleString("es-AR")}</span>
              </div>
              <Link href="/checkout/datos" className="block w-full text-center px-6 py-3.5 bg-brand-primary text-white rounded-full font-semibold text-sm hover:bg-brand-primary/90 transition-colors">
                Continuar al pago
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Notas

- CartContext DEBE estar en el ROOT layout via `app/providers.tsx` — no en sub-layouts.
- `hydrated` siempre antes de verificar `items.length === 0` o redirigir.
- `updateQty(id, 0)` elimina el item automaticamente via reducer.
- Las paginas de checkout (`/checkout/datos`, `/checkout/pago`) tambien necesitan el check de `hydrated`.
