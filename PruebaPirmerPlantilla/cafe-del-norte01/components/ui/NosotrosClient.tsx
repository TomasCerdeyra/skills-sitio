"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SlideFromSide, FadeUpOnScroll } from "./Animations";
import { trackEvent } from "@/lib/analytics/umami";

export function NosotrosClient({ waLink }: { waLink: string }) {
  return (
    <div className="pt-28 pb-20">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 mb-16">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-body text-xs uppercase tracking-[0.25em] text-brand-secondary mb-4"
        >
          ✦ &nbsp; Quiénes somos
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl lg:text-7xl font-bold text-neutral-900 leading-[1.02]"
        >
          Un café de barrio<br />de verdad.
        </motion.h1>
      </div>

      {/* Sección 1: Historia — imagen izquierda, texto derecha */}
      <section className="py-16 lg:py-20 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <SlideFromSide index={0}>
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                {/* Cliente: reemplazar con foto propia */}
                <img
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=85&auto=format&fit=crop"
                  alt="Interior de Café del Norte"
                  className="w-full h-full object-cover"
                />
              </div>
            </SlideFromSide>
            <SlideFromSide index={1}>
              <div>
                <h2 className="font-display text-4xl font-bold text-neutral-900 mb-6">
                  Más que un café, un punto de encuentro.
                </h2>
                <div className="space-y-4 font-body text-neutral-600 leading-relaxed">
                  <p>
                    Abrimos hace más de doce años con una idea simple: hacer un buen café y servirlo con tiempo. Hoy seguimos haciendo lo mismo.
                  </p>
                  <p>
                    Café tostado en el barrio, masas hechas a mano cada mañana, y una mesa para que te quedes el rato que quieras. Sin apuro, sin pantallas que te apuren a irte.
                  </p>
                  <p>
                    Somos el café del norte de la ciudad, literalmente y metafóricamente. El lugar donde se cruzan vecinos, estudiantes, trabajadores y los que simplemente necesitan una pausa.
                  </p>
                </div>
              </div>
            </SlideFromSide>
          </div>
        </div>
      </section>

      {/* Sección 2: El equipo — texto izquierda, imagen derecha */}
      <section className="py-16 lg:py-20 bg-neutral-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <SlideFromSide index={1}>
              <div>
                <h2 className="font-display text-4xl font-bold text-neutral-900 mb-6">
                  El café lo hacemos con las manos.
                </h2>
                <div className="space-y-4 font-body text-neutral-600 leading-relaxed">
                  <p>
                    Nuestro barista principal tiene más de una década entrenando y compitiendo. Selecciona los granos, define el perfil de tueste y calibra la extracción cada mañana.
                  </p>
                  <p>
                    Las masas y la pastelería las hacemos nosotros mismos, con recetas que no cambiamos en años. Porque cuando algo funciona, ¿para qué cambiar?
                  </p>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-6">
                  {[
                    { num: "+12", label: "años abiertos" },
                    { num: "100%", label: "granos de origen único" },
                    { num: "Diario", label: "masas horneadas" },
                    { num: "0", label: "atajos en la cocina" },
                  ].map((stat, i) => (
                    <FadeUpOnScroll key={i} delay={i * 0.08}>
                      <div>
                        <p className="font-display text-3xl font-bold text-brand-primary">{stat.num}</p>
                        <p className="font-body text-sm text-neutral-500 mt-1">{stat.label}</p>
                      </div>
                    </FadeUpOnScroll>
                  ))}
                </div>
              </div>
            </SlideFromSide>
            <SlideFromSide index={0}>
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                {/* Cliente: reemplazar con foto propia */}
                <img
                  src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=1200&q=85&auto=format&fit=crop"
                  alt="Barista preparando café en Café del Norte"
                  className="w-full h-full object-cover"
                />
              </div>
            </SlideFromSide>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <FadeUpOnScroll>
          <p className="font-display text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            ¿Querés conocernos?
          </p>
          <p className="font-body text-lg text-neutral-600 mb-8 max-w-xl mx-auto">
            Pasá a tomar un café o escribinos por WhatsApp. Estamos todos los días.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center bg-brand-primary text-neutral-50 px-10 py-4 rounded-full font-body font-medium hover:bg-brand-secondary transition-colors duration-200 active:scale-95"
            >
              Contacto
            </Link>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { source: "nosotros" })}
              className="inline-flex items-center justify-center gap-2 border border-neutral-300 text-neutral-700 px-10 py-4 rounded-full font-body font-medium hover:border-brand-primary hover:text-brand-primary transition-colors duration-200 active:scale-95"
            >
              WhatsApp
            </a>
          </div>
        </FadeUpOnScroll>
      </section>
    </div>
  );
}
