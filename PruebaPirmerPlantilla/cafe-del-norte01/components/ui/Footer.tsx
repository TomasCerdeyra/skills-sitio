"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics/umami";

export function FooterCTA() {
  const year = new Date().getFullYear();
  const waLink = buildWhatsAppLink({ message: "Hola, quiero hacer un pedido o consultar algo." });

  return (
    <footer className="mt-24">
      {/* CTA Block — ADN: cta-footer */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="bg-brand-primary"
      >
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          {/* Marca visual ✦ */}
          <p className="font-body text-brand-accent/60 text-xl mb-4 tracking-[0.3em]">✦</p>
          <h2 className="font-display text-4xl lg:text-6xl font-bold text-neutral-50 mb-4 leading-[1.05]">
            ¿Pasás por un café?
          </h2>
          <p className="font-body text-neutral-50/80 text-lg mb-10 max-w-xl mx-auto">
            Escribinos por WhatsApp para hacer un pedido, reservar una mesa o simplemente preguntar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/catalogo"
              className="inline-flex items-center justify-center gap-2 bg-neutral-50 text-neutral-900 px-10 py-4 font-body font-medium hover:bg-brand-accent transition-colors duration-200 active:scale-95"
            >
              Ver la carta
            </Link>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { source: "footer" })}
              className="inline-flex items-center justify-center gap-3 border-2 border-neutral-50/40 text-neutral-50 px-10 py-4 font-body font-medium hover:bg-neutral-50/10 transition-colors duration-200 active:scale-95"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </motion.div>

      {/* Info strip */}
      <div className="bg-neutral-900 text-neutral-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-display text-lg font-bold tracking-tight">Café del Norte</p>
          <nav className="flex items-center gap-6 flex-wrap justify-center">
            <Link href="/catalogo" className="font-body text-sm text-neutral-50/70 hover:text-white transition-colors">La Carta</Link>
            <Link href="/nosotros" className="font-body text-sm text-neutral-50/70 hover:text-white transition-colors">Nosotros</Link>
            <Link href="/contacto" className="font-body text-sm text-neutral-50/70 hover:text-white transition-colors">Contacto</Link>
            <Link href="/carrito" className="font-body text-sm text-neutral-50/70 hover:text-white transition-colors">Pedido</Link>
          </nav>
          <p className="font-body text-sm text-neutral-50/40">
            © {year} · Sitio por{" "}
            <a href="https://sitiohoy.com.ar" className="hover:text-brand-secondary transition-colors">
              SitioHoy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
