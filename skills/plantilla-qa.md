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

## Flujo — 4 checks en orden

Ejecutar en secuencia. Si un check falla, aplicar el fix antes de continuar.

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

**Catálogo (`app/(public)/catalogo/page.tsx`):**
```bash
grep -n "MOCK_PRODUCTS\|MOCK_CATEGORIES\|displayProducts\|try {" "app/(public)/catalogo/page.tsx"
```

Verificar que existen `MOCK_PRODUCTS` (mínimo 10) y `MOCK_CATEGORIES` (mínimo 3), y que los fetches de Supabase tienen `try/catch` para no romper si las credenciales no están configuradas.

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

### Check 3 — URLs de imágenes en seed SQL

El seed SQL es lo que el cliente ejecuta para poblar su catálogo real. Si las imágenes están rotas, el catálogo del cliente se ve sin fotos.

**Verificar que no hay `source.unsplash.com` (deprecado desde 2023):**
```bash
grep -n "source.unsplash.com" scripts/seed-data.sql
```

Si aparece alguna → reemplazar **todas** con el formato correcto:
```
https://images.unsplash.com/photo-{ID}?w=800&q=80&auto=format&fit=crop
```

Usar los IDs curados por rubro en `sitio-diseno--ref--imagenes-placeholder.md`.

**Verificar que todas las URLs usan el formato CDN directo:**
```bash
grep -c "images.unsplash.com/photo-" scripts/seed-data.sql
```

El número debe coincidir con la cantidad total de imágenes en el INSERT de `product_images`.

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
```

**Cómo leer los resultados:**

| Patrón encontrado | Problema | Fix |
|---|---|---|
| `text-8xl` sin `sm:text-Xel` previo en el mismo elemento | Texto gigante en mobile | Agregar escala: `text-4xl sm:text-6xl lg:text-8xl` |
| `grid-cols-3` sin `grid-cols-1` antes | Grid de 3 columnas en 375px | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` |
| `flex-row` sin `flex-col` en mobile | Items horizontales apilados en pantalla chica | `flex-col sm:flex-row` |
| `grid-cols-5` sin breakpoint en thumbnails | Thumbnails muy angostos en mobile | `grid-cols-4 sm:grid-cols-5` |

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

## Reporte final

```
✅ QA completado — {nombre del proyecto}

Checks:
  ✓/✗ Build sin errores
  ✓/✗ Mock data en home y catálogo (+ filtro de categorías sin secciones vacías)
  ✓/✗ URLs Unsplash en seed SQL (listar las reemplazadas si las hay)
  ✓/✗ Responsive y modernidad (listar fixes y mejoras aplicadas)

Fixes aplicados:
  - (lista concreta de cambios)

Estado: LISTO PARA MOSTRAR / PENDIENTE
Próximo paso: npm run dev → verificar visualmente.
```

---

## Reglas

1. **`npm run build` al inicio y al final.** Si falla al final, el QA no está cerrado.
2. **Corregir, no solo reportar.** Cada problema detectado se arregla en el mismo paso.
3. **No tocar lógica de negocio ni diseño visual.** Solo datos, imágenes, responsive y microinteracciones.
4. **Máximo 3 mejoras de modernidad por corrida.** No sobrecargar el componente.
