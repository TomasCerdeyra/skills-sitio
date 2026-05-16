"use client";

import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics/umami";

export function Footer() {
  const year = new Date().getFullYear();
  const waLink = buildWhatsAppLink();

  return (
    <footer className="bg-neutral-900 text-neutral-50 mt-0">
      {/* CTA strip */}
      <div className="border-t border-brand-primary/20 bg-gradient-to-r from-neutral-900 via-neutral-800/50 to-neutral-900">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-14 text-center">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-brand-primary mb-3">
            ¿Tenés dudas? Escribinos
          </p>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-6">
            Cada celular tiene garantía y factura.
          </h2>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("whatsapp_click", { source: "footer" })}
            className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-3.5 rounded-full font-body font-semibold text-sm hover:scale-105 transition-transform shadow-lg shadow-[#25D366]/30"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Consultar por WhatsApp
          </a>
        </div>
      </div>

      {/* Links */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
            <div>
              <p className="font-display text-2xl font-bold text-white mb-2">
                Cel<span className="text-brand-primary">Tech</span>
              </p>
              <p className="font-body text-sm text-neutral-400 leading-relaxed max-w-xs">
                Celulares originales con garantía. Verificamos cada equipo antes de venderte.
              </p>
            </div>
            <div>
              <p className="font-body text-xs uppercase tracking-[0.2em] text-neutral-500 mb-4">Navegación</p>
              <ul className="space-y-2.5">
                {[
                  { href: "/catalogo", label: "Catálogo" },
                  { href: "/nosotros", label: "Nosotros" },
                  { href: "/contacto", label: "Contacto" },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="font-body text-sm text-neutral-400 hover:text-brand-primary transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-body text-xs uppercase tracking-[0.2em] text-neutral-500 mb-4">Contacto</p>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-neutral-400 hover:text-brand-primary transition-colors"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  {/* Cliente: revisar/reemplazar con datos reales */}
                  <span className="font-body text-sm text-neutral-400">Lunes a sábados, 10 a 20 hs</span>
                </li>
                <li>
                  {/* Cliente: revisar/reemplazar con dirección real */}
                  <span className="font-body text-sm text-neutral-400">Av. Corrientes 1234, CABA</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="font-body text-xs text-neutral-600">
              © {year} Cel Tech. Todos los derechos reservados.
            </p>
            <p className="font-body text-xs text-neutral-700">
              Sitio por{" "}
              <a href="https://sitiohoy.com.ar" className="hover:text-brand-primary transition-colors">
                SitioHoy
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
