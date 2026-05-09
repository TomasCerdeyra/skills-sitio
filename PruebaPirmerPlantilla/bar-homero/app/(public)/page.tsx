import Link from "next/link";
import Image from "next/image";
import { createAdminClient } from "@/lib/supabase/admin";
import { getTenantId } from "@/lib/tenant";
import HeroSection from "@/components/ui/HeroSection";
import FadeUpOnScroll from "@/components/ui/FadeUpOnScroll";
import ProductCard from "@/components/ui/ProductCard";

const MOCK_FEATURED = [
  {
    id: "m1",
    name: "IPA Artesanal",
    slug: "ipa-artesanal",
    price: 1600,
    description: "Lupulada e intensa. De producción local.",
    featured: true,
    product_images: [
      { url: "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=800&q=80", alt: "IPA Artesanal" },
    ],
    product_variants: [],
  },
  {
    id: "m2",
    name: "Aperol Spritz",
    slug: "aperol-spritz",
    price: 2200,
    description: "El trago del momento. Fresco y elegante.",
    featured: true,
    product_images: [
      { url: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=800&q=80", alt: "Aperol Spritz" },
    ],
    product_variants: [],
  },
  {
    id: "m3",
    name: "Tabla de Fiambres",
    slug: "tabla-fiambres",
    price: 4500,
    description: "Para compartir. Quesos, fiambres y acompañamientos.",
    featured: true,
    product_images: [
      { url: "https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?auto=format&fit=crop&w=800&q=80", alt: "Tabla de Fiambres" },
    ],
    product_variants: [],
  },
];

async function getFeaturedProducts() {
  try {
    const tenantId = getTenantId();
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("products")
      .select("id, name, slug, price, compare_at_price, description, product_images(url, alt, position), product_variants(id, stock)")
      .eq("tenant_id", tenantId)
      .eq("active", true)
      .eq("featured", true)
      .order("created_at", { ascending: false })
      .limit(3);
    if (data && data.length > 0) return data;
  } catch {}
  return MOCK_FEATURED;
}

const MARQUEE_ITEMS = ["Cervezas Artesanales", "Vinos por Copa", "Aperitivos", "Picadas", "Tragos Clásicos", "Tragos Modernos", "Cócteles Sin Alcohol"];

export default async function HomePage() {
  const featured = await getFeaturedProducts();

  return (
    <>
      <HeroSection />

      {/* Marquee */}
      <div className="bg-brand-secondary overflow-hidden py-3">
        <div className="flex gap-8 animate-[marqueeSlide_20s_linear_infinite] whitespace-nowrap w-max">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="text-sm font-semibold text-neutral-900 uppercase tracking-widest">
              {item} <span className="opacity-40 mx-2">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Featured */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <FadeUpOnScroll>
          <div className="text-center mb-12">
            <p className="eyebrow-decorated text-sm uppercase tracking-widest text-brand-secondary font-medium mb-3">
              Destacados de la carta
            </p>
            <h2 className="font-display text-4xl text-neutral-900">Para empezar bien</h2>
          </div>
        </FadeUpOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p, i) => (
            <FadeUpOnScroll key={p.id} delay={i * 0.1}>
              <ProductCard product={p} />
            </FadeUpOnScroll>
          ))}
        </div>

        <FadeUpOnScroll className="text-center mt-10">
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-brand-primary text-brand-primary rounded-full text-sm font-semibold hover:bg-brand-primary hover:text-white transition-all"
          >
            Ver carta completa →
          </Link>
        </FadeUpOnScroll>
      </section>

      {/* Horarios — sección bar-específica */}
      <section className="bg-brand-primary py-16">
        <div className="max-w-6xl mx-auto px-4">
          <FadeUpOnScroll>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { dias: "Lun — Jue", horario: "18:00 – 01:00" },
                { dias: "Vie — Sáb", horario: "18:00 – 03:00" },
                { dias: "Domingo", horario: "17:00 – 00:00" },
                { dias: "Pedidos online", horario: "Todos los días" },
              ].map((h, i) => (
                <FadeUpOnScroll key={i} delay={i * 0.08}>
                  <div className="text-center">
                    <p className="text-brand-secondary text-xs uppercase tracking-widest font-medium mb-1">{h.dias}</p>
                    <p className="font-display text-white text-2xl">{h.horario}</p>
                  </div>
                </FadeUpOnScroll>
              ))}
            </div>
          </FadeUpOnScroll>
        </div>
      </section>

      {/* Nosotros strip */}
      <section className="bg-neutral-900 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <FadeUpOnScroll>
            <p className="eyebrow-decorated text-sm uppercase tracking-widest text-brand-secondary font-medium mb-4">
              Quiénes somos
            </p>
            <h2 className="font-display text-4xl text-white mb-5 leading-tight">
              Un bar de barrio<br />con historia propia.
            </h2>
            <p className="text-neutral-400 leading-relaxed mb-6 max-w-md">
              Bar Homero nació de la idea simple de tener un lugar donde quedarse. Bebidas bien hechas, buena música y esa sensación de siempre haber estado acá.
            </p>
            <Link
              href="/nosotros"
              className="inline-flex items-center gap-2 text-brand-secondary font-medium text-sm hover:gap-3 transition-all"
            >
              Conocer más →
            </Link>
          </FadeUpOnScroll>

          <FadeUpOnScroll delay={0.15}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=1200&q=90"
                alt="Interior Bar Homero"
                fill
                quality={90}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-brand-primary/20" />
            </div>
          </FadeUpOnScroll>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-3xl mx-auto px-4 py-24 text-center">
        <FadeUpOnScroll>
          <p className="eyebrow-decorated text-sm uppercase tracking-widest text-brand-secondary font-medium mb-4">
            Pedí desde acá
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-neutral-900 mb-5 leading-tight">
            Tu mesa te espera.
          </h2>
          <p className="text-neutral-500 text-lg mb-8 max-w-md mx-auto">
            Revisá la carta, armá tu pedido y pagá online. O mandanos un mensaje por WhatsApp.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/catalogo"
              className="px-8 py-4 bg-brand-primary text-white rounded-full font-semibold hover:bg-brand-primary/90 transition-colors"
            >
              Ver la carta
            </Link>
            <Link
              href="/contacto"
              className="px-8 py-4 bg-neutral-100 text-neutral-700 rounded-full font-semibold hover:bg-neutral-200 transition-colors"
            >
              Contactarnos
            </Link>
          </div>
        </FadeUpOnScroll>
      </section>
    </>
  );
}
