---
name: sitio-diseno
description: Aplica el diseño visual completo a una plantilla SitioHoy sobre el scaffold ya creado. Las plantillas se generan para mostrar a prospectos en un pitch — NO son sitios de clientes confirmados. Por eso deben verse llenas, atractivas, con copy verosímil del rubro, imágenes placeholder reales (Unsplash) y datos de prueba (seed). Recibe rubro, objetivo y colores. Define dirección estética, tipografía, paleta, sistema de animaciones (obligatorias en TODA la página), y luego implementa todos los componentes con UI real, animada, moderna y única. NUNCA produce diseños genéricos ni estáticos. Cada plantilla debe verse LISTA PARA VENDER. Usar cuando el scaffold ya esté listo y haya que diseñar la UI, o cuando el usuario diga "diseñar la plantilla", "hacer la UI", "aplicar el diseño".
---

# Skill: Diseño Visual — SitioHoy (Plantillas Demo)

Toma un scaffold existente y aplica un diseño completo, animado, único y moderno.

## Framing crítico — leer antes de empezar

Las páginas que genera este skill son **plantillas demo para mostrar a prospectos**, no sitios de clientes confirmados. Esto implica:

- **No mencionar al "cliente"** en copy. El negocio mostrado en la plantilla es ficticio pero verosímil.
- **La plantilla tiene que verse LLENA y VIVA.** Sin secciones vacías. Sin "TODO".
- **Imágenes placeholder son obligatorias** (Unsplash). Una plantilla sin imágenes es imposible de vender.
- **Animaciones son obligatorias en CADA SECCIÓN.** Una plantilla estática no se elige nunca.
- **El seed data se carga.** El catálogo, las categorías, las zonas de envío deben tener contenido real visible al hacer `npm run dev`.
- **El copy es verosímil pero NO específico.** No inventar ubicaciones, fechas exactas, nombres de personas. Sí inventar tono, vibra, frases típicas del rubro.

**Cada plantilla debe estar LISTA PARA MOSTRAR sin tocar nada después de `npm run dev`.**

---

## Pre-requisito obligatorio

Antes de empezar leer `/mnt/skills/public/frontend-design/SKILL.md` si está disponible. Define las reglas estéticas globales que este skill respeta y extiende.

---

## Inputs requeridos

Si no fueron provistos, preguntar:

1. **Rubro del negocio mostrado en la plantilla** (ej: `café tradicional`, `skincare premium`, `estudio contable`, `ropa urbana`, `librería`).
2. **Objetivo del diseño** — qué tiene que lograr el sitio en el visitante:
   - *Generar confianza y transmitir identidad* — el visitante entiende quién es el negocio antes de actuar.
   - *Provocar una acción inmediata* — comprar, reservar, contactar, pedir por WhatsApp.
   - *Facilitar la exploración* — que el visitante navegue y encuentre lo que busca.
3. **Color principal** (hex) — si no viene dado, proponer 2-3 opciones acordes al rubro y esperar elección.
4. **Color secundario** (hex, opcional) — si no se da, derivar.
5. **Plan** (Esencial / Emprendimiento / Empresa) — define qué páginas implementar.
6. **Nombre del negocio ficticio** — si ya viene del scaffold, reutilizarlo.

---

## Flujo por etapas

5 etapas secuenciales. **NO saltarse ninguna.**

### Etapa 1 — Dirección estética

Cargar `sitio-diseno--ref--direccion-estetica.md`.

Definir:
- Tono visual del proyecto (uno solo).
- Tema (claro / oscuro / mixto).
- "Marca visual" del proyecto (qué elemento único va a tener).

Comunicar al usuario antes de avanzar.

### Etapa 2 — Tipografía y colores

Cargar:
- `sitio-diseno--ref--tipografia.md`
- `sitio-diseno--ref--colores.md`

Aplicar a `tailwind.config.ts` y `app/layout.tsx`.

### Etapa 3 — Sistema de animaciones (OBLIGATORIO)

Cargar `sitio-diseno--ref--animaciones.md`.

**Las animaciones no son opcionales.** Toda plantilla debe tener:
- Hero con entrada animada (stagger de heading + subhead + CTA).
- Header con shrink al scroll.
- Reveals on scroll en TODAS las secciones de la home.
- Stagger en grids de productos.
- Microinteracciones (hover/active) en TODOS los elementos clickables.
- Cross-fade en galería de producto.
- Mobile menu como drawer animado.

Instalar `framer-motion`:
```bash
npm install framer-motion
```

### Etapa 4 — Copy verosímil + imágenes placeholder

Cargar:
- `sitio-diseno--ref--copy-por-rubro.md` → para textos del Hero, secciones, CTAs, footer.
- `sitio-diseno--ref--imagenes-placeholder.md` → URLs de Unsplash por keyword del rubro.

**Aplicar copy directamente.** No usar `{COMPLETAR: ...}` en texto visible. Si hay algo que sí o sí debe revisar el dueño del negocio (ej: dirección física, teléfono, horarios), poner valor de ejemplo verosímil + comentario en código:

```tsx
{/* Cliente: revisar/reemplazar con datos reales */}
<p>Av. Corrientes 1234, CABA</p>
```

### Etapa 5 — Seed data

Cargar `sitio-diseno--ref--seed-data-sql.md` y generar el archivo `scripts/seed-data.sql` adaptado al rubro.

El archivo va junto a `scripts/setup-rls.sql` en el proyecto.

### Etapa 6 — Implementar páginas

Cargar según necesidad:
- `sitio-diseno--ref--home-por-rubro.md` → **estructura de secciones de la Home según el rubro** — LEER SIEMPRE antes de implementar `page.tsx`
- `sitio-diseno--ref--componentes-navegacion.md` → Header + Footer
- `sitio-diseno--ref--componentes-hero.md` → Hero
- `sitio-diseno--ref--componentes-catalogo.md` → ProductCard, grid, filtros
- `sitio-diseno--ref--componentes-producto.md` → galería, variantes, CTA
- `sitio-diseno--ref--componentes-checkout.md` → solo Emprendimiento/Empresa
- `sitio-diseno--ref--responsive-mobile.md` → validar mobile

Reemplazar todos los `TODO: skill sitio-diseno` con UI real, animada y con copy + imágenes.

Páginas a implementar:
- `app/(public)/layout.tsx` → Header + Footer + WhatsAppFloat
- `app/(public)/page.tsx` → Home con estructura **definida por rubro** (ver `sitio-diseno--ref--home-por-rubro.md`). NUNCA usar la misma estructura para todos los rubros.
- `app/(public)/catalogo/page.tsx` → Grid + filtros (+ subtítulo + intro corta)
- `app/(public)/producto/[slug]/page.tsx` → Galería + info + CTA
- `app/(public)/nosotros/page.tsx` → narrativa del negocio con copy del rubro
- `app/(public)/contacto/page.tsx` → form + datos de contacto + WhatsApp prominent
- Páginas de checkout (solo Emprendimiento/Empresa)

#### Reglas específicas de implementación

**Hero — siempre como componente cliente separado:**
El hero usa Framer Motion → necesita `"use client"`. Las pages del App Router son Server Components. Si el hero se escribe inline en `page.tsx`, las animaciones no funcionarán.

Flujo obligatorio:
1. Crear `components/ui/HeroSection.tsx` con `"use client"` y stagger de Framer Motion.
2. Importarlo en `app/(public)/page.tsx` y pasarle props necesarias (`waLink`, etc.).

Ver `sitio-diseno--ref--componentes-hero.md` para el patrón completo y ejemplos de código.

**Mock data — datos de muestra como fallback (OBLIGATORIO):**
La plantilla se usa como demo — la DB de Supabase puede estar vacía cuando el prospecto la ve. Sin fallback, la home y el catálogo se ven vacíos.

Patrón a aplicar en **`app/(public)/page.tsx`**:
```tsx
const MOCK_FEATURED = [
  { id: "mock-1", name: "...", slug: "...", price: 1200, compare_at_price: null,
    description: "...", product_images: [{ url: "https://images.unsplash.com/photo-...", alt: "...", position: 0 }] },
  // 5 productos más del rubro
];

export default async function HomePage() {
  const featured = await getFeaturedProducts(); // puede devolver [] si DB vacía
  const displayFeatured = featured.length > 0 ? featured : MOCK_FEATURED;
  // Siempre mostrar la sección de destacados (sin condicional featured.length > 0)
}
```

Patrón a aplicar en **`app/(public)/catalogo/page.tsx`**:
```tsx
const MOCK_PRODUCTS = [...]; // 10-12 productos del rubro con imágenes Unsplash
const MOCK_CATEGORIES = [...]; // 4 categorías del rubro

export default async function CatalogPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  const displayProducts = products.length > 0 ? products : MOCK_PRODUCTS;
  const displayCategories = categories.length > 0 ? categories : MOCK_CATEGORIES;
  return <CatalogClient products={displayProducts} categories={displayCategories} />;
}
```

Los datos de muestra deben usar Unsplash IDs del rubro (ver `sitio-diseno--ref--imagenes-placeholder.md`).

---

## Reglas absolutas

1. **Una dirección estética clara y ejecutada con precisión.** No mezclar estilos.
2. **Copy verosímil del rubro siempre.** Sin `{COMPLETAR: ...}` visible al usuario.
3. **Imágenes placeholder de Unsplash en TODO** — Hero, productos, secciones decorativas. Sin imágenes la plantilla no se ve.
4. **Tipografía con carácter.** Lista negativa estricta — ver `sitio-diseno--ref--tipografia.md`.
5. **Animaciones obligatorias.** Cada sección con entrada, cada interactivo con feedback. Sin excepciones.
6. **Mobile primero.** El CTA principal del Hero visible sin scroll en 375px (iPhone SE).
7. **Datos de prueba (seed) siempre.** Generar `scripts/seed-data.sql` adaptado al rubro.
8. **Cada componente con al menos UNA decisión visual única** (border raro, sombra inusual, transformación, ratio poco común, layout asimétrico).
9. **`npm run build` sin errores** antes de cerrar.
10. **`npm run dev` debe mostrar la plantilla LLENA, ANIMADA y BONITA** sin que el usuario tenga que hacer nada más que ejecutar el seed SQL.

---

## Checklist final antes de cerrar

### Configuración
- [ ] `tailwind.config.ts` con tokens de marca + tipografía custom.
- [ ] `app/layout.tsx` con fuentes cargadas via `next/font/google` (no Inter, Roboto, Poppins, Montserrat).
- [ ] Fuente elegida verificada con `npm run build` — no genera "Unknown font". Si falla, usar alternativa de la lista verificada en `sitio-diseno--ref--tipografia.md`.
- [ ] `framer-motion` instalado y usado.

### Páginas y componentes
- [ ] **Hero en `components/ui/HeroSection.tsx`** con `"use client"` y stagger de Framer Motion — NUNCA inline en el server page.
- [ ] Header animado con shrink al scroll, mobile menu drawer.
- [ ] Footer completo con links + datos verosímiles + crédito SitioHoy.
- [ ] Home con estructura propia del rubro (ver `sitio-diseno--ref--home-por-rubro.md`). **Mínimo 4 secciones. La sección diferenciadora del rubro presente.**
- [ ] Home con sección diferenciadora del rubro (ej: Horarios para bar, El proceso para café, Del horno a vos para panadería). NO usar estructura genérica igual para todos los rubros.
- [ ] **`MOCK_FEATURED` en home** — sección de destacados visible aunque la DB esté vacía.
- [ ] Catálogo con grid stagger animado + filtros funcionales.
- [ ] **`MOCK_PRODUCTS` + `MOCK_CATEGORIES` en catálogo** — grid visible aunque la DB esté vacía.
- [ ] Detalle de producto con galería cross-fade + CTA según plan.
- [ ] Nosotros con copy del rubro + 1-2 imágenes.
- [ ] Contacto con form + datos verosímiles + WhatsApp grande.
- [ ] Checkout completo (si aplica al plan).
- [ ] WhatsAppFloat visible en mobile sin tapar contenido.

### Animaciones (obligatorias)
- [ ] Hero con entrada en stagger (heading → subhead → CTA).
- [ ] Header con shrink al scroll.
- [ ] Reveals on scroll en TODAS las secciones de la home.
- [ ] Stagger en grids de productos.
- [ ] Hover en todos los botones (color/scale).
- [ ] Active state en botones (scale-95).
- [ ] Underline animado en navegación desktop.
- [ ] Cross-fade en galería de producto.
- [ ] Mobile menu como drawer con AnimatePresence.

### Contenido
- [ ] Copy verosímil del rubro en TODOS los textos. Cero `{COMPLETAR}` visible.
- [ ] Imágenes Unsplash en Hero, productos, secciones decorativas.
- [ ] `scripts/seed-data.sql` generado con productos, categorías y (si aplica) zonas/cupones del rubro.
- [ ] El sitio se ve completo al ejecutar el seed + `npm run dev`.

### Responsive (validar en DevTools)
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
