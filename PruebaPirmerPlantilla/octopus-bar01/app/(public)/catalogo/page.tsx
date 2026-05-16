import { createAdminClient } from "@/lib/supabase/admin";
import { getTenantId } from "@/lib/tenant";
import { CatalogClient } from "@/components/ui/CatalogClient";

// =============================================
// MOCK DATA — Se usa cuando el seed aún no fue ejecutado
// IDs consistentes: category_id en productos coincide con id en categorías
// =============================================
const MOCK_CATEGORIES = [
  { id: "mock-cat-1", name: "Clásicas", slug: "clasicas", position: 0, subcategories: [] },
  { id: "mock-cat-2", name: "Premium", slug: "premium", position: 1, subcategories: [] },
  { id: "mock-cat-3", name: "Combos", slug: "combos", position: 2, subcategories: [] },
  { id: "mock-cat-4", name: "Bebidas", slug: "bebidas", position: 3, subcategories: [] },
];

const MOCK_PRODUCTS = [
  {
    id: "mock-p-1",
    name: "Octopus Classic",
    slug: "octopus-classic",
    price: 9500,
    compare_at_price: null,
    description: "Carne angus 180g, queso cheddar, lechuga, tomate y salsa de la casa sobre pan brioche tostado.",
    featured: true,
    category_id: "mock-cat-1",
    product_images: [{ url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80&auto=format&fit=crop", alt: "Octopus Classic", position: 0 }],
  },
  {
    id: "mock-p-2",
    name: "Double Kraken",
    slug: "double-kraken",
    price: 13500,
    compare_at_price: 15000,
    description: "Doble carne angus, doble cheddar madurado, bacon ahumado crocante y cebolla caramelizada.",
    featured: false,
    category_id: "mock-cat-1",
    product_images: [{ url: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80&auto=format&fit=crop", alt: "Double Kraken", position: 0 }],
  },
  {
    id: "mock-p-3",
    name: "Spicy Tentacle",
    slug: "spicy-tentacle",
    price: 10500,
    compare_at_price: null,
    description: "Jalapeños frescos, queso pepper jack, salsa sriracha de autor y lechuga romana crocante.",
    featured: false,
    category_id: "mock-cat-1",
    product_images: [{ url: "https://picsum.photos/seed/spicy-burger-octo/800/600", alt: "Spicy Tentacle", position: 0 }],
  },
  {
    id: "mock-p-4",
    name: "Mushroom Deep",
    slug: "mushroom-deep",
    price: 11200,
    compare_at_price: null,
    description: "Champiñones salteados al ajo, queso gruyere derretido, rúcula fresca y cebolla morada encurtida.",
    featured: false,
    category_id: "mock-cat-2",
    product_images: [{ url: "https://picsum.photos/seed/mushroom-burger-octopus/800/600", alt: "Mushroom Deep", position: 0 }],
  },
  {
    id: "mock-p-5",
    name: "Coral Crispy",
    slug: "coral-crispy",
    price: 10800,
    compare_at_price: null,
    description: "Pechuga de pollo marinada y empanada, queso americano, salsa buffalo casera y coleslaw.",
    featured: false,
    category_id: "mock-cat-2",
    product_images: [{ url: "https://picsum.photos/seed/crispy-chicken-octopus/800/600", alt: "Coral Crispy", position: 0 }],
  },
  {
    id: "mock-p-6",
    name: "Deep Smash",
    slug: "deep-smash",
    price: 12800,
    compare_at_price: null,
    description: "Doble smash patty aplastado en plancha, mermelada de jalapeños, queso comté y pepinillos.",
    featured: false,
    category_id: "mock-cat-2",
    product_images: [{ url: "https://picsum.photos/seed/smash-burger-deep/800/600", alt: "Deep Smash", position: 0 }],
  },
  {
    id: "mock-p-7",
    name: "Combo Octopus",
    slug: "combo-octopus",
    price: 15500,
    compare_at_price: null,
    description: "Hamburguesa clásica + papas fritas medianas + bebida a elección. La combo que más sale.",
    featured: false,
    category_id: "mock-cat-3",
    product_images: [{ url: "https://picsum.photos/seed/combo-octopus-01/800/600", alt: "Combo Octopus", position: 0 }],
  },
  {
    id: "mock-p-8",
    name: "Combo Family",
    slug: "combo-family",
    price: 21500,
    compare_at_price: null,
    description: "2 hamburguesas + papas fritas grandes + 2 bebidas. Para compartir o no, no juzgamos.",
    featured: false,
    category_id: "mock-cat-3",
    product_images: [{ url: "https://picsum.photos/seed/combo-family-octopus/800/600", alt: "Combo Family", position: 0 }],
  },
  {
    id: "mock-p-9",
    name: "Cerveza artesanal IPA",
    slug: "cerveza-ipa",
    price: 3500,
    compare_at_price: null,
    description: "IPA local, lúpulo cítrico y amargor balanceado. Botella 500ml. Fría y lista.",
    featured: false,
    category_id: "mock-cat-4",
    product_images: [{ url: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=800&q=80&auto=format&fit=crop", alt: "Cerveza IPA", position: 0 }],
  },
  {
    id: "mock-p-10",
    name: "Gaseosa o agua",
    slug: "gaseosa-agua",
    price: 1800,
    compare_at_price: null,
    description: "Coca-Cola, Sprite, Fanta o agua mineral. Lata o botella 500ml.",
    featured: false,
    category_id: "mock-cat-4",
    product_images: [{ url: "https://picsum.photos/seed/drinks-octopus/800/600", alt: "Bebidas", position: 0 }],
  },
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
        product_images (id, url, alt, position)
      `)
      .eq("tenant_id", tenantId)
      .eq("active", true)
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(50);
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
      .select(`
        id, name, slug, position,
        subcategories (id, name, slug, position)
      `)
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

  // Usar mock solo si AMBAS fuentes están vacías (evita inconsistencia de IDs)
  const useRealData = products.length > 0 && categories.length > 0;
  const displayProducts = useRealData ? products : MOCK_PRODUCTS;
  const displayCategories = useRealData ? categories : MOCK_CATEGORIES;

  return <CatalogClient products={displayProducts} categories={displayCategories} />;
}
