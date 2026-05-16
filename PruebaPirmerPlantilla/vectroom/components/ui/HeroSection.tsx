"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface HeroSectionProps {
  waLink: string;
}

// Marquee loop text
const MARQUEE_ITEMS = [
  "COLECCIÓN NUEVA",
  "DISEÑO ARGENTINO",
  "HECHO CON CRITERIO",
  "PRODUCCIÓN LOCAL",
  "ROPA QUE DURA",
  "COLECCIÓN NUEVA",
  "DISEÑO ARGENTINO",
  "HECHO CON CRITERIO",
  "PRODUCCIÓN LOCAL",
  "ROPA QUE DURA",
];

export function HeroSection({ waLink }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

  return (
    <>
      {/* ============================================
          DECISIÓN INESPERADA:
          Hero full-black con el nombre de la marca
          como única tipografía de 200px+.
          Sin imagen de fondo. Sin personas.
          El impacto es por sustracción, no por adición.
          ============================================ */}
      <section className="relative min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
        {/* Ruido sutil de fondo */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Nombre enorme — el protagonista */}
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.1 }}
          >
            <h1
              className="font-display font-black uppercase text-white select-none leading-[0.85]"
              style={{
                fontSize: "clamp(5rem, 22vw, 22rem)",
                letterSpacing: "-0.05em",
              }}
            >
              VECTROOM
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.4 }}
            className="font-body text-sm uppercase tracking-[0.4em] text-neutral-400 mt-6 mb-10"
          >
            Ropa · Online · Argentina
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center"
          >
            <Link
              href="/catalogo"
              className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-3.5 rounded-full font-body font-semibold text-sm hover:bg-neutral-100 transition-colors"
            >
              Ver colección
            </Link>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-3.5 rounded-full font-body font-semibold text-sm hover:bg-white/10 transition-colors"
            >
              Consultar talle
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-body text-[10px] uppercase tracking-[0.4em] text-white/30">
            Scroll
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </section>

      {/* ============================================
          Segunda sección: Imagen de moda full-bleed
          con overlay — contraste con el hero de texto
          ============================================ */}
      <section className="relative h-[70vh] lg:h-screen overflow-hidden">
        {/* Cliente: reemplazar con foto propia */}
        <Image
          src="https://images.unsplash.com/photo-1558769132-cb1aea153895?w=2400&q=90&auto=format&fit=crop"
          alt="Colección Vectroom"
          fill
          priority
          quality={90}
          className="object-cover object-top"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        <div className="absolute bottom-10 left-0 right-0 max-w-[1200px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-body text-xs uppercase tracking-[0.3em] text-white/60 mb-3">
              Colección actual
            </p>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-[-0.03em] text-white leading-none mb-6">
              Prendas pensadas
              <br />
              para usarse.
            </h2>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-3 font-body text-sm font-medium text-white group"
            >
              Explorar catálogo
              <span className="w-8 h-px bg-white group-hover:w-16 transition-all duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ============================================
          Marquee strip
          ============================================ */}
      <div className="bg-neutral-900 py-4 overflow-hidden border-y border-neutral-800">
        <div className="flex animate-marquee whitespace-nowrap">
          {MARQUEE_ITEMS.map((item, i) => (
            <span
              key={i}
              className="font-display font-black uppercase text-sm tracking-[0.2em] text-neutral-400 mx-6 flex-shrink-0"
            >
              {item}
              <span className="mx-6 text-neutral-700">·</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
