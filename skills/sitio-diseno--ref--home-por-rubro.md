# Reference: Estructura de Home por rubro

**Problema a evitar:** todas las plantillas con el mismo orden de secciones (Hero → Marquee → Destacados → Nosotros → CTA). Cada rubro tiene una estructura de Home diferente que refleja su propuesta de valor única.

---

## Principio general

La home tiene que responder a la pregunta clave del visitante de ese rubro:
- **Bar/Pub:** "¿Cuándo están abiertos? ¿Qué ambiente tiene?"
- **Café:** "¿Qué sirven? ¿Puedo quedarme?"
- **Tienda/Indumentaria:** "¿Qué hay de nuevo? ¿Qué estilo es?"
- **Skincare:** "¿Esto funciona para mi piel? ¿Qué ingredientes usa?"
- **Restaurante:** "¿Qué tipo de comida? ¿Necesito reservar?"

---

## Estructuras por rubro

### Bar / Pub / Cantina

**Diferenciador clave:** horarios + ambiente nocturno.

Secciones en orden:
1. **Hero** — imagen nocturna/ambiental, heading corto ("El sabor que nos hace volver"), CTA "Ver la carta" + "Hacer un pedido"
2. **Marquee** — tipas de bebidas/tragos (opcional, solo si la paleta lo permite)
3. **Bebidas destacadas** — 3 cards del producto estrella
4. **Sección Horarios** — grid en `bg-brand-primary` con días/horarios, impacto visual alto
5. **Ambiente / Nosotros** — imagen grande del local + copy emocional, fondo oscuro
6. **CTA final** — "Tu mesa te espera" + dos botones (carta + contacto)

```tsx
{/* Ejemplo: sección horarios diferenciadora */}
<section className="bg-brand-primary py-16">
  <div className="max-w-6xl mx-auto px-4">
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
      {[
        { dias: "Lun — Jue", horario: "18:00 – 01:00" },
        { dias: "Vie — Sáb", horario: "18:00 – 03:00" },
        { dias: "Domingo",   horario: "17:00 – 00:00" },
        { dias: "Pedidos online", horario: "Todos los días" },
      ].map((h, i) => (
        <FadeUpOnScroll key={i} delay={i * 0.08}>
          <div>
            <p className="text-brand-secondary text-xs uppercase tracking-widest font-medium mb-1">{h.dias}</p>
            <p className="font-display text-white text-2xl">{h.horario}</p>
          </div>
        </FadeUpOnScroll>
      ))}
    </div>
  </div>
</section>
```

---

### Café / Coffee Shop

**Diferenciador clave:** el proceso artesanal, la calidez del lugar, la mañana.

Secciones en orden:
1. **Hero** — imagen cálida de taza/barista, fondo claro u oscuro con calidez
2. **Strip de especialidades** — `overflow-hidden` scroll, ej: "Espresso · Cortado · Latte · Cold Brew · Matcha · Drip"
3. **Menú destacado** — 3 cards (desayuno + bebida fría + bebida caliente)
4. **Sección "El proceso"** — 3 columnas con íconos: "Grano selecto → Tueste en barrio → En tu taza", fondo neutral
5. **Nosotros** — imagen del barista trabajando + copy sobre origen/historia
6. **CTA final** — "Pasate a probar" + WhatsApp prominente

```tsx
{/* Ejemplo: sección proceso diferenciadora */}
<section className="bg-stone-50 py-16">
  <div className="max-w-6xl mx-auto px-4">
    <div className="grid sm:grid-cols-3 gap-8 text-center">
      {[
        { paso: "01", titulo: "Grano selecto", desc: "De productores de origen único. Cada lote con nombre y altura." },
        { paso: "02", titulo: "Tueste en el barrio", desc: "Tueste propio, perfil desarrollado para resaltar el dulzor natural." },
        { paso: "03", titulo: "En tu taza", desc: "Extracción calibrada al gramo. El mismo café, siempre igual." },
      ].map((s, i) => (
        <FadeUpOnScroll key={i} delay={i * 0.1}>
          <div>
            <p className="font-display text-5xl text-brand-secondary/30 mb-3">{s.paso}</p>
            <h3 className="font-display text-lg text-neutral-900 mb-2">{s.titulo}</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">{s.desc}</p>
          </div>
        </FadeUpOnScroll>
      ))}
    </div>
  </div>
</section>
```

---

### Restaurante

**Diferenciador clave:** tipo de cocina + reservas.

Secciones en orden:
1. **Hero** — imagen de plato emblemático o salón, CTA "Ver el menú" + "Reservar mesa"
2. **Categorías del menú** — chips horizontales scrollables (Entradas · Pastas · Carnes · Postres · Vinos)
3. **Platos destacados** — 3-4 cards
4. **Sección de experiencia** — 2 columnas: texto "La cocina que nos define" + imagen del chef/cocina abierta
5. **Reservas** — formulario simple o botón WhatsApp grande, `bg-brand-primary`
6. **Nosotros** — historia del lugar, fondo oscuro

---

### Tienda / Indumentaria / Accesorios

**Diferenciador clave:** las prendas son el héroe visual.

Secciones en orden:
1. **Hero** — imagen editorial de modelo, heading breve, CTA "Ver colección"
2. **Categorías en grid** — 3-4 imágenes con overlay de texto (Remeras · Pantalones · Accesorios · Destacados)
3. **Novedades** — grid 4 productos con etiqueta "NUEVO"
4. **Sección "Hecho en Argentina"** — imagen de taller/producción + copy sobre proceso local, fondo oscuro
5. **Best sellers** — 3 productos con imagen grande
6. **CTA final** — "Ver colección completa" + opción retiro en showroom

```tsx
{/* Ejemplo: grid de categorías con imagen */}
<section className="max-w-6xl mx-auto px-4 py-16">
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
    {CATEGORIES.map((cat, i) => (
      <FadeUpOnScroll key={i} delay={i * 0.08}>
        <Link href={`/catalogo?categoria=${cat.slug}`}
          className="group relative aspect-[3/4] rounded-2xl overflow-hidden block"
        >
          <Image src={cat.image} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <p className="absolute bottom-4 left-4 text-white font-display text-lg">{cat.name}</p>
        </Link>
      </FadeUpOnScroll>
    ))}
  </div>
</section>
```

---

### Skincare / Cosmética

**Diferenciador clave:** ingredientes + confianza + piel real.

Secciones en orden:
1. **Hero** — imagen limpia (flatlay o modelo), colores neutros/pasteles
2. **Propósito** — 1 frase grande centrada ("Sin relleno. Sin promesas vacías. Solo lo que tu piel necesita."), fondo blanco
3. **Productos destacados** — 3 cards con descripción de ingrediente clave
4. **Sección "Ingredientes"** — grid 4-6 ingredientes con ícono botánico + nombre + beneficio corto
5. **Sección "Rutina sugerida"** — 3 pasos (Limpiar · Tratar · Hidratar) con producto en cada paso
6. **CTA final** — "Armá tu rutina" + opción consulta WhatsApp

---

### Panadería / Pastelería

**Diferenciador clave:** lo artesanal, el proceso, el olor del pan (evocar con copy).

Secciones en orden:
1. **Hero** — imagen cálida de pan recién horneado, fondo oscuro o cálido
2. **Marquee** — "Pan de masa madre · Medialunas · Budín de naranja · Tarta · Focaccia · Factura · Croissant"
3. **Destacados** — 3 productos estrella (el pan de masa madre, una tarta, el croissant)
4. **Sección "Del horno a vos"** — 3 pasos animados: "Fermentamos de noche → Horneamos de madrugada → Listo a las 8"
5. **Nosotros** — imagen del panadero + historia del proyecto, fondo cálido
6. **Horario de pickup** — grid simple (lunes-sábado 8-13hs, pedidos anticipados 48hs), `bg-brand-primary`
7. **CTA** — "Hacer un pedido" → WhatsApp

---

### Hotel / Posada / Cabañas

**Diferenciador clave:** el destino y las habitaciones.

Secciones en orden:
1. **Hero** — imagen exterior del lugar, `min-h-screen`
2. **Stats** — 3-4 números destacados: "8 cabañas · 4 ha de parque · A 2hs de CABA · Desayuno incluido"
3. **Habitaciones** — grid 3 tipos (Estándar · Suite · Familiar) con imagen + precio "desde $X"
4. **Servicios** — iconos: Pileta · WiFi · Desayuno · Estacionamiento · Mascotas permitidas
5. **Galería** — masonry o 3-col grid de fotos del lugar
6. **CTA Reservas** — formulario fechas check-in/check-out o botón WhatsApp grande, `bg-brand-primary`

---

## Elementos comunes que SIEMPRE van pero se adaptan visualmente

| Elemento | Bar | Café | Tienda | Skincare | Panadería |
|---|---|---|---|---|---|
| Marquee / strip animado | bebidas/tragos | especialidades café | categorías/colección | ingredientes | productos horneados |
| Sección diferenciadora | Horarios | El proceso | Fabricación local | Ingredientes | Del horno a vos |
| Fondo de contraste | `brand-primary` | `stone-50` o madera | `neutral-900` | blanco/crema | cálido/terracota |
| CTA secundario | Hacer un pedido | WhatsApp | Ir al showroom | Consulta rutina | Pedido anticipado |

---

## Validación anti-sameness

Antes de cerrar una home, verificar:
- [ ] La sección diferenciadora del rubro está presente (ej: Horarios para bar, El proceso para café)
- [ ] El marquee strip tiene keywords del rubro específico, no genérico
- [ ] El color de fondo de la sección de contraste es distinto al de la home de café-del-norte (`bg-amber-950`)
- [ ] El copy del hero menciona algo del rubro (ambiente, bebidas, cocina, prendas, etc.)
- [ ] Al menos 1 sección tiene layout asimétrico (no solo grids simétricos)
