import { createAdminClient } from "@/lib/supabase/admin";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/ui/ProductDetailClient";

// ============================================================
// MOCK DATA — mismos slugs/ids que en catalogo/page.tsx
// ============================================================
const MOCK_PRODUCTS = [
  { id: "mock-1", name: "Vestido midi minimal", slug: "vestido-midi-minimal", price: 65000, compare_at_price: 78000, description: "Corte limpio, caída perfecta. Tela de viscosa liviana con elasticidad natural. Un vestido que se adapta al cuerpo sin esfuerzo.", featured: true, category_id: "mock-cat-1", product_images: [{ id: "mi1", url: "https://images.unsplash.com/photo-1558769132-cb1aea153895?w=800&q=80&auto=format&fit=crop", alt: "Vestido midi minimal", position: 0 }, { id: "mi1b", url: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&q=80&auto=format&fit=crop", alt: "Detalle tela", position: 1 }], product_variants: [{ id: "mv-1a", name: "S", sku: null, price: null, price_modifier: 0, stock: 8 }, { id: "mv-1b", name: "M", sku: null, price: null, price_modifier: 0, stock: 12 }, { id: "mv-1c", name: "L", sku: null, price: null, price_modifier: 0, stock: 10 }, { id: "mv-1d", name: "XL", sku: null, price: null, price_modifier: 0, stock: 6 }] },
  { id: "mock-2", name: "Remera básica mujer", slug: "remera-basica-mujer", price: 28000, compare_at_price: null, description: "El básico que estabas buscando. Tela de algodón peinado 180g, con un toque de elastano para mejor caída.", featured: false, category_id: "mock-cat-1", product_images: [{ id: "mi2", url: "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=800&q=80&auto=format&fit=crop", alt: "Remera básica mujer", position: 0 }], product_variants: [{ id: "mv-2a", name: "S", sku: null, price: null, price_modifier: 0, stock: 20 }, { id: "mv-2b", name: "M", sku: null, price: null, price_modifier: 0, stock: 25 }, { id: "mv-2c", name: "L", sku: null, price: null, price_modifier: 0, stock: 18 }, { id: "mv-2d", name: "XL", sku: null, price: null, price_modifier: 0, stock: 15 }] },
  { id: "mock-3", name: "Buzo oversized mujer", slug: "buzo-oversized-mujer", price: 55000, compare_at_price: null, description: "French terry pesado, fit holgado sin perder estructura. Lavado enzimático para suavidad instantánea.", featured: true, category_id: "mock-cat-1", product_images: [{ id: "mi3", url: "https://picsum.photos/seed/buzo-oversized-mujer/800/1000", alt: "Buzo oversized mujer", position: 0 }], product_variants: [{ id: "mv-3a", name: "XS", sku: null, price: null, price_modifier: 0, stock: 5 }, { id: "mv-3b", name: "S", sku: null, price: null, price_modifier: 0, stock: 12 }, { id: "mv-3c", name: "M", sku: null, price: null, price_modifier: 0, stock: 15 }] },
  { id: "mock-4", name: "Pantalón cargo mujer", slug: "pantalon-cargo-mujer", price: 58000, compare_at_price: null, description: "Silueta relajada con bolsillos laterales funcionales. Cintura elástica con cordón. Gabardina de algodón resistente.", featured: false, category_id: "mock-cat-1", product_images: [{ id: "mi4", url: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80&auto=format&fit=crop", alt: "Pantalón cargo mujer", position: 0 }], product_variants: [{ id: "mv-4a", name: "S", sku: null, price: null, price_modifier: 0, stock: 8 }, { id: "mv-4b", name: "M", sku: null, price: null, price_modifier: 0, stock: 10 }] },
  { id: "mock-5", name: "Remera básica hombre", slug: "remera-basica-hombre", price: 28000, compare_at_price: null, description: "Cuello redondo, manga corta, algodón 100%. La remera que querés tener en todos los colores.", featured: false, category_id: "mock-cat-2", product_images: [{ id: "mi5", url: "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=800&q=80&auto=format&fit=crop", alt: "Remera básica hombre", position: 0 }], product_variants: [{ id: "mv-5a", name: "S", sku: null, price: null, price_modifier: 0, stock: 15 }, { id: "mv-5b", name: "M", sku: null, price: null, price_modifier: 0, stock: 20 }, { id: "mv-5c", name: "L", sku: null, price: null, price_modifier: 0, stock: 18 }] },
  { id: "mock-6", name: "Jean recto hombre", slug: "jean-recto-hombre", price: 72000, compare_at_price: 85000, description: "Corte recto clásico actualizado. Denim 12oz stonewashed de origen nacional.", featured: false, category_id: "mock-cat-2", product_images: [{ id: "mi6", url: "https://picsum.photos/seed/jean-recto-hombre/800/1000", alt: "Jean recto hombre", position: 0 }], product_variants: [{ id: "mv-6a", name: "S", sku: null, price: null, price_modifier: 0, stock: 6 }, { id: "mv-6b", name: "M", sku: null, price: null, price_modifier: 0, stock: 10 }] },
  { id: "mock-7", name: "Camisa de lino hombre", slug: "camisa-lino-hombre", price: 68000, compare_at_price: null, description: "Lino 100% nacional, corte regular. Costura visible en color contrastante. Para el verano o para el trabajo.", featured: true, category_id: "mock-cat-2", product_images: [{ id: "mi7", url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop", alt: "Camisa de lino", position: 0 }, { id: "mi7b", url: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&q=80&auto=format&fit=crop", alt: "Detalle lino", position: 1 }], product_variants: [{ id: "mv-7a", name: "S", sku: null, price: null, price_modifier: 0, stock: 8 }, { id: "mv-7b", name: "M", sku: null, price: null, price_modifier: 0, stock: 14 }, { id: "mv-7c", name: "L", sku: null, price: null, price_modifier: 0, stock: 10 }, { id: "mv-7d", name: "XL", sku: null, price: null, price_modifier: 0, stock: 5 }] },
  { id: "mock-8", name: "Buzo unisex negro", slug: "buzo-unisex-negro", price: 55000, compare_at_price: null, description: "El clásico de los clásicos en versión definitiva. French terry pesado, fit holgado. Negro que no se destiñe.", featured: true, category_id: "mock-cat-3", product_images: [{ id: "mi8", url: "https://picsum.photos/seed/buzo-unisex-negro/800/1000", alt: "Buzo unisex negro", position: 0 }], product_variants: [{ id: "mv-8a", name: "XS", sku: null, price: null, price_modifier: 0, stock: 5 }, { id: "mv-8b", name: "S", sku: null, price: null, price_modifier: 0, stock: 12 }, { id: "mv-8c", name: "M", sku: null, price: null, price_modifier: 0, stock: 18 }, { id: "mv-8d", name: "L", sku: null, price: null, price_modifier: 0, stock: 2 }, { id: "mv-8e", name: "XL", sku: null, price: null, price_modifier: 0, stock: 0 }] },
  { id: "mock-9", name: "Campera de jean unisex", slug: "campera-jean-unisex", price: 95000, compare_at_price: null, description: "Denim 12oz rigid. Corte recto con hombros bien definidos. La campera que acompaña cualquier outfit.", featured: true, category_id: "mock-cat-3", product_images: [{ id: "mi9", url: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80&auto=format&fit=crop", alt: "Campera de jean", position: 0 }, { id: "mi9b", url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop", alt: "Detalle campera", position: 1 }], product_variants: [{ id: "mv-9a", name: "S", sku: null, price: null, price_modifier: 0, stock: 8 }, { id: "mv-9b", name: "M", sku: null, price: null, price_modifier: 0, stock: 10 }] },
  { id: "mock-10", name: "Gorro lana oversize", slug: "gorro-lana-oversize", price: 18000, compare_at_price: null, description: "Punto grueso, caída deliberadamente relajada. Mezcla de lana y acrílico.", featured: false, category_id: "mock-cat-4", product_images: [{ id: "mi10", url: "https://picsum.photos/seed/gorro-lana-oversize/600/600", alt: "Gorro lana", position: 0 }], product_variants: [] },
  { id: "mock-11", name: "Bolso tote canvas", slug: "bolso-tote-canvas", price: 22000, compare_at_price: null, description: "Canvas 100% algodón, costuras dobles, asa corta + asa larga.", featured: false, category_id: "mock-cat-4", product_images: [{ id: "mi11", url: "https://picsum.photos/seed/bolso-tote-canvas/600/600", alt: "Bolso tote", position: 0 }], product_variants: [] },
  { id: "mock-12", name: "Saco oversized colección", slug: "saco-oversized-coleccion", price: 115000, compare_at_price: null, description: "Nuestro saco estrella de la nueva colección. Paño de lana 70%, corte masculino relajado.", featured: true, category_id: "mock-cat-5", product_images: [{ id: "mi12", url: "https://images.unsplash.com/photo-1558769132-cb1aea153895?w=800&q=80&auto=format&fit=crop", alt: "Saco oversized", position: 0 }, { id: "mi12b", url: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&q=80&auto=format&fit=crop", alt: "Detalle paño", position: 1 }], product_variants: [{ id: "mv-12a", name: "XS/S", sku: null, price: null, price_modifier: 0, stock: 4 }, { id: "mv-12b", name: "M/L", sku: null, price: null, price_modifier: 0, stock: 6 }, { id: "mv-12c", name: "XL/XXL", sku: null, price: null, price_modifier: 0, stock: 3 }] },
];

async function getProduct(slug: string) {
  try {
    const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
    if (!tenantId) return null;
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("products")
      .select(
        "id, name, slug, price, compare_at_price, description, featured, category_id, product_images (id, url, alt, position), product_variants (id, name, sku, price, price_modifier, stock)"
      )
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
  params: Promise<{ slug: string }>; // ⚠️ Promise en Next.js 15+
}) {
  const { slug } = await params; // ⚠️ await params — NO params.slug directo

  const dbProduct = await getProduct(slug);
  const product =
    dbProduct ??
    (MOCK_PRODUCTS.find((p) => p.slug === slug) as (typeof MOCK_PRODUCTS)[0] | undefined);

  if (!product) notFound();

  return <ProductDetailClient product={product} />;
}
