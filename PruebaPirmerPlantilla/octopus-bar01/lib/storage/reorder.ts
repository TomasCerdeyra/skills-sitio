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
