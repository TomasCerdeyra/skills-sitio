import { createAdminClient } from "@/lib/supabase/admin";
import { CatalogClient } from "./CatalogClient";

// ============================================================
// MOCK DATA — celulares con imágenes curadas de Unsplash
// ============================================================
const MOCK_CATEGORIES = [
  { id: "mock-cat-1", name: "iPhone", slug: "iphone", position: 0 },
  { id: "mock-cat-2", name: "Samsung", slug: "samsung", position: 1 },
  { id: "mock-cat-3", name: "Motorola", slug: "motorola", position: 2 },
  { id: "mock-cat-4", name: "Xiaomi", slug: "xiaomi", position: 3 },
];

const MOCK_PRODUCTS = [
  {
    id: "mock-1",
    name: "iPhone 15 Pro Max",
    slug: "iphone-15-pro-max",
    price: 2150000,
    compare_at_price: 2350000,
    description: "Titanio. Chip A17 Pro. Cámara de 48 MP. 256 GB.",
    featured: true,
    category_id: "mock-cat-1",
    product_images: [{ url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80&auto=format&fit=crop", alt: "iPhone 15 Pro Max", position: 0 }],
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
    product_images: [{ url: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80&auto=format&fit=crop", alt: "Samsung Galaxy S24 Ultra", position: 0 }],
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
    product_images: [{ url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80&auto=format&fit=crop", alt: "Motorola Edge 50 Pro", position: 0 }],
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
    description: "Chip A15 Bionic. 12 MP. Pantalla Super Retina XDR. 128 GB.",
    featured: false,
    category_id: "mock-cat-1",
    product_images: [{ url: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&q=80&auto=format&fit=crop", alt: "iPhone 14", position: 0 }],
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
    product_images: [{ url: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80&auto=format&fit=crop", alt: "Samsung Galaxy A55", position: 0 }],
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
    product_images: [{ url: "https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=800&q=80&auto=format&fit=crop", alt: "Motorola Moto G84", position: 0 }],
    product_variants: [
      { id: "v9", name: "256 GB", price: 320000, price_modifier: 0, stock: 15 },
    ],
  },
  {
    id: "mock-7",
    name: "Xiaomi Redmi Note 13 Pro",
    slug: "xiaomi-redmi-note-13-pro",
    price: 420000,
    compare_at_price: null,
    description: "Pantalla AMOLED 120 Hz. Cámara 200 MP. Carga 67W. 256 GB.",
    featured: false,
    category_id: "mock-cat-4",
    product_images: [{ url: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&q=80&auto=format&fit=crop", alt: "Xiaomi Redmi Note 13 Pro", position: 0 }],
    product_variants: [
      { id: "v10", name: "256 GB", price: 420000, price_modifier: 0, stock: 10 },
    ],
  },
  {
    id: "mock-8",
    name: "iPhone 13",
    slug: "iphone-13",
    price: 980000,
    compare_at_price: 1100000,
    description: "Chip A15 Bionic. Cámara dual 12 MP. Pantalla OLED. 128 GB.",
    featured: false,
    category_id: "mock-cat-1",
    product_images: [{ url: "https://images.unsplash.com/photo-1632158338861-0f1edda5d6ce?w=800&q=80&auto=format&fit=crop", alt: "iPhone 13", position: 0 }],
    product_variants: [
      { id: "v11", name: "128 GB", price: 980000, price_modifier: 0, stock: 8 },
      { id: "v12", name: "256 GB", price: 1150000, price_modifier: 0, stock: 3 },
    ],
  },
  {
    id: "mock-9",
    name: "Samsung Galaxy S23",
    slug: "samsung-galaxy-s23",
    price: 1250000,
    compare_at_price: null,
    description: "Chip Snapdragon 8 Gen 2. Cámara 50 MP. Pantalla 6.1\". 128 GB.",
    featured: false,
    category_id: "mock-cat-2",
    product_images: [{ url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80&auto=format&fit=crop", alt: "Samsung Galaxy S23", position: 0 }],
    product_variants: [
      { id: "v13", name: "128 GB", price: 1250000, price_modifier: 0, stock: 5 },
    ],
  },
  {
    id: "mock-10",
    name: "Motorola Moto G54",
    slug: "motorola-moto-g54",
    price: 240000,
    compare_at_price: null,
    description: "Pantalla IPS LCD 120 Hz. Cámara 50 MP. Batería 5000 mAh.",
    featured: false,
    category_id: "mock-cat-3",
    product_images: [{ url: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80&auto=format&fit=crop", alt: "Motorola Moto G54", position: 0 }],
    product_variants: [
      { id: "v14", name: "256 GB", price: 240000, price_modifier: 0, stock: 18 },
    ],
  },
];

async function getProducts() {
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
    .order("created_at", { ascending: false })
    .limit(200);
  return data ?? [];
}

async function getCategories() {
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
  if (!tenantId) return [];
  const supabaseAdmin = createAdminClient();
  const { data } = await supabaseAdmin
    .from("categories")
    .select(`id, name, slug, position`)
    .eq("tenant_id", tenantId)
    .eq("active", true)
    .order("position");
  return data ?? [];
}

export default async function CatalogPage() {
  let products: any[] = [];
  let categories: any[] = [];

  try {
    [products, categories] = await Promise.all([getProducts(), getCategories()]);
  } catch {}

  const useRealData = products.length > 0 && categories.length > 0;
  const displayProducts = useRealData ? products : MOCK_PRODUCTS;
  const displayCategories = useRealData ? categories : MOCK_CATEGORIES;

  return (
    <div className="min-h-screen pt-20">
      {/* Header de la página */}
      <div className="bg-neutral-900 py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-brand-primary mb-2">
            Todos los modelos
          </p>
          <h1 className="font-display text-4xl lg:text-5xl font-extrabold text-white">
            Catálogo
          </h1>
          <p className="font-body text-neutral-400 mt-3 text-base">
            {displayProducts.length} equipos disponibles · Todos originales y con garantía
          </p>
        </div>
      </div>

      {/* Catálogo interactivo */}
      <CatalogClient products={displayProducts} categories={displayCategories} />
    </div>
  );
}
