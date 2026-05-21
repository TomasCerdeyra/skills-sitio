import { unstable_cache } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { getTenantId } from "@/lib/tenant";
import { TAGS } from "@/lib/cache-tags";
import CatalogoClient, { ProductCard, CategoryItem } from "@/components/ui/CatalogoClient";

// ─── Mock data ────────────────────────────────────────────────────────────────
const MOCK_CATEGORIES: CategoryItem[] = [
  { id: "all", name: "Todo" },
  { id: "snapback", name: "Snapback" },
  { id: "dad-hat", name: "Dad Hat" },
  { id: "fitted", name: "Fitted" },
  { id: "bucket", name: "Bucket" },
  { id: "trucker", name: "Trucker" },
];

const MOCK_PRODUCTS: ProductCard[] = [
  { id: "p01", slug: "snapback-acid",    name: "Snapback Acid",    price: 12500, category: "snapback", image: "https://loremflickr.com/600/600/snapback,cap?lock=101",       badge: "Nuevo" },
  { id: "p02", slug: "dad-hat-chaos",   name: "Dad Hat Chaos",    price:  9800, category: "dad-hat",  image: "https://loremflickr.com/600/600/dadhat,cap?lock=102",          badge: null },
  { id: "p03", slug: "fitted-neon",     name: "Fitted Neon",      price: 14200, category: "fitted",   image: "https://loremflickr.com/600/600/fitted,cap?lock=103",          badge: "Hot" },
  { id: "p04", slug: "bucket-skate",    name: "Bucket Skate",     price: 10500, category: "bucket",   image: "https://loremflickr.com/600/600/bucket,hat?lock=104",          badge: null },
  { id: "p05", slug: "trucker-graffiti",name: "Trucker Graffiti", price: 11000, category: "trucker",  image: "https://loremflickr.com/600/600/trucker,cap?lock=105",         badge: null },
  { id: "p06", slug: "snapback-chrome", name: "Snapback Chrome",  price: 13800, category: "snapback", image: "https://loremflickr.com/600/600/snapback,streetwear?lock=106", badge: "Último" },
  { id: "p07", slug: "dad-hat-vintage", name: "Dad Hat Vintage",  price:  9200, category: "dad-hat",  image: "https://loremflickr.com/600/600/vintage,hat?lock=107",         badge: null },
  { id: "p08", slug: "bucket-jungle",   name: "Bucket Jungle",    price: 11500, category: "bucket",   image: "https://loremflickr.com/600/600/jungle,hat?lock=108",          badge: "Nuevo" },
  { id: "p09", slug: "fitted-blackout", name: "Fitted Blackout",  price: 15000, category: "fitted",   image: "https://loremflickr.com/600/600/cap,black?lock=109",           badge: null },
  { id: "p10", slug: "snapback-wild",   name: "Snapback Wild",    price: 12000, category: "snapback", image: "https://loremflickr.com/600/600/cap,colorful?lock=110",        badge: null },
  { id: "p11", slug: "trucker-flames",  name: "Trucker Flames",   price: 10800, category: "trucker",  image: "https://loremflickr.com/600/600/trucker,flames?lock=111",      badge: "Hot" },
  { id: "p12", slug: "dad-hat-smiley",  name: "Dad Hat Smiley",   price:  9500, category: "dad-hat",  image: "https://loremflickr.com/600/600/smiley,hat?lock=112",          badge: null },
];

// ─── Supabase fetch (cacheado) ────────────────────────────────────────────────
const fetchProducts = unstable_cache(
  async () => {
    const tenantId = getTenantId();
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("products")
      .select("id, name, slug, price, compare_at_price, featured, category_id, product_images(url, position)")
      .eq("tenant_id", tenantId)
      .eq("active", true)
      .order("position", { ascending: true })
      .order("created_at", { ascending: false });
    return data ?? [];
  },
  ["catalog-products"],
  { tags: [TAGS.PRODUCTS] }
);

const fetchCategories = unstable_cache(
  async () => {
    const tenantId = getTenantId();
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("categories")
      .select("id, name, slug, position")
      .eq("tenant_id", tenantId)
      .eq("active", true)
      .order("position");
    return data ?? [];
  },
  ["catalog-categories"],
  { tags: [TAGS.CATEGORIES] }
);

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function CatalogoPage() {
  let dbProducts: Awaited<ReturnType<typeof fetchProducts>> = [];
  let dbCategories: Awaited<ReturnType<typeof fetchCategories>> = [];

  try {
    [dbProducts, dbCategories] = await Promise.all([
      fetchProducts(),
      fetchCategories(),
    ]);
  } catch {
    // Supabase no configurado — usar mock
  }

  const useRealData = dbProducts.length > 0 && dbCategories.length > 0;

  // Normalizar datos reales al shape de ProductCard
  const products: ProductCard[] = useRealData
    ? dbProducts.map((p) => {
        const imgs = (p.product_images as { url: string; position: number }[]) ?? [];
        const sorted = [...imgs].sort((a, b) => a.position - b.position);
        const cat = dbCategories.find((c) => c.id === p.category_id);
        return {
          id: p.id,
          slug: p.slug,
          name: p.name,
          price: p.price,
          category: cat?.slug ?? "otros",
          image: sorted[0]?.url ?? "https://loremflickr.com/600/600/cap?lock=0",
          badge: p.featured ? "Nuevo" : p.compare_at_price ? "Oferta" : null,
        };
      })
    : MOCK_PRODUCTS;

  const categories: CategoryItem[] = useRealData
    ? [
        { id: "all", name: "Todo" },
        ...dbCategories.map((c) => ({ id: c.slug, name: c.name })),
      ]
    : MOCK_CATEGORIES;

  return <CatalogoClient products={products} categories={categories} />;
}
