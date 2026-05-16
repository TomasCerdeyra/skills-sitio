import { createAdminClient } from "@/lib/supabase/admin";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/ui/ProductDetailClient";

// MOCK_PRODUCTS — mismos slugs e IDs que en catalogo/page.tsx
// Imágenes: LoremFlickr con keywords específicos por instrumento (lock = determinístico)
const MOCK_PRODUCTS = [
  {
    id: "mock-1", name: "Guitarra Criolla Clásica", slug: "guitarra-criolla-clasica",
    price: 185000, compare_at_price: null,
    description: "Sonido cálido y proyección equilibrada. Tapa de pino sólido, aros y fondo de caoba. Ideal para folklore y clásica.",
    featured: true, category_id: "mock-cat-1",
    product_images: [{ id: "pi1", url: "https://loremflickr.com/800/600/guitar,acoustic?lock=1", alt: "Guitarra criolla clásica", position: 0 }],
    product_variants: [],
  },
  {
    id: "mock-6", name: "Guitarra Eléctrica Stratocaster", slug: "guitarra-electrica-stratocaster",
    price: 540000, compare_at_price: 620000,
    description: "Cuerpo de aliso, mástil en C de arce, pastillas SSS. El clásico versátil que suena bien en cualquier género.",
    featured: false, category_id: "mock-cat-1",
    product_images: [{ id: "pi2", url: "https://loremflickr.com/800/600/electric,guitar?lock=6", alt: "Guitarra eléctrica Stratocaster", position: 0 }],
    product_variants: [
      { id: "v1", name: "Sunburst", sku: null, price: null, price_modifier: 0, stock: 5 },
      { id: "v2", name: "Olympic White", sku: null, price: null, price_modifier: 15000, stock: 2 },
      { id: "v3", name: "Black", sku: null, price: null, price_modifier: 0, stock: 0 },
    ],
  },
  {
    id: "mock-11", name: "Guitarra Acústica Dreadnought", slug: "guitarra-acustica-dreadnought",
    price: 295000, compare_at_price: null,
    description: "Proyección potente con tapa de abeto. Para canciones, folklore y sesiones acústicas. Incluye funda.",
    featured: false, category_id: "mock-cat-1",
    product_images: [{ id: "pi3", url: "https://loremflickr.com/800/600/acoustic,guitar?lock=11", alt: "Guitarra acústica Dreadnought", position: 0 }],
    product_variants: [],
  },
  {
    id: "mock-2", name: "Piano Digital Stage 88", slug: "piano-digital-stage-88",
    price: 890000, compare_at_price: 950000,
    description: "88 teclas contrapesadas con peso graduado, muestra de grand piano, 3 pedales. Sonido de concierto en casa.",
    featured: true, category_id: "mock-cat-2",
    product_images: [{ id: "pi4", url: "https://loremflickr.com/800/600/piano,keyboard?lock=2", alt: "Piano digital Stage 88", position: 0 }],
    product_variants: [],
  },
  {
    id: "mock-7", name: "Teclado Workstation 61 teclas", slug: "teclado-workstation-61",
    price: 650000, compare_at_price: null,
    description: "Sintetizador con 500 sonidos, secuenciador interno, arpeggiator y conexión MIDI/USB.",
    featured: false, category_id: "mock-cat-2",
    product_images: [{ id: "pi5", url: "https://loremflickr.com/800/600/synthesizer,keyboard?lock=7", alt: "Teclado Workstation", position: 0 }],
    product_variants: [],
  },
  {
    id: "mock-3", name: "Bajo Eléctrico Jazz Bass", slug: "bajo-electrico-jazz-bass",
    price: 420000, compare_at_price: null,
    description: "Cuerpo de aliso, mástil de arce, pastillas de bobina simple. Sonido redondo, ataque definido.",
    featured: true, category_id: "mock-cat-3",
    product_images: [{ id: "pi6", url: "https://loremflickr.com/800/600/bass,guitar?lock=3", alt: "Bajo eléctrico Jazz Bass", position: 0 }],
    product_variants: [],
  },
  {
    id: "mock-8", name: "Bajo Precision Bass", slug: "bajo-precision-bass",
    price: 395000, compare_at_price: null,
    description: "El bajo por excelencia. Cuerpo de aliso, pastilla split de bobina, sonido gordo y fundamental.",
    featured: false, category_id: "mock-cat-3",
    product_images: [{ id: "pi7", url: "https://loremflickr.com/800/600/bass,guitar?lock=8", alt: "Bajo Precision Bass", position: 0 }],
    product_variants: [],
  },
  {
    id: "mock-4", name: "Batería Acústica 5 Piezas", slug: "bateria-acustica-5-piezas",
    price: 680000, compare_at_price: null,
    description: "Kit completo con bombo 22\", tarola 14\", tres toms y herraje completo. Lista para ensayar.",
    featured: false, category_id: "mock-cat-4",
    product_images: [{ id: "pi8", url: "https://loremflickr.com/800/600/drums,percussion?lock=4", alt: "Batería acústica", position: 0 }],
    product_variants: [],
  },
  {
    id: "mock-9", name: "Batería Electrónica E-Kit", slug: "bateria-electronica-ekit",
    price: 780000, compare_at_price: 850000,
    description: "Módulo con 50 kits de batería, pads de caucho mesh, pedal de bombo. Tocar a cualquier hora sin molestar.",
    featured: true, category_id: "mock-cat-4",
    product_images: [{ id: "pi9", url: "https://loremflickr.com/800/600/electronic,drums?lock=9", alt: "Batería electrónica E-Kit", position: 0 }],
    product_variants: [],
  },
  {
    id: "mock-5", name: "Violín 4/4 Profesional", slug: "violin-44-profesional",
    price: 310000, compare_at_price: null,
    description: "Cuerpo de abeto sólido, barniz nitro de 15 capas, arco de cerda natural. Incluye estuche y resina.",
    featured: true, category_id: "mock-cat-5",
    product_images: [{ id: "pi10", url: "https://loremflickr.com/800/600/violin?lock=5", alt: "Violín profesional", position: 0 }],
    product_variants: [],
  },
  {
    id: "mock-10", name: "Trompeta Laqueada Sib", slug: "trompeta-laqueada-sib",
    price: 245000, compare_at_price: null,
    description: "Cuerpo de latón laqueado dorado, 3 pistones, campana de 123mm. Sonido brillante y proyectado.",
    featured: false, category_id: "mock-cat-5",
    product_images: [{ id: "pi11", url: "https://loremflickr.com/800/600/trumpet?lock=10", alt: "Trompeta laqueada", position: 0 }],
    product_variants: [],
  },
  {
    id: "mock-12", name: "Afinador Cromático Clip", slug: "afinador-cromatico-clip",
    price: 9500, compare_at_price: null,
    description: "Afinador de clip con pantalla a color, rotación 360°. Compatible con todos los instrumentos.",
    featured: false, category_id: "mock-cat-6",
    product_images: [{ id: "pi12", url: "https://loremflickr.com/800/600/guitar,music?lock=12", alt: "Afinador cromático", position: 0 }],
    product_variants: [],
  },
];

async function getProduct(slug: string) {
  try {
    const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
    if (!tenantId) return null;
    const supabaseAdmin = createAdminClient();
    const { data } = await supabaseAdmin
      .from("products")
      .select(`
        id, name, slug, price, compare_at_price, description, featured,
        category_id,
        product_images (id, url, alt, position),
        product_variants (id, name, sku, price, price_modifier, stock)
      `)
      .eq("tenant_id", tenantId)
      .eq("slug", slug)
      .eq("active", true)
      .single();
    return data ?? null;
  } catch {
    return null;
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const dbProduct = await getProduct(slug);
  const product =
    dbProduct ??
    (MOCK_PRODUCTS.find((p) => p.slug === slug) as typeof MOCK_PRODUCTS[0] | undefined);

  if (!product) notFound();

  return <ProductDetailClient product={product} />;
}
