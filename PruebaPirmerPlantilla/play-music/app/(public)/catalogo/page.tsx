import { createAdminClient } from "@/lib/supabase/admin";
import { CatalogClient } from "@/components/ui/CatalogClient";

// =============================================
// MOCK DATA — fallback con DB vacía
// Imágenes: LoremFlickr con keywords por instrumento (lock = determinístico)
// =============================================
const MOCK_CATEGORIES = [
  { id: "mock-cat-1", name: "Guitarras", slug: "guitarras", position: 0 },
  { id: "mock-cat-2", name: "Teclados y Pianos", slug: "teclados-y-pianos", position: 1 },
  { id: "mock-cat-3", name: "Bajos", slug: "bajos", position: 2 },
  { id: "mock-cat-4", name: "Baterías", slug: "baterias", position: 3 },
  { id: "mock-cat-5", name: "Cuerdas y Vientos", slug: "cuerdas-y-vientos", position: 4 },
  { id: "mock-cat-6", name: "Accesorios", slug: "accesorios", position: 5 },
];

const MOCK_PRODUCTS = [
  {
    id: "mock-1",
    name: "Guitarra Criolla Clásica",
    slug: "guitarra-criolla-clasica",
    price: 185000,
    compare_at_price: null,
    description: "Sonido cálido y proyección equilibrada. Tapa de pino sólido, aros y fondo de caoba. Ideal para folklore y clásica.",
    featured: true,
    category_id: "mock-cat-1",
    product_images: [{ url: "https://loremflickr.com/800/600/guitar,acoustic?lock=1", alt: "Guitarra criolla clásica", position: 0 }],
  },
  {
    id: "mock-6",
    name: "Guitarra Eléctrica Stratocaster",
    slug: "guitarra-electrica-stratocaster",
    price: 540000,
    compare_at_price: 620000,
    description: "Cuerpo de aliso, mástil en C de arce, pastillas SSS. El clásico versátil que suena bien en cualquier género.",
    featured: false,
    category_id: "mock-cat-1",
    product_images: [{ url: "https://loremflickr.com/800/600/electric,guitar?lock=6", alt: "Guitarra eléctrica Stratocaster", position: 0 }],
  },
  {
    id: "mock-11",
    name: "Guitarra Acústica Dreadnought",
    slug: "guitarra-acustica-dreadnought",
    price: 295000,
    compare_at_price: null,
    description: "Proyección potente con tapa de abeto. Para canciones, folklore y sesiones acústicas. Incluye funda.",
    featured: false,
    category_id: "mock-cat-1",
    product_images: [{ url: "https://loremflickr.com/800/600/acoustic,guitar?lock=11", alt: "Guitarra acústica Dreadnought", position: 0 }],
  },
  {
    id: "mock-2",
    name: "Piano Digital Stage 88",
    slug: "piano-digital-stage-88",
    price: 890000,
    compare_at_price: 950000,
    description: "88 teclas contrapesadas con peso graduado, muestra de grand piano, 3 pedales. Sonido de concierto en casa.",
    featured: true,
    category_id: "mock-cat-2",
    product_images: [{ url: "https://loremflickr.com/800/600/piano,keyboard?lock=2", alt: "Piano digital Stage 88", position: 0 }],
  },
  {
    id: "mock-7",
    name: "Teclado Workstation 61 teclas",
    slug: "teclado-workstation-61",
    price: 650000,
    compare_at_price: null,
    description: "Sintetizador con 500 sonidos, secuenciador interno, arpeggiator y conexión MIDI/USB.",
    featured: false,
    category_id: "mock-cat-2",
    product_images: [{ url: "https://loremflickr.com/800/600/synthesizer,keyboard?lock=7", alt: "Teclado Workstation 61", position: 0 }],
  },
  {
    id: "mock-3",
    name: "Bajo Eléctrico Jazz Bass",
    slug: "bajo-electrico-jazz-bass",
    price: 420000,
    compare_at_price: null,
    description: "Cuerpo de aliso, mástil de arce, pastillas de bobina simple. Sonido redondo, ataque definido.",
    featured: true,
    category_id: "mock-cat-3",
    product_images: [{ url: "https://loremflickr.com/800/600/bass,guitar?lock=3", alt: "Bajo eléctrico Jazz Bass", position: 0 }],
  },
  {
    id: "mock-8",
    name: "Bajo Precision Bass",
    slug: "bajo-precision-bass",
    price: 395000,
    compare_at_price: null,
    description: "El bajo por excelencia. Cuerpo de aliso, pastilla split de bobina, sonido gordo y fundamental.",
    featured: false,
    category_id: "mock-cat-3",
    product_images: [{ url: "https://loremflickr.com/800/600/bass,guitar?lock=8", alt: "Bajo Precision Bass", position: 0 }],
  },
  {
    id: "mock-4",
    name: "Batería Acústica 5 Piezas",
    slug: "bateria-acustica-5-piezas",
    price: 680000,
    compare_at_price: null,
    description: "Kit completo con bombo 22\", tarola 14\", tres toms y herraje completo. Lista para ensayar.",
    featured: false,
    category_id: "mock-cat-4",
    product_images: [{ url: "https://loremflickr.com/800/600/drums,percussion?lock=4", alt: "Batería acústica", position: 0 }],
  },
  {
    id: "mock-9",
    name: "Batería Electrónica E-Kit",
    slug: "bateria-electronica-ekit",
    price: 780000,
    compare_at_price: 850000,
    description: "Módulo con 50 kits de batería, pads de caucho mesh, pedal de bombo. Tocar a cualquier hora sin molestar.",
    featured: true,
    category_id: "mock-cat-4",
    product_images: [{ url: "https://loremflickr.com/800/600/electronic,drums?lock=9", alt: "Batería electrónica E-Kit", position: 0 }],
  },
  {
    id: "mock-5",
    name: "Violín 4/4 Profesional",
    slug: "violin-44-profesional",
    price: 310000,
    compare_at_price: null,
    description: "Cuerpo de abeto sólido, barniz nitro de 15 capas, arco de cerda natural. Incluye estuche y resina.",
    featured: true,
    category_id: "mock-cat-5",
    product_images: [{ url: "https://loremflickr.com/800/600/violin?lock=5", alt: "Violín profesional", position: 0 }],
  },
  {
    id: "mock-10",
    name: "Trompeta Laqueada Sib",
    slug: "trompeta-laqueada-sib",
    price: 245000,
    compare_at_price: null,
    description: "Cuerpo de latón laqueado dorado, 3 pistones, campana de 123mm. Sonido brillante y proyectado.",
    featured: false,
    category_id: "mock-cat-5",
    product_images: [{ url: "https://loremflickr.com/800/600/trumpet?lock=10", alt: "Trompeta laqueada", position: 0 }],
  },
  {
    id: "mock-12",
    name: "Afinador Cromático Clip",
    slug: "afinador-cromatico-clip",
    price: 9500,
    compare_at_price: null,
    description: "Afinador de clip con pantalla a color, rotación 360°. Compatible con todos los instrumentos.",
    featured: false,
    category_id: "mock-cat-6",
    product_images: [{ url: "https://loremflickr.com/800/600/guitar,music?lock=12", alt: "Afinador cromático", position: 0 }],
  },
];

async function getProducts() {
  try {
    const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
    if (!tenantId) return [];
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
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });
    // sin .limit() — plan Empresa
    return data ?? [];
  } catch {
    return [];
  }
}

async function getCategories() {
  try {
    const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
    if (!tenantId) return [];
    const supabaseAdmin = createAdminClient();
    const { data } = await supabaseAdmin
      .from("categories")
      .select("id, name, slug, position, subcategories(id, name, slug, position)")
      .eq("tenant_id", tenantId)
      .eq("active", true)
      .order("position");
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function CatalogPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const useRealData = products.length > 0 && categories.length > 0;
  const displayProducts = useRealData ? products : MOCK_PRODUCTS;
  const displayCategories = useRealData ? categories : MOCK_CATEGORIES;

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      {/* Page header */}
      <div className="bg-neutral-900 pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <p className="font-body text-xs uppercase tracking-[0.25em] text-brand-accent mb-3">
            ♪ Catálogo completo
          </p>
          <h1 className="font-display text-4xl lg:text-6xl font-bold text-neutral-50 leading-tight">
            Encontrá tu
            <br />
            instrumento.
          </h1>
          <p className="font-body text-neutral-400 mt-4 text-base lg:text-lg max-w-lg">
            {displayProducts.length} instrumentos disponibles. Enviamos a todo el país.
          </p>
        </div>
      </div>

      {/* Catalog with tabs */}
      <CatalogClient
        products={displayProducts as typeof MOCK_PRODUCTS}
        categories={displayCategories as typeof MOCK_CATEGORIES}
      />
    </div>
  );
}
