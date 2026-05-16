-- =============================================
-- Seed Data — Play Music (rubro: tienda de instrumentos)
-- Generado: 2026-05-13
-- Ejecutar UNA SOLA VEZ después de setup-rls.sql
-- Plan: Empresa con Envia.com (sin shipping_zones)
-- =============================================
--
-- setup-rls.sql ya creó el tenant. Copiar el UUID que imprimió
-- y reemplazar acfba4ce-babb-4698-8e7d-61af67c3f86f con ese UUID (Ctrl+H en el editor).
--
-- Orden de ejecución: categorías → subcategorías → productos → variantes → cupones
-- (sin product_images — getProductImage() genera placeholders automáticos)
--
-- Para borrar todo este seed:
--   DELETE FROM public.product_variants WHERE tenant_id = 'EL-UUID';
--   DELETE FROM public.product_images WHERE tenant_id = 'EL-UUID';
--   DELETE FROM public.products WHERE tenant_id = 'EL-UUID';
--   DELETE FROM public.subcategories WHERE tenant_id = 'EL-UUID';
--   DELETE FROM public.categories WHERE tenant_id = 'EL-UUID';
--   DELETE FROM public.coupons WHERE tenant_id = 'EL-UUID';
-- =============================================

-- =============================================
-- CATEGORÍAS (6 familias de instrumentos)
-- =============================================
INSERT INTO public.categories (id, tenant_id, name, slug, position, active) VALUES
  ('a1b2c3d4-e5f6-4789-abcd-000000000001', 'acfba4ce-babb-4698-8e7d-61af67c3f86f', 'Guitarras', 'guitarras', 0, true),
  ('a1b2c3d4-e5f6-4789-abcd-000000000002', 'acfba4ce-babb-4698-8e7d-61af67c3f86f', 'Teclados y Pianos', 'teclados-y-pianos', 1, true),
  ('a1b2c3d4-e5f6-4789-abcd-000000000003', 'acfba4ce-babb-4698-8e7d-61af67c3f86f', 'Bajos', 'bajos', 2, true),
  ('a1b2c3d4-e5f6-4789-abcd-000000000004', 'acfba4ce-babb-4698-8e7d-61af67c3f86f', 'Baterías', 'baterias', 3, true),
  ('a1b2c3d4-e5f6-4789-abcd-000000000005', 'acfba4ce-babb-4698-8e7d-61af67c3f86f', 'Cuerdas y Vientos', 'cuerdas-y-vientos', 4, true),
  ('a1b2c3d4-e5f6-4789-abcd-000000000006', 'acfba4ce-babb-4698-8e7d-61af67c3f86f', 'Accesorios', 'accesorios', 5, true);

-- =============================================
-- SUBCATEGORÍAS
-- =============================================
INSERT INTO public.subcategories (id, tenant_id, category_id, name, slug, position, active) VALUES
  ('b1b2c3d4-e5f6-4789-abcd-000000000011', 'acfba4ce-babb-4698-8e7d-61af67c3f86f', 'a1b2c3d4-e5f6-4789-abcd-000000000001', 'Guitarras eléctricas', 'guitarras-electricas', 0, true),
  ('b1b2c3d4-e5f6-4789-abcd-000000000012', 'acfba4ce-babb-4698-8e7d-61af67c3f86f', 'a1b2c3d4-e5f6-4789-abcd-000000000001', 'Guitarras acústicas y criollas', 'guitarras-acusticas-criollas', 1, true),
  ('b1b2c3d4-e5f6-4789-abcd-000000000013', 'acfba4ce-babb-4698-8e7d-61af67c3f86f', 'a1b2c3d4-e5f6-4789-abcd-000000000002', 'Pianos digitales', 'pianos-digitales', 0, true),
  ('b1b2c3d4-e5f6-4789-abcd-000000000014', 'acfba4ce-babb-4698-8e7d-61af67c3f86f', 'a1b2c3d4-e5f6-4789-abcd-000000000002', 'Sintetizadores y workstations', 'sintetizadores-workstations', 1, true),
  ('b1b2c3d4-e5f6-4789-abcd-000000000015', 'acfba4ce-babb-4698-8e7d-61af67c3f86f', 'a1b2c3d4-e5f6-4789-abcd-000000000004', 'Baterías acústicas', 'baterias-acusticas', 0, true),
  ('b1b2c3d4-e5f6-4789-abcd-000000000016', 'acfba4ce-babb-4698-8e7d-61af67c3f86f', 'a1b2c3d4-e5f6-4789-abcd-000000000004', 'Baterías electrónicas', 'baterias-electronicas', 1, true);

-- =============================================
-- PRODUCTOS (12 instrumentos)
-- =============================================
INSERT INTO public.products (id, tenant_id, name, slug, description, price, compare_at_price, category_id, active, featured) VALUES

  -- GUITARRAS
  ('c1b2c3d4-e5f6-4789-abcd-000000000001', 'acfba4ce-babb-4698-8e7d-61af67c3f86f',
   'Guitarra Criolla Clásica',
   'guitarra-criolla-clasica',
   'Tapa de pino sólido, aros y fondo de caoba laminada. Cejuela de hueso, clavijero de 3 en línea. Sonido cálido con proyección equilibrada. Incluye funda acolchada.',
   185000, NULL,
   'a1b2c3d4-e5f6-4789-abcd-000000000001', true, true),

  ('c1b2c3d4-e5f6-4789-abcd-000000000002', 'acfba4ce-babb-4698-8e7d-61af67c3f86f',
   'Guitarra Eléctrica Stratocaster SSS',
   'guitarra-electrica-stratocaster-sss',
   'Cuerpo de aliso, mástil de arce en perfil C, diapasón de palo de rosa con 21 trastes. Pastillas SSS alnico 5. El instrumento más versátil del catálogo.',
   540000, 620000,
   'a1b2c3d4-e5f6-4789-abcd-000000000001', true, true),

  ('c1b2c3d4-e5f6-4789-abcd-000000000003', 'acfba4ce-babb-4698-8e7d-61af67c3f86f',
   'Guitarra Acústica Dreadnought',
   'guitarra-acustica-dreadnought',
   'Tapa de abeto Sitka con refuerzos scalloped. Aros y fondo de caoba. Mástil adjustable con truss rod. Proyección potente para canciones, folklore y sesiones acústicas.',
   295000, NULL,
   'a1b2c3d4-e5f6-4789-abcd-000000000001', true, false),

  -- TECLADOS
  ('c1b2c3d4-e5f6-4789-abcd-000000000004', 'acfba4ce-babb-4698-8e7d-61af67c3f86f',
   'Piano Digital Stage 88 teclas',
   'piano-digital-stage-88',
   '88 teclas contrapesadas con peso graduado (más pesado en el registro grave, más liviano en el agudo). Muestra de gran piano capturada en Steinway D. 3 pedales incluidos.',
   890000, 950000,
   'a1b2c3d4-e5f6-4789-abcd-000000000002', true, true),

  ('c1b2c3d4-e5f6-4789-abcd-000000000005', 'acfba4ce-babb-4698-8e7d-61af67c3f86f',
   'Teclado Workstation 61 teclas',
   'teclado-workstation-61',
   '61 teclas semipesadas, más de 500 sonidos internos, secuenciador de 16 pistas, arpeggiator programable y conectividad MIDI/USB. Todo lo que necesitás para componer y grabar.',
   650000, NULL,
   'a1b2c3d4-e5f6-4789-abcd-000000000002', true, false),

  -- BAJOS
  ('c1b2c3d4-e5f6-4789-abcd-000000000006', 'acfba4ce-babb-4698-8e7d-61af67c3f86f',
   'Bajo Eléctrico Jazz Bass 4 cuerdas',
   'bajo-electrico-jazz-bass',
   'Cuerpo de aliso, mástil de arce con diapasón de palo de rosa. Dos pastillas de bobina simple para sonido redondo y ataque definido. Ideal para jazz, funk y rock.',
   420000, NULL,
   'a1b2c3d4-e5f6-4789-abcd-000000000003', true, true),

  ('c1b2c3d4-e5f6-4789-abcd-000000000007', 'acfba4ce-babb-4698-8e7d-61af67c3f86f',
   'Bajo Precision Bass 4 cuerdas',
   'bajo-precision-bass',
   'El bajo por excelencia. Cuerpo de aliso, pastilla split de bobina. Sonido gordo, fundamental y poderoso que sostiene cualquier mezcla.',
   395000, NULL,
   'a1b2c3d4-e5f6-4789-abcd-000000000003', true, false),

  -- BATERÍAS
  ('c1b2c3d4-e5f6-4789-abcd-000000000008', 'acfba4ce-babb-4698-8e7d-61af67c3f86f',
   'Batería Acústica 5 Piezas',
   'bateria-acustica-5-piezas',
   'Kit completo con bombo 22", tarola 14", toms 10" y 12", floor tom 14" y herraje cromado completo (2 porta-toms, 2 platilleros, soporte de tarola y pedal de bombo).',
   680000, NULL,
   'a1b2c3d4-e5f6-4789-abcd-000000000004', true, false),

  ('c1b2c3d4-e5f6-4789-abcd-000000000009', 'acfba4ce-babb-4698-8e7d-61af67c3f86f',
   'Batería Electrónica E-Kit Mesh',
   'bateria-electronica-ekit-mesh',
   'Módulo con 50 kits y 720 sonidos. Pads de caucho mesh silenciosos. Pedal de bombo con pad. Conexión USB para grabación en DAW. Tocar a cualquier hora sin molestar.',
   780000, 850000,
   'a1b2c3d4-e5f6-4789-abcd-000000000004', true, true),

  -- CUERDAS Y VIENTOS
  ('c1b2c3d4-e5f6-4789-abcd-000000000010', 'acfba4ce-babb-4698-8e7d-61af67c3f86f',
   'Violín 4/4 Profesional',
   'violin-44-profesional',
   'Cuerpo de abeto sólido, barniz de nitrocelulosa en 15 capas, arco de cerda natural blanqueada y varilla de carbono. Incluye estuche rígido y resina. Afinación estable.',
   310000, NULL,
   'a1b2c3d4-e5f6-4789-abcd-000000000005', true, true),

  ('c1b2c3d4-e5f6-4789-abcd-000000000011', 'acfba4ce-babb-4698-8e7d-61af67c3f86f',
   'Trompeta Laqueada en Sib',
   'trompeta-laqueada-sib',
   'Cuerpo de latón laqueado dorado, 3 pistones nivelados, campana de 123mm. Sonido brillante y proyectado. Viene con boquilla Bach 7C y estuche semiduro.',
   245000, NULL,
   'a1b2c3d4-e5f6-4789-abcd-000000000005', true, false),

  -- ACCESORIOS
  ('c1b2c3d4-e5f6-4789-abcd-000000000012', 'acfba4ce-babb-4698-8e7d-61af67c3f86f',
   'Afinador Cromático Clip',
   'afinador-cromatico-clip',
   'Afinador de clip con pantalla LCD a color, rotación 360° y ajuste de transpose. Compatible con guitarras, bajos, violines, ukuleles y cualquier instrumento de cuerda.',
   9500, NULL,
   'a1b2c3d4-e5f6-4789-abcd-000000000006', true, false);

-- =============================================
-- VARIANTES (en 4 productos)
-- =============================================
INSERT INTO public.product_variants (id, tenant_id, product_id, name, sku, price, price_modifier, stock) VALUES

  -- Stratocaster — colores
  ('d1b2c3d4-e5f6-4789-abcd-000000000101', 'acfba4ce-babb-4698-8e7d-61af67c3f86f', 'c1b2c3d4-e5f6-4789-abcd-000000000002',
   'Sunburst', 'STRAT-SB', NULL, 0, 5),
  ('d1b2c3d4-e5f6-4789-abcd-000000000102', 'acfba4ce-babb-4698-8e7d-61af67c3f86f', 'c1b2c3d4-e5f6-4789-abcd-000000000002',
   'Olympic White', 'STRAT-OW', NULL, 15000, 3),
  ('d1b2c3d4-e5f6-4789-abcd-000000000103', 'acfba4ce-babb-4698-8e7d-61af67c3f86f', 'c1b2c3d4-e5f6-4789-abcd-000000000002',
   'Black', 'STRAT-BK', NULL, 0, 0),

  -- Jazz Bass — colores
  ('d1b2c3d4-e5f6-4789-abcd-000000000104', 'acfba4ce-babb-4698-8e7d-61af67c3f86f', 'c1b2c3d4-e5f6-4789-abcd-000000000006',
   'Sunburst', 'JBASS-SB', NULL, 0, 4),
  ('d1b2c3d4-e5f6-4789-abcd-000000000105', 'acfba4ce-babb-4698-8e7d-61af67c3f86f', 'c1b2c3d4-e5f6-4789-abcd-000000000006',
   'Natural', 'JBASS-NT', NULL, 20000, 2),

  -- Violín — tamaños
  ('d1b2c3d4-e5f6-4789-abcd-000000000106', 'acfba4ce-babb-4698-8e7d-61af67c3f86f', 'c1b2c3d4-e5f6-4789-abcd-000000000010',
   '4/4 (adulto)', 'VLN-44', NULL, 0, 3),
  ('d1b2c3d4-e5f6-4789-abcd-000000000107', 'acfba4ce-babb-4698-8e7d-61af67c3f86f', 'c1b2c3d4-e5f6-4789-abcd-000000000010',
   '3/4 (juvenil)', 'VLN-34', NULL, -30000, 2),
  ('d1b2c3d4-e5f6-4789-abcd-000000000108', 'acfba4ce-babb-4698-8e7d-61af67c3f86f', 'c1b2c3d4-e5f6-4789-abcd-000000000010',
   '1/2 (niño/a)', 'VLN-12', NULL, -55000, 1),

  -- Piano Digital — colores
  ('d1b2c3d4-e5f6-4789-abcd-000000000109', 'acfba4ce-babb-4698-8e7d-61af67c3f86f', 'c1b2c3d4-e5f6-4789-abcd-000000000004',
   'Negro', 'PIANO-BK', NULL, 0, 2),
  ('d1b2c3d4-e5f6-4789-abcd-000000000110', 'acfba4ce-babb-4698-8e7d-61af67c3f86f', 'c1b2c3d4-e5f6-4789-abcd-000000000004',
   'Blanco', 'PIANO-WH', NULL, 30000, 1);

-- =============================================
-- CUPONES DE PRUEBA (2 cupones)
-- Plan Empresa — no hay shipping_zones en Rama A (Envia.com)
-- =============================================
INSERT INTO public.coupons (id, tenant_id, code, type, value, min_amount, max_uses, uses_count, expires_at, starts_at, active) VALUES
  ('e1b2c3d4-e5f6-4789-abcd-000000000001', 'acfba4ce-babb-4698-8e7d-61af67c3f86f',
   'MUSICAOK10', 'percent', 10,
   100000, 100, 0,
   '2026-12-31T23:59:59Z', NOW(), true),

  ('e1b2c3d4-e5f6-4789-abcd-000000000002', 'acfba4ce-babb-4698-8e7d-61af67c3f86f',
   'PRIMERACOMPRA', 'fixed', 50000,
   200000, 50, 0,
   '2026-12-31T23:59:59Z', NOW(), true);
