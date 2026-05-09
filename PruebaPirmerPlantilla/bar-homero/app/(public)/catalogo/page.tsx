import { createAdminClient } from "@/lib/supabase/admin";
import { getTenantId } from "@/lib/tenant";
import CatalogClient from "@/components/ui/CatalogClient";

const MOCK_CATEGORIES = [
  { id: "c1", name: "Bebidas", slug: "bebidas" },
  { id: "c2", name: "Cervezas", slug: "cervezas" },
  { id: "c3", name: "Tragos", slug: "tragos" },
  { id: "c4", name: "Picadas y Comidas", slug: "picadas-comidas" },
  { id: "c5", name: "Vinos", slug: "vinos" },
];

const MOCK_PRODUCTS = [
  { id: "p1", name: "Fernet con Coca", slug: "fernet-con-coca", price: 1800, category_id: "c1", description: "El clásico de siempre. Con Coca-Cola, hielo y limón.", product_images: [{ url: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=800&q=80", alt: "Fernet con Coca" }], product_variants: [] },
  { id: "p2", name: "IPA Artesanal", slug: "ipa-artesanal", price: 1600, category_id: "c2", description: "Lupulada e intensa. De producción local.", product_images: [{ url: "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=800&q=80", alt: "IPA" }], product_variants: [{ id: "v1", name: "Pinta", stock: 20 }, { id: "v2", name: "Media Pinta", stock: 20 }] },
  { id: "p3", name: "Rubia Artesanal", slug: "rubia-artesanal", price: 1400, category_id: "c2", description: "Suave y refrescante. Perfecta para el calor.", product_images: [{ url: "https://images.unsplash.com/photo-1565718822353-06b7a5f7c9e0?auto=format&fit=crop&w=800&q=80", alt: "Cerveza rubia" }], product_variants: [{ id: "v3", name: "Pinta", stock: 15 }, { id: "v4", name: "Media Pinta", stock: 15 }] },
  { id: "p4", name: "Aperol Spritz", slug: "aperol-spritz", price: 2200, category_id: "c3", description: "Aperol, prosecco y un toque de soda. El trago del momento.", product_images: [{ url: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=800&q=80", alt: "Aperol Spritz" }], product_variants: [] },
  { id: "p5", name: "Daiquiri de Frutilla", slug: "daiquiri-frutilla", price: 2000, category_id: "c3", description: "Ron blanco, frutillas frescas y limón. Bien frío.", product_images: [{ url: "https://images.unsplash.com/photo-1551751299-1b51cab2694c?auto=format&fit=crop&w=800&q=80", alt: "Daiquiri" }], product_variants: [] },
  { id: "p6", name: "Negroni", slug: "negroni", price: 2400, category_id: "c3", description: "Gin, Campari y vermouth rosso. Para los que saben.", product_images: [{ url: "https://images.unsplash.com/photo-1436935439985-196e1f2f1c9e?auto=format&fit=crop&w=800&q=80", alt: "Negroni" }], product_variants: [] },
  { id: "p7", name: "Tabla de Fiambres", slug: "tabla-fiambres", price: 4500, category_id: "c4", description: "Para compartir. Selección de quesos, fiambres, aceitunas y pan.", product_images: [{ url: "https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?auto=format&fit=crop&w=800&q=80", alt: "Tabla de fiambres" }], product_variants: [{ id: "v5", name: "Para 2", stock: 10 }, { id: "v6", name: "Para 4", stock: 10 }] },
  { id: "p8", name: "Papas Fritas", slug: "papas-fritas", price: 1400, category_id: "c4", description: "Crocantes por fuera, tiernas por dentro. Con mayonesa casera.", product_images: [{ url: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80", alt: "Papas fritas" }], product_variants: [] },
  { id: "p9", name: "Malbec Copa", slug: "malbec-copa", price: 1600, category_id: "c5", description: "Mendoza. Cuerpo pleno, taninos suaves.", product_images: [{ url: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80", alt: "Copa de vino tinto" }], product_variants: [] },
  { id: "p10", name: "Sauvignon Blanc Copa", slug: "sauvignon-blanc-copa", price: 1600, category_id: "c5", description: "Fresco y afrutado. Ideal para las noches de verano.", product_images: [{ url: "https://images.unsplash.com/photo-1474722883778-792e7990302f?auto=format&fit=crop&w=800&q=80", alt: "Copa de vino blanco" }], product_variants: [] },
];

async function getProducts() {
  try {
    const tenantId = getTenantId();
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("products")
      .select(`
        id, name, slug, price, compare_at_price, description, category_id,
        product_images (id, url, alt, position),
        product_variants (id, name, price, price_modifier, stock)
      `)
      .eq("tenant_id", tenantId)
      .eq("active", true)
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(200);
    if (data && data.length > 0) return data;
  } catch {}
  return MOCK_PRODUCTS;
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
    if (data && data.length > 0) return data;
  } catch {}
  return MOCK_CATEGORIES;
}

export default async function CatalogPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-brand-primary pt-28 pb-14">
        <div className="max-w-6xl mx-auto px-4">
          <p className="eyebrow-decorated text-sm uppercase tracking-widest text-brand-secondary font-medium mb-3">
            Bar Homero
          </p>
          <h1 className="font-display text-5xl text-white font-semibold">Nuestra carta</h1>
          <p className="text-white/60 mt-2">Bebidas, tragos, picadas y más</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <CatalogClient products={products} categories={categories} />
      </div>
    </div>
  );
}
