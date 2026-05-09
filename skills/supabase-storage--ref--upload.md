# Reference: `lib/storage/upload.ts`

Path destino: `lib/storage/upload.ts`

Funciones para comprimir y subir imágenes a Supabase Storage, registrándolas en `product_images`.

```typescript
"use client";

import { createClient } from "@/lib/supabase/client";
import imageCompression from "browser-image-compression";

const BUCKET_SIZE_LIMIT = 10485760; // 10MB

export async function uploadProductImage(
  file: File,
  tenantId: string,
  productId: string,
  options?: { alt?: string; position?: number }
): Promise<{ url: string; imageRecord: { id: string; url: string; alt: string | null; position: number | null } }> {
  const supabase = createClient();

  // 1. Comprimir
  const compressed = await imageCompression(file, {
    maxSizeMB: BUCKET_SIZE_LIMIT / (1024 * 1024),
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  });

  if (compressed.size > BUCKET_SIZE_LIMIT) {
    throw new Error(`La imagen ${file.name} es demasiado grande después de comprimir.`);
  }

  // 2. Subir al bucket
  const ext = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${ext}`;
  const filePath = `${tenantId}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("objects")
    .upload(filePath, compressed);

  if (uploadError) throw uploadError;

  // 3. Obtener URL pública
  const { data: urlData } = supabase.storage
    .from("objects")
    .getPublicUrl(filePath);

  const url = urlData.publicUrl;

  // 4. Registrar en tabla product_images
  const { data: imageRecord, error: dbError } = await supabase
    .from("product_images")
    .insert({
      tenant_id: tenantId,
      product_id: productId,
      url,
      alt: options?.alt ?? "",
      position: options?.position ?? 0,
    })
    .select()
    .single();

  if (dbError) throw dbError;

  return { url, imageRecord };
}

export async function uploadProductImages(
  files: FileList | File[],
  tenantId: string,
  productId: string
): Promise<string[]> {
  const urls: string[] = [];
  const fileList = Array.from(files);

  for (let i = 0; i < fileList.length; i++) {
    const { url } = await uploadProductImage(fileList[i], tenantId, productId, {
      position: i,
    });
    urls.push(url);
  }

  return urls;
}
```
