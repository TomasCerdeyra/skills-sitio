# Reference: Galería de Inspiración por Componente

**Propósito:** Este archivo es una GALERÍA DE IDEAS para inspirar diseños únicos. **NO es un menú para elegir.** Usá estas ideas como punto de partida, combiná conceptos, o inventá algo completamente nuevo.

---

## Ideas para la entrada / Hero

| Concepto | Descripción | Cuándo puede funcionar |
|----------|-------------|----------------------|
| Imagen fullscreen con overlay | La imagen ES el mensaje. Texto mínimo centrado sobre fondo oscurecido | Cuando el ambiente del lugar vende solo (bares, hoteles, restaurantes) |
| Split asimétrico | Un lado más ancho que el otro (60/40 o 70/30). Imagen de un lado, texto del otro | Cuando hay que explicar algo antes de mostrar |
| Solo tipografía | Sin imagen. Heading enorme como elemento visual. Fondo de color sólido | Cuando la marca tiene nombre fuerte y tipografía con carácter |
| Collage / mosaico | 2-4 imágenes recortadas en formas distintas + texto intercalado | Cuando hay variedad de productos/looks |
| Video o movimiento | Video loop de fondo, parallax en imagen, o animación generativa | Cuando la experiencia inmersiva importa |
| Scroll horizontal | El hero se revela con scroll lateral. Tipo lookbook | Moda, arte, portafolios |
| Texto que se revela con scroll | El heading aparece letra por letra o línea por línea al hacer scroll | Cuando querés crear expectativa/tensión |
| Hero minimal con whitespace | Mucho espacio vacío. Una frase. Un botón. Nada más | Lujo, joyería, editorial |
| Hero con producto flotante | El producto se muestra con sombra/perspective como si estuviera flotando | Skincare, tech, productos premium |
| Hero con degradado o mesh | Sin imagen, solo gradientes o mesh gradients con texto | Tech, apps, marcas modernas |

**Remixar libremente.** Un hero puede ser "fullscreen + texto que se revela con scroll" o "split asimétrico + video de un lado". Las combinaciones son infinitas.

---

## Ideas para mostrar productos / carta

| Concepto | Descripción |
|----------|-------------|
| Grid clásico de cards | Cards verticales en grid 2-4 columnas. Simple, funcional |
| Menú tipo restaurante | Nombre + descripción + precio en filas, agrupados por categoría con anclas. Sin imágenes o con imagen chica |
| Cards horizontales | Imagen a la izquierda, texto a la derecha. Más espacio para descripción |
| Scroll horizontal por categoría | Cada categoría es una fila con scroll horizontal de productos |
| Masonry / Pinterest | Alturas variables, sensación orgánica. Para productos visuales |
| Cards con overlay al hover | Solo la imagen visible. Al pasar el mouse aparece nombre, precio, CTA |
| Producto destacado + grid | El primer producto ocupa ancho completo o doble, el resto en grid normal |
| Lista minimalista | Sin cards. Solo nombre, precio alineado, línea separadora. Ultra clean |
| Tabs o pills por categoría arriba | Filtros como tabs horizontales arriba del grid, no como sidebar |
| Accordion por categoría | Cada categoría se expande/colapsa. Compacto, bueno para menús largos |
| Bento grid | Cards de distintos tamaños en grid asimétrico tipo bento box |

---

## Ideas para secciones de contenido

| Concepto | Descripción |
|----------|-------------|
| Zigzag alternado | Imagen izquierda/texto derecha, luego al revés. Ritmo de lectura en S |
| Timeline vertical | Pasos conectados con una línea vertical. Para "nuestro proceso" |
| Bento box | Celdas de distintos tamaños en un grid. Moderno, visual |
| Full-bleed con fondos alternados | Secciones de borde a borde con colores alternados. Impacto fuerte |
| Centrado editorial | Todo centrado, max-w estrecho, mucho whitespace. Elegante |
| Cards rotadas | Cards con leve `rotate(-2deg)` para sensación artesanal/humana |
| Stats animados | Números grandes que cuentan de 0 al valor final con animación |
| Marquee / ticker | Tira de texto que se mueve infinitamente. Para keywords del rubro |
| Galería masonry | Grid de fotos del lugar/productos con alturas variables |
| Sección con forma SVG como separador | Ondas, montañas, diagonales entre secciones |
| Parallax en imagen | La imagen se mueve más lento que el texto al hacer scroll |
| Acordeón de FAQs | Preguntas frecuentes con expand/collapse animado |
| Testimonios en carrusel | Citas de clientes en un slider con fade |

---

## Ideas para animaciones

| Concepto | Descripción | CSS/Framer |
|----------|-------------|-----------|
| Fade up clásico | Aparece desde abajo con opacity | `opacity: 0, y: 24 → 1, 0` |
| Slide lateral | Entra desde izquierda o derecha | `opacity: 0, x: -40 → 1, 0` |
| Clip reveal | Se revela como una cortina | `clipPath: "inset(100% 0 0 0)" → "inset(0)"` |
| Scale pop | Aparece creciendo con rebote | `scale: 0.85 → 1` con spring |
| Stagger children | Los hijos aparecen uno después del otro | `staggerChildren: 0.08` |
| Rotate in | Leve rotación al aparecer | `rotate: -3 → 0` |
| Blur to sharp | De borroso a nítido | `filter: blur(8px) → blur(0)` |
| Counter animation | Números que cuentan | `useMotionValue` + `useTransform` |
| Parallax | Velocidades distintas al scroll | `useScroll` + `useTransform` |
| Hover scale | Agrandar al pasar mouse | `whileHover={{ scale: 1.05 }}` |
| Underline grow | Línea que crece al hover | `width: 0 → 100%` con transition |
| Draw SVG | Línea SVG que se dibuja | `pathLength: 0 → 1` |

**Principio:** no usar la misma animación para todo. Mezclar 2-3 tipos distintos en la misma página.

---

## Ideas para navegación

| Header | Descripción |
|--------|-------------|
| Logo izquierda, links centro, CTA derecha | Funcional, probado |
| Logo centrado, links a los costados | Elegante, editorial |
| Transparente sobre el hero | Se vuelve sólido al scroll. Inmersivo |
| Header ultra-minimal | Solo logo + hamburguesa. Todo en el drawer |
| Header con mega-menu | Dropdown grande con categorías + imagen |
| Header sticky que cambia de color | Cambia de transparente a sólido con blur al scroll |

| Footer | Descripción |
|--------|-------------|
| Mega footer oscuro 3-4 columnas | Links, contacto, redes, crédito |
| Footer minimal de una fila | Brand + links + crédito en una línea |
| CTA footer | Un gran call-to-action arriba ("¿Listo para pedir?") + datos debajo |
| Footer con mapa | Integra mapa de ubicación + datos de contacto |
| Footer con newsletter | Input de email + botón de suscripción como protagonista |

---

## Cómo usar esta galería

1. **Mirá las opciones** para cada componente que vas a diseñar.
2. **Elegí una base** o **combiná conceptos** de varias opciones.
3. **Adaptá al mood** definido en la Etapa 1 del diseño.
4. **Sorprendé** — si estás por hacer lo mismo de siempre, elegí otra cosa.
5. **No te limites a esta lista** — si tenés una idea mejor, usala.
