---
name: supabase-storage
description: Configura Supabase Storage para subir, comprimir, listar, reordenar y eliminar imágenes en proyectos Next.js de SitioHoy. Las imágenes se guardan en el bucket `objects` y sus URLs se registran en la tabla `product_images` (no en un array en products). Multi-tenant — las rutas se prefijan por tenant_id. Usar cuando se quiera configurar storage en un proyecto, gestionar imágenes de productos, o invocar desde scaffolds de cualquier plan.
---

# Skill: Supabase Storage

Gestión de imágenes de productos para SitioHoy.

## Prerequisitos

- Supabase configurado (skill `supabase-connection`)
- Tabla `product_images` creada
- Cliente browser disponible en `lib/supabase/client.ts` (lo crea `scaffold-base`)

## Dependencias

```bash
npm install browser-image-compression
```

## Arquitectura

Las imágenes NO se guardan como array en `products.image_urls`. Se usa la tabla `product_images`:

| Campo | Tipo |
|---|---|
| `id` | UUID |
| `tenant_id` | UUID |
| `product_id` | UUID → `products.id` |
| `url` | TEXT (URL pública del archivo en el bucket) |
| `alt` | TEXT |
| `position` | INTEGER (0 = imagen principal) |

**Flujo de subida:**
1. Comprimir imagen client-side (`browser-image-compression`).
2. Subir al bucket `objects` en la ruta `{tenant_id}/{uuid}.{ext}`.
3. Obtener URL pública.
4. INSERT en `product_images` con `product_id`, `url`, `alt`, `position`.

**Flujo de eliminación:**
1. Eliminar archivo del bucket.
2. Eliminar fila de `product_images`.

---

## Paso 1 — Configuración del bucket

Cargar el reference `supabase-storage--ref--bucket-config.md` y ejecutar el SQL en el SQL Editor de Supabase. Esto crea el bucket `objects` (público, 10MB max, jpg/png/webp) y sus policies.

**Importante:** estas son **policies del bucket de Storage**, distintas de las RLS de las tablas. El skill `rls-on-demand` no las maneja.

---

## Paso 2 — Generar archivos del proyecto

Copiar cada reference al path correspondiente.

| Ref a leer | Path destino | Cuándo |
|---|---|---|
| `supabase-storage--ref--upload.md` | `lib/storage/upload.ts` | Cualquier proyecto que gestione imágenes |
| `supabase-storage--ref--delete.md` | `lib/storage/delete.ts` | Cualquier proyecto |
| `supabase-storage--ref--reorder.md` | `lib/storage/reorder.ts` | Si el admin permite reordenar |
| `supabase-storage--ref--read.md` | `lib/storage/read.ts` | Para leer imágenes desde el server |

---

## Estructura de rutas en el bucket

```
objects/
└── {tenant_id}/
    ├── {uuid}.jpg
    ├── {uuid}.webp
    └── {uuid}.png
```

El `tenant_id` como prefijo asegura que un tenant no pueda colisionar con otro. Los nombres usan UUID para evitar conflictos y no exponer información sensible.

---

## Flujo completo en gestión de productos

**Crear producto (admin panel):**
1. Crear el registro en `products` → obtener `product_id`.
2. Para cada imagen: comprimir → subir → INSERT en `product_images`.

**Editar producto:**
1. Mantener las imágenes existentes que el usuario no eliminó.
2. Para las eliminadas: `deleteProductImage(id, url, tenantId)`.
3. Para las nuevas: `uploadProductImage(file, tenantId, productId, { position })`.
4. Si se reordenaron: `reorderProductImages(images, tenantId)`.

**Eliminar producto:**
1. `deleteAllProductImages(productId, tenantId)` — limpia bucket + DB.
2. Eliminar el registro de `products`.

---

## Notas importantes

- Comprimir SIEMPRE client-side ANTES de subir — reduce costos de storage y mejora UX.
- La primera imagen (`position: 0`) se usa como imagen principal en catálogo.
- Al eliminar un producto desde el admin, llamar primero a `deleteAllProductImages` para evitar archivos huérfanos en el bucket.
- Las URLs son públicas — no incluir información sensible en los nombres de archivo (por eso UUID).
- Las policies del bucket se aplican al anon/authenticated key del cliente. El admin panel que usa `service_role` las bypasea.
