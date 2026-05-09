# Reference: Sistema de colores

**Etapa 2 del flujo (junto con tipografía).** Definir paleta concreta y aplicarla como tokens, NUNCA hardcodear.

## Decisiones a tomar

1. **Tema**: claro, oscuro, o mixto (sección hero oscura + resto clara).
2. **Color primario** de marca (lo trae el cliente, o se propone).
3. **Color secundario** (derivar si no lo trae).
4. **Color de acento** (para CTAs y highlights — opcional).
5. **Escala de neutros** (grises/beiges propios, no grises de Tailwind defaults).

---

## Reglas para una paleta con personalidad

### Si el cliente NO trae color primario

Proponer **2-3 opciones** acordes al rubro y esperar elección. Siempre incluir el HEX exacto.

| Rubro | Sugerencias frecuentes |
|---|---|
| Restaurante / bar | Borgoña `#7B1F2B`, Verde oliva profundo `#3E4B2A`, Naranja terracota `#C5572D` |
| Skincare | Beige tostado `#D4B896`, Verde sage `#9CAF88`, Rosa polvo `#E8C5C5` |
| Estudio profesional | Azul prusia `#1E3A5F`, Verde inglés `#2D4A2B`, Negro carbón `#1A1A1A` |
| Ropa urbana | Negro absoluto `#000`, Rojo brutalist `#E63946`, Verde lima eléctrico `#C9F227` |
| Productos artesanales | Mostaza `#D4A648`, Mostaza tostada `#A87C39`, Verde oliva `#73613D` |
| Tech / SaaS | Azul eléctrico `#3D5AFE`, Púrpura `#7C3AED`, Cyan oscuro `#0891B2` |
| Lujo / hospitality | Negro azabache `#0E0E0E`, Verde inglés profundo `#0F2A1F`, Burdeos `#5C0017` |
| Heladería / panadería | Rosa salmón `#F4A4A4`, Pistacho `#A0C49D`, Caramelo `#C68B59` |

### Si el cliente trae color

Aceptar tal cual. Si es muy chillón o mal saturado, sugerir desaturar levemente (el cliente decide).

### Color secundario (derivar si no lo trae)

Opciones:
- **Análogo**: girar 30° en el círculo cromático (ej: primario azul → secundario azul-violeta).
- **Complementario suavizado**: opuesto en el círculo pero desaturado (ej: rojo primario → verde apagado).
- **Mismo tono, distinto valor**: versión más oscura o más clara del primario.

### Color de acento

Solo si el rubro/tono lo pide. Para CTAs especiales o highlights. Debe contrastar fuerte con el primario.

### Escala de neutros propia

**No usar `gray-100`, `gray-200`, etc. de Tailwind.** Crear escala propia que combine con el primario.

Ejemplo para una paleta cálida:
- `neutral-50: #FAF8F5` (cream)
- `neutral-100: #F2EFE8` (cream darker)
- `neutral-300: #C9C2B5` (warm gray)
- `neutral-600: #6B6558` (warm darker)
- `neutral-900: #1F1C16` (warm black)

Ejemplo para paleta fría:
- `neutral-50: #F4F6F8`
- `neutral-100: #E5E9ED`
- `neutral-300: #B8C0C8`
- `neutral-600: #525C66`
- `neutral-900: #0F1419`

---

## Aplicación en `tailwind.config.ts`

**Nunca hardcodear hexes en componentes.** Siempre usar tokens.

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#7B1F2B",      // borgoña — primario del cliente
          secondary: "#D4A648",    // mostaza — secundario derivado
          accent: "#C9F227",       // amarillo eléctrico para CTAs especiales
        },
        neutral: {
          50: "#FAF8F5",
          100: "#F2EFE8",
          300: "#C9C2B5",
          600: "#6B6558",
          900: "#1F1C16",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## Uso en componentes

```tsx
// ✅ Bien
<button className="bg-brand-primary text-neutral-50 hover:bg-brand-primary/90">
  Comprar
</button>

// ❌ Mal — hardcoded
<button className="bg-[#7B1F2B] text-white">
  Comprar
</button>

// ❌ Mal — usa neutros de Tailwind
<div className="bg-gray-100 text-gray-900">
```

---

## Validación de contraste

Cumplir **WCAG AA mínimo** para texto sobre fondos:

- Texto normal: contraste mínimo **4.5:1**
- Texto grande (18px+ bold o 24px+): contraste mínimo **3:1**

Verificar con [contrast-ratio.com](https://contrast-ratio.com) o herramienta similar.

Combinaciones a verificar **siempre**:
- Body text sobre fondo principal
- Body text sobre fondo de sección secundaria
- Texto de botón primario sobre `brand.primary`
- Texto de footer sobre footer background
- Texto de inputs sobre input background

---

## Tema oscuro / claro

### Si el sitio es full claro
Sin estados de dark mode. Mantener la paleta consistente.

### Si el sitio es full oscuro
- Background principal: `neutral-900` o derivado.
- Texto principal: `neutral-50` o derivado.
- Cuidado con luminancia de los `brand.*` — ajustar versiones más claras para que destaquen sobre oscuro.

### Si es mixto (hero oscuro, resto claro)
Definir qué secciones son oscuras y consistencia. Comprometerse con UNA decisión, no alternar caóticamente.

---

## Validación final

- [ ] Colores como tokens en `tailwind.config.ts` (NO hardcoded).
- [ ] Escala de neutros propia (no `gray-*` de Tailwind).
- [ ] Contraste WCAG AA validado en todas las combinaciones de texto.
- [ ] Decisión clara de tema (claro / oscuro / mixto) y aplicada consistentemente.
- [ ] El primario se ve en el sitio en lugares clave: CTAs, links, acentos. NO solo en el footer perdido.
