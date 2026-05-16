---
name: plantilla-qa
description: Ejecuta QA sobre una plantilla SitioHoy terminada (post sitio-diseno). Verifica que el build pase, que la plantilla se vea llena con datos de muestra, que el filtro de categorías no devuelva secciones vacías, que las imágenes del seed SQL sean URLs válidas, y que el diseño esté responsive y moderno. Si detecta un problema lo corrige automáticamente. Invocar cuando el diseño esté completo y antes de mostrar la plantilla al prospecto. Usar cuando el usuario diga "hacer QA", "testear la plantilla", "revisar la plantilla" o similar.
---
# Skill: QA de Plantilla — SitioHoy
Corre después de que `sitio-diseno` terminó. Objetivo: garantizar que la plantilla se vea completa y funcional antes de mostrarla a un prospecto.
---
## Inputs requeridos
Solo el directorio del proyecto. Detectar automáticamente el nombre, rubro y plan desde los archivos existentes.
---
## Flujo — checks en orden
Ejecutar en secuencia. Si un check falla, aplicar el fix antes de continuar.
---
### Check 0 — Tailwind CSS y next.config.ts (ANTES del build)
Estos errores no siempre rompen el build, pero sí destruyen el diseño en runtime.
#### 0a — Versión de Tailwind y sintaxis de globals.css
```bash
# Verificar versión instalada
grep "tailwindcss" package.json
```
**Si tailwindcss >= 4.x**, verificar que `app/globals.css` usa sintaxis v4:
```bash
grep "@tailwind\|@import" app/globals.css
```
| Resultado | Estado | Fix |
|---|---|---|
| `@import "tailwindcss"` | ✅ Correcto | Continuar |
| `@tailwind base` | ❌ Sintaxis v3 en proyecto v4 | Ver fix abajo |
**Fix si la sintaxis es v3 en un proyecto v4:** Reescribir `app/globals.css` con:
```css
@import "tailwindcss";
@theme {
  /* Colores de marca */
  --color-brand-primary: #HEXVAL;
  --color-brand-secondary: #HEXVAL;
  /* ... demás tokens ... */
  /* Fuentes — usar nombre de la fuente, NO nombre del token */
  --font-display: var(--font-nombreFuente), serif;
  --font-body: var(--font-nombreFuente), sans-serif;
}
```
Y en `app/layout.tsx`, verificar que los `variable` de `next/font` usan el nombre de la fuente (no el nombre del token):
```tsx
// ✅ Correcto en v4
const fraunces = Fraunces({ variable: "--font-fraunces" });
// ❌ Circular en v4 (--font-display: var(--font-display) no resuelve)
const fraunces = Fraunces({ variable: "--font-display" });
```
> Ver `sitio-diseno--ref--tipografia.md` y `sitio-diseno--ref--colores.md` para la sintaxis completa por versión.
#### 0b — `next.config.ts` con `remotePatterns`
El componente `<Image>` de Next.js lanza error de runtime si el hostname externo no está configurado. Verificar:
```bash
grep -n "remotePatterns\|unsplash\|picsum" next.config.ts
```
**Si no aparece `remotePatterns`** y el proyecto usa Unsplash/Picsum con `<Image>`, agregar:
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};
```
> Nota: para thumbnails pequeños (carrito, avatares ≤ 100px) considerar usar `<img>` nativo en lugar de `<Image>` — no hay beneficio de optimización y evita el problema de `remotePatterns`.
---
### Check 1 — Build limpio
```bash
npm run build
```
**Si pasa** → continuar.
**Si falla:**
| Error | Fix |
|---|---|
| `Unknown font` en `app/layout.tsx` | Reemplazar la fuente por `Barlow_Condensed` (display) o `Outfit` (body). Ver lista verificada en `sitio-diseno--ref--tipografia.md`. |
| TypeScript error | Leer el error, corregir el archivo afectado, re-buildear. |
| Module not found | Verificar import, crear el archivo faltante o corregir el path. |
| Otro error de Turbopack | Leer el stack trace completo y corregir en el archivo indicado. |
Volver a correr `npm run build` después de cada fix hasta que pase.
---
### Check 2 — Datos de muestra visibles
La plantilla es un demo — la DB puede estar vacía cuando la ve el prospecto. Sin mock data la home y el catálogo se ven en blanco.
**Home (`app/(public)/page.tsx`):**
```bash
grep -n "MOCK_FEATURED\|displayFeatured\|featured.length > 0" "app/(public)/page.tsx"
```
Verificar que existe `MOCK_FEATURED` con al menos 6 productos del rubro, cada uno con URL de imagen Unsplash, y que la sección de destacados **siempre** se renderiza (no condicionada a `featured.length > 0`).

**⚠️ Check crítico: imágenes en mock data:**
```bash
# Verificar que NINGÚN mock product tiene product_images vacío
grep -n "product_images: \[\]" "app/(public)/page.tsx" "app/(public)/catalogo/page.tsx" "app/(public)/producto/[slug]/page.tsx"
```
Si aparece `product_images: []` en algún mock product → **FIX OBLIGATORIO**: reemplazar con URLs de Unsplash curadas del rubro (ver `sitio-diseno--ref--imagenes-placeholder.md`). Un `product_images: []` hace que `getProductImage()` caiga en picsum con imágenes completamente aleatorias e irrelevantes al rubro.

**Catálogo (`app/(public)/catalogo/page.tsx`):**
```bash
grep -n "MOCK_PRODUCTS\|MOCK_CATEGORIES\|displayProducts\|try {" "app/(public)/catalogo/page.tsx"
```
Verificar que existen `MOCK_PRODUCTS` (mínimo 10) y `MOCK_CATEGORIES` (mínimo 3), y que los fetches de Supabase tienen `try/catch` para no romper si las credenciales no están configuradas.
**Página de producto (`app/(public)/producto/[slug]/page.tsx`):**
```bash
grep -n "MOCK_PRODUCTS\|notFound\|await params\|try {" "app/(public)/producto/[slug]/page.tsx"
```
Verificar que:
1. Existe `MOCK_PRODUCTS` con los mismos slugs que `MOCK_PRODUCTS` en el catálogo.
2. La función `getProduct` tiene try/catch y guarda contra `NEXT_PUBLIC_TENANT_ID` no definido.
3. Se usa `await params` (Next.js 15+), NO `params.slug` directo.
4. El page busca en mock si `getProduct` devuelve `null`.
**Si falta mock en producto:**
Sin mock, todo click en un producto de la demo resulta en 404. Agregar el mismo `MOCK_PRODUCTS` del catálogo (mismos slugs, mismos IDs, con campo `sku: null` en variantes). Ver `scaffold-emprendimiento--ref--producto-page.md`.
**Si falta mock data en alguna de las dos páginas:**
Agregar siguiendo el patrón de `scaffold-esencial--ref--catalogo-page.md`. Usar IDs de Unsplash de `sitio-diseno--ref--imagenes-placeholder.md`.
**Consistencia de IDs entre productos y categorías (filtro vacío):**
El error más común es que el catálogo muestre productos en "Todo" pero devuelva 0 resultados al filtrar por categoría. Ocurre cuando `displayProducts` y `displayCategories` usan fuentes distintas (una real, otra mock), y los IDs no coinciden.
Verificar que el catálogo use un único flag de fuente:
```bash
grep -n "useRealData\|displayProducts\|displayCategories" "app/(public)/catalogo/page.tsx"
```
**Debe** existir un patrón como:
```tsx
const useRealData = products.length > 0 && categories.length > 0;
const displayProducts = useRealData ? products : MOCK_PRODUCTS;
const displayCategories = useRealData ? categories : MOCK_CATEGORIES;
```
**No debe** existir este patrón (condiciones independientes):
```tsx
const displayProducts = products.length > 0 ? products : MOCK_PRODUCTS;
const displayCategories = categories.length > 0 ? categories : MOCK_CATEGORIES;
```
Si el patrón incorrecto está presente → reemplazarlo con `useRealData`.
Además, verificar que todos los `category_id` de `MOCK_PRODUCTS` tienen un `id` correspondiente en `MOCK_CATEGORIES`:
```bash
grep -o "category_id: \"mock-cat-[0-9]*\"" "app/(public)/catalogo/page.tsx" | sort -u
grep -o "id: \"mock-cat-[0-9]*\"" "app/(public)/catalogo/page.tsx" | sort -u
```
Los slugs deben coincidir exactamente. Si un `MOCK_PRODUCT` tiene `category_id: "mock-cat-5"` pero no hay `{ id: "mock-cat-5" }` en `MOCK_CATEGORIES`, ese filtro siempre devuelve 0. Agregar la categoría faltante o corregir el ID.
---
### Check 3 — Sistema de imágenes
#### 3a — Helper de imágenes existe
```bash
# Verificar que el helper existe
test -f lib/placeholder-images.ts && echo "OK" || echo "FALTA"
```
Si no existe → crear según el patrón de `sitio-diseno--ref--imagenes-placeholder.md`.
#### 3b — Cards de producto usan getProductImage()
```bash
grep -rn "getProductImage\|placeholder-images" components/ app/
```
Verificar que las cards de producto usan `getProductImage()` en vez de URLs de Unsplash hardcodeadas. Si alguna card tiene una URL de imagen directa → reemplazar con `getProductImage(product)`.
#### 3c — URLs de Unsplash en seed SQL (si hay product_images)
```bash
# Verificar que no hay source.unsplash.com (deprecado)
grep -n "source.unsplash.com" scripts/seed-data.sql
```
Si aparece alguna → reemplazar o eliminar la fila de product_images (el helper genera placeholder automático).
#### 3d — Hero y secciones decorativas tienen imagen
Verificar que el Hero y la sección "Nosotros" tienen imágenes (Unsplash curadas del rubro o `getSectionImage()`).
---
### Check 3.5 — Header visible en todas las páginas
```bash
# Verificar que el header usa usePathname para detectar la ruta
grep -rn "usePathname\|isHome\|pathname" components/ui/Header* components/Header*
```
**Si el header es transparente sobre el hero**, verificar que tiene lógica para volverse sólido fuera del home. Si no la tiene → agregar `usePathname()` con el patrón de `sitio-diseno--ref--componentes-navegacion.md`.
**Test rápido:** ¿se ve el logo y la nav en la página de catálogo? Si el fondo del catálogo es blanco y el header es transparente → el header es invisible → fix obligatorio.
---
### Check 4 — Responsive y modernidad
Análisis estático del código. No requiere ver la página renderizada.
#### 4a — Problemas responsive
```bash
# Textos grandes — verificar que tengan escala mobile antes
grep -rn "text-7xl\|text-8xl\|text-9xl\|text-\[" app/ components/
# Grids con más de 1 columna — verificar que empiecen en grid-cols-1
grep -rn "grid-cols-[2-9]" app/ components/
# Flex-row — verificar que tengan flex-col antes
grep -rn "flex-row" app/ components/
# Overflow horizontal — buscar anchos fijos que rompan en mobile
grep -rn "w-\[.*px\]" app/ components/
```
**Cómo leer los resultados:**
| Patrón encontrado | Problema | Fix |
|---|---|---|
| `text-8xl` sin `sm:text-Xel` previo en el mismo elemento | Texto gigante en mobile | Agregar escala: `text-4xl sm:text-6xl lg:text-8xl` |
| `grid-cols-3` sin `grid-cols-1` antes | Grid de 3 columnas en 375px | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` |
| `flex-row` sin `flex-col` en mobile | Items horizontales apilados en pantalla chica | `flex-col sm:flex-row` |
| `grid-cols-5` sin breakpoint en thumbnails | Thumbnails muy angostos en mobile | `grid-cols-4 sm:grid-cols-5` |
| `w-[500px]` en un contenedor | Overflow horizontal en mobile | `w-full max-w-[500px]` |
Ignorar resultados que ya tienen el breakpoint menor antes (ej: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` está bien).
#### 4b — Microinteracciones
```bash
# Imágenes en cards sin zoom en hover
grep -rn "object-cover" app/ components/ | grep -v "group-hover:scale\|transition"
```
Si hay imágenes en cards sin zoom en hover → agregar `transition-transform duration-700 group-hover:scale-110` a la imagen (y `group` al contenedor padre si no lo tiene).
#### 4c — Mejoras de modernidad
Leer los archivos del Hero, Home y Catálogo. Evaluar cuáles de estas mejoras aplican y aplicar **hasta 3** directamente:
| Mejora | Cuándo aplicar | Implementación |
|---|---|---|
| **Contadores animados en stats** | Si hay sección de stats con números estáticos ("+35 años") | Componente cliente `StatsGrid` con `useInView` de framer-motion que cuenta de 0 al valor |
| **Badge flotante en Hero** | Si el Hero es full-screen sin elementos secundarios | `<motion.div>` con `rotate-[-3deg]` y texto del rubro ("Abierto hoy · 8 a 23 hs") |
| **Hover reveal en ProductCard** | Si las cards no tienen overlay al hover | Overlay con `h-0 group-hover:h-12` y texto "Ver detalle →" |
| **Scroll indicator** | Si el Hero es full-screen y no hay indicador de scroll | Línea vertical `h-12` con gradiente que desaparece + "Scroll" en display uppercase |
| **Divider decorativo entre secciones** | Si dos secciones del mismo color se tocan sin separación | `<div className="h-px bg-gradient-to-r from-transparent via-brand-accent to-transparent" />` |
| **Gradiente en palabra clave del heading** | Si todos los headings son color plano | `bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent` en 1 palabra |
---
### Check 5 — Diversidad visual (anti-repetitividad)
Verificar que la plantilla NO cae en los patrones repetitivos de siempre.
#### 5a — Detectar patrones repetitivos
```bash
# ¿El hero es el típico split 2-col? (repetitivo si SIEMPRE es así)
grep -rn "grid.*lg:grid-cols-2\|lg:grid-cols-2.*items-center" components/ui/Hero* components/Hero*
# ¿Todas las animaciones son fade-up? (debería haber variedad)
grep -rn "opacity.*0.*y.*24\|y:.*24\|y:.*20" components/ app/ | wc -l
# ¿El catálogo es sidebar+grid? (verificar si hay alternativa)
grep -rn "grid.*lg:grid-cols-\[.*sidebar\|aside\|sidebar" app/\(public\)/catalogo/
# ¿El footer es siempre 3-4 col oscuro?
grep -rn "grid.*sm:grid-cols-2.*lg:grid-cols-4\|grid-cols-4" components/ui/Footer* components/Footer*
# ¿Todas las secciones del home están centradas con max-w-6xl?
grep -rn "max-w-6xl.*mx-auto\|mx-auto.*max-w-6xl" app/\(public\)/page.tsx components/ui/HomeSections*
```
#### 5b — Evaluar diversidad
Leer los archivos principales y responder:
| Pregunta | Si la respuesta es "sí" = ⚠️ |
|---|---|
| ¿El hero es un split 2-col imagen/texto que ya se usó en otras plantillas? | Probar algo diferente |
| ¿TODAS las animaciones son `opacity: 0, y: 24`? | Mezclar con clip-path, scale, slide lateral |
| ¿El catálogo es sidebar izquierda + grid derecha? | Probar tabs arriba, menú tipo restaurante, masonry |
| ¿Todas las secciones del home tienen el mismo layout centrado? | Alternar con full-bleed, zigzag, bento |
| ¿El footer es el grid 4-col dark de siempre? | Probar footer minimal, CTA footer, o algo creativo |
| ¿Las cards de producto son todas iguales (vertical con imagen arriba)? | Probar horizontal, overlay, lista minimalista |
**Si 3+ preguntas dan "sí":** reportar "falta diversidad visual — la plantilla se ve como las anteriores" y sugerir cambios específicos.
#### 5c — Comparar contra otra plantilla del mismo rubro (si existe)
Si hay otra plantilla en el mismo directorio padre:
```bash
# Ver si la estructura del home es distinta
diff <(grep -n "section\|className" ../otra-plantilla/app/\(public\)/page.tsx | head -30) <(grep -n "section\|className" app/\(public\)/page.tsx | head -30)
```
Si la estructura es muy similar → reportar.
---
### Check 6 — Flujo funcional (solo Emprendimiento/Empresa)
#### 6a — Seed data consistencia
```bash
# Verificar que no quedaron {tenant_id} sin reemplazar
grep -n "tenant_id" scripts/seed-data.sql | head -5
# Verificar que usa TODO_TENANT_ID consistente
grep -c "TODO_TENANT_ID" scripts/seed-data.sql
```
Si hay mezcla de `{tenant_id}` y `TODO_TENANT_ID` → unificar a `TODO_TENANT_ID`.
#### 6b — API routes existen
```bash
# Plan Emprendimiento y Empresa
ls -la app/api/create-preference/route.ts 2>/dev/null
ls -la app/api/process-payment/route.ts 2>/dev/null
ls -la app/api/webhooks/mercadopago/route.ts 2>/dev/null
ls -la app/api/shipping/zones/route.ts 2>/dev/null || ls -la app/api/shipping/calculate/route.ts 2>/dev/null
ls -la app/api/coupons/validate/route.ts 2>/dev/null
# Todos los planes
ls -la app/api/contact/route.ts 2>/dev/null
ls -la app/api/tenant-config/route.ts 2>/dev/null
```
Si falta alguno → **reportar** qué archivo falta y qué ref-skill lo genera.
#### 6c — Checkout flow (Emprendimiento/Empresa)
Verificar que la cadena completa existe:
```bash
# Carrito → Datos → Checkout → Status
ls -la app/\(public\)/carrito/page.tsx 2>/dev/null
ls -la app/checkout/page.tsx 2>/dev/null
```
Si falta algún paso del flujo → **reportar**.
---
## Reporte final
```
✅ QA completado — {nombre del proyecto}
Checks:
  ✓/✗ Tailwind version + globals.css syntax + next.config.ts remotePatterns
  ✓/✗ Build sin errores
  ✓/✗ Mock data en home, catálogo Y página de producto (+ filtro sin secciones vacías)
  ✓/✗ URLs Unsplash en seed SQL
  ✓/✗ Responsive y modernidad
  ✓/✗ Diversidad visual (anti-repetitividad)
  ✓/✗ Flujo funcional (API routes + checkout)
Fixes aplicados:
  - (lista concreta de cambios)
Advertencias diversidad:
  - (si la estructura es similar a otra plantilla, o si cae en patrones repetitivos)
Estado: LISTO PARA MOSTRAR / PENDIENTE
Próximo paso: npm run dev → verificar visualmente.
```
---
## Reglas
1. **Check 0 antes del build.** El CSS roto no rompe el build pero sí la página — detectar antes.
2. **`npm run build` al inicio y al final.** Si falla al final, el QA no está cerrado.
3. **Corregir, no solo reportar** — excepto problemas de diversidad visual que requieren decisión de diseño.
4. **No tocar lógica de negocio ni diseño visual.** Solo datos, imágenes, responsive y microinteracciones.
5. **Máximo 3 mejoras de modernidad por corrida.** No sobrecargar el componente.
6. **Si el plan es Esencial, saltar Check 6b/6c** (no hay checkout ni MP).
7. **El order status válido es:** `pending`, `confirmed`, `preparing`, `shipped`, `delivered`, `cancelled`. Si aparece `created` o `approved` → corregir.