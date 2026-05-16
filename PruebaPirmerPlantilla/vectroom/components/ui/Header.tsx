"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

function MobileMenu({
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
            className="fixed inset-0 bg-black/70 z-40 lg:hidden"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 w-80 max-w-full bg-neutral-900 z-50 p-8 lg:hidden flex flex-col"
          >
            <button
              onClick={onClose}
              className="self-end p-2 hover:bg-white/10 rounded-md transition-colors text-white"
              aria-label="Cerrar"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <nav className="flex flex-col gap-6 mt-10 mb-auto">
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
                  className="font-display text-4xl font-bold uppercase tracking-tight text-white hover:text-neutral-400 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="pt-8 border-t border-white/10">
              <p className="font-body text-sm text-neutral-400">
                ¿Necesitás ayuda?{" "}
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                  className="text-white underline underline-offset-2"
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

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-neutral-200"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              scrolled ? "h-14" : "h-18"
            }`}
          >
            {/* Logo */}
            <Link
              href="/"
              className={`font-display text-2xl font-black uppercase tracking-[-0.04em] transition-colors duration-300 ${
                scrolled ? "text-neutral-900" : "text-white"
              }`}
            >
              Vectroom
            </Link>

            {/* Nav desktop */}
            <nav className="hidden lg:flex items-center gap-8">
              {[
                { href: "/catalogo", label: "Catálogo" },
                { href: "/nosotros", label: "Nosotros" },
                { href: "/contacto", label: "Contacto" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`font-body text-sm font-medium relative group transition-colors duration-300 ${
                    scrolled
                      ? "text-neutral-700 hover:text-neutral-900"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {label}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${
                      scrolled ? "bg-neutral-900" : "bg-white"
                    }`}
                  />
                </Link>
              ))}
            </nav>

            {/* Acciones */}
            <div className="flex items-center gap-4">
              {/* Carrito */}
              <Link
                href="/carrito"
                aria-label={`Carrito (${itemCount} ítems)`}
                className={`relative p-2 transition-colors duration-300 ${
                  scrolled
                    ? "text-neutral-900 hover:text-neutral-600"
                    : "text-white hover:text-white/70"
                }`}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-brand-primary text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </Link>

              {/* Hamburguesa mobile */}
              <button
                onClick={() => setMobileOpen(true)}
                className={`lg:hidden p-2 rounded-md transition-colors ${
                  scrolled
                    ? "text-neutral-900 hover:bg-neutral-100"
                    : "text-white hover:bg-white/10"
                }`}
                aria-label="Menú"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
