"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

function CartItemRow({
  item,
  onRemove,
  onQty,
}: {
  item: {
    id: string;
    variant_id?: string;
    name: string;
    variant_name?: string;
    price: number;
    quantity: number;
    image?: string;
  };
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
      <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-brand-accent flex-shrink-0">
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-300 text-2xl">🌾</div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-display font-semibold text-brand-dark truncate">{item.name}</p>
        {item.variant_name && (
          <p className="font-body text-sm text-neutral-400 mt-0.5">{item.variant_name}</p>
        )}
        <p className="font-body text-sm font-semibold text-brand-primary mt-1">
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
          <span className="font-body text-sm font-medium text-neutral-900 w-4 text-center">
            {item.quantity}
          </span>
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
    <div className="min-h-screen bg-neutral-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <h1 className="font-display font-bold text-3xl lg:text-4xl text-brand-dark mb-8 italic">
          Tu pedido
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🌾</div>
            <p className="font-body text-lg text-neutral-500 mb-6">
              Todavía no elegiste nada.
            </p>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-full font-body font-semibold text-sm hover:bg-brand-dark transition-colors"
            >
              Ver la carta
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Lista */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <CartItemRow
                    key={`${item.id}-${item.variant_id ?? ""}`}
                    item={item}
                    onRemove={() => removeItem(item.id, item.variant_id)}
                    onQty={(delta) =>
                      updateQuantity(item.id, item.quantity + delta, item.variant_id)
                    }
                  />
                ))}
              </AnimatePresence>
              <div className="mt-6">
                <Link
                  href="/catalogo"
                  className="font-body text-sm text-brand-primary font-medium hover:underline underline-offset-4"
                >
                  ← Agregar más
                </Link>
              </div>
            </div>

            {/* Resumen sticky */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
                <h2 className="font-display text-xl text-brand-dark font-bold">Resumen</h2>
                <div className="space-y-2 font-body text-sm">
                  <div className="flex justify-between text-neutral-500">
                    <span>
                      {itemCount} {itemCount === 1 ? "producto" : "productos"}
                    </span>
                    <span>${total.toLocaleString("es-AR")}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400 text-xs">
                    <span>Envío</span>
                    <span>Se calcula al siguiente paso</span>
                  </div>
                </div>
                <div className="border-t border-neutral-100 pt-4 flex justify-between font-body font-semibold text-brand-dark">
                  <span>Subtotal</span>
                  <span>${total.toLocaleString("es-AR")}</span>
                </div>
                <Link
                  href="/checkout/datos"
                  className="block w-full text-center px-6 py-3.5 bg-brand-primary text-white rounded-full font-body font-semibold text-sm hover:bg-brand-dark transition-colors shadow-lg shadow-brand-primary/20"
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
