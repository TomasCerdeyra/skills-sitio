"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { MobileMenu } from "./MobileMenu";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="font-body text-sm text-neutral-700 hover:text-brand-primary transition-colors relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        scrolled
          ? "bg-neutral-50/95 backdrop-blur-md shadow-sm"
          : "bg-neutral-50/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* ADN: centered-logo — logo centro, links izquierda y derecha */}
        <div
          className={`grid grid-cols-3 items-center transition-all duration-300 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          {/* Links izquierda */}
          <nav className="hidden lg:flex items-center gap-8">
            <NavLink href="/catalogo">La Carta</NavLink>
            <NavLink href="/nosotros">Nosotros</NavLink>
          </nav>

          {/* Logo centrado */}
          <Link
            href="/"
            className="font-display text-xl lg:text-2xl font-bold text-neutral-900 tracking-tight text-center justify-self-center"
          >
            Café del Norte
          </Link>

          {/* Links derecha + acciones */}
          <div className="flex items-center justify-end gap-6 lg:gap-8">
            <nav className="hidden lg:flex items-center gap-8">
              <NavLink href="/contacto">Contacto</NavLink>
            </nav>

            {/* Botón carrito — plan Emprendimiento */}
            <Link
              href="/carrito"
              className="relative p-2 hover:bg-neutral-100 rounded-full transition-colors"
              aria-label={`Carrito (${itemCount} items)`}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-brand-primary text-neutral-50 text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center font-body">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>

            {/* Hamburguesa mobile */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 hover:bg-neutral-100 rounded-md transition-colors"
              aria-label="Abrir menú"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        showCart
        cartCount={itemCount}
      />
    </header>
  );
}
