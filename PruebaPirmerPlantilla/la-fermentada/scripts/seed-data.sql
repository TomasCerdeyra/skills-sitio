-- =============================================
-- Seed Data — La Fermentada (rubro: panadería artesanal masa madre)
-- Generado: 2026-05-12
-- Ejecutar UNA SOLA VEZ después de setup-rls.sql
-- =============================================
--
-- setup-rls.sql ya creó el tenant. Copiar el UUID que imprimió
-- y hacer Ctrl+H → buscar 4b12a260-ff3f-4cbb-bf21-926d35801355 → reemplazar con el UUID real.
--
-- Para borrar este seed:
--   DELETE FROM public.product_variants WHERE tenant_id = 'el-uuid';
--   DELETE FROM public.product_images WHERE tenant_id = 'el-uuid';
--   DELETE FROM public.products WHERE tenant_id = 'el-uuid';
--   DELETE FROM public.subcategories WHERE tenant_id = 'el-uuid';
--   DELETE FROM public.categories WHERE tenant_id = 'el-uuid';
--   DELETE FROM public.shipping_zones WHERE tenant_id = 'el-uuid';
--   DELETE FROM public.coupons WHERE tenant_id = 'el-uuid';
-- =============================================

-- ⚠️ REEMPLAZAR 4b12a260-ff3f-4cbb-bf21-926d35801355 con el UUID que imprimió setup-rls.sql
-- Hacer Ctrl+H → buscar: 4b12a260-ff3f-4cbb-bf21-926d35801355 → reemplazar con el UUID real

-- =============================================
-- CATEGORÍAS
-- =============================================
INSERT INTO public.categories (id, tenant_id, name, slug, position, active) VALUES
  ('f3a1b2c4-1001-4001-8001-100000000001', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'Panes', 'panes', 0, true),
  ('f3a1b2c4-1001-4001-8001-100000000002', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'Facturas y Viennoiserie', 'facturas-viennoiserie', 1, true),
  ('f3a1b2c4-1001-4001-8001-100000000003', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'Tortas y Pasteles', 'tortas-pasteles', 2, true),
  ('f3a1b2c4-1001-4001-8001-100000000004', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'Extras', 'extras', 3, true);

-- =============================================
-- SUBCATEGORÍAS
-- =============================================
INSERT INTO public.subcategories (id, tenant_id, category_id, name, slug, position, active) VALUES
  ('e2b3c4d5-2001-4001-8001-200000000001', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'f3a1b2c4-1001-4001-8001-100000000001', 'Masa madre', 'masa-madre', 0, true),
  ('e2b3c4d5-2001-4001-8001-200000000002', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'f3a1b2c4-1001-4001-8001-100000000001', 'Integrales y especiales', 'integrales-especiales', 1, true),
  ('e2b3c4d5-2001-4001-8001-200000000003', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'f3a1b2c4-1001-4001-8001-100000000002', 'Medialunas', 'medialunas', 0, true),
  ('e2b3c4d5-2001-4001-8001-200000000004', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'f3a1b2c4-1001-4001-8001-100000000002', 'Croissants y folados', 'croissants-folados', 1, true),
  ('e2b3c4d5-2001-4001-8001-200000000005', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'f3a1b2c4-1001-4001-8001-100000000003', 'Tortas enteras', 'tortas-enteras', 0, true),
  ('e2b3c4d5-2001-4001-8001-200000000006', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'f3a1b2c4-1001-4001-8001-100000000003', 'Porciones', 'porciones', 1, true);

-- =============================================
-- PRODUCTOS
-- =============================================
INSERT INTO public.products (id, tenant_id, name, slug, description, price, compare_at_price, category_id, active, featured) VALUES
  -- Panes
  ('d1c2b3a4-3001-4001-8001-300000000001', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'Pan de masa madre campesino', 'pan-masa-madre-campesino',
    'Miga abierta, corteza crujiente. Fermentación de 18 horas con levadura salvaje propia. El pan que más orgullosos nos tiene.',
    2800, NULL, 'f3a1b2c4-1001-4001-8001-100000000001', true, true),

  ('d1c2b3a4-3001-4001-8001-300000000002', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'Baguette de campo', 'baguette-de-campo',
    'Harina 000, prefermento poolish y cochura directa en horno a leña. Crocante afuera, sedosa adentro.',
    1400, NULL, 'f3a1b2c4-1001-4001-8001-100000000001', true, false),

  ('d1c2b3a4-3001-4001-8001-300000000003', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'Pan integral con semillas', 'pan-integral-semillas',
    'Harina integral de molienda local, semillas de lino, girasol y zapallo. Nutritivo y con personalidad.',
    2400, NULL, 'f3a1b2c4-1001-4001-8001-100000000001', true, false),

  ('d1c2b3a4-3001-4001-8001-300000000004', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'Pan de centeno oscuro', 'pan-centeno-oscuro',
    'Masa madre de centeno, cocción lenta. Denso y aromático, ideal para untarle queso crema o mermelada de campo.',
    2600, NULL, 'f3a1b2c4-1001-4001-8001-100000000001', true, false),

  ('d1c2b3a4-3001-4001-8001-300000000005', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'Focaccia de romero y sal gruesa', 'focaccia-romero-sal',
    'Masa madre hidratada, aceite de oliva generoso, romero fresco y sal patagónica en escamas. Para comer ahí nomás.',
    1800, NULL, 'f3a1b2c4-1001-4001-8001-100000000001', true, true),

  -- Facturas y viennoiserie
  ('d1c2b3a4-3001-4001-8001-300000000006', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'Medialunas de manteca docena', 'medialunas-manteca-docena',
    'Hechas con manteca de primera, masa briochada y toque de miel. Se hornean dos veces al día. Hay que encargarlas.',
    4800, NULL, 'f3a1b2c4-1001-4001-8001-100000000002', true, true),

  ('d1c2b3a4-3001-4001-8001-300000000007', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'Croissant de manteca', 'croissant-manteca',
    '27 capas de hojaldre con manteca francesa. Proceso de dos días. Dorado y con aroma que te avisa que está listo desde la calle.',
    1200, NULL, 'f3a1b2c4-1001-4001-8001-100000000002', true, false),

  ('d1c2b3a4-3001-4001-8001-300000000008', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'Pain au chocolat', 'pain-au-chocolat',
    'La misma masa del croissant envuelve dos barras de chocolate 72% cacao. Para los que no pueden elegir.',
    1400, NULL, 'f3a1b2c4-1001-4001-8001-100000000002', true, false),

  -- Tortas y pasteles
  ('d1c2b3a4-3001-4001-8001-300000000009', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'Tarta de limón y merengue', 'tarta-limon-merengue',
    'Masa sablé casera, crema de limón de Corrientes y merengue italiano flameado. Porciones o torta entera para encargar.',
    3200, NULL, 'f3a1b2c4-1001-4001-8001-100000000003', true, false),

  ('d1c2b3a4-3001-4001-8001-300000000010', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'Carrot cake con frosting de queso', 'carrot-cake-frosting-queso',
    'Zanahoria, nueces, canela y jengibre. Frosting de queso crema con ralladura de limón. Húmeda y potente.',
    2900, 3400, 'f3a1b2c4-1001-4001-8001-100000000003', true, false),

  -- Extras
  ('d1c2b3a4-3001-4001-8001-300000000011', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'Mermelada artesanal 300g', 'mermelada-artesanal',
    'Elaborada en el local con fruta de estación. Poca azúcar, mucha fruta. Sabores que cambian según la época del año.',
    2200, NULL, 'f3a1b2c4-1001-4001-8001-100000000004', true, false),

  ('d1c2b3a4-3001-4001-8001-300000000012', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'Levadura madre seca 50g', 'levadura-madre-seca',
    'Nuestra levadura salvaje deshidratada para que puedas hacer pan en casa. Con instrucciones de reactivación incluidas.',
    1500, NULL, 'f3a1b2c4-1001-4001-8001-100000000004', true, false);

-- =============================================
-- IMÁGENES
-- Usar SIEMPRE images.unsplash.com/photo-{id} — source.unsplash.com está deprecado
-- =============================================
INSERT INTO public.product_images (id, tenant_id, product_id, url, alt, position) VALUES
  -- Pan de masa madre campesino
  ('c4d5e6f7-4001-4001-8001-400000000001', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'd1c2b3a4-3001-4001-8001-300000000001',
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80&auto=format&fit=crop',
    'Pan de masa madre campesino', 0),

  -- Baguette de campo
  ('c4d5e6f7-4001-4001-8001-400000000002', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'd1c2b3a4-3001-4001-8001-300000000002',
    'https://images.unsplash.com/photo-1558303729-b51f9cf25d12?w=800&q=80&auto=format&fit=crop',
    'Baguette de campo recién horneada', 0),

  -- Pan integral con semillas
  ('c4d5e6f7-4001-4001-8001-400000000003', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'd1c2b3a4-3001-4001-8001-300000000003',
    'https://picsum.photos/seed/pan-integral-semillas-fermentada/800/600',
    'Pan integral con semillas', 0),

  -- Pan de centeno
  ('c4d5e6f7-4001-4001-8001-400000000004', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'd1c2b3a4-3001-4001-8001-300000000004',
    'https://picsum.photos/seed/pan-centeno-fermentada/800/600',
    'Pan de centeno oscuro', 0),

  -- Focaccia
  ('c4d5e6f7-4001-4001-8001-400000000005', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'd1c2b3a4-3001-4001-8001-300000000005',
    'https://picsum.photos/seed/focaccia-romero-fermentada/800/600',
    'Focaccia de romero y sal gruesa', 0),

  -- Medialunas
  ('c4d5e6f7-4001-4001-8001-400000000006', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'd1c2b3a4-3001-4001-8001-300000000006',
    'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80&auto=format&fit=crop',
    'Medialunas de manteca artesanales', 0),

  -- Croissant
  ('c4d5e6f7-4001-4001-8001-400000000007', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'd1c2b3a4-3001-4001-8001-300000000007',
    'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80&auto=format&fit=crop',
    'Croissant de manteca', 0),

  -- Pain au chocolat
  ('c4d5e6f7-4001-4001-8001-400000000008', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'd1c2b3a4-3001-4001-8001-300000000008',
    'https://picsum.photos/seed/pain-chocolat-fermentada/800/600',
    'Pain au chocolat artesanal', 0),

  -- Tarta limón merengue
  ('c4d5e6f7-4001-4001-8001-400000000009', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'd1c2b3a4-3001-4001-8001-300000000009',
    'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80&auto=format&fit=crop',
    'Tarta de limón con merengue', 0),

  -- Carrot cake
  ('c4d5e6f7-4001-4001-8001-400000000010', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'd1c2b3a4-3001-4001-8001-300000000010',
    'https://picsum.photos/seed/carrot-cake-fermentada/800/600',
    'Carrot cake con frosting de queso', 0),

  -- Mermelada artesanal
  ('c4d5e6f7-4001-4001-8001-400000000011', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'd1c2b3a4-3001-4001-8001-300000000011',
    'https://picsum.photos/seed/mermelada-artesanal-fermentada/800/600',
    'Mermelada artesanal de estación', 0),

  -- Levadura madre
  ('c4d5e6f7-4001-4001-8001-400000000012', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'd1c2b3a4-3001-4001-8001-300000000012',
    'https://picsum.photos/seed/levadura-madre-fermentada/800/600',
    'Levadura madre seca', 0);

-- =============================================
-- VARIANTES (tamaños en panes principales)
-- =============================================
INSERT INTO public.product_variants (id, tenant_id, product_id, name, price, price_modifier, stock) VALUES
  -- Pan de masa madre: tamaños
  ('b5c6d7e8-5001-4001-8001-500000000001', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'd1c2b3a4-3001-4001-8001-300000000001', 'Chico (400g)', 2800, 0, 20),
  ('b5c6d7e8-5001-4001-8001-500000000002', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'd1c2b3a4-3001-4001-8001-300000000001', 'Grande (800g)', 4800, 2000, 12),

  -- Pan integral: tamaños
  ('b5c6d7e8-5001-4001-8001-500000000003', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'd1c2b3a4-3001-4001-8001-300000000003', 'Chico (400g)', 2400, 0, 15),
  ('b5c6d7e8-5001-4001-8001-500000000004', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'd1c2b3a4-3001-4001-8001-300000000003', 'Grande (700g)', 3800, 1400, 10),

  -- Medialunas: cantidad
  ('b5c6d7e8-5001-4001-8001-500000000005', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'd1c2b3a4-3001-4001-8001-300000000006', 'Media docena (6 u.)', 2600, -2200, 30),
  ('b5c6d7e8-5001-4001-8001-500000000006', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'd1c2b3a4-3001-4001-8001-300000000006', 'Docena (12 u.)', 4800, 0, 20),

  -- Mermelada: sabores
  ('b5c6d7e8-5001-4001-8001-500000000007', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'd1c2b3a4-3001-4001-8001-300000000011', 'Damasco', 2200, 0, 25),
  ('b5c6d7e8-5001-4001-8001-500000000008', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'd1c2b3a4-3001-4001-8001-300000000011', 'Ciruela negra', 2200, 0, 20),
  ('b5c6d7e8-5001-4001-8001-500000000009', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'd1c2b3a4-3001-4001-8001-300000000011', 'Membrillo con jengibre', 2400, 200, 15);

-- =============================================
-- ZONAS DE ENVÍO
-- =============================================
INSERT INTO public.shipping_zones (id, tenant_id, name, description, price, position, active) VALUES
  ('a6b7c8d9-6001-4001-8001-600000000001', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'Retiro en local', 'Honduras 4567, Palermo — Lunes a sábados 9 a 13 hs', 0, 0, true),
  ('a6b7c8d9-6001-4001-8001-600000000002', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'CABA', 'Capital Federal — enviamos con cadete propio los miércoles y sábados', 1200, 1, true),
  ('a6b7c8d9-6001-4001-8001-600000000003', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'GBA Norte', 'Vicente López, San Isidro, Tigre y alrededores', 2000, 2, true),
  ('a6b7c8d9-6001-4001-8001-600000000004', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'GBA Sur y Oeste', 'Lomas de Zamora, Quilmes, Morón, La Matanza y zona', 2500, 3, true);

-- =============================================
-- CUPONES DE PRUEBA
-- =============================================
INSERT INTO public.coupons (id, tenant_id, code, type, value, min_amount, max_uses, uses_count, expires_at, starts_at, active) VALUES
  ('97a8b9c0-7001-4001-8001-700000000001', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'PRIMERPAN', 'percent', 10, 3000, 100, 0, '2026-12-31T23:59:59Z', NOW(), true),
  ('97a8b9c0-7001-4001-8001-700000000002', '4b12a260-ff3f-4cbb-bf21-926d35801355', 'SABADO2000', 'fixed', 2000, 8000, 50, 0, '2026-12-31T23:59:59Z', NOW(), true);
