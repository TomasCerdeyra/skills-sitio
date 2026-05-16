"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MobileMenu } from "./MobileMenu";
import { useCart } from "@/context/CartContext";

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

  const showSolid = !isHome || scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-500 ${
          showSolid
            ? "bg-neutral-900/97 backdrop-blur-md shadow-lg shadow-neutral-900/20"
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
              <span className="text-brand-accent text-xl font-display font-bold tracking-tight group-hover:text-brand-primary transition-colors">
                ♪
              </span>
              <span className="font-display text-xl font-bold text-neutral-50 tracking-tight">
                Play Music
              </span>
            </Link>

            {/* Nav desktop */}
            <nav className="hidden lg:flex items-center gap-8">
              {[
                { href: "/catalogo", label: "Instrumentos" },
                { href: "/nosotros", label: "Nosotros" },
                { href: "/contacto", label: "Contacto" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-body text-sm relative group transition-colors ${
                    pathname === link.href
                      ? "text-brand-accent"
                      : "text-neutral-300 hover:text-neutral-50"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-brand-accent transition-all duration-300 ${
                      pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Cart button */}
              <Link
                href="/carrito"
                className="relative p-2 text-neutral-300 hover:text-neutral-50 transition-colors"
                aria-label="Carrito"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-brand-primary text-neutral-50 text-xs font-bold font-body rounded-full w-4.5 h-4.5 w-[18px] h-[18px] flex items-center justify-center leading-none">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 text-neutral-300 hover:text-neutral-50 transition-colors"
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

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        cartCount={itemCount}
      />
    </>
  );
}
