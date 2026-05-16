-- =============================================
-- Seed Data — Vectroom (rubro: tienda de ropa)
-- Generado: 2026-05-13
-- Ejecutar UNA SOLA VEZ después de setup-rls.sql
-- =============================================
--
-- setup-rls.sql ya creó el tenant. Copiar el UUID que imprimió
-- y reemplazar ef3c24b0-922d-4c92-8c61-06c4302c90a5 en este archivo con Ctrl+H.
--
-- Orden de ejecución:
--   1) setup-rls.sql (crea tenant + RLS)
--   2) seed-data.sql (este archivo)
--
-- ⚠️ Rama A (Envia.com): este seed NO incluye shipping_zones
--    — los envíos son en tiempo real via Envia.com.
--
-- Si querés borrar todo este seed:
--   DELETE FROM public.product_variants WHERE tenant_id = 'ef3c24b0-922d-4c92-8c61-06c4302c90a5';
--   DELETE FROM public.product_images WHERE tenant_id = 'ef3c24b0-922d-4c92-8c61-06c4302c90a5';
--   DELETE FROM public.products WHERE tenant_id = 'ef3c24b0-922d-4c92-8c61-06c4302c90a5';
--   DELETE FROM public.subcategories WHERE tenant_id = 'ef3c24b0-922d-4c92-8c61-06c4302c90a5';
--   DELETE FROM public.categories WHERE tenant_id = 'ef3c24b0-922d-4c92-8c61-06c4302c90a5';
--   DELETE FROM public.coupons WHERE tenant_id = 'ef3c24b0-922d-4c92-8c61-06c4302c90a5';
-- =============================================

-- CATEGORÍAS (5 categorías de indumentaria)
INSERT INTO public.categories (id, tenant_id, name, slug, position, active) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567001', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'Mujer', 'mujer', 0, true),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567002', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'Hombre', 'hombre', 1, true),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567003', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'Unisex', 'unisex', 2, true),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567004', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'Accesorios', 'accesorios', 3, true),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567005', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'Colección Nueva', 'coleccion-nueva', 4, true);

-- SUBCATEGORÍAS
INSERT INTO public.subcategories (id, tenant_id, category_id, name, slug, position, active) VALUES
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'a1b2c3d4-e5f6-7890-abcd-ef1234567001', 'Remeras', 'remeras-mujer', 0, true),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678902', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'a1b2c3d4-e5f6-7890-abcd-ef1234567001', 'Vestidos', 'vestidos', 1, true),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678903', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'a1b2c3d4-e5f6-7890-abcd-ef1234567002', 'Remeras', 'remeras-hombre', 0, true),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678904', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'a1b2c3d4-e5f6-7890-abcd-ef1234567002', 'Pantalones', 'pantalones-hombre', 1, true),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678905', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'a1b2c3d4-e5f6-7890-abcd-ef1234567003', 'Buzos', 'buzos', 0, true),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678906', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'a1b2c3d4-e5f6-7890-abcd-ef1234567003', 'Camperas', 'camperas', 1, true);

-- PRODUCTOS (12 prendas con descripciones vendedoras)
INSERT INTO public.products (id, tenant_id, name, slug, description, price, compare_at_price, category_id, active, featured) VALUES
  -- MUJER
  ('c3d4e5f6-a7b8-9012-cdef-123456789001', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'Vestido midi minimal', 'vestido-midi-minimal',
    'Corte limpio, caída perfecta. Tela de viscosa liviana con elasticidad natural. Un vestido que se adapta al cuerpo sin esfuerzo.',
    65000, 78000, 'a1b2c3d4-e5f6-7890-abcd-ef1234567001', true, true),
  ('c3d4e5f6-a7b8-9012-cdef-123456789002', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'Remera básica mujer', 'remera-basica-mujer',
    'El básico que estabas buscando. Tela de algodón peinado 180g, con un toque de elastano para mejor caída.',
    28000, NULL, 'a1b2c3d4-e5f6-7890-abcd-ef1234567001', true, false),
  ('c3d4e5f6-a7b8-9012-cdef-123456789003', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'Buzo oversized mujer', 'buzo-oversized-mujer',
    'French terry pesado, fit holgado sin perder estructura. Un clásico rethought. Lavado enzimático para suavidad instantánea.',
    55000, NULL, 'a1b2c3d4-e5f6-7890-abcd-ef1234567001', true, true),
  ('c3d4e5f6-a7b8-9012-cdef-123456789004', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'Pantalón cargo mujer', 'pantalon-cargo-mujer',
    'Silueta relajada con bolsillos laterales funcionales. Cintura elástica con cordón. Gabardina de algodón resistente.',
    58000, NULL, 'a1b2c3d4-e5f6-7890-abcd-ef1234567001', true, false),

  -- HOMBRE
  ('c3d4e5f6-a7b8-9012-cdef-123456789005', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'Remera básica hombre', 'remera-basica-hombre',
    'Cuello redondo, manga corta, algodón 100%. La remera que querés tener en todos los colores.',
    28000, NULL, 'a1b2c3d4-e5f6-7890-abcd-ef1234567002', true, false),
  ('c3d4e5f6-a7b8-9012-cdef-123456789006', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'Jean recto hombre', 'jean-recto-hombre',
    'Corte recto clásico actualizado. Denim 12oz stonewashed de origen nacional. Cinco bolsillos, cintura natural.',
    72000, 85000, 'a1b2c3d4-e5f6-7890-abcd-ef1234567002', true, false),
  ('c3d4e5f6-a7b8-9012-cdef-123456789007', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'Camisa de lino hombre', 'camisa-lino-hombre',
    'Lino 100% nacional, corte regular. Costura visible en color contrastante. Para el verano o para el trabajo — depende de vos.',
    68000, NULL, 'a1b2c3d4-e5f6-7890-abcd-ef1234567002', true, true),

  -- UNISEX
  ('c3d4e5f6-a7b8-9012-cdef-123456789008', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'Buzo unisex negro', 'buzo-unisex-negro',
    'El clásico de los clásicos en versión definitiva. French terry pesado, fit holgado. Negro que no se destiñe.',
    55000, NULL, 'a1b2c3d4-e5f6-7890-abcd-ef1234567003', true, true),
  ('c3d4e5f6-a7b8-9012-cdef-123456789009', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'Campera de jean unisex', 'campera-jean-unisex',
    'Denim 12oz rigid. Corte recto con hombros bien definidos. La campera que acompaña cualquier outfit.',
    95000, NULL, 'a1b2c3d4-e5f6-7890-abcd-ef1234567003', true, true),

  -- ACCESORIOS
  ('c3d4e5f6-a7b8-9012-cdef-123456789010', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'Gorro lana oversize', 'gorro-lana-oversize',
    'Punto grueso, caída deliberadamente relajada. Mezcla de lana y acrílico para resistencia al lavado.',
    18000, NULL, 'a1b2c3d4-e5f6-7890-abcd-ef1234567004', true, false),
  ('c3d4e5f6-a7b8-9012-cdef-123456789011', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'Bolso tote canvas', 'bolso-tote-canvas',
    'Canvas 100% algodón, costuras dobles, asa corta + asa larga. Impreso con el logo Vectroom.',
    22000, NULL, 'a1b2c3d4-e5f6-7890-abcd-ef1234567004', true, false),

  -- COLECCIÓN NUEVA
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'Saco oversized colección', 'saco-oversized-coleccion',
    'Nuestro saco estrella de la nueva colección. Paño de lana 70%, corte masculino relajado para cualquier género. Forro interior satinado.',
    115000, NULL, 'a1b2c3d4-e5f6-7890-abcd-ef1234567005', true, true);

-- IMÁGENES (Unsplash — ropa / indumentaria)
-- Usando images.unsplash.com/photo-{id} — NUNCA source.unsplash.com
INSERT INTO public.product_images (id, tenant_id, product_id, url, alt, position) VALUES
  -- Vestido midi
  ('d4e5f6a7-b8c9-0123-defa-234567890001', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'c3d4e5f6-a7b8-9012-cdef-123456789001',
    'https://images.unsplash.com/photo-1558769132-cb1aea153895?w=800&q=80&auto=format&fit=crop', 'Vestido midi minimal', 0),
  ('d4e5f6a7-b8c9-0123-defa-234567890002', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'c3d4e5f6-a7b8-9012-cdef-123456789001',
    'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&q=80&auto=format&fit=crop', 'Detalle tela vestido', 1),

  -- Remera básica mujer
  ('d4e5f6a7-b8c9-0123-defa-234567890003', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'c3d4e5f6-a7b8-9012-cdef-123456789002',
    'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=800&q=80&auto=format&fit=crop', 'Remera básica mujer', 0),

  -- Buzo oversized mujer
  ('d4e5f6a7-b8c9-0123-defa-234567890004', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'c3d4e5f6-a7b8-9012-cdef-123456789003',
    'https://picsum.photos/seed/buzo-oversized-mujer/800/1000', 'Buzo oversized mujer', 0),

  -- Pantalón cargo mujer
  ('d4e5f6a7-b8c9-0123-defa-234567890005', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'c3d4e5f6-a7b8-9012-cdef-123456789004',
    'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80&auto=format&fit=crop', 'Pantalón cargo mujer', 0),

  -- Remera básica hombre
  ('d4e5f6a7-b8c9-0123-defa-234567890006', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'c3d4e5f6-a7b8-9012-cdef-123456789005',
    'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=800&q=80&auto=format&fit=crop', 'Remera básica hombre', 0),

  -- Jean recto hombre
  ('d4e5f6a7-b8c9-0123-defa-234567890007', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'c3d4e5f6-a7b8-9012-cdef-123456789006',
    'https://picsum.photos/seed/jean-recto-hombre/800/1000', 'Jean recto hombre', 0),

  -- Camisa de lino
  ('d4e5f6a7-b8c9-0123-defa-234567890008', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'c3d4e5f6-a7b8-9012-cdef-123456789007',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop', 'Camisa de lino hombre', 0),
  ('d4e5f6a7-b8c9-0123-defa-234567890009', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'c3d4e5f6-a7b8-9012-cdef-123456789007',
    'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&q=80&auto=format&fit=crop', 'Detalle lino', 1),

  -- Buzo unisex negro
  ('d4e5f6a7-b8c9-0123-defa-234567890010', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'c3d4e5f6-a7b8-9012-cdef-123456789008',
    'https://picsum.photos/seed/buzo-unisex-negro/800/1000', 'Buzo unisex negro', 0),

  -- Campera de jean
  ('d4e5f6a7-b8c9-0123-defa-234567890011', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'c3d4e5f6-a7b8-9012-cdef-123456789009',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop', 'Campera de jean', 0),
  ('d4e5f6a7-b8c9-0123-defa-234567890012', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'c3d4e5f6-a7b8-9012-cdef-123456789009',
    'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80&auto=format&fit=crop', 'Campera detalle bolsillos', 1),

  -- Gorro lana
  ('d4e5f6a7-b8c9-0123-defa-234567890013', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'c3d4e5f6-a7b8-9012-cdef-123456789010',
    'https://picsum.photos/seed/gorro-lana-oversize/600/600', 'Gorro lana oversize', 0),

  -- Bolso tote
  ('d4e5f6a7-b8c9-0123-defa-234567890014', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'c3d4e5f6-a7b8-9012-cdef-123456789011',
    'https://picsum.photos/seed/bolso-tote-canvas/600/600', 'Bolso tote canvas', 0),

  -- Saco oversized
  ('d4e5f6a7-b8c9-0123-defa-234567890015', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'c3d4e5f6-a7b8-9012-cdef-123456789012',
    'https://images.unsplash.com/photo-1558769132-cb1aea153895?w=800&q=80&auto=format&fit=crop', 'Saco oversized colección', 0),
  ('d4e5f6a7-b8c9-0123-defa-234567890016', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'c3d4e5f6-a7b8-9012-cdef-123456789012',
    'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&q=80&auto=format&fit=crop', 'Saco detalle paño', 1);

-- VARIANTES (talles en los productos clave)
INSERT INTO public.product_variants (id, tenant_id, product_id, name, sku, price, price_modifier, stock) VALUES
  -- Vestido midi (talles S-M-L-XL)
  ('e5f6a7b8-c9d0-1234-efab-345678901001', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'c3d4e5f6-a7b8-9012-cdef-123456789001', 'S', NULL, NULL, 0, 8),
  ('e5f6a7b8-c9d0-1234-efab-345678901002', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'c3d4e5f6-a7b8-9012-cdef-123456789001', 'M', NULL, NULL, 0, 12),
  ('e5f6a7b8-c9d0-1234-efab-345678901003', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'c3d4e5f6-a7b8-9012-cdef-123456789001', 'L', NULL, NULL, 0, 10),
  ('e5f6a7b8-c9d0-1234-efab-345678901004', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'c3d4e5f6-a7b8-9012-cdef-123456789001', 'XL', NULL, NULL, 0, 6),

  -- Remera básica mujer (S-M-L-XL)
  ('e5f6a7b8-c9d0-1234-efab-345678901005', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'c3d4e5f6-a7b8-9012-cdef-123456789002', 'S', NULL, NULL, 0, 20),
  ('e5f6a7b8-c9d0-1234-efab-345678901006', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'c3d4e5f6-a7b8-9012-cdef-123456789002', 'M', NULL, NULL, 0, 25),
  ('e5f6a7b8-c9d0-1234-efab-345678901007', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'c3d4e5f6-a7b8-9012-cdef-123456789002', 'L', NULL, NULL, 0, 18),
  ('e5f6a7b8-c9d0-1234-efab-345678901008', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'c3d4e5f6-a7b8-9012-cdef-123456789002', 'XL', NULL, NULL, 0, 15),

  -- Buzo unisex negro (XS-S-M-L-XL)
  ('e5f6a7b8-c9d0-1234-efab-345678901009', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'c3d4e5f6-a7b8-9012-cdef-123456789008', 'XS', NULL, NULL, 0, 5),
  ('e5f6a7b8-c9d0-1234-efab-345678901010', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'c3d4e5f6-a7b8-9012-cdef-123456789008', 'S', NULL, NULL, 0, 12),
  ('e5f6a7b8-c9d0-1234-efab-345678901011', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'c3d4e5f6-a7b8-9012-cdef-123456789008', 'M', NULL, NULL, 0, 18),
  ('e5f6a7b8-c9d0-1234-efab-345678901012', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'c3d4e5f6-a7b8-9012-cdef-123456789008', 'L', NULL, NULL, 0, 15),
  ('e5f6a7b8-c9d0-1234-efab-345678901013', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'c3d4e5f6-a7b8-9012-cdef-123456789008', 'XL', NULL, NULL, 0, 2),

  -- Camisa lino hombre (S-M-L-XL)
  ('e5f6a7b8-c9d0-1234-efab-345678901014', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'c3d4e5f6-a7b8-9012-cdef-123456789007', 'S', NULL, NULL, 0, 8),
  ('e5f6a7b8-c9d0-1234-efab-345678901015', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'c3d4e5f6-a7b8-9012-cdef-123456789007', 'M', NULL, NULL, 0, 14),
  ('e5f6a7b8-c9d0-1234-efab-345678901016', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'c3d4e5f6-a7b8-9012-cdef-123456789007', 'L', NULL, NULL, 0, 10),
  ('e5f6a7b8-c9d0-1234-efab-345678901017', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'c3d4e5f6-a7b8-9012-cdef-123456789007', 'XL', NULL, NULL, 0, 5),

  -- Saco oversized (XS-S-M-L-XL — es colección nueva, stock limitado)
  ('e5f6a7b8-c9d0-1234-efab-345678901018', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'c3d4e5f6-a7b8-9012-cdef-123456789012', 'XS/S', NULL, NULL, 0, 4),
  ('e5f6a7b8-c9d0-1234-efab-345678901019', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'c3d4e5f6-a7b8-9012-cdef-123456789012', 'M/L', NULL, NULL, 0, 6),
  ('e5f6a7b8-c9d0-1234-efab-345678901020', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'c3d4e5f6-a7b8-9012-cdef-123456789012', 'XL/XXL', NULL, NULL, 0, 3);

-- CUPONES DE PRUEBA
INSERT INTO public.coupons (id, tenant_id, code, type, value, min_amount, max_uses, uses_count, expires_at, starts_at, active) VALUES
  ('f6a7b8c9-d0e1-2345-fabc-456789012001', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'BIENVENIDA10', 'percent', 10, 30000, 200, 0, '2027-12-31T23:59:59Z', NOW(), true),
  ('f6a7b8c9-d0e1-2345-fabc-456789012002', 'ef3c24b0-922d-4c92-8c61-06c4302c90a5', 'VECTROOM15K', 'fixed', 15000, 80000, 50, 0, '2027-12-31T23:59:59Z', NOW(), true);
