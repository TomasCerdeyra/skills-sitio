import Image from "next/image";
import Link from "next/link";
import FadeUpOnScroll from "@/components/ui/FadeUpOnScroll";

const VALUES = [
  { icon: "🍺", title: "Calidad artesanal", body: "Trabajamos con proveedores locales y recetas propias. Nada de lo que sale de nuestra barra es improvisado." },
  { icon: "🤝", title: "Hospitalidad de barrio", body: "Conocemos a nuestros clientes por el nombre. El trato cercano es parte de la propuesta." },
  { icon: "🌿", title: "Ingredientes de estación", body: "La carta cambia con el año. Frutas, hierbas y especias frescas, según lo que la temporada ofrece." },
];

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <div className="relative h-72 sm:h-96 bg-neutral-900 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=2000&q=90"
          alt="Interior Bar Homero"
          fill
          className="object-cover opacity-50"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-6xl mx-auto px-4 pb-12 w-full">
            <p className="eyebrow-decorated text-sm uppercase tracking-widest text-brand-secondary font-medium mb-2">
              Quiénes somos
            </p>
            <h1 className="font-display text-5xl text-white font-semibold">Bar Homero</h1>
          </div>
        </div>
      </div>

      {/* Story */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <FadeUpOnScroll>
            <h2 className="font-display text-3xl text-neutral-900 mb-5 leading-tight">
              Un lugar para quedarse.
            </h2>
            <div className="space-y-4 text-neutral-600 leading-relaxed">
              <p>
                Bar Homero abrió sus puertas en el barrio con una sola idea en mente: crear ese espacio donde la gente vuelve. No porque sea el más moderno, sino porque se siente como propio.
              </p>
              <p>
                Empezamos con una selección pequeña de cervezas artesanales y fuimos creciendo de a poco, escuchando lo que la gente pedía. Hoy ofrecemos una carta amplia de bebidas, tragos y algo para picar, pensada para que puedas quedarte el tiempo que quieras.
              </p>
              <p>
                El equipo de Bar Homero está formado por gente que ama el bar. Bartenders con formación, mozos que conocen la carta de memoria y una cocina que toma en serio hasta la picada más simple.
              </p>
            </div>
          </FadeUpOnScroll>

          <FadeUpOnScroll delay={0.15}>
            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=900&q=80"
                  alt="Bartender en Bar Homero"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-square rounded-xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=500&q=80"
                    alt="Cóctel Bar Homero"
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                </div>
                <div className="relative aspect-square rounded-xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=500&q=80"
                    alt="Cerveza Bar Homero"
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                </div>
              </div>
            </div>
          </FadeUpOnScroll>
        </div>
      </section>

      {/* Values */}
      <section className="bg-neutral-900 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <FadeUpOnScroll>
            <div className="text-center mb-12">
              <p className="eyebrow-decorated text-sm uppercase tracking-widest text-brand-secondary font-medium mb-3">
                Nuestra forma de hacer las cosas
              </p>
              <h2 className="font-display text-3xl text-white">Lo que nos importa</h2>
            </div>
          </FadeUpOnScroll>
          <div className="grid sm:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <FadeUpOnScroll key={i} delay={i * 0.1}>
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <p className="text-3xl mb-4">{v.icon}</p>
                  <h3 className="font-display text-white text-lg mb-2">{v.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">{v.body}</p>
                </div>
              </FadeUpOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl mx-auto px-4 py-20 text-center">
        <FadeUpOnScroll>
          <h2 className="font-display text-3xl text-neutral-900 mb-4">¿Querés conocernos?</h2>
          <p className="text-neutral-500 mb-8">Pasate por el local o hacé tu pedido online desde la carta.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/catalogo" className="px-8 py-3.5 bg-brand-primary text-white rounded-full font-semibold hover:bg-brand-primary/90 transition-colors">
              Ver la carta
            </Link>
            <Link href="/contacto" className="px-8 py-3.5 bg-neutral-100 text-neutral-700 rounded-full font-semibold hover:bg-neutral-200 transition-colors">
              Contacto
            </Link>
          </div>
        </FadeUpOnScroll>
      </section>
    </div>
  );
}
