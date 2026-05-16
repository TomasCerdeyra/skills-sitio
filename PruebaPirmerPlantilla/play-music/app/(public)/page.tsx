import { HeroSection } from "@/components/ui/HeroSection";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { createAdminClient } from "@/lib/supabase/admin";
import { getProductImage, getSectionImage } from "@/lib/placeholder-images";
import Link from "next/link";

// =============================================
// MOCK DATA — fallback con DB vacía
// Imágenes: LoremFlickr con keywords específicos por instrumento
// lock=N asegura que siempre se muestre la misma foto (determinístico)
// =============================================
const MOCK_FEATURED = [
  {
    id: "mock-1",
    name: "Guitarra Criolla Clásica",
    slug: "guitarra-criolla-clasica",
    price: 185000,
    compare_at_price: null,
    description: "Sonido cálido, construcción sólida. Ideal para comenzar y para seguir.",
    product_images: [{ url: "https://loremflickr.com/800/600/guitar,acoustic?lock=1", alt: "Guitarra criolla clásica", position: 0 }],
    category_id: "mock-cat-1",
    featured: true,
  },
  {
    id: "mock-2",
    name: "Piano Digital Stage 88",
    slug: "piano-digital-stage-88",
    price: 890000,
    compare_at_price: 950000,
    description: "88 teclas contrapesadas, sample de grand piano Steinway, 3 pedales.",
    product_images: [{ url: "https://loremflickr.com/800/600/piano,keyboard?lock=2", alt: "Piano digital stage", position: 0 }],
    category_id: "mock-cat-2",
    featured: true,
  },
  {
    id: "mock-3",
    name: "Bajo Eléctrico Jazz Bass",
    slug: "bajo-electrico-jazz-bass",
    price: 420000,
    compare_at_price: null,
    description: "Cuerpo de aliso, mástil de arce, pastillas de bobina simple. Sonido redondo y definido.",
    product_images: [{ url: "https://loremflickr.com/800/600/bass,guitar?lock=3", alt: "Bajo eléctrico Jazz Bass", position: 0 }],
    category_id: "mock-cat-3",
    featured: false,
  },
  {
    id: "mock-4",
    name: "Batería Acústica 5 Piezas",
    slug: "bateria-acustica-5-piezas",
    price: 680000,
    compare_at_price: null,
    description: "Kit completo de 5 piezas con herraje cromado. Lista para ensayar.",
    product_images: [{ url: "https://loremflickr.com/800/600/drums,percussion?lock=4", alt: "Batería acústica", position: 0 }],
    category_id: "mock-cat-4",
    featured: false,
  },
  {
    id: "mock-5",
    name: "Violín 4/4 Profesional",
    slug: "violin-44-profesional",
    price: 310000,
    compare_at_price: null,
    description: "Cuerpo de abeto sólido, barniz nitro, arco de cerda natural. Incluye estuche.",
    product_images: [{ url: "https://loremflickr.com/800/600/violin?lock=5", alt: "Violín profesional", position: 0 }],
    category_id: "mock-cat-5",
    featured: true,
  },
  {
    id: "mock-6",
    name: "Guitarra Eléctrica Stratocaster",
    slug: "guitarra-electrica-stratocaster",
    price: 540000,
    compare_at_price: 620000,
    description: "Cuerpo de aliso, mástil en C, pastillas SSS. El clásico que lo hace todo bien.",
    product_images: [{ url: "https://loremflickr.com/800/600/electric,guitar?lock=6", alt: "Guitarra eléctrica Stratocaster", position: 0 }],
    category_id: "mock-cat-1",
    featured: false,
  },
];

async function getFeaturedProducts() {
  try {
    const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
    if (!tenantId) return [];
    const supabaseAdmin = createAdminClient();
    const { data } = await supabaseAdmin
      .from("products")
      .select("id, name, slug, price, compare_at_price, description, featured, category_id, product_images(url, alt, position)")
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

const CATEGORIES_DISPLAY = [
  { icon: "🎸", name: "Guitarras", href: "/catalogo?cat=guitarras" },
  { icon: "🎹", name: "Teclados", href: "/catalogo?cat=teclados" },
  { icon: "🥁", name: "Baterías", href: "/catalogo?cat=baterias" },
  { icon: "🎻", name: "Cuerdas", href: "/catalogo?cat=cuerdas" },
  { icon: "🎺", name: "Vientos", href: "/catalogo?cat=vientos" },
  { icon: "🎙️", name: "Accesorios", href: "/catalogo?cat=accesorios" },
];

export default async function HomePage() {
  const featured = await getFeaturedProducts();
  const displayFeatured = featured.length > 0 ? featured : MOCK_FEATURED;
  const waLink = buildWhatsAppLink({ message: "Hola, quiero consultar sobre instrumentos" });

  return (
    <>
      <HeroSection waLink={waLink} />

      {/* =============================================
          SECCIÓN: Categorías — Explorar por familia
      ============================================= */}
      <section className="bg-neutral-100 py-14">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <h2 className="font-display text-3xl lg:text-4xl text-neutral-900 font-bold">
              ¿Qué vas a tocar?
            </h2>
            <Link
              href="/catalogo"
              className="font-body text-sm text-brand-primary hover:text-brand-primary/80 transition-colors flex items-center gap-1"
            >
              Ver todo →
            </Link>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {CATEGORIES_DISPLAY.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group flex flex-col items-center gap-2 bg-neutral-50 hover:bg-neutral-900 p-4 rounded-sm transition-all duration-300 border border-transparent hover:border-brand-primary/20"
              >
                <span className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-300">
                  {cat.icon}
                </span>
                <span className="font-body text-xs font-medium text-neutral-700 group-hover:text-neutral-50 transition-colors text-center">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =============================================
          SECCIÓN: Instrumentos destacados
          Layout bento — tamaños variables como notas en pentagrama
      ============================================= */}
      <section className="bg-neutral-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="mb-12">
            <p className="font-body text-xs uppercase tracking-[0.25em] text-brand-primary mb-3">
              ♪ Selección del mes
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight">
              Instrumentos
              <br />
              <span className="text-brand-primary">destacados.</span>
            </h2>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayFeatured.map((product, i) => {
              const imageUrl = getProductImage(product);
              const isLarge = i === 0 || i === 4;
              return (
                <Link
                  key={product.id}
                  href={`/producto/${product.slug}`}
                  className={`group block relative overflow-hidden bg-neutral-100 rounded-sm ${
                    isLarge ? "lg:col-span-1 row-span-1" : ""
                  }`}
                >
                  <div className={`relative overflow-hidden ${isLarge ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-107"
                      style={{ transition: "transform 700ms ease" }}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      {product.compare_at_price && product.compare_at_price > product.price && (
                        <span className="inline-block bg-brand-primary text-neutral-50 text-xs font-body font-bold px-2 py-0.5 mb-2 uppercase tracking-wider">
                          Oferta
                        </span>
                      )}
                      <h3 className="font-display text-lg text-neutral-50 font-bold leading-tight mb-1">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className="font-body font-semibold text-brand-accent">
                          ${product.price.toLocaleString("es-AR")}
                        </span>
                        {product.compare_at_price && product.compare_at_price > product.price && (
                          <span className="font-body text-sm text-neutral-400 line-through">
                            ${product.compare_at_price.toLocaleString("es-AR")}
                          </span>
                        )}
                      </div>
                    </div>
                    {/* Hover reveal */}
                    <div className="absolute top-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="font-body text-xs text-neutral-200 bg-neutral-900/60 backdrop-blur-sm px-3 py-1 rounded-full">
                        Ver detalle →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-3 font-body font-medium text-neutral-700 hover:text-brand-primary transition-colors group"
            >
              Ver todo el catálogo
              <span className="w-10 h-px bg-neutral-400 group-hover:bg-brand-primary group-hover:w-16 transition-all duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* =============================================
          SECCIÓN: Por qué elegirnos — Fondo oscuro contrastante
      ============================================= */}
      <section className="bg-neutral-900 py-20 lg:py-28 relative overflow-hidden staff-bg">
        <div className="relative z-[1] max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-body text-xs uppercase tracking-[0.25em] text-brand-accent mb-4">
                ♫ Nuestra propuesta
              </p>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-neutral-50 leading-tight mb-6">
                No vendemos
                <br />
                instrumentos.
                <br />
                <span className="text-brand-accent">Habilitamos músicos.</span>
              </h2>
              <p className="font-body text-neutral-400 leading-relaxed text-lg mb-8">
                En Play Music entendemos que elegir un instrumento es una decisión importante.
                Por eso cada venta es también una conversación: te ayudamos a encontrar lo que
                realmente necesitás, no lo más caro del catálogo.
              </p>
              <Link
                href="/nosotros"
                className="inline-flex items-center gap-2 font-body text-brand-accent hover:text-neutral-50 transition-colors group"
              >
                Conocer más sobre nosotros
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: "🎵",
                  title: "Asesoramiento real",
                  desc: "Cada consulta es respondida por músicos que saben de lo que hablan.",
                },
                {
                  icon: "📦",
                  title: "Envíos a todo el país",
                  desc: "OCA, Andreani y Correo Argentino. Calculado en tiempo real al finalizar la compra.",
                },
                {
                  icon: "💳",
                  title: "Todas las formas de pago",
                  desc: "Hasta 12 cuotas sin interés con tarjetas seleccionadas. También transferencia.",
                },
                {
                  icon: "🔧",
                  title: "Garantía y soporte",
                  desc: "Respaldo de fábrica en todos los productos. Servicio técnico en CABA.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-neutral-800/60 p-5 rounded-sm border border-neutral-700/40 hover:border-brand-primary/30 transition-colors group"
                >
                  <span className="text-2xl mb-3 block">{item.icon}</span>
                  <h3 className="font-display text-base font-bold text-neutral-50 mb-2">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-neutral-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =============================================
          SECCIÓN: Imagen inspiracional
      ============================================= */}
      <section className="relative h-64 lg:h-80 overflow-hidden">
        <img
          src={getSectionImage("guitar,music", 2400, 800, 15)}
          alt="Estudio de música con instrumentos"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/80 via-neutral-900/20 to-neutral-900/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-5 lg:px-8 w-full">
            <p className="font-display text-3xl lg:text-5xl font-bold text-neutral-50 italic">
              &ldquo;La música conecta lo que las palabras no pueden.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* =============================================
          SECCIÓN: CTA Final — Warm close
      ============================================= */}
      <section className="bg-neutral-100 py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-5 lg:px-8 text-center">
          <p className="font-body text-xs uppercase tracking-[0.25em] text-brand-primary mb-4">
            ♬ Comenzá ahora
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
            ¿Sabés qué querés tocar?
            <br />
            Nosotros te ayudamos a elegirlo.
          </h2>
          <p className="font-body text-lg text-neutral-600 mb-10 leading-relaxed">
            Escribinos por WhatsApp o explorá el catálogo. Respondemos rápido y sin vueltas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/catalogo"
              className="inline-flex items-center justify-center gap-2 bg-neutral-900 text-neutral-50 px-10 py-4 font-body font-semibold hover:bg-brand-primary transition-colors duration-300 rounded-sm"
            >
              Ver catálogo completo
            </Link>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-10 py-4 font-body font-semibold hover:bg-[#1EB356] transition-colors duration-200 rounded-sm"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
