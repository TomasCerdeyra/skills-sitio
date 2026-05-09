# Reference: `lib/storage/read.ts`

Path destino: `lib/storage/read.ts`

Helper para leer imágenes de un producto desde Server Components o API routes (usa el admin client).

```typescript
import { createAdminClient } from "@/lib/supabase/admin";

export async function getProductImages(productId: string, tenantId: string) {
  const supabaseAdmin = createAdminClient();

  const { data, error } = await supabaseAdmin
    .from("product_images")
    .select("id, url, alt, position")
    .eq("product_id", productId)
    .eq("tenant_id", tenantId)
    .order("position");

  if (error) {
    console.error("Error leyendo imágenes:", error);
    return [];
  }

  return data ?? [];
}
```

## Notas

- Esta función es para el server. En Server Components o API routes.
- Las queries de catálogo y detalle de producto ya hacen JOIN con `product_images` directamente — no necesitan llamar a esta función.
- Usar esta función cuando se necesite consultar imágenes en aislamiento (ej: panel admin externo, tools de migración, scripts de mantenimiento).
