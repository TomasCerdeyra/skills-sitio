import { HeroSection } from "@/components/ui/HeroSection";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { createAdminClient } from "@/lib/supabase/admin";
import Image from "next/image";
import Link from "next/link";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { FeaturedGrid } from "@/components/ui/FeaturedGrid";

// ============================================================
// MOCK DATA — fallback cuando la DB no está configurada
// ============================================================
const MOCK_FEATURED = [
  {
    id: "mock-1",
    name: "Vestido midi minimal",
    slug: "vestido-midi-minimal",
    price: 65000,
    compare_at_price: 78000,
    description: "Corte limpio, caída perfecta. Un vestido que se adapta al cuerpo sin esfuerzo.",
    featured: true,
    category_id: "mock-cat-1",
    product_images: [
      {
        url: "https://images.unsplash.com/photo-1558769132-cb1aea153895?w=800&q=80&auto=format&fit=crop",
        alt: "Vestido midi minimal",
        position: 0,
      },
    ],
  },
  {
    id: "mock-2",
    name: "Saco oversized colección",
    slug: "saco-oversized-coleccion",
    price: 115000,
    compare_at_price: null,
    description: "Paño de lana 70%, corte masculino relajado para cualquier género.",
    featured: true,
    category_id: "mock-cat-5",
    product_images: [
      {
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop",
        alt: "Saco oversized",
        position: 0,
      },
    ],
  },
  {
    id: "mock-3",
    name: "Buzo unisex negro",
    slug: "buzo-unisex-negro",
    price: 55000,
    compare_at_price: null,
    description: "French terry pesado, fit holgado. Negro que no se destiñe.",
    featured: true,
    category_id: "mock-cat-3",
    product_images: [
      {
        url: "https://picsum.photos/seed/buzo-unisex-negro/800/1000",
        alt: "Buzo unisex negro",
        position: 0,
      },
    ],
  },
  {
    id: "mock-4",
    name: "Camisa de lino hombre",
    slug: "camisa-lino-hombre",
    price: 68000,
    compare_at_price: null,
    description: "Lino 100% nacional, costura visible en color contrastante.",
    featured: true,
    category_id: "mock-cat-2",
    product_images: [
      {
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop",
        alt: "Camisa de lino",
        position: 0,
      },
    ],
  },
  {
    id: "mock-5",
    name: "Campera de jean unisex",
    slug: "campera-jean-unisex",
    price: 95000,
    compare_at_price: null,
    description: "Denim 12oz rigid. Corte recto con hombros bien definidos.",
    featured: true,
    category_id: "mock-cat-3",
    product_images: [
      {
        url: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80&auto=format&fit=crop",
        alt: "Campera de jean",
        position: 0,
      },
    ],
  },
  {
    id: "mock-6",
    name: "Buzo oversized mujer",
    slug: "buzo-oversized-mujer",
    price: 55000,
    compare_at_price: null,
    description: "French terry pesado, fit holgado sin perder estructura.",
    featured: false,
    category_id: "mock-cat-1",
    product_images: [
      {
        url: "https://picsum.photos/seed/buzo-oversized-mujer/800/1000",
        alt: "Buzo oversized mujer",
        position: 0,
      },
    ],
  },
];

async function getFeaturedProducts() {
  try {
    const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
    if (!tenantId) return [];
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("products")
      .select(
        "id, name, slug, price, compare_at_price, description, featured, category_id, product_images (url, alt, position)"
      )
      .eq("tenant_id", tenantId)
      .eq("active", true)
      .eq("featured", true)
      .order("created_at", { ascending: false });
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [featured, waLink] = await Promise.all([
    getFeaturedProducts(),
    Promise.resolve(buildWhatsAppLink()),
  ]);

  const displayFeatured = featured.length > 0 ? featured : MOCK_FEATURED;

  return (
    <>
      {/* Hero (client component con animaciones) */}
      <HeroSection waLink={waLink} />

      {/* ====== Sección: Destacados ====== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <SectionReveal>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="font-body text-xs uppercase tracking-[0.3em] text-neutral-400 mb-3">
                  Selección
                </p>
                <h2 className="font-display text-4xl lg:text-6xl font-black uppercase tracking-[-0.03em] text-neutral-900 leading-none">
                  Destacados
                </h2>
              </div>
              <Link
                href="/catalogo"
                className="hidden sm:inline-flex items-center gap-2 font-body text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors group"
              >
                Ver todo
                <span className="w-6 h-px bg-neutral-600 group-hover:w-10 transition-all duration-300" />
              </Link>
            </div>
          </SectionReveal>

          <FeaturedGrid products={displayFeatured} />

          <div className="mt-10 sm:hidden text-center">
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 font-body text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              Ver todo el catálogo →
            </Link>
          </div>
        </div>
      </section>

      {/* ====== Sección: Split editorial — Nosotros ====== */}
      <section className="bg-neutral-100">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-2 min-h-[560px]">
            {/* Imagen */}
            <div className="relative h-64 lg:h-auto overflow-hidden">
              {/* Cliente: reemplazar con foto propia */}
              <Image
                src="https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=1200&q=85&auto=format&fit=crop"
                alt="Taller Vectroom — detalle tela"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Texto */}
            <SectionReveal>
              <div className="flex items-center px-8 lg:px-16 py-16 lg:py-24">
                <div className="max-w-lg">
                  <p className="font-body text-xs uppercase tracking-[0.3em] text-neutral-400 mb-6">
                    Quiénes somos
                  </p>
                  <h2 className="font-display text-4xl lg:text-5xl font-black uppercase tracking-[-0.03em] text-neutral-900 leading-none mb-8">
                    Diseñamos y producimos en Argentina.
                  </h2>
                  <p className="font-body text-neutral-600 leading-relaxed mb-8">
                    Cada prenda pasa por las manos de gente que conocemos. Talleres con buenas condiciones,
                    telas seleccionadas, prendas que duran. No apostamos a la moda efímera — apostamos a
                    ropa que te acompañe de verdad.
                  </p>
                  <Link
                    href="/nosotros"
                    className="inline-flex items-center gap-3 font-body text-sm font-semibold text-neutral-900 group"
                  >
                    Conocernos mejor
                    <span className="w-8 h-px bg-neutral-900 group-hover:w-16 transition-all duration-300" />
                  </Link>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ====== Sección: Features / Por qué elegirnos ====== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <SectionReveal>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-neutral-400 mb-12 text-center">
              Por qué Vectroom
            </p>
          </SectionReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200">
            {[
              {
                title: "Producción local",
                desc: "Todo se produce en Argentina con talleres que conocemos y respetamos.",
              },
              {
                title: "Materiales nobles",
                desc: "Telas seleccionadas por su calidad real, no por el precio de etiqueta.",
              },
              {
                title: "Atención directa",
                desc: "Te respondemos por WhatsApp. Nada de formularios que caen en el vacío.",
              },
              {
                title: "Envíos a todo el país",
                desc: "Con OCA, Andreani y Correo Argentino. Seguimiento desde el día uno.",
              },
            ].map((f, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div className="bg-white p-8 lg:p-10">
                  <div className="w-8 h-px bg-neutral-900 mb-6" />
                  <h3 className="font-display text-xl font-bold uppercase tracking-tight text-neutral-900 mb-3">
                    {f.title}
                  </h3>
                  <p className="font-body text-sm text-neutral-600 leading-relaxed">{f.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ====== Sección: CTA final ====== */}
      <section className="py-24 lg:py-32 bg-neutral-900">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 text-center">
          <SectionReveal>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-neutral-400 mb-6">
              ¿Dudás de algo?
            </p>
            <h2 className="font-display text-5xl lg:text-7xl font-black uppercase tracking-[-0.03em] text-white leading-none mb-8">
              Escribinos.
            </h2>
            <p className="font-body text-neutral-400 max-w-md mx-auto mb-10 leading-relaxed">
              Ayuda con talles, disponibilidad, envíos. Respondemos al toque.
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-black px-10 py-4 rounded-full font-body font-semibold hover:bg-neutral-100 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Consultar por WhatsApp
            </a>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
