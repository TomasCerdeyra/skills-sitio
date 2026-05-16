"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { MobileMenu } from "./MobileMenu";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics/umami";

export function HeaderTransparent({ brandName }: { brandName: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const waLink = buildWhatsAppLink();

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
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-xl lg:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2"
          >
            <span className="text-brand-primary">✦</span>
            {brandName}
          </Link>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-10">
            <NavLink href="/catalogo">La Carta</NavLink>
            <NavLink href="/nosotros">Nosotros</NavLink>
            <NavLink href="/contacto">Contacto</NavLink>
          </nav>

          {/* Acciones */}
          <div className="flex items-center gap-4">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { source: "header" })}
              className="hidden lg:flex items-center gap-2 bg-brand-primary text-white px-5 py-2 rounded-full font-body font-medium text-sm hover:bg-brand-accent hover:scale-[1.02] active:scale-95 transition-all duration-200"
            >
              Pedir ahora
            </a>
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
    <Link
      href={href}
      className="font-body text-white/80 hover:text-white transition-colors relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}
