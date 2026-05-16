"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { MobileMenu } from "./MobileMenu";
import { useCart } from "@/context/CartContext";

export function HeaderTransparent({ brandName }: { brandName: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-500 ${
        scrolled
          ? "bg-neutral-900/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          <Link
            href="/"
            className="font-display text-xl lg:text-2xl font-bold text-white tracking-tight"
          >
            {brandName}
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            <NavLink href="/catalogo">Carta</NavLink>
            <NavLink href="/nosotros">Nosotros</NavLink>
            <NavLink href="/contacto">Contacto</NavLink>
          </nav>

          <div className="flex items-center gap-4">
            {/* Carrito */}
            <Link
              href="/carrito"
              className="relative p-2 text-white hover:text-brand-accent transition-colors"
              aria-label={`Carrito (${itemCount} items)`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-secondary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-md transition-colors"
              aria-label="Menú"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="font-body text-white/80 hover:text-white transition-colors relative group text-sm tracking-wide"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-secondary transition-all duration-300 group-hover:w-full" />
    </a>
  );
}
