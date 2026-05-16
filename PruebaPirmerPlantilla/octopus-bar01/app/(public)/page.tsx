import { HeroSection } from "@/components/ui/HeroSection";
import { ClipRevealOnScroll } from "@/components/ui/ClipRevealOnScroll";
import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { createAdminClient } from "@/lib/supabase/admin";
import { getTenantId } from "@/lib/tenant";

// Productos destacados de muestra — se usan cuando la DB está vacía
const MOCK_FEATURED = [
  {
    id: "mock-1",
    name: "Octopus Classic",
    slug: "octopus-classic",
    price: 9500,
    compare_at_price: null,
    description: "Carne angus 180g, queso cheddar, lechuga, tomate y salsa de la casa sobre pan brioche tostado.",
    product_images: [
      {
        url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80&auto=format&fit=crop",
        alt: "Octopus Classic",
        position: 0,
      },
    ],
  },
  {
    id: "mock-2",
    name: "Double Kraken",
    slug: "double-kraken",
    price: 13500,
    compare_at_price: 15000,
    description: "Doble carne angus, doble cheddar, bacon ahumado crocante y cebolla caramelizada.",
    product_images: [
      {
        url: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80&auto=format&fit=crop",
        alt: "Double Kraken",
        position: 0,
      },
    ],
  },
  {
    id: "mock-3",
    name: "Spicy Tentacle",
    slug: "spicy-tentacle",
    price: 10500,
    compare_at_price: null,
    description: "Jalapeños frescos, queso pepper jack, salsa sriracha y lechuga romana crocante.",
    product_images: [
      {
        url: "https://picsum.photos/seed/spicy-burger-octopus/800/600",
        alt: "Spicy Tentacle",
        position: 0,
      },
    ],
  },
];

async function getFeaturedProducts() {
  try {
    const tenantId = getTenantId();
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("products")
      .select(`id, name, slug, price, compare_at_price, description, product_images(url, alt, position)`)
      .eq("tenant_id", tenantId)
      .eq("active", true)
      .eq("featured", true)
      .order("created_at", { ascending: false })
      .limit(3);
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const featured = await getFeaturedProducts();
  const displayFeatured = featured.length > 0 ? featured : MOCK_FEATURED;

  const waLink = buildWhatsAppLink({ message: "Hola, quiero hacer un pedido 🍔" });

  return (
    <>
      {/* ===================== HERO — immersive ===================== */}
      <HeroSection
        eyebrow="Tucumán · Hamburguesería desde el barrio"
        heading="Bar Octopus"
        subheading="Hamburguesas con identidad. Carnes seleccionadas, salsas de autor y pan brioche cada noche."
        primaryCta={{ text: "Ver la carta", href: "/catalogo" }}
        secondaryCta={{ text: "Pedir ahora", href: waLink }}
        imageSrc="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=2400&q=90&auto=format&fit=crop"
        imageAlt="Interior de Bar Octopus"
        waLink={waLink}
      />

      {/* ===================== MARQUEE — especialidades ===================== */}
      <div className="bg-brand-primary py-4 overflow-hidden">
        <div className="flex animate-[marquee_20s_linear_infinite] whitespace-nowrap">
          {[
            "Smash Burger",
            "Double Patty",
            "Bacon Crispy",
            "Queso Cheddar",
            "Salsa de Autor",
            "Pan Brioche",
            "Carne Angus",
            "Papas Fritas",
            "Bebidas Artesanales",
            "Combos",
          ]
            .concat([
              "Smash Burger",
              "Double Patty",
              "Bacon Crispy",
              "Queso Cheddar",
              "Salsa de Autor",
              "Pan Brioche",
              "Carne Angus",
              "Papas Fritas",
              "Bebidas Artesanales",
              "Combos",
            ])
            .map((item, i) => (
              <span
                key={i}
                className="font-display text-sm font-bold uppercase tracking-wider text-neutral-900 mx-6"
              >
                {item}
                <span className="ml-6 text-neutral-900/40">✦</span>
              </span>
            ))}
        </div>
      </div>

      {/* ===================== HAMBURGUESAS DESTACADAS — full-bleed ===================== */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ClipRevealOnScroll>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16 gap-4">
              <div>
                <p className="font-body text-xs uppercase tracking-[0.3em] text-brand-primary mb-3">
                  Lo que más pedís
                </p>
                <h2 className="font-display text-4xl lg:text-6xl font-extrabold text-white leading-tight">
                  Favoritos de la noche.
                </h2>
              </div>
              <Link
                href="/catalogo"
                className="font-body text-sm text-white/60 hover:text-brand-primary transition-colors flex items-center gap-2 group"
              >
                Ver todo
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </ClipRevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayFeatured.map((product, i) => (
              <ClipRevealOnScroll key={product.id} delay={i * 0.12} direction="up">
                <Link
                  href={`/producto/${product.slug}`}
                  className="group flex gap-4 bg-neutral-800 rounded-xl overflow-hidden hover:bg-neutral-700 transition-colors duration-300"
                >
                  <div className="relative w-28 flex-shrink-0 overflow-hidden">
                    {product.product_images?.[0] && (
                      <img
                        src={product.product_images[0].url}
                        alt={product.product_images[0].alt ?? product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="py-5 pr-4 flex flex-col justify-center">
                    <h3 className="font-display text-lg font-bold text-white mb-1 group-hover:text-brand-primary transition-colors">
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="font-body text-xs text-neutral-400 line-clamp-2 mb-3 leading-relaxed">
                        {product.description}
                      </p>
                    )}
                    <div className="flex items-baseline gap-2">
                      <span className="font-body font-bold text-brand-primary">
                        ${product.price.toLocaleString("es-AR")}
                      </span>
                      {product.compare_at_price && product.compare_at_price > product.price && (
                        <span className="font-body text-xs text-neutral-500 line-through">
                          ${product.compare_at_price.toLocaleString("es-AR")}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </ClipRevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== HORARIOS — full-bleed brand-primary ===================== */}
      <section className="py-16 bg-brand-primary">
        <div className="max-w-6xl mx-auto px-6">
          <ClipRevealOnScroll>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-neutral-900/60 mb-10 text-center">
              Estamos esperándote
            </p>
          </ClipRevealOnScroll>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { dias: "Mar — Jue", horario: "19:00 – 01:00" },
              { dias: "Vie — Sáb", horario: "19:00 – 02:30" },
              { dias: "Domingo", horario: "18:00 – 00:00" },
              { dias: "Pedidos online", horario: "Todos los días" },
            ].map((h, i) => (
              <ClipRevealOnScroll key={i} delay={i * 0.1}>
                <div>
                  <p className="font-body text-xs uppercase tracking-widest text-neutral-900/60 font-medium mb-2">
                    {h.dias}
                  </p>
                  <p className="font-display text-2xl lg:text-3xl font-extrabold text-neutral-900">
                    {h.horario}
                  </p>
                </div>
              </ClipRevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== AMBIENTE / NOSOTROS — full-bleed dark ===================== */}
      <section className="py-24 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <ClipRevealOnScroll direction="left">
              {/* Cliente: reemplazar con foto propia */}
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1442512435-cd787031a5e5?w=1200&q=85&auto=format&fit=crop"
                  alt="Ambiente de Bar Octopus"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-6 left-6 bg-brand-primary text-neutral-900 px-4 py-2 font-body text-sm font-bold rounded-full">
                  Desde el barrio
                </div>
              </div>
            </ClipRevealOnScroll>

            <ClipRevealOnScroll direction="right" delay={0.15}>
              <div>
                <p className="font-body text-xs uppercase tracking-[0.3em] text-brand-primary mb-4">
                  Nuestra historia
                </p>
                <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
                  Un bar con alma propia.
                </h2>
                <p className="font-body text-neutral-400 leading-relaxed mb-6">
                  Abrimos con una sola idea: hacer la hamburguesa que nos gustaría comer. Carne seleccionada, pan hecho artesanalmente y salsas que no encontrás en ningún otro lado.
                </p>
                <p className="font-body text-neutral-400 leading-relaxed mb-10">
                  Cada receta tiene nombre, historia y ganas. El ambiente es de barrio porque creemos que la mejor comida se come donde te sentís cómodo.
                </p>
                <Link
                  href="/nosotros"
                  className="inline-flex items-center gap-3 font-body text-white font-medium group"
                >
                  Conocer más
                  <span className="w-10 h-px bg-brand-primary group-hover:w-16 transition-all duration-300" />
                </Link>
              </div>
            </ClipRevealOnScroll>
          </div>
        </div>
      </section>

      {/* ===================== POR QUÉ ELEGIRNOS — full-bleed neutral-50 ===================== */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ClipRevealOnScroll>
            <div className="text-center mb-16">
              <p className="font-body text-xs uppercase tracking-[0.3em] text-brand-primary mb-3">
                Lo que nos define
              </p>
              <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-neutral-900">
                Sin atajos.
              </h2>
            </div>
          </ClipRevealOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🥩",
                title: "Carne Angus",
                desc: "Seleccionamos el corte, regulamos la grasa y molemos el día. Cada patty tiene nombre.",
              },
              {
                icon: "🍞",
                title: "Pan del día",
                desc: "Brioche horneado artesanalmente. Suave adentro, crocante afuera, nunca de fábrica.",
              },
              {
                icon: "🫙",
                title: "Salsas de autor",
                desc: "Cinco salsas desarrolladas en casa. La de la casa es secreto — preguntá qué lleva.",
              },
              {
                icon: "🌙",
                title: "Ambiente nocturno",
                desc: "Música, luces bajas y tiempo para estar. Venís a comer y te quedás.",
              },
            ].map((item, i) => (
              <ClipRevealOnScroll key={i} delay={i * 0.1}>
                <div className="p-8 border border-neutral-200 rounded-xl hover:border-brand-primary hover:shadow-lg hover:shadow-brand-primary/10 transition-all duration-300">
                  <p className="text-3xl mb-4">{item.icon}</p>
                  <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-neutral-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </ClipRevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
