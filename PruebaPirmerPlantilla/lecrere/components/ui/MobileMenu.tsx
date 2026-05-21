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
            className="fixed inset-0 bg-neutral-900/70 z-40 lg:hidden"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-80 max-w-full bg-neutral-50 z-50 p-8 lg:hidden flex flex-col"
          >
            <button
              onClick={onClose}
              className="self-end p-2 hover:bg-neutral-100 rounded-md mb-10"
              aria-label="Cerrar menú"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <nav className="flex flex-col gap-8 mb-auto">
              {[
                { href: "/catalogo", label: "Catálogo" },
                { href: "/nosotros", label: "Nosotros" },
                { href: "/contacto", label: "Contacto" },
                { href: "/carrito", label: "Carrito" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  className="font-display text-3xl italic text-neutral-900 hover:text-brand-secondary transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="pt-8 border-t border-neutral-200">
              <p className="font-body text-sm text-neutral-600">
                ¿Consultas?{" "}
                <a
                  href="https://wa.me/5491123456789"
                  className="text-brand-secondary underline underline-offset-2"
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
