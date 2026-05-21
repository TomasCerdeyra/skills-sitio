# Reference: Seed data SQL por rubro

Generar `scripts/seed-data.sql` con datos de prueba para que la plantilla se vea llena al ejecutar `npm run dev`.

El usuario lo ejecuta manualmente en el SQL Editor de Supabase, despues de haber corrido `scripts/setup-rls.sql`.

## Estructura del encabezado

```sql
-- =============================================
-- Seed Data - {nombre del negocio}
-- Ejecutar UNA SOLA VEZ despues de setup-rls.sql
-- Hacer Ctrl+H y reemplazar TODO_TENANT_ID con el UUID real
-- =============================================
```

## Reglas

1. **IDs unicos por proyecto — NUNCA reusar IDs del template:**
   - Generar UUIDs FRESCOS para cada entidad.
   - **PROHIBIDO** usar los IDs de ejemplo del template (`11111111-...`, `22222222-...`, etc.) — colisionan si hay mas de un proyecto en la misma instancia de Supabase.
   - Generar UUIDs con formato real (ej: `a7c3e1d9-4b2f-4e8a-b5c6-d7e8f9012345`).
   - Los IDs deben ser consistentes: el `category_id` en products debe coincidir con el `id` de la categoria correspondiente.
   - **UUID HEX-ONLY — ERROR 22P02:** PostgreSQL solo acepta digitos hexadecimales (0-9, a-f) en UUIDs. Prefijos como `img`, `var`, `coup`, `cat`, `sub`, `zone` son INVALIDOS y causan `ERROR: 22P02: invalid input syntax for type uuid`. Usar prefijos hex validos: `aa10`, `bb20`, `cc30`, etc. Correcto: `aa100001-0000-4000-8000-000000000001`. Incorrecto (nunca usar): `img00001-0000-0000-0000-000000000001`.

2. **Cantidades minimas:**
   - 3-5 categorias
   - 1-2 subcategorias por categoria
   - 8-12 productos
   - 1-2 productos `featured = true`
   - 2-3 variantes en al menos 3 productos
   - Si plan = Emprendimiento o Empresa con zonas: 3 zonas de envio
   - Si plan = Emprendimiento o Empresa: 2 cupones de prueba

3. **Imagenes de productos: OPCIONALES en el seed.** El helper `getProductImage()` genera placeholders automaticos. Solo incluir `product_images` si se tiene una URL de Unsplash verificada y relevante. De lo contrario, omitir — el sistema muestra placeholders automaticamente.

4. **Slugs en kebab-case ASCII** (sin tildes, sin n~): `cafe-americano`, `medialuna-de-manteca`.

5. **Precios verosimiles** segun el rubro (Argentina 2025-2026: valores en miles).

6. **Descripciones de productos:** 2-3 oraciones, vendedoras, sin cliches genericos.

---

## Plantilla por rubro

Los SQL de abajo son **ejemplos de referencia**. Al generar el seed para un proyecto real, **generar UUIDs frescos**. Los `11111111-...`, `22222222-...` son solo para ilustrar la estructura — NUNCA copiarlos.

### Cafe / Bar / Restaurante

```sql
-- CATEGORIAS
INSERT INTO public.categories (id, tenant_id, name, slug, position, active) VALUES
  ('11111111-1111-1111-1111-111111111101', 'TODO_TENANT_ID', 'Cafeteria', 'cafeteria', 0, true),
  ('11111111-1111-1111-1111-111111111102', 'TODO_TENANT_ID', 'Pasteleria', 'pasteleria', 1, true),
  ('11111111-1111-1111-1111-111111111103', 'TODO_TENANT_ID', 'Sandwicheria', 'sandwicheria', 2, true);

-- SUBCATEGORIAS
INSERT INTO public.subcategories (id, tenant_id, category_id, name, slug, position, active) VALUES
  ('22222222-2222-2222-2222-222222222201', 'TODO_TENANT_ID', '11111111-1111-1111-1111-111111111101', 'Cafe', 'cafe', 0, true),
  ('22222222-2222-2222-2222-222222222202', 'TODO_TENANT_ID', '11111111-1111-1111-1111-111111111101', 'Tes e infusiones', 'tes-infusiones', 1, true);

-- PRODUCTOS
INSERT INTO public.products (id, tenant_id, name, slug, description, price, compare_at_price, category_id, active, featured) VALUES
  ('33333333-3333-3333-3333-333333333301', 'TODO_TENANT_ID', 'Cafe americano', 'cafe-americano', 'Cafe de tueste medio, recien molido. Aroma intenso, cuerpo balanceado.', 1200, NULL, '11111111-1111-1111-1111-111111111101', true, true),
  ('33333333-3333-3333-3333-333333333302', 'TODO_TENANT_ID', 'Capuchino', 'capuchino', 'Espresso, leche vaporizada y un toque de cacao en polvo.', 1500, NULL, '11111111-1111-1111-1111-111111111101', true, true);

-- VARIANTES
INSERT INTO public.product_variants (id, tenant_id, product_id, name, price, stock) VALUES
  ('55555555-5555-5555-5555-555555555501', 'TODO_TENANT_ID', '33333333-3333-3333-3333-333333333301', 'Mediano', 1200, 50),
  ('55555555-5555-5555-5555-555555555502', 'TODO_TENANT_ID', '33333333-3333-3333-3333-333333333301', 'Doble', 1700, 50);
```

### Ropa / Indumentaria

Productos: `Remera basica`, `Camisa de lino`, `Buzo oversized`, `Pantalon cargo`, `Campera de jean`.
Precios: 25.000 - 65.000.
Categorias: `Mujer`, `Hombre`, `Unisex`, `Accesorios`.
Variantes: talles (`S`, `M`, `L`, `XL`).

### Gorras / Accesorios

Productos: `Snapback`, `Dad Hat`, `Fitted`, `Bucket`, `Trucker`.
Precios: 9.000 - 16.000.
Categorias: `Snapback`, `Dad Hat`, `Fitted`, `Bucket`, `Trucker`.
Variantes: talles (`Talle unico`, `S/M`, `L/XL`) con stock.

### Skincare / Cosmetica

Productos: `Serum`, `Crema hidratante`, `Aceite facial`, `Limpiador`, `Mascarilla`.
Precios: 9.500 - 18.000.
Categorias: `Limpieza`, `Hidratacion`, `Tratamiento`, `Proteccion Solar`.
Variantes: tamanos (`30ml`, `50ml`, `100ml`).

### Joyeria

Productos: `Anillo plata 925`, `Cadena minimal`, `Aros`, `Pulsera`, `Set anillo + cadena`.
Precios: 15.000 - 80.000.
Categorias: `Anillos`, `Aros`, `Cadenas`, `Pulseras`.
Variantes: tallas de anillo (`14`, `16`, `18`, `20`).

### Panaderia / Pasteleria

Productos: `Pan de masa madre`, `Baguette`, `Cheesecake`, `Brownie`, `Medialuna docena`.
Precios: 900 - 4.500.
Categorias: `Panaderia`, `Pasteleria`.

### Libreria

Productos: clasicos sin copyright (Garcia Marquez, Cortazar, Borges).
Precios: 8.000 - 25.000.
Categorias: `Ficcion`, `Ensayo`, `Poesia`, `Infantil`.

---

## Shipping zones (solo si plan usa shipping_zones)

```sql
INSERT INTO public.shipping_zones (id, tenant_id, name, description, price, position, active) VALUES
  ('66666666-6666-6666-6666-666666666601', 'TODO_TENANT_ID', 'CABA', 'Capital Federal', 1500, 0, true),
  ('66666666-6666-6666-6666-666666666602', 'TODO_TENANT_ID', 'GBA Norte', 'Vicente Lopez, San Isidro, Tigre', 2200, 1, true),
  ('66666666-6666-6666-6666-666666666603', 'TODO_TENANT_ID', 'GBA Sur y Oeste', 'Lomas, Quilmes, Moron', 2500, 2, true),
  ('66666666-6666-6666-6666-666666666604', 'TODO_TENANT_ID', 'Interior', 'Resto del pais', 4500, 3, true);
```

## Cupones (solo Emprendimiento y Empresa)

```sql
INSERT INTO public.coupons (id, tenant_id, code, type, value, min_amount, max_uses, uses_count, expires_at, starts_at, active) VALUES
  ('77777777-7777-7777-7777-777777777701', 'TODO_TENANT_ID', 'BIENVENIDA10', 'percent', 10, 5000, 100, 0, '2026-12-31T23:59:59Z', NOW(), true),
  ('77777777-7777-7777-7777-777777777702', 'TODO_TENANT_ID', 'PRIMERA5000', 'fixed', 5000, 25000, 50, 0, '2026-12-31T23:59:59Z', NOW(), true);
```

---

## Output del skill

El archivo `scripts/seed-data.sql` resultante debe:
- Tener el header con el `TODO_TENANT_ID` placeholder.
- Tener instruccion al usuario: "Hacer Ctrl+H y reemplazar `TODO_TENANT_ID` con el UUID que imprimio `setup-rls.sql`".
- Tener TODOS los INSERT ordenados (categorias -> subcategorias -> productos -> imagenes -> variantes -> shipping -> cupones).
- Usar `TODO_TENANT_ID` consistentemente en TODOS los INSERT.

## Validacion

- [ ] **IDs son UUIDs frescos** (NO `11111111-...`, etc. del template).
- [ ] **Todos los caracteres UUID son hexadecimales** (0-9, a-f) — SIN prefijos como `img`, `var`, `coup`.
- [ ] **Foreign keys consistentes**: cada `category_id` en products existe en categories.
- [ ] `TODO_TENANT_ID` en TODOS los INSERT.
- [ ] Header con instruccion de Ctrl+H.
- [ ] 3-5 categorias acordes al rubro.
- [ ] 8-12 productos con descripciones reales.
- [ ] 1-2 productos `featured = true`.
- [ ] 3-4 productos con variantes.
- [ ] Si Emprendimiento o Empresa con zonas: 3-4 shipping_zones.
- [ ] Si Emprendimiento o Empresa: 2 cupones.
- [ ] Slugs en kebab-case ASCII.
- [ ] Precios verosimiles.
- [ ] Orden de INSERT respeta foreign keys.
