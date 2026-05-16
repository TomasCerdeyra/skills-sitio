"use client";

import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics/umami";

export function Footer() {
  const year = new Date().getFullYear();
  const waLink = buildWhatsAppLink();

  return (
    <footer className="bg-neutral-900 text-white">
      {/* CTA Strip */}
      <div className="border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <p className="font-body text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4">
                ¿Tenés una consulta?
              </p>
              <h2 className="font-display text-5xl lg:text-7xl font-black uppercase tracking-[-0.03em] leading-none">
                Hablemos.
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 lg:items-end">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { source: "footer" })}
                className="inline-flex items-center justify-center gap-2 bg-white text-neutral-900 px-8 py-3.5 rounded-full font-body font-semibold text-sm hover:bg-neutral-100 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Consultar por WhatsApp
              </a>
              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-3.5 rounded-full font-body font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                Ver catálogo
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Info strip */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-display text-xl font-black uppercase tracking-[-0.03em]">Vectroom</p>
            {/* Cliente: revisar/reemplazar con datos reales */}
            <p className="font-body text-xs text-neutral-400 mt-1">
              Diseño argentino · Lunes a sábados, 10 a 20 hs
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              { href: "/catalogo", label: "Catálogo" },
              { href: "/nosotros", label: "Nosotros" },
              { href: "/contacto", label: "Contacto" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="font-body text-sm text-neutral-400 hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          <p className="font-body text-xs text-neutral-600">
            © {year} Vectroom ·{" "}
            <a
              href="https://sitiohoy.com.ar"
              className="hover:text-neutral-400 transition-colors"
            >
              SitioHoy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
