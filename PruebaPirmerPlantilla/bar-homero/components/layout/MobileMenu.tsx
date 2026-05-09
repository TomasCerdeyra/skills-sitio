"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

interface Props {
  open: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

export default function MobileMenu({ open, onClose, links }: Props) {
  const { itemCount } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white shadow-xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
              <span className="font-display text-lg text-neutral-900">Bar Homero</span>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
                aria-label="Cerrar menú"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1">
              {links.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={href}
                    onClick={onClose}
                    className="block px-4 py-3 rounded-xl text-neutral-700 font-medium hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="px-4 pb-6 pt-2 border-t border-neutral-100">
              <Link
                href="/carrito"
                onClick={onClose}
                className="flex items-center justify-between w-full bg-brand-primary text-white px-4 py-3 rounded-xl font-medium"
              >
                <span>Mi pedido</span>
                {itemCount > 0 && (
                  <span className="w-6 h-6 rounded-full bg-brand-accent text-white text-xs flex items-center justify-center font-bold">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
