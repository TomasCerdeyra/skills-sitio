import { createAdminClient } from "@/lib/supabase/admin";
import { getTenantId } from "@/lib/tenant";
import { CatalogClient } from "@/components/ui/CatalogClient";

async function getProducts() {
  try {
    const tenantId = getTenantId();
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("products")
      .select(
        "id, name, slug, price, compare_at_price, category_id, product_images(url, alt, position)"
      )
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
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("categories")
      .select("id, name, slug, position")
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

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-20">
      <header className="mb-16">
        <p className="font-body text-[10px] uppercase tracking-[0.3em] text-brand-secondary mb-4">
          Lecrere
        </p>
        <h1 className="font-display text-5xl lg:text-8xl font-light text-neutral-900 leading-[1.0]">
          Colección.
        </h1>
        {products.length > 0 && (
          <p className="font-body text-neutral-600 mt-4 max-w-md">
            {products.length} {products.length === 1 ? "prenda" : "prendas"}. Telas elegidas, cortes que quedan.
          </p>
        )}
      </header>

      {products.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-display text-3xl font-light text-neutral-400 mb-4">Próximamente.</p>
          <p className="font-body text-sm text-neutral-500">Estamos preparando la colección. Volvé pronto.</p>
        </div>
      ) : (
        <CatalogClient products={products} categories={categories} />
      )}
    </div>
  );
}
