# Reference: `lib/storage/delete.ts`

Path destino: `lib/storage/delete.ts`

Funciones para eliminar imágenes (storage + DB).

```typescript
"use client";

import { createClient } from "@/lib/supabase/client";

const BUCKET_MARKER = "/objects/";

function extractBucketPath(imageUrl: string): string | null {
  const idx = imageUrl.indexOf(BUCKET_MARKER);
  if (idx === -1) return null;
  return imageUrl.substring(idx + BUCKET_MARKER.length);
}

export async function deleteProductImage(
  imageId: string,
  imageUrl: string,
  tenantId: string
): Promise<void> {
  const supabase = createClient();

  const filePath = extractBucketPath(imageUrl);
  if (!filePath) {
    throw new Error("URL de imagen inválida");
  }

  // 1. Eliminar del storage (no hacemos throw si falla — el archivo puede ya no existir)
  const { error: storageError } = await supabase.storage
    .from("objects")
    .remove([filePath]);

  if (storageError) {
    console.error("Error eliminando del storage:", storageError);
  }

  // 2. Eliminar registro de la tabla
  const { error: dbError } = await supabase
    .from("product_images")
    .delete()
    .eq("id", imageId)
    .eq("tenant_id", tenantId);

  if (dbError) throw dbError;
}

export async function deleteAllProductImages(
  productId: string,
  tenantId: string
): Promise<void> {
  const supabase = createClient();

  // 1. Obtener todas las imágenes del producto
  const { data: images } = await supabase
    .from("product_images")
    .select("id, url")
    .eq("product_id", productId)
    .eq("tenant_id", tenantId);

  if (!images || images.length === 0) return;

  // 2. Extraer paths y eliminar del bucket
  const paths = images
    .map((img) => extractBucketPath(img.url))
    .filter((p): p is string => p !== null);

  if (paths.length > 0) {
    await supabase.storage.from("objects").remove(paths);
  }

  // 3. Eliminar registros de la tabla
  await supabase
    .from("product_images")
    .delete()
    .eq("product_id", productId)
    .eq("tenant_id", tenantId);
}
```
