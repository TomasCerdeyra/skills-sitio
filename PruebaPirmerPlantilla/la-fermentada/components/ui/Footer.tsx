"use client";

import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function Footer() {
  const year = new Date().getFullYear();
  const waLink = buildWhatsAppLink({ message: "Hola, quiero hacer un pedido." });

  return (
    <footer className="bg-brand-dark text-neutral-50 mt-0">
      {/* CTA band */}
      <div className="bg-brand-primary">
        <div className="max-w-5xl mx-auto px-6 py-16 lg:py-20 text-center">
          <p className="font-body text-xs uppercase tracking-[0.25em] text-brand-accent/70 mb-4">
            ¿Pedís esta semana?
          </p>
          <h2 className="font-display font-bold text-3xl lg:text-5xl text-neutral-50 mb-8 leading-tight italic">
            El pan se hace antes del amanecer.
            <br className="hidden lg:block" /> Hay que reservar.
          </h2>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-neutral-50 text-brand-dark px-8 py-4 rounded-full font-body font-semibold hover:bg-brand-accent transition-colors shadow-xl"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-green-700">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Pedir por WhatsApp
          </a>
        </div>
      </div>

      {/* Info strip */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <p className="font-display text-2xl font-bold mb-3 tracking-tight">La Fermentada</p>
            <p className="font-body text-sm text-neutral-50/60 leading-relaxed">
              Panadería artesanal con masa madre.<br />
              Fermentación lenta, horneado honesto.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-body text-xs uppercase tracking-[0.2em] text-neutral-50/40 mb-4">
              Navegación
            </p>
            <ul className="space-y-2">
              {[
                { href: "/catalogo", label: "El Pan" },
                { href: "/nosotros", label: "Nosotros" },
                { href: "/contacto", label: "Contacto" },
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

          {/* Horarios */}
          <div>
            <p className="font-body text-xs uppercase tracking-[0.2em] text-neutral-50/40 mb-4">
              Retiro en local
            </p>
            {/* Cliente: revisar/reemplazar con datos reales */}
            <p className="font-body text-sm text-neutral-50/70 leading-relaxed">
              Honduras 4567, Palermo<br />
              Lunes a sábados, 9 a 13 hs
            </p>
          </div>
        </div>

        <div className="border-t border-neutral-50/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-neutral-50/40">
            © {year} La Fermentada. Todos los derechos reservados.
          </p>
          <p className="font-body text-xs text-neutral-50/30">
            Sitio por{" "}
            <a href="https://sitiohoy.com.ar" className="hover:text-brand-secondary transition-colors">
              SitioHoy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
