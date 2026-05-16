"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function CarritoPage() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      <div className="max-w-5xl mx-auto px-5 py-12">
        <h1 className="font-display text-3xl lg:text-4xl font-bold text-neutral-900 mb-10">
          Tu carrito
          {itemCount > 0 && (
            <span className="ml-3 font-body text-lg font-normal text-neutral-400">
              ({itemCount} {itemCount === 1 ? "item" : "items"})
            </span>
          )}
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-24 border-2 border-dashed border-neutral-200 rounded-sm">
            <p className="font-display text-5xl text-neutral-200 mb-4">♩</p>
            <p className="font-display text-xl text-neutral-400 mb-2">El carrito está vacío</p>
            <p className="font-body text-sm text-neutral-400 mb-8">
              Explorá nuestros instrumentos y agregá los que te gusten.
            </p>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 bg-brand-primary text-neutral-50 px-8 py-3.5 font-body font-semibold text-sm hover:bg-brand-primary/90 transition-colors rounded-sm"
            >
              Ver instrumentos →
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Items */}
            <div className="lg:col-span-2 space-y-0">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div
                    key={`${item.id}-${item.variant_id ?? ""}`}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -40, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="flex gap-5 py-6 border-b border-neutral-200 last:border-0"
                  >
                    {/* Imagen */}
                    <div className="w-20 h-20 bg-neutral-100 rounded-sm overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-neutral-300 text-2xl">
                          ♪
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-semibold text-neutral-900 text-base leading-snug">
                        {item.name}
                      </p>
                      {item.variant_name && (
                        <p className="font-body text-sm text-neutral-400 mt-0.5">
                          {item.variant_name}
                        </p>
                      )}
                      <p className="font-body font-bold text-brand-primary mt-2 text-sm">
                        ${(item.price * item.quantity).toLocaleString("es-AR")}
                      </p>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col items-end gap-3 flex-shrink-0">
                      <button
                        onClick={() => removeItem(item.id, item.variant_id)}
                        className="font-body text-xs text-neutral-300 hover:text-red-400 transition-colors"
                      >
                        ✕ Quitar
                      </button>
                      <div className="flex items-center gap-2 border border-neutral-200 rounded-sm px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant_id)}
                          className="w-6 h-6 flex items-center justify-center text-neutral-500 hover:text-brand-primary transition-colors"
                          aria-label="Restar uno"
                        >
                          −
                        </button>
                        <span className="font-body font-medium text-neutral-900 w-5 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant_id)}
                          className="w-6 h-6 flex items-center justify-center text-neutral-500 hover:text-brand-primary transition-colors"
                          aria-label="Sumar uno"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <div className="pt-4">
                <Link
                  href="/catalogo"
                  className="font-body text-sm text-brand-primary hover:text-brand-primary/70 transition-colors"
                >
                  ← Seguir comprando
                </Link>
              </div>
            </div>

            {/* Summary sticky */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-white rounded-sm border border-neutral-200 p-6 shadow-sm">
                <h2 className="font-display text-xl font-bold text-neutral-900 mb-6">
                  Resumen
                </h2>
                <div className="space-y-2 text-sm mb-6">
                  <div className="flex justify-between text-neutral-500 font-body">
                    <span>{itemCount} {itemCount === 1 ? "producto" : "productos"}</span>
                    <span>${total.toLocaleString("es-AR")}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400 font-body text-xs">
                    <span>Envío</span>
                    <span>Calculado al pagar</span>
                  </div>
                </div>
                <div className="border-t border-neutral-100 pt-4 flex justify-between items-baseline mb-6">
                  <span className="font-display text-lg font-bold text-neutral-900">Subtotal</span>
                  <span className="font-display text-2xl font-bold text-brand-primary">
                    ${total.toLocaleString("es-AR")}
                  </span>
                </div>
                <Link
                  href="/checkout/datos"
                  className="block w-full text-center bg-brand-primary text-neutral-50 py-4 font-body font-semibold text-sm hover:bg-brand-primary/90 transition-colors rounded-sm"
                >
                  Continuar al pago →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
