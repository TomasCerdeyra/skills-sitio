"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

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
            className="fixed inset-0 bg-brand-dark/60 z-40 lg:hidden backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 w-80 max-w-full bg-neutral-50 z-50 p-8 lg:hidden flex flex-col"
          >
            {/* Cerrar */}
            <button
              onClick={onClose}
              className="self-end p-2 hover:bg-neutral-100 rounded-md mb-10"
              aria-label="Cerrar"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Nav links */}
            <nav className="flex flex-col gap-7 mb-auto">
              {[
                { href: "/", label: "Inicio" },
                { href: "/catalogo", label: "El Pan" },
                { href: "/carrito", label: "Mi pedido" },
                { href: "/nosotros", label: "Nosotros" },
                { href: "/contacto", label: "Contacto" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  className="font-display text-3xl font-bold text-brand-dark hover:text-brand-primary transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Footer del drawer */}
            <div className="pt-8 border-t border-neutral-200">
              <p className="font-body text-sm text-neutral-500 leading-relaxed">
                Pedidos por WhatsApp o retirar en local.{" "}
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5491155001234"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary underline underline-offset-2"
                >
                  Escribinos
                </a>
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
