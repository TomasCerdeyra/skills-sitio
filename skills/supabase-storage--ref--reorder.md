# Reference: `lib/storage/reorder.ts`

Path destino: `lib/storage/reorder.ts`

Reordena las imágenes de un producto (drag and drop en el admin panel). Cambia el campo `position` en `product_images`.

```typescript
"use client";

import { createClient } from "@/lib/supabase/client";

export async function reorderProductImages(
  images: Array<{ id: string; position: number }>,
  tenantId: string
): Promise<void> {
  const supabase = createClient();

  await Promise.all(
    images.map(({ id, position }) =>
      supabase
        .from("product_images")
        .update({ position })
        .eq("id", id)
        .eq("tenant_id", tenantId)
    )
  );
}
```
