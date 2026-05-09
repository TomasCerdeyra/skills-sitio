"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const STAGGER_CHILDREN = {
  initial: {},
  animate: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const ITEM = {
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-neutral-900 overflow-hidden flex items-center">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1470338745628-171cf53de3a8?auto=format&fit=crop&w=2400&q=90"
          alt="Bar Homero"
          fill
          priority
          quality={90}
          className="object-cover opacity-45"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/90 via-neutral-900/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 w-full py-24 lg:py-32">
        <div className="max-w-xl">
          <motion.div
            variants={STAGGER_CHILDREN}
            initial="initial"
            animate="animate"
            className="space-y-6"
          >
            <motion.p
              variants={ITEM}
              className="eyebrow-decorated text-sm uppercase tracking-widest text-brand-secondary font-medium"
            >
              Bar de barrio · Buenos Aires
            </motion.p>

            <motion.h1
              variants={ITEM}
              className="font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.08] font-semibold"
            >
              El sabor que<br />nos hace volver.
            </motion.h1>

            <motion.p
              variants={ITEM}
              className="text-lg text-white/70 leading-relaxed max-w-sm"
            >
              Bebidas artesanales, picadas y buenas tardes. Pedí por acá o acercate al local.
            </motion.p>

            <motion.div variants={ITEM} className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/catalogo"
                className="px-7 py-3.5 bg-brand-secondary text-neutral-900 rounded-full font-semibold text-sm hover:bg-brand-secondary/90 transition-colors"
              >
                Ver la carta
              </Link>
              <Link
                href="/checkout/datos"
                className="px-7 py-3.5 bg-white/15 text-white rounded-full font-semibold text-sm hover:bg-white/25 transition-colors backdrop-blur-sm border border-white/20"
              >
                Hacer un pedido
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="text-white/40 text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
          className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
