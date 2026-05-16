"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics/umami";

/* =============================================
   DECISIÓN DE DISEÑO INESPERADA:
   El hero ES una partitura musical.
   El fondo tiene 5 líneas de pentagrama (via CSS .staff-bg).
   Las notas musicales tipográficas flotan con opacidad baja.
   El nombre "Play Music" aparece sobre una banda oscura
   como si fuera el título de una partitura impresa.
   No hay imagen — la música es el diseño.
============================================= */

const FLOATING_NOTES = [
  { note: "♩", top: "15%", left: "8%", size: "7rem", delay: 0 },
  { note: "♫", top: "60%", left: "3%", size: "5rem", delay: 1.5 },
  { note: "♪", top: "30%", right: "5%", size: "6rem", delay: 3 },
  { note: "♬", top: "70%", right: "8%", size: "4rem", delay: 2 },
  { note: "𝄞", top: "20%", left: "45%", size: "9rem", delay: 0.8 },
  { note: "♩", top: "78%", left: "35%", size: "3.5rem", delay: 4 },
];

export function HeroSection({ waLink }: { waLink: string }) {
  return (
    <section
      className="relative min-h-screen bg-neutral-900 overflow-hidden staff-bg flex items-center"
    >
      {/* Floating musical notes */}
      {FLOATING_NOTES.map((item, i) => (
        <span
          key={i}
          className={`absolute select-none pointer-events-none font-display text-brand-accent/8 animate-float-note${i % 3 === 1 ? "-delay" : i % 3 === 2 ? "-delay2" : ""}`}
          style={{
            top: item.top,
            left: "left" in item ? item.left : undefined,
            right: "right" in item ? item.right : undefined,
            fontSize: item.size,
            zIndex: 0,
          }}
          aria-hidden="true"
        >
          {item.note}
        </span>
      ))}

      {/* Gradient overlay — más oscuro abajo */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-neutral-900/30 z-[1]" />

      {/* Content */}
      <div className="relative z-[2] w-full max-w-7xl mx-auto px-5 lg:px-8 py-32 lg:py-0">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-body text-xs uppercase tracking-[0.35em] text-brand-accent mb-6"
          >
            Instrumentos ♪ Equipamiento ♪ Argentina
          </motion.p>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-6xl sm:text-7xl lg:text-8xl xl:text-[7rem] font-bold text-neutral-50 leading-[0.95] tracking-tight mb-6"
          >
            Tocá lo que
            <br />
            <span
              className="text-transparent"
              style={{
                WebkitTextStroke: "2px #C17B3E",
              }}
            >
              sentís.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-body text-lg sm:text-xl text-neutral-300 max-w-xl leading-relaxed mb-10"
          >
            Guitarras, teclados, baterías, bajos y todo el equipamiento
            que necesitás. Asesoramiento real, envíos a todo el país.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 items-start"
          >
            <Link
              href="/catalogo"
              className="inline-flex items-center justify-center gap-2 bg-brand-primary text-neutral-50 px-8 py-4 font-body font-semibold text-base hover:bg-brand-primary/90 active:scale-95 transition-all duration-200 shadow-2xl shadow-brand-primary/30 rounded-sm"
            >
              Ver instrumentos
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { source: "hero" })}
              className="inline-flex items-center justify-center gap-2 border border-neutral-600 text-neutral-300 px-8 py-4 font-body font-medium text-base hover:border-brand-accent hover:text-brand-accent active:scale-95 transition-all duration-200 rounded-sm"
            >
              Consultar
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap gap-8 mt-14 pt-10 border-t border-neutral-800"
          >
            {[
              { value: "+500", label: "instrumentos" },
              { value: "12 años", label: "en el rubro" },
              { value: "Todo el país", label: "envíos" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl font-bold text-brand-accent">
                  {stat.value}
                </p>
                <p className="font-body text-xs text-neutral-500 uppercase tracking-widest mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 right-8 flex flex-col items-center gap-2 z-[2]"
      >
        <span className="font-body text-[10px] uppercase tracking-[0.3em] text-neutral-600 rotate-90 translate-y-6">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-brand-accent/50 to-transparent" />
      </motion.div>
    </section>
  );
}
