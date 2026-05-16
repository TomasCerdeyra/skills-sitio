import { createAdminClient } from "@/lib/supabase/admin";
import { getTenantId } from "@/lib/tenant";
import { CatalogClient } from "@/components/ui/CatalogClient";

// MOCK DATA — visible aunque la DB esté vacía
const MOCK_CATEGORIES = [
  { id: "mock-cat-1", name: "Cafetería", slug: "cafeteria", position: 0, subcategories: [] },
  { id: "mock-cat-2", name: "Pastelería", slug: "pasteleria", position: 1, subcategories: [] },
  { id: "mock-cat-3", name: "Sandwichería", slug: "sandwicheria", position: 2, subcategories: [] },
  { id: "mock-cat-4", name: "Vinos y Cervezas", slug: "vinos-y-cervezas", position: 3, subcategories: [] },
];

const MOCK_PRODUCTS = [
  { id: "mock-p-1", name: "Café americano", slug: "cafe-americano", price: 1200, compare_at_price: null, description: "Café de tueste medio, recién molido. Aroma intenso, cuerpo balanceado.", featured: true, category_id: "mock-cat-1", product_images: [{ url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80&auto=format&fit=crop", alt: "Café americano", position: 0 }], product_variants: [{ id: "v1", name: "Mediano", price: 1200, price_modifier: 0, stock: 99 }, { id: "v2", name: "Doble", price: 1700, price_modifier: 500, stock: 99 }] },
  { id: "mock-p-2", name: "Cortado", slug: "cortado", price: 1300, compare_at_price: null, description: "Espresso doble cortado con leche caliente vaporizada.", featured: false, category_id: "mock-cat-1", product_images: [{ url: "https://images.unsplash.com/photo-1485808191679-5f86510bd9d4?w=800&q=80&auto=format&fit=crop", alt: "Cortado", position: 0 }], product_variants: [] },
  { id: "mock-p-3", name: "Capuchino", slug: "capuchino", price: 1500, compare_at_price: null, description: "Espresso, leche vaporizada y un toque de cacao en polvo.", featured: true, category_id: "mock-cat-1", product_images: [{ url: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&q=80&auto=format&fit=crop", alt: "Capuchino", position: 0 }], product_variants: [{ id: "v3", name: "Chico", price: 1300, price_modifier: 0, stock: 99 }, { id: "v4", name: "Grande", price: 1700, price_modifier: 400, stock: 99 }] },
  { id: "mock-p-4", name: "Cold Brew", slug: "cold-brew", price: 1800, compare_at_price: null, description: "Infusionado en frío 18 horas. Concentrado, suave y refrescante.", featured: true, category_id: "mock-cat-1", product_images: [{ url: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80&auto=format&fit=crop", alt: "Cold brew", position: 0 }], product_variants: [{ id: "v5", name: "Solo", price: 1800, price_modifier: 0, stock: 99 }, { id: "v6", name: "Con leche", price: 2100, price_modifier: 300, stock: 99 }] },
  { id: "mock-p-5", name: "Latte de vainilla", slug: "latte-vainilla", price: 1600, compare_at_price: null, description: "Espresso doble con leche vaporizada y almíbar de vainilla artesanal.", featured: false, category_id: "mock-cat-1", product_images: [{ url: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80&auto=format&fit=crop", alt: "Latte", position: 0 }], product_variants: [] },
  { id: "mock-p-6", name: "Medialuna de manteca", slug: "medialuna-de-manteca", price: 900, compare_at_price: null, description: "Hechas cada mañana con fermentación lenta. Doraditas y crujientes.", featured: false, category_id: "mock-cat-2", product_images: [{ url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80&auto=format&fit=crop", alt: "Medialuna", position: 0 }], product_variants: [] },
  { id: "mock-p-7", name: "Cheesecake de frutos rojos", slug: "cheesecake-frutos-rojos", price: 2400, compare_at_price: 2900, description: "Base de galletas, queso crema batido y salsa de frutos rojos casera.", featured: true, category_id: "mock-cat-2", product_images: [{ url: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80&auto=format&fit=crop", alt: "Cheesecake", position: 0 }], product_variants: [] },
  { id: "mock-p-8", name: "Brownie con helado", slug: "brownie-con-helado", price: 2600, compare_at_price: null, description: "Brownie casero tibio con bocha de helado de crema americana.", featured: false, category_id: "mock-cat-2", product_images: [{ url: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80&auto=format&fit=crop", alt: "Brownie", position: 0 }], product_variants: [] },
  { id: "mock-p-9", name: "Tostado de jamón y queso", slug: "tostado-jamon-queso", price: 3200, compare_at_price: null, description: "Pan de campo con jamón cocido natural y queso por tabla. Servido caliente.", featured: false, category_id: "mock-cat-3", product_images: [{ url: "https://images.unsplash.com/photo-1528736235302-52922df5c122?w=800&q=80&auto=format&fit=crop", alt: "Tostado", position: 0 }], product_variants: [] },
  { id: "mock-p-10", name: "Sandwich de miga triple", slug: "sandwich-miga-triple", price: 2800, compare_at_price: null, description: "Tres pisos de pan de miga sin corteza, con jamón, queso y tomate.", featured: false, category_id: "mock-cat-3", product_images: [{ url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80&auto=format&fit=crop", alt: "Sandwich miga", position: 0 }], product_variants: [] },
  { id: "mock-p-11", name: "Cerveza artesanal IPA", slug: "cerveza-artesanal-ipa", price: 2200, compare_at_price: null, description: "IPA local, lúpulo cítrico y amargor balanceado. Botella 500ml.", featured: false, category_id: "mock-cat-4", product_images: [{ url: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=800&q=80&auto=format&fit=crop", alt: "Cerveza IPA", position: 0 }], product_variants: [] },
  { id: "mock-p-12", name: "Copa de vino malbec", slug: "copa-vino-malbec", price: 2800, compare_at_price: null, description: "Selección de bodegas mendocinas. Servido en copa.", featured: false, category_id: "mock-cat-4", product_images: [{ url: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80&auto=format&fit=crop", alt: "Vino malbec", position: 0 }], product_variants: [] },
];

async function getProducts() {
  try {
    const tenantId = getTenantId();
    const supabaseAdmin = createAdminClient();
    const { data } = await supabaseAdmin
      .from("products")
      .select(`id, name, slug, price, compare_at_price, description, featured, category_id, product_images (id, url, alt, position), product_variants (id, name, price, price_modifier, stock)`)
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

export default async function CatalogPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  // QA: usar useRealData para evitar filtros vacíos
  const useRealData = products.length > 0 && categories.length > 0;
  const displayProducts = useRealData ? products : MOCK_PRODUCTS;
  const displayCategories = useRealData ? categories : MOCK_CATEGORIES;

  return (
    <CatalogClient
      products={displayProducts}
      categories={displayCategories}
    />
  );
}
