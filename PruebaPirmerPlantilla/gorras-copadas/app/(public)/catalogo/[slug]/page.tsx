import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { TAGS } from "@/lib/cache-tags";
import ProductDetail, { ProductData } from "./ProductDetail";

// ─── Mock data ────────────────────────────────────────────────────────────────
const MOCK_PRODUCTS: ProductData[] = [
  {
    id: "p01", slug: "snapback-acid", name: "Snapback Acid", price: 12500,
    category: "Snapback", categorySlug: "snapback",
    description: "La Snapback Acid te va a hacer destacar donde sea que vayas. Visera recta, ajuste trasero con botón, bordado en frente. Una gorra que habla sola.",
    images: [
      "https://loremflickr.com/800/800/snapback,cap?lock=101",
      "https://loremflickr.com/800/800/snapback,side?lock=1011",
      "https://loremflickr.com/800/800/snapback,back?lock=1012",
    ],
    variants: [{ id: "v01a", name: "Talle único", stock: 15 }],
  },
  {
    id: "p02", slug: "dad-hat-chaos", name: "Dad Hat Chaos", price: 9800,
    category: "Dad Hat", categorySlug: "dad-hat",
    description: "El caos hecho gorra. Lavada, desestructurada y con ese fit relajado que te cierra para cualquier ocasión. Hebilla metálica.",
    images: [
      "https://loremflickr.com/800/800/dadhat,cap?lock=102",
      "https://loremflickr.com/800/800/dadhat,side?lock=1021",
    ],
    variants: [{ id: "v02a", name: "Talle único", stock: 8 }],
  },
  {
    id: "p03", slug: "fitted-neon", name: "Fitted Neon", price: 14200,
    category: "Fitted", categorySlug: "fitted",
    description: "Fitted cerrada con bordado neon en frente. Tela premium, ajuste perfecto. Para los que saben lo que quieren.",
    images: [
      "https://loremflickr.com/800/800/fitted,cap?lock=103",
      "https://loremflickr.com/800/800/fitted,neon?lock=1031",
    ],
    variants: [
      { id: "v03a", name: "S/M", stock: 5 },
      { id: "v03b", name: "L/XL", stock: 3 },
    ],
  },
  {
    id: "p04", slug: "bucket-skate", name: "Bucket Skate", price: 10500,
    category: "Bucket", categorySlug: "bucket",
    description: "Bucket hat de lona con logo brodado. La usás al derecho o al revés, igual queda fire.",
    images: ["https://loremflickr.com/800/800/bucket,hat?lock=104"],
    variants: [{ id: "v04a", name: "Talle único", stock: 20 }],
  },
  {
    id: "p05", slug: "trucker-graffiti", name: "Trucker Graffiti", price: 11000,
    category: "Trucker", categorySlug: "trucker",
    description: "Panel de malla trasero, parche de cuero en frente con arte graffiti. La combinación perfecta entre calle y estilo.",
    images: ["https://loremflickr.com/800/800/trucker,cap?lock=105"],
    variants: [{ id: "v05a", name: "Talle único", stock: 12 }],
  },
  {
    id: "p06", slug: "snapback-chrome", name: "Snapback Chrome", price: 13800,
    category: "Snapback", categorySlug: "snapback",
    description: "Visera con efecto metálico, parche bordado. Edición limitada que no vuelve.",
    images: ["https://loremflickr.com/800/800/snapback,streetwear?lock=106"],
    variants: [{ id: "v06a", name: "Talle único", stock: 4 }],
  },
  {
    id: "p07", slug: "dad-hat-vintage", name: "Dad Hat Vintage", price: 9200,
    category: "Dad Hat", categorySlug: "dad-hat",
    description: "Tratamiento vintage con decolorado natural. Cada unidad es única.",
    images: ["https://loremflickr.com/800/800/vintage,hat?lock=107"],
    variants: [{ id: "v07a", name: "Talle único", stock: 7 }],
  },
  {
    id: "p08", slug: "bucket-jungle", name: "Bucket Jungle", price: 11500,
    category: "Bucket", categorySlug: "bucket",
    description: "Estampado all-over con motivos de jungla urbana. Material resistente al agua.",
    images: ["https://loremflickr.com/800/800/jungle,hat?lock=108"],
    variants: [{ id: "v08a", name: "Talle único", stock: 10 }],
  },
  {
    id: "p09", slug: "fitted-blackout", name: "Fitted Blackout", price: 15000,
    category: "Fitted", categorySlug: "fitted",
    description: "All black everything. Fitted cerrada con detalles en relieve negro sobre negro. Para los puristas.",
    images: ["https://loremflickr.com/800/800/cap,black?lock=109"],
    variants: [
      { id: "v09a", name: "S/M", stock: 6 },
      { id: "v09b", name: "L/XL", stock: 2 },
    ],
  },
  {
    id: "p10", slug: "snapback-wild", name: "Snapback Wild", price: 12000,
    category: "Snapback", categorySlug: "snapback",
    description: "Colores que no piden permiso. Bordado 3D en frente, visera recta en contraste.",
    images: ["https://loremflickr.com/800/800/cap,colorful?lock=110"],
    variants: [{ id: "v10a", name: "Talle único", stock: 9 }],
  },
  {
    id: "p11", slug: "trucker-flames", name: "Trucker Flames", price: 10800,
    category: "Trucker", categorySlug: "trucker",
    description: "Llamas bordadas en el lateral, malla trasera premium. Arde en los dos sentidos.",
    images: ["https://loremflickr.com/800/800/trucker,flames?lock=111"],
    variants: [{ id: "v11a", name: "Talle único", stock: 11 }],
  },
  {
    id: "p12", slug: "dad-hat-smiley", name: "Dad Hat Smiley", price: 9500,
    category: "Dad Hat", categorySlug: "dad-hat",
    description: "La clásica con bordado de carita. Porque a veces el estilo está en los detalles simples.",
    images: ["https://loremflickr.com/800/800/smiley,hat?lock=112"],
    variants: [{ id: "v12a", name: "Talle único", stock: 14 }],
  },
];

// ─── Supabase fetch (cacheado por slug) ───────────────────────────────────────
function fetchProduct(slug: string) {
  return unstable_cache(
    async (): Promise<ProductData | null> => {
      try {
        const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
        if (!tenantId) return null;

        const supabase = createAdminClient();
        const { data } = await supabase
          .from("products")
          .select(`
            id, name, slug, price, description,
            product_images (url, position),
            product_variants (id, name, stock),
            categories (name, slug)
          `)
          .eq("tenant_id", tenantId)
          .eq("slug", slug)
          .eq("active", true)
          .single();

        if (!data) return null;

        const imgs = (data.product_images as { url: string; position: number }[]) ?? [];
        const cat = data.categories as unknown as { name: string; slug: string } | null;

        return {
          id: data.id,
          slug: data.slug,
          name: data.name,
          price: data.price,
          category: cat?.name ?? "",
          categorySlug: cat?.slug ?? "",
          description: data.description ?? "",
          images: [...imgs]
            .sort((a, b) => a.position - b.position)
            .map((i) => i.url),
          variants: (data.product_variants as { id: string; name: string; stock: number }[]).map(
            (v) => ({ id: v.id, name: v.name, stock: v.stock })
          ),
        };
      } catch {
        return null;
      }
    },
    [`product-${slug}`],
    { tags: [TAGS.PRODUCTS, TAGS.PRODUCT(slug)] }
  )();
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const dbProduct = await fetchProduct(slug);
  const product = dbProduct ?? MOCK_PRODUCTS.find((p) => p.slug === slug);

  if (!product) notFound();

  return <ProductDetail product={product} />;
}
