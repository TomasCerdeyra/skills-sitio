import { FadeUpOnScroll } from "@/components/ui/FadeUpOnScroll";
import { ClipRevealOnScroll } from "@/components/ui/ClipRevealOnScroll";
import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function NosotrosPage() {
  const waLink = buildWhatsAppLink({
    message: "Hola, quisiera conocer más sobre el estudio.",
  });

  return (
    <div className="bg-neutral-50">
      {/* Header */}
      <div className="bg-brand-primary pt-40 pb-20 lg:pt-48 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="font-body text-xs uppercase tracking-[0.28em] text-brand-accent mb-6">
            El estudio
          </p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl font-black text-neutral-50 leading-[0.9] tracking-tight">
            Nosotros.
          </h1>
        </div>
      </div>

      {/* Split intro */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <FadeUpOnScroll>
              <ClipRevealOnScroll className="relative aspect-[3/4] overflow-hidden">
                {/* Cliente: reemplazar con foto propia */}
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85&auto=format&fit=crop"
                  alt="Dr. Alejandro Méndez — Estudio jurídico"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-primary/70 to-transparent p-8">
                  <p className="font-display text-xl font-semibold text-neutral-50">
                    Dr. Alejandro Méndez
                  </p>
                  {/* Cliente: revisar/reemplazar con datos reales */}
                  <p className="font-body text-sm text-neutral-50/70 mt-1">
                    Matrícula 87.340 CPACF
                  </p>
                </div>
              </ClipRevealOnScroll>
            </FadeUpOnScroll>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <FadeUpOnScroll>
              <span className="font-body text-xs uppercase tracking-[0.25em] text-brand-accent block mb-6">
                Historia
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-primary leading-[1.15] mb-8">
                Más de una década
                <br /> acompañando empresas.
              </h2>
            </FadeUpOnScroll>
            <FadeUpOnScroll delay={0.1}>
              <div className="space-y-5 font-body text-neutral-600 leading-relaxed">
                <p>
                  Empezamos atendiendo consultas de emprendedores que necesitaban constituir su primera
                  sociedad y no sabían por dónde empezar. Hoy, más de quince años después, acompañamos
                  a empresas en distintas etapas: desde la constitución hasta fusiones complejas y
                  expansiones internacionales.
                </p>
                <p>
                  El derecho comercial cambió mucho en estos años, pero una cosa no cambió: los clientes
                  necesitan un profesional que entienda su negocio, no solo las normas. Eso es lo que
                  hacemos.
                </p>
                <p>
                  Trabajamos con empresas medianas, startups en crecimiento y familias empresarias.
                  En todos los casos, el compromiso es el mismo: respuestas claras, honorarios previsibles
                  y presencia real cuando las cosas se complican.
                </p>
              </div>
            </FadeUpOnScroll>
          </div>
        </div>
      </div>

      {/* Valores */}
      <div className="bg-neutral-100 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <FadeUpOnScroll>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-primary leading-[1.1] mb-16">
              Lo que nos define.
            </h2>
          </FadeUpOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                roman: "I",
                title: "Claridad ante todo.",
                text: "No usamos términos legales para impresionar. Los usamos cuando son necesarios y, en ese caso, los explicamos. Un cliente que entiende lo que está pasando toma mejores decisiones.",
              },
              {
                roman: "II",
                title: "Presupuesto sin sorpresas.",
                text: "Antes de empezar cualquier trabajo, el cliente recibe un presupuesto detallado. Los honorarios extra solo se generan si hay un cambio en el alcance acordado.",
              },
              {
                roman: "III",
                title: "Disponibilidad real.",
                text: "Respondemos dentro de las 24 hs hábiles, siempre. En situaciones urgentes, en el mismo día. Tener un abogado que no atiende el teléfono no sirve de nada.",
              },
              {
                roman: "IV",
                title: "Foco en resultados.",
                text: "El objetivo no es generar más trabajo jurídico. Es resolver el problema del cliente de la forma más eficiente y costo-efectiva posible.",
              },
              {
                roman: "V",
                title: "Confidencialidad total.",
                text: "La información que comparten los clientes está protegida por el secreto profesional y por nuestros propios estándares de seguridad y discreción.",
              },
              {
                roman: "VI",
                title: "Perspectiva de negocio.",
                text: "Entendemos que la ley no existe en el vacío. Cada consejo legal considera el impacto en el negocio: tiempos, costos, riesgos y oportunidades.",
              },
            ].map((item, i) => (
              <FadeUpOnScroll key={i} delay={i * 0.07}>
                <div className="bg-neutral-50 p-8 border border-neutral-200 hover:border-brand-accent/40 transition-colors duration-300 group h-full">
                  <span className="font-display text-2xl font-normal text-brand-accent/50 group-hover:text-brand-accent transition-colors block mb-4">
                    {item.roman}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-brand-primary mb-3">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-neutral-600 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </FadeUpOnScroll>
            ))}
          </div>
        </div>
      </div>

      {/* Foto del estudio */}
      <ClipRevealOnScroll className="relative h-80 lg:h-96 overflow-hidden">
        {/* Cliente: reemplazar con foto del estudio */}
        <img
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=2400&q=90&auto=format&fit=crop"
          alt="Estudio Méndez — el equipo"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-primary/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-display text-2xl sm:text-3xl lg:text-5xl font-bold text-neutral-50 text-center max-w-2xl px-6 leading-[1.15]">
            &ldquo;Confianza que se construye caso a caso.&rdquo;
          </p>
        </div>
      </ClipRevealOnScroll>

      {/* Contacto rápido */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeUpOnScroll>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-primary leading-[1.1] mb-6">
              ¿Trabajamos juntos?
            </h2>
            <p className="font-body text-neutral-600 leading-relaxed text-lg">
              La primera consulta no compromete nada y nos ayuda a entender
              si somos el estudio indicado para tu caso.
            </p>
          </FadeUpOnScroll>

          <FadeUpOnScroll delay={0.1}>
            <div className="space-y-4">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-brand-primary text-neutral-50 px-8 py-5 font-body font-semibold text-sm hover:bg-brand-accent hover:text-neutral-900 transition-all duration-200 w-full"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Consultá por WhatsApp
              </a>
              <Link
                href="/contacto"
                className="flex items-center justify-center gap-2 border border-brand-primary text-brand-primary px-8 py-5 font-body font-medium text-sm hover:bg-brand-primary hover:text-neutral-50 transition-all duration-200 w-full"
              >
                Formulario de contacto
              </Link>
            </div>
          </FadeUpOnScroll>
        </div>
      </div>
    </div>
  );
}
