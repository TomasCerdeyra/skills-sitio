# Reference: Responsive — Mobile-first

**El 70% del tráfico es mobile.** Si el sitio no funciona perfecto en mobile, no funciona. Punto.

## Breakpoints de Tailwind a usar

```
sm: 640px   → tablets pequeñas
md: 768px   → tablets
lg: 1024px  → desktop chico
xl: 1280px  → desktop estándar
2xl: 1536px → desktop grande (raramente)
```

**Diseñar siempre mobile-first** — sin prefijo es mobile, con prefijo aplica desde ese breakpoint hacia arriba.

```tsx
// ✅ Bien — mobile-first
<div className="text-3xl lg:text-6xl">

// ❌ Mal — desktop-first
<div className="text-6xl max-lg:text-3xl">
```

---

## Specs concretos por componente en mobile (375px)

### Header
- Altura: 64-72px (ni más ni menos).
- Logo: máximo 24px de alto.
- Botón hamburguesa: 44x44px (área táctil mínima).
- **Sin texto navigational visible** — todo va al drawer.

### Hero
- Heading: `text-3xl` a `text-5xl` (no más).
- Padding vertical: 80-120px.
- CTA: button-block (`w-full` o `min-w-[200px]`).
- **Visible sin scroll:** heading + 2-3 líneas de subhead + CTA.
- Imagen del hero: aspect ratio 4:5 o 1:1 (no muy alta, no muy ancha).

### Catálogo
- 1 columna (en mobile chico) o 2 columnas (a partir de 400px).
- Filtros: chips horizontales con scroll, sticky top-16.
- Cards: `aspect-square` para que entren más en viewport.
- Padding lateral: 16-24px (no menos).

### Detalle de producto
- Galería arriba (full-width, aspect 1:1).
- Thumbnails debajo en grid de 5 cols.
- Info debajo de galería.
- **CTA fixed en bottom** si el contenido es largo. O al menos `sticky bottom-0`.

### Checkout
- Form en 1 columna.
- Inputs grandes (44px alto mínimo).
- Resumen abajo del form, no arriba.
- Total destacado con tamaño grande (`text-2xl` o más).

### Footer
- 1 columna apilada (no grid).
- Padding generoso (`py-12` mínimo).
- Links separados verticalmente (gap-4 mínimo).

---

## Áreas táctiles — regla de oro

**Mínimo 44x44px** para cualquier elemento interactivo. Apple HIG y Material Design coinciden.

```tsx
// ✅ Bien
<button className="p-3">
  <svg width="20" height="20" />
</button>

// ❌ Mal — área de 20x20 es muy chica
<button>
  <svg width="20" height="20" />
</button>
```

---

## Tipografía mobile

| Nivel | Mobile (rem) | Desktop (rem) |
|---|---|---|
| H1 | 2-3 (32-48px) | 4-6 (64-96px) |
| H2 | 1.5-2.25 (24-36px) | 2.25-3.75 (36-60px) |
| H3 | 1.25-1.5 (20-24px) | 1.5-2 (24-32px) |
| Body | 1 (16px) | 1-1.125 (16-18px) |
| Caption | 0.75-0.875 (12-14px) | 0.75-0.875 (12-14px) |

**Body NUNCA bajo 16px en mobile** — iOS hace zoom in si es más chico al tocar un input. Lo evitás escribiendo `text-base` (16px) o más.

---

## Spacing mobile

Reducir padding/margin de desktop a mobile, pero **no eliminar**:

```tsx
// Sección
<section className="py-16 lg:py-24">

// Container
<div className="px-6 lg:px-8 max-w-7xl mx-auto">

// Espacio entre items grandes
<div className="space-y-12 lg:space-y-16">

// Gap en grids
<div className="gap-4 lg:gap-8">
```

---

## CTAs mobile — reglas no negociables

### El CTA principal del Hero debe ser visible sin scroll en 375x667 (iPhone SE)

Esto significa: el viewport disponible es ~600px (descontando barra del browser). El hero entero —heading, subhead y CTA— tiene que entrar.

**Estrategia:**
- Heading compacto (text-3xl o text-4xl, no más).
- Subhead corto (1-2 líneas máximo en mobile).
- CTA grande pero compacto.
- Sin imagen muy alta arriba — o ponerla al lado/atrás como background.

### El CTA de "Agregar al carrito" / WhatsApp en producto debe estar siempre accesible

Opciones:
1. **Sticky bottom**: el CTA queda fijo abajo del viewport mientras se scrollea.
2. **Sticky top después de scroll**: cuando el CTA del scroll natural sale del viewport, aparece uno en top.
3. **Ambos**: el natural en su posición + uno fixed bottom.

```tsx
// Opción 1: sticky bottom
<div className="sticky bottom-0 bg-neutral-50 px-6 py-4 border-t border-neutral-200 -mx-6 lg:static lg:bg-transparent lg:p-0 lg:m-0 lg:border-0">
  <AddToCartButton />
</div>
```

### El WhatsApp Float

En todos los planes. Bottom-right, 56x56px, con `shadow-lg`. Z-index 40 (por debajo de modales pero encima de todo lo demás).

---

## Imágenes mobile

- **Lazy loading nativo:** `<img loading="lazy">` o `<Image>` de next.
- **Aspect ratio fijo** para evitar layout shift: `<div className="aspect-square">` o `<div className="aspect-[4/5]">`.
- **Object cover** siempre para que llenen el contenedor sin distorsión.
- **`<img>` ancho 100%** para que respete el container.

```tsx
<div className="aspect-square overflow-hidden">
  <img
    src={product.image}
    alt={product.name}
    loading="lazy"
    className="w-full h-full object-cover"
  />
</div>
```

---

## Forms mobile

- **Input height: 44-48px** mínimo.
- **Font-size: 16px** mínimo en inputs (sino iOS hace zoom).
- **Inputs full-width** en mobile.
- **`inputmode` correcto** para teclados:
  - `email` → `inputMode="email"`
  - `tel` → `inputMode="tel"`
  - `numeric` → `inputMode="numeric"` (CP, números)
- **`autocomplete` correcto** para autofill:
  - `name="first_name"` → `autoComplete="given-name"`
  - `name="last_name"` → `autoComplete="family-name"`
  - `name="email"` → `autoComplete="email"`
  - `name="phone"` → `autoComplete="tel"`
  - `name="postal_code"` → `autoComplete="postal-code"`

```tsx
<input
  type="email"
  name="email"
  autoComplete="email"
  inputMode="email"
  required
  className="w-full px-4 py-3 text-base border border-neutral-300 rounded-md focus:border-brand-primary"
/>
```

---

## Animaciones en mobile

- **Reducir duración** vs desktop (ej: 700ms → 400ms).
- **Eliminar parallax** (rompe scroll natural en mobile).
- **Eliminar reveals on scroll complejos** — un fade simple alcanza.
- **Respetar `prefers-reduced-motion`** — muchos usuarios mobile lo tienen activo por preferencia o por batería baja.

```tsx
import { useReducedMotion } from "framer-motion";

const prefersReducedMotion = useReducedMotion();

const transition = prefersReducedMotion
  ? { duration: 0 }
  : { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] };
```

---

## Testing — checklist obligatorio

Antes de cerrar, verificar en estos viewports usando DevTools:

### iPhone SE (375x667) — el más restrictivo
- [ ] Hero: heading + subhead + CTA visibles sin scroll.
- [ ] Catálogo: 1-2 columnas.
- [ ] Producto: galería + título + precio + CTA visibles sin scroll mucho.
- [ ] WhatsApp Float visible y no tapa contenido importante.
- [ ] Header con shrink al scroll funciona.
- [ ] Mobile menu se abre y cierra bien.

### iPhone 14 Pro (393x852) — el más usado
- [ ] Todo lo anterior, con más espacio.
- [ ] Tipografía cómoda de leer.
- [ ] CTAs grandes y accesibles.

### iPad mini (768x1024)
- [ ] Layout intermedio (2 cols donde tiene sentido).
- [ ] No se ve "estirado" desktop.
- [ ] No se ve "agigantado" mobile.

### Desktop (1280x800 y 1920x1080)
- [ ] Max-width respetado (`max-w-7xl mx-auto`) — el contenido no se estira a lo ancho infinitamente.
- [ ] Layouts asimétricos / sticky funcionan.

---

## Reglas finales

1. **Diseñar mobile-first siempre.** Sin prefijo = mobile.
2. **El CTA principal visible sin scroll en 375px.**
3. **Áreas táctiles 44x44px mínimo.**
4. **Body 16px mínimo en inputs (sino iOS hace zoom).**
5. **Padding lateral 16-24px mínimo en mobile.**
6. **`aspect-ratio` fijo en imágenes** para evitar layout shift.
7. **`autoComplete` e `inputMode` correctos** en forms.
8. **`prefers-reduced-motion` respetado** en animaciones.
9. **Probar en al menos 4 viewports** antes de cerrar.
