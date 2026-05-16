# Reference: Sistema de colores — Nivel UX/UI Senior

**Etapa 2 del flujo (junto con tipografía).** La paleta de color tiene que ganar sola — antes de ver el copy, antes de leer el nombre. Si el color no comunica el rubro, el diseño fracasó.

---

## Framework de decisión: 5 preguntas antes de elegir un color

Antes de proponer cualquier hex, responder:

1. **¿Qué emoción tiene que disparar en 2 segundos?** (confianza / urgencia / calidez / exclusividad / frescura)
2. **¿Qué tiene en la cabeza el cliente cuando entra?** (¿viene a comprar? ¿a explorar? ¿a comparar?)
3. **¿Qué colores usan los competidores del rubro?** (para diferenciarse o para alinearse)
4. **¿Qué material o textura evoca el producto?** (madera / metal / tela / papel / planta)
5. **¿El dueño del negocio tiene colores propios?** (logo, local físico, Instagram)

---

## Psicología del color aplicada al e-commerce argentino

### 🔴 Rojos y borgoñas
- **Efecto:** urgencia, pasión, apetito, poder
- **Usar en:** restaurantes con carácter, moda urbana, ofertas, CTAs de "comprar ya"
- **Evitar en:** salud/bienestar, productos para bebés, servicios de confianza
- **Tonos recomendados:**
  - Borgoña profundo `#7B1F2B` — restaurante premium, vino
  - Rojo brutalist `#E63946` — moda urbana, marcas con actitud
  - Tinto apagado `#8B3A3A` — productos artesanales, chacinados, conservas

### 🟠 Naranjas y ámbar
- **Efecto:** calidez, creatividad, artesanía, madera, energía sin agresividad
- **Usar en:** panaderías, tiendas artesanales, instrumentos musicales, cafés, productos handmade
- **Evitar en:** servicios premium de lujo, fintech, productos tecnológicos serios
- **Tonos recomendados:**
  - Ámbar madera `#C17B3E` — instrumentos, artesanías
  - Naranja tostado `#C5572D` — hamburguesería, food truck
  - Caramelo `#C68B59` — panadería, pastelería, café

### 🟡 Amarillos y mostazas
- **Efecto:** optimismo, visibilidad, atención, calidez solar
- **Usar en:** marcas juveniles, accesorios, mochilas, productos de verano
- **Evitar en:** servicios legales/financieros, lujo, moda formal
- **Tonos recomendados:**
  - Mostaza quemada `#D4A648` — productos artesanales, miel
  - Dorado suave `#F5D78E` — detalle en paletas oscuras (no como primario)
  - Lima eléctrico `#C9F227` — acento en diseños bold/urbanos (solo como acento)

### 🟢 Verdes
- **Efecto:** naturaleza, salud, confianza, frescura
- **Usar en:** cosmética natural, alimentos saludables, agro, sustentabilidad
- **Evitar en:** restaurantes (excepción: vegetarianos), moda urbana
- **Tonos recomendados:**
  - Verde sage `#9CAF88` — skincare natural, cosmética
  - Verde musgo oscuro `#2A3A2A` — estudio musical, artesanías premium
  - Verde oliva `#73613D` — productos regionales, artesanal
  - Verde esmeralda `#10B981` — solo para CTAs de WhatsApp (color de marca)

### 🔵 Azules
- **Efecto:** confianza, profesionalismo, tecnología, calma
- **Usar en:** estudios profesionales, fintech, tech, servicios B2B
- **Evitar en:** comida (inhibe el apetito), moda juvenil (percibido como corporativo)
- **Tonos recomendados:**
  - Azul prusia `#1E3A5F` — estudio contable/legal
  - Azul eléctrico `#3D5AFE` — SaaS, digital
  - Azul marino oscuro `#0F172A` — lujo con base oscura

### 🟣 Púrpuras y rosados
- **Efecto:** creatividad, feminidad, misterio, espiritualidad
- **Usar en:** skincare, bienestar, peluquería, moda femenina, artículos de regalo
- **Evitar en:** comida (salvo pastelería creativa), servicios legales
- **Tonos recomendados:**
  - Rosa polvo `#E8C5C5` — skincare minimalista
  - Lila suave `#9B72CF` — cosmética creativa, bienestar
  - Bordo apagado `#5C0017` — joyería, moda premium

### ⚫ Negros y carbones
- **Efecto:** sofisticación, exclusividad, seriedad, poder
- **Usar en:** cualquier rubro como fondo de secciones de contraste, lujo, tecnología
- **Clave:** el negro nunca es solo `#000000`. Usar negros con temperatura:
  - Negro cálido `#1A1208` — instrumentos, artesanías, gastronomía
  - Negro neutro `#0F0F0F` — tecnología, minimalismo
  - Negro azulado `#0F1419` — servicios profesionales, tech

---

## La regla 60-30-10 (siempre aplicar)

| Proporción | Rol | Cómo usarlo |
|---|---|---|
| **60%** | Color base / fondo | Neutros (cremas, blancos cálidos, grises propios). Define el "aire" del sitio |
| **30%** | Color secundario | Color de marca en secciones, headers, bloques de contraste |
| **10%** | Color de acento | CTAs, highlights, links activos, badges. Tiene que destacar solo |

**Ejemplo Play Music:**
- 60% — Crema cálida `#FAF8F3` (fondo)
- 30% — Carbón `#1A1208` (secciones hero, footer, nav)
- 10% — Ámbar `#C17B3E` (botones, badges, highlights)

**Error frecuente:** usar el color de marca en el 60% → el sitio se ve "gritón" y cansa.

---

## Construir la paleta completa: 5 pasos

### Paso 1 — Elegir el primario
Usando la psicología del color del rubro. El primario debe aparecer en CTAs, links activos, highlights. **Máximo saturación media-alta** — si es muy saturado quema en pantalla.

### Paso 2 — Derivar el secundario
Opciones (usar UNA, no mezclar sistemas):
- **Análogo (±30°):** armonioso, cohesivo. `#C17B3E` (ámbar) → `#2A3A2A` (verde musgo, complementario cálido)
- **Mismo tono, diferente luminosidad:** el primario más oscuro como fondo de secciones de contraste
- **Neutro con temperatura:** si el primario es cálido, el secundario puede ser un neutro muy oscuro con undertone cálido

### Paso 3 — Definir los neutros propios
**NUNCA usar `gray-*` de Tailwind.** Los grises default de Tailwind son fríos y matan la paleta.
Construir una escala de 5-7 neutros con la misma temperatura que el primario:

```css
/* Para paleta cálida (primario ámbar, naranja, borgoña): */
--color-neutral-50:  #FAF8F3;  /* crema cálida */
--color-neutral-100: #F2ECDF;
--color-neutral-200: #E0D4BD;
--color-neutral-300: #C8B99A;
--color-neutral-500: #856D55;
--color-neutral-700: #4A3F2F;
--color-neutral-900: #1A1208;  /* negro cálido */

/* Para paleta fría (primario azul, verde sage, púrpura): */
--color-neutral-50:  #F4F6F8;
--color-neutral-100: #E5E9ED;
--color-neutral-200: #C8D0D8;
--color-neutral-300: #9DAAB5;
--color-neutral-500: #5C6B78;
--color-neutral-700: #2E3A45;
--color-neutral-900: #0F1921;  /* negro frío */
```

> **Truco:** tomar el primario, reducir saturación a ~10-15% y variar luminosidad para cada paso del neutro.

### Paso 4 — Elegir el acento (opcional pero poderoso)
Solo si hay presupuesto visual para un tercer color. Debe contrastar fuerte con el primario y con los neutros.
- Si el primario es **cálido** → acento **frío** o complementario
- Si el primario es **oscuro** → acento **claro y saturado**
- Regla: el acento solo aparece en el 10% del diseño (un CTA especial, un badge, una línea decorativa)

### Paso 5 — Validar contraste WCAG AA
Todas estas combinaciones **DEBEN pasar** contraste mínimo 4.5:1 (texto normal) o 3:1 (texto grande):
- Texto body sobre fondo base → verificar
- Texto de botón primario sobre color del botón → verificar
- Links sobre fondos de sección → verificar
- Texto sobre imágenes con overlay → verificar

Herramientas: [contrast-ratio.com](https://contrast-ratio.com) o [webaim.org/resources/contrastchecker/](https://webaim.org/resources/contrastchecker/)

---

## Paletas completas por rubro (listas para usar)

### 🎸 Instrumentos musicales / Artesanías

```css
@theme {
  --color-brand-primary:   #C17B3E;  /* ámbar madera */
  --color-brand-secondary: #2A3A2A;  /* verde musgo oscuro */
  --color-brand-accent:    #F5D78E;  /* dorado cuerda */
  --color-neutral-50:  #FAF8F3;
  --color-neutral-100: #F2ECDF;
  --color-neutral-200: #E0D4BD;
  --color-neutral-300: #C8B99A;
  --color-neutral-500: #856D55;
  --color-neutral-700: #4A3F2F;
  --color-neutral-900: #1A1208;
}
```

### ☕ Café / Gastronomía cálida

```css
@theme {
  --color-brand-primary:   #C5572D;  /* naranja terracota */
  --color-brand-secondary: #3E4B2A;  /* verde oliva profundo */
  --color-brand-accent:    #F2C96E;  /* mostaza suave */
  --color-neutral-50:  #FBF9F5;
  --color-neutral-100: #F3EDE2;
  --color-neutral-200: #E4D8C3;
  --color-neutral-300: #C9B89A;
  --color-neutral-500: #826452;
  --color-neutral-700: #4D3A2A;
  --color-neutral-900: #1C1108;
}
```

### 🧴 Skincare / Cosmética natural

```css
@theme {
  --color-brand-primary:   #9CAF88;  /* verde sage */
  --color-brand-secondary: #D4B896;  /* beige tostado */
  --color-brand-accent:    #E8C5C5;  /* rosa polvo */
  --color-neutral-50:  #FAFAF8;
  --color-neutral-100: #F2F0EA;
  --color-neutral-200: #E3DDD0;
  --color-neutral-300: #C8BFB0;
  --color-neutral-500: #887F72;
  --color-neutral-700: #4A4439;
  --color-neutral-900: #1A1712;
}
```

### 👗 Ropa / Indumentaria urbana

```css
@theme {
  --color-brand-primary:   #000000;  /* negro absoluto */
  --color-brand-secondary: #F5F5F5;  /* blanco roto */
  --color-brand-accent:    #E63946;  /* rojo brutalist */
  --color-neutral-50:  #F9F9F9;
  --color-neutral-100: #EBEBEB;
  --color-neutral-200: #D4D4D4;
  --color-neutral-300: #ADADAD;
  --color-neutral-500: #6B6B6B;
  --color-neutral-700: #3A3A3A;
  --color-neutral-900: #111111;
}
```

### 🏢 Estudio profesional / Servicios B2B

```css
@theme {
  --color-brand-primary:   #1E3A5F;  /* azul prusia */
  --color-brand-secondary: #F0F4F8;  /* gris azulado claro */
  --color-brand-accent:    #3B82F6;  /* azul acción */
  --color-neutral-50:  #F8FAFC;
  --color-neutral-100: #EEF2F7;
  --color-neutral-200: #D8E1ED;
  --color-neutral-300: #B0C1D4;
  --color-neutral-500: #5C7A94;
  --color-neutral-700: #2C4A62;
  --color-neutral-900: #0F1F30;
}
```

### 💍 Joyería / Lujo

```css
@theme {
  --color-brand-primary:   #0E0E0E;  /* negro azabache */
  --color-brand-secondary: #D4AF6A;  /* dorado champagne */
  --color-brand-accent:    #C9A84C;  /* dorado acción */
  --color-neutral-50:  #FDFCF9;
  --color-neutral-100: #F5F0E8;
  --color-neutral-200: #E8DFD0;
  --color-neutral-300: #C8BAA2;
  --color-neutral-500: #8A7A64;
  --color-neutral-700: #4A3E2E;
  --color-neutral-900: #1A1510;
}
```

### 🍞 Panadería / Artesanal

```css
@theme {
  --color-brand-primary:   #A87C39;  /* mostaza tostada */
  --color-brand-secondary: #5C3D1E;  /* marrón chocolate */
  --color-brand-accent:    #F5C87E;  /* crema dorada */
  --color-neutral-50:  #FDF9F3;
  --color-neutral-100: #F5EDD9;
  --color-neutral-200: #E8D9B8;
  --color-neutral-300: #D0BF98;
  --color-neutral-500: #8A7355;
  --color-neutral-700: #4D3D25;
  --color-neutral-900: #1E1508;
}
```

---

## Señales de alerta (paleta que NO funciona)

Si alguna de estas condiciones se cumple, revisar la paleta antes de continuar:

| Señal | Problema | Fix |
|---|---|---|
| El color primario está en el 60% del fondo | El sitio grita, cansa la vista | Mover primario al 30-10%, usar neutros en el 60% |
| Los neutros son `gray-100`, `gray-200` de Tailwind | Paleta fría y genérica, mata la temperatura | Crear neutros propios con la temperatura del primario |
| Texto sobre botón primario no pasa contraste 4.5:1 | Inaccesible, ilegible en mobile | Oscurecer el primario o usar texto oscuro sobre primario claro |
| Tres colores totalmente saturados juntos | Vibración visual, cansa | Reducir saturación del secundario y del acento |
| El primario y el acento son análogos (muy parecidos) | El acento no destaca, el CTA se pierde | El acento debe contrastar con el primario, no armonizar |
| Fondo blanco puro `#FFFFFF` con texto negro puro `#000000` | Contraste brutal, cansa en lectura larga | Usar blanco roto y negro con temperatura |
| Gradiente de 3+ colores como fondo | Efecto "clipart 2010" | Un gradiente máximo de 2 colores, sutiles |

---

## Aplicación de tokens

### Tailwind v4 — tokens en `app/globals.css`

```css
@import "tailwindcss";

@theme {
  /* Colores de marca */
  --color-brand-primary: #C17B3E;
  --color-brand-secondary: #2A3A2A;
  --color-brand-accent: #F5D78E;

  /* Neutros cálidos propios (override de los defaults de Tailwind) */
  --color-neutral-50:  #FAF8F3;
  --color-neutral-100: #F2ECDF;
  --color-neutral-200: #E0D4BD;
  --color-neutral-300: #C8B99A;
  --color-neutral-400: #A89278;
  --color-neutral-500: #856D55;
  --color-neutral-600: #6B5540;
  --color-neutral-700: #4A3F2F;
  --color-neutral-800: #2E2517;
  --color-neutral-900: #1A1208;
}
```

### Tailwind v3 — tokens en `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#C17B3E",
          secondary: "#2A3A2A",
          accent: "#F5D78E",
        },
        neutral: {
          50: "#FAF8F3",
          100: "#F2ECDF",
          200: "#E0D4BD",
          300: "#C8B99A",
          500: "#856D55",
          700: "#4A3F2F",
          900: "#1A1208",
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

### Uso en componentes (SIEMPRE tokens, NUNCA hexes hardcodeados)

```tsx
// ✅ Correcto — siempre tokens
<button className="bg-brand-primary text-neutral-50 hover:bg-brand-primary/90">
  Comprar
</button>

<section className="bg-neutral-900 text-neutral-50">
  ...
</section>

// ❌ Incorrecto — hex hardcodeado
<button className="bg-[#C17B3E] text-white">
  Comprar
</button>
```

---

## Validación antes de avanzar a Etapa 3

- [ ] Paleta elegida sigue el framework 60-30-10.
- [ ] El primario comunica la emoción correcta para el rubro (tabla de psicología del color).
- [ ] Los neutros tienen la misma temperatura que el primario (no `gray-*` de Tailwind).
- [ ] Contraste WCAG AA verificado en texto body + botones + footer.
- [ ] Si Tailwind v4: tokens en `@theme {}` dentro de `app/globals.css`.
- [ ] Si Tailwind v3: tokens en `tailwind.config.ts` con `theme.extend.colors`.
- [ ] El primario se ve en CTAs, no escondido en el footer.
- [ ] El acento contrasta fuerte con el primario (no son análogos).
