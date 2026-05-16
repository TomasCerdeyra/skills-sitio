"use client";

import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics/umami";
import { ClipRevealOnScroll } from "./ClipRevealOnScroll";

export function FooterCTA({ brandName }: { brandName: string }) {
  const year = new Date().getFullYear();
  const waLink = buildWhatsAppLink({ message: "Hola, quiero hacer un pedido 🍔" });

  return (
    <footer className="mt-24">
      {/* CTA Block */}
      <ClipRevealOnScroll>
        <div className="bg-brand-primary">
          <div className="max-w-4xl mx-auto px-6 py-20 text-center">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-neutral-900/60 mb-4">
              ¿Con hambre?
            </p>
            <h2 className="font-display text-4xl lg:text-6xl font-extrabold text-neutral-900 mb-8 leading-tight">
              Tu pedido está a un mensaje.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { source: "footer" })}
                className="inline-flex items-center justify-center gap-3 bg-neutral-900 text-neutral-50 px-10 py-4 font-body font-medium text-lg hover:bg-neutral-800 hover:scale-[1.02] active:scale-95 transition-all duration-200 rounded-full"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Pedir por WhatsApp
              </a>
              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center gap-2 border-2 border-neutral-900 text-neutral-900 px-10 py-4 font-body font-medium text-lg hover:bg-neutral-900 hover:text-neutral-50 transition-all duration-200 rounded-full"
              >
                Ver la carta
              </Link>
            </div>
          </div>
        </div>
      </ClipRevealOnScroll>

      {/* Info strip */}
      <div className="bg-neutral-900 text-neutral-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
            {/* Brand */}
            <div>
              <p className="font-display text-2xl font-extrabold mb-2 flex items-center gap-2">
                <span className="text-brand-primary">✦</span> {brandName}
              </p>
              <p className="font-body text-neutral-50/60 text-sm leading-relaxed">
                Hamburguesas con identidad. Carnes seleccionadas, salsas de autor, ambiente de barrio.
              </p>
            </div>
            {/* Navegación */}
            <div>
              <p className="font-body text-xs uppercase tracking-[0.2em] text-neutral-50/40 mb-4">Navegación</p>
              <ul className="space-y-2">
                <li>
                  <Link href="/catalogo" className="font-body text-sm text-neutral-50/70 hover:text-brand-primary transition-colors">
                    La Carta
                  </Link>
                </li>
                <li>
                  <Link href="/nosotros" className="font-body text-sm text-neutral-50/70 hover:text-brand-primary transition-colors">
                    Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="/contacto" className="font-body text-sm text-neutral-50/70 hover:text-brand-primary transition-colors">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
            {/* Datos */}
            <div>
              <p className="font-body text-xs uppercase tracking-[0.2em] text-neutral-50/40 mb-4">Horarios</p>
              {/* Cliente: revisar/reemplazar con datos reales */}
              <ul className="space-y-2 font-body text-sm text-neutral-50/70">
                <li>Mar — Jue: 19:00 – 01:00</li>
                <li>Vie — Sáb: 19:00 – 02:30</li>
                <li>Dom: 18:00 – 00:00</li>
                <li className="text-brand-primary">Pedidos online: todos los días</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-50/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="font-body text-sm text-neutral-50/40">
              © {year} {brandName}. Todos los derechos reservados.
            </p>
            <p className="font-body text-sm text-neutral-50/30">
              Sitio por{" "}
              <a
                href="https://sitiohoy.com.ar"
                className="hover:text-brand-primary transition-colors"
              >
                SitioHoy
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
