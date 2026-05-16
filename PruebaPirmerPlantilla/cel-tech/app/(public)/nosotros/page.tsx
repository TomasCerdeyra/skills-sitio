import Image from "next/image";
import Link from "next/link";

export default function NosotrosPage() {
  return (
    <div className="bg-neutral-50 min-h-screen pt-20">
      {/* Hero */}
      <section className="bg-neutral-900 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-brand-primary mb-3">
            Nuestra historia
          </p>
          <h1 className="font-display text-4xl lg:text-6xl font-extrabold text-white leading-tight max-w-3xl">
            La tienda de celulares en la que podés confiar.
          </h1>
        </div>
      </section>

      {/* Historia */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="font-body text-xs uppercase tracking-[0.2em] text-brand-primary mb-4">
                Quiénes somos
              </p>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-neutral-900 mb-6">
                Empezamos comprando y vendiendo celulares. Hoy somos especialistas.
              </h2>
              <div className="space-y-4 font-body text-neutral-600 leading-relaxed">
                <p>
                  Cel Tech nació de la pasión por la tecnología y la necesidad de tener un lugar de confianza donde comprar un celular sin miedo a que te pasen gato por liebre.
                </p>
                <p>
                  Aprendimos todo lo que hay que saber sobre celulares: cómo verificar el IMEI, cómo detectar un equipo refabricado, qué chequear antes de comprar. Hoy ese conocimiento está al servicio de nuestros clientes.
                </p>
                <p>
                  {/* Cliente: revisar/reemplazar con historia real */}
                  Cada equipo que ingresa al local pasa por una revisión completa: IMEI verificado, caja original, accesorios de fábrica, software actualizado. Solo si pasa todo eso entra al catálogo.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-3xl">
                <Image
                  src="https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=900&q=85&auto=format&fit=crop"
                  alt="Local Cel Tech"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Badge */}
              <div className="absolute -bottom-5 -right-5 bg-brand-primary text-neutral-900 p-5 rounded-2xl shadow-xl">
                <p className="font-display text-3xl font-extrabold">+500</p>
                <p className="font-body text-xs font-bold uppercase tracking-wide">clientes felices</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="bg-neutral-900 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-white text-center mb-14">
            Nuestros valores
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                title: "Transparencia",
                icon: "🔍",
                desc: "Te decimos exactamente qué comprás, qué garantía tiene y de dónde viene el equipo. Sin letra chica.",
              },
              {
                title: "Conocimiento",
                icon: "🧠",
                desc: "No vendemos lo que no conocemos. Si tenés una duda técnica, la respondemos. Si no sabemos, te lo decimos.",
              },
              {
                title: "Responsabilidad",
                icon: "🤝",
                desc: "Si algo sale mal, lo resolvemos. Nuestro negocio se sostiene con clientes que vuelven y recomiendan.",
              },
            ].map(({ title, icon, desc }) => (
              <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-7">
                <span className="text-4xl block mb-4">{icon}</span>
                <h3 className="font-display text-xl font-bold text-white mb-2">{title}</h3>
                <p className="font-body text-sm text-neutral-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verificación */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-body text-xs uppercase tracking-[0.2em] text-brand-primary mb-3">
              Nuestro proceso
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-neutral-900">
              Cómo verificamos cada equipo
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Revisión IMEI", desc: "Verificamos que el IMEI coincida con la caja y esté libre de bloqueos." },
              { step: "02", title: "Estado físico", desc: "Revisamos pantalla, cámara, botones, conectores y carcasa. Sin daños ocultos." },
              { step: "03", title: "Software original", desc: "Solo aceptamos equipos con software de fábrica sin modificaciones." },
              { step: "04", title: "Garantía vigente", desc: "Controlamos que la garantía de fábrica esté activa y sea válida en Argentina." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="relative p-6 border border-neutral-200 rounded-2xl hover:border-brand-primary transition-colors group">
                <span className="font-display text-6xl font-extrabold text-neutral-100 group-hover:text-brand-primary/20 transition-colors absolute top-4 right-4 leading-none">
                  {step}
                </span>
                <h3 className="font-display text-lg font-bold text-neutral-900 mb-2 mt-6">{title}</h3>
                <p className="font-body text-sm text-neutral-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-neutral-100 py-16">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <h2 className="font-display text-3xl font-bold text-neutral-900 mb-4">
            ¿Tenés preguntas?
          </h2>
          <p className="font-body text-neutral-500 mb-8">
            Escribinos por WhatsApp o pasá por el local.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 bg-neutral-900 text-white px-8 py-3.5 rounded-full font-display font-bold text-sm hover:bg-brand-primary hover:text-neutral-900 transition-all"
            >
              Contacto
            </Link>
            <a
              href={`https://wa.me/5491144005678?text=${encodeURIComponent("Hola, tengo una consulta sobre Cel Tech.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-3.5 rounded-full font-display font-bold text-sm hover:scale-[1.02] transition-transform"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
