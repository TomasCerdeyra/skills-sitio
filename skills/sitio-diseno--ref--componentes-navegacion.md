# Reference: Componentes de navegación

Header, Footer y menú mobile. Estos componentes están en TODAS las páginas — su calidad afecta la percepción global del sitio.

## Header

### Estructura mínima

```tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { MobileMenu } from "./MobileMenu";

interface HeaderProps {
  brandName: string;
  showCart?: boolean; // solo Emprendimiento/Empresa
  cartCount?: number;
}

export function Header({ brandName, showCart, cartCount = 0 }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Listener de scroll para shrink del header
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setScrolled(window.scrollY > 20);
    }, { passive: true });
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        scrolled
          ? "bg-neutral-50/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${
          scrolled ? "h-16" : "h-20"
        }`}>
          {/* Logo / Brand */}
          <Link href="/" className="font-display text-xl lg:text-2xl font-bold text-neutral-900 tracking-tight">
            {brandName}
          </Link>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-10">
            <NavLink href="/catalogo">Catálogo</NavLink>
            <NavLink href="/nosotros">Nosotros</NavLink>
            <NavLink href="/contacto">Contacto</NavLink>
          </nav>

          {/* Acciones */}
          <div className="flex items-center gap-4">
            {showCart && <CartButton count={cartCount} />}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 hover:bg-neutral-100 rounded-md transition-colors"
              aria-label="Menú"
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

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} showCart={showCart} />
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="font-body text-neutral-700 hover:text-brand-primary transition-colors relative group"
    >
      {children}
      {/* Underline animado custom */}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}

function CartButton({ count }: { count: number }) {
  return (
    <Link
      href="/checkout"
      className="relative p-2 hover:bg-neutral-100 rounded-md transition-colors"
      aria-label="Carrito"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-brand-primary text-neutral-50 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  );
}
```

### Mobile menu (drawer)

```tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

export function MobileMenu({
  open,
  onClose,
  showCart,
}: {
  open: boolean;
  onClose: () => void;
  showCart?: boolean;
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
            className="fixed inset-0 bg-neutral-900/60 z-40 lg:hidden"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-80 max-w-full bg-neutral-50 z-50 p-6 lg:hidden flex flex-col"
          >
            <button
              onClick={onClose}
              className="self-end p-2 hover:bg-neutral-100 rounded-md mb-8"
              aria-label="Cerrar"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <nav className="flex flex-col gap-6 mb-auto">
              <Link href="/catalogo" onClick={onClose} className="font-display text-3xl text-neutral-900 hover:text-brand-primary transition-colors">
                Catálogo
              </Link>
              <Link href="/nosotros" onClick={onClose} className="font-display text-3xl text-neutral-900 hover:text-brand-primary transition-colors">
                Nosotros
              </Link>
              <Link href="/contacto" onClick={onClose} className="font-display text-3xl text-neutral-900 hover:text-brand-primary transition-colors">
                Contacto
              </Link>
              {showCart && (
                <Link href="/checkout" onClick={onClose} className="font-display text-3xl text-neutral-900 hover:text-brand-primary transition-colors">
                  Carrito
                </Link>
              )}
            </nav>

            <div className="pt-8 border-t border-neutral-200">
              <p className="font-body text-sm text-neutral-600">
                ¿Necesitás ayuda? <a href="https://wa.me/..." className="text-brand-primary underline">WhatsApp</a>
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
```

---

## Footer

```tsx
"use client";

import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/whatsapp";

interface FooterProps {
  brandName: string;
  brandTagline?: string;
}

export function Footer({ brandName, brandTagline }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-50 mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <p className="font-display text-3xl mb-4 tracking-tight">{brandName}</p>
            {brandTagline && (
              <p className="font-body text-neutral-50/70 max-w-md leading-relaxed">
                {brandTagline}
              </p>
            )}
          </div>

          {/* Links */}
          <div>
            <p className="font-body text-xs uppercase tracking-[0.2em] text-neutral-50/50 mb-4">Navegación</p>
            <ul className="space-y-3">
              <li><Link href="/catalogo" className="font-body hover:text-brand-primary transition-colors">Catálogo</Link></li>
              <li><Link href="/nosotros" className="font-body hover:text-brand-primary transition-colors">Nosotros</Link></li>
              <li><Link href="/contacto" className="font-body hover:text-brand-primary transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <p className="font-body text-xs uppercase tracking-[0.2em] text-neutral-50/50 mb-4">Contacto</p>
            <ul className="space-y-3">
              <li>
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body hover:text-brand-primary transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="mailto:{COMPLETAR}" className="font-body hover:text-brand-primary transition-colors">
                  {`{COMPLETAR: email del negocio}`}
                </a>
              </li>
              <li className="font-body text-neutral-50/70">
                {`{COMPLETAR: dirección física si aplica}`}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-50/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-body text-sm text-neutral-50/60">
            © {year} {brandName}. Todos los derechos reservados.
          </p>
          <p className="font-body text-sm text-neutral-50/40">
            Sitio por <a href="https://sitiohoy.com.ar" className="hover:text-brand-primary transition-colors">SitioHoy</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
```

---

## WhatsApp Floating Button (todos los planes)

Componente fijo en bottom-right en mobile, opcional en desktop.

```tsx
"use client";

import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics/umami";

export function WhatsAppFloat() {
  const url = buildWhatsAppLink();

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("whatsapp_click", { source: "float" })}
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl shadow-[#25D366]/40 hover:scale-110 transition-transform"
      aria-label="Consultar por WhatsApp"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}
```

---

## Reglas

1. **Header siempre fijo** (`fixed top-0`) y con shrink al scroll.
2. **Backdrop-blur** cuando hay scroll para legibilidad sobre cualquier fondo.
3. **Menú mobile como drawer desde la derecha** — más espacio para opciones grandes y elegantes.
4. **Underline animado custom** en navegación desktop (no el subrayado default del browser).
5. **Footer oscuro + brand alta** — contraste fuerte con el resto del sitio.
6. **WhatsApp Float visible siempre en mobile.** En desktop opcional según el diseño.
7. **Cart button SOLO en Emprendimiento/Empresa.** En Esencial no existe.
8. **Brand del header debe escalar tipográficamente con el shrink** — más grande sin scroll, más chico con scroll.

---

## Validación

- [ ] Header con shrink animado al scroll.
- [ ] Mobile menu funcional como drawer (click outside cierra).
- [ ] WhatsApp Float visible en mobile sin tapar contenido importante.
- [ ] Footer con info de contacto y crédito a SitioHoy.
- [ ] Underlines animados en navegación desktop.
- [ ] Cart button solo si `showCart={true}`.
- [ ] Aria labels en botones sin texto.
