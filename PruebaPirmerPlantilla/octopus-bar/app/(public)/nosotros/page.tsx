import { FadeUpOnScroll } from "@/components/ui/FadeUpOnScroll";
import Link from "next/link";

export default function NosotrosPage() {
  return (
    <div className="pt-20">
      {/* Hero nosotros */}
      <section className="bg-neutral-900 py-28">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <FadeUpOnScroll>
            <p className="font-body text-xs uppercase tracking-[0.25em] text-brand-secondary mb-4">
              Nuestra historia
            </p>
            <h1 className="font-display text-5xl lg:text-7xl text-white leading-tight font-bold mb-8">
              Un café como los que se hacían antes.
            </h1>
          </FadeUpOnScroll>
        </div>
      </section>

      {/* Historia — full-bleed alternado */}
      <section className="bg-neutral-50 py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Cliente: reemplazar con foto propia */}
            <FadeUpOnScroll>
              <div className="aspect-[4/5] rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=1200&q=85&auto=format&fit=crop"
                  alt="Barista preparando café"
                  className="w-full h-full object-cover"
                />
              </div>
            </FadeUpOnScroll>
            <FadeUpOnScroll delay={0.15}>
              <p className="font-body text-xs uppercase tracking-[0.25em] text-brand-primary mb-4">
                El origen
              </p>
              <h2 className="font-display text-4xl text-neutral-900 mb-6 leading-tight">
                Empezamos con una idea simple.
              </h2>
              <div className="space-y-4 font-body text-neutral-600 leading-relaxed text-lg">
                <p>
                  Abrimos hace años con una idea simple: hacer un buen café y servirlo con tiempo. Hoy seguimos haciendo lo mismo.
                </p>
                <p>
                  Café tostado en el barrio, masas hechas a mano cada mañana, y una mesa para que te quedes el rato que quieras. Sin apuro, sin pretensiones.
                </p>
                <p>
                  Todo lo que servimos tiene una historia detrás. Los granos vienen de productores que conocemos por nombre. El pan sale del horno antes de que lleguen los primeros clientes.
                </p>
              </div>
            </FadeUpOnScroll>
          </div>
        </div>
      </section>

      {/* Valores — full-bleed neutral-100 */}
      <section className="bg-neutral-100 py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <FadeUpOnScroll className="text-center mb-16">
            <h2 className="font-display text-4xl lg:text-5xl text-neutral-900">
              Lo que nos importa
            </h2>
          </FadeUpOnScroll>
          <div className="grid sm:grid-cols-3 gap-10">
            {[
              {
                titulo: "Calidad sin atajos",
                desc: "Materiales y procesos elegidos con criterio. Si no lo hacemos bien, no lo hacemos.",
              },
              {
                titulo: "Atención cercana",
                desc: "Sabemos el nombre de los que vienen seguido. Eso no es casualidad, es lo que buscamos.",
              },
              {
                titulo: "Hecho con criterio",
                desc: "Cada decisión que tomamos suma a la experiencia. Desde el grano hasta la taza.",
              },
            ].map((v, i) => (
              <FadeUpOnScroll key={i} delay={i * 0.1}>
                <div className="bg-white rounded-xl p-8 border border-neutral-200">
                  <div className="w-8 h-1 bg-brand-primary mb-6 rounded-full" />
                  <h3 className="font-display text-xl text-neutral-900 mb-3">{v.titulo}</h3>
                  <p className="font-body text-neutral-600 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </FadeUpOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Imagen final + CTA — full-bleed oscuro */}
      <section className="bg-neutral-900 py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUpOnScroll delay={0.1}>
              <p className="font-body text-xs uppercase tracking-[0.25em] text-brand-secondary mb-4">
                El lugar
              </p>
              <h2 className="font-display text-4xl text-white mb-6 leading-tight">
                Donde siempre hay lugar.
              </h2>
              <p className="font-body text-neutral-300 leading-relaxed mb-8 text-lg">
                Mesas grandes para trabajar, rincones para leer y mostrador para los que solo pasan a buscar su café del día. La puerta siempre está abierta.
              </p>
              {/* Cliente: revisar/reemplazar con dirección real */}
              <p className="font-body text-sm text-neutral-500 mb-8">
                Av. Corrientes 1234, CABA · Lun-Vie 8-20hs · Sáb 9-20hs · Dom 10-18hs
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center gap-2 bg-brand-primary text-white px-8 py-4 font-body font-medium hover:scale-[1.02] active:scale-95 transition-transform"
                >
                  Contactanos
                </Link>
                <Link
                  href="/catalogo"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-4 font-body font-medium hover:bg-white/10 transition-colors"
                >
                  Ver la carta
                </Link>
              </div>
            </FadeUpOnScroll>

            {/* Cliente: reemplazar con foto propia */}
            <FadeUpOnScroll>
              <div className="aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1442512435-cd787031a5e5?w=1200&q=85&auto=format&fit=crop"
                  alt="Interior del café"
                  className="w-full h-full object-cover"
                />
              </div>
            </FadeUpOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
}
