"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // En home: transparente al inicio, sólido al scroll
  // En otras páginas: siempre sólido oscuro
  const showSolid = !isHome || scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-500 ${
          showSolid
            ? "bg-neutral-900/97 backdrop-blur-md shadow-lg shadow-neutral-900/30"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              scrolled ? "h-16" : "h-20"
            }`}
          >
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group"
            >
              <span className="font-display text-xl font-bold text-neutral-50 tracking-tight transition-colors group-hover:text-brand-primary">
                Cel<span className="text-brand-primary">Tech</span>
              </span>
              <span className="hidden sm:flex items-center gap-1 text-[10px] font-body uppercase tracking-[0.2em] text-brand-primary/70 border border-brand-primary/30 px-2 py-0.5 rounded-full">
                Originales
              </span>
            </Link>

            {/* Nav desktop */}
            <nav className="hidden lg:flex items-center gap-8">
              <NavLink href="/catalogo">Catálogo</NavLink>
              <NavLink href="/nosotros">Nosotros</NavLink>
              <NavLink href="/contacto">Contacto</NavLink>
            </nav>

            {/* Acciones */}
            <div className="flex items-center gap-3">
              {/* Carrito */}
              <Link
                href="/carrito"
                className="relative p-2.5 text-neutral-300 hover:text-brand-primary transition-colors rounded-lg hover:bg-white/5"
                aria-label={`Carrito (${itemCount} productos)`}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-brand-primary text-neutral-900 text-[10px] font-bold rounded-full w-4.5 h-4.5 w-[18px] h-[18px] flex items-center justify-center font-display">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2.5 text-neutral-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                aria-label="Menú"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
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

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="font-body text-sm text-neutral-300 hover:text-white transition-colors relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-primary transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}
