import { createAdminClient } from "@/lib/supabase/admin";
import { getTenantId } from "@/lib/tenant";
import { ServiciosClient } from "@/components/ui/ServiciosClient";

// ============================================================
// Mock data — visible cuando la DB está vacía (demo mode)
// ============================================================
const MOCK_CATEGORIES = [
  { id: "mock-cat-1", name: "Derecho Societario", slug: "derecho-societario", position: 0 },
  { id: "mock-cat-2", name: "Derecho Comercial", slug: "derecho-comercial", position: 1 },
  { id: "mock-cat-3", name: "Contratos", slug: "contratos", position: 2 },
  { id: "mock-cat-4", name: "Asesoramiento Continuo", slug: "asesoramiento-continuo", position: 3 },
];

const MOCK_PRODUCTS = [
  {
    id: "mock-1",
    name: "Constitución de SRL o SA",
    slug: "constitucion-srl-sa",
    price: 85000,
    compare_at_price: null,
    description:
      "Redacción de estatuto, tramitación ante IGJ, apertura de cuenta bancaria y acompañamiento hasta la inscripción definitiva.",
    featured: true,
    category_id: "mock-cat-1",
    product_images: [
      {
        url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&auto=format&fit=crop",
        alt: "Constitución de sociedad",
        position: 0,
      },
    ],
  },
  {
    id: "mock-2",
    name: "Transformación de Sociedad",
    slug: "transformacion-sociedad",
    price: 65000,
    compare_at_price: null,
    description:
      "Análisis de viabilidad y tramitación para el cambio de tipo societario. Orientado a empresas en crecimiento.",
    featured: false,
    category_id: "mock-cat-1",
    product_images: [
      {
        url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&auto=format&fit=crop",
        alt: "Transformación societaria",
        position: 0,
      },
    ],
  },
  {
    id: "mock-3",
    name: "M&A — Due Diligence Legal",
    slug: "due-diligence-legal",
    price: 145000,
    compare_at_price: null,
    description:
      "Revisión exhaustiva de la situación legal de la empresa objetivo. Identificación de riesgos y pasivos contingentes.",
    featured: true,
    category_id: "mock-cat-1",
    product_images: [
      {
        url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop",
        alt: "Due diligence legal",
        position: 0,
      },
    ],
  },
  {
    id: "mock-4",
    name: "Acuerdos de Accionistas",
    slug: "acuerdos-accionistas",
    price: 95000,
    compare_at_price: null,
    description:
      "Shareholders agreements con cláusulas de tag-along, drag-along, preferencias de liquidación y mecanismos de salida.",
    featured: false,
    category_id: "mock-cat-1",
    product_images: [
      {
        url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&auto=format&fit=crop",
        alt: "Acuerdos de accionistas",
        position: 0,
      },
    ],
  },
  {
    id: "mock-5",
    name: "Defensa en Juicios Comerciales",
    slug: "defensa-juicios-comerciales",
    price: 0,
    compare_at_price: null,
    description:
      "Representación en conflictos comerciales ante fueros ordinario y arbitral. Honorarios a convenir según el caso.",
    featured: false,
    category_id: "mock-cat-2",
    product_images: [
      {
        url: "https://picsum.photos/seed/juicio-comercial-mendez/800/600",
        alt: "Defensa en juicios",
        position: 0,
      },
    ],
  },
  {
    id: "mock-6",
    name: "Recupero de Créditos Comerciales",
    slug: "recupero-creditos",
    price: 0,
    compare_at_price: null,
    description:
      "Gestión extrajudicial y judicial para el cobro de deudas comerciales. Parte de los honorarios variables según resultado.",
    featured: false,
    category_id: "mock-cat-2",
    product_images: [
      {
        url: "https://picsum.photos/seed/recupero-creditos-mendez/800/600",
        alt: "Recupero de créditos",
        position: 0,
      },
    ],
  },
  {
    id: "mock-7",
    name: "Redacción de Contratos Comerciales",
    slug: "redaccion-contratos",
    price: 55000,
    compare_at_price: null,
    description:
      "Contratos a medida: distribución, agencia, franchising, supply agreements. Revisión de contratos de contraparte.",
    featured: true,
    category_id: "mock-cat-3",
    product_images: [
      {
        url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&auto=format&fit=crop",
        alt: "Redacción de contratos",
        position: 0,
      },
    ],
  },
  {
    id: "mock-8",
    name: "Contratos Internacionales",
    slug: "contratos-internacionales-servicio",
    price: 75000,
    compare_at_price: null,
    description:
      "Operaciones cross-border: selección de ley aplicable, jurisdicción y arbitraje, adaptación a normativa CISG.",
    featured: false,
    category_id: "mock-cat-3",
    product_images: [
      {
        url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop",
        alt: "Contratos internacionales",
        position: 0,
      },
    ],
  },
  {
    id: "mock-9",
    name: "Retainer Mensual — PyME",
    slug: "retainer-pyme",
    price: 85000,
    compare_at_price: null,
    description:
      "Asesoramiento continuo con consultas ilimitadas, revisión de contratos y respuesta en 24 hs. Planes flexibles.",
    featured: true,
    category_id: "mock-cat-4",
    product_images: [
      {
        url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&auto=format&fit=crop",
        alt: "Retainer mensual PyME",
        position: 0,
      },
    ],
  },
  {
    id: "mock-10",
    name: "Retainer Mensual — Startup",
    slug: "retainer-startup",
    price: 55000,
    compare_at_price: null,
    description:
      "Acompañamiento legal para startups: cap table, equity agreements, rondas de inversión. Tarifa plana flexible.",
    featured: false,
    category_id: "mock-cat-4",
    product_images: [
      {
        url: "https://picsum.photos/seed/retainer-startup-mendez/800/600",
        alt: "Retainer startup",
        position: 0,
      },
    ],
  },
  {
    id: "mock-11",
    name: "Consulta Puntual — 1 hora",
    slug: "consulta-puntual",
    price: 25000,
    compare_at_price: null,
    description:
      "Sesión de una hora para resolver una duda concreta. Incluye resumen escrito con recomendaciones.",
    featured: false,
    category_id: "mock-cat-4",
    product_images: [
      {
        url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop",
        alt: "Consulta puntual",
        position: 0,
      },
    ],
  },
  {
    id: "mock-12",
    name: "Auditoría Legal de Empresa",
    slug: "auditoria-legal",
    price: 120000,
    compare_at_price: 140000,
    description:
      "Revisión integral de la situación legal: estructura societaria, contratos, cumplimiento regulatorio.",
    featured: false,
    category_id: "mock-cat-4",
    product_images: [
      {
        url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&auto=format&fit=crop",
        alt: "Auditoría legal",
        position: 0,
      },
    ],
  },
];

// ============================================================
// Data fetching
// ============================================================
async function getProducts() {
  try {
    const tenantId = getTenantId();
    const admin = createAdminClient();
    const { data } = await admin
      .from("products")
      .select(
        "id, name, slug, price, compare_at_price, description, featured, category_id, product_images (id, url, alt, position)"
      )
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
    const admin = createAdminClient();
    const { data } = await admin
      .from("categories")
      .select("id, name, slug, position, subcategories (id, name, slug, position)")
      .eq("tenant_id", tenantId)
      .eq("active", true)
      .order("position");
    return data ?? [];
  } catch {
    return [];
  }
}

// ============================================================
// Page
// ============================================================
export default async function ServiciosPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  const useRealData = products.length > 0 && categories.length > 0;
  const displayProducts = useRealData ? products : MOCK_PRODUCTS;
  const displayCategories = useRealData ? categories : MOCK_CATEGORIES;

  return <ServiciosClient products={displayProducts} categories={displayCategories} />;
}
