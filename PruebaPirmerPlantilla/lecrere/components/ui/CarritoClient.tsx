"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface CartItem {
  id: string;
  variant_id?: string;
  name: string;
  variant_name?: string;
  price: number;
  quantity: number;
  image?: string;
}

export function CarritoClient() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const loadCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart") ?? "[]");
      setItems(cart);
    };
    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    return () => window.removeEventListener("cartUpdated", loadCart);
  }, []);

  function updateQty(id: string, variantId: string | undefined, delta: number) {
    setItems((prev) => {
      const next = prev
        .map((item) =>
          item.id === id && item.variant_id === variantId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0);
      localStorage.setItem("cart", JSON.stringify(next));
      return next;
    });
  }

  function removeItem(id: string, variantId: string | undefined) {
    setItems((prev) => {
      const next = prev.filter(
        (item) => !(item.id === id && item.variant_id === variantId)
      );
      localStorage.setItem("cart", JSON.stringify(next));
      return next;
    });
  }

  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

  if (!mounted) return null;

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-10 pt-32 pb-20">
      <h1 className="font-display text-5xl lg:text-7xl font-light text-neutral-900 mb-12">
        Carrito.
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-24 border border-neutral-200">
          <p className="font-body text-neutral-600 mb-6">
            Tu carrito está vacío.
          </p>
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 bg-brand-primary text-neutral-50 px-8 py-4 font-body text-sm font-medium hover:bg-neutral-800 transition-colors"
          >
            Ir al catálogo →
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.variant_id}`}
                className="flex gap-4 border-b border-neutral-200 pb-6"
              >
                {item.image && (
                  <div className="relative w-24 h-32 shrink-0 bg-neutral-100 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      quality={70}
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-display text-xl font-light text-neutral-900 mb-1">
                    {item.name}
                  </p>
                  {item.variant_name && (
                    <p className="font-body text-xs text-neutral-500 mb-3 uppercase tracking-wide">
                      {item.variant_name}
                    </p>
                  )}
                  <p className="font-body text-sm font-medium text-neutral-900 mb-4">
                    ${item.price.toLocaleString("es-AR")}
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        updateQty(item.id, item.variant_id, -1)
                      }
                      className="w-8 h-8 border border-neutral-300 flex items-center justify-center font-body text-lg hover:border-brand-primary transition-colors"
                    >
                      −
                    </button>
                    <span className="font-body text-sm w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQty(item.id, item.variant_id, 1)
                      }
                      className="w-8 h-8 border border-neutral-300 flex items-center justify-center font-body text-lg hover:border-brand-primary transition-colors"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.id, item.variant_id)}
                      className="ml-4 font-body text-xs text-neutral-400 hover:text-red-500 transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-body text-sm font-medium">
                    ${(item.price * item.quantity).toLocaleString("es-AR")}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-neutral-100 p-6 sticky top-28">
              <p className="font-body text-xs uppercase tracking-[0.2em] text-neutral-500 mb-6">
                Resumen
              </p>
              <div className="flex justify-between mb-4">
                <span className="font-body text-sm text-neutral-600">
                  Subtotal
                </span>
                <span className="font-body text-sm font-medium">
                  ${subtotal.toLocaleString("es-AR")}
                </span>
              </div>
              <div className="flex justify-between mb-8 pb-6 border-b border-neutral-300">
                <span className="font-body text-sm text-neutral-600">
                  Envío
                </span>
                <span className="font-body text-sm text-neutral-600">
                  Se calcula al pagar
                </span>
              </div>
              <Link
                href="/checkout/datos"
                className="block w-full bg-brand-primary text-neutral-50 py-4 text-center font-body text-sm font-medium hover:bg-neutral-800 active:scale-95 transition-all duration-200"
              >
                Continuar con el pago →
              </Link>
              <Link
                href="/catalogo"
                className="block w-full mt-3 py-3 text-center font-body text-sm text-neutral-600 hover:text-brand-secondary transition-colors"
              >
                Seguir comprando
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
