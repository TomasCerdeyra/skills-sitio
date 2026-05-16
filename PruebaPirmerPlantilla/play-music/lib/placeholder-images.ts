/**
 * lib/placeholder-images.ts
 *
 * Sistema de imágenes para plantillas SitioHoy.
 *
 * Prioridades:
 * 1. Imagen real de la DB (product_images de Supabase)
 * 2. URL explícita en mock data (LoremFlickr con keyword del instrumento/producto)
 * 3. Fallback automático por keyword del producto (LoremFlickr)
 *
 * LoremFlickr: https://loremflickr.com
 * - Devuelve fotos reales de Flickr filtradas por keyword
 * - Parámetro `lock` hace la imagen determinística (mismo keyword + mismo lock = misma foto)
 * - Sin API key, sin registro, siempre disponible
 * - Formato: https://loremflickr.com/{width}/{height}/{keyword1,keyword2}?lock={n}
 */

// =============================================
// Mapeo rubro → keywords LoremFlickr (inglés)
// =============================================
// Las búsquedas en Flickr funcionan mejor en inglés
const RUBRO_KEYWORDS: Record<string, string> = {
  // Música
  instrumentos: "guitar,music",
  guitarra: "guitar,acoustic",
  "guitarra-electrica": "electric,guitar",
  "guitarra-acustica": "acoustic,guitar",
  piano: "piano,keyboard",
  teclado: "synthesizer,keyboard",
  bajo: "bass,guitar",
  bateria: "drums,percussion",
  "bateria-electronica": "electronic,drums",
  violin: "violin",
  violines: "violin,strings",
  trompeta: "trumpet",
  saxofon: "saxophone",
  accesorios: "guitar,accessories",
  // Gastronomía
  cafe: "coffee,espresso",
  cafeteria: "coffee,cafe",
  hamburguesa: "burger,hamburger",
  pizza: "pizza",
  restaurant: "restaurant,food",
  panaderia: "bread,bakery",
  pasteleria: "cake,pastry",
  heladeria: "ice,cream",
  // Moda
  ropa: "fashion,clothing",
  indumentaria: "fashion,shirt",
  zapatillas: "sneakers,shoes",
  jeans: "jeans,denim",
  // Salud y belleza
  skincare: "skincare,cosmetics",
  cosmetica: "cosmetics,beauty",
  perfume: "perfume,fragrance",
  peluqueria: "haircut,salon",
  spa: "spa,wellness",
  // Tecnología
  tech: "technology,gadget",
  electronica: "electronics,device",
  laptop: "laptop,computer",
  celular: "smartphone,phone",
  // Hogar
  muebles: "furniture,interior",
  deco: "decor,home",
  plantas: "plants,garden",
  // Otros
  libro: "book,library",
  joyeria: "jewelry,ring",
  bicicleta: "bicycle,cycling",
  deporte: "sport,fitness",
  yoga: "yoga,fitness",
  mascota: "pet,dog",
};

/**
 * Deriva keywords de LoremFlickr a partir de un nombre de producto o rubro.
 * Devuelve un string con 1-2 keywords en inglés.
 */
function deriveKeyword(nameOrRubro: string): string {
  // Primero intentar el mapeo directo
  const clean = nameOrRubro
    .toLowerCase()
    .replace(/[áàäâ]/g, "a")
    .replace(/[éèëê]/g, "e")
    .replace(/[íìïî]/g, "i")
    .replace(/[óòöô]/g, "o")
    .replace(/[úùüû]/g, "u")
    .replace(/ñ/g, "n")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim();

  // Intentar match exacto
  if (RUBRO_KEYWORDS[clean]) return RUBRO_KEYWORDS[clean];

  // Intentar con primera palabra
  const firstWord = clean.split(/\s+/)[0];
  if (RUBRO_KEYWORDS[firstWord]) return RUBRO_KEYWORDS[firstWord];

  // Buscar si el nombre contiene alguna key del mapa
  for (const [key, val] of Object.entries(RUBRO_KEYWORDS)) {
    if (clean.includes(key)) return val;
  }

  // Fallback: usar las primeras 2 palabras en inglés si son cortas
  const words = clean
    .split(/\s+/)
    .filter((w) => w.length >= 3)
    .slice(0, 2)
    .join(",");

  return words || "product";
}

/**
 * Genera un número de lock determinístico basado en un string.
 * Mismo string → mismo número → misma foto de LoremFlickr.
 * Rango 1-99 para tener variedad manteniendo determinismo.
 */
function deterministicLock(seed: string): number {
  let hash = 0;
  for (const ch of seed) {
    hash = (hash * 31 + ch.charCodeAt(0)) & 0xffff;
  }
  return (hash % 50) + 1; // 1-50 para evitar imágenes de baja calidad en locks altos
}

/**
 * Genera una URL de LoremFlickr por keyword.
 * Determinística: mismo keyword + mismo lock = siempre la misma foto.
 *
 * @param keyword - Keyword en inglés (o nombre/rubro en español, se mapea automáticamente)
 * @param width - Ancho de la imagen
 * @param height - Alto de la imagen
 * @param lock - Número de lock (1-99). Default: derivado del keyword.
 */
export function getFlickrImage(
  keyword: string,
  width = 800,
  height = 600,
  lock?: number
): string {
  const kw = deriveKeyword(keyword);
  const lockNum = lock ?? deterministicLock(keyword);
  return `https://loremflickr.com/${width}/${height}/${kw}?lock=${lockNum}`;
}

/**
 * Resuelve la imagen de un producto:
 * 1. Imagen real de la DB → usa esa
 * 2. Fallback → LoremFlickr con keyword derivado del nombre del producto
 *
 * Para mock data: incluir `product_images` con URLs LoremFlickr específicas del rubro.
 * Ejemplo: { url: "https://loremflickr.com/800/600/guitar,acoustic?lock=1", alt: "...", position: 0 }
 */
export function getProductImage(
  product: { name: string; product_images?: { url: string; alt?: string | null }[] },
  width = 800,
  height = 600
): string {
  // Prioridad 1: imagen real de la DB o del mock con URL explícita
  if (product.product_images?.[0]?.url) {
    return product.product_images[0].url;
  }
  // Prioridad 2: LoremFlickr derivado del nombre del producto
  return getFlickrImage(product.name, width, height);
}

/**
 * Genera imagen para secciones decorativas (hero, nosotros, etc.)
 *
 * @param keyword - Keyword del rubro/contexto (español o inglés)
 * @param width
 * @param height
 * @param lock - Optional: forzar un lock específico para más control
 */
export function getSectionImage(
  keyword: string,
  width = 1200,
  height = 800,
  lock?: number
): string {
  return getFlickrImage(keyword, width, height, lock);
}

/**
 * Genera imagen de producto para mock data usando el rubro.
 * Cada índice usa un lock diferente → cada producto tiene imagen distinta del mismo rubro.
 *
 * Usar en MOCK_PRODUCTS cuando no se quiere hardcodear URLs individuales:
 * product_images: [{ url: getProductImageByRubro("instrumentos", 0), alt: "...", position: 0 }]
 */
export function getProductImageByRubro(
  rubro: string,
  index: number,
  width = 800,
  height = 600
): string {
  const kw = deriveKeyword(rubro);
  const lock = (index % 20) + 1; // locks 1-20 para el mismo rubro
  return `https://loremflickr.com/${width}/${height}/${kw}?lock=${lock}`;
}

// =============================================
// LEGACY: mantener picsum como último recurso
// =============================================
/**
 * @deprecated Usar getFlickrImage() en su lugar.
 * picsum.photos devuelve imágenes aleatorias sin relación al rubro.
 */
export function getPlaceholderImage(seed: string, width = 800, height = 600): string {
  // Intentar LoremFlickr primero
  return getFlickrImage(seed, width, height);
}
