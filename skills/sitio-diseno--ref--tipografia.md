# Reference: Tipografía

**Etapa 2 del flujo.** Cada proyecto tiene un par display + body único. La tipografía es el 50% de la identidad visual de un sitio.

## Lista negativa — NUNCA usar como display

Estas fuentes están prohibidas porque las usa todo el mundo y matan la identidad:

- ❌ **Inter** (genérico de Tailwind/Vercel)
- ❌ **Roboto** (default de Google/Material)
- ❌ **Open Sans** (overused desde 2010)
- ❌ **Lato** (igual que Open Sans)
- ❌ **Poppins** (overused en startups latam)
- ❌ **Montserrat** (overused, demasiado utility)
- ❌ **Nunito** / **Nunito Sans**
- ❌ **Source Sans Pro**
- ❌ **DM Sans** (de moda, ya quemada)
- ❌ **Plus Jakarta Sans** (de moda, ya quemada)
- ❌ **Space Grotesk** (de moda, ya quemada)
- ❌ **Arial** / **Helvetica** sistema
- ❌ **Comic Sans** (obvio)
- ❌ **Times New Roman** sistema

**Como body** se pueden tolerar Inter / Roboto / Open Sans **solo si el display tiene mucho carácter**. Pero el ideal es evitarlas también.

---

## Repertorio de fuentes con carácter (por categoría)

### Serif display con personalidad

| Fuente | Carácter | Buena para |
|---|---|---|
| **Fraunces** | Variable, modulada, opcional curlies | Editorial cálido, skincare premium |
| **Playfair Display** | Alto contraste tipo Didot | Lujo, editorial, hospitality |
| **DM Serif Display** | Alto contraste compacto | Editorial moderno |
| **Cormorant Garamond** | Clásica refinada | Lujo, joyería, hoteles |
| **Bodoni Moda** | Italiana, contraste extremo | Lujo, moda, editorial |
| **Crimson Pro** | Humanist legible | Editorial cálido, librerías |
| **Spectral** | Diseñada para web, suave | Editorial moderno |
| **Lora** | Suave, friendly | Cálido editorial |

### Sans display con carácter

| Fuente | Carácter | Buena para |
|---|---|---|
| **Bricolage Grotesque** | Variable, brutalist moderno | Bold, productos digitales |
| **Archivo / Archivo Black** | Geometric chunky | Bold, marcas urbanas |
| **Big Shoulders Display** | Condensed, fuerte | Bold, editorial bold |
| **Bowlby One** | Heavy, fun | Heladerías, marcas pop |
| **Anton** | Condensed bold | Bold, editorial |
| **Familjen Grotesk** | Moderna humanist | Tech, geométrico |
| **Inter Tight** (no Inter) | Tighter Inter | Tech con personalidad |
| **Public Sans** | Humanist neutra | Geométrico, profesional |
| **Manrope** | Geométrica con carácter | Tech |

### Mono / display alternativo

| Fuente | Carácter | Buena para |
|---|---|---|
| **JetBrains Mono** | Mono moderna | Tech, acentos |
| **IBM Plex Mono** | Mono refinada | Editorial bold, tech |
| **Space Mono** | Mono retro | Retro, tech vintage |

### Body que no son las quemadas

| Fuente | Carácter | Buena para |
|---|---|---|
| **Geist** | Sans humanist moderna (Vercel pero sirve para body) | General |
| **Outfit** | Sans geométrica suave | General |
| **Onest** | Sans humanist | General |
| **Figtree** | Sans humanist amistosa | Cálido, vibrante |
| **EB Garamond** | Serif clásico legible | Editorial body |
| **Newsreader** | Serif legible web | Editorial body |
| **Source Serif 4** | Serif moderno | Editorial body |
| **Sora** | Sans geométrica | Tech, geométrico |

---

## Pares recomendados por tono visual

| Tono | Display | Body |
|---|---|---|
| Editorial cálido | Fraunces | EB Garamond |
| Editorial moderno | DM Serif Display | Geist |
| Bold / Brutalist | Bricolage Grotesque | Manrope |
| Bold + retro | Big Shoulders Display | Outfit |
| Cálido orgánico | Lora | Figtree |
| Cálido + serif | Spectral | Onest |
| Geométrico / Minimal | Familjen Grotesk | Sora |
| Geométrico premium | Public Sans | Newsreader |
| Retro nostálgico | Bowlby One | Outfit |
| Retro elegante | Cormorant Garamond | Source Serif 4 |
| Tech | Bricolage Grotesque | Geist |
| Tech alternativa | Inter Tight | JetBrains Mono (acentos) |
| Lujo clásico | Cormorant Garamond | EB Garamond |
| Lujo moderno | Bodoni Moda | Newsreader |
| Vibrante / Pop | Bowlby One | Figtree |
| Vibrante alt | Archivo Black | Outfit |

> Nunca usar el mismo par dos veces en proyectos distintos del equipo. Llevar registro mental de qué se usó antes.

---

## Aplicación en código

### Configuración en `app/layout.tsx`

```typescript
import { Fraunces, EB_Garamond } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const displayFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "600", "800"],
});

const bodyFont = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const umamiSrc = process.env.NEXT_PUBLIC_UMAMI_SRC || "https://cloud.umami.is/script.js";
  const umamiId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

  return (
    <html lang="es" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <head />
      <body className="font-body antialiased">
        {umamiId && (
          <Script
            src={umamiSrc}
            data-website-id={umamiId}
            strategy="afterInteractive"
          />
        )}
        {children}
      </body>
    </html>
  );
}
```

### Configuración en `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
```

### Uso en componentes

```tsx
<h1 className="font-display text-6xl font-extrabold tracking-tight">
  Heading principal
</h1>

<p className="font-body text-base leading-relaxed">
  Body text...
</p>
```

---

## Reglas de jerarquía tipográfica

Definir **antes** de empezar a maquetar:

| Nivel | Tamaño desktop | Tamaño mobile | Weight | Line height | Letter spacing |
|---|---|---|---|---|---|
| H1 (hero) | 5xl-7xl | 3xl-4xl | extrabold/black | tight (1.05-1.1) | -0.02em |
| H2 (sección) | 3xl-5xl | 2xl-3xl | bold/extrabold | tight (1.1-1.2) | -0.01em |
| H3 (subsección) | xl-2xl | lg-xl | semibold/bold | snug (1.25) | normal |
| Body | base-lg | sm-base | normal/medium | relaxed (1.6-1.75) | normal |
| Caption / metadata | xs-sm | xs | medium | snug | wide (0.05em) |

Ajustar según fuente — los display extra-condensed admiten letter-spacing más negativo.

---

## Decisiones de mezcla

Cuándo combinar fuentes (uso especial):
- **Heading + número grande**: heading en serif, número en mono (precios destacados, stats).
- **Eyebrow + heading**: eyebrow en mono uppercase pequeño + heading en display grande.
- **Pull quote**: italic del display family con tamaño 3-4x mayor que body.

No mezclar más de 2 familias salvo casos muy puntuales y justificados.

---

---

## ⚠️ Compatibilidad con next/font/google

No todos los nombres del repertorio mapean correctamente al paquete `next/font/google`. Antes de cerrar la elección de fuentes, correr un `npm run build` de prueba y confirmar que no aparece "Unknown font".

### Fuentes con problemas conocidos (NO usar)

| Fuente (nombre Google Fonts) | Problema | Alternativa segura |
|---|---|---|
| `Big_Shoulders_Display` | "Unknown font" en Turbopack (Next.js 16+) | `Barlow_Condensed` |
| `Big_Shoulders_Text` | misma familia, mismo error | `Barlow_Condensed` |

### Fuentes VERIFICADAS — build limpio en Next.js 16 + Turbopack

**Display (sans / bold):** `Barlow_Condensed`, `Oswald`, `Anton`, `Archivo_Black`, `Bricolage_Grotesque`

**Display (serif):** `Playfair_Display`, `Fraunces`, `Cormorant_Garamond`, `Bodoni_Moda`, `Lora`, `DM_Serif_Display`, `Spectral`, `Crimson_Pro`

**Body:** `Outfit`, `Manrope`, `Onest`, `Figtree`, `EB_Garamond`, `Source_Serif_4`

> Si una fuente del repertorio genera error de build → reemplazarla por la alternativa verificada más cercana en carácter. No bloquear el proyecto por una fuente.

---

## Validación

Antes de avanzar a Etapa 3, confirmar:

- [ ] El par display + body NO está en la lista negativa.
- [ ] El par tiene **carácter visible** — si lo viste en un sitio random te llamaría la atención.
- [ ] Las fuentes están cargadas con `next/font/google` (no via `<link>` ni CDN).
- [ ] La jerarquía tipográfica está definida (tamaños, weights, line heights).
- [ ] El par no se usó en proyectos previos del equipo.
- [ ] `npm run build` pasa sin "Unknown font" después de configurar la fuente.
