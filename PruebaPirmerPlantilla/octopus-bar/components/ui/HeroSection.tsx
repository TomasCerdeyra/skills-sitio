"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function HeroSection({
  waLink,
}: {
  waLink: string;
}) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image — interior del café */}
      {/* Cliente: reemplazar con foto propia */}
      <motion.img
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
        src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=2400&q=90&auto=format&fit=crop"
        alt="Interior de Café del Norte"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/85 via-neutral-900/40 to-neutral-900/30" />

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge flotante — elemento único del hero */}
        <motion.div
          initial={{ opacity: 0, y: -10, rotate: -3 }}
          animate={{ opacity: 1, y: 0, rotate: -3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-block bg-brand-secondary/90 text-neutral-900 text-xs font-body font-semibold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-10"
        >
          ☕ Cafetería de especialidad · CABA
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold text-white leading-[1.0] tracking-tight mb-8"
        >
          Café del Norte
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="font-body text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Café de especialidad, medialunas hechas en casa y mesas para charlar sin apuro. Pasate a tomar algo o pedí por WhatsApp.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/catalogo"
            className="inline-flex items-center justify-center gap-2 bg-white text-neutral-900 px-10 py-4 font-body font-medium hover:bg-brand-accent hover:text-brand-primary transition-colors duration-300"
          >
            Ver la carta
          </Link>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-white/40 text-white px-10 py-4 font-body font-medium hover:bg-white/10 transition-colors duration-300"
          >
            Pedir por WhatsApp
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-body text-xs uppercase tracking-[0.3em] text-white/40">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </section>
  );
}
