"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-500 ${
        scrolled
          ? "bg-neutral-50/95 backdrop-blur-md shadow-sm border-b border-neutral-200/60"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          {/* Logo / Brand */}
          <Link
            href="/"
            className={`font-display text-lg lg:text-xl font-bold tracking-tight transition-colors duration-300 ${
              scrolled ? "text-brand-primary" : "text-neutral-50"
            }`}
          >
            Méndez
            <span className={`ml-1 font-body font-normal text-xs uppercase tracking-[0.15em] transition-colors duration-300 ${
              scrolled ? "text-brand-accent" : "text-brand-accent"
            }`}>
              Abogados
            </span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-10">
            {[
              { href: "/servicios", label: "Servicios" },
              { href: "/nosotros", label: "Nosotros" },
              { href: "/contacto", label: "Contacto" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`font-body text-sm relative group transition-colors duration-300 ${
                  scrolled
                    ? "text-neutral-700 hover:text-brand-primary"
                    : "text-neutral-50/80 hover:text-neutral-50"
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${
                    scrolled ? "bg-brand-primary" : "bg-neutral-50"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* CTA desktop + hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="/contacto"
              className={`hidden lg:inline-flex items-center gap-2 px-5 py-2.5 font-body text-sm font-medium transition-all duration-300 ${
                scrolled
                  ? "bg-brand-primary text-neutral-50 hover:bg-brand-accent"
                  : "border border-neutral-50/40 text-neutral-50 hover:bg-neutral-50/10"
              }`}
            >
              Consultá tu caso
            </Link>

            <button
              onClick={() => setMobileOpen(true)}
              className={`lg:hidden p-2 rounded transition-colors ${
                scrolled
                  ? "text-brand-primary hover:bg-neutral-100"
                  : "text-neutral-50 hover:bg-neutral-50/10"
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
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
