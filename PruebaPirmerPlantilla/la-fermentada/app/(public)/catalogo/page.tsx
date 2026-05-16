import { createAdminClient } from "@/lib/supabase/admin";
import { getTenantId } from "@/lib/tenant";
import { CatalogClient } from "@/components/ui/CatalogClient";

async function getProducts() {
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
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(200);
    return data ?? [];
  } catch {
    return [];
  }
}

async function getCategories() {
  try {
    const tenantId = getTenantId();
    const supabaseAdmin = createAdminClient();
    const { data } = await supabaseAdmin
      .from("categories")
      .select(`id, name, slug, position, subcategories (id, name, slug, position)`)
      .eq("tenant_id", tenantId)
      .eq("active", true)
      .order("position");
    return data ?? [];
  } catch {
    return [];
  }
}

// ============================================================
// MOCK DATA — para que la plantilla se vea aunque la DB esté vacía
// ============================================================
const MOCK_CATEGORIES = [
  { id: "mock-cat-1", name: "Panes", slug: "panes", position: 0, subcategories: [] },
  { id: "mock-cat-2", name: "Facturas y Viennoiserie", slug: "facturas-viennoiserie", position: 1, subcategories: [] },
  { id: "mock-cat-3", name: "Tortas y Pasteles", slug: "tortas-pasteles", position: 2, subcategories: [] },
  { id: "mock-cat-4", name: "Extras", slug: "extras", position: 3, subcategories: [] },
];

const MOCK_PRODUCTS = [
  {
    id: "mock-1", name: "Pan de masa madre campesino", slug: "pan-masa-madre-campesino",
    price: 2800, compare_at_price: null, description: "Miga abierta, corteza crujiente. Fermentación de 18 horas con levadura salvaje propia.",
    featured: true, category_id: "mock-cat-1",
    product_images: [{ id: "i1", url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80&auto=format&fit=crop", alt: "Pan masa madre", position: 0 }],
    product_variants: [
      { id: "v1", name: "Chico (400g)", price: 2800, price_modifier: 0, stock: 20 },
      { id: "v2", name: "Grande (800g)", price: 4800, price_modifier: 2000, stock: 12 },
    ],
  },
  {
    id: "mock-2", name: "Baguette de campo", slug: "baguette-de-campo",
    price: 1400, compare_at_price: null, description: "Harina 000, prefermento poolish y cochura directa en horno a leña.",
    featured: false, category_id: "mock-cat-1",
    product_images: [{ id: "i2", url: "https://images.unsplash.com/photo-1558303729-b51f9cf25d12?w=800&q=80&auto=format&fit=crop", alt: "Baguette", position: 0 }],
    product_variants: [],
  },
  {
    id: "mock-3", name: "Pan integral con semillas", slug: "pan-integral-semillas",
    price: 2400, compare_at_price: null, description: "Harina integral de molienda local, semillas de lino, girasol y zapallo.",
    featured: false, category_id: "mock-cat-1",
    product_images: [{ id: "i3", url: "https://picsum.photos/seed/pan-integral-semillas-fermentada/800/600", alt: "Pan integral", position: 0 }],
    product_variants: [],
  },
  {
    id: "mock-4", name: "Pan de centeno oscuro", slug: "pan-centeno-oscuro",
    price: 2600, compare_at_price: null, description: "Masa madre de centeno, cocción lenta. Denso y aromático.",
    featured: false, category_id: "mock-cat-1",
    product_images: [{ id: "i4", url: "https://picsum.photos/seed/pan-centeno-fermentada/800/600", alt: "Pan centeno", position: 0 }],
    product_variants: [],
  },
  {
    id: "mock-5", name: "Focaccia de romero y sal gruesa", slug: "focaccia-romero-sal",
    price: 1800, compare_at_price: null, description: "Masa madre hidratada, aceite de oliva generoso, romero fresco y sal patagónica.",
    featured: true, category_id: "mock-cat-1",
    product_images: [{ id: "i5", url: "https://picsum.photos/seed/focaccia-romero-fermentada/800/600", alt: "Focaccia", position: 0 }],
    product_variants: [],
  },
  {
    id: "mock-6", name: "Medialunas de manteca docena", slug: "medialunas-manteca-docena",
    price: 4800, compare_at_price: null, description: "Hechas con manteca de primera, masa briochada y toque de miel.",
    featured: true, category_id: "mock-cat-2",
    product_images: [{ id: "i6", url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80&auto=format&fit=crop", alt: "Medialunas", position: 0 }],
    product_variants: [
      { id: "v5", name: "Media docena (6 u.)", price: 2600, price_modifier: -2200, stock: 30 },
      { id: "v6", name: "Docena (12 u.)", price: 4800, price_modifier: 0, stock: 20 },
    ],
  },
  {
    id: "mock-7", name: "Croissant de manteca", slug: "croissant-manteca",
    price: 1200, compare_at_price: null, description: "27 capas de hojaldre con manteca francesa. Proceso de dos días.",
    featured: false, category_id: "mock-cat-2",
    product_images: [{ id: "i7", url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80&auto=format&fit=crop", alt: "Croissant", position: 0 }],
    product_variants: [],
  },
  {
    id: "mock-8", name: "Pain au chocolat", slug: "pain-au-chocolat",
    price: 1400, compare_at_price: null, description: "La misma masa del croissant envuelve dos barras de chocolate 72% cacao.",
    featured: false, category_id: "mock-cat-2",
    product_images: [{ id: "i8", url: "https://picsum.photos/seed/pain-chocolat-fermentada/800/600", alt: "Pain au chocolat", position: 0 }],
    product_variants: [],
  },
  {
    id: "mock-9", name: "Tarta de limón y merengue", slug: "tarta-limon-merengue",
    price: 3200, compare_at_price: null, description: "Masa sablé casera, crema de limón de Corrientes y merengue italiano flameado.",
    featured: false, category_id: "mock-cat-3",
    product_images: [{ id: "i9", url: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80&auto=format&fit=crop", alt: "Tarta limón", position: 0 }],
    product_variants: [],
  },
  {
    id: "mock-10", name: "Carrot cake con frosting de queso", slug: "carrot-cake-frosting-queso",
    price: 2900, compare_at_price: 3400, description: "Zanahoria, nueces, canela y jengibre. Frosting de queso crema con ralladura de limón.",
    featured: false, category_id: "mock-cat-3",
    product_images: [{ id: "i10", url: "https://picsum.photos/seed/carrot-cake-fermentada/800/600", alt: "Carrot cake", position: 0 }],
    product_variants: [],
  },
  {
    id: "mock-11", name: "Mermelada artesanal 300g", slug: "mermelada-artesanal",
    price: 2200, compare_at_price: null, description: "Elaborada en el local con fruta de estación. Poca azúcar, mucha fruta.",
    featured: false, category_id: "mock-cat-4",
    product_images: [{ id: "i11", url: "https://picsum.photos/seed/mermelada-artesanal-fermentada/800/600", alt: "Mermelada", position: 0 }],
    product_variants: [],
  },
  {
    id: "mock-12", name: "Levadura madre seca 50g", slug: "levadura-madre-seca",
    price: 1500, compare_at_price: null, description: "Nuestra levadura salvaje deshidratada para que puedas hacer pan en casa.",
    featured: false, category_id: "mock-cat-4",
    product_images: [{ id: "i12", url: "https://picsum.photos/seed/levadura-madre-fermentada/800/600", alt: "Levadura madre", position: 0 }],
    product_variants: [],
  },
];

export default async function CatalogPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const useRealData = products.length > 0 && categories.length > 0;
  const displayProducts = useRealData ? products : MOCK_PRODUCTS;
  const displayCategories = useRealData ? categories : MOCK_CATEGORIES;

  return (
    <CatalogClient
      products={displayProducts as typeof MOCK_PRODUCTS}
      categories={displayCategories as typeof MOCK_CATEGORIES}
    />
  );
}
