import { createAdminClient } from "@/lib/supabase/admin";
import { CatalogClient } from "@/components/ui/CatalogClient";

// ============================================================
// MOCK DATA — fallback cuando la DB no está configurada
// IMPORTANTE: category_id deben coincidir con los MOCK_CATEGORIES
// ============================================================
const MOCK_PRODUCTS = [
  {
    id: "mock-1",
    name: "Vestido midi minimal",
    slug: "vestido-midi-minimal",
    price: 65000,
    compare_at_price: 78000,
    description: "Corte limpio, caída perfecta. Un vestido que se adapta al cuerpo sin esfuerzo.",
    featured: true,
    category_id: "mock-cat-1",
    product_images: [
      { url: "https://images.unsplash.com/photo-1558769132-cb1aea153895?w=800&q=80&auto=format&fit=crop", alt: "Vestido midi minimal", position: 0 },
    ],
    product_variants: [
      { id: "mv-1a", name: "S", sku: null, price: null, price_modifier: 0, stock: 8 },
      { id: "mv-1b", name: "M", sku: null, price: null, price_modifier: 0, stock: 12 },
      { id: "mv-1c", name: "L", sku: null, price: null, price_modifier: 0, stock: 10 },
      { id: "mv-1d", name: "XL", sku: null, price: null, price_modifier: 0, stock: 6 },
    ],
  },
  {
    id: "mock-2",
    name: "Remera básica mujer",
    slug: "remera-basica-mujer",
    price: 28000,
    compare_at_price: null,
    description: "El básico que estabas buscando. Algodón peinado 180g.",
    featured: false,
    category_id: "mock-cat-1",
    product_images: [
      { url: "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=800&q=80&auto=format&fit=crop", alt: "Remera básica mujer", position: 0 },
    ],
    product_variants: [
      { id: "mv-2a", name: "S", sku: null, price: null, price_modifier: 0, stock: 20 },
      { id: "mv-2b", name: "M", sku: null, price: null, price_modifier: 0, stock: 25 },
      { id: "mv-2c", name: "L", sku: null, price: null, price_modifier: 0, stock: 18 },
    ],
  },
  {
    id: "mock-3",
    name: "Buzo oversized mujer",
    slug: "buzo-oversized-mujer",
    price: 55000,
    compare_at_price: null,
    description: "French terry pesado, fit holgado sin perder estructura.",
    featured: true,
    category_id: "mock-cat-1",
    product_images: [
      { url: "https://picsum.photos/seed/buzo-oversized-mujer/800/1000", alt: "Buzo oversized mujer", position: 0 },
    ],
    product_variants: [
      { id: "mv-3a", name: "XS", sku: null, price: null, price_modifier: 0, stock: 5 },
      { id: "mv-3b", name: "S", sku: null, price: null, price_modifier: 0, stock: 12 },
      { id: "mv-3c", name: "M", sku: null, price: null, price_modifier: 0, stock: 15 },
    ],
  },
  {
    id: "mock-4",
    name: "Pantalón cargo mujer",
    slug: "pantalon-cargo-mujer",
    price: 58000,
    compare_at_price: null,
    description: "Silueta relajada con bolsillos laterales funcionales.",
    featured: false,
    category_id: "mock-cat-1",
    product_images: [
      { url: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80&auto=format&fit=crop", alt: "Pantalón cargo mujer", position: 0 },
    ],
    product_variants: [
      { id: "mv-4a", name: "S", sku: null, price: null, price_modifier: 0, stock: 8 },
      { id: "mv-4b", name: "M", sku: null, price: null, price_modifier: 0, stock: 10 },
    ],
  },
  {
    id: "mock-5",
    name: "Remera básica hombre",
    slug: "remera-basica-hombre",
    price: 28000,
    compare_at_price: null,
    description: "Cuello redondo, manga corta, algodón 100%.",
    featured: false,
    category_id: "mock-cat-2",
    product_images: [
      { url: "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=800&q=80&auto=format&fit=crop", alt: "Remera básica hombre", position: 0 },
    ],
    product_variants: [
      { id: "mv-5a", name: "S", sku: null, price: null, price_modifier: 0, stock: 15 },
      { id: "mv-5b", name: "M", sku: null, price: null, price_modifier: 0, stock: 20 },
      { id: "mv-5c", name: "L", sku: null, price: null, price_modifier: 0, stock: 18 },
    ],
  },
  {
    id: "mock-6",
    name: "Jean recto hombre",
    slug: "jean-recto-hombre",
    price: 72000,
    compare_at_price: 85000,
    description: "Corte recto clásico actualizado. Denim 12oz stonewashed.",
    featured: false,
    category_id: "mock-cat-2",
    product_images: [
      { url: "https://picsum.photos/seed/jean-recto-hombre/800/1000", alt: "Jean recto hombre", position: 0 },
    ],
    product_variants: [
      { id: "mv-6a", name: "S", sku: null, price: null, price_modifier: 0, stock: 6 },
      { id: "mv-6b", name: "M", sku: null, price: null, price_modifier: 0, stock: 10 },
    ],
  },
  {
    id: "mock-7",
    name: "Camisa de lino hombre",
    slug: "camisa-lino-hombre",
    price: 68000,
    compare_at_price: null,
    description: "Lino 100% nacional, costura visible en color contrastante.",
    featured: true,
    category_id: "mock-cat-2",
    product_images: [
      { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop", alt: "Camisa de lino hombre", position: 0 },
    ],
    product_variants: [
      { id: "mv-7a", name: "S", sku: null, price: null, price_modifier: 0, stock: 8 },
      { id: "mv-7b", name: "M", sku: null, price: null, price_modifier: 0, stock: 14 },
      { id: "mv-7c", name: "L", sku: null, price: null, price_modifier: 0, stock: 10 },
    ],
  },
  {
    id: "mock-8",
    name: "Buzo unisex negro",
    slug: "buzo-unisex-negro",
    price: 55000,
    compare_at_price: null,
    description: "French terry pesado, fit holgado. Negro que no se destiñe.",
    featured: true,
    category_id: "mock-cat-3",
    product_images: [
      { url: "https://picsum.photos/seed/buzo-unisex-negro/800/1000", alt: "Buzo unisex negro", position: 0 },
    ],
    product_variants: [
      { id: "mv-8a", name: "XS", sku: null, price: null, price_modifier: 0, stock: 5 },
      { id: "mv-8b", name: "S", sku: null, price: null, price_modifier: 0, stock: 12 },
      { id: "mv-8c", name: "M", sku: null, price: null, price_modifier: 0, stock: 18 },
      { id: "mv-8d", name: "L", sku: null, price: null, price_modifier: 0, stock: 2 },
    ],
  },
  {
    id: "mock-9",
    name: "Campera de jean unisex",
    slug: "campera-jean-unisex",
    price: 95000,
    compare_at_price: null,
    description: "Denim 12oz rigid. Corte recto con hombros bien definidos.",
    featured: true,
    category_id: "mock-cat-3",
    product_images: [
      { url: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80&auto=format&fit=crop", alt: "Campera de jean", position: 0 },
    ],
    product_variants: [
      { id: "mv-9a", name: "S", sku: null, price: null, price_modifier: 0, stock: 8 },
      { id: "mv-9b", name: "M", sku: null, price: null, price_modifier: 0, stock: 10 },
    ],
  },
  {
    id: "mock-10",
    name: "Gorro lana oversize",
    slug: "gorro-lana-oversize",
    price: 18000,
    compare_at_price: null,
    description: "Punto grueso, caída deliberadamente relajada.",
    featured: false,
    category_id: "mock-cat-4",
    product_images: [
      { url: "https://picsum.photos/seed/gorro-lana-oversize/600/600", alt: "Gorro lana oversize", position: 0 },
    ],
    product_variants: [],
  },
  {
    id: "mock-11",
    name: "Bolso tote canvas",
    slug: "bolso-tote-canvas",
    price: 22000,
    compare_at_price: null,
    description: "Canvas 100% algodón, costuras dobles, asa corta + asa larga.",
    featured: false,
    category_id: "mock-cat-4",
    product_images: [
      { url: "https://picsum.photos/seed/bolso-tote-canvas/600/600", alt: "Bolso tote canvas", position: 0 },
    ],
    product_variants: [],
  },
  {
    id: "mock-12",
    name: "Saco oversized colección",
    slug: "saco-oversized-coleccion",
    price: 115000,
    compare_at_price: null,
    description: "Paño de lana 70%, corte masculino relajado para cualquier género.",
    featured: true,
    category_id: "mock-cat-5",
    product_images: [
      { url: "https://images.unsplash.com/photo-1558769132-cb1aea153895?w=800&q=80&auto=format&fit=crop", alt: "Saco oversized colección", position: 0 },
    ],
    product_variants: [
      { id: "mv-12a", name: "XS/S", sku: null, price: null, price_modifier: 0, stock: 4 },
      { id: "mv-12b", name: "M/L", sku: null, price: null, price_modifier: 0, stock: 6 },
      { id: "mv-12c", name: "XL/XXL", sku: null, price: null, price_modifier: 0, stock: 3 },
    ],
  },
];

const MOCK_CATEGORIES = [
  { id: "mock-cat-1", name: "Mujer", slug: "mujer", position: 0, subcategories: [] },
  { id: "mock-cat-2", name: "Hombre", slug: "hombre", position: 1, subcategories: [] },
  { id: "mock-cat-3", name: "Unisex", slug: "unisex", position: 2, subcategories: [] },
  { id: "mock-cat-4", name: "Accesorios", slug: "accesorios", position: 3, subcategories: [] },
  { id: "mock-cat-5", name: "Colección Nueva", slug: "coleccion-nueva", position: 4, subcategories: [] },
];

async function getProducts() {
  try {
    const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
    if (!tenantId) return [];
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("products")
      .select(
        "id, name, slug, price, compare_at_price, description, featured, category_id, product_images (id, url, alt, position), product_variants (id, name, sku, price, price_modifier, stock)"
      )
      .eq("tenant_id", tenantId)
      .eq("active", true)
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });
    // sin .limit() — Plan Empresa catálogo ilimitado
    return data ?? [];
  } catch {
    return [];
  }
}

async function getCategories() {
  try {
    const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
    if (!tenantId) return [];
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("categories")
      .select("id, name, slug, position, subcategories (id, name, slug, position)")
      .eq("tenant_id", tenantId)
      .eq("active", true)
      .order("position");
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function CatalogPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  // Flag único para evitar filtros vacíos por mezcla de fuentes
  const useRealData = products.length > 0 && categories.length > 0;
  const displayProducts = useRealData ? products : MOCK_PRODUCTS;
  const displayCategories = useRealData ? categories : MOCK_CATEGORIES;

  return (
    <CatalogClient products={displayProducts} categories={displayCategories} />
  );
}
