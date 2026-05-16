"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { MobileMenu } from "./MobileMenu";
import { useCart } from "@/context/CartContext";

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
            ? "bg-neutral-50/96 backdrop-blur-md shadow-sm border-b border-neutral-200"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              scrolled ? "h-16" : "h-20"
            }`}
          >
            {/* Logo */}
            <Link
              href="/"
              className="font-display font-bold tracking-tight text-brand-dark"
              style={{ fontSize: scrolled ? "1.25rem" : "1.5rem", transition: "font-size 0.3s" }}
            >
              La Fermentada
            </Link>

            {/* Nav desktop */}
            <nav className="hidden lg:flex items-center gap-10">
              {[
                { href: "/catalogo", label: "El Pan" },
                { href: "/nosotros", label: "Nosotros" },
                { href: "/contacto", label: "Contacto" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="font-body text-sm text-neutral-600 hover:text-brand-primary transition-colors relative group"
                >
                  {label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-brand-secondary transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Acciones */}
            <div className="flex items-center gap-3">
              {/* Carrito */}
              <Link
                href="/carrito"
                className="relative flex items-center gap-2 px-4 py-2 bg-brand-primary text-neutral-50 rounded-full font-body text-sm font-medium hover:bg-brand-dark transition-colors"
                aria-label="Pedido"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                <span className="hidden sm:inline">Pedido</span>
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-brand-secondary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 hover:bg-neutral-100 rounded-md transition-colors"
                aria-label="Menú"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
