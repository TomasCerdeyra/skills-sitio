"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const HERO_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1558769132-cb1aea153895?w=1200&q=85&auto=format&fit=crop",
    alt: "Modelo con indumentaria Lecrere",
  },
  {
    src: "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=800&q=80&auto=format&fit=crop",
    alt: "Remera básica premium",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop",
    alt: "Showroom Lecrere",
  },
];

export function HeroSection() {
  const waLink = buildWhatsAppLink({ message: "Hola, quiero ver la colección." });

  return (
    <section className="relative bg-neutral-50 pt-20 pb-0 min-h-[88vh] flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          {/* Texto */}
          <div className="lg:col-span-5 lg:pb-16 order-2 lg:order-1">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-body text-[10px] uppercase tracking-[0.3em] text-brand-secondary mb-8"
            >
              Colección 2025 · Diseño argentino
            </motion.p>

            {/* AnimatedHeading — marca visual */}
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="font-display font-light text-6xl lg:text-8xl text-neutral-900 leading-[1.0] tracking-tight mb-8"
            >
              {["Prendas", "que", "duran."].map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  style={{ display: "inline-block", marginRight: i === 1 ? "0.3em" : "0.15em" }}
                  className={i === 1 ? "italic text-brand-secondary" : ""}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="font-body text-base text-neutral-600 leading-relaxed mb-10 max-w-sm"
            >
              Telas elegidas a mano, cortes que se quedan. Producción local,
              materiales nobles y prendas que tienen sentido cuando te las
              ponés.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center gap-2 bg-brand-primary text-neutral-50 px-8 py-4 font-body font-medium text-sm tracking-wide hover:bg-neutral-800 active:scale-95 transition-all duration-200 group"
              >
                Ver colección
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-neutral-300 text-neutral-700 px-8 py-4 font-body font-medium text-sm tracking-wide hover:border-brand-secondary hover:text-brand-secondary active:scale-95 transition-all duration-200"
              >
                Consultar
              </a>
            </motion.div>
          </div>

          {/* Mosaico de imágenes */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              {/* Imagen principal — ocupa 2 filas */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative aspect-[2/3] lg:row-span-2 overflow-hidden"
              >
                {/* Cliente: reemplazar con foto propia */}
                <Image
                  src={HERO_IMAGES[0].src}
                  alt={HERO_IMAGES[0].alt}
                  fill
                  priority
                  quality={85}
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 35vw"
                />
              </motion.div>

              {/* Imagen secundaria superior */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.25 }}
                className="relative aspect-square overflow-hidden"
              >
                {/* Cliente: reemplazar con foto propia */}
                <Image
                  src={HERO_IMAGES[1].src}
                  alt={HERO_IMAGES[1].alt}
                  fill
                  quality={80}
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </motion.div>

              {/* Imagen secundaria inferior */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.35 }}
                className="relative aspect-square overflow-hidden"
              >
                {/* Cliente: reemplazar con foto propia */}
                <Image
                  src={HERO_IMAGES[2].src}
                  alt={HERO_IMAGES[2].alt}
                  fill
                  quality={80}
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="font-body text-[9px] uppercase tracking-[0.3em] text-neutral-400">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-neutral-400 to-transparent" />
      </motion.div>
    </section>
  );
}
