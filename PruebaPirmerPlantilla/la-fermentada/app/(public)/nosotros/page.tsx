"use client";

import { motion } from "framer-motion";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function NosotrosPage() {
  const waLink = buildWhatsAppLink({ message: "Hola, quiero saber más sobre La Fermentada." });

  return (
    <div className="min-h-screen bg-neutral-50 pt-24">
      {/* Hero editorial */}
      <div className="bg-brand-accent py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-body text-xs uppercase tracking-[0.3em] text-brand-primary/70 mb-4">
              Quiénes somos
            </p>
            <h1 className="font-display font-bold text-5xl lg:text-7xl text-brand-dark leading-tight italic mb-8">
              Pan hecho con tiempo.
            </h1>
            <p className="font-body text-xl text-neutral-600 max-w-2xl leading-relaxed">
              Empezamos hace años con una idea simple: volver a hacer pan como se hacía antes.
              Sin atajos, sin agregados raros. Solo harina, agua, sal y tiempo.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Historia */}
      <section className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <h2 className="font-display font-bold text-3xl lg:text-4xl text-brand-dark italic">
                La historia empieza antes del amanecer.
              </h2>
              <p className="font-body text-base text-neutral-600 leading-relaxed">
                Nuestro primer horno era pequeño, nuestra levadura salvaje tenía pocos días de vida
                y no teníamos ni idea de cuánto iba a crecer todo esto. Hoy, la madre tiene años
                y sigue activa. Cambia un poco con las estaciones, con la harina, con el clima.
                Pero es nuestra.
              </p>
              <p className="font-body text-base text-neutral-600 leading-relaxed">
                Trabajamos con harinas de molienda local porque creemos que el origen importa.
                Fermentamos lento porque el tiempo es el único ingrediente que no se puede
                reemplazar. Horneamos a la mañana porque el pan recién salido del horno es
                una de las pocas cosas que todavía valen lo que cuestan.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                {/* Cliente: reemplazar con foto propia */}
                <img
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&q=85&auto=format&fit=crop"
                  alt="Pan artesanal La Fermentada"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="bg-brand-dark py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-14"
          >
            <h2 className="font-display font-bold text-3xl lg:text-5xl text-neutral-50 italic">
              Cómo trabajamos.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🌾",
                title: "Harinas de origen",
                desc: "Trabajamos con molinos locales que conocemos. Sabemos de dónde viene cada bolsa.",
              },
              {
                icon: "⏰",
                title: "Fermentación lenta",
                desc: "Entre 12 y 18 horas de fermentación. El tiempo hace que la miga se abra y la corteza se forme sola.",
              },
              {
                icon: "🔥",
                title: "Horno caliente",
                desc: "Cada pieza entra al horno a 280°. La temperatura alta es lo que hace la corteza crujiente.",
              },
              {
                icon: "🧑‍🍳",
                title: "Manos propias",
                desc: "No hay máquinas que amasan por nosotros. Cada pieza pasa por las mismas manos, todos los días.",
              },
              {
                icon: "📅",
                title: "Por encargo",
                desc: "No fabricamos stock. Hacemos lo que hay que hacer para cada día. Por eso pedís antes.",
              },
              {
                icon: "💬",
                title: "Trato directo",
                desc: "Si tenés una duda, querés algo especial o cambiar algo del pedido, escribinos. Somos personas.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="bg-neutral-50/5 rounded-2xl p-6 border border-neutral-50/10"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-display font-bold text-lg text-neutral-50 mb-2 italic">{item.title}</h3>
                <p className="font-body text-sm text-neutral-50/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-neutral-50 py-20 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-brand-dark italic mb-6">
            ¿Querés probar?
          </h2>
          <p className="font-body text-base text-neutral-500 mb-8 leading-relaxed">
            Escribinos por WhatsApp y te contamos qué hay disponible para esta semana.
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-primary text-neutral-50 px-8 py-4 rounded-full font-body font-semibold hover:bg-brand-dark transition-colors shadow-lg shadow-brand-primary/20"
          >
            Pedir por WhatsApp →
          </a>
        </div>
      </section>
    </div>
  );
}
