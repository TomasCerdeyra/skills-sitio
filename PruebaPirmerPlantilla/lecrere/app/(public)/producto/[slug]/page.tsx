import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { getTenantId } from "@/lib/tenant";
import { ProductDetailClient } from "@/components/ui/ProductDetailClient";

async function getProduct(slug: string) {
  try {
    const tenantId = getTenantId();
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("products")
      .select(
        `id, name, slug, price, compare_at_price, description,
        product_images (id, url, alt, position),
        product_variants (id, name, sku, price, price_modifier, stock)`
      )
      .eq("tenant_id", tenantId)
      .eq("slug", slug)
      .eq("active", true)
      .single();
    return data;
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
  const product = await getProduct(slug);

  if (!product) notFound();

  return <ProductDetailClient product={product} />;
}
