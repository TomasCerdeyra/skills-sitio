import { getSectionImage } from "@/lib/placeholder-images";
import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function NosotrosPage() {
  const waLink = buildWhatsAppLink({ message: "Hola, quiero consultar sobre instrumentos" });

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      {/* Hero header */}
      <div className="bg-neutral-900 py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <p className="font-body text-xs uppercase tracking-[0.25em] text-brand-accent mb-4">
            ♪ Quiénes somos
          </p>
          <h1 className="font-display text-4xl lg:text-6xl font-bold text-neutral-50 leading-tight max-w-2xl">
            Una tienda hecha por músicos, para músicos.
          </h1>
        </div>
      </div>

      {/* Historia */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-neutral-100">
              <img
                src={getSectionImage("guitar,music", 1200, 900, 3)}
                alt="Local de Play Music con instrumentos en la pared"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-body text-xs uppercase tracking-[0.2em] text-brand-primary mb-4">
                ♫ Nuestra historia
              </p>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-neutral-900 mb-6 leading-tight">
                Empezamos hace 12 años con una guitarra y muchas ganas.
              </h2>
              <div className="space-y-4 font-body text-neutral-600 leading-relaxed">
                <p>
                  Play Music nació de una frustración simple: era difícil encontrar buenos
                  instrumentos con asesoramiento honesto en Buenos Aires. Las tiendas grandes
                  tenían de todo pero nadie te ayudaba a elegir. Las pequeñas tenían criterio
                  pero poco stock.
                </p>
                <p>
                  Decidimos hacer algo distinto. Armamos un local donde cada persona que entra
                  puede hablar con alguien que toca, que entiende de sonido, y que va a
                  recomendarte lo que necesitás según tu nivel, tu música y tu presupuesto.
                  No la comisión más alta.
                </p>
                <p>
                  Hoy vendemos a todo el país vía web y seguimos con el mismo criterio:
                  menos catálogo, más curación. Menos ventas, más clientes satisfechos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="bg-neutral-900 py-20 staff-bg">
        <div className="relative z-[1] max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-neutral-50">
              Lo que nos mueve
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                note: "♩",
                title: "Honestidad en cada venta",
                desc: "Si el instrumento más barato cumple tu objetivo, te lo decimos. No vendemos lo más caro sino lo más adecuado.",
              },
              {
                note: "♫",
                title: "Conocimiento real",
                desc: "Todos los que trabajamos acá tocamos algún instrumento. Conocemos las marcas desde adentro, no solo de catálogos.",
              },
              {
                note: "♬",
                title: "Compromiso con el músico",
                desc: "La venta no termina en el cobro. Si hay algo que no funciona o querés upgradear, seguimos en contacto.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center px-4">
                <span className="block font-display text-4xl text-brand-accent mb-4">
                  {item.note}
                </span>
                <h3 className="font-display text-xl font-bold text-neutral-50 mb-3">
                  {item.title}
                </h3>
                <p className="font-body text-neutral-400 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo foto */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-neutral-900 mb-6">
                Un local en CABA,
                <br />
                ventas a todo el país.
              </h2>
              <p className="font-body text-neutral-600 leading-relaxed mb-6">
                Podés venir al local en Av. Corrientes, probar los instrumentos y llevarlo el mismo día.
                O comprarlo por la web y recibir en tu casa con OCA, Andreani o Correo Argentino.
                Calculamos el envío en tiempo real al finalizar la compra.
              </p>
              <div className="space-y-3 mb-8 font-body text-sm">
                {/* Cliente: revisar/reemplazar con datos reales */}
                <div className="flex items-center gap-3 text-neutral-600">
                  <span className="text-brand-primary">📍</span>
                  Av. Corrientes 1234, CABA
                </div>
                <div className="flex items-center gap-3 text-neutral-600">
                  <span className="text-brand-primary">🕐</span>
                  Lunes a sábados · 10 a 20 hs
                </div>
                <div className="flex items-center gap-3 text-neutral-600">
                  <span className="text-brand-primary">📱</span>
                  +54 9 11 4400 5678
                </div>
              </div>
              <div className="flex gap-4">
                <Link
                  href="/catalogo"
                  className="inline-flex items-center gap-2 bg-neutral-900 text-neutral-50 px-6 py-3 font-body font-medium text-sm hover:bg-brand-primary transition-colors rounded-sm"
                >
                  Ver catálogo
                </Link>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-neutral-300 text-neutral-700 px-6 py-3 font-body font-medium text-sm hover:border-brand-primary hover:text-brand-primary transition-colors rounded-sm"
                >
                  WhatsApp
                </a>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-neutral-100">
              <img
                src={getSectionImage("music,store", 1200, 900, 7)}
                alt="Interior de Play Music"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
