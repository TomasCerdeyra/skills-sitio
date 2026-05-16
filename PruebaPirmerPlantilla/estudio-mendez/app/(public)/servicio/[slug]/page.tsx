import { createAdminClient } from "@/lib/supabase/admin";
import { notFound } from "next/navigation";
import { ServiceDetailClient } from "@/components/ui/ServiceDetailClient";

// ============================================================
// Mock data — mismo contenido que ServiciosPage
// Obligatorio para que los clicks en la demo no den 404
// ============================================================
const MOCK_PRODUCTS = [
  {
    id: "mock-1",
    name: "Constitución de SRL o SA",
    slug: "constitucion-srl-sa",
    price: 85000,
    compare_at_price: null,
    description:
      "Redacción de estatuto, tramitación ante IGJ, apertura de cuenta bancaria y asesoramiento en el proceso de inscripción. Incluye acompañamiento hasta la obtención del número de expediente definitivo.",
    featured: true,
    category_id: "mock-cat-1",
    product_images: [
      { id: "mi-1", url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&auto=format&fit=crop", alt: "Constitución de sociedad", position: 0 },
    ],
    product_variants: [],
  },
  {
    id: "mock-2",
    name: "Transformación de Sociedad",
    slug: "transformacion-sociedad",
    price: 65000,
    compare_at_price: null,
    description:
      "Análisis de viabilidad, redacción de documentación y tramitación ante los organismos competentes para el cambio de tipo societario. Orientado a empresas en crecimiento que necesitan adaptar su estructura.",
    featured: false,
    category_id: "mock-cat-1",
    product_images: [
      { id: "mi-2", url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&auto=format&fit=crop", alt: "Transformación societaria", position: 0 },
    ],
    product_variants: [],
  },
  {
    id: "mock-3",
    name: "M&A — Due Diligence Legal",
    slug: "due-diligence-legal",
    price: 145000,
    compare_at_price: null,
    description:
      "Revisión exhaustiva de la situación legal, contractual y regulatoria de la empresa objetivo. Identificación de riesgos, pasivos contingentes y recomendaciones para la negociación.",
    featured: true,
    category_id: "mock-cat-1",
    product_images: [
      { id: "mi-3", url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop", alt: "Due diligence legal", position: 0 },
    ],
    product_variants: [],
  },
  {
    id: "mock-4",
    name: "Acuerdos de Accionistas",
    slug: "acuerdos-accionistas",
    price: 95000,
    compare_at_price: null,
    description:
      "Redacción y negociación de shareholders agreements que protegen los derechos de todos los socios. Incluye cláusulas de tag-along, drag-along, preferencias de liquidación y mecanismos de salida.",
    featured: false,
    category_id: "mock-cat-1",
    product_images: [
      { id: "mi-4", url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&auto=format&fit=crop", alt: "Acuerdos de accionistas", position: 0 },
    ],
    product_variants: [],
  },
  {
    id: "mock-5",
    name: "Defensa en Juicios Comerciales",
    slug: "defensa-juicios-comerciales",
    price: 0,
    compare_at_price: null,
    description:
      "Representación y patrocinio en conflictos comerciales ante fueros ordinario y arbitral. Análisis de riesgo, estrategia procesal y seguimiento del expediente hasta sentencia firme.",
    featured: false,
    category_id: "mock-cat-2",
    product_images: [
      { id: "mi-5", url: "https://picsum.photos/seed/juicio-comercial-mendez/800/600", alt: "Defensa en juicios", position: 0 },
    ],
    product_variants: [],
  },
  {
    id: "mock-6",
    name: "Recupero de Créditos Comerciales",
    slug: "recupero-creditos",
    price: 0,
    compare_at_price: null,
    description:
      "Gestión extrajudicial y judicial para el cobro de deudas comerciales. Estrategia de negociación, medidas cautelares y ejecución de sentencias. Honorarios en parte variables según resultado.",
    featured: false,
    category_id: "mock-cat-2",
    product_images: [
      { id: "mi-6", url: "https://picsum.photos/seed/recupero-creditos-mendez/800/600", alt: "Recupero de créditos", position: 0 },
    ],
    product_variants: [],
  },
  {
    id: "mock-7",
    name: "Redacción de Contratos Comerciales",
    slug: "redaccion-contratos",
    price: 55000,
    compare_at_price: null,
    description:
      "Elaboración de contratos a medida: distribución, agencia, franchising, supply agreements y más. Revisión de contratos de contraparte con detección de cláusulas desfavorables.",
    featured: true,
    category_id: "mock-cat-3",
    product_images: [
      { id: "mi-7", url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&auto=format&fit=crop", alt: "Contratos comerciales", position: 0 },
    ],
    product_variants: [],
  },
  {
    id: "mock-8",
    name: "Contratos Internacionales",
    slug: "contratos-internacionales-servicio",
    price: 75000,
    compare_at_price: null,
    description:
      "Asesoramiento en operaciones cross-border: selección de ley aplicable, cláusulas de jurisdicción y arbitraje, adaptación a normativa local e internacional (CISG, Incoterms, UCP).",
    featured: false,
    category_id: "mock-cat-3",
    product_images: [
      { id: "mi-8", url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop", alt: "Contratos internacionales", position: 0 },
    ],
    product_variants: [],
  },
  {
    id: "mock-9",
    name: "Retainer Mensual — PyME",
    slug: "retainer-pyme",
    price: 85000,
    compare_at_price: null,
    description:
      "Asesoramiento legal continuo para empresas pequeñas y medianas. Consultas ilimitadas, revisión de contratos menores, seguimiento de novedades regulatorias y respuesta en 24 hs.",
    featured: true,
    category_id: "mock-cat-4",
    product_images: [
      { id: "mi-9", url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&auto=format&fit=crop", alt: "Retainer PyME", position: 0 },
    ],
    product_variants: [
      { id: "mv-9a", name: "Básico (hasta 5 consultas/mes)", sku: null, price: 85000, price_modifier: 0, stock: 10 },
      { id: "mv-9b", name: "Full (consultas ilimitadas)", sku: null, price: 130000, price_modifier: 45000, stock: 5 },
    ],
  },
  {
    id: "mock-10",
    name: "Retainer Mensual — Startup",
    slug: "retainer-startup",
    price: 55000,
    compare_at_price: null,
    description:
      "Acompañamiento legal para startups en etapa de crecimiento. Cap table, equity agreements, rondas de inversión, términos de servicio y privacidad.",
    featured: false,
    category_id: "mock-cat-4",
    product_images: [
      { id: "mi-10", url: "https://picsum.photos/seed/retainer-startup-mendez/800/600", alt: "Retainer Startup", position: 0 },
    ],
    product_variants: [
      { id: "mv-10a", name: "Pre-seed (hasta 3 consultas/mes)", sku: null, price: 55000, price_modifier: 0, stock: 10 },
      { id: "mv-10b", name: "Growth (consultas ilimitadas)", sku: null, price: 85000, price_modifier: 30000, stock: 5 },
    ],
  },
  {
    id: "mock-11",
    name: "Consulta Puntual — 1 hora",
    slug: "consulta-puntual",
    price: 25000,
    compare_at_price: null,
    description:
      "Sesión de consulta de una hora para resolver una duda concreta o evaluar una situación legal específica. Incluye resumen escrito con los puntos clave y recomendaciones.",
    featured: false,
    category_id: "mock-cat-4",
    product_images: [
      { id: "mi-11", url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop", alt: "Consulta puntual", position: 0 },
    ],
    product_variants: [
      { id: "mv-11a", name: "1 hora", sku: null, price: 25000, price_modifier: 0, stock: 99 },
      { id: "mv-11b", name: "2 horas", sku: null, price: 45000, price_modifier: 20000, stock: 99 },
    ],
  },
  {
    id: "mock-12",
    name: "Auditoría Legal de Empresa",
    slug: "auditoria-legal",
    price: 120000,
    compare_at_price: 140000,
    description:
      "Revisión integral de la situación legal de la empresa: estructura societaria, contratos vigentes, cumplimiento regulatorio y relaciones laborales. Informe detallado con plan de acción correctivo.",
    featured: false,
    category_id: "mock-cat-4",
    product_images: [
      { id: "mi-12", url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&auto=format&fit=crop", alt: "Auditoría legal", position: 0 },
    ],
    product_variants: [],
  },
];

async function getService(slug: string) {
  try {
    const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
    if (!tenantId) return null;
    const admin = createAdminClient();
    const { data } = await admin
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

export default async function ServicioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const dbService = await getService(slug);
  const service =
    dbService ??
    (MOCK_PRODUCTS.find((p) => p.slug === slug) as (typeof MOCK_PRODUCTS)[0] | undefined);

  if (!service) notFound();

  return <ServiceDetailClient service={service} />;
}
