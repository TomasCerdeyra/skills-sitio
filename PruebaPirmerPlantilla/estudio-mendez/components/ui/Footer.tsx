"use client";

import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics/umami";

export function Footer() {
  const year = new Date().getFullYear();
  const waLink = buildWhatsAppLink({
    message: "Hola, quisiera consultar sobre un tema legal.",
  });

  return (
    <footer className="mt-24">
      {/* CTA Block */}
      <div className="bg-brand-primary">
        <div className="max-w-5xl mx-auto px-6 py-20 lg:py-28 text-center">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-brand-accent mb-6">
            Sin rodeos
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-50 leading-[1.1] mb-8">
            ¿Tenés un tema legal
            <br className="hidden sm:block" /> que resolver?
          </h2>
          <p className="font-body text-neutral-300 text-lg mb-12 max-w-lg mx-auto leading-relaxed">
            Una consulta no compromete nada.
            Respondemos en el día.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { source: "footer-cta" })}
              className="inline-flex items-center justify-center gap-3 bg-brand-accent text-neutral-900 px-10 py-4 font-body font-semibold hover:bg-brand-accent-light transition-colors duration-200"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Consultar por WhatsApp
            </a>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 border border-neutral-50/20 text-neutral-50 px-10 py-4 font-body font-medium hover:bg-neutral-50/10 transition-colors"
            >
              Formulario de contacto
            </Link>
          </div>
        </div>
      </div>

      {/* Info strip */}
      <div className="bg-neutral-900 text-neutral-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div>
              <p className="font-display text-lg font-bold tracking-tight">
                Estudio Méndez
              </p>
              {/* Cliente: revisar/reemplazar con datos reales */}
              <p className="font-body text-sm text-neutral-400 mt-1">
                Av. Corrientes 1234, Piso 8, CABA
              </p>
            </div>

            <nav className="flex items-center gap-6 flex-wrap justify-center">
              <Link href="/servicios" className="font-body text-sm text-neutral-400 hover:text-neutral-50 transition-colors">
                Servicios
              </Link>
              <Link href="/nosotros" className="font-body text-sm text-neutral-400 hover:text-neutral-50 transition-colors">
                Nosotros
              </Link>
              <Link href="/contacto" className="font-body text-sm text-neutral-400 hover:text-neutral-50 transition-colors">
                Contacto
              </Link>
            </nav>

            <p className="font-body text-sm text-neutral-600">
              © {year} ·{" "}
              <a
                href="https://sitiohoy.com.ar"
                className="hover:text-neutral-400 transition-colors"
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
