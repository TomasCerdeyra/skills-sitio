"use client";

import { motion } from "framer-motion";

interface HomePickupProps {
  waLink: string;
}

export function HomePickup({ waLink }: HomePickupProps) {
  return (
    <section className="bg-brand-accent py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-body text-xs uppercase tracking-[0.3em] text-brand-primary/70 mb-4">
              Cómo pedimos
            </p>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-brand-dark leading-tight mb-8 italic">
              El pan se encarga,<br /> no se improvisa.
            </h2>
            <div className="space-y-5">
              {[
                {
                  num: "01",
                  title: "Escribinos por WhatsApp",
                  desc: "Contanos qué querés y para qué día. Respondemos siempre el mismo día.",
                },
                {
                  num: "02",
                  title: "Confirmamos el pedido",
                  desc: "Te avisamos si hay stock para esa fecha y cerramos el pedido.",
                },
                {
                  num: "03",
                  title: "Retirás o te lo enviamos",
                  desc: "Retiro en Palermo de lunes a sábados de 9 a 13 hs. Envíos a CABA y GBA.",
                },
              ].map((step) => (
                <div key={step.num} className="flex gap-4 items-start">
                  <span className="flex-shrink-0 font-display font-bold text-2xl text-brand-secondary leading-none mt-1">
                    {step.num}
                  </span>
                  <div>
                    <p className="font-body font-semibold text-brand-dark mb-1">{step.title}</p>
                    <p className="font-body text-sm text-neutral-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <motion.a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-3 bg-brand-primary text-neutral-50 px-7 py-4 rounded-full font-body font-semibold hover:bg-brand-dark transition-colors shadow-lg shadow-brand-primary/30"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-green-400">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Pedir por WhatsApp
            </motion.a>
          </motion.div>

          {/* Horarios + foto */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-6"
          >
            {/* Imagen */}
            <div className="aspect-[4/3] overflow-hidden rounded-2xl">
              {/* Cliente: reemplazar con foto propia */}
              <img
                src="https://images.unsplash.com/photo-1558303729-b51f9cf25d12?w=800&q=85&auto=format&fit=crop"
                alt="Interior de la panadería"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Datos del local */}
            <div className="bg-neutral-50 rounded-2xl p-6 space-y-3 border border-neutral-200">
              <p className="font-display font-bold text-xl text-brand-dark">Retiro en local</p>
              {/* Cliente: revisar/reemplazar con datos reales */}
              <div className="space-y-1.5">
                <p className="font-body text-sm text-neutral-600 flex gap-2 items-start">
                  <span className="text-brand-secondary mt-0.5">📍</span>
                  Honduras 4567, Palermo, CABA
                </p>
                <p className="font-body text-sm text-neutral-600 flex gap-2 items-start">
                  <span className="text-brand-secondary mt-0.5">🕘</span>
                  Lunes a sábados, 9 a 13 hs
                </p>
                <p className="font-body text-sm text-neutral-600 flex gap-2 items-start">
                  <span className="text-brand-secondary mt-0.5">🚚</span>
                  Envíos a CABA y GBA — miércoles y sábados
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
