# Reference: Sistema de imágenes — LoremFlickr + Fallback

**Sin imágenes relevantes al rubro, la plantilla no convence a nadie.**

---

## El sistema correcto: LoremFlickr

**LoremFlickr** (`loremflickr.com`) es el servicio de imágenes de demo para SitioHoy.

**Por qué LoremFlickr y no picsum ni Unsplash:**

| Servicio | Problema |
|---|---|
| `picsum.photos` | Imágenes completamente aleatorias. Un guitar puede mostrar una montaña. |
| `images.unsplash.com` | Requiere IDs específicos verificados. Sin un ID conocido, no se puede usar. |
| `source.unsplash.com` | **Deprecado** desde 2023. Da 503. |
| `loremflickr.com` | ✅ Busca por keyword en Flickr. Siempre imágenes del rubro. Sin API key. |

### Formato de URL

```
https://loremflickr.com/{width}/{height}/{keyword1,keyword2}?lock={n}
```

- **keyword**: en inglés. `guitar`, `piano,keyboard`, `drums`, `violin`, etc.
- **lock**: número entero. Mismo `lock` + mismos keywords = siempre la misma foto. Determinístico.
- **Sin lock**: imagen aleatoria en cada request (no usar en producción).

### Ejemplos

```
https://loremflickr.com/800/600/guitar,acoustic?lock=1   → guitarra acústica (siempre la misma)
https://loremflickr.com/800/600/piano,keyboard?lock=2   → piano/teclado
https://loremflickr.com/800/600/drums,percussion?lock=4 → batería
https://loremflickr.com/800/600/violin?lock=5           → violín
https://loremflickr.com/800/600/coffee,espresso?lock=3  → café espresso
https://loremflickr.com/800/600/burger,hamburger?lock=1 → hamburguesa
https://loremflickr.com/2400/1200/guitar,music?lock=1   → hero full-width de música
```

---

## Keywords por rubro (usar en mock data y secciones)

| Rubro | Keyword recomendado |
|---|---|
| Guitarras acústicas/criollas | `guitar,acoustic` |
| Guitarras eléctricas | `electric,guitar` |
| Pianos digitales | `piano,keyboard` |
| Sintetizadores / teclados | `synthesizer,keyboard` |
| Bajos eléctricos | `bass,guitar` |
| Baterías acústicas | `drums,percussion` |
| Baterías electrónicas | `electronic,drums` |
| Violín | `violin` |
| Trompeta | `trumpet` |
| Saxofón | `saxophone` |
| Accesorios de guitarra | `guitar,accessories` |
| Café / Cafetería | `coffee,espresso` |
| Hamburguesería | `burger,hamburger` |
| Panadería | `bread,bakery` |
| Pastelería | `cake,pastry` |
| Heladería | `ice,cream` |
| Restaurante genérico | `restaurant,food` |
| Skincare / Cosmética | `skincare,cosmetics` |
| Ropa / Indumentaria | `fashion,clothing` |
| Calzado | `shoes,sneakers` |
| Joyería | `jewelry,ring` |
| Estudio profesional | `office,business` |
| Librería | `book,library` |
| Bicicletas / deporte | `bicycle,sport` |
| Mascota | `pet,dog` |
| Tecnología / gadgets | `technology,gadget` |

> **Para keywords no listados:** ir a [loremflickr.com](https://loremflickr.com) y probar el keyword en la URL. Si devuelve fotos relevantes, usarlo.

---

## ⚠️ OBLIGATORIO: Crear `lib/placeholder-images.ts`

```typescript
// lib/placeholder-images.ts

/**
 * Mapeo rubro/nombre → keywords en inglés para LoremFlickr.
 * Las búsquedas en Flickr funcionan mejor en inglés.
 */
const RUBRO_KEYWORDS: Record<string, string> = {
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
  trompeta: "trumpet",
  saxofon: "saxophone",
  accesorios: "guitar,accessories",
  cafe: "coffee,espresso",
  cafeteria: "coffee,cafe",
  hamburguesa: "burger,hamburger",
  pizza: "pizza",
  restaurant: "restaurant,food",
  panaderia: "bread,bakery",
  pasteleria: "cake,pastry",
  heladeria: "ice,cream",
  ropa: "fashion,clothing",
  indumentaria: "fashion,shirt",
  skincare: "skincare,cosmetics",
  cosmetica: "cosmetics,beauty",
  joyeria: "jewelry,ring",
  libro: "book,library",
  bicicleta: "bicycle,cycling",
  deporte: "sport,fitness",
  mascota: "pet,dog",
  tech: "technology,gadget",
  muebles: "furniture,interior",
};

/**
 * Deriva keywords LoremFlickr de un nombre/rubro (acepta español).
 */
function deriveKeyword(nameOrRubro: string): string {
  const clean = nameOrRubro
    .toLowerCase()
    .replace(/[áàäâ]/g, "a").replace(/[éèëê]/g, "e")
    .replace(/[íìïî]/g, "i").replace(/[óòöô]/g, "o")
    .replace(/[úùüû]/g, "u").replace(/ñ/g, "n")
    .replace(/[^a-z0-9\s-]/g, "").trim();

  if (RUBRO_KEYWORDS[clean]) return RUBRO_KEYWORDS[clean];

  const firstWord = clean.split(/\s+/)[0];
  if (RUBRO_KEYWORDS[firstWord]) return RUBRO_KEYWORDS[firstWord];

  for (const [key, val] of Object.entries(RUBRO_KEYWORDS)) {
    if (clean.includes(key)) return val;
  }

  // Fallback: primeras 2 palabras del nombre
  return clean.split(/\s+/).filter((w) => w.length >= 3).slice(0, 2).join(",") || "product";
}

/**
 * Lock determinístico: mismo string → siempre el mismo número → misma foto.
 */
function deterministicLock(seed: string): number {
  let hash = 0;
  for (const ch of seed) hash = (hash * 31 + ch.charCodeAt(0)) & 0xffff;
  return (hash % 50) + 1;
}

/**
 * Genera URL LoremFlickr con keyword del rubro.
 * @param keyword  Palabra clave (inglés) o nombre/rubro en español (se mapea automáticamente)
 * @param width    Ancho de la imagen
 * @param height   Alto de la imagen
 * @param lock     Número de lock. Default: derivado del keyword (determinístico).
 */
export function getFlickrImage(keyword: string, width = 800, height = 600, lock?: number): string {
  const kw = deriveKeyword(keyword);
  const lockNum = lock ?? deterministicLock(keyword);
  return `https://loremflickr.com/${width}/${height}/${kw}?lock=${lockNum}`;
}

/**
 * Resuelve la imagen de un producto:
 * 1. Imagen real de la DB → usa esa
 * 2. Fallback → LoremFlickr con keyword del nombre del producto
 */
export function getProductImage(
  product: { name: string; product_images?: { url: string; alt?: string | null }[] },
  width = 800,
  height = 600
): string {
  if (product.product_images?.[0]?.url) {
    return product.product_images[0].url;
  }
  return getFlickrImage(product.name, width, height);
}

/**
 * Genera imagen para secciones decorativas (hero, nosotros, etc.)
 * @param keyword  Rubro o descripción del contexto
 * @param lock     Optional: forzar lock específico para más control visual
 */
export function getSectionImage(keyword: string, width = 1200, height = 800, lock?: number): string {
  return getFlickrImage(keyword, width, height, lock);
}

/**
 * Genera imagen de producto para mock data según el rubro.
 * Cada índice produce una imagen diferente del mismo rubro.
 *
 * @example
 * product_images: [{ url: getProductImageByRubro("instrumentos", 0), alt: "...", position: 0 }]
 */
export function getProductImageByRubro(rubro: string, index: number, width = 800, height = 600): string {
  const kw = deriveKeyword(rubro);
  return `https://loremflickr.com/${width}/${height}/${kw}?lock=${(index % 20) + 1}`;
}

/** @deprecated Usar getFlickrImage() */
export function getPlaceholderImage(seed: string, width = 800, height = 600): string {
  return getFlickrImage(seed, width, height);
}
```

---

## Patrón de mock data CORRECTO

### ✅ Opción A — URLs explícitas por producto (más control)

```tsx
const MOCK_PRODUCTS = [
  {
    id: "mock-1",
    name: "Guitarra Criolla Clásica",
    slug: "guitarra-criolla-clasica",
    price: 185000,
    // ...
    product_images: [
      {
        url: "https://loremflickr.com/800/600/guitar,acoustic?lock=1",
        alt: "Guitarra criolla clásica",
        position: 0,
      },
    ],
  },
  {
    id: "mock-2",
    name: "Piano Digital Stage 88",
    slug: "piano-digital-stage-88",
    price: 890000,
    product_images: [
      {
        url: "https://loremflickr.com/800/600/piano,keyboard?lock=2",
        alt: "Piano digital Stage 88",
        position: 0,
      },
    ],
  },
  // ... cada producto con su keyword de instrumento
];
```

### ✅ Opción B — Usando getProductImageByRubro() (más rápido de escribir)

```tsx
import { getProductImageByRubro } from "@/lib/placeholder-images";

const MOCK_PRODUCTS_BASE = [
  { id: "mock-1", name: "Guitarra Criolla", slug: "guitarra-criolla", price: 185000, ... },
  { id: "mock-2", name: "Piano Digital", slug: "piano-digital", price: 890000, ... },
];

// Agregar imágenes del rubro
const MOCK_PRODUCTS = MOCK_PRODUCTS_BASE.map((p, i) => ({
  ...p,
  product_images: [{ url: getProductImageByRubro("instrumentos", i), alt: p.name, position: 0 }],
}));
```

### ❌ MAL — product_images vacío

```tsx
product_images: [], // ← fallback a getProductImage(product) que usa el nombre en español → puede no mapear bien
```

---

## Imágenes para secciones decorativas (Hero, Nosotros, etc.)

```tsx
import { getSectionImage } from "@/lib/placeholder-images";

// Hero full-width de tienda de música
<img
  src={getSectionImage("guitar,music", 2400, 1200, 1)}
  alt="Tienda de instrumentos"
  className="w-full h-full object-cover"
/>

// Sección Nosotros (~50vw)
<img
  src={getSectionImage("music,store", 1200, 800, 2)}
  alt="Local de Play Music"
  className="w-full h-full object-cover"
/>

// Hero de cafetería
<img
  src={getSectionImage("coffee,cafe", 2400, 1200, 1)}
  alt="Interior cafetería"
  className="w-full h-full object-cover"
/>
```

---

## Configurar `next.config.ts`

LoremFlickr redirige a imágenes en `live.staticflickr.com`. Si se usa `<Image>` de Next.js (no recomendado para demos), agregar los dominios:

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "loremflickr.com" },
      { protocol: "https", hostname: "live.staticflickr.com" },
      { protocol: "https", hostname: "*.staticflickr.com" },
    ],
  },
};
```

> **Recomendación:** para imágenes de producto en demos, usar siempre `<img>` nativo (no `<Image>` de Next.js). No hay beneficio de optimización con imágenes de terceros y evita configurar remotePatterns.

---

## Dimensiones por contexto

| Contexto | URL |
|---|---|
| Hero full-viewport | `https://loremflickr.com/2400/1200/{keyword}?lock={n}` |
| Sección decorativa (~50vw) | `https://loremflickr.com/1200/800/{keyword}?lock={n}` |
| Product card / bento | `https://loremflickr.com/800/600/{keyword}?lock={n}` |
| Thumbnail (carrito, resumen) | `https://loremflickr.com/400/400/{keyword}?lock={n}` |

---

## Validación

- [ ] `lib/placeholder-images.ts` creado con `getProductImage()`, `getSectionImage()`, `getProductImageByRubro()`.
- [ ] **MOCK_PRODUCTS tienen `product_images` con URLs LoremFlickr del rubro** (keyword relevante + lock fijo).
- [ ] Todas las cards usan `getProductImage()`.
- [ ] Hero y sección Nosotros tienen imagen LoremFlickr del rubro.
- [ ] `next.config.ts` tiene `loremflickr.com` y `*.staticflickr.com` en remotePatterns.
- [ ] Todas las imágenes con `object-cover` y `aspect-ratio` fijo.
