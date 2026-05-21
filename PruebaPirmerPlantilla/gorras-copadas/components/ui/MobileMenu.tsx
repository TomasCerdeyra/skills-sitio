"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";

const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const { count } = useCart();

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => { onClose(); }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.nav
            className="fixed inset-y-0 right-0 z-50 w-4/5 max-w-xs flex flex-col bg-[#0A0A0A] border-l border-[#2E2E2E]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-between p-6 border-b border-[#2E2E2E]">
              <span
                className="text-[#D4FF00] font-display text-xl tracking-widest"
                style={{ fontFamily: "var(--font-display)" }}
              >
                GORRAS
              </span>
              <button
                onClick={onClose}
                className="p-2 text-[#A0A0A0] hover:text-white transition-colors"
                aria-label="Cerrar menú"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <ul className="flex flex-col gap-1 p-6 flex-1">
              {NAV.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    href={item.href}
                    className={`block py-4 text-2xl font-display tracking-wider border-b border-[#1A1A1A] transition-colors ${
                      pathname === item.href ? "text-[#D4FF00]" : "text-white hover:text-[#D4FF00]"
                    }`}
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="p-6 border-t border-[#2E2E2E]">
              <Link
                href="/checkout"
                className="flex items-center justify-center gap-3 w-full py-4 bg-[#D4FF00] text-[#0A0A0A] font-bold rounded-full text-lg transition-transform active:scale-95"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                Carrito
                {count > 0 && (
                  <span className="bg-[#0A0A0A] text-[#D4FF00] text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {count}
                  </span>
                )}
              </Link>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
