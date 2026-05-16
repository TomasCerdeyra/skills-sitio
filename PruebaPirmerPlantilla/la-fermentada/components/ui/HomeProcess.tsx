"use client";

import { motion } from "framer-motion";

const PROCESS_STEPS = [
  {
    time: "2:00 am",
    title: "Se activa la madre",
    description:
      "La levadura salvaje lleva años con nosotros. Cada noche la alimentamos con harina y agua. Cuando burbujea, está lista.",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80&auto=format&fit=crop",
    alt: "Levadura madre activa",
  },
  {
    time: "4:30 am",
    title: "Se arma la masa",
    description:
      "Harina de molienda local, agua fría, sal y la madre. Nada más. El tiempo hace el resto. Pliegues cada media hora.",
    image:
      "https://images.unsplash.com/photo-1558303729-b51f9cf25d12?w=600&q=80&auto=format&fit=crop",
    alt: "Amasado artesanal",
  },
  {
    time: "7:00 am",
    title: "El horno a 280°",
    description:
      "Cada pieza entra al horno a temperatura alta con vapor. La corteza se forma rápido, la miga abre lentamente. El aroma sale a la calle.",
    image:
      "https://picsum.photos/seed/horno-pan-fermentada/600/400",
    alt: "Horneado artesanal",
  },
  {
    time: "9:00 am",
    title: "Listo para vos",
    description:
      "Recién salido del horno, sobre la rejilla. Hay que esperar 30 minutos para cortarlo bien. Vale la pena.",
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80&auto=format&fit=crop",
    alt: "Pan listo para retirar",
  },
];

export function HomeProcess() {
  return (
    <section className="bg-brand-dark py-20 lg:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 lg:mb-20"
        >
          <p className="font-body text-xs uppercase tracking-[0.3em] text-brand-secondary/70 mb-3">
            El proceso
          </p>
          <h2 className="font-display font-bold text-4xl lg:text-6xl text-neutral-50 leading-tight">
            Antes del amanecer.
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-20 lg:space-y-0">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.time}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                i % 2 !== 0 ? "lg:direction-rtl" : ""
              }`}
              style={{ direction: i % 2 !== 0 ? "rtl" : "ltr" }}
            >
              {/* Imagen */}
              <div style={{ direction: "ltr" }} className="relative">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                  {/* Cliente: reemplazar con foto propia */}
                  <img
                    src={step.image}
                    alt={step.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Time badge */}
                <div className="absolute -top-4 -left-4 bg-brand-secondary text-brand-dark px-4 py-2 rounded-xl font-display font-bold text-lg shadow-lg">
                  {step.time}
                </div>
              </div>

              {/* Texto */}
              <div style={{ direction: "ltr" }} className="space-y-4">
                <h3 className="font-display font-bold text-2xl lg:text-3xl text-neutral-50 italic">
                  {step.title}
                </h3>
                <p className="font-body text-base text-neutral-50/70 leading-relaxed">
                  {step.description}
                </p>
                <div className="w-12 h-px bg-brand-secondary" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
