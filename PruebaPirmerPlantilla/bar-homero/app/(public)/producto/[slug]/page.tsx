import { createAdminClient } from "@/lib/supabase/admin";
import { getTenantId } from "@/lib/tenant";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/ui/ProductDetailClient";

const MOCK_PRODUCTS: Record<string, object> = {
  "ipa-artesanal": {
    id: "p2", name: "IPA Artesanal", slug: "ipa-artesanal", price: 1600,
    description: "Lupulada e intensa, con notas de pomelo y pino. Elaborada en microbrewery local con maltas cuidadosamente seleccionadas.",
    category_id: "c2",
    product_images: [
      { id: "i1", url: "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=800&q=80", alt: "IPA Artesanal", position: 0 },
    ],
    product_variants: [
      { id: "v1", name: "Pinta (500ml)", price: 1600, price_modifier: 0, stock: 20 },
      { id: "v2", name: "Media Pinta (250ml)", price: 900, price_modifier: -700, stock: 20 },
    ],
  },
  "aperol-spritz": {
    id: "p4", name: "Aperol Spritz", slug: "aperol-spritz", price: 2200,
    description: "Aperol, prosecco italiano y un toque de soda con rodaja de naranja. El aperitivo que conquistó el mundo.",
    category_id: "c3",
    product_images: [
      { id: "i2", url: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=800&q=80", alt: "Aperol Spritz", position: 0 },
    ],
    product_variants: [],
  },
  "tabla-fiambres": {
    id: "p7", name: "Tabla de Fiambres", slug: "tabla-fiambres", price: 4500,
    description: "Selección de quesos artesanales, fiambres curados, aceitunas marinadas, pickles y pan de campo.",
    category_id: "c4",
    product_images: [
      { id: "i3", url: "https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?auto=format&fit=crop&w=800&q=80", alt: "Tabla de Fiambres", position: 0 },
    ],
    product_variants: [
      { id: "v5", name: "Para 2 personas", price: 4500, price_modifier: 0, stock: 10 },
      { id: "v6", name: "Para 4 personas", price: 7500, price_modifier: 3000, stock: 10 },
    ],
  },
};

async function getProduct(slug: string) {
  try {
    const tenantId = getTenantId();
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("products")
      .select(`
        id, name, slug, price, compare_at_price, description, category_id,
        product_images (id, url, alt, position),
        product_variants (id, name, sku, price, price_modifier, stock)
      `)
      .eq("tenant_id", tenantId)
      .eq("slug", slug)
      .eq("active", true)
      .single();
    if (data) return data;
  } catch {}
  return MOCK_PRODUCTS[slug] ?? null;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      <ProductDetailClient product={product as Parameters<typeof ProductDetailClient>[0]["product"]} />
    </div>
  );
}
