import { createAdminClient } from "@/lib/supabase/admin";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { HeroSection } from "@/components/ui/HeroSection";
import { HomeSections } from "@/components/ui/HomeSections";

// MOCK DATA — visible aunque la DB esté vacía (para demo al prospecto)
const MOCK_FEATURED = [
  {
    id: "mock-1",
    name: "Café americano",
    slug: "cafe-americano",
    price: 1200,
    compare_at_price: null,
    description: "Café de tueste medio, recién molido. Aroma intenso, cuerpo balanceado.",
    product_images: [{ url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80&auto=format&fit=crop", alt: "Café americano", position: 0 }],
  },
  {
    id: "mock-2",
    name: "Capuchino",
    slug: "capuchino",
    price: 1500,
    compare_at_price: null,
    description: "Espresso, leche vaporizada y cacao en polvo. Cremoso y suave.",
    product_images: [{ url: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&q=80&auto=format&fit=crop", alt: "Capuchino", position: 0 }],
  },
  {
    id: "mock-3",
    name: "Cheesecake de frutos rojos",
    slug: "cheesecake-frutos-rojos",
    price: 2400,
    compare_at_price: 2900,
    description: "Base de galletas, queso crema batido y salsa de frutos rojos casera.",
    product_images: [{ url: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80&auto=format&fit=crop", alt: "Cheesecake", position: 0 }],
  },
  {
    id: "mock-4",
    name: "Cold Brew",
    slug: "cold-brew",
    price: 1800,
    compare_at_price: null,
    description: "Infusionado en frío durante 18 horas. Concentrado y refrescante.",
    product_images: [{ url: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80&auto=format&fit=crop", alt: "Cold brew", position: 0 }],
  },
  {
    id: "mock-5",
    name: "Medialuna de manteca",
    slug: "medialuna-de-manteca",
    price: 900,
    compare_at_price: null,
    description: "Hechas cada mañana con fermentación lenta. Doraditas y crujientes.",
    product_images: [{ url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80&auto=format&fit=crop", alt: "Medialuna", position: 0 }],
  },
  {
    id: "mock-6",
    name: "Brownie con helado",
    slug: "brownie-con-helado",
    price: 2600,
    compare_at_price: null,
    description: "Brownie casero tibio con bocha de helado de crema americana.",
    product_images: [{ url: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80&auto=format&fit=crop", alt: "Brownie", position: 0 }],
  },
];

async function getFeaturedProducts() {
  try {
    const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
    if (!tenantId) return [];
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("products")
      .select(`
        id, name, slug, price, compare_at_price, description,
        product_images (url, alt, position)
      `)
      .eq("tenant_id", tenantId)
      .eq("active", true)
      .eq("featured", true)
      .order("created_at", { ascending: false })
      .limit(6);
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [featured, waLink] = await Promise.all([
    getFeaturedProducts(),
    Promise.resolve(buildWhatsAppLink({ message: "Hola! Quiero consultar o hacer un pedido." })),
  ]);

  const displayFeatured = featured.length > 0 ? featured : MOCK_FEATURED;

  return (
    <>
      {/* Hero — ADN: mosaic */}
      <HeroSection waLink={waLink} />

      {/* Resto de secciones del Home */}
      <HomeSections featured={displayFeatured} waLink={waLink} />
    </>
  );
}
