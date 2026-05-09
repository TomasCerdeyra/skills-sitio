# Reference: Imágenes placeholder

**Sin imágenes la plantilla no se ve, no se vende.**

## Dimensiones por contexto de uso

Usar siempre el ancho correcto para evitar pixelación en pantallas grandes y no enviar bytes innecesarios.

| Contexto | URL param | `quality` en Next.js Image |
|---|---|---|
| **Hero / fondo full-viewport** | `?w=2400&q=90&auto=format&fit=crop` | `quality={90}` |
| **Sección decorativa (ancho parcial, ~50vw)** | `?w=1200&q=85&auto=format&fit=crop` | `quality={85}` |
| **Imagen "Nosotros" (columna 1/2)** | `?w=1200&q=85&auto=format&fit=crop` | `quality={85}` |
| **Product card** | `?w=800&q=80&auto=format&fit=crop` | `quality={80}` (default) |
| **Thumbnail / avatar** | `?w=400&q=80&auto=format&fit=crop` | `quality={80}` |

**Regla:** cualquier imagen que ocupe más del 60% del ancho de pantalla en desktop usa `w=2400`. Imágenes menores a la mitad de pantalla usan `w=1200`.

```tsx
{/* Hero — fondo full viewport */}
<Image
  src="https://images.unsplash.com/photo-1470338745628-171cf53de3a8?auto=format&fit=crop&w=2400&q=90"
  alt="Interior del local"
  fill
  priority
  quality={90}
  className="object-cover"
  sizes="100vw"
/>

{/* Sección "Nosotros" — columna de 50% */}
<Image
  src="https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=1200&q=85"
  alt="Bartender en el local"
  fill
  quality={85}
  className="object-cover"
  sizes="(max-width: 1024px) 100vw, 50vw"
/>

{/* Product card */}
<Image
  src="https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=800&q=80"
  alt="IPA Artesanal"
  fill
  className="object-cover"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>
```

---

## ⚠️ Importante: `source.unsplash.com` está deprecado

`https://source.unsplash.com/featured/{w}x{h}/?{keywords}` fue eliminado por Unsplash en marzo 2023. **NO usar** — devuelve la página de Unsplash, no una imagen.

---

## Opción A — Unsplash CDN (fotos reales, por rubro) ✅ Recomendada

URL directa a una foto específica de Unsplash. No cambian nunca.

```
https://images.unsplash.com/photo-{photo_id}?w={ancho}&q=80&auto=format&fit=crop
```

### Fotos curadas por rubro

#### Café / Bar / Restaurante

| Uso | Photo ID |
|---|---|
| Hero / interior del local | `1554118811-1e0d58224f24` |
| Café americano en taza | `1509042239860-f550ce710b93` |
| Espresso / cortado | `1485808191679-5f86510bd9d4` |
| Capuchino con foam art | `1572442388796-11668a67e53d` |
| Latte art / barista | `1461023058943-07fcbe16d735` |
| Barista trabajando | `1453614512568-c4024d13c247` |
| Croissant / medialuna | `1555507036-ab1f4038808a` |
| Tostado / sandwich | `1528736235302-52922df5c122` |
| Sandwich de miga | `1568901346375-23c9450c58cd` |
| Cheesecake con frutos rojos | `1565958011703-44f9829ba187` |
| Brownie / postre oscuro | `1606313564200-e75d5e30476c` |
| Copa de vino tinto | `1510812431401-41d2bd2722f3` |
| Cerveza artesanal | `1535958636474-b021ee887b13` |
| Café exterior / terraza | `1442512435-cd787031a5e5` |

Uso en código:
```tsx
{/* Cliente: reemplazar con foto propia */}
<img
  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=80&auto=format&fit=crop"
  alt="Interior del local"
  className="w-full h-full object-cover"
/>
```

#### Skincare / Cosmética

| Uso | Photo ID |
|---|---|
| Hero / flatlay productos | `1576426479480-5e0f10b2a4b1` |
| Serum / gotero | `1620916566398-39f1143ab7be` |
| Crema en frasco | `1608248543803-ba4f8c70ae0b` |
| Producto natural / botánico | `1535591611502-103d06012b48` |
| Modelo / lifestyle | `1596462502278-27bfdc403348` |

#### Ropa / Indumentaria

| Uso | Photo ID |
|---|---|
| Hero / modelo | `1558769132-cb1aea153895` |
| Remera básica | `1591195853828-11db59a44f43` |
| Jeans / pantalón | `1576995853123-5a10305d93c0` |
| Rack de ropa / showroom | `1558618666-fcd25c85cd64` |
| Detalle de tela / texture | `1582552938357-32b906df40cb` |

#### Estudio profesional / Servicios

| Uso | Photo ID |
|---|---|
| Hero / oficina minimal | `1497366216548-37526070297c` |
| Reunión / team | `1600880292203-757bb62b4baf` |
| Laptop / documentos | `1454165804606-c3d57bc86b40` |

#### Panadería / Pastelería

| Uso | Photo ID |
|---|---|
| Hero / escaparate | `1558303729-b51f9cf25d12` |
| Pan recién horneado | `1509440159596-0249088772ff` |
| Croissants en bandeja | `1555507036-ab1f4038808a` |
| Torta / cake | `1565958011703-44f9829ba187` |

#### Joyería

| Uso | Photo ID |
|---|---|
| Hero / flatlay joyas | `1515562141207-7a88fb7ce338` |
| Anillo plata | `1535632066927-ab7c9ab60908` |
| Collar minimal | `1573408301185-9521e7572d8f` |

---

## Opción B — Picsum Photos (fallback universal) ✅

Fotos de alta calidad, siempre disponibles, determinísticas por seed. No requiere cuenta ni API key. La foto es la misma para el mismo seed.

```
https://picsum.photos/seed/{seed}/{ancho}/{alto}
```

```tsx
{/* Cliente: reemplazar con foto propia */}
<img
  src="https://picsum.photos/seed/hero-cafe/1600/900"
  alt="Hero"
  className="w-full h-full object-cover"
/>
```

Ventaja: siempre funciona, nunca da 404.
Desventaja: la foto no es temática (es aleatoria pero de alta calidad).

Usar picsum cuando no hay foto de Unsplash adecuada, o para mockear secciones decorativas sin foto específica.

---

## Marcar imágenes en código

Toda imagen placeholder lleva comentario para el cliente:

```tsx
{/* Cliente: reemplazar con foto propia */}
<img
  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=80&auto=format&fit=crop"
  alt="Ambiente del local"
  className="w-full h-full object-cover"
/>
```

---

## Fallback en ProductCard cuando no hay imagen en Supabase

```tsx
function getProductImageSrc(product: { name: string; product_images: { url: string }[] }) {
  if (product.product_images?.[0]?.url) {
    return product.product_images[0].url;
  }
  // Fallback determinístico por nombre de producto
  const seed = product.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  return `https://picsum.photos/seed/${seed}/600/600`;
}
```

---

## Patrón en seed-data.sql — Siempre usar `images.unsplash.com`

```sql
INSERT INTO public.product_images (id, tenant_id, product_id, url, alt, position) VALUES
  ('...', '...', '...', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80&auto=format&fit=crop', 'Café americano', 0);
```

**Nunca usar `source.unsplash.com`** en el SQL — esas URLs ya no funcionan.

---

## Validación

- [ ] CERO URLs con `source.unsplash.com` — deprecado desde marzo 2023.
- [ ] Todas las imágenes usan `images.unsplash.com/photo-{id}` o `picsum.photos/seed/`.
- [ ] Cada `<img>` tiene comentario `{/* Cliente: reemplazar con foto propia */}`.
- [ ] `alt` descriptivo en cada imagen.
- [ ] `object-cover` + `aspect-ratio` fijo para evitar distorsión.
- [ ] Hero tiene imagen de fondo o lateral.
- [ ] Sección "Nosotros" tiene al menos 1 imagen.
- [ ] Si hay sección de "destacados" en home, las cards tienen imagen.
