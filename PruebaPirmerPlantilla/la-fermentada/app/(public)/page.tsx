import { HeroSection } from "@/components/ui/HeroSection";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { createAdminClient } from "@/lib/supabase/admin";
import Link from "next/link";
import { HomeFeatured } from "@/components/ui/HomeFeatured";
import { HomeProcess } from "@/components/ui/HomeProcess";
import { HomePickup } from "@/components/ui/HomePickup";

async function getFeaturedProducts() {
  try {
    const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
    if (!tenantId) return [];
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("products")
      .select(`
        id, name, slug, price, compare_at_price, description, featured, category_id,
        product_images (id, url, alt, position)
      `)
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

const MOCK_FEATURED = [
  {
    id: "mock-1",
    name: "Pan de masa madre campesino",
    slug: "pan-masa-madre-campesino",
    price: 2800,
    compare_at_price: null,
    description: "Miga abierta, corteza crujiente. Fermentación de 18 horas.",
    featured: true,
    category_id: "mock-cat-1",
    product_images: [
      {
        id: "img-1",
        url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80&auto=format&fit=crop",
        alt: "Pan de masa madre",
        position: 0,
      },
    ],
  },
  {
    id: "mock-2",
    name: "Focaccia de romero y sal gruesa",
    slug: "focaccia-romero-sal",
    price: 1800,
    compare_at_price: null,
    description: "Masa madre hidratada, aceite de oliva generoso, romero fresco.",
    featured: true,
    category_id: "mock-cat-1",
    product_images: [
      {
        id: "img-2",
        url: "https://picsum.photos/seed/focaccia-romero-fermentada/800/600",
        alt: "Focaccia de romero",
        position: 0,
      },
    ],
  },
  {
    id: "mock-3",
    name: "Medialunas de manteca docena",
    slug: "medialunas-manteca-docena",
    price: 4800,
    compare_at_price: null,
    description: "Hechas con manteca de primera, masa briochada y toque de miel.",
    featured: true,
    category_id: "mock-cat-2",
    product_images: [
      {
        id: "img-3",
        url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80&auto=format&fit=crop",
        alt: "Medialunas artesanales",
        position: 0,
      },
    ],
  },
  {
    id: "mock-4",
    name: "Croissant de manteca",
    slug: "croissant-manteca",
    price: 1200,
    compare_at_price: null,
    description: "27 capas de hojaldre con manteca francesa. Proceso de dos días.",
    featured: false,
    category_id: "mock-cat-2",
    product_images: [
      {
        id: "img-4",
        url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80&auto=format&fit=crop",
        alt: "Croissant artesanal",
        position: 0,
      },
    ],
  },
  {
    id: "mock-5",
    name: "Pan integral con semillas",
    slug: "pan-integral-semillas",
    price: 2400,
    compare_at_price: null,
    description: "Harina integral de molienda local, semillas de lino, girasol y zapallo.",
    featured: false,
    category_id: "mock-cat-1",
    product_images: [
      {
        id: "img-5",
        url: "https://picsum.photos/seed/pan-integral-semillas-fermentada/800/600",
        alt: "Pan integral con semillas",
        position: 0,
      },
    ],
  },
  {
    id: "mock-6",
    name: "Tarta de limón y merengue",
    slug: "tarta-limon-merengue",
    price: 3200,
    compare_at_price: null,
    description: "Masa sablé casera, crema de limón de Corrientes y merengue flameado.",
    featured: false,
    category_id: "mock-cat-3",
    product_images: [
      {
        id: "img-6",
        url: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80&auto=format&fit=crop",
        alt: "Tarta de limón y merengue",
        position: 0,
      },
    ],
  },
];

export default async function HomePage() {
  const featuredData = await getFeaturedProducts();
  const displayFeatured = featuredData.length > 0 ? featuredData : MOCK_FEATURED;

  const waLink = buildWhatsAppLink({
    message: "Hola, quiero hacer un pedido en La Fermentada.",
  });

  return (
    <>
      {/* Hero */}
      <HeroSection waLink={waLink} />

      {/* Marquee ticker */}
      <div className="bg-brand-primary overflow-hidden py-3">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-brand-accent/80 mx-8">
              MASA MADRE · FERMENTACIÓN LENTA · HORNEADO CADA MAÑANA · HARINAS DE MOLIENDA LOCAL · RETIRO EN PALERMO · ENVÍO A CABA Y GBA ·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Featured products — lista de panes del día (decisión inesperada: no grid, sino lista de carta) */}
      <HomeFeatured products={displayFeatured} />

      {/* Proceso — timeline de madrugada */}
      <HomeProcess />

      {/* Pickup y pedidos */}
      <HomePickup waLink={waLink} />

      {/* Link a catálogo completo */}
      <section className="bg-neutral-50 py-16 lg:py-20 text-center border-t border-neutral-200">
        <p className="font-body text-sm uppercase tracking-[0.2em] text-neutral-400 mb-4">
          Hay más en la carta
        </p>
        <h2 className="font-display font-bold text-3xl lg:text-5xl text-brand-dark mb-8 italic">
          Panes, facturas, tortas y algo especial.
        </h2>
        <Link
          href="/catalogo"
          className="inline-flex items-center gap-2 bg-brand-primary text-neutral-50 px-8 py-4 rounded-full font-body font-semibold hover:bg-brand-dark transition-colors shadow-lg shadow-brand-primary/20"
        >
          Ver la carta completa
          <span>→</span>
        </Link>
      </section>
    </>
  );
}
