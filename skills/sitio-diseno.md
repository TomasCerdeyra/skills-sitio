---
name: sitio-diseno
description: Aplica el diseño visual completo a una plantilla SitioHoy sobre el scaffold ya creado. Las plantillas se generan para mostrar a prospectos en un pitch — NO son sitios de clientes confirmados. Por eso deben verse llenas, atractivas, con copy verosímil del rubro, imágenes placeholder reales (Unsplash) y datos de prueba (seed). Recibe rubro, objetivo y colores. Define dirección estética y luego diseña con LIBERTAD CREATIVA TOTAL — cada plantilla debe ser VISUALMENTE ÚNICA. NUNCA produce diseños genéricos, estáticos ni repetitivos. Cada plantilla debe verse LISTA PARA VENDER. Usar cuando el scaffold ya esté listo y haya que diseñar la UI.
---

# Skill: Diseño Visual — SitioHoy (Plantillas Demo)

Toma un scaffold existente y aplica un diseño completo, animado, único y moderno.

## Filosofía de diseño

**No te limitamos con componentes predefinidos.** Tenés libertad creativa total para diseñar cada plantilla de forma única. Lo que sí definimos son:

- **Mood** — la sensación que tiene que transmitir el sitio
- **Principios** — reglas de calidad visual que siempre aplican
- **Contenido necesario** — qué información tiene que estar
- **Constraints técnicos** — cómo tiene que funcionar en Next.js

La creatividad de CÓMO se ve, CÓMO se organiza, CÓMO se anima → **es tuya**.

---

## Framing crítico — leer antes de empezar

Las páginas que genera este skill son **plantillas demo para mostrar a prospectos**, no sitios de clientes confirmados. Esto implica:

- **La plantilla tiene que verse LLENA y VIVA.** Sin secciones vacías. Sin "TODO".
- **Imágenes placeholder son obligatorias** (Unsplash). Una plantilla sin imágenes es imposible de vender.
- **Animaciones son obligatorias.** Una plantilla estática no se elige nunca.
- **El seed data se carga.** El catálogo debe tener contenido real visible al hacer `npm run dev`.
- **El copy es verosímil pero NO específico.** Inventar tono y vibra del rubro, no datos reales.
- **Cada plantilla debe estar LISTA PARA MOSTRAR sin tocar nada después de `npm run dev`.**

---

## Inputs requeridos

Si no fueron provistos, preguntar:

1. **Rubro del negocio** (ej: `bar de hamburguesas`, `café de especialidad`, `skincare premium`).
2. **Objetivo del diseño** — qué tiene que lograr el sitio en el visitante.
3. **Color principal** (hex) — si no viene dado, proponer 2-3 opciones acordes al rubro.
4. **Color secundario** (hex, opcional) — si no se da, derivar.
5. **Plan** (Esencial / Emprendimiento / Empresa) — define qué páginas implementar.
6. **Nombre del negocio** — si ya viene del scaffold, reutilizarlo.
7. **Mood o referencia visual** (opcional) — si el usuario tiene una idea de cómo quiere que se sienta el sitio.

---

## Flujo por etapas

5 etapas secuenciales. **NO saltarse ninguna.**

### Etapa 1 — Dirección de diseño

Cargar `sitio-diseno--ref--direccion-estetica.md` como referencia de tonos.

Definir y comunicar al usuario:

**a) Mood del diseño (3-4 frases evocadoras):**

No decir "tono editorial" — describir la SENSACIÓN:

```
MOOD: Nocturno, industrial, con personalidad.
Como un bar que tiene su propia playlist y su propia salsa secreta.
La carta se siente como un objeto de diseño, no como una lista de precios.
Oscuro pero no frío. Tipografía con carácter.
```

**b) Una decisión visual única:**

Cada plantilla debe tener AL MENOS un elemento visual que la haga memorable. Algo que si alguien ve dos plantillas lado a lado, note la diferencia inmediatamente. Ejemplos:

- Un hero que es un collage de fotos recortadas con bordes irregulares
- Un menú que se presenta como una pizarra de tiza, no como un grid de cards
- Secciones con formas SVG como separadores (ondas, montañas, diagonal)
- Tipografía display gigante que se usa como elemento decorativo
- Una paleta monocromática donde el único color es el CTA
- Un layout asimétrico donde nada está centrado

**c) Inspiración visual (opcional pero recomendado):**

Si conocés sitios web que tengan el feeling buscado, mencionarlos como guía de estructura (NO para copiar el diseño).

Comunicar todo al usuario antes de avanzar.

### Etapa 2 — Tipografía y colores

Cargar:
- `sitio-diseno--ref--tipografia.md`
- `sitio-diseno--ref--colores.md`

Aplicar a `tailwind.config.ts` y `app/layout.tsx`.

**Tipografía con carácter.** La lista negativa estricta del ref de tipografía sigue vigente — no usar Inter, Roboto, Poppins, Montserrat ni ninguna fuente genérica.

### Etapa 3 — Copy, imágenes y seed data

Cargar:
- `sitio-diseno--ref--copy-por-rubro.md` → para textos del Hero, secciones, CTAs, footer.
- `sitio-diseno--ref--imagenes-placeholder.md` → URLs de Unsplash por keyword del rubro.
- `sitio-diseno--ref--seed-data-sql.md` → generar `scripts/seed-data.sql` adaptado al rubro.

**Aplicar copy directamente.** No usar `{COMPLETAR: ...}` en texto visible. Si hay algo que sí o sí debe revisar el dueño del negocio (dirección, teléfono), poner valor verosímil + comentario en código:

```tsx
{/* Cliente: revisar/reemplazar con datos reales */}
<p>Av. Corrientes 1234, CABA</p>
```

### Etapa 4 — Implementar con libertad creativa

Cargar según necesidad:
- `sitio-diseno--ref--componentes-hero.md` → patrones técnicos de Hero (client component, stagger)
- `sitio-diseno--ref--componentes-navegacion.md` → patrones de Header + Footer + MobileMenu
- `sitio-diseno--ref--componentes-catalogo.md` → queries Supabase, ProductCard, grid
- `sitio-diseno--ref--componentes-producto.md` → galería, variantes, CTA
- `sitio-diseno--ref--componentes-checkout.md` → solo Emprendimiento/Empresa
- `sitio-diseno--ref--responsive-mobile.md` → validar mobile
- `sitio-diseno--ref--inspiracion-diseno.md` → galería de ideas por tipo de componente

> **IMPORTANTE:** los refs de componentes son REFERENCIA TÉCNICA (cómo conectar con Supabase, cómo estructurar un client component, etc.), NO son templates a copiar literalmente. Usá los patrones técnicos pero diseñá la UI como quieras.

**Contenido que debe estar en la HOME (organizar libremente):**

- Una entrada visual impactante que comunique qué es el lugar/marca
- Los productos/platos más importantes visibles rápido
- Información práctica del negocio (horarios, ubicación, contacto) — puede estar integrada en cualquier sección
- Una razón para confiar (historia, proceso, valores, diferencial)
- Un cierre que invite a actuar (pedir, reservar, contactar)

**Decisiones LIBRES — innovar en cada plantilla:**

- Cómo se organiza cada bloque (grid, lista, cards, texto corrido, galería, scroll horizontal, tabs, acordeón...)
- Qué secciones se fusionan (¿horarios dentro del hero? ¿productos como slider? ¿nosotros como modal?)
- Cuántas secciones hay (pueden ser 3 grandes o 8 compactas)
- Cómo transicionan entre sí (fondos alternados, separadores SVG, gradientes, overlap...)
- El tipo de animaciones (fade, slide, clip, scale, rotate, stagger, parallax, scroll-driven...)
- El layout del header y footer (sidebar nav, centrado, minimalista, mega footer, sticky...)
- El grid del catálogo (cards, lista, masonry, horizontal scroll, tabs por categoría, menú tipo restaurante...)
- La organización de la carta/menú (¿por categorías con anclas? ¿filtros como dropdown? ¿sidebar? ¿chips? ¿tabs?)

#### Reglas técnicas que siempre aplican

**Hero — siempre como componente cliente separado:**
El hero usa Framer Motion → necesita `"use client"`. Las pages del App Router son Server Components.

Flujo obligatorio:
1. Crear `components/ui/HeroSection.tsx` con `"use client"` y animaciones de Framer Motion.
2. Importarlo en `app/(public)/page.tsx` y pasarle props necesarias (`waLink`, etc.).

**Header visible en TODAS las páginas:**
Si el header es transparente sobre el hero de la home, **debe volverse sólido** al navegar a otras páginas (catálogo, nosotros, contacto, producto). Usar `usePathname()` para detectar la ruta actual. Un header transparente sobre fondo blanco es invisible → bug.

**Helper de imágenes — crear `lib/placeholder-images.ts` (OBLIGATORIO):**
Antes de implementar cualquier componente con imágenes, crear el helper `getProductImage()`. Ver `sitio-diseno--ref--imagenes-placeholder.md` para el código completo. Este helper:
- Prioriza la imagen real de la DB si existe
- Genera placeholder determinístico por nombre de producto si no hay imagen
- Elimina la necesidad de URLs de Unsplash hardcodeadas en las cards

**Mock data — datos de muestra como fallback (OBLIGATORIO):**
La plantilla se usa como demo — la DB de Supabase puede estar vacía. Sin fallback, la home y el catálogo se ven vacíos.

**⚠️ NUNCA dejar `product_images: []` en mock data.** Eso cae en picsum con imágenes completamente aleatorias. Usar siempre URLs de Unsplash curadas del rubro (ver `sitio-diseno--ref--imagenes-placeholder.md`).

Patrón a aplicar en **`app/(public)/page.tsx`**:
```tsx
// Usar IDs de Unsplash curadas del rubro — ver sitio-diseno--ref--imagenes-placeholder.md
const MOCK_FEATURED = [
  { id: "mock-1", name: "Guitarra Criolla", slug: "guitarra-criolla", price: 185000,
    compare_at_price: null, description: "...", featured: true, category_id: "mock-cat-1",
    product_images: [{ url: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=80&auto=format&fit=crop", alt: "Guitarra criolla", position: 0 }] },
  // 5 productos más con product_images con URLs curadas del rubro
];

export default async function HomePage() {
  const featured = await getFeaturedProducts(); // puede devolver [] si DB vacía
  const displayFeatured = featured.length > 0 ? featured : MOCK_FEATURED;
}
```

Patrón a aplicar en **`app/(public)/catalogo/page.tsx`**:
```tsx
// MOCK_PRODUCTS: cada producto con product_images curadas del rubro
const MOCK_PRODUCTS = [...]; // 10-12 productos del rubro — NO product_images: []
const MOCK_CATEGORIES = [...]; // 4 categorías del rubro

export default async function CatalogPage() {
  let products: any[] = [];
  let categories: any[] = [];
  try {
    [products, categories] = await Promise.all([getProducts(), getCategories()]);
  } catch {}
  const useRealData = products.length > 0 && categories.length > 0;
  const displayProducts = useRealData ? products : MOCK_PRODUCTS;
  const displayCategories = useRealData ? categories : MOCK_CATEGORIES;
}
```

**Instalar framer-motion:**
```bash
npm install framer-motion
```

### Etapa 5 — QA

Cargar `plantilla-qa.md` y ejecutar el QA completo.

---

## Principios de diseño (siempre aplican)

1. **Jerarquía visual clara.** Lo más importante se ve primero. El ojo tiene un camino.
2. **Ritmo visual variado.** No todas las secciones con el mismo padding, fondo, o layout. Alternar.
3. **Cada sección tiene razón de existir.** Si no suma valor, no va.
4. **Ningún elemento decorativo sin propósito.**
5. **Al menos una decisión visual que sorprenda** (asimetría, color inesperado, tipografía usada como decoración, layout no convencional).
6. **Contraste entre secciones.** Si una sección es clara, la siguiente oscura (o viceversa). Si una es apretada, la siguiente respira.
7. **Whitespace es un recurso de diseño**, no espacio desperdiciado.
8. **Las animaciones refuerzan la narrativa**, no decoran. Un fade-up en todo es peor que no animar.

---

## Anti-repetitividad: cómo evitar plantillas iguales

**Antes de implementar, preguntarte:**

- ¿El hero que estoy haciendo es diferente al que haría "por default"? Si es el típico imagen+texto split, **cambiar.**
- ¿El catálogo es el mismo sidebar+grid de siempre? **Probar algo nuevo:** tabs, scroll horizontal, menú tipo restaurante con anclas.
- ¿Todas las secciones están centradas con `max-w-6xl`? **Romper** al menos una con full-bleed o asimetría.
- ¿Las animaciones son todas `opacity: 0, y: 24`? **Mezclar** con clip-path, scale, slide lateral, stagger creativo.
- ¿El footer es el grid de 4 columnas oscuro de siempre? **Probar** un footer minimal, un CTA footer, o algo inesperado.

**Regla de oro: si sentís que "ya hice esto antes", cambiá la dirección.**

---

## Reglas absolutas

1. **Diseño único en cada plantilla.** Si dos plantillas se ven iguales en estructura, el skill falló.
2. **Copy verosímil del rubro siempre.** Sin `{COMPLETAR: ...}` visible al usuario.
3. **Imágenes placeholder de Unsplash en TODO** — Hero, productos, secciones decorativas.
4. **Tipografía con carácter.** Lista negativa estricta — ver `sitio-diseno--ref--tipografia.md`.
5. **Animaciones obligatorias.** Pero variadas y con propósito, no el mismo fade-up en todo.
6. **Mobile primero.** El CTA principal del Hero visible sin scroll en 375px (iPhone SE).
7. **Datos de prueba (seed) siempre.** Generar `scripts/seed-data.sql` adaptado al rubro.
8. **`npm run build` sin errores** antes de cerrar.
9. **`npm run dev` debe mostrar la plantilla LLENA, ANIMADA y BONITA** sin que el usuario haga nada más que ejecutar el seed SQL.
10. **CSS keyframes van en `app/globals.css`, nunca en `<style jsx global>`** — styled-jsx no funciona en Server Components (App Router) y el build falla. Agregar siempre los `@keyframes` en globals.css dentro del bloque de CSS puro (fuera de `@theme`).

---

## Checklist final antes de cerrar

### Diseño y creatividad
- [ ] El mood definido en Etapa 1 se refleja en TODO el sitio (no solo el hero).
- [ ] Hay al menos UNA decisión visual que hace esta plantilla memorable.
- [ ] La estructura de la home es diferente a "la que haría por default".
- [ ] El catálogo/carta NO es el típico sidebar+grid (a menos que haya una razón creativa).
- [ ] Las animaciones son variadas (no todo fade-up con y: 24).
- [ ] El header y footer tienen diseño propio (no el template de siempre).

### Configuración
- [ ] `tailwind.config.ts` con tokens de marca + tipografía custom.
- [ ] `app/layout.tsx` con fuentes cargadas via `next/font/google` (no Inter, Roboto, Poppins, Montserrat).
- [ ] Fuente elegida verificada con `npm run build` — no genera "Unknown font".
- [ ] `framer-motion` instalado y usado.

### Páginas y componentes
- [ ] **Hero en `components/ui/HeroSection.tsx`** con `"use client"` y Framer Motion — NUNCA inline en server page.
- [ ] Home con mínimo 4 secciones con contenido real del rubro.
- [ ] **`MOCK_FEATURED` en home** — sección de destacados visible aunque la DB esté vacía.
- [ ] **`MOCK_PRODUCTS` + `MOCK_CATEGORIES` en catálogo** — grid visible aunque la DB esté vacía.
- [ ] Detalle de producto con galería + CTA según plan.
- [ ] Nosotros con copy del rubro + imágenes.
- [ ] Contacto con form + datos verosímiles + WhatsApp.
- [ ] Checkout completo (si aplica al plan).
- [ ] WhatsAppFloat visible en mobile sin tapar contenido.

### Animaciones (obligatorias)
- [ ] Hero con entrada animada (stagger o reveal).
- [ ] Header con comportamiento al scroll (shrink, color change, etc.).
- [ ] Reveals on scroll en las secciones de la home.
- [ ] Hover en todos los botones y links interactivos.
- [ ] Mobile menu animado (drawer, slide, fade).

### Contenido
- [ ] Copy verosímil del rubro en TODOS los textos. Cero `{COMPLETAR}` visible.
- [ ] Imágenes Unsplash en Hero, productos, secciones decorativas.
- [ ] `scripts/seed-data.sql` generado con productos, categorías y (si aplica) zonas/cupones del rubro.
- [ ] El sitio se ve completo al ejecutar el seed + `npm run dev`.

### Responsive
- [ ] iPhone SE (375x667) — CTA del Hero visible sin scroll.
- [ ] iPhone 14 Pro (393x852) — todo cómodo.
- [ ] iPad mini (768x1024) — layout intermedio.
- [ ] Desktop (1280x800) — max-width respetado.

### Calidad
- [ ] `npm run build` sin errores ni warnings críticos.
- [ ] Sin `console.log` ni código de debug.
- [ ] Todas las imágenes con `object-cover` + `aspect-ratio` fijo.
- [ ] Estados de carga y vacío manejados.
- [ ] WCAG AA: contraste validado en textos sobre fondos.
