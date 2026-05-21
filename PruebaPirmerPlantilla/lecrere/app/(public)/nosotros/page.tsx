import Image from "next/image";
import Link from "next/link";
import { FadeUpOnScroll } from "@/components/ui/FadeUpOnScroll";
import { SectionLine } from "@/components/ui/SectionLine";

export default function NosotrosPage() {
  return (
    <div className="pt-28">
      {/* Hero Nosotros */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
        <FadeUpOnScroll>
          <div className="flex items-center gap-4 mb-3">
            <SectionLine className="w-12" />
            <p className="font-body text-[10px] uppercase tracking-[0.3em] text-brand-secondary">
              Quiénes somos
            </p>
          </div>
          <h1 className="font-display text-5xl lg:text-8xl font-light text-neutral-900 leading-[1.0] mb-0">
            Lecrere.
          </h1>
        </FadeUpOnScroll>
      </section>

      {/* Imagen + párrafo intro */}
      <section className="bg-neutral-900 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeUpOnScroll>
              <div className="relative aspect-[4/5] overflow-hidden">
                {/* Cliente: reemplazar con foto propia */}
                <Image
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85&auto=format&fit=crop"
                  alt="Colección Lecrere — showroom"
                  fill
                  quality={85}
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeUpOnScroll>

            <FadeUpOnScroll delay={0.12}>
              <p className="font-display text-3xl lg:text-5xl font-light text-neutral-50 leading-[1.2] mb-8 italic">
                &ldquo;Hacemos menos cosas para hacerlas bien.&rdquo;
              </p>
              <p className="font-body text-neutral-50/70 leading-relaxed mb-6">
                Lecrere nació de una convicción simple: la ropa que vale la pena
                usar es la que tiene un porqué detrás. Un material que fue
                elegido. Un corte que fue pensado. Una producción que se puede
                rastrear.
              </p>
              <p className="font-body text-neutral-50/60 leading-relaxed">
                Diseñamos en Buenos Aires, producimos con talleres de confianza,
                y revisamos cada prenda antes de que llegue a tus manos. No
                porque seamos perfeccionistas, sino porque entendemos que lo que
                hacemos tiene que durar.
              </p>
            </FadeUpOnScroll>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <FadeUpOnScroll>
          <div className="flex items-center gap-4 mb-3">
            <SectionLine className="w-12" />
            <p className="font-body text-[10px] uppercase tracking-[0.3em] text-brand-secondary">
              Cómo trabajamos
            </p>
          </div>
          <h2 className="font-display text-4xl lg:text-6xl font-light text-neutral-900 mb-16 leading-tight">
            Sin atajos.
          </h2>
        </FadeUpOnScroll>

        <div className="grid lg:grid-cols-3 gap-10">
          {[
            {
              num: "01",
              title: "Selección de materiales",
              body: "Antes de diseñar, elegimos la tela. Visitamos proveedores, tocamos el material, lavamos muestras. Si algo no pasa esa prueba, no entra a la colección.",
            },
            {
              num: "02",
              title: "Diseño y moldería",
              body: "Cada prenda se trabaja sobre cuerpos reales. La moldería se ajusta para que el corte funcione en diferentes contextos, no solo en foto.",
            },
            {
              num: "03",
              title: "Producción local",
              body: "Trabajamos con talleres en Buenos Aires. Sabemos quién cose cada pieza. Revisamos la terminación antes de que salga de producción.",
            },
          ].map((v, i) => (
            <FadeUpOnScroll key={v.num} delay={i * 0.1}>
              <div>
                <p className="font-display text-6xl font-light text-brand-secondary/30 mb-4">
                  {v.num}
                </p>
                <h3 className="font-display text-2xl font-light text-neutral-900 mb-3">
                  {v.title}
                </h3>
                <p className="font-body text-sm text-neutral-600 leading-relaxed">
                  {v.body}
                </p>
              </div>
            </FadeUpOnScroll>
          ))}
        </div>
      </section>

      {/* Imagen adicional */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
        <FadeUpOnScroll>
          <div className="relative aspect-[21/9] overflow-hidden">
            {/* Cliente: reemplazar con foto propia */}
            <Image
              src="https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=2400&q=90&auto=format&fit=crop"
              alt="Detalle de tela — Lecrere"
              fill
              quality={90}
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/40 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <p className="font-display text-3xl font-light italic text-neutral-50">
                Materiales nobles.
              </p>
            </div>
          </div>
        </FadeUpOnScroll>
      </section>

      {/* CTA */}
      <section className="bg-neutral-100 py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeUpOnScroll>
            <h2 className="font-display text-4xl lg:text-6xl font-light text-neutral-900 mb-6">
              ¿Querés saber más?
            </h2>
            <p className="font-body text-neutral-600 mb-10">
              Escribinos por WhatsApp o pasá por el showroom.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 bg-brand-primary text-neutral-50 px-10 py-4 font-body text-sm font-medium hover:bg-neutral-800 active:scale-95 transition-all"
              >
                Contacto →
              </Link>
              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center gap-2 border border-neutral-300 text-neutral-700 px-10 py-4 font-body text-sm hover:border-brand-primary transition-colors"
              >
                Ver colección
              </Link>
            </div>
          </FadeUpOnScroll>
        </div>
      </section>
    </div>
  );
}
