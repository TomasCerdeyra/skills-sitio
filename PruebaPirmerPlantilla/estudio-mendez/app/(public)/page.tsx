import { HeroSection } from "@/components/ui/HeroSection";
import { FadeUpOnScroll } from "@/components/ui/FadeUpOnScroll";
import { ClipRevealOnScroll } from "@/components/ui/ClipRevealOnScroll";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { createAdminClient } from "@/lib/supabase/admin";
import Link from "next/link";

// ============================================================
// Mock data — visible cuando la DB está vacía (demo mode)
// ============================================================
const MOCK_FEATURED = [
  {
    id: "mock-1",
    name: "Constitución de SRL o SA",
    slug: "constitucion-srl-sa",
    price: 85000,
    compare_at_price: null,
    description:
      "Redacción de estatuto, tramitación ante IGJ y acompañamiento hasta la inscripción definitiva.",
    featured: true,
    category_id: "mock-cat-1",
    product_images: [
      {
        url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&auto=format&fit=crop",
        alt: "Constitución de sociedad",
        position: 0,
      },
    ],
  },
  {
    id: "mock-2",
    name: "M&A — Due Diligence Legal",
    slug: "due-diligence-legal",
    price: 145000,
    compare_at_price: null,
    description:
      "Revisión exhaustiva de la situación legal de la empresa objetivo e identificación de riesgos.",
    featured: true,
    category_id: "mock-cat-1",
    product_images: [
      {
        url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop",
        alt: "Due diligence legal",
        position: 0,
      },
    ],
  },
  {
    id: "mock-3",
    name: "Retainer Mensual — PyME",
    slug: "retainer-pyme",
    price: 85000,
    compare_at_price: null,
    description:
      "Asesoramiento legal continuo con consultas, revisión de contratos y respuesta en 24 hs.",
    featured: true,
    category_id: "mock-cat-4",
    product_images: [
      {
        url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&auto=format&fit=crop",
        alt: "Asesoramiento continuo",
        position: 0,
      },
    ],
  },
  {
    id: "mock-4",
    name: "Redacción de Contratos Comerciales",
    slug: "redaccion-contratos",
    price: 55000,
    compare_at_price: null,
    description:
      "Contratos a medida: distribución, agencia, franchising, supply agreements y más.",
    featured: true,
    category_id: "mock-cat-3",
    product_images: [
      {
        url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&auto=format&fit=crop",
        alt: "Contratos comerciales",
        position: 0,
      },
    ],
  },
];

// ============================================================
// Data fetching
// ============================================================
async function getFeaturedServices() {
  try {
    const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
    if (!tenantId) return [];
    const admin = createAdminClient();
    const { data } = await admin
      .from("products")
      .select(
        "id, name, slug, price, compare_at_price, description, featured, category_id, product_images (id, url, alt, position)"
      )
      .eq("tenant_id", tenantId)
      .eq("active", true)
      .eq("featured", true)
      .order("created_at", { ascending: false })
      .limit(4);
    return data ?? [];
  } catch {
    return [];
  }
}

// ============================================================
// Page
// ============================================================
export default async function HomePage() {
  const dbFeatured = await getFeaturedServices();
  const featured = dbFeatured.length > 0 ? dbFeatured : MOCK_FEATURED;

  const waLink = buildWhatsAppLink({
    message: "Hola, quisiera consultar sobre un tema legal.",
  });

  // Roman numerals helper
  const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

  return (
    <>
      {/* ============================================ */}
      {/* HERO                                         */}
      {/* ============================================ */}
      <HeroSection waLink={waLink} />

      {/* ============================================ */}
      {/* MARQUEE — especialidades                     */}
      {/* ============================================ */}
      <div className="bg-brand-accent overflow-hidden py-3">
        <div className="flex gap-0 whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex gap-0 shrink-0 animate-[marquee_28s_linear_infinite]"
              style={{ animationDelay: i === 0 ? "0s" : undefined }}
            >
              {[
                "Constitución de Sociedades",
                "Contratos Comerciales",
                "M&A y Due Diligence",
                "Acuerdos de Accionistas",
                "Litigios Comerciales",
                "Asesoramiento Continuo",
                "Contratos Internacionales",
              ].map((item) => (
                <span
                  key={item}
                  className="font-body text-[11px] uppercase tracking-[0.2em] text-neutral-900 font-semibold px-6"
                >
                  {item} ·
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ============================================ */}
      {/* SERVICIOS DESTACADOS — expedientes           */}
      {/* ============================================ */}
      <section className="bg-neutral-50 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <FadeUpOnScroll>
            <div className="flex items-baseline gap-6 mb-4">
              <span className="font-body text-xs uppercase tracking-[0.25em] text-brand-accent">
                Servicios destacados
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-primary leading-[1.1] mb-16">
              Cómo podemos
              <br /> ayudarte.
            </h2>
          </FadeUpOnScroll>

          {/* Expedientes grid */}
          <div className="divide-y divide-neutral-200">
            {featured.map((service, i) => (
              <FadeUpOnScroll key={service.id} delay={i * 0.08}>
                <Link
                  href={`/servicio/${service.slug}`}
                  className="group flex gap-6 lg:gap-12 py-8 hover:bg-neutral-100/50 transition-colors duration-300 -mx-6 lg:-mx-10 px-6 lg:px-10"
                >
                  {/* Roman numeral */}
                  <div className="w-12 lg:w-20 flex-shrink-0 pt-1">
                    <span className="font-display text-2xl lg:text-3xl font-normal text-brand-accent opacity-70 group-hover:opacity-100 transition-opacity">
                      {ROMAN[i]}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-display text-xl lg:text-2xl font-semibold text-brand-primary group-hover:text-brand-accent transition-colors duration-200 mb-2">
                          {service.name}
                        </h3>
                        <p className="font-body text-sm text-neutral-600 leading-relaxed max-w-xl">
                          {service.description}
                        </p>
                      </div>
                      <div className="flex-shrink-0 flex items-center gap-4 sm:pt-1">
                        {service.price > 0 && (
                          <span className="font-body text-sm text-neutral-500">
                            desde ${service.price.toLocaleString("es-AR")}
                          </span>
                        )}
                        <span className="font-body text-xs uppercase tracking-[0.15em] text-brand-primary group-hover:text-brand-accent transition-colors flex items-center gap-2">
                          Consultar
                          <span className="w-4 h-px bg-current group-hover:w-8 transition-all duration-300" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeUpOnScroll>
            ))}
          </div>

          <FadeUpOnScroll delay={0.3}>
            <div className="mt-12 pt-8 border-t border-neutral-200">
              <Link
                href="/servicios"
                className="inline-flex items-center gap-3 font-body text-sm text-brand-primary hover:text-brand-accent transition-colors group"
              >
                Ver todos los servicios
                <span className="w-8 h-px bg-current group-hover:w-14 transition-all duration-300" />
              </Link>
            </div>
          </FadeUpOnScroll>
        </div>
      </section>

      {/* ============================================ */}
      {/* STATS — tres números que venden confianza    */}
      {/* ============================================ */}
      <section className="bg-brand-primary py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 lg:gap-0 lg:divide-x lg:divide-neutral-50/10">
            {[
              { number: "+120", label: "Causas resueltas", sublabel: "en los últimos 5 años" },
              { number: "+80", label: "Empresas acompañadas", sublabel: "desde su constitución" },
              { number: "15+", label: "Años de experiencia", sublabel: "en derecho comercial" },
            ].map((stat, i) => (
              <ClipRevealOnScroll key={i} delay={i * 0.15} className="text-center lg:px-12">
                <p className="font-display text-5xl lg:text-7xl font-black text-brand-accent leading-none mb-3">
                  {stat.number}
                </p>
                <p className="font-display text-lg text-neutral-50 font-medium mb-1">
                  {stat.label}
                </p>
                <p className="font-body text-sm text-neutral-400">
                  {stat.sublabel}
                </p>
              </ClipRevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* POR QUÉ ELEGIRNOS — 3 pilares               */}
      {/* ============================================ */}
      <section className="bg-neutral-50 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Text block */}
            <div className="lg:col-span-5">
              <FadeUpOnScroll>
                <span className="font-body text-xs uppercase tracking-[0.25em] text-brand-accent block mb-4">
                  El enfoque
                </span>
                <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-primary leading-[1.1]">
                  Asesoramiento
                  <br />
                  que resuelve.
                </h2>
              </FadeUpOnScroll>
              <FadeUpOnScroll delay={0.1}>
                <p className="font-body text-neutral-600 leading-relaxed mt-8 text-lg">
                  No trabajamos con respuestas genéricas ni con modelos copiados de otras firmas.
                  Cada situación tiene su contexto, sus riesgos y su solución específica.
                </p>
                <p className="font-body text-neutral-600 leading-relaxed mt-4">
                  Cuando un cliente viene con un problema, primero lo entendemos en profundidad
                  y después encontramos la respuesta más eficiente — no la más larga.
                </p>
              </FadeUpOnScroll>
            </div>

            {/* Features */}
            <div className="lg:col-span-7 space-y-6">
              {[
                {
                  roman: "I",
                  title: "Claridad ante todo.",
                  description:
                    "Explicamos las situaciones legales sin tecnicismos innecesarios. Queremos que entiendas exactamente qué está pasando y cuáles son tus opciones.",
                },
                {
                  roman: "II",
                  title: "Respuesta en el día.",
                  description:
                    "En derecho comercial, el tiempo tiene valor. Nos comprometemos a responder consultas en menos de 24 hs y a mantener a cada cliente actualizado.",
                },
                {
                  roman: "III",
                  title: "Sin letra chica.",
                  description:
                    "Presupuesto claro antes de empezar. Sin sorpresas ni adicionales no acordados. La confianza es el activo más importante de un estudio.",
                },
              ].map((item, i) => (
                <FadeUpOnScroll key={i} delay={0.1 + i * 0.1}>
                  <div className="flex gap-6 lg:gap-8 p-6 lg:p-8 border border-neutral-200 hover:border-brand-accent/30 transition-colors duration-300 group">
                    <span className="font-display text-3xl font-normal text-brand-accent/50 group-hover:text-brand-accent transition-colors flex-shrink-0 pt-1">
                      {item.roman}
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-brand-primary mb-2">
                        {item.title}
                      </h3>
                      <p className="font-body text-sm text-neutral-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </FadeUpOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* NOSOTROS preview — foto + quote              */}
      {/* ============================================ */}
      <section className="bg-neutral-100 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 min-h-[520px]">
            {/* Imagen */}
            <ClipRevealOnScroll direction="left" className="relative h-72 lg:h-auto overflow-hidden">
              {/* Cliente: reemplazar con foto propia */}
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85&auto=format&fit=crop"
                alt="Estudio Méndez — oficina"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-neutral-100/20" />
            </ClipRevealOnScroll>

            {/* Quote */}
            <FadeUpOnScroll className="flex items-center px-8 py-12 lg:px-16 lg:py-16">
              <div>
                <span className="font-body text-xs uppercase tracking-[0.25em] text-brand-accent block mb-8">
                  Nosotros
                </span>
                <blockquote className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium text-brand-primary leading-[1.2] italic mb-8">
                  &ldquo;El derecho comercial no es solo papeles.
                  Es la estructura sobre la que se construyen los negocios.&rdquo;
                </blockquote>
                <p className="font-body text-sm text-neutral-600 mb-2">
                  <span className="font-semibold text-brand-primary">Dr. Alejandro Méndez</span>
                </p>
                {/* Cliente: revisar/reemplazar con datos reales */}
                <p className="font-body text-sm text-neutral-500">
                  Abogado — Matrícula 87.340 CPACF
                </p>
                <div className="mt-10">
                  <Link
                    href="/nosotros"
                    className="inline-flex items-center gap-3 font-body text-sm text-brand-primary hover:text-brand-accent transition-colors group"
                  >
                    Conocer más
                    <span className="w-8 h-px bg-current group-hover:w-14 transition-all duration-300" />
                  </Link>
                </div>
              </div>
            </FadeUpOnScroll>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PROCESO — cómo trabajamos                    */}
      {/* ============================================ */}
      <section className="bg-neutral-50 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <FadeUpOnScroll>
            <div className="text-center mb-16">
              <span className="font-body text-xs uppercase tracking-[0.25em] text-brand-accent block mb-4">
                El proceso
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-primary leading-[1.1]">
                ¿Cómo empezamos?
              </h2>
            </div>
          </FadeUpOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Primera consulta",
                description: "Nos contás tu situación. Sin compromiso ni costo. Evaluamos juntos el caso.",
              },
              {
                step: "02",
                title: "Diagnóstico claro",
                description: "Te explicamos en detalle qué implica legalmente tu situación y qué opciones tenés.",
              },
              {
                step: "03",
                title: "Propuesta concreta",
                description: "Recibís un presupuesto claro con honorarios, tiempos y alcance del trabajo.",
              },
              {
                step: "04",
                title: "Acompañamiento total",
                description: "Trabajamos el caso y te mantenemos informado en cada paso del proceso.",
              },
            ].map((item, i) => (
              <FadeUpOnScroll key={i} delay={i * 0.1}>
                <div className="relative">
                  <div className="mb-6">
                    <span className="font-body text-[11px] uppercase tracking-[0.25em] text-brand-accent">
                      {item.step}
                    </span>
                    <div className="h-px bg-neutral-200 mt-3 relative">
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-brand-accent" />
                    </div>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-brand-primary mb-3">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-neutral-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </FadeUpOnScroll>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
