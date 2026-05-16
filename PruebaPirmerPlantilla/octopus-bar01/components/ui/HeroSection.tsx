"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface HeroImmersiveProps {
  heading: string;
  subheading: string;
  eyebrow: string;
  primaryCta: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
  imageSrc: string;
  imageAlt: string;
  waLink: string;
}

export function HeroSection({
  heading,
  subheading,
  eyebrow,
  primaryCta,
  secondaryCta,
  imageSrc,
  imageAlt,
  waLink,
}: HeroImmersiveProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with scale-in */}
      {/* Cliente: reemplazar con foto propia */}
      <motion.img
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.0, ease: [0.25, 0.1, 0.25, 1] }}
        src={imageSrc}
        alt={imageAlt}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Gradient overlay — heavier at bottom for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/50 to-neutral-900/20" />

      {/* Badge flotante */}
      <motion.div
        initial={{ opacity: 0, rotate: -6, scale: 0.8 }}
        animate={{ opacity: 1, rotate: -3, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-32 right-6 lg:top-40 lg:right-16 z-10 bg-brand-primary text-neutral-900 px-4 py-2 rounded-full font-body text-xs font-bold uppercase tracking-wider shadow-xl"
      >
        Abierto hoy 🍔
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-body text-xs uppercase tracking-[0.3em] text-white/60 mb-6"
        >
          {eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl sm:text-7xl lg:text-9xl font-extrabold text-white leading-[0.95] tracking-tight mb-6"
        >
          {heading}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="font-body text-lg sm:text-xl text-white/80 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          {subheading}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href={primaryCta.href}
            className="inline-flex items-center justify-center gap-2 bg-brand-primary text-neutral-900 px-10 py-4 font-body font-bold text-base hover:bg-brand-secondary hover:scale-105 active:scale-95 transition-all duration-200 rounded-full shadow-2xl shadow-brand-primary/40 w-full sm:w-auto"
          >
            {primaryCta.text}
          </Link>
          {secondaryCta && (
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-10 py-4 font-body font-medium text-base hover:bg-white/10 hover:border-white/60 transition-all duration-200 rounded-full w-full sm:w-auto"
            >
              {secondaryCta.text}
            </a>
          )}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
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
