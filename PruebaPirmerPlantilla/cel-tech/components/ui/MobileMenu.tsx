"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-900/80 z-40 lg:hidden"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 w-80 max-w-full bg-neutral-900 z-50 p-6 lg:hidden flex flex-col border-l border-white/10"
          >
            <div className="flex items-center justify-between mb-10">
              <span className="font-display text-lg font-bold text-neutral-50">
                Cel<span className="text-brand-primary">Tech</span>
              </span>
              <button
                onClick={onClose}
                className="p-2 text-neutral-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                aria-label="Cerrar"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col gap-1 mb-auto">
              {[
                { href: "/catalogo", label: "Catálogo" },
                { href: "/nosotros", label: "Nosotros" },
                { href: "/contacto", label: "Contacto" },
                { href: "/carrito", label: "Mi pedido" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  className="font-display text-2xl font-semibold text-neutral-200 hover:text-brand-primary transition-colors py-3 border-b border-white/5"
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="pt-8 border-t border-white/10">
              <p className="font-body text-sm text-neutral-500">
                ¿Necesitás ayuda?{" "}
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5491144005678"}`}
                  className="text-brand-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
