"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MobileMenu } from "./MobileMenu";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function syncCart() {
      const cart: Array<{ quantity: number }> = JSON.parse(localStorage.getItem("cart") ?? "[]");
      setCartCount(cart.reduce((acc, i) => acc + i.quantity, 0));
    }
    syncCart();
    window.addEventListener("cartUpdated", syncCart);
    return () => window.removeEventListener("cartUpdated", syncCart);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          scrolled
            ? "bg-neutral-50/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              scrolled ? "h-16" : "h-20"
            }`}
          >
            {/* Logo */}
            <Link
              href="/"
              className="font-display text-xl lg:text-2xl font-medium tracking-[0.18em] uppercase text-neutral-900"
            >
              Lecrere
            </Link>

            {/* Nav desktop */}
            <nav className="hidden lg:flex items-center gap-10">
              {[
                { href: "/catalogo", label: "Catálogo" },
                { href: "/nosotros", label: "Nosotros" },
                { href: "/contacto", label: "Contacto" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="font-body text-sm tracking-wide text-neutral-700 hover:text-brand-primary transition-colors relative group"
                >
                  {label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-secondary transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Cart icon */}
              <Link
                href="/carrito"
                className="hidden lg:flex items-center gap-1.5 font-body text-sm text-neutral-700 hover:text-brand-primary transition-colors relative"
                aria-label={`Carrito${cartCount > 0 ? ` (${cartCount})` : ""}`}
              >
                <span className="relative">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 min-w-[16px] h-4 px-0.5 rounded-full bg-brand-secondary text-neutral-50 text-[9px] font-body font-semibold flex items-center justify-center leading-none">
                      {cartCount > 9 ? "9+" : cartCount}
                    </span>
                  )}
                </span>
              </Link>

              {/* WhatsApp CTA desktop */}
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex items-center gap-2 bg-brand-primary text-neutral-50 px-5 py-2.5 text-sm font-body font-medium hover:bg-neutral-900/80 transition-colors"
              >
                Consultar
              </a>

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 hover:bg-neutral-100 rounded-md transition-colors"
                aria-label="Abrir menú"
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
