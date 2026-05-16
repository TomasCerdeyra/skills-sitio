"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

function CartItemRow({ item, onRemove, onQty }: {
  item: { id: string; variant_id?: string; name: string; variant_name?: string; price: number; quantity: number; image?: string };
  onRemove: () => void;
  onQty: (delta: number) => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -40, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className="flex gap-4 py-5 border-b border-neutral-100 last:border-0"
    >
      {/* Imagen */}
      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0">
        {item.image ? (
          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-300 text-2xl">◻</div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-neutral-900 truncate">{item.name}</p>
        {item.variant_name && (
          <p className="text-sm text-neutral-400 mt-0.5">{item.variant_name}</p>
        )}
        <p className="text-sm font-semibold text-brand-primary mt-1">
          ${(item.price * item.quantity).toLocaleString("es-AR")}
        </p>
      </div>

      {/* Controles */}
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <button
          onClick={onRemove}
          className="text-neutral-300 hover:text-red-400 transition-colors text-xs"
          aria-label="Eliminar"
        >
          ✕
        </button>
        <div className="flex items-center gap-2 border border-neutral-200 rounded-full px-2 py-1">
          <button
            onClick={() => onQty(-1)}
            className="w-5 h-5 flex items-center justify-center text-neutral-500 hover:text-brand-primary transition-colors font-medium"
            aria-label="Restar"
          >
            −
          </button>
          <span className="text-sm font-medium text-neutral-900 w-4 text-center">{item.quantity}</span>
          <button
            onClick={() => onQty(1)}
            className="w-5 h-5 flex items-center justify-center text-neutral-500 hover:text-brand-primary transition-colors font-medium"
            aria-label="Sumar"
          >
            +
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function CarritoPage() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="font-display text-3xl text-neutral-900 mb-8">Tu pedido</h1>

        {items.length === 0 ? (
          /* Estado vacío */
          <div className="text-center py-24">
            <p className="text-5xl mb-4">☕</p>
            <p className="text-neutral-500 text-lg mb-6">Todavía no agregaste nada.</p>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-full font-semibold text-sm hover:bg-brand-primary/90 transition-colors"
            >
              Ver la carta
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Lista de items */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <CartItemRow
                    key={`${item.id}-${item.variant_id ?? ""}`}
                    item={item}
                    onRemove={() => removeItem(item.id, item.variant_id)}
                    onQty={(delta) => updateQuantity(item.id, item.quantity + delta, item.variant_id)}
                  />
                ))}
              </AnimatePresence>

              <div className="mt-6">
                <Link
                  href="/catalogo"
                  className="text-sm text-brand-primary font-medium hover:underline"
                >
                  ← Agregar más productos
                </Link>
              </div>
            </div>

            {/* Resumen sticky */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
                <h2 className="font-display text-xl text-neutral-900">Resumen</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-neutral-500">
                    <span>{itemCount} {itemCount === 1 ? "producto" : "productos"}</span>
                    <span>${total.toLocaleString("es-AR")}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400 text-xs">
                    <span>Envío</span>
                    <span>Se calcula al siguiente paso</span>
                  </div>
                </div>
                <div className="border-t border-neutral-100 pt-4 flex justify-between font-semibold text-neutral-900">
                  <span>Subtotal</span>
                  <span>${total.toLocaleString("es-AR")}</span>
                </div>
                <Link
                  href="/checkout/datos"
                  className="block w-full text-center px-6 py-3.5 bg-brand-primary text-white rounded-full font-semibold text-sm hover:bg-brand-primary/90 transition-colors"
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
