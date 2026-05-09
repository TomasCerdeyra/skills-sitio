# Reference: Seed data SQL por rubro

Generar `scripts/seed-data.sql` con datos de prueba para que la plantilla se vea LLENA al ejecutar `npm run dev`.

**Importante:** este SQL lo ejecuta el usuario manualmente en el SQL Editor de Supabase, después de:
1. Haber creado el tenant (INSERT INTO tenants).
2. Haber corrido `scripts/setup-rls.sql`.

## Estructura del archivo `scripts/seed-data.sql`

El archivo siempre empieza con un header explicativo:

```sql
-- =============================================
-- Seed Data — {nombre del negocio} (rubro: {rubro})
-- Tenant: {tenant_id}
-- Generado: {fecha}
-- Ejecutar UNA SOLA VEZ después de setup-rls.sql
-- =============================================
--
-- Este SQL pobla la base con productos de ejemplo para que la plantilla
-- se vea completa en el preview. Después de aprobar la plantilla, el
-- dueño del negocio gestionará su catálogo real desde el admin panel.
--
-- Si querés borrar todo este seed antes de cargar productos reales:
--   DELETE FROM public.product_variants WHERE tenant_id = '{tenant_id}';
--   DELETE FROM public.product_images WHERE tenant_id = '{tenant_id}';
--   DELETE FROM public.products WHERE tenant_id = '{tenant_id}';
--   DELETE FROM public.subcategories WHERE tenant_id = '{tenant_id}';
--   DELETE FROM public.categories WHERE tenant_id = '{tenant_id}';
--   DELETE FROM public.shipping_zones WHERE tenant_id = '{tenant_id}';
--   DELETE FROM public.coupons WHERE tenant_id = '{tenant_id}';
-- =============================================

-- IMPORTANTE: Reemplazar TODAS las apariciones de '{tenant_id}' con el UUID real del tenant.
```

## Reglas

1. **Cantidades mínimas:**
   - 3-5 categorías
   - 1-2 subcategorías por categoría
   - 8-12 productos
   - 1-2 productos `featured = true` (para sección destacados del Home)
   - 2-3 variantes en al menos 3 productos
   - Si plan = Emprendimiento o Empresa con zonas: 3 zonas de envío
   - Si plan = Emprendimiento o Empresa: 2 cupones de prueba
2. **Imágenes:** cada producto con 1-3 imágenes Unsplash predefinidas con `position` 0, 1, 2.
3. **Slugs siempre en kebab-case ASCII** (sin tildes, sin ñ): `cafe-americano`, `medialuna-de-manteca`.
4. **Precios verosímiles** según el rubro y el momento del país (Argentina 2025-2026: usar valores en miles).
5. **Descripciones de productos:** 2-3 oraciones, vendedoras, sin clichés genéricos.

---

## Plantilla por rubro

### Café / Bar / Restaurante

```sql
-- CATEGORÍAS
INSERT INTO public.categories (id, tenant_id, name, slug, position, active) VALUES
  ('11111111-1111-1111-1111-111111111101', '{tenant_id}', 'Cafetería', 'cafeteria', 0, true),
  ('11111111-1111-1111-1111-111111111102', '{tenant_id}', 'Pastelería', 'pasteleria', 1, true),
  ('11111111-1111-1111-1111-111111111103', '{tenant_id}', 'Sandwichería', 'sandwicheria', 2, true),
  ('11111111-1111-1111-1111-111111111104', '{tenant_id}', 'Vinos y Cervezas', 'vinos-y-cervezas', 3, true);

-- SUBCATEGORÍAS
INSERT INTO public.subcategories (id, tenant_id, category_id, name, slug, position, active) VALUES
  ('22222222-2222-2222-2222-222222222201', '{tenant_id}', '11111111-1111-1111-1111-111111111101', 'Café', 'cafe', 0, true),
  ('22222222-2222-2222-2222-222222222202', '{tenant_id}', '11111111-1111-1111-1111-111111111101', 'Tés e infusiones', 'tes-infusiones', 1, true),
  ('22222222-2222-2222-2222-222222222203', '{tenant_id}', '11111111-1111-1111-1111-111111111102', 'Medialunas y facturas', 'medialunas-facturas', 0, true),
  ('22222222-2222-2222-2222-222222222204', '{tenant_id}', '11111111-1111-1111-1111-111111111102', 'Tortas y postres', 'tortas-postres', 1, true);

-- PRODUCTOS
INSERT INTO public.products (id, tenant_id, name, slug, description, price, compare_at_price, category_id, active, featured) VALUES
  ('33333333-3333-3333-3333-333333333301', '{tenant_id}', 'Café americano', 'cafe-americano',
    'Café de tueste medio, recién molido, servido en taza grande. Aroma intenso, cuerpo balanceado.',
    1200, NULL, '11111111-1111-1111-1111-111111111101', true, true),
  ('33333333-3333-3333-3333-333333333302', '{tenant_id}', 'Cortado', 'cortado',
    'Espresso doble cortado con leche caliente. La medida perfecta entre café y leche.',
    1300, NULL, '11111111-1111-1111-1111-111111111101', true, false),
  ('33333333-3333-3333-3333-333333333303', '{tenant_id}', 'Capuchino', 'capuchino',
    'Espresso, leche vaporizada y un toque de cacao en polvo. Cremoso y suave.',
    1500, NULL, '11111111-1111-1111-1111-111111111101', true, true),
  ('33333333-3333-3333-3333-333333333304', '{tenant_id}', 'Medialuna de manteca', 'medialuna-de-manteca',
    'Hechas cada mañana con manteca, harina seleccionada y fermentación lenta. Doraditas y crujientes.',
    900, NULL, '11111111-1111-1111-1111-111111111102', true, false),
  ('33333333-3333-3333-3333-333333333305', '{tenant_id}', 'Tostado de jamón y queso', 'tostado-jamon-queso',
    'Pan de campo con jamón cocido natural y queso por tabla. Servido caliente.',
    3200, NULL, '11111111-1111-1111-1111-111111111103', true, false),
  ('33333333-3333-3333-3333-333333333306', '{tenant_id}', 'Sandwich de miga triple', 'sandwich-miga-triple',
    'Tres pisos de pan de miga sin corteza, con jamón, queso y tomate. Ideal para acompañar el café.',
    2800, NULL, '11111111-1111-1111-1111-111111111103', true, false),
  ('33333333-3333-3333-3333-333333333307', '{tenant_id}', 'Cheesecake de frutos rojos', 'cheesecake-frutos-rojos',
    'Base de galletas, queso crema batido y salsa de frutos rojos casera. Una porción generosa.',
    2400, 2900, '11111111-1111-1111-1111-111111111102', true, true),
  ('33333333-3333-3333-3333-333333333308', '{tenant_id}', 'Brownie con helado', 'brownie-con-helado',
    'Brownie casero tibio con bocha de helado de crema americana. Para compartir o no.',
    2600, NULL, '11111111-1111-1111-1111-111111111102', true, false),
  ('33333333-3333-3333-3333-333333333309', '{tenant_id}', 'Vino malbec - copa', 'vino-malbec-copa',
    'Selección de bodegas mendocinas. Servido en copa, ideal para acompañar la tarde.',
    2800, NULL, '11111111-1111-1111-1111-111111111104', true, false),
  ('33333333-3333-3333-3333-333333333310', '{tenant_id}', 'Cerveza artesanal IPA', 'cerveza-artesanal-ipa',
    'IPA local, lúpulo cítrico y amargor balanceado. Botella 500ml.',
    2200, NULL, '11111111-1111-1111-1111-111111111104', true, false);

-- IMÁGENES (Unsplash)
-- Usar SIEMPRE images.unsplash.com/photo-{id} — source.unsplash.com está deprecado desde marzo 2023.
-- Ver sitio-diseno--ref--imagenes-placeholder.md para lista de IDs curados por rubro.
INSERT INTO public.product_images (id, tenant_id, product_id, url, alt, position) VALUES
  ('44444444-4444-4444-4444-444444444401', '{tenant_id}', '33333333-3333-3333-3333-333333333301', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80&auto=format&fit=crop', 'Café americano', 0),
  ('44444444-4444-4444-4444-444444444402', '{tenant_id}', '33333333-3333-3333-3333-333333333302', 'https://images.unsplash.com/photo-1485808191679-5f86510bd9d4?w=800&q=80&auto=format&fit=crop', 'Cortado', 0),
  ('44444444-4444-4444-4444-444444444403', '{tenant_id}', '33333333-3333-3333-3333-333333333303', 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&q=80&auto=format&fit=crop', 'Capuchino', 0),
  ('44444444-4444-4444-4444-444444444404', '{tenant_id}', '33333333-3333-3333-3333-333333333304', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80&auto=format&fit=crop', 'Medialuna', 0),
  ('44444444-4444-4444-4444-444444444405', '{tenant_id}', '33333333-3333-3333-3333-333333333305', 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=800&q=80&auto=format&fit=crop', 'Tostado', 0),
  ('44444444-4444-4444-4444-444444444406', '{tenant_id}', '33333333-3333-3333-3333-333333333306', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80&auto=format&fit=crop', 'Sandwich miga', 0),
  ('44444444-4444-4444-4444-444444444407', '{tenant_id}', '33333333-3333-3333-3333-333333333307', 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80&auto=format&fit=crop', 'Cheesecake', 0),
  ('44444444-4444-4444-4444-444444444408', '{tenant_id}', '33333333-3333-3333-3333-333333333308', 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80&auto=format&fit=crop', 'Brownie', 0),
  ('44444444-4444-4444-4444-444444444409', '{tenant_id}', '33333333-3333-3333-3333-333333333309', 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80&auto=format&fit=crop', 'Vino malbec', 0),
  ('44444444-4444-4444-4444-444444444410', '{tenant_id}', '33333333-3333-3333-3333-333333333310', 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=800&q=80&auto=format&fit=crop', 'Cerveza IPA', 0);

-- VARIANTES (solo en algunos productos)
INSERT INTO public.product_variants (id, tenant_id, product_id, name, price, stock) VALUES
  ('55555555-5555-5555-5555-555555555501', '{tenant_id}', '33333333-3333-3333-3333-333333333301', 'Mediano', 1200, 50),
  ('55555555-5555-5555-5555-555555555502', '{tenant_id}', '33333333-3333-3333-3333-333333333301', 'Doble', 1700, 50),
  ('55555555-5555-5555-5555-555555555503', '{tenant_id}', '33333333-3333-3333-3333-333333333303', 'Chico', 1300, 50),
  ('55555555-5555-5555-5555-555555555504', '{tenant_id}', '33333333-3333-3333-3333-333333333303', 'Grande', 1700, 50);
```

---

### Skincare / Cosmética

Ajustar las queries con productos como:
- Sérum de vitamina C (15.000 - 18.000)
- Crema hidratante de día (12.000)
- Aceite facial nutritivo (16.000)
- Limpiador suave (9.500)
- Mascarilla detox (11.000)
- Tónico balanceador (10.500)
- Protector solar SPF50 (14.000)
- Contorno de ojos (13.500)

Categorías: `Limpieza`, `Hidratación`, `Tratamiento`, `Protección Solar`.

Variantes: tamaños (`30ml`, `50ml`, `100ml`) con stock realista.

Keywords Unsplash: `serum,bottle,minimal`, `cream,jar,natural`, `oil,skincare`, `cleanser,bottle`.

---

### Ropa / Indumentaria

Productos: `Remera básica`, `Camisa de lino`, `Buzo oversized`, `Pantalón cargo`, `Vestido midi`, `Saco oversized`, `Jean recto`, `Campera de jean`.

Precios: 25.000 - 65.000.

Categorías: `Mujer`, `Hombre`, `Unisex`, `Accesorios`.

Variantes: talles (`S`, `M`, `L`, `XL`) y/o colores con stock.

Keywords: `tshirt,minimal`, `shirt,linen`, `hoodie,grey`, `cargo,pants`, `dress,minimal`.

---

### Estudio profesional

**Plan Esencial** (sin checkout). En vez de productos, "servicios":

Categorías: `Servicios contables`, `Asesoramiento societario`, `Liquidación de sueldos`, `Asesoramiento fiscal`.

Productos: `Monotributo - alta y gestión mensual`, `Sociedad - constitución`, `Liquidación de sueldos hasta 5 empleados`, `Plan anual integral PyME`.

Precios: desde 30.000/mes hasta 150.000/mes.

Sin variantes (los servicios suelen ser fijos).

Keywords: `documents,desk`, `office,minimal`, `business,meeting`.

---

### Panadería / Pastelería / Heladería

Productos panadería: `Pan de masa madre`, `Baguette`, `Medialunas docena`, `Roscas de pascua`, `Pan de campo`.

Productos pastelería: `Cheesecake`, `Lemon pie`, `Carrot cake`, `Brownie`, `Tarta de manzana`.

Productos heladería: `1/4 kg`, `1/2 kg`, `1 kg`, `Cono simple`, `Cono doble`.

Variantes (en heladería): sabores como `Dulce de leche`, `Chocolate amargo`, `Frutilla a la crema`.

Categorías: `Panadería`, `Pastelería` o `Helados`, `Sabores`, `Tortas para encargar`.

Keywords: `bread,sourdough`, `croissant,fresh`, `cheesecake`, `icecream,scoop`.

---

### Joyería

Productos: `Anillo plata 925`, `Cadena minimal`, `Aros pequeños`, `Pulsera ajustable`, `Anillo con piedra`, `Collar largo`, `Aros statement`, `Set anillo + cadena`.

Precios: 15.000 - 80.000.

Categorías: `Anillos`, `Aros`, `Cadenas`, `Pulseras`, `Sets`.

Variantes: por talla de anillo (`14`, `16`, `18`, `20`).

Keywords: `silver,ring`, `necklace,minimal`, `earrings,gold`, `bracelet`.

---

### Tienda artesanal / regional

Productos: `Aceite de oliva extra virgen`, `Miel de monte 500g`, `Mermelada de membrillo`, `Queso de cabra`, `Vino patagónico`, `Salame artesanal`, `Dulce de leche regional`, `Conservas de tomates`.

Precios: 4.500 - 18.000.

Categorías: `Despensa`, `Quesos y fiambres`, `Vinos`, `Dulces y mermeladas`.

Keywords: `olive,oil,bottle`, `honey,jar`, `cheese,artisan`, `wine,bottle,label`.

---

### Hotel / Posada

**Plan Esencial.** Productos = "habitaciones" o "servicios":

`Habitación estándar`, `Habitación deluxe`, `Suite con vista`, `Cabaña familiar`.

Precios: 80.000 - 250.000 (por noche).

Categorías: `Habitaciones`, `Cabañas`, `Servicios adicionales`.

Keywords: `hotel,room,boutique`, `cabin,interior`, `suite,view`.

---

### Peluquería / Estética

`Corte mujer`, `Corte hombre`, `Color y mechas`, `Tratamiento capilar`, `Manicura`, `Pedicura`, `Limpieza facial`, `Masaje relajante`.

Precios: 8.000 - 45.000.

Categorías: `Cabello`, `Manos y pies`, `Tratamientos faciales`, `Masajes`.

Keywords: `haircut,salon`, `manicure`, `facial,treatment`, `massage,spa`.

---

### Librería

Productos: `Cien años de soledad - Gabriel García Márquez`, `Rayuela - Julio Cortázar`, etc. (clásicos sin problema de copyright en este uso).

Precios: 8.000 - 25.000.

Categorías: `Ficción`, `Ensayo`, `Poesía`, `Infantil`.

Keywords: `book,cover`, `novel`, `poetry,book`.

---

## Shipping zones (solo si plan usa shipping_zones)

```sql
-- ZONAS DE ENVÍO (solo Emprendimiento, o Empresa con zonas fijas)
INSERT INTO public.shipping_zones (id, tenant_id, name, description, price, position, active) VALUES
  ('66666666-6666-6666-6666-666666666601', '{tenant_id}', 'CABA', 'Capital Federal', 1500, 0, true),
  ('66666666-6666-6666-6666-666666666602', '{tenant_id}', 'GBA Norte', 'Vicente López, San Isidro, Tigre y zona', 2200, 1, true),
  ('66666666-6666-6666-6666-666666666603', '{tenant_id}', 'GBA Sur y Oeste', 'Lomas, Quilmes, Morón, La Matanza', 2500, 2, true),
  ('66666666-6666-6666-6666-666666666604', '{tenant_id}', 'Interior', 'Resto del país (vía correo)', 4500, 3, true);
```

---

## Cupones (solo Emprendimiento y Empresa)

```sql
-- CUPONES DE PRUEBA
INSERT INTO public.coupons (id, tenant_id, code, type, value, min_amount, max_uses, uses_count, expires_at, starts_at, active) VALUES
  ('77777777-7777-7777-7777-777777777701', '{tenant_id}', 'BIENVENIDA10', 'percent', 10, 5000, 100, 0, '2026-12-31T23:59:59Z', NOW(), true),
  ('77777777-7777-7777-7777-777777777702', '{tenant_id}', 'PRIMERA5000', 'fixed', 5000, 25000, 50, 0, '2026-12-31T23:59:59Z', NOW(), true);
```

---

## Output del skill

El archivo `scripts/seed-data.sql` resultante debe:
- Tener el header con metadatos.
- Tener TODOS los `INSERT` ordenados (categorías → subcategorías → productos → imágenes → variantes → shipping → cupones).
- Tener `{tenant_id}` reemplazado por el UUID real, **o bien** dejado como `{tenant_id}` con instrucción al usuario de hacer el reemplazo (recomendado: lo segundo, así el usuario hace el reemplazo a conciencia).

## Validación

- [ ] Categorías acordes al rubro (3-5).
- [ ] Subcategorías al menos en 2 categorías.
- [ ] 8-12 productos con descripciones reales.
- [ ] 1-2 productos `featured = true`.
- [ ] Cada producto con al menos 1 imagen Unsplash.
- [ ] 3-4 productos con variantes.
- [ ] Si Emprendimiento o Empresa con zonas: 3-4 shipping_zones.
- [ ] Si Emprendimiento o Empresa: 2 cupones.
- [ ] Slugs en kebab-case ASCII.
- [ ] Precios verosímiles (Argentina actual).
- [ ] Header del archivo con instrucciones claras al usuario.
