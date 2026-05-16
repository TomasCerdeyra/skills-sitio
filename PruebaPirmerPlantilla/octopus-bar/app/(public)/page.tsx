import { HeroSection } from "@/components/ui/HeroSection";
import { FadeUpOnScroll } from "@/components/ui/FadeUpOnScroll";
import { ProductCardHorizontal } from "@/components/ui/ProductCardHorizontal";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { createAdminClient } from "@/lib/supabase/admin";
import { getTenantId } from "@/lib/tenant";
import Link from "next/link";

// ADN: hero=immersive, sections=full-bleed, cards=horizontal, animation=fade-up

// MOCK_FEATURED — 6 productos del rubro para mostrar aunque la DB esté vacía
const MOCK_FEATURED = [
  {
    id: "mock-1",
    name: "Café americano",
    slug: "cafe-americano",
    price: 1200,
    compare_at_price: null,
    description: "Café de tueste medio, recién molido, servido en taza grande. Aroma intenso, cuerpo balanceado.",
    featured: true,
    category_id: "mock-cat-1",
    product_images: [{ id: "img-1", url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80&auto=format&fit=crop", alt: "Café americano", position: 0 }],
    product_variants: [],
  },
  {
    id: "mock-2",
    name: "Capuchino",
    slug: "capuchino",
    price: 1500,
    compare_at_price: null,
    description: "Espresso, leche vaporizada y cacao en polvo. Cremoso y suave.",
    featured: true,
    category_id: "mock-cat-1",
    product_images: [{ id: "img-2", url: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&q=80&auto=format&fit=crop", alt: "Capuchino", position: 0 }],
    product_variants: [],
  },
  {
    id: "mock-3",
    name: "Cheesecake de frutos rojos",
    slug: "cheesecake-frutos-rojos",
    price: 2400,
    compare_at_price: 2900,
    description: "Base de galletas, queso crema batido y salsa de frutos rojos casera.",
    featured: true,
    category_id: "mock-cat-2",
    product_images: [{ id: "img-3", url: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80&auto=format&fit=crop", alt: "Cheesecake", position: 0 }],
    product_variants: [],
  },
];

async function getFeaturedProducts() {
  try {
    const tenantId = getTenantId();
    const supabaseAdmin = createAdminClient();
    const { data } = await supabaseAdmin
      .from("products")
      .select(`
        id, name, slug, price, compare_at_price, description, featured,
        category_id,
        product_images (id, url, alt, position),
        product_variants (id, name, price, price_modifier, stock)
      `)
      .eq("tenant_id", tenantId)
      .eq("active", true)
      .eq("featured", true)
      .limit(3);
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const featuredDB = await getFeaturedProducts();
  const featured = featuredDB.length > 0 ? featuredDB : MOCK_FEATURED;

  const waLink = buildWhatsAppLink({ message: "Hola, quiero hacer un pedido." });

  return (
    <>
      {/* ──────────────────────────────────────────── */}
      {/* 1. HERO — immersive fullscreen              */}
      {/* ──────────────────────────────────────────── */}
      <HeroSection waLink={waLink} />

      {/* ──────────────────────────────────────────── */}
      {/* 2. STRIP DE ESPECIALIDADES — full-bleed      */}
      {/* ──────────────────────────────────────────── */}
      <section className="bg-neutral-900 py-5 overflow-hidden border-y border-brand-primary/20">
        <div className="flex gap-12 items-center animate-[marquee_18s_linear_infinite] whitespace-nowrap">
          {[
            "Espresso",
            "Cortado",
            "Latte",
            "Cold Brew",
            "Matcha",
            "Drip Coffee",
            "Cappuccino",
            "Flat White",
            "Espresso Tónico",
            "V60",
          ]
            .concat([
              "Espresso",
              "Cortado",
              "Latte",
              "Cold Brew",
              "Matcha",
              "Drip Coffee",
            ])
            .map((item, i) => (
              <span
                key={i}
                className="font-display text-base font-semibold text-brand-secondary uppercase tracking-widest"
              >
                {item}
                <span className="text-brand-primary mx-6">✦</span>
              </span>
            ))}
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* ──────────────────────────────────────────── */}
      {/* 3. MENÚ DESTACADO — full-bleed crema        */}
      {/* ──────────────────────────────────────────── */}
      <section className="bg-neutral-50 py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <FadeUpOnScroll>
            <p className="font-body text-xs uppercase tracking-[0.25em] text-brand-primary mb-3">
              Destacados del día
            </p>
            <h2 className="font-display text-4xl lg:text-5xl text-neutral-900 mb-4 leading-tight">
              Lo que más{" "}
              <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                pedimos
              </span>{" "}
              hoy
            </h2>
            <p className="font-body text-neutral-600 mb-12 max-w-xl">
              Una selección de lo que más le gusta a la gente. Siempre fresco, siempre hecho con tiempo.
            </p>
          </FadeUpOnScroll>

          <div className="flex flex-col gap-4">
            {featured.map((product, i) => (
              <FadeUpOnScroll key={product.id} delay={i * 0.1}>
                <ProductCardHorizontal
                  product={product}
                  category={
                    product.category_id === "mock-cat-1"
                      ? { name: "Cafetería" }
                      : product.category_id === "mock-cat-2"
                      ? { name: "Pastelería" }
                      : undefined
                  }
                />
              </FadeUpOnScroll>
            ))}
          </div>

          <FadeUpOnScroll delay={0.3} className="mt-10 text-center">
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 font-body font-medium text-brand-primary hover:gap-4 transition-all duration-300"
            >
              Ver la carta completa <span>→</span>
            </Link>
          </FadeUpOnScroll>
        </div>
      </section>

      {/* ──────────────────────────────────────────── */}
      {/* 4. EL PROCESO — full-bleed neutral-100      */}
      {/* ──────────────────────────────────────────── */}
      <section className="bg-neutral-100 py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <FadeUpOnScroll>
            <p className="font-body text-xs uppercase tracking-[0.25em] text-brand-primary mb-3">
              ☕ Lo que hacemos
            </p>
            <h2 className="font-display text-4xl lg:text-5xl text-neutral-900 mb-16 leading-tight">
              El proceso que hay atrás
            </h2>
          </FadeUpOnScroll>

          <div className="grid sm:grid-cols-3 gap-10">
            {[
              {
                paso: "01",
                titulo: "Grano selecto",
                desc: "Trabajamos con cafés de origen único de productores pequeños. Cada lote tiene nombre, altitud y perfil de sabor.",
              },
              {
                paso: "02",
                titulo: "Tueste en el barrio",
                desc: "Tueste propio, desarrollado para resaltar el dulzor natural del grano. Sin amargo innecesario.",
              },
              {
                paso: "03",
                titulo: "En tu taza",
                desc: "Extracción calibrada al gramo. El mismo café, siempre igual. Cada taza es tan buena como la anterior.",
              },
            ].map((s, i) => (
              <FadeUpOnScroll key={i} delay={i * 0.12}>
                <div>
                  <p className="font-display text-6xl text-brand-secondary/30 mb-4 font-bold">
                    {s.paso}
                  </p>
                  <h3 className="font-display text-xl text-neutral-900 mb-3">
                    {s.titulo}
                  </h3>
                  <p className="font-body text-neutral-600 text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </FadeUpOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Divider decorativo */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-secondary/40 to-transparent" />

      {/* ──────────────────────────────────────────── */}
      {/* 5. NOSOTROS — full-bleed oscuro              */}
      {/* ──────────────────────────────────────────── */}
      <section className="bg-neutral-900 py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeUpOnScroll>
              {/* Cliente: reemplazar con foto propia */}
              <div className="aspect-[4/5] rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=1200&q=85&auto=format&fit=crop"
                  alt="Barista en Café del Norte"
                  className="w-full h-full object-cover"
                />
              </div>
            </FadeUpOnScroll>

            <FadeUpOnScroll delay={0.15}>
              <p className="font-body text-xs uppercase tracking-[0.25em] text-brand-secondary mb-4">
                Quiénes somos
              </p>
              <h2 className="font-display text-4xl lg:text-5xl text-white leading-tight mb-8">
                Un café como los que se hacían antes.
              </h2>
              <div className="space-y-4 font-body text-neutral-300 leading-relaxed">
                <p>
                  Abrimos con una idea simple: hacer un buen café y servirlo con tiempo. Hoy seguimos haciendo lo mismo.
                </p>
                <p>
                  Café tostado en el barrio, masas hechas a mano cada mañana, y una mesa para que te quedes el rato que quieras. Sin apuro.
                </p>
              </div>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/nosotros"
                  className="inline-flex items-center gap-2 font-body text-brand-secondary font-medium hover:gap-4 transition-all duration-300"
                >
                  Conocernos mejor <span>→</span>
                </Link>
              </div>
            </FadeUpOnScroll>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────── */}
      {/* 6. HORARIOS — full-bleed brand-primary       */}
      {/* ──────────────────────────────────────────── */}
      <section className="bg-brand-primary py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <FadeUpOnScroll className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl text-white mb-2">
              ¿Cuándo estamos?
            </h2>
          </FadeUpOnScroll>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { dias: "Lun — Vie", horario: "8:00 – 20:00" },
              { dias: "Sábados", horario: "9:00 – 20:00" },
              { dias: "Domingos", horario: "10:00 – 18:00" },
              { dias: "Pedidos online", horario: "Todos los días" },
            ].map((h, i) => (
              <FadeUpOnScroll key={i} delay={i * 0.08}>
                {/* Cliente: revisar/reemplazar con horarios reales */}
                <div>
                  <p className="font-body text-brand-accent text-xs uppercase tracking-widest mb-1">
                    {h.dias}
                  </p>
                  <p className="font-display text-white text-2xl font-semibold">
                    {h.horario}
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
