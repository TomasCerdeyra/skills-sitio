import { ClipRevealOnScroll } from "@/components/ui/ClipRevealOnScroll";
import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function NosotrosPage() {
  const waLink = buildWhatsAppLink({ message: "Hola, quiero hacer una consulta sobre Bar Octopus." });

  return (
    <div className="pt-20">
      {/* Hero dark */}
      <section className="py-24 lg:py-32 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ClipRevealOnScroll>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-brand-primary mb-4">
              Nuestra historia
            </p>
          </ClipRevealOnScroll>
          <ClipRevealOnScroll delay={0.1}>
            <h1 className="font-display text-5xl lg:text-8xl font-extrabold text-white leading-[0.95] tracking-tight max-w-3xl">
              Un bar con alma propia.
            </h1>
          </ClipRevealOnScroll>
        </div>
      </section>

      {/* Imagen + texto — full bleed alternado */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ClipRevealOnScroll direction="left">
              {/* Cliente: reemplazar con foto propia */}
              <div className="aspect-[4/5] rounded-sm overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1442512435-cd787031a5e5?w=1200&q=85&auto=format&fit=crop"
                  alt="Interior de Bar Octopus"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </ClipRevealOnScroll>
            <ClipRevealOnScroll direction="right" delay={0.15}>
              <div>
                <p className="font-body text-xs uppercase tracking-[0.3em] text-brand-primary mb-4">
                  ¿Quiénes somos?
                </p>
                <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-neutral-900 mb-6 leading-tight">
                  Abrimos con hambre de hacer algo distinto.
                </h2>
                <p className="font-body text-neutral-600 leading-relaxed mb-5">
                  Bar Octopus nació de una pregunta simple: ¿por qué es tan difícil encontrar una hamburguesa hecha con cuidado real? Carne fresca, pan del día, salsas que sepan a algo.
                </p>
                <p className="font-body text-neutral-600 leading-relaxed mb-5">
                  Empezamos en un local chico, con pocas mesas y muchas ganas. El boca a boca hizo el resto. Hoy seguimos haciendo lo mismo, pero con más años encima y una carta que fue creciendo junto con los que nos eligen.
                </p>
                <p className="font-body text-neutral-600 leading-relaxed">
                  El nombre es un guiño a la personalidad del bar: muchos tentáculos, un solo cuerpo. Cada hamburguesa tiene su identidad, pero todas comparten el mismo ADN.
                </p>
              </div>
            </ClipRevealOnScroll>
          </div>
        </div>
      </section>

      {/* Valores — full bleed oscuro */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ClipRevealOnScroll>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-brand-primary mb-3 text-center">
              Lo que nos mueve
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-white text-center mb-16 leading-tight">
              Cómo hacemos las cosas.
            </h2>
          </ClipRevealOnScroll>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                numero: "01",
                titulo: "Carne seleccionada",
                desc: "Trabajamos con proveedores que conocemos. Corte, grasa y punto de cocción son decisiones tomadas con criterio, no por conveniencia.",
              },
              {
                numero: "02",
                titulo: "Pan artesanal",
                desc: "El pan brioche entra fresco cada tarde. Nunca congelado, nunca de fábrica. Si no hay pan, no hay hamburguesa.",
              },
              {
                numero: "03",
                titulo: "Salsas de autor",
                desc: "Cinco salsas desarrolladas en casa durante meses de prueba. La 'salsa de la casa' tiene historia y no la contamos fácil.",
              },
            ].map((v, i) => (
              <ClipRevealOnScroll key={i} delay={i * 0.12}>
                <div className="border border-neutral-800 rounded-xl p-8 hover:border-brand-primary/50 transition-colors duration-300">
                  <p className="font-display text-5xl font-extrabold text-brand-primary/30 mb-4">
                    {v.numero}
                  </p>
                  <h3 className="font-display text-xl font-bold text-white mb-3">
                    {v.titulo}
                  </h3>
                  <p className="font-body text-sm text-neutral-400 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </ClipRevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Imagen segunda + CTA — full bleed brand */}
      <section className="py-20 bg-brand-primary">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <ClipRevealOnScroll>
            <h2 className="font-display text-4xl lg:text-6xl font-extrabold text-neutral-900 mb-6 leading-tight">
              ¿Con hambre? Te esperamos.
            </h2>
            <p className="font-body text-neutral-900/70 mb-10 max-w-xl mx-auto">
              Pasá a comer o hacé tu pedido por WhatsApp. Respondemos al toque.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center gap-2 bg-neutral-900 text-neutral-50 px-10 py-4 font-body font-medium hover:bg-neutral-800 hover:scale-[1.02] active:scale-95 transition-all duration-200 rounded-full"
              >
                Ver la carta
              </Link>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border-2 border-neutral-900 text-neutral-900 px-10 py-4 font-body font-medium hover:bg-neutral-900 hover:text-neutral-50 transition-all duration-200 rounded-full"
              >
                Pedir por WhatsApp
              </a>
            </div>
          </ClipRevealOnScroll>
        </div>
      </section>
    </div>
  );
}
