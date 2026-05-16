-- =============================================
-- Seed Data — Café del Norte (rubro: Cafetería de especialidad)
-- Generado: 2026-05-12
-- Ejecutar UNA SOLA VEZ después de setup-rls.sql
-- =============================================
--
-- Tenant ID: 64a1df5e-4b1c-487c-b4ff-5dba32dd8605
--
-- Orden de borrado si necesitás reiniciar el seed:
--   DELETE FROM public.product_variants WHERE tenant_id = '64a1df5e-4b1c-487c-b4ff-5dba32dd8605';
--   DELETE FROM public.product_images WHERE tenant_id = '64a1df5e-4b1c-487c-b4ff-5dba32dd8605';
--   DELETE FROM public.products WHERE tenant_id = '64a1df5e-4b1c-487c-b4ff-5dba32dd8605';
--   DELETE FROM public.subcategories WHERE tenant_id = '64a1df5e-4b1c-487c-b4ff-5dba32dd8605';
--   DELETE FROM public.categories WHERE tenant_id = '64a1df5e-4b1c-487c-b4ff-5dba32dd8605';
--   DELETE FROM public.shipping_zones WHERE tenant_id = '64a1df5e-4b1c-487c-b4ff-5dba32dd8605';
--   DELETE FROM public.coupons WHERE tenant_id = '64a1df5e-4b1c-487c-b4ff-5dba32dd8605';
-- =============================================

-- CATEGORÍAS
INSERT INTO public.categories (id, tenant_id, name, slug, position, active) VALUES
  ('c1a2b3d4-e5f6-4a01-b001-aabbccdd0001', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'Cafetería', 'cafeteria', 0, true),
  ('c1a2b3d4-e5f6-4a01-b001-aabbccdd0002', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'Pastelería', 'pasteleria', 1, true),
  ('c1a2b3d4-e5f6-4a01-b001-aabbccdd0003', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'Sandwichería', 'sandwicheria', 2, true),
  ('c1a2b3d4-e5f6-4a01-b001-aabbccdd0004', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'Vinos y Cervezas', 'vinos-y-cervezas', 3, true);

-- SUBCATEGORÍAS
INSERT INTO public.subcategories (id, tenant_id, category_id, name, slug, position, active) VALUES
  ('d2b3c4e5-f6a7-4b02-b002-aabbccdd0001', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'c1a2b3d4-e5f6-4a01-b001-aabbccdd0001', 'Café', 'cafe', 0, true),
  ('d2b3c4e5-f6a7-4b02-b002-aabbccdd0002', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'c1a2b3d4-e5f6-4a01-b001-aabbccdd0001', 'Tés e infusiones', 'tes-infusiones', 1, true),
  ('d2b3c4e5-f6a7-4b02-b002-aabbccdd0003', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'c1a2b3d4-e5f6-4a01-b001-aabbccdd0002', 'Medialunas y facturas', 'medialunas-facturas', 0, true),
  ('d2b3c4e5-f6a7-4b02-b002-aabbccdd0004', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'c1a2b3d4-e5f6-4a01-b001-aabbccdd0002', 'Tortas y postres', 'tortas-postres', 1, true);

-- PRODUCTOS
INSERT INTO public.products (id, tenant_id, name, slug, description, price, compare_at_price, category_id, active, featured) VALUES
  ('e3c4d5f6-a7b8-4c03-b003-aabbccdd0001', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'Café americano', 'cafe-americano',
    'Café de tueste medio, recién molido, servido en taza grande. Aroma intenso, cuerpo balanceado y final largo.',
    1200, NULL, 'c1a2b3d4-e5f6-4a01-b001-aabbccdd0001', true, true),
  ('e3c4d5f6-a7b8-4c03-b003-aabbccdd0002', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'Cortado', 'cortado',
    'Espresso doble cortado con leche caliente vaporizada. La medida perfecta entre café y leche.',
    1300, NULL, 'c1a2b3d4-e5f6-4a01-b001-aabbccdd0001', true, false),
  ('e3c4d5f6-a7b8-4c03-b003-aabbccdd0003', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'Capuchino', 'capuchino',
    'Espresso, leche vaporizada y un toque de cacao en polvo. Cremoso, suave y reconfortante.',
    1500, NULL, 'c1a2b3d4-e5f6-4a01-b001-aabbccdd0001', true, true),
  ('e3c4d5f6-a7b8-4c03-b003-aabbccdd0004', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'Cold Brew', 'cold-brew',
    'Café infusionado en frío durante 18 horas. Concentrado, suave y refrescante. Con hielo o sin él.',
    1800, NULL, 'c1a2b3d4-e5f6-4a01-b001-aabbccdd0001', true, true),
  ('e3c4d5f6-a7b8-4c03-b003-aabbccdd0005', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'Medialuna de manteca', 'medialuna-de-manteca',
    'Hechas cada mañana con manteca, harina seleccionada y fermentación lenta. Doraditas, crujientes y perfectas.',
    900, NULL, 'c1a2b3d4-e5f6-4a01-b001-aabbccdd0002', true, false),
  ('e3c4d5f6-a7b8-4c03-b003-aabbccdd0006', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'Tostado de jamón y queso', 'tostado-jamon-queso',
    'Pan de campo con jamón cocido natural y queso por tabla. Servido caliente. El clásico de las mañanas.',
    3200, NULL, 'c1a2b3d4-e5f6-4a01-b001-aabbccdd0003', true, false),
  ('e3c4d5f6-a7b8-4c03-b003-aabbccdd0007', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'Cheesecake de frutos rojos', 'cheesecake-frutos-rojos',
    'Base de galletas, queso crema batido y salsa de frutos rojos casera. Una porción generosa para el momento.',
    2400, 2900, 'c1a2b3d4-e5f6-4a01-b001-aabbccdd0002', true, true),
  ('e3c4d5f6-a7b8-4c03-b003-aabbccdd0008', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'Brownie con helado', 'brownie-con-helado',
    'Brownie casero tibio con bocha de helado de crema americana. Para compartir o no, sin culpa.',
    2600, NULL, 'c1a2b3d4-e5f6-4a01-b001-aabbccdd0002', true, false),
  ('e3c4d5f6-a7b8-4c03-b003-aabbccdd0009', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'Sandwich de miga triple', 'sandwich-miga-triple',
    'Tres pisos de pan de miga sin corteza, con jamón, queso y tomate. Ideal para acompañar el café de las 11.',
    2800, NULL, 'c1a2b3d4-e5f6-4a01-b001-aabbccdd0003', true, false),
  ('e3c4d5f6-a7b8-4c03-b003-aabbccdd0010', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'Cerveza artesanal IPA', 'cerveza-artesanal-ipa',
    'IPA local, lúpulo cítrico y amargor balanceado. Botella 500ml. Para las tardes que se alargan.',
    2200, NULL, 'c1a2b3d4-e5f6-4a01-b001-aabbccdd0004', true, false),
  ('e3c4d5f6-a7b8-4c03-b003-aabbccdd0011', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'Copa de vino malbec', 'copa-vino-malbec',
    'Selección de bodegas mendocinas. Servido en copa, ideal para acompañar una tarde con buena charla.',
    2800, NULL, 'c1a2b3d4-e5f6-4a01-b001-aabbccdd0004', true, false),
  ('e3c4d5f6-a7b8-4c03-b003-aabbccdd0012', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'Latte de vainilla', 'latte-vainilla',
    'Espresso doble con leche vaporizada y almíbar de vainilla artesanal. Dulce, cremoso y cálido.',
    1600, NULL, 'c1a2b3d4-e5f6-4a01-b001-aabbccdd0001', true, false);

-- IMÁGENES (Unsplash — IDs curados por rubro)
INSERT INTO public.product_images (id, tenant_id, product_id, url, alt, position) VALUES
  ('f4d5e6a7-b8c9-4d04-b004-aabbccdd0001', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'e3c4d5f6-a7b8-4c03-b003-aabbccdd0001', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80&auto=format&fit=crop', 'Café americano en taza grande', 0),
  ('f4d5e6a7-b8c9-4d04-b004-aabbccdd0002', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'e3c4d5f6-a7b8-4c03-b003-aabbccdd0002', 'https://images.unsplash.com/photo-1485808191679-5f86510bd9d4?w=800&q=80&auto=format&fit=crop', 'Cortado en vaso pequeño', 0),
  ('f4d5e6a7-b8c9-4d04-b004-aabbccdd0003', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'e3c4d5f6-a7b8-4c03-b003-aabbccdd0003', 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&q=80&auto=format&fit=crop', 'Capuchino con foam art', 0),
  ('f4d5e6a7-b8c9-4d04-b004-aabbccdd0004', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'e3c4d5f6-a7b8-4c03-b003-aabbccdd0004', 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80&auto=format&fit=crop', 'Cold brew con hielo', 0),
  ('f4d5e6a7-b8c9-4d04-b004-aabbccdd0005', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'e3c4d5f6-a7b8-4c03-b003-aabbccdd0005', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80&auto=format&fit=crop', 'Medialunas recién horneadas', 0),
  ('f4d5e6a7-b8c9-4d04-b004-aabbccdd0006', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'e3c4d5f6-a7b8-4c03-b003-aabbccdd0006', 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=800&q=80&auto=format&fit=crop', 'Tostado de jamón y queso', 0),
  ('f4d5e6a7-b8c9-4d04-b004-aabbccdd0007', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'e3c4d5f6-a7b8-4c03-b003-aabbccdd0007', 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80&auto=format&fit=crop', 'Cheesecake de frutos rojos', 0),
  ('f4d5e6a7-b8c9-4d04-b004-aabbccdd0008', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'e3c4d5f6-a7b8-4c03-b003-aabbccdd0008', 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80&auto=format&fit=crop', 'Brownie con helado', 0),
  ('f4d5e6a7-b8c9-4d04-b004-aabbccdd0009', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'e3c4d5f6-a7b8-4c03-b003-aabbccdd0009', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80&auto=format&fit=crop', 'Sandwich de miga triple', 0),
  ('f4d5e6a7-b8c9-4d04-b004-aabbccdd0010', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'e3c4d5f6-a7b8-4c03-b003-aabbccdd0010', 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=800&q=80&auto=format&fit=crop', 'Cerveza artesanal IPA', 0),
  ('f4d5e6a7-b8c9-4d04-b004-aabbccdd0011', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'e3c4d5f6-a7b8-4c03-b003-aabbccdd0011', 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80&auto=format&fit=crop', 'Copa de vino malbec', 0),
  ('f4d5e6a7-b8c9-4d04-b004-aabbccdd0012', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'e3c4d5f6-a7b8-4c03-b003-aabbccdd0012', 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80&auto=format&fit=crop', 'Latte de vainilla', 0);

-- VARIANTES (café americano: mediano/doble; capuchino: chico/grande; cold brew: simple/con leche)
INSERT INTO public.product_variants (id, tenant_id, product_id, name, price, price_modifier, stock) VALUES
  ('a5e6f7b8-c9d0-4e05-b005-aabbccdd0001', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'e3c4d5f6-a7b8-4c03-b003-aabbccdd0001', 'Mediano', 1200, 0, 99),
  ('a5e6f7b8-c9d0-4e05-b005-aabbccdd0002', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'e3c4d5f6-a7b8-4c03-b003-aabbccdd0001', 'Doble', 1700, 500, 99),
  ('a5e6f7b8-c9d0-4e05-b005-aabbccdd0003', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'e3c4d5f6-a7b8-4c03-b003-aabbccdd0003', 'Chico', 1300, 0, 99),
  ('a5e6f7b8-c9d0-4e05-b005-aabbccdd0004', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'e3c4d5f6-a7b8-4c03-b003-aabbccdd0003', 'Grande', 1700, 400, 99),
  ('a5e6f7b8-c9d0-4e05-b005-aabbccdd0005', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'e3c4d5f6-a7b8-4c03-b003-aabbccdd0004', 'Solo', 1800, 0, 99),
  ('a5e6f7b8-c9d0-4e05-b005-aabbccdd0006', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'e3c4d5f6-a7b8-4c03-b003-aabbccdd0004', 'Con leche', 2100, 300, 99);

-- ZONAS DE ENVÍO
INSERT INTO public.shipping_zones (id, tenant_id, name, description, price, position, active) VALUES
  ('b6f7a8c9-d0e1-4f06-b006-aabbccdd0001', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'CABA', 'Capital Federal', 1500, 0, true),
  ('b6f7a8c9-d0e1-4f06-b006-aabbccdd0002', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'GBA Norte', 'Vicente López, San Isidro, Tigre y zona', 2200, 1, true),
  ('b6f7a8c9-d0e1-4f06-b006-aabbccdd0003', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'GBA Sur y Oeste', 'Lomas, Quilmes, Morón, La Matanza', 2500, 2, true),
  ('b6f7a8c9-d0e1-4f06-b006-aabbccdd0004', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'Interior', 'Resto del país (vía correo)', 4500, 3, true);

-- CUPONES DE PRUEBA
INSERT INTO public.coupons (id, tenant_id, code, type, value, min_amount, max_uses, uses_count, expires_at, starts_at, active) VALUES
  ('c7a8b9d0-e1f2-4a07-b007-aabbccdd0001', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'BIENVENIDA10', 'percent', 10, 5000, 100, 0, '2027-12-31T23:59:59Z', NOW(), true),
  ('c7a8b9d0-e1f2-4a07-b007-aabbccdd0002', '64a1df5e-4b1c-487c-b4ff-5dba32dd8605', 'PRIMERA5000', 'fixed', 5000, 25000, 50, 0, '2027-12-31T23:59:59Z', NOW(), true);
