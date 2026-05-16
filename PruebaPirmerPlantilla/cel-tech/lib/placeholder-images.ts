/**
 * Genera una URL de imagen placeholder con picsum (último recurso).
 */
export function getPlaceholderImage(seed: string, width = 800, height = 600): string {
  const cleanSeed = seed.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  return `https://picsum.photos/seed/${cleanSeed}/${width}/${height}`;
}

/**
 * Resuelve la imagen de un producto:
 * 1. Si tiene imagen real en la DB → usa esa
 * 2. Si no → genera placeholder determinístico (fallback)
 */
export function getProductImage(
  product: { name: string; product_images?: { url: string; alt?: string | null }[] },
  width = 800,
  height = 600
): string {
  if (product.product_images?.[0]?.url) {
    return product.product_images[0].url;
  }
  return getPlaceholderImage(product.name, width, height);
}

/**
 * Genera imagen para secciones decorativas (hero, nosotros, etc.)
 */
export function getSectionImage(sectionName: string, width = 1200, height = 800): string {
  return getPlaceholderImage(sectionName, width, height);
}
