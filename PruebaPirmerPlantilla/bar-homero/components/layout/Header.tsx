"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import MobileMenu from "./MobileMenu";

const NAV_LINKS = [
  { href: "/catalogo", label: "Carta" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export default function Header() {
  const { itemCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-sm shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <Link
            href="/"
            className={`font-display text-xl font-semibold transition-colors ${
              scrolled ? "text-neutral-900" : "text-white"
            }`}
          >
            Bar Homero
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-neutral-600 hover:text-neutral-900"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Cart button */}
            <Link
              href="/carrito"
              className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                scrolled
                  ? "bg-brand-primary text-white hover:bg-brand-primary/90"
                  : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <span className="hidden sm:inline">Pedido</span>
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-brand-accent text-white text-xs flex items-center justify-center font-bold leading-none">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                scrolled ? "text-neutral-700 hover:bg-neutral-100" : "text-white hover:bg-white/20"
              }`}
              aria-label="Abrir menú"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={NAV_LINKS} />
    </>
  );
}
