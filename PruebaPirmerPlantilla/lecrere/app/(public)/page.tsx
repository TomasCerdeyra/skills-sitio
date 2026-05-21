import Image from "next/image";
import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { getTenantId } from "@/lib/tenant";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { HeroSection } from "@/components/ui/HeroSection";
import { FadeUpOnScroll } from "@/components/ui/FadeUpOnScroll";
import { SectionLine } from "@/components/ui/SectionLine";
import { ProductCard } from "@/components/ui/ProductCard";


const CATEGORIES_GRID = [
  {
    slug: "mujer",
    label: "Mujer",
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea153895?w=800&q=80&auto=format&fit=crop",
  },
  {
    slug: "hombre",
    label: "Hombre",
    image:
      "https://picsum.photos/seed/hombre-fashion/800/1000",
  },
  {
    slug: "unisex",
    label: "Unisex",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop",
  },
  {
    slug: "accesorios",
    label: "Accesorios",
    image:
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&q=80&auto=format&fit=crop",
  },
];

const FEATURES = [
  {
    title: "Telas nobles",
    desc: "Materiales que elegimos pieza por pieza. Sin sintéticos baratos ni atajos.",
  },
  {
    title: "Cortes que quedan",
    desc: "Moldería ajustada al cuerpo real, no al promedio de planilla.",
  },
  {
    title: "Producción local",
    desc: "Buenos Aires de punta a punta. Sabemos quién hace cada prenda.",
  },
  {
    title: "Atención real",
    desc: "Respondemos, asesoramos y acompañamos cada decisión de compra.",
  },
];

async function getFeaturedProducts() {
  try {
    const tenantId = getTenantId();
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("products")
      .select(
        "id, name, slug, price, compare_at_price, category_id, product_images(url, alt, position)"
      )
      .eq("tenant_id", tenantId)
      .eq("active", true)
      .eq("featured", true)
      .order("created_at", { ascending: false })
      .limit(6);
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const featured = await getFeaturedProducts();
  const waLink = buildWhatsAppLink({ message: "Hola, quiero hacer una consulta sobre la colección." });

  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Marquee strip */}
      <div className="overflow-hidden bg-brand-primary py-4 my-0">
        <div className="flex gap-0 animate-[marquee_22s_linear_infinite]">
          {Array.from({ length: 3 }).map((_, rep) => (
            <div key={rep} className="flex gap-0 shrink-0">
              {[
                "Remeras",
                "·",
                "Pantalones",
                "·",
                "Sacos",
                "·",
                "Accesorios",
                "·",
                "Colección 2025",
                "·",
                "Diseño argentino",
                "·",
              ].map((item, i) => (
                <span
                  key={i}
                  className={`font-body text-xs tracking-[0.25em] uppercase px-6 whitespace-nowrap ${
                    item === "·" ? "text-brand-secondary" : "text-neutral-50/80"
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Categorías en grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <FadeUpOnScroll>
          <div className="flex items-center gap-4 mb-3">
            <SectionLine className="w-12" />
            <p className="font-body text-[10px] uppercase tracking-[0.3em] text-brand-secondary">
              Explorá por categoría
            </p>
          </div>
          <h2 className="font-display text-4xl lg:text-6xl font-light text-neutral-900 mb-12 leading-tight">
            Encontrá lo tuyo.
          </h2>
        </FadeUpOnScroll>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {CATEGORIES_GRID.map((cat, i) => (
            <FadeUpOnScroll key={cat.slug} delay={i * 0.08}>
              <Link
                href={`/catalogo?categoria=${cat.slug}`}
                className="group relative aspect-[3/4] overflow-hidden block"
              >
                {/* Cliente: reemplazar con foto propia */}
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  quality={80}
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 via-neutral-900/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="font-display text-2xl text-neutral-50 font-light italic">
                    {cat.label}
                  </p>
                  <p className="font-body text-[10px] tracking-[0.2em] uppercase text-neutral-50/60 mt-1">
                    Ver todo →
                  </p>
                </div>
              </Link>
            </FadeUpOnScroll>
          ))}
        </div>
      </section>

      {/* Novedades — Featured products (solo si hay datos) */}
      {featured.length > 0 && <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
        <FadeUpOnScroll>
          <div className="flex items-center gap-4 mb-3">
            <SectionLine className="w-12" />
            <p className="font-body text-[10px] uppercase tracking-[0.3em] text-brand-secondary">
              Novedades
            </p>
          </div>
          <div className="flex justify-between items-end mb-12">
            <h2 className="font-display text-4xl lg:text-6xl font-light text-neutral-900 leading-tight">
              Recién llegado.
            </h2>
            <Link
              href="/catalogo"
              className="hidden lg:inline-flex items-center gap-2 font-body text-sm text-neutral-600 hover:text-brand-secondary transition-colors"
            >
              Ver todo <span>→</span>
            </Link>
          </div>
        </FadeUpOnScroll>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {featured.slice(0, 4).map((product, i) => (
            <FadeUpOnScroll key={product.id} delay={i * 0.07}>
              <div className="relative">
                {i < 2 && (
                  <span className="absolute top-3 left-3 z-10 bg-brand-secondary text-neutral-50 text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 font-body font-medium">
                    Nuevo
                  </span>
                )}
                <ProductCard product={product} />
              </div>
            </FadeUpOnScroll>
          ))}
        </div>

        <div className="mt-10 text-center lg:hidden">
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 font-body text-sm text-neutral-600 hover:text-brand-secondary transition-colors border border-neutral-300 px-6 py-3"
          >
            Ver colección completa →
          </Link>
        </div>
      </section>}

      {/* Sección "Hecho en Argentina" — diferenciadora */}
      <section className="bg-neutral-900 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeUpOnScroll className="order-2 lg:order-1">
              <p className="font-body text-[10px] uppercase tracking-[0.3em] text-brand-secondary mb-6">
                Producción local
              </p>
              <h2 className="font-display text-5xl lg:text-7xl font-light text-neutral-50 leading-[1.05] mb-8">
                Hecho en<br />
                <span className="italic">Argentina.</span>
              </h2>
              <p className="font-body text-neutral-50/70 leading-relaxed mb-6 max-w-sm">
                Diseñamos y producimos en Buenos Aires. Cada prenda sale de
                talleres de confianza, con materias primas seleccionadas y sin
                atajos. Eso se nota cuando te la ponés.
              </p>
              <p className="font-body text-neutral-50/50 leading-relaxed max-w-sm">
                No tercerizamos a ciegas ni compramos por volumen para bajar
                costos. Preferimos hacer menos cosas y hacerlas bien.
              </p>
              <Link
                href="/nosotros"
                className="mt-10 inline-flex items-center gap-2 font-body text-sm text-brand-secondary hover:gap-4 transition-all"
              >
                Conocer el proyecto <span>→</span>
              </Link>
            </FadeUpOnScroll>

            <FadeUpOnScroll delay={0.15} className="order-1 lg:order-2">
              <div className="relative aspect-[4/5] overflow-hidden">
                {/* Cliente: reemplazar con foto propia */}
                <Image
                  src="https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=1200&q=85&auto=format&fit=crop"
                  alt="Detalle de tela — producción Lecrere"
                  fill
                  quality={85}
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeUpOnScroll>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-secondary/30 to-transparent mx-10" />

      {/* Por qué elegirnos — Features */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <FadeUpOnScroll>
          <div className="flex items-center gap-4 mb-3">
            <SectionLine className="w-12" />
            <p className="font-body text-[10px] uppercase tracking-[0.3em] text-brand-secondary">
              Por qué Lecrere
            </p>
          </div>
          <h2 className="font-display text-4xl lg:text-6xl font-light text-neutral-900 mb-16 leading-tight">
            Sin compromisos.
          </h2>
        </FadeUpOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {FEATURES.map((f, i) => (
            <FadeUpOnScroll key={f.title} delay={i * 0.08}>
              <div className="border-t border-neutral-300 pt-6">
                <p className="font-display text-2xl text-neutral-900 mb-3 font-light">
                  {f.title}
                </p>
                <p className="font-body text-sm text-neutral-600 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </FadeUpOnScroll>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-neutral-100 py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeUpOnScroll>
            <h2 className="font-display text-5xl lg:text-7xl font-light text-neutral-900 mb-6 leading-[1.05]">
              ¿Hablamos?
            </h2>
            <p className="font-body text-neutral-600 mb-10 leading-relaxed">
              Escribinos por WhatsApp y te respondemos al toque. Asesoramiento
              de talle, stock disponible, envíos y todo lo que necesitás saber.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-10 py-4 font-body font-medium hover:scale-[1.02] active:scale-95 transition-transform duration-200 shadow-xl shadow-[#25D366]/20"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Consultar por WhatsApp
              </a>
              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center gap-2 border border-neutral-300 text-neutral-700 px-10 py-4 font-body font-medium hover:border-brand-primary hover:text-brand-primary active:scale-95 transition-all duration-200"
              >
                Ver colección
              </Link>
            </div>
          </FadeUpOnScroll>
        </div>
      </section>

    </>
  );
}
