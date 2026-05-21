-- =============================================
-- Seed Data — Lecrere (rubro: indumentaria)
-- Generado: 2026-05-09
--
-- INSTRUCCIONES:
--   1. Ejecutar setup-rls.sql primero (una sola vez)
--   2. Ejecutar ESTE archivo en el SQL Editor de Supabase
--
-- El tenant_id está fijo para que coincida con NEXT_PUBLIC_TENANT_ID del .env.local.
-- El script es idempotente: se puede ejecutar más de una vez sin errores.
-- =============================================

DO $$
DECLARE
  v_tenant_id uuid := '6430be4f-2bae-4b60-bb81-bcfa101335a9';
BEGIN

-- ---- TENANT ----
INSERT INTO public.tenants (id, name, slug, plan, status, max_products)
VALUES (v_tenant_id, 'Lecrere', 'lecrere', 'emprendimiento', 'active', 200)
ON CONFLICT (id) DO NOTHING;

-- ---- CATEGORIES ----
INSERT INTO public.categories (id, tenant_id, name, slug, position, active) VALUES
  ('11111111-1111-1111-1111-111111111101', v_tenant_id, 'Mujer',      'mujer',      0, true),
  ('11111111-1111-1111-1111-111111111102', v_tenant_id, 'Hombre',     'hombre',     1, true),
  ('11111111-1111-1111-1111-111111111103', v_tenant_id, 'Unisex',     'unisex',     2, true),
  ('11111111-1111-1111-1111-111111111104', v_tenant_id, 'Accesorios', 'accesorios', 3, true)
ON CONFLICT (id) DO NOTHING;

-- ---- SUBCATEGORIES ----
INSERT INTO public.subcategories (id, tenant_id, category_id, name, slug, position, active) VALUES
  ('22222222-2222-2222-2222-222222222201', v_tenant_id, '11111111-1111-1111-1111-111111111101', 'Remeras',  'remeras',  0, true),
  ('22222222-2222-2222-2222-222222222202', v_tenant_id, '11111111-1111-1111-1111-111111111101', 'Vestidos', 'vestidos', 1, true),
  ('22222222-2222-2222-2222-222222222203', v_tenant_id, '11111111-1111-1111-1111-111111111102', 'Camisas',  'camisas',  0, true),
  ('22222222-2222-2222-2222-222222222204', v_tenant_id, '11111111-1111-1111-1111-111111111102', 'Pantalones','pantalones',1, true)
ON CONFLICT (id) DO NOTHING;

-- ---- PRODUCTS ----
INSERT INTO public.products (id, tenant_id, name, slug, description, price, compare_at_price, category_id, active, featured) VALUES
  ('33333333-3333-3333-3333-333333333301', v_tenant_id,
    'Remera básica premium', 'remera-basica-premium',
    '100% algodón peinado 180g. Tela que no encoge, no se pica y mantiene la forma después de cada lavado. Corte regular, hombro recto, largo estándar.',
    29900, NULL, '11111111-1111-1111-1111-111111111101', true, true),

  ('33333333-3333-3333-3333-333333333302', v_tenant_id,
    'Camisa de lino', 'camisa-de-lino',
    'Lino 100% de primera calidad. Fresca, liviana y con la caída perfecta para el verano. Cierre por botones nácar, bolsillo al pecho.',
    52000, 64000, '11111111-1111-1111-1111-111111111102', true, true),

  ('33333333-3333-3333-3333-333333333303', v_tenant_id,
    'Buzo oversized', 'buzo-oversized',
    'French terry premium 320g. Interior suave, exterior cepillado. Elásticos en puños y bajo. Fit holgado pensado para layering.',
    58000, NULL, '11111111-1111-1111-1111-111111111103', true, true),

  ('33333333-3333-3333-3333-333333333304', v_tenant_id,
    'Jean recto', 'jean-recto',
    'Denim 12oz. Corte recto clásico, tiro medio, largo estándar. Stonewash suave para ese color que mejora con el uso.',
    49000, NULL, '11111111-1111-1111-1111-111111111102', true, false),

  ('33333333-3333-3333-3333-333333333305', v_tenant_id,
    'Vestido midi', 'vestido-midi',
    'Crepe de poliéster premium. Cae sin marcar, se arruga apenas y luce igual al mediodía que a la noche. Largo midi, manga corta.',
    72000, NULL, '11111111-1111-1111-1111-111111111101', true, true),

  ('33333333-3333-3333-3333-333333333306', v_tenant_id,
    'Saco oversized', 'saco-oversized',
    'Mezcla de lana y poliéster. Tejido estructurado que no pierde la forma. Corte recto con hombros marcados. Cierre por botón.',
    89000, 105000, '11111111-1111-1111-1111-111111111103', true, false),

  ('33333333-3333-3333-3333-333333333307', v_tenant_id,
    'Pantalón cargo', 'pantalon-cargo',
    'Gabardina de algodón 240g. Bolsillos funcionales sin volumen excesivo. Elástico en la cintura, cordón decorativo.',
    55000, NULL, '11111111-1111-1111-1111-111111111102', true, false),

  ('33333333-3333-3333-3333-333333333308', v_tenant_id,
    'Campera de jean', 'campera-de-jean',
    'Denim 10oz clásico. Corte regular, botones metálicos, cierre con broche en cuello. El básico que no pasa de moda.',
    79000, NULL, '11111111-1111-1111-1111-111111111103', true, false),

  ('33333333-3333-3333-3333-333333333309', v_tenant_id,
    'Falda midi lino', 'falda-midi-lino',
    'Lino natural sin mezclas. Elástico en cintura, caída amplia tipo A. Largo midi que queda bien en cualquier talle.',
    43000, NULL, '11111111-1111-1111-1111-111111111101', true, false),

  ('33333333-3333-3333-3333-333333333310', v_tenant_id,
    'Bolso tote canvas', 'bolso-tote-canvas',
    'Canvas 400g. Asas de cuero vegano cosidas con doble puntada. Interior con bolsillo con cierre. Fondo reforzado.',
    35000, NULL, '11111111-1111-1111-1111-111111111104', true, false),

  ('33333333-3333-3333-3333-333333333311', v_tenant_id,
    'Cinturón de cuero', 'cinturon-de-cuero',
    'Cuero vacuno plena flor. Hebilla metálica satinada. Ancho 3cm, disponible en negro y cuero natural.',
    22000, NULL, '11111111-1111-1111-1111-111111111104', true, false),

  ('33333333-3333-3333-3333-333333333312', v_tenant_id,
    'Remera manga larga', 'remera-manga-larga',
    '100% algodón jersey suave 160g. Cuello redondo clásico. Ideal como base o capas. Disponible en tonos neutros.',
    34000, NULL, '11111111-1111-1111-1111-111111111101', true, false)
ON CONFLICT (id) DO NOTHING;

-- ---- PRODUCT IMAGES ----
INSERT INTO public.product_images (id, tenant_id, product_id, url, alt, position) VALUES
  ('44444444-4444-4444-4444-444444444401', v_tenant_id, '33333333-3333-3333-3333-333333333301',
    'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=800&q=80&auto=format&fit=crop', 'Remera básica premium', 0),
  ('44444444-4444-4444-4444-444444444402', v_tenant_id, '33333333-3333-3333-3333-333333333302',
    'https://images.unsplash.com/photo-1558769132-cb1aea153895?w=800&q=80&auto=format&fit=crop', 'Camisa de lino', 0),
  ('44444444-4444-4444-4444-444444444403', v_tenant_id, '33333333-3333-3333-3333-333333333303',
    'https://picsum.photos/seed/buzo-lecrere/800/1000', 'Buzo oversized', 0),
  ('44444444-4444-4444-4444-444444444404', v_tenant_id, '33333333-3333-3333-3333-333333333304',
    'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80&auto=format&fit=crop', 'Jean recto', 0),
  ('44444444-4444-4444-4444-444444444405', v_tenant_id, '33333333-3333-3333-3333-333333333305',
    'https://picsum.photos/seed/vestido-midi-lecrere/800/1000', 'Vestido midi', 0),
  ('44444444-4444-4444-4444-444444444406', v_tenant_id, '33333333-3333-3333-3333-333333333306',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop', 'Saco oversized', 0),
  ('44444444-4444-4444-4444-444444444407', v_tenant_id, '33333333-3333-3333-3333-333333333307',
    'https://picsum.photos/seed/pantalon-cargo-lecrere/800/1000', 'Pantalón cargo', 0),
  ('44444444-4444-4444-4444-444444444408', v_tenant_id, '33333333-3333-3333-3333-333333333308',
    'https://picsum.photos/seed/campera-jean-lecrere/800/1000', 'Campera de jean', 0),
  ('44444444-4444-4444-4444-444444444409', v_tenant_id, '33333333-3333-3333-3333-333333333309',
    'https://picsum.photos/seed/falda-lino-lecrere/800/1000', 'Falda midi lino', 0),
  ('44444444-4444-4444-4444-444444444410', v_tenant_id, '33333333-3333-3333-3333-333333333310',
    'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&q=80&auto=format&fit=crop', 'Bolso tote canvas', 0),
  ('44444444-4444-4444-4444-444444444411', v_tenant_id, '33333333-3333-3333-3333-333333333311',
    'https://picsum.photos/seed/cinturon-cuero-lecrere/800/800', 'Cinturón de cuero', 0),
  ('44444444-4444-4444-4444-444444444412', v_tenant_id, '33333333-3333-3333-3333-333333333312',
    'https://picsum.photos/seed/remera-larga-lecrere/800/1000', 'Remera manga larga', 0)
ON CONFLICT (id) DO NOTHING;

-- ---- VARIANTS (talles) ----
-- Remera básica premium
INSERT INTO public.product_variants (id, tenant_id, product_id, name, sku, price, price_modifier, stock) VALUES
  ('55555555-5555-5555-5555-555555555501', v_tenant_id, '33333333-3333-3333-3333-333333333301', 'XS', 'RBP-XS', NULL, 0, 8),
  ('55555555-5555-5555-5555-555555555502', v_tenant_id, '33333333-3333-3333-3333-333333333301', 'S',  'RBP-S',  NULL, 0, 15),
  ('55555555-5555-5555-5555-555555555503', v_tenant_id, '33333333-3333-3333-3333-333333333301', 'M',  'RBP-M',  NULL, 0, 20),
  ('55555555-5555-5555-5555-555555555504', v_tenant_id, '33333333-3333-3333-3333-333333333301', 'L',  'RBP-L',  NULL, 0, 3),
  ('55555555-5555-5555-5555-555555555505', v_tenant_id, '33333333-3333-3333-3333-333333333301', 'XL', 'RBP-XL', NULL, 0, 0)
ON CONFLICT (id) DO NOTHING;

-- Camisa de lino
INSERT INTO public.product_variants (id, tenant_id, product_id, name, sku, price, price_modifier, stock) VALUES
  ('55555555-5555-5555-5555-555555555506', v_tenant_id, '33333333-3333-3333-3333-333333333302', 'S',  'CL-S',  NULL, 0, 10),
  ('55555555-5555-5555-5555-555555555507', v_tenant_id, '33333333-3333-3333-3333-333333333302', 'M',  'CL-M',  NULL, 0, 12),
  ('55555555-5555-5555-5555-555555555508', v_tenant_id, '33333333-3333-3333-3333-333333333302', 'L',  'CL-L',  NULL, 0, 8),
  ('55555555-5555-5555-5555-555555555509', v_tenant_id, '33333333-3333-3333-3333-333333333302', 'XL', 'CL-XL', NULL, 0, 5)
ON CONFLICT (id) DO NOTHING;

-- Buzo oversized
INSERT INTO public.product_variants (id, tenant_id, product_id, name, sku, price, price_modifier, stock) VALUES
  ('55555555-5555-5555-5555-555555555510', v_tenant_id, '33333333-3333-3333-3333-333333333303', 'S',  'BO-S',  NULL, 0, 12),
  ('55555555-5555-5555-5555-555555555511', v_tenant_id, '33333333-3333-3333-3333-333333333303', 'M',  'BO-M',  NULL, 0, 15),
  ('55555555-5555-5555-5555-555555555512', v_tenant_id, '33333333-3333-3333-3333-333333333303', 'L',  'BO-L',  NULL, 0, 10),
  ('55555555-5555-5555-5555-555555555513', v_tenant_id, '33333333-3333-3333-3333-333333333303', 'XL', 'BO-XL', NULL, 0, 2)
ON CONFLICT (id) DO NOTHING;

-- Vestido midi
INSERT INTO public.product_variants (id, tenant_id, product_id, name, sku, price, price_modifier, stock) VALUES
  ('55555555-5555-5555-5555-555555555514', v_tenant_id, '33333333-3333-3333-3333-333333333305', 'XS', 'VM-XS', NULL, 0, 5),
  ('55555555-5555-5555-5555-555555555515', v_tenant_id, '33333333-3333-3333-3333-333333333305', 'S',  'VM-S',  NULL, 0, 8),
  ('55555555-5555-5555-5555-555555555516', v_tenant_id, '33333333-3333-3333-3333-333333333305', 'M',  'VM-M',  NULL, 0, 6),
  ('55555555-5555-5555-5555-555555555517', v_tenant_id, '33333333-3333-3333-3333-333333333305', 'L',  'VM-L',  NULL, 0, 1)
ON CONFLICT (id) DO NOTHING;

-- ---- SHIPPING ZONES ----
INSERT INTO public.shipping_zones (id, tenant_id, name, description, price, position, active) VALUES
  ('66666666-6666-6666-6666-666666666601', v_tenant_id, 'CABA',          'Capital Federal',                        1500, 0, true),
  ('66666666-6666-6666-6666-666666666602', v_tenant_id, 'GBA Norte',     'Vicente López, San Isidro, Tigre',       2200, 1, true),
  ('66666666-6666-6666-6666-666666666603', v_tenant_id, 'GBA Sur/Oeste', 'Lomas, Quilmes, Morón, La Matanza',      2500, 2, true),
  ('66666666-6666-6666-6666-666666666604', v_tenant_id, 'Interior',      'Resto del país (Correo Argentino)',       4500, 3, true)
ON CONFLICT (id) DO NOTHING;

-- ---- COUPONS ----
INSERT INTO public.coupons (id, tenant_id, code, type, value, min_amount, max_uses, uses_count, expires_at, starts_at, active) VALUES
  ('77777777-7777-7777-7777-777777777701', v_tenant_id,
    'BIENVENIDA10', 'percent', 10, 40000, 100, 0, '2026-12-31T23:59:59Z', NOW(), true),
  ('77777777-7777-7777-7777-777777777702', v_tenant_id,
    'PRIMERA5000', 'fixed', 5000, 60000, 50, 0, '2026-12-31T23:59:59Z', NOW(), true)
ON CONFLICT (id) DO NOTHING;

RAISE NOTICE '========================================';
RAISE NOTICE 'Seed OK — Lecrere (indumentaria)';
RAISE NOTICE 'Copiá esto en .env.local:';
RAISE NOTICE 'NEXT_PUBLIC_TENANT_ID=%', v_tenant_id;
RAISE NOTICE '========================================';

END $$;
