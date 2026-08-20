---
name: seccion-faq
description: Sección de Preguntas Frecuentes que se incluye en TODAS las plantillas, independientemente del plan. Va en la Home, generalmente antes del footer. El contenido (preguntas y respuestas) se adapta al rubro del negocio con copy verosímil. El DISEÑO varía libremente entre plantillas — no existe un layout fijo. La IA debe generar un diseño diferente cada vez para mantener la variedad visual entre plantillas.
---

# Skill: Sección FAQ — Preguntas Frecuentes

Sección de preguntas frecuentes que va en **TODAS las plantillas**, en la Home, adaptada al rubro del negocio.

## Regla principal

**El contenido siempre está, pero el diseño NUNCA se repite.** Cada plantilla debe tener una FAQ visualmente diferente. No existe un componente fijo — la IA diseña la sección con libertad creativa total.

---

## Contenido obligatorio

### Cantidad
- **Mínimo 5 preguntas, máximo 8.**
- Adaptadas al rubro del negocio (ver tabla de ejemplo abajo).

### Tono
- Preguntas en primera persona del cliente: *"¿Cuánto tarda el envío?"*, *"¿Puedo pagar en cuotas?"*
- Respuestas concisas, 2-3 oraciones. Tono profesional pero cercano.
- Copy verosímil — no usar datos reales del cliente, inventar datos creíbles del rubro.

### Preguntas comunes por tipo de plan

**Plan Esencial (sin checkout):**
| Pregunta tipo | Ejemplo |
|---|---|
| Cómo comprar | "¿Cómo hago un pedido?" → "Contactanos por WhatsApp y te guiamos..." |
| Horarios / atención | "¿Cuál es el horario de atención?" → "Respondemos de lunes a viernes..." |
| Zona de cobertura | "¿Hacen envíos al interior?" → "Sí, realizamos envíos a todo el país..." |
| Personalización | "¿Hacen pedidos personalizados?" → adaptado al rubro |
| Devoluciones | "¿Puedo devolver un producto?" → política verosímil |

**Plan Emprendimiento / Empresa (con checkout):**
| Pregunta tipo | Ejemplo |
|---|---|
| Métodos de pago | "¿Puedo pagar en cuotas?" → "Sí, aceptamos hasta 12 cuotas con MercadoPago..." |
| Envíos | "¿Cuánto tarda en llegar?" → "Los envíos llegan en 3-7 días hábiles..." |
| Devoluciones | "¿Qué hago si el producto llegó dañado?" → política verosímil |
| Descuentos | "¿Tienen descuentos o cupones?" → "Publicamos ofertas especiales en nuestras redes..." |
| Seguimiento | "¿Cómo sigo mi pedido?" → "Te enviamos un email con el tracking..." |

> **El modelo debe generar las preguntas ADAPTADAS al rubro**, no copiar estas tablas. Un bar no habla de envíos; una tienda de ropa no habla de reservas.

---

## Diseño — delegado al mood del sitio

**No hay un diseño fijo ni un catálogo de opciones.** El layout, las animaciones y la organización visual de la FAQ deben nacer del **mood y dirección estética** definidos en la Etapa 1 del skill `sitio-diseno`. La FAQ es una sección más del sitio — tiene que sentirse parte del mismo universo visual, no un bloque genérico pegado al final.

Diseñá la FAQ con la misma libertad creativa que cualquier otra sección de la Home. Lo único que importa es que:

- Se integre visualmente con el resto del sitio (misma paleta, tipografía, ritmo).
- No se vea como un componente sacado de un template builder.
- Funcione bien en mobile y desktop.
- Tenga algún tipo de animación o interactividad coherente con el mood.

---

## Implementación técnica

### Componente
- Crear como **`components/ui/FAQSection.tsx`** con `"use client"` (para interactividad).
- Usar `framer-motion` para animaciones de entrada y de interacción.
- Las preguntas y respuestas van como array de objetos en el componente (hardcodeadas, no de DB):

```tsx
const faqs = [
  {
    question: "¿Cuánto tarda el envío?",
    answer: "Los envíos llegan en 3 a 7 días hábiles dependiendo de la zona. Trabajamos con Correo Argentino y Andreani para garantizar la entrega."
  },
  // ... 4-7 más
];
```

### Ubicación en la Home
- Importar en `app/(public)/page.tsx` como sección de la home.
- Posición recomendada: **antes del footer, después de las secciones de contenido principal.**
- Puede tener un fondo diferente (oscuro/claro) para crear contraste con la sección anterior.

### Heading de sección
- Título visible: "Preguntas Frecuentes", "FAQ", "¿Tenés dudas?", "Lo que nos preguntan siempre" — elegir el que mejor encaje con el tono del rubro.
- Subtítulo opcional: una línea que invite a contactar si la duda no está.

### Responsive
- **Mobile:** siempre colapsable o scrollable. No mostrar todo expandido si son más de 5.
- **Desktop:** layout libre según el diseño elegido.

### Accesibilidad
- Usar `<button>` para los triggers de expandir.
- Aria attributes: `aria-expanded`, `aria-controls` en elementos interactivos.
- Los ids deben ser únicos: `faq-item-{index}`, `faq-answer-{index}`.

---

## Integración en la Home

```tsx
// app/(public)/page.tsx

import { FAQSection } from "@/components/ui/FAQSection";

export default async function HomePage() {
  return (
    <main>
      {/* ... Hero, productos destacados, nosotros, etc. ... */}

      {/* FAQ — siempre presente */}
      <FAQSection />

      {/* Footer */}
    </main>
  );
}
```

---

## Reglas

1. **SIEMPRE presente** en la Home de todas las plantillas, todos los planes.
2. **NUNCA el mismo diseño** en dos plantillas. Variar layout, animaciones, colores.
3. **Copy adaptado al rubro.** Un café no pregunta sobre envíos; una tienda no pregunta sobre reservas.
4. **Mínimo 5 preguntas.** Menos se ve vacío. Máximo 8 para no aburrir.
5. **`"use client"`** obligatorio si el diseño tiene interactividad (acordeón, tabs, etc.).
6. **Framer Motion** para animaciones de entrada y de interacción.
7. **Mobile-friendly.** El diseño elegido debe funcionar bien en 375px.
8. **No depende de Supabase.** Las preguntas están hardcodeadas en el componente.
9. **Accesibilidad.** Aria attributes en elementos interactivos.

---

## Validación

- [ ] `<FAQSection />` renderizado en la Home.
- [ ] Mínimo 5 preguntas visibles.
- [ ] Preguntas adaptadas al rubro del negocio.
- [ ] Diseño visualmente diferente a otras plantillas del proyecto.
- [ ] Animaciones funcionales (entrada + interacción).
- [ ] Responsive correcto en mobile (375px) y desktop (1280px).
- [ ] Aria attributes presentes en elementos interactivos.
