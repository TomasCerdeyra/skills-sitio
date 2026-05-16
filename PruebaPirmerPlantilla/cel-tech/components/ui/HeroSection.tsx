"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics/umami";

const HERO_PHONES = [
  {
    src: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=85&auto=format&fit=crop",
    alt: "iPhone original",
    label: "iPhone",
    brand: "Apple",
  },
  {
    src: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&q=85&auto=format&fit=crop",
    alt: "Samsung Galaxy",
    label: "Galaxy",
    brand: "Samsung",
  },
  {
    src: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=85&auto=format&fit=crop",
    alt: "Smartphone",
    label: "Smartphone",
    brand: "Motorola",
  },
];

const stagger: { container: Variants; item: Variants } = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  },
  item: {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65 } },
  },
};

export function HeroSection() {
  const waLink = buildWhatsAppLink({ message: "Hola, quiero consultar sobre un celular." });

  return (
    <section className="relative min-h-screen bg-neutral-900 flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800/40 to-neutral-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_50%,rgba(212,168,67,0.06)_0%,transparent_60%)]" />

      {/* Línea de acento diagonal */}
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-brand-primary/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8 py-24 lg:py-0 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-0 items-center min-h-screen">

          {/* === LEFT — Copy === */}
          <motion.div
            variants={stagger.container}
            initial="hidden"
            animate="show"
            className="py-12 lg:py-24"
          >
            {/* Eyebrow */}
            <motion.div variants={stagger.item} className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/60" />
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/30" />
              </div>
              <span className="font-body text-xs uppercase tracking-[0.25em] text-brand-primary">
                Celulares verificados · 100% originales
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={stagger.item}
              className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-[0.95] tracking-tighter mb-3"
            >
              El celular
              <br />
              <span className="text-brand-primary">que querés,</span>
              <br />
              <span className="relative inline-block">
                garantizado.
                {/* Subrayado decorativo */}
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="8"
                  viewBox="0 0 100 8"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path
                    d="M0 6 Q25 2 50 5 Q75 8 100 4"
                    stroke="#D4A843"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                </svg>
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={stagger.item}
              className="font-body text-base lg:text-lg text-neutral-400 leading-relaxed max-w-lg mt-8 mb-10"
            >
              iPhone, Samsung, Motorola y más. Cada equipo verificado, con factura y garantía. Envíos a todo el país.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={stagger.item}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center gap-2 bg-brand-primary text-neutral-900 px-8 py-4 rounded-full font-display font-bold text-sm hover:bg-brand-accent hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-lg shadow-brand-primary/30"
              >
                Ver catálogo
                <span className="text-neutral-900/70">→</span>
              </Link>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { source: "hero" })}
                className="inline-flex items-center justify-center gap-2 border border-white/15 text-white px-8 py-4 rounded-full font-body text-sm hover:border-brand-primary/60 hover:text-brand-primary transition-all duration-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#25D366]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Consultar por WhatsApp
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={stagger.item}
              className="flex flex-wrap items-center gap-5 mt-12 pt-8 border-t border-white/8"
            >
              {[
                { icon: "🛡️", text: "Garantía oficial" },
                { icon: "📄", text: "Con factura" },
                { icon: "🚚", text: "Envíos a todo el país" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <span className="text-lg">{icon}</span>
                  <span className="font-body text-xs text-neutral-400">{text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* === RIGHT — Phone cards con scanner (decisión visual inesperada) === */}
          <div className="relative hidden lg:flex items-center justify-center h-screen">
            {/* Phone showcase asimétrico */}
            <div className="relative w-full max-w-md">
              {/* Card central — la grande */}
              <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="scanner-overlay relative mx-auto w-64 aspect-[9/19] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl shadow-neutral-900/60"
              >
                <Image
                  src={HERO_PHONES[0].src}
                  alt={HERO_PHONES[0].alt}
                  fill
                  className="object-cover"
                  priority
                  sizes="256px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent" />
                {/* Badge verificado */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2, type: "spring", stiffness: 200 }}
                  className="absolute top-4 right-4 bg-brand-primary text-neutral-900 text-[9px] font-display font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-lg"
                >
                  ✓ Verificado
                </motion.div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-display text-lg font-bold text-white">{HERO_PHONES[0].label}</p>
                  <p className="font-body text-xs text-neutral-300">{HERO_PHONES[0].brand}</p>
                </div>
              </motion.div>

              {/* Card izquierda — flotante */}
              <motion.div
                initial={{ opacity: 0, x: -30, rotate: -3 }}
                animate={{ opacity: 1, x: 0, rotate: -6 }}
                transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -left-4 top-1/2 -translate-y-1/2 w-40 aspect-[9/16] rounded-[1.5rem] overflow-hidden border border-white/8 shadow-xl"
              >
                <Image
                  src={HERO_PHONES[1].src}
                  alt={HERO_PHONES[1].alt}
                  fill
                  className="object-cover"
                  sizes="160px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/50 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <p className="font-display text-sm font-bold text-white">{HERO_PHONES[1].label}</p>
                </div>
              </motion.div>

              {/* Card derecha — flotante */}
              <motion.div
                initial={{ opacity: 0, x: 30, rotate: 3 }}
                animate={{ opacity: 1, x: 0, rotate: 5 }}
                transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -right-4 top-1/2 -translate-y-1/2 w-36 aspect-[9/16] rounded-[1.5rem] overflow-hidden border border-white/8 shadow-xl"
              >
                <Image
                  src={HERO_PHONES[2].src}
                  alt={HERO_PHONES[2].alt}
                  fill
                  className="object-cover"
                  sizes="144px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/50 to-transparent" />
              </motion.div>

              {/* Glow ring decorativo */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-brand-primary/10 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-brand-primary/5 pointer-events-none" />
            </div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
              <span className="font-body text-[10px] uppercase tracking-[0.3em] text-neutral-600">Scroll</span>
              <div className="w-px h-10 bg-gradient-to-b from-brand-primary/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
