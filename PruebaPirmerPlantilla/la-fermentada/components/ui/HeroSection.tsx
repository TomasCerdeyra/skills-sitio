"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface HeroSectionProps {
  waLink: string;
}

export function HeroSection({ waLink }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen bg-brand-accent overflow-hidden flex items-center">
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-16 lg:pt-36">
        <div className="grid lg:grid-cols-12 gap-8 items-center min-h-[80vh]">
          {/* Texto + CTA */}
          <div className="lg:col-span-7 relative">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-body text-xs uppercase tracking-[0.3em] text-brand-primary/70 mb-6"
            >
              Panadería artesanal · Buenos Aires
            </motion.p>

            {/* Heading — display enorme, italic, asimétrico */}
            <div className="relative">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-bold leading-[0.9] tracking-tighter text-brand-dark"
                style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)" }}
              >
                La
                {/* Imagen circular 1 — bubble dentro del texto */}
                <motion.span
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                  className="inline-block align-middle mx-3 relative"
                  style={{ width: "clamp(3rem, 8vw, 6rem)", height: "clamp(3rem, 8vw, 6rem)" }}
                >
                  {/* Cliente: reemplazar con foto propia */}
                  <img
                    src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80&auto=format&fit=crop"
                    alt="Pan masa madre"
                    className="w-full h-full object-cover rounded-full border-4 border-brand-primary shadow-lg"
                  />
                </motion.span>
                <br />
                <span className="italic text-brand-primary">Fermentada</span>
              </motion.h1>
            </div>

            {/* Descripción */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="font-body text-lg lg:text-xl text-neutral-600 leading-relaxed mt-8 mb-10 max-w-md"
            >
              Masa madre, fermentación lenta y harinas de molienda local.
              Lo que comés acá se hace acá, antes del amanecer.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 items-start"
            >
              <Link
                href="/catalogo"
                className="inline-flex items-center gap-2 bg-brand-primary text-neutral-50 px-7 py-4 rounded-full font-body font-semibold text-base hover:bg-brand-dark transition-colors shadow-lg shadow-brand-primary/30"
              >
                Ver el pan del día
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-brand-primary text-brand-primary px-7 py-4 rounded-full font-body font-semibold text-base hover:bg-brand-primary hover:text-neutral-50 transition-colors"
              >
                Hacer un pedido
              </a>
            </motion.div>

            {/* Horario */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="font-body text-sm text-neutral-400 mt-8"
            >
              {/* Cliente: revisar/reemplazar con datos reales */}
              Retiro en local · Honduras 4567, Palermo · Lun–Sáb 9 a 13 hs
            </motion.p>
          </div>

          {/* Lado derecho — composición de imágenes circulares orbitando */}
          <div className="lg:col-span-5 relative h-[360px] lg:h-[560px]">
            {/* Imagen grande — centro */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ width: "clamp(200px, 40vw, 300px)", height: "clamp(200px, 40vw, 300px)" }}
            >
              {/* Cliente: reemplazar con foto propia */}
              <img
                src="https://images.unsplash.com/photo-1558303729-b51f9cf25d12?w=800&q=80&auto=format&fit=crop"
                alt="Pan artesanal"
                className="w-full h-full object-cover rounded-full border-8 border-neutral-50 shadow-2xl shadow-brand-dark/20"
              />
            </motion.div>

            {/* Imagen media — arriba derecha */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute top-4 right-4 lg:right-0 lg:top-8"
              style={{ width: "clamp(110px, 20vw, 160px)", height: "clamp(110px, 20vw, 160px)" }}
            >
              {/* Cliente: reemplazar con foto propia */}
              <img
                src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80&auto=format&fit=crop"
                alt="Facturas artesanales"
                className="w-full h-full object-cover rounded-full border-4 border-brand-accent shadow-xl"
              />
            </motion.div>

            {/* Imagen chica — abajo izquierda */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: 30 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.9, delay: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute bottom-4 left-0 lg:left-4"
              style={{ width: "clamp(90px, 15vw, 130px)", height: "clamp(90px, 15vw, 130px)" }}
            >
              {/* Cliente: reemplazar con foto propia */}
              <img
                src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80&auto=format&fit=crop"
                alt="Torta de la panadería"
                className="w-full h-full object-cover rounded-full border-4 border-brand-secondary shadow-xl"
              />
            </motion.div>

            {/* Badge flotante — decisión única */}
            <motion.div
              initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
              animate={{ opacity: 1, rotate: -6, scale: 1 }}
              transition={{ duration: 0.7, delay: 1, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute top-0 left-4 lg:left-8 bg-brand-secondary text-brand-dark px-4 py-2 rounded-xl font-body font-bold text-sm shadow-lg"
            >
              Horneado hoy
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-body text-xs uppercase tracking-[0.3em] text-neutral-400">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-neutral-400 to-transparent" />
      </motion.div>
    </section>
  );
}
