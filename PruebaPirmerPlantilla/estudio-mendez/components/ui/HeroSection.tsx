"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics/umami";

// ============================================================
// Hero Tipográfico — Estudio Méndez
// Decisión de diseño: El apellido "MÉNDEZ" es el elemento visual
// principal. Hero completamente tipográfico, sin fotografía.
// Una línea ámbar divide el nombre de la especialidad.
// ============================================================

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const lineVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.5 },
  },
};

export function HeroSection({ waLink }: { waLink: string }) {
  return (
    <section className="relative min-h-screen bg-brand-primary flex flex-col justify-between overflow-hidden">
      {/* Grain texture overlay — sutil */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Contenido principal */}
      <div className="flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow */}
            <motion.p
              variants={itemVariants}
              className="font-body text-xs uppercase tracking-[0.28em] text-brand-accent mb-10 sm:mb-14"
            >
              Estudio Jurídico · Buenos Aires
            </motion.p>

            {/* Nombre principal — elemento visual */}
            <motion.h1
              variants={itemVariants}
              className="font-display text-[clamp(4rem,14vw,11rem)] font-black text-neutral-50 leading-[0.9] tracking-[-0.02em] mb-0"
            >
              MÉNDEZ.
            </motion.h1>

            {/* Línea ámbar — la firma */}
            <motion.div
              variants={lineVariants}
              style={{ transformOrigin: "left center" }}
              className="h-px bg-brand-accent my-6 sm:my-8 w-full"
            />

            {/* Especialidad */}
            <motion.p
              variants={itemVariants}
              className="font-display text-xl sm:text-2xl lg:text-3xl font-normal text-neutral-300 italic tracking-tight mb-12"
            >
              Derecho comercial y societario.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 items-start"
            >
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { source: "hero" })}
                className="inline-flex items-center gap-3 bg-brand-accent text-neutral-900 px-8 py-4 font-body font-semibold text-sm hover:bg-brand-accent-light active:scale-95 transition-all duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Consultá tu caso
              </a>
              <Link
                href="/servicios"
                className="inline-flex items-center gap-3 border border-neutral-50/20 text-neutral-50/80 px-8 py-4 font-body font-medium text-sm hover:border-neutral-50/60 hover:text-neutral-50 transition-all duration-200 group"
              >
                Ver servicios
                <span className="w-6 h-px bg-neutral-50/40 group-hover:w-10 transition-all duration-300" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="flex flex-col items-start px-6 lg:px-10 pb-10 gap-3"
      >
        <span className="font-body text-[10px] uppercase tracking-[0.3em] text-neutral-50/30">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-neutral-50/30 to-transparent" />
      </motion.div>
    </section>
  );
}
