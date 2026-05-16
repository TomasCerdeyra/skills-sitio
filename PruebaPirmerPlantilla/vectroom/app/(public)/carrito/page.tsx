"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function CarritoPage() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-12">
        <h1 className="font-display text-4xl lg:text-5xl font-black uppercase tracking-[-0.03em] text-neutral-900 mb-10">
          Tu pedido
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-6xl lg:text-8xl font-black uppercase tracking-[-0.04em] text-neutral-200 mb-6">
              Vacío
            </p>
            <p className="font-body text-neutral-500 mb-8">
              Todavía no agregaste ninguna prenda.
            </p>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 bg-neutral-900 text-white px-8 py-3.5 rounded-full font-body font-semibold text-sm hover:bg-neutral-700 transition-colors"
            >
              Ver el catálogo
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Lista de items */}
            <div className="lg:col-span-2 bg-white rounded-none border border-neutral-200">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div
                    key={`${item.id}-${item.variant_id ?? ""}`}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -40, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.3 }}
                    className="flex gap-4 p-5 border-b border-neutral-100 last:border-0"
                  >
                    {/* Imagen */}
                    <div className="relative w-20 h-24 flex-shrink-0 overflow-hidden bg-neutral-100 rounded-sm">
                      {item.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-neutral-100" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-bold uppercase tracking-tight text-neutral-900 text-base leading-tight">
                        {item.name}
                      </p>
                      {item.variant_name && (
                        <p className="font-body text-xs text-neutral-400 mt-0.5">
                          Talle: {item.variant_name}
                        </p>
                      )}
                      <p className="font-body text-sm font-semibold text-neutral-900 mt-1">
                        ${(item.price * item.quantity).toLocaleString("es-AR")}
                      </p>
                    </div>

                    {/* Controles */}
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <button
                        onClick={() => removeItem(item.id, item.variant_id)}
                        className="text-neutral-300 hover:text-red-400 transition-colors text-xs"
                        aria-label="Eliminar"
                      >
                        ✕
                      </button>
                      <div className="flex items-center gap-2 border border-neutral-200 rounded-full px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant_id)}
                          className="w-5 h-5 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors font-medium"
                          aria-label="Restar"
                        >
                          −
                        </button>
                        <span className="font-body text-sm font-medium text-neutral-900 w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant_id)}
                          className="w-5 h-5 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors font-medium"
                          aria-label="Sumar"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <div className="p-5">
                <Link
                  href="/catalogo"
                  className="font-body text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  ← Seguir comprando
                </Link>
              </div>
            </div>

            {/* Resumen */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-neutral-900 text-white p-6 space-y-4">
                <h2 className="font-display text-xl font-bold uppercase tracking-tight">
                  Resumen
                </h2>
                <div className="space-y-2 text-sm border-t border-white/10 pt-4">
                  <div className="flex justify-between text-neutral-400">
                    <span>{itemCount} {itemCount === 1 ? "prenda" : "prendas"}</span>
                    <span>${total.toLocaleString("es-AR")}</span>
                  </div>
                  <div className="flex justify-between text-neutral-500 text-xs">
                    <span>Envío</span>
                    <span>Se calcula al pagar</span>
                  </div>
                </div>
                <div className="border-t border-white/10 pt-4 flex justify-between font-semibold">
                  <span className="font-body">Subtotal</span>
                  <span className="font-display text-lg">${total.toLocaleString("es-AR")}</span>
                </div>
                <Link
                  href="/checkout/datos"
                  className="block w-full text-center px-6 py-3.5 bg-white text-neutral-900 rounded-full font-body font-semibold text-sm hover:bg-neutral-100 transition-colors"
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
