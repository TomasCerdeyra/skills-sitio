import { HeroSection } from "@/components/ui/HeroSection";
import { ProductCard } from "@/components/ui/ProductCard";
import { createAdminClient } from "@/lib/supabase/admin";
import Link from "next/link";

// ============================================================
// MOCK DATA — celulares reales con imágenes curadas de Unsplash
// ============================================================
const MOCK_FEATURED = [
  {
    id: "mock-1",
    name: "iPhone 15 Pro Max",
    slug: "iphone-15-pro-max",
    price: 2150000,
    compare_at_price: 2350000,
    description: "Titanio. Chip A17 Pro. Cámara de 48 MP. 256 GB.",
    featured: true,
    category_id: "mock-cat-1",
    product_images: [
      {
        url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80&auto=format&fit=crop",
        alt: "iPhone 15 Pro Max",
        position: 0,
      },
    ],
    product_variants: [
      { id: "v1", name: "256 GB", price: 2150000, price_modifier: 0, stock: 5 },
      { id: "v2", name: "512 GB", price: 2480000, price_modifier: 0, stock: 3 },
    ],
  },
  {
    id: "mock-2",
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-galaxy-s24-ultra",
    price: 1890000,
    compare_at_price: null,
    description: "S Pen incluido. Pantalla Dynamic AMOLED 2X. 256 GB.",
    featured: true,
    category_id: "mock-cat-2",
    product_images: [
      {
        url: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80&auto=format&fit=crop",
        alt: "Samsung Galaxy S24 Ultra",
        position: 0,
      },
    ],
    product_variants: [
      { id: "v3", name: "256 GB", price: 1890000, price_modifier: 0, stock: 8 },
      { id: "v4", name: "512 GB", price: 2100000, price_modifier: 0, stock: 4 },
    ],
  },
  {
    id: "mock-3",
    name: "Motorola Edge 50 Pro",
    slug: "motorola-edge-50-pro",
    price: 780000,
    compare_at_price: null,
    description: "Pantalla pOLED 144 Hz. Cámara OIS 50 MP. Carga 125W.",
    featured: true,
    category_id: "mock-cat-3",
    product_images: [
      {
        url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80&auto=format&fit=crop",
        alt: "Motorola Edge 50 Pro",
        position: 0,
      },
    ],
    product_variants: [
      { id: "v5", name: "256 GB", price: 780000, price_modifier: 0, stock: 12 },
    ],
  },
  {
    id: "mock-4",
    name: "iPhone 14",
    slug: "iphone-14",
    price: 1290000,
    compare_at_price: 1450000,
    description: "Chip A15 Bionic. Cámara 12 MP. Pantalla Super Retina XDR.",
    featured: false,
    category_id: "mock-cat-1",
    product_images: [
      {
        url: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&q=80&auto=format&fit=crop",
        alt: "iPhone 14",
        position: 0,
      },
    ],
    product_variants: [
      { id: "v6", name: "128 GB", price: 1290000, price_modifier: 0, stock: 6 },
      { id: "v7", name: "256 GB", price: 1480000, price_modifier: 0, stock: 4 },
    ],
  },
  {
    id: "mock-5",
    name: "Samsung Galaxy A55",
    slug: "samsung-galaxy-a55",
    price: 490000,
    compare_at_price: null,
    description: "Pantalla Super AMOLED 120 Hz. Triple cámara 50 MP. IP67.",
    featured: false,
    category_id: "mock-cat-2",
    product_images: [
      {
        url: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80&auto=format&fit=crop",
        alt: "Samsung Galaxy A55",
        position: 0,
      },
    ],
    product_variants: [
      { id: "v8", name: "128 GB", price: 490000, price_modifier: 0, stock: 20 },
    ],
  },
  {
    id: "mock-6",
    name: "Motorola Moto G84",
    slug: "motorola-moto-g84",
    price: 320000,
    compare_at_price: null,
    description: "Pantalla pOLED 120 Hz. Cámara 50 MP. Batería 5000 mAh.",
    featured: false,
    category_id: "mock-cat-3",
    product_images: [
      {
        url: "https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=800&q=80&auto=format&fit=crop",
        alt: "Motorola Moto G84",
        position: 0,
      },
    ],
    product_variants: [
      { id: "v9", name: "256 GB", price: 320000, price_modifier: 0, stock: 15 },
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
      .select(`
        id, name, slug, price, compare_at_price, description, featured, category_id,
        product_images (id, url, alt, position),
        product_variants (id, name, price, price_modifier, stock)
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

export default async function HomePage() {
  const dbFeatured = await getFeaturedProducts();
  const featured = dbFeatured.length > 0 ? dbFeatured : MOCK_FEATURED;

  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Marquee strip */}
      <div className="bg-brand-primary overflow-hidden py-3">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="flex items-center gap-8 px-8 font-display font-bold text-sm text-neutral-900 uppercase tracking-wider">
              <span>iPhone</span>
              <span className="text-neutral-900/40">·</span>
              <span>Samsung</span>
              <span className="text-neutral-900/40">·</span>
              <span>Motorola</span>
              <span className="text-neutral-900/40">·</span>
              <span>Xiaomi</span>
              <span className="text-neutral-900/40">·</span>
              <span>100% Originales</span>
              <span className="text-neutral-900/40">·</span>
              <span>Con Garantía</span>
              <span className="text-neutral-900/40">·</span>
              <span>Con Factura</span>
              <span className="text-neutral-900/40">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* === Sección: Productos Destacados === */}
      <section className="py-20 lg:py-28 px-5 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-body text-xs uppercase tracking-[0.2em] text-brand-primary mb-2">
              Los más buscados
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-neutral-900">
              Productos destacados
            </h2>
          </div>
          <Link
            href="/catalogo"
            className="hidden sm:inline-flex items-center gap-2 font-body text-sm text-neutral-500 hover:text-brand-primary transition-colors"
          >
            Ver todo →
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
          {featured.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 bg-neutral-900 text-white px-8 py-3.5 rounded-full font-display font-bold text-sm hover:bg-brand-primary hover:text-neutral-900 transition-all"
          >
            Ver catálogo completo →
          </Link>
        </div>
      </section>

      {/* === Sección: Confianza === */}
      <section className="bg-neutral-900 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-body text-xs uppercase tracking-[0.2em] text-brand-primary mb-3">
              Por qué elegirnos
            </p>
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-white">
              Cada celular, verificado<br />
              <span className="text-brand-primary">antes de llegar a tus manos.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🛡️",
                title: "Garantía oficial",
                desc: "Todos nuestros equipos tienen garantía de fábrica vigente. No vendemos sin garantía.",
              },
              {
                icon: "📄",
                title: "Factura A o B",
                desc: "Cada compra tiene su factura. Podés deducirla de impuestos si sos monotributista.",
              },
              {
                icon: "✅",
                title: "100% originales",
                desc: "Sin réplicas, sin importados ilegales. Verificamos la autenticidad de cada equipo.",
              },
              {
                icon: "🚚",
                title: "Enviamos a todo el país",
                desc: "Por correo o empresa de transporte. Rastreás tu paquete hasta que llega.",
              },
            ].map(({ icon, title, desc }, i) => (
              <div
                key={title}
                className="bg-white/5 border border-white/8 rounded-2xl p-6 hover:border-brand-primary/30 transition-colors"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <span className="text-3xl block mb-4">{icon}</span>
                <h3 className="font-display text-lg font-bold text-white mb-2">{title}</h3>
                <p className="font-body text-sm text-neutral-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === Sección: Marcas === */}
      <section className="py-16 lg:py-20 px-5 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-neutral-400 text-center mb-8">
            Marcas que trabajamos
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-12">
            {["Apple", "Samsung", "Motorola", "Xiaomi", "Realme", "OnePlus"].map((brand) => (
              <Link
                key={brand}
                href={`/catalogo?marca=${brand.toLowerCase()}`}
                className="font-display text-lg lg:text-2xl font-bold text-neutral-300 hover:text-brand-primary transition-colors opacity-50 hover:opacity-100"
              >
                {brand}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* === Sección: Nosotros teaser === */}
      <section className="bg-neutral-100 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-body text-xs uppercase tracking-[0.2em] text-brand-primary mb-3">
                Nuestra historia
              </p>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-neutral-900 mb-6">
                Empezamos comprando y vendiendo. Hoy somos la referencia del barrio.
              </h2>
              <p className="font-body text-neutral-600 leading-relaxed mb-8">
                Hace años que nos especializamos en celulares originales. Aprendimos a distinguir un original de una copia, a verificar el IMEI, a chequear cada detalle antes de venderte. Cada equipo que entra al local pasa por nuestra revisión antes de ir al catálogo.
              </p>
              <Link
                href="/nosotros"
                className="inline-flex items-center gap-2 font-body text-sm text-neutral-900 font-semibold hover:text-brand-primary transition-colors group"
              >
                Conocer más sobre Cel Tech
                <span className="w-8 h-px bg-current group-hover:w-12 transition-all duration-300" />
              </Link>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=600&q=80&auto=format&fit=crop"
                    alt="Tienda de celulares"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-2xl mt-8">
                  <img
                    src="https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&q=80&auto=format&fit=crop"
                    alt="Celulares originales"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Badge flotante */}
              <div className="absolute -bottom-4 -left-4 bg-brand-primary text-neutral-900 p-4 rounded-2xl shadow-xl">
                <p className="font-display text-3xl font-extrabold">+500</p>
                <p className="font-body text-xs font-semibold uppercase tracking-wider">equipos vendidos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === Sección: CTA final === */}
      <section className="py-20 lg:py-24 px-5 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-neutral-900 mb-6">
            ¿No encontraste lo que buscás?
          </h2>
          <p className="font-body text-neutral-500 text-lg mb-10">
            Escribinos por WhatsApp y te buscamos el equipo que necesitás. También hacemos permuta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/catalogo"
              className="inline-flex items-center justify-center gap-2 bg-neutral-900 text-white px-10 py-4 rounded-full font-display font-bold text-sm hover:bg-brand-primary hover:text-neutral-900 transition-all"
            >
              Ver catálogo completo
            </Link>
            <a
              href={`https://wa.me/5491144005678?text=${encodeURIComponent("Hola, quiero consultar sobre un celular.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-10 py-4 rounded-full font-display font-bold text-sm hover:scale-[1.02] active:scale-95 transition-transform shadow-lg shadow-[#25D366]/30"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
