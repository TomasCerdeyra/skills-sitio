import Image from "next/image";
import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { SectionReveal } from "@/components/ui/SectionReveal";

export default function NosotrosPage() {
  const waLink = buildWhatsAppLink();

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="bg-neutral-900 py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4">
            Nosotros
          </p>
          <h1 className="font-display text-5xl lg:text-8xl font-black uppercase tracking-[-0.04em] text-white leading-none">
            Diseñamos y<br />producimos en<br />Argentina.
          </h1>
        </div>
      </section>

      {/* Historia */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <SectionReveal>
              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
                {/* Cliente: reemplazar con foto propia */}
                <Image
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85&auto=format&fit=crop"
                  alt="Taller Vectroom"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <p className="font-body text-xs uppercase tracking-[0.3em] text-neutral-400 mb-8">
                Nuestra historia
              </p>
              <div className="space-y-6 font-body text-neutral-700 leading-relaxed">
                <p>
                  Vectroom nació con una premisa simple: hacer ropa que dure. No moda de temporada,
                  no tendencias que envejecen en tres meses. Prendas básicas bien resueltas, con materiales
                  reales y un diseño que nunca aburre.
                </p>
                <p>
                  Trabajamos con talleres nacionales donde conocemos a las personas que cosen las prendas.
                  Elegimos las telas una por una. Y diseñamos cada prenda pensando en que se use, no en que
                  se vea bien en una foto y después quede en el fondo del armario.
                </p>
                <p>
                  El resultado es una colección pequeña, muy editada, que se renueva sin perder el hilo.
                  Siempre con el mismo criterio: calidad sobre cantidad, materiales sobre marcas, duración
                  sobre novedad.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 bg-neutral-100">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <SectionReveal>
            <h2 className="font-display text-4xl lg:text-5xl font-black uppercase tracking-[-0.03em] text-neutral-900 mb-12">
              Cómo trabajamos
            </h2>
          </SectionReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "Telas seleccionadas",
                desc: "Visitamos tejedurías y mayoristas. Tocamos, lavamos, testamos. Solo trabajamos con materiales que conocemos.",
              },
              {
                num: "02",
                title: "Talleres con criterio",
                desc: "Producimos con talleres chicos de AMBA. Los conocemos personalmente. Las condiciones de trabajo importan.",
              },
              {
                num: "03",
                title: "Pocas prendas, muy editadas",
                desc: "No hacemos colecciones de 200 SKUs. Preferimos 15 prendas perfectas que 150 mediocres.",
              },
            ].map((v, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div>
                  <span className="font-display text-5xl font-black text-neutral-300 leading-none block mb-4">
                    {v.num}
                  </span>
                  <h3 className="font-display text-xl font-bold uppercase tracking-tight text-neutral-900 mb-3">
                    {v.title}
                  </h3>
                  <p className="font-body text-sm text-neutral-600 leading-relaxed">{v.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white text-center">
        <SectionReveal>
          <div className="max-w-md mx-auto px-6">
            <h2 className="font-display text-4xl font-black uppercase tracking-[-0.03em] text-neutral-900 mb-4">
              ¿Querés saber más?
            </h2>
            <p className="font-body text-neutral-600 mb-8">
              Escribinos por WhatsApp. Respondemos sobre envíos, talles, materiales, lo que sea.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-neutral-900 text-white px-8 py-3.5 rounded-full font-body font-semibold text-sm hover:bg-neutral-700 transition-colors"
              >
                WhatsApp
              </a>
              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center border border-neutral-300 text-neutral-700 px-8 py-3.5 rounded-full font-body font-semibold text-sm hover:border-neutral-900 transition-colors"
              >
                Ver catálogo
              </Link>
            </div>
          </div>
        </SectionReveal>
      </section>
    </div>
  );
}
