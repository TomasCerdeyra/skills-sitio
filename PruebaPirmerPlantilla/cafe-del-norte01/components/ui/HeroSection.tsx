"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics/umami";

interface HeroMosaicProps {
  waLink: string;
}

export function HeroSection({ waLink }: HeroMosaicProps) {
  return (
    // ADN: hero: mosaic — mosaico 3 imágenes + texto al costado
    <section className="bg-neutral-50 pt-20 pb-0 lg:pb-0 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-end min-h-[85vh] lg:min-h-[90vh] py-12 lg:py-16">

          {/* Texto — izquierda, 5 columnas */}
          <div className="lg:col-span-5 lg:pb-16 order-2 lg:order-1">
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-body text-xs uppercase tracking-[0.25em] text-brand-secondary mb-6"
            >
              ✦ &nbsp; Café de especialidad · Tucumán
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 leading-[1.02] tracking-tight mb-6"
            >
              Café de barrio,
              <br />
              <span className="text-brand-primary">alma de barrio.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="font-body text-lg text-neutral-600 leading-relaxed mb-10 max-w-md"
            >
              Café de especialidad, medialunas hechas en casa y mesas para charlar sin apuro. Pedí por WhatsApp o comprá online.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center gap-2 bg-brand-primary text-neutral-50 px-8 py-4 font-body font-medium text-sm rounded-full hover:bg-brand-secondary hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-lg shadow-brand-primary/30"
              >
                Ver la carta →
              </Link>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { source: "hero" })}
                className="inline-flex items-center justify-center gap-2 border border-neutral-300 text-neutral-700 px-8 py-4 font-body font-medium text-sm rounded-full hover:border-brand-primary hover:text-brand-primary transition-colors duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[#25D366]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Pedido por WhatsApp
              </a>
            </motion.div>

            {/* Badge flotante — hero hack */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 15 }}
              className="hidden sm:inline-flex mt-10 items-center gap-2 bg-brand-accent text-neutral-800 px-4 py-2 rounded-full text-xs font-body font-medium shadow-sm"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Abierto hoy · Lun a Dom 8 a 23 hs
            </motion.div>
          </div>

          {/* Mosaico de imágenes — ADN: mosaic — derecha, 7 columnas */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              {/* Imagen principal grande — columna 1, 2 filas */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="row-span-2 aspect-[2/3] lg:aspect-auto lg:h-[520px] overflow-hidden rounded-2xl"
              >
                {/* Cliente: reemplazar con foto propia */}
                <img
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=85&auto=format&fit=crop"
                  alt="Interior cálido de Café del Norte"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>

              {/* Imagen secundaria superior */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.35 }}
                className="aspect-square overflow-hidden rounded-2xl"
              >
                {/* Cliente: reemplazar con foto propia */}
                <img
                  src="https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&q=80&auto=format&fit=crop"
                  alt="Capuchino con foam art"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>

              {/* Imagen secundaria inferior */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5 }}
                className="aspect-square overflow-hidden rounded-2xl"
              >
                {/* Cliente: reemplazar con foto propia */}
                <img
                  src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80&auto=format&fit=crop"
                  alt="Medialunas recién horneadas"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Strip de especialidades — scroll horizontal animado */}
      <div className="border-t border-neutral-200 overflow-hidden bg-brand-primary/5 py-4">
        <motion.div
          animate={{ x: [0, -1200] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 whitespace-nowrap"
        >
          {[
            "Espresso", "Cortado", "Capuchino", "Cold Brew", "Latte", "Matcha",
            "Medialuna", "Tostado", "Brownie", "Cheesecake", "IPA Artesanal", "Malbec",
            "Espresso", "Cortado", "Capuchino", "Cold Brew", "Latte", "Matcha",
            "Medialuna", "Tostado", "Brownie", "Cheesecake", "IPA Artesanal", "Malbec",
          ].map((item, i) => (
            <span key={i} className="font-body text-sm text-neutral-600 tracking-widest uppercase">
              {item} <span className="text-brand-secondary mx-2">✦</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
