"use client";

import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { FadeUpOnScroll } from "./FadeUpOnScroll";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <FadeUpOnScroll>
      <footer className="bg-neutral-900 text-neutral-50 mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-2">
              <p className="font-display text-4xl tracking-[0.18em] uppercase mb-4 font-medium">
                Lecrere
              </p>
              {/* Cliente: revisar/reemplazar con datos reales */}
              <p className="font-body text-neutral-50/60 max-w-sm leading-relaxed text-sm">
                Diseño y producción en Argentina. Prendas que duran porque están
                hechas con criterio, materiales nobles y oficio real.
              </p>
            </div>

            <div>
              <p className="font-body text-xs uppercase tracking-[0.2em] text-neutral-50/40 mb-5">
                Navegación
              </p>
              <ul className="space-y-3">
                {[
                  { href: "/catalogo", label: "Catálogo" },
                  { href: "/nosotros", label: "Nosotros" },
                  { href: "/contacto", label: "Contacto" },
                  { href: "/carrito", label: "Carrito" },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="font-body text-sm text-neutral-50/70 hover:text-brand-secondary transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-body text-xs uppercase tracking-[0.2em] text-neutral-50/40 mb-5">
                Contacto
              </p>
              <ul className="space-y-3">
                <li>
                  <a
                    href={buildWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-neutral-50/70 hover:text-brand-secondary transition-colors"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  {/* Cliente: revisar/reemplazar con datos reales */}
                  <a
                    href="mailto:hola@lecrere.com.ar"
                    className="font-body text-sm text-neutral-50/70 hover:text-brand-secondary transition-colors"
                  >
                    hola@lecrere.com.ar
                  </a>
                </li>
                <li className="font-body text-sm text-neutral-50/50">
                  {/* Cliente: revisar/reemplazar con datos reales */}
                  Lunes a sábados, 10 a 19 hs
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-neutral-50/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="font-body text-xs text-neutral-50/40">
              © {year} Lecrere. Todos los derechos reservados.
            </p>
            <p className="font-body text-xs text-neutral-50/30">
              Sitio por{" "}
              <a
                href="https://sitiohoy.com.ar"
                className="hover:text-brand-secondary transition-colors"
              >
                SitioHoy
              </a>
            </p>
          </div>
        </div>
      </footer>
    </FadeUpOnScroll>
  );
}
