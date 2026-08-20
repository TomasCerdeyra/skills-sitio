---
name: footer-branding-sitiohoy
description: Barra inferior del footer que muestra la marca SitioHoy en TODAS las plantillas, independientemente del plan. Es la última franja del footer, debajo de todo el contenido del cliente. Incluye el logo de SitioHoy en tamaño pequeño + texto "Sitio creado con SitioHoy" con link a sitiohoy.com.ar. Este componente es IDÉNTICO en todas las plantillas — no varía con el diseño del footer del cliente. Solo cambia el color del logo si hay conflicto de contraste con el fondo.
---

# Skill: Footer Branding — SitioHoy

Barra de marca de la plataforma que va al **final de TODOS los footers**, debajo del contenido del cliente (links, contacto, copyright). Es la firma de SitioHoy en cada sitio que generamos.

## Regla principal

**Este componente es FIJO y CONSISTENTE en todas las plantillas.** No cambia de diseño ni de posición. Siempre va como última franja del footer, separada visualmente del resto.

---

## Especificación visual

### Layout

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│        [Footer principal del cliente]               │
│        (links, contacto, copyright, etc.)           │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│   [Logo SitioHoy 20px]  Sitio creado con SitioHoy   │  ← esta franja
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Reglas de estilo

| Propiedad | Valor |
|---|---|
| Altura | Auto, con padding vertical de `py-4` |
| Separador superior | Línea `border-t` sutil (opacidad baja, adaptar al fondo) |
| Alineación | Centrado horizontal (`justify-center`) |
| Logo | SVG del logo de SitioHoy, altura `20px`, ancho `auto` |
| Color del logo | `#10b981` (emerald-500) **por defecto** |
| Color del logo (fallback) | Si el fondo del footer ya usa `#10b981` o un verde similar (hue 140-170), usar `#f1f5f9` (slate-100) para contraste |
| Texto | `"Sitio creado con"` en `text-xs` + `"SitioHoy"` como link a `https://sitiohoy.com.ar` |
| Color del texto | Heredar la opacidad del footer padre (generalmente `text-neutral-50/40` en footers oscuros, `text-neutral-400` en footers claros) |
| Hover en link | Transición a `#10b981` (o al fallback si aplica) |
| Fuente | `font-body` (la del sitio), `text-xs` |

### Color del logo — lógica de contraste

```typescript
// Dentro del componente, determinar si #10b981 contrasta con el fondo:
// - Si el footer tiene fondo oscuro (neutral-900, neutral-800, etc.) → usar #10b981 ✅
// - Si el footer tiene fondo verde/emerald → usar #f1f5f9 (slate-100) ✅
// - Si el footer tiene fondo claro (white, neutral-50) → usar #10b981 ✅
// - Si el footer tiene fondo con brand-primary verde → usar #f1f5f9 ✅
```

En la práctica: **usar `#10b981` siempre, salvo que el fondo del footer sea verde.** El modelo debe verificar el color de fondo del footer del cliente al implementar.

---

## Componente — `SitioHoyBranding`

```tsx
// components/ui/SitioHoyBranding.tsx

import Link from "next/link";

interface SitioHoyBrandingProps {
  /** Si el fondo del footer es verde, pasar true para usar color alternativo */
  greenBackground?: boolean;
}

export function SitioHoyBranding({ greenBackground = false }: SitioHoyBrandingProps) {
  const logoColor = greenBackground ? "#f1f5f9" : "#10b981";
  const textColor = greenBackground
    ? "text-white/40 hover:text-white/60"
    : "text-current opacity-40 hover:opacity-60";

  return (
    <div className="border-t border-current/5 mt-6">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-center gap-2">
        {/* Logo SitioHoy — SVG inline para control de color */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 1024 1024"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* 
            Logo de SitioHoy — la "S" estilizada sobre fondo redondeado.
            El path exacto del logo SVG debe copiarse del archivo logo original.
            Usar fill={logoColor} para la "S" y sin fondo (transparente).
          */}
          <rect rx="180" width="1024" height="1024" fill={logoColor} />
          <path
            d="M512 160c-60 0-120 40-160 100-80 120-100 260-40 380 30 60 80 120 140 160 40 30 80 50 120 60 60 20 120 10 160-20 60-40 80-120 40-200-20-40-60-80-100-100-60-40-120-60-160-40-30 10-40 40-20 70 20 40 60 60 100 60 30 0 60-10 80-30 30-30 20-80-20-120-30-30-80-40-120-20-60 20-100 80-100 160 0 60 40 100 80 80"
            fill="white"
            stroke="white"
            strokeWidth="20"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <p className={`font-body text-xs transition-opacity ${textColor}`}>
          Sitio creado con{" "}
          <a
            href="https://sitiohoy.com.ar"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            style={{ color: logoColor }}
          >
            SitioHoy
          </a>
        </p>
      </div>
    </div>
  );
}
```

> **⚠️ IMPORTANTE — Logo SVG:** El componente de arriba usa un path SVG aproximado como placeholder. Al implementar, el modelo debe usar el **SVG real del logo de SitioHoy** (la "S" estilizada). El archivo del logo se encuentra en `public/sitiohoy-logo.svg` de cada proyecto — copiar el SVG ahí y usarlo inline o como `<Image>`. Lo importante es que se vea a `20px` de alto y en el color correcto.

---

## Integración en el Footer

El `<SitioHoyBranding />` se renderiza como **último hijo** dentro del `<footer>`:

```tsx
// Ejemplo con Footer Mega Dark
export function Footer({ brandName, brandTagline }: FooterProps) {
  return (
    <footer className="bg-neutral-900 text-neutral-50 mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* ... contenido del footer del cliente ... */}

        <div className="border-t border-neutral-50/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-body text-sm text-neutral-50/60">
            © {year} {brandName}. Todos los derechos reservados.
          </p>
        </div>
      </div>

      {/* ← Branding SitioHoy — SIEMPRE al final */}
      <SitioHoyBranding />
    </footer>
  );
}
```

---

## Reglas

1. **SIEMPRE presente.** No se omite nunca, en ningún plan, en ningún footer.
2. **SIEMPRE al final.** Debajo del copyright del cliente, como última franja visible.
3. **NUNCA en medio del footer.** No mezclarlo con los links de navegación del cliente.
4. **Logo pequeño (20px).** No debe competir visualmente con la marca del cliente.
5. **Color `#10b981` por defecto.** Solo cambiar si el fondo del footer es verde.
6. **Discreto pero visible.** Opacidad baja, pero legible. No esconder.
7. **El link apunta a `https://sitiohoy.com.ar`** con `target="_blank"`.
8. **El SVG del logo va inline** (no como `<Image>`) para control directo del color via prop.

---

## Validación

- [ ] `<SitioHoyBranding />` renderizado al final de cada footer.
- [ ] Logo visible a 20px de alto.
- [ ] Color del logo es `#10b981` o `#f1f5f9` según fondo.
- [ ] Link funcional a `sitiohoy.com.ar`.
- [ ] No interfiere visualmente con el footer del cliente.
- [ ] Presente en mobile y desktop.
