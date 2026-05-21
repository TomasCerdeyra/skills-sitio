"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const BENTO_ITEMS = [
  { src: "https://loremflickr.com/600/700/snapback,cap?lock=11", alt: "Gorra Snapback", span: "row-span-2" },
  { src: "https://loremflickr.com/600/400/dadhat,cap?lock=22", alt: "Dad Hat", span: "" },
  { src: "https://loremflickr.com/600/400/fitted,cap?lock=33", alt: "Fitted Cap", span: "" },
  { src: "https://loremflickr.com/600/500/streetwear,cap?lock=44", alt: "Streetwear Cap", span: "" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-[#0A0A0A] flex flex-col justify-center overflow-hidden pt-16">
      {/* Giant outlined background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="text-[20vw] font-black leading-none opacity-[0.04] tracking-tighter whitespace-nowrap"
          style={{
            fontFamily: "var(--font-display)",
            WebkitTextStroke: "2px #D4FF00",
            color: "transparent",
          }}
        >
          GORRAS
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[85vh]">
          {/* Left: copy */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 bg-[#D4FF00]/10 border border-[#D4FF00]/30 text-[#D4FF00] text-xs font-bold tracking-[0.2em] uppercase rounded-full mb-6">
                Nueva colección 2025
              </span>
            </motion.div>

            <motion.h1
              className="text-[clamp(3rem,8vw,7rem)] font-black leading-[0.9] tracking-tight mb-6"
              style={{ fontFamily: "var(--font-display)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="block text-white">GORRAS</span>
              <span
                className="block"
                style={{
                  WebkitTextStroke: "2px #D4FF00",
                  color: "transparent",
                }}
              >
                QUE
              </span>
              <span className="block text-[#D4FF00]">ROMPEN</span>
            </motion.h1>

            <motion.p
              className="text-[#A0A0A0] text-lg leading-relaxed mb-10 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              Diseños alocados para los que no le tienen miedo al estilo.
              Snapbacks, dad hats y 5-panels con onda skater.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="/catalogo"
                className="px-8 py-4 bg-[#D4FF00] text-[#0A0A0A] font-black text-lg rounded-full hover:bg-white transition-colors"
                style={{ fontFamily: "var(--font-display)" }}
              >
                VER CATÁLOGO
              </Link>
              <Link
                href="/nosotros"
                className="px-8 py-4 border-2 border-[#2E2E2E] text-white font-bold text-lg rounded-full hover:border-[#D4FF00] hover:text-[#D4FF00] transition-colors"
              >
                Nuestra historia
              </Link>
            </motion.div>

            <motion.div
              className="flex items-center gap-8 mt-12 pt-8 border-t border-[#1A1A1A]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {[
                { num: "500+", label: "Modelos" },
                { num: "24hs", label: "Despacho" },
                { num: "★ 4.9", label: "Calificación" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-black text-[#D4FF00]" style={{ fontFamily: "var(--font-display)" }}>
                    {stat.num}
                  </p>
                  <p className="text-xs text-[#A0A0A0] uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: bento grid */}
          <motion.div
            className="hidden lg:grid grid-cols-2 gap-3 h-[600px]"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {BENTO_ITEMS.map((item, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-2xl bg-[#141414] ${item.span}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1280px) 25vw, 300px"
                />
                {i === 0 && (
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent" />
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-[#2E2E2E] text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-px h-8 bg-[#D4FF00]/30"
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      </motion.div>
    </section>
  );
}
