import { createAdminClient } from "@/lib/supabase/admin";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/ui/ProductDetailClient";
import Link from "next/link";

// ============================================================
// MOCK DATA — mismo contenido que catalogo/page.tsx
// ============================================================
const MOCK_PRODUCTS = [
  {
    id: "mock-1",
    name: "iPhone 15 Pro Max",
    slug: "iphone-15-pro-max",
    price: 2150000,
    compare_at_price: 2350000,
    description: "El iPhone más avanzado con chip A17 Pro, carcasa de titanio aeroespacial, sistema de cámara Pro de 48 MP con zoom óptico 5x y la pantalla más brillante de la historia. Batería que dura todo el día.",
    featured: true,
    category_id: "mock-cat-1",
    product_images: [{ id: "i1", url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80&auto=format&fit=crop", alt: "iPhone 15 Pro Max", position: 0 }],
    product_variants: [
      { id: "v1", name: "256 GB", sku: null, price: 2150000, price_modifier: 0, stock: 5 },
      { id: "v2", name: "512 GB", sku: null, price: 2480000, price_modifier: 0, stock: 3 },
      { id: "v2b", name: "1 TB", sku: null, price: 2780000, price_modifier: 0, stock: 1 },
    ],
  },
  {
    id: "mock-2",
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-galaxy-s24-ultra",
    price: 1890000,
    compare_at_price: null,
    description: "Con S Pen integrado, pantalla Dynamic AMOLED 2X de 6.8\", chip Snapdragon 8 Gen 3 y sistema de cámara de 200 MP. El Galaxy más potente para quienes necesitan lo mejor.",
    featured: true,
    category_id: "mock-cat-2",
    product_images: [{ id: "i2", url: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80&auto=format&fit=crop", alt: "Samsung Galaxy S24 Ultra", position: 0 }],
    product_variants: [
      { id: "v3", name: "256 GB", sku: null, price: 1890000, price_modifier: 0, stock: 8 },
      { id: "v4", name: "512 GB", sku: null, price: 2100000, price_modifier: 0, stock: 4 },
    ],
  },
  {
    id: "mock-3",
    name: "Motorola Edge 50 Pro",
    slug: "motorola-edge-50-pro",
    price: 780000,
    compare_at_price: null,
    description: "La potencia de las pantallas pOLED con 144 Hz de refresco, cámara con OIS de 50 MP y carga ultra rápida de 125W. Un flagship al alcance de todos.",
    featured: true,
    category_id: "mock-cat-3",
    product_images: [{ id: "i3", url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80&auto=format&fit=crop", alt: "Motorola Edge 50 Pro", position: 0 }],
    product_variants: [
      { id: "v5", name: "256 GB", sku: null, price: 780000, price_modifier: 0, stock: 12 },
    ],
  },
  {
    id: "mock-4",
    name: "iPhone 14",
    slug: "iphone-14",
    price: 1290000,
    compare_at_price: 1450000,
    description: "Chip A15 Bionic de alta eficiencia, pantalla Super Retina XDR de 6.1\", cámara de 12 MP con modo Acción y crash detection. Potencia Apple en su máxima expresión.",
    featured: false,
    category_id: "mock-cat-1",
    product_images: [{ id: "i4", url: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&q=80&auto=format&fit=crop", alt: "iPhone 14", position: 0 }],
    product_variants: [
      { id: "v6", name: "128 GB", sku: null, price: 1290000, price_modifier: 0, stock: 6 },
      { id: "v7", name: "256 GB", sku: null, price: 1480000, price_modifier: 0, stock: 4 },
    ],
  },
  {
    id: "mock-5",
    name: "Samsung Galaxy A55",
    slug: "samsung-galaxy-a55",
    price: 490000,
    compare_at_price: null,
    description: "Pantalla Super AMOLED de 120 Hz, triple cámara de 50 MP, procesador Exynos 1480 y resistencia IP67. La gama media que supera expectativas.",
    featured: false,
    category_id: "mock-cat-2",
    product_images: [{ id: "i5", url: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80&auto=format&fit=crop", alt: "Samsung Galaxy A55", position: 0 }],
    product_variants: [
      { id: "v8", name: "128 GB", sku: null, price: 490000, price_modifier: 0, stock: 20 },
    ],
  },
  {
    id: "mock-6",
    name: "Motorola Moto G84",
    slug: "motorola-moto-g84",
    price: 320000,
    compare_at_price: null,
    description: "Pantalla pOLED de 120 Hz, cámara de 50 MP con estabilización óptica y batería de 5000 mAh. Rendimiento premium sin pagar de más.",
    featured: false,
    category_id: "mock-cat-3",
    product_images: [{ id: "i6", url: "https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=800&q=80&auto=format&fit=crop", alt: "Motorola Moto G84", position: 0 }],
    product_variants: [
      { id: "v9", name: "256 GB", sku: null, price: 320000, price_modifier: 0, stock: 15 },
    ],
  },
  {
    id: "mock-7",
    name: "Xiaomi Redmi Note 13 Pro",
    slug: "xiaomi-redmi-note-13-pro",
    price: 420000,
    compare_at_price: null,
    description: "Cámara de 200 MP, pantalla AMOLED FHD+ de 120 Hz, Snapdragon 7s Gen 2 y carga de 67W. La foto más detallada en gama media.",
    featured: false,
    category_id: "mock-cat-4",
    product_images: [{ id: "i7", url: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&q=80&auto=format&fit=crop", alt: "Xiaomi Redmi Note 13 Pro", position: 0 }],
    product_variants: [
      { id: "v10", name: "256 GB", sku: null, price: 420000, price_modifier: 0, stock: 10 },
    ],
  },
  {
    id: "mock-8",
    name: "iPhone 13",
    slug: "iphone-13",
    price: 980000,
    compare_at_price: 1100000,
    description: "Chip A15 Bionic, pantalla OLED Super Retina XDR de 6.1\", sistema de cámara dual de 12 MP con modo cinematográfico y batería de hasta 19 horas de video.",
    featured: false,
    category_id: "mock-cat-1",
    product_images: [{ id: "i8", url: "https://images.unsplash.com/photo-1632158338861-0f1edda5d6ce?w=800&q=80&auto=format&fit=crop", alt: "iPhone 13", position: 0 }],
    product_variants: [
      { id: "v11", name: "128 GB", sku: null, price: 980000, price_modifier: 0, stock: 8 },
      { id: "v12", name: "256 GB", sku: null, price: 1150000, price_modifier: 0, stock: 3 },
    ],
  },
  {
    id: "mock-9",
    name: "Samsung Galaxy S23",
    slug: "samsung-galaxy-s23",
    price: 1250000,
    compare_at_price: null,
    description: "Snapdragon 8 Gen 2, triple cámara de 50 MP, pantalla Dynamic AMOLED 2X de 120 Hz. El Galaxy compacto de alta gama.",
    featured: false,
    category_id: "mock-cat-2",
    product_images: [{ id: "i9", url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80&auto=format&fit=crop", alt: "Samsung Galaxy S23", position: 0 }],
    product_variants: [
      { id: "v13", name: "128 GB", sku: null, price: 1250000, price_modifier: 0, stock: 5 },
    ],
  },
  {
    id: "mock-10",
    name: "Motorola Moto G54",
    slug: "motorola-moto-g54",
    price: 240000,
    compare_at_price: null,
    description: "Pantalla IPS LCD de 120 Hz, cámara de 50 MP, Dimensity 7020 y batería de 5000 mAh con carga de 33W. El equilibrio perfecto.",
    featured: false,
    category_id: "mock-cat-3",
    product_images: [{ id: "i10", url: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80&auto=format&fit=crop", alt: "Motorola Moto G54", position: 0 }],
    product_variants: [
      { id: "v14", name: "256 GB", sku: null, price: 240000, price_modifier: 0, stock: 18 },
    ],
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

  return (
    <div className="bg-neutral-50 min-h-screen pt-2">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8 pt-24 pb-0">
        <nav className="flex items-center gap-2 font-body text-xs text-neutral-400 mb-0">
          <Link href="/" className="hover:text-brand-primary transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/catalogo" className="hover:text-brand-primary transition-colors">Catálogo</Link>
          <span>/</span>
          <span className="text-neutral-600">{product.name}</span>
        </nav>
      </div>

      <ProductDetailClient product={product} />
    </div>
  );
}
