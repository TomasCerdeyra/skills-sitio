import { createAdminClient } from "@/lib/supabase/admin";
import { getTenantId } from "@/lib/tenant";
import { CatalogClient } from "@/components/ui/CatalogClient";

// MOCK DATA — visible si la DB está vacía
const MOCK_CATEGORIES = [
  { id: "mock-cat-1", name: "Cafetería", slug: "cafeteria", position: 0 },
  { id: "mock-cat-2", name: "Pastelería", slug: "pasteleria", position: 1 },
  { id: "mock-cat-3", name: "Sandwichería", slug: "sandwicheria", position: 2 },
  { id: "mock-cat-4", name: "Bebidas frías", slug: "bebidas-frias", position: 3 },
];

const MOCK_PRODUCTS = [
  { id: "mock-1", name: "Café americano", slug: "cafe-americano", price: 1200, compare_at_price: null, description: "Café de tueste medio, recién molido. Aroma intenso, cuerpo balanceado.", featured: true, category_id: "mock-cat-1", product_images: [{ id: "i1", url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80&auto=format&fit=crop", alt: "Café americano", position: 0 }], product_variants: [] },
  { id: "mock-2", name: "Cortado", slug: "cortado", price: 1300, compare_at_price: null, description: "Espresso doble cortado con leche caliente. La medida perfecta entre café y leche.", featured: false, category_id: "mock-cat-1", product_images: [{ id: "i2", url: "https://images.unsplash.com/photo-1485808191679-5f86510bd9d4?w=800&q=80&auto=format&fit=crop", alt: "Cortado", position: 0 }], product_variants: [] },
  { id: "mock-3", name: "Capuchino", slug: "capuchino", price: 1500, compare_at_price: null, description: "Espresso, leche vaporizada y cacao en polvo. Cremoso y suave.", featured: true, category_id: "mock-cat-1", product_images: [{ id: "i3", url: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&q=80&auto=format&fit=crop", alt: "Capuchino", position: 0 }], product_variants: [{ id: "v1", name: "Chico", price: 1300, price_modifier: null, stock: 50 }, { id: "v2", name: "Grande", price: 1700, price_modifier: null, stock: 50 }] },
  { id: "mock-4", name: "Latte", slug: "latte", price: 1600, compare_at_price: null, description: "Espresso con abundante leche vaporizada y microespuma sedosa. El favorito de la mañana.", featured: false, category_id: "mock-cat-1", product_images: [{ id: "i4", url: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80&auto=format&fit=crop", alt: "Latte", position: 0 }], product_variants: [] },
  { id: "mock-5", name: "Medialuna de manteca", slug: "medialuna-de-manteca", price: 900, compare_at_price: null, description: "Hechas cada mañana con manteca, harina seleccionada y fermentación lenta. Doraditas y crujientes.", featured: false, category_id: "mock-cat-2", product_images: [{ id: "i5", url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80&auto=format&fit=crop", alt: "Medialuna", position: 0 }], product_variants: [] },
  { id: "mock-6", name: "Cheesecake de frutos rojos", slug: "cheesecake-frutos-rojos", price: 2400, compare_at_price: 2900, description: "Base de galletas, queso crema batido y salsa de frutos rojos casera. Una porción generosa.", featured: true, category_id: "mock-cat-2", product_images: [{ id: "i6", url: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80&auto=format&fit=crop", alt: "Cheesecake", position: 0 }], product_variants: [] },
  { id: "mock-7", name: "Brownie con helado", slug: "brownie-con-helado", price: 2600, compare_at_price: null, description: "Brownie casero tibio con bocha de helado de crema americana. Para compartir o no.", featured: false, category_id: "mock-cat-2", product_images: [{ id: "i7", url: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80&auto=format&fit=crop", alt: "Brownie", position: 0 }], product_variants: [] },
  { id: "mock-8", name: "Tostado de jamón y queso", slug: "tostado-jamon-queso", price: 3200, compare_at_price: null, description: "Pan de campo con jamón cocido natural y queso por tabla. Servido caliente.", featured: false, category_id: "mock-cat-3", product_images: [{ id: "i8", url: "https://images.unsplash.com/photo-1528736235302-52922df5c122?w=800&q=80&auto=format&fit=crop", alt: "Tostado", position: 0 }], product_variants: [] },
  { id: "mock-9", name: "Sandwich de miga triple", slug: "sandwich-miga-triple", price: 2800, compare_at_price: null, description: "Tres pisos de pan de miga sin corteza, con jamón, queso y tomate. Ideal para acompañar el café.", featured: false, category_id: "mock-cat-3", product_images: [{ id: "i9", url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80&auto=format&fit=crop", alt: "Sandwich miga", position: 0 }], product_variants: [] },
  { id: "mock-10", name: "Cold Brew", slug: "cold-brew", price: 1800, compare_at_price: null, description: "Café infusionado en frío durante 12 horas. Suave, sin acidez, refrescante.", featured: false, category_id: "mock-cat-4", product_images: [{ id: "i10", url: "https://images.unsplash.com/photo-1442512435-cd787031a5e5?w=800&q=80&auto=format&fit=crop", alt: "Cold Brew", position: 0 }], product_variants: [{ id: "v3", name: "Regular 350ml", price: 1800, price_modifier: null, stock: 30 }, { id: "v4", name: "Grande 500ml", price: 2300, price_modifier: null, stock: 30 }] },
  { id: "mock-11", name: "Matcha latte", slug: "matcha-latte", price: 2000, compare_at_price: null, description: "Matcha japonés de calidad ceremonial con leche vaporizada. Cremoso y terroso.", featured: false, category_id: "mock-cat-4", product_images: [{ id: "i11", url: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80&auto=format&fit=crop", alt: "Matcha latte", position: 0 }], product_variants: [] },
];

async function getProducts() {
  try {
    const tenantId = getTenantId();
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
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  // Flag unificado para evitar filtro vacío
  const useRealData = products.length > 0 && categories.length > 0;
  const displayProducts = useRealData ? products : MOCK_PRODUCTS;
  const displayCategories = useRealData ? categories : MOCK_CATEGORIES;

  return <CatalogClient products={displayProducts as never} categories={displayCategories} />;
}
