"use client";

import { useCart, type CartItem } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

function CartItemRow({ item }: { item: CartItem }) {
  const { removeItem, updateQuantity } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -24, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className="flex gap-4 items-start bg-white rounded-2xl p-4 shadow-sm border border-neutral-100"
    >
      {/* Image */}
      <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-neutral-100">
        {item.image ? (
          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-2xl opacity-20">🍺</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-neutral-900 text-sm leading-snug line-clamp-2">
          {item.name}
        </p>
        {item.variant_name && (
          <p className="text-xs text-neutral-400 mt-0.5">{item.variant_name}</p>
        )}
        <p className="text-sm font-semibold text-brand-primary mt-1.5">
          ${(item.price * item.quantity).toLocaleString("es-AR")}
          {item.quantity > 1 && (
            <span className="text-neutral-400 font-normal ml-1.5 text-xs">
              (${item.price.toLocaleString("es-AR")} c/u)
            </span>
          )}
        </p>
      </div>

      {/* Quantity + Remove */}
      <div className="flex flex-col items-end gap-3 shrink-0">
        <button
          onClick={() => removeItem(item.id, item.variant_id)}
          className="p-1.5 text-neutral-300 hover:text-red-400 transition-colors rounded-lg hover:bg-red-50"
          aria-label="Eliminar producto"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" />
          </svg>
        </button>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant_id)}
            className="w-7 h-7 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 transition-colors text-base leading-none"
            aria-label="Reducir cantidad"
          >
            −
          </button>
          <span className="text-sm font-semibold w-6 text-center text-neutral-800">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant_id)}
            className="w-7 h-7 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 transition-colors text-base leading-none"
            aria-label="Aumentar cantidad"
          >
            +
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function CarritoPage() {
  const { items, total, itemCount, clearCart } = useCart();

  return (
    <div className="min-h-screen bg-neutral-50 pt-24">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl text-neutral-900">Tu pedido</h1>
            <p className="text-neutral-400 text-sm mt-1">
              {itemCount === 0
                ? "Todavía no agregaste nada"
                : `${itemCount} ${itemCount === 1 ? "producto" : "productos"}`}
            </p>
          </div>
          {itemCount > 0 && (
            <button
              onClick={clearCart}
              className="text-xs text-neutral-400 hover:text-red-400 transition-colors mt-1 underline underline-offset-2"
            >
              Vaciar todo
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-6xl mb-5">🛒</p>
              <h2 className="font-display text-2xl text-neutral-900 mb-2">
                El pedido está vacío
              </h2>
              <p className="text-neutral-500 text-sm mb-8 max-w-xs mx-auto">
                Explorá la carta y agregá lo que se te antoje.
              </p>
              <Link
                href="/catalogo"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-primary text-white rounded-full font-semibold text-sm hover:bg-brand-primary/90 transition-colors"
              >
                Ver la carta →
              </Link>
            </motion.div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-start">
            {/* Items */}
            <div>
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <div key={item.variant_id ?? item.id} className="mb-3">
                    <CartItemRow item={item} />
                  </div>
                ))}
              </AnimatePresence>

              <Link
                href="/catalogo"
                className="inline-flex items-center gap-1.5 mt-3 text-sm text-neutral-400 hover:text-brand-primary transition-colors"
              >
                ← Seguir explorando la carta
              </Link>
            </div>

            {/* Summary */}
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
                <h2 className="font-display text-lg text-neutral-900 mb-5">Resumen del pedido</h2>

                <div className="space-y-2.5 mb-5">
                  {items.map((item) => (
                    <div
                      key={item.variant_id ?? item.id}
                      className="flex justify-between text-sm text-neutral-600"
                    >
                      <span className="truncate pr-3 max-w-[160px]">
                        {item.name}
                        {item.variant_name ? ` — ${item.variant_name}` : ""}
                        <span className="text-neutral-400"> × {item.quantity}</span>
                      </span>
                      <span className="shrink-0 font-medium tabular-nums">
                        ${(item.price * item.quantity).toLocaleString("es-AR")}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-neutral-100 pt-4 mb-1">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm text-neutral-500">Subtotal</span>
                    <span className="text-2xl font-bold text-neutral-900 tabular-nums">
                      ${total.toLocaleString("es-AR")}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1.5">
                    Envío y descuentos en el siguiente paso
                  </p>
                </div>

                <Link
                  href="/checkout/datos"
                  className="mt-5 block w-full text-center bg-brand-primary text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-brand-primary/90 transition-colors"
                >
                  Continuar al pago →
                </Link>

                <p className="text-xs text-neutral-400 text-center mt-3">
                  Pago seguro con Mercado Pago
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
