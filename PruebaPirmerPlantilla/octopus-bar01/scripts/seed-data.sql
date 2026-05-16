-- =============================================
-- Seed Data — Bar Octopus (rubro: bar hamburguesería)
-- Generado: 2026-05-12
-- Ejecutar UNA SOLA VEZ después de setup-rls.sql
-- =============================================
--
-- setup-rls.sql ya creó el tenant. Copiar el UUID que imprimió
-- y hacer Ctrl+H → buscar c6ac2d94-60de-4d4b-94c1-d731936d3f17 → reemplazar con el UUID real.
--
-- Para borrar este seed:
--   DELETE FROM public.product_variants WHERE tenant_id = 'el-uuid';
--   DELETE FROM public.product_images WHERE tenant_id = 'el-uuid';
--   DELETE FROM public.products WHERE tenant_id = 'el-uuid';
--   DELETE FROM public.subcategories WHERE tenant_id = 'el-uuid';
--   DELETE FROM public.categories WHERE tenant_id = 'el-uuid';
-- =============================================

-- ⚠️ REEMPLAZAR c6ac2d94-60de-4d4b-94c1-d731936d3f17 con el UUID que imprimió setup-rls.sql
-- Hacer Ctrl+H → buscar: c6ac2d94-60de-4d4b-94c1-d731936d3f17 → reemplazar con el UUID real

-- =============================================
-- CATEGORÍAS
-- =============================================
INSERT INTO public.categories (id, tenant_id, name, slug, position, active) VALUES
  ('a1b2c3d4-1001-4001-8001-000000000001', 'c6ac2d94-60de-4d4b-94c1-d731936d3f17', 'Clásicas', 'clasicas', 0, true),
  ('a1b2c3d4-1001-4001-8001-000000000002', 'c6ac2d94-60de-4d4b-94c1-d731936d3f17', 'Premium', 'premium', 1, true),
  ('a1b2c3d4-1001-4001-8001-000000000003', 'c6ac2d94-60de-4d4b-94c1-d731936d3f17', 'Combos', 'combos', 2, true),
  ('a1b2c3d4-1001-4001-8001-000000000004', 'c6ac2d94-60de-4d4b-94c1-d731936d3f17', 'Bebidas', 'bebidas', 3, true);

-- =============================================
-- SUBCATEGORÍAS
-- =============================================
INSERT INTO public.subcategories (id, tenant_id, category_id, name, slug, position, active) VALUES
  ('b2c3d4e5-2001-4001-8001-000000000001', 'c6ac2d94-60de-4d4b-94c1-d731936d3f17', 'a1b2c3d4-1001-4001-8001-000000000001', 'Simples', 'simples', 0, true),
  ('b2c3d4e5-2001-4001-8001-000000000002', 'c6ac2d94-60de-4d4b-94c1-d731936d3f17', 'a1b2c3d4-1001-4001-8001-000000000001', 'Dobles', 'dobles', 1, true),
  ('b2c3d4e5-2001-4001-8001-000000000003', 'c6ac2d94-60de-4d4b-94c1-d731936d3f17', 'a1b2c3d4-1001-4001-8001-000000000002', 'Smash', 'smash', 0, true),
  ('b2c3d4e5-2001-4001-8001-000000000004', 'c6ac2d94-60de-4d4b-94c1-d731936d3f17', 'a1b2c3d4-1001-4001-8001-000000000002', 'Especiales', 'especiales', 1, true),
  ('b2c3d4e5-2001-4001-8001-000000000005', 'c6ac2d94-60de-4d4b-94c1-d731936d3f17', 'a1b2c3d4-1001-4001-8001-000000000004', 'Cervezas', 'cervezas', 0, true),
  ('b2c3d4e5-2001-4001-8001-000000000006', 'c6ac2d94-60de-4d4b-94c1-d731936d3f17', 'a1b2c3d4-1001-4001-8001-000000000004', 'Sin alcohol', 'sin-alcohol', 1, true);

-- =============================================
-- PRODUCTOS
-- =============================================
INSERT INTO public.products (id, tenant_id, name, slug, description, price, compare_at_price, category_id, active, featured) VALUES
  -- Clásicas
  ('c3d4e5f6-3001-4001-8001-000000000001', 'c6ac2d94-60de-4d4b-94c1-d731936d3f17', 'Octopus Classic', 'octopus-classic',
    'Carne angus 180g, queso cheddar, lechuga, tomate y la salsa de la casa sobre pan brioche tostado. La favorita del local.',
    9500, NULL, 'a1b2c3d4-1001-4001-8001-000000000001', true, true),

  ('c3d4e5f6-3001-4001-8001-000000000002', 'c6ac2d94-60de-4d4b-94c1-d731936d3f17', 'Double Kraken', 'double-kraken',
    'Doble carne angus, doble cheddar madurado, bacon ahumado crocante y cebolla caramelizada. Para cuando una no alcanza.',
    13500, 15000, 'a1b2c3d4-1001-4001-8001-000000000001', true, false),

  ('c3d4e5f6-3001-4001-8001-000000000003', 'c6ac2d94-60de-4d4b-94c1-d731936d3f17', 'Bacon Reef', 'bacon-reef',
    'Panceta ahumada gruesa, cheddar madurado, ensalada coleslaw casera y mostaza de Dijon. Simple y brutal.',
    10200, NULL, 'a1b2c3d4-1001-4001-8001-000000000001', true, false),

  -- Premium
  ('c3d4e5f6-3001-4001-8001-000000000004', 'c6ac2d94-60de-4d4b-94c1-d731936d3f17', 'Spicy Tentacle', 'spicy-tentacle',
    'Jalapeños frescos, queso pepper jack, salsa sriracha de autor y lechuga romana crocante. Pica en serio.',
    10500, NULL, 'a1b2c3d4-1001-4001-8001-000000000002', true, true),

  ('c3d4e5f6-3001-4001-8001-000000000005', 'c6ac2d94-60de-4d4b-94c1-d731936d3f17', 'Mushroom Deep', 'mushroom-deep',
    'Champiñones salteados al ajo y manteca, queso gruyere derretido, rúcula fresca y cebolla morada encurtida.',
    11200, NULL, 'a1b2c3d4-1001-4001-8001-000000000002', true, false),

  ('c3d4e5f6-3001-4001-8001-000000000006', 'c6ac2d94-60de-4d4b-94c1-d731936d3f17', 'Coral Crispy', 'coral-crispy',
    'Pechuga de pollo marinada en suero de leche, empanada y frita. Queso americano, salsa buffalo y coleslaw.',
    10800, NULL, 'a1b2c3d4-1001-4001-8001-000000000002', true, false),

  ('c3d4e5f6-3001-4001-8001-000000000007', 'c6ac2d94-60de-4d4b-94c1-d731936d3f17', 'Deep Smash', 'deep-smash',
    'Doble smash patty aplastado en plancha caliente, mermelada de jalapeños, queso comté y pepinillos caseros.',
    12800, NULL, 'a1b2c3d4-1001-4001-8001-000000000002', true, false),

  -- Combos
  ('c3d4e5f6-3001-4001-8001-000000000008', 'c6ac2d94-60de-4d4b-94c1-d731936d3f17', 'Combo Octopus', 'combo-octopus',
    'Hamburguesa clásica + papas fritas medianas crocantes + bebida a elección. La combo que más sale.',
    15500, NULL, 'a1b2c3d4-1001-4001-8001-000000000003', true, false),

  ('c3d4e5f6-3001-4001-8001-000000000009', 'c6ac2d94-60de-4d4b-94c1-d731936d3f17', 'Combo Premium', 'combo-premium',
    'Hamburguesa premium a elección + papas fritas grandes + bebida. Para darse el gusto.',
    18500, NULL, 'a1b2c3d4-1001-4001-8001-000000000003', true, false),

  ('c3d4e5f6-3001-4001-8001-000000000010', 'c6ac2d94-60de-4d4b-94c1-d731936d3f17', 'Combo Family', 'combo-family',
    '2 hamburguesas a elección + papas fritas grandes + 2 bebidas. Para compartir, o no. No juzgamos.',
    21500, NULL, 'a1b2c3d4-1001-4001-8001-000000000003', true, false),

  -- Bebidas
  ('c3d4e5f6-3001-4001-8001-000000000011', 'c6ac2d94-60de-4d4b-94c1-d731936d3f17', 'Cerveza artesanal IPA', 'cerveza-artesanal-ipa',
    'IPA local, lúpulo cítrico y amargor balanceado. Botella 500ml, fría y lista para acompañar.',
    3500, NULL, 'a1b2c3d4-1001-4001-8001-000000000004', true, false),

  ('c3d4e5f6-3001-4001-8001-000000000012', 'c6ac2d94-60de-4d4b-94c1-d731936d3f17', 'Bebida sin alcohol', 'bebida-sin-alcohol',
    'Coca-Cola, Sprite, Fanta o agua mineral sin gas. Lata 354ml o botella 500ml.',
    1800, NULL, 'a1b2c3d4-1001-4001-8001-000000000004', true, false);

-- =============================================
-- IMÁGENES
-- Usar SIEMPRE images.unsplash.com/photo-{id} — source.unsplash.com está deprecado
-- =============================================
INSERT INTO public.product_images (id, tenant_id, product_id, url, alt, position) VALUES
  -- Octopus Classic
  ('d4e5f6a7-4001-4001-8001-000000000001', 'c6ac2d94-60de-4d4b-94c1-d731936d3f17', 'c3d4e5f6-3001-4001-8001-000000000001',
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80&auto=format&fit=crop',
    'Octopus Classic', 0),

  -- Double Kraken
  ('d4e5f6a7-4001-4001-8001-000000000002', 'c6ac2d94-60de-4d4b-94c1-d731936d3f17', 'c3d4e5f6-3001-4001-8001-000000000002',
    'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80&auto=format&fit=crop',
    'Double Kraken', 0),

  -- Bacon Reef
  ('d4e5f6a7-4001-4001-8001-000000000003', 'c6ac2d94-60de-4d4b-94c1-d731936d3f17', 'c3d4e5f6-3001-4001-8001-000000000003',
    'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=800&q=80&auto=format&fit=crop',
    'Bacon Reef', 0),

  -- Spicy Tentacle
  ('d4e5f6a7-4001-4001-8001-000000000004', 'c6ac2d94-60de-4d4b-94c1-d731936d3f17', 'c3d4e5f6-3001-4001-8001-000000000004',
    'https://picsum.photos/seed/spicy-tentacle-octopus/800/600',
    'Spicy Tentacle', 0),

  -- Mushroom Deep
  ('d4e5f6a7-4001-4001-8001-000000000005', 'c6ac2d94-60de-4d4b-94c1-d731936d3f17', 'c3d4e5f6-3001-4001-8001-000000000005',
    'https://picsum.photos/seed/mushroom-deep-octopus/800/600',
    'Mushroom Deep', 0),

  -- Coral Crispy
  ('d4e5f6a7-4001-4001-8001-000000000006', 'c6ac2d94-60de-4d4b-94c1-d731936d3f17', 'c3d4e5f6-3001-4001-8001-000000000006',
    'https://picsum.photos/seed/coral-crispy-octopus/800/600',
    'Coral Crispy', 0),

  -- Deep Smash
  ('d4e5f6a7-4001-4001-8001-000000000007', 'c6ac2d94-60de-4d4b-94c1-d731936d3f17', 'c3d4e5f6-3001-4001-8001-000000000007',
    'https://picsum.photos/seed/deep-smash-octopus/800/600',
    'Deep Smash', 0),

  -- Combo Octopus
  ('d4e5f6a7-4001-4001-8001-000000000008', 'c6ac2d94-60de-4d4b-94c1-d731936d3f17', 'c3d4e5f6-3001-4001-8001-000000000008',
    'https://picsum.photos/seed/combo-octopus-01/800/600',
    'Combo Octopus', 0),

  -- Combo Premium
  ('d4e5f6a7-4001-4001-8001-000000000009', 'c6ac2d94-60de-4d4b-94c1-d731936d3f17', 'c3d4e5f6-3001-4001-8001-000000000009',
    'https://picsum.photos/seed/combo-premium-octopus/800/600',
    'Combo Premium', 0),

  -- Combo Family
  ('d4e5f6a7-4001-4001-8001-000000000010', 'c6ac2d94-60de-4d4b-94c1-d731936d3f17', 'c3d4e5f6-3001-4001-8001-000000000010',
    'https://picsum.photos/seed/combo-family-octopus/800/600',
    'Combo Family', 0),

  -- Cerveza IPA
  ('d4e5f6a7-4001-4001-8001-000000000011', 'c6ac2d94-60de-4d4b-94c1-d731936d3f17', 'c3d4e5f6-3001-4001-8001-000000000011',
    'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=800&q=80&auto=format&fit=crop',
    'Cerveza IPA', 0),

  -- Bebida sin alcohol
  ('d4e5f6a7-4001-4001-8001-000000000012', 'c6ac2d94-60de-4d4b-94c1-d731936d3f17', 'c3d4e5f6-3001-4001-8001-000000000012',
    'https://picsum.photos/seed/drinks-octopus-01/800/600',
    'Bebida', 0);

-- =============================================
-- VARIANTES (tamaños / opciones en productos clave)
-- =============================================
INSERT INTO public.product_variants (id, tenant_id, product_id, name, price, price_modifier, stock) VALUES
  -- Octopus Classic: opción de carne doble
  ('e5f6a7b8-5001-4001-8001-000000000001', 'c6ac2d94-60de-4d4b-94c1-d731936d3f17', 'c3d4e5f6-3001-4001-8001-000000000001', 'Simple (180g)', 9500, 0, 50),
  ('e5f6a7b8-5001-4001-8001-000000000002', 'c6ac2d94-60de-4d4b-94c1-d731936d3f17', 'c3d4e5f6-3001-4001-8001-000000000001', 'Doble (360g)', 13500, 4000, 30),

  -- Cerveza IPA: tamaños
  ('e5f6a7b8-5001-4001-8001-000000000003', 'c6ac2d94-60de-4d4b-94c1-d731936d3f17', 'c3d4e5f6-3001-4001-8001-000000000011', 'Botella 500ml', 3500, 0, 40),
  ('e5f6a7b8-5001-4001-8001-000000000004', 'c6ac2d94-60de-4d4b-94c1-d731936d3f17', 'c3d4e5f6-3001-4001-8001-000000000011', 'Botella 1L', 6200, 2700, 20),

  -- Bebida sin alcohol: opciones
  ('e5f6a7b8-5001-4001-8001-000000000005', 'c6ac2d94-60de-4d4b-94c1-d731936d3f17', 'c3d4e5f6-3001-4001-8001-000000000012', 'Coca-Cola', 1800, 0, 100),
  ('e5f6a7b8-5001-4001-8001-000000000006', 'c6ac2d94-60de-4d4b-94c1-d731936d3f17', 'c3d4e5f6-3001-4001-8001-000000000012', 'Sprite', 1800, 0, 100),
  ('e5f6a7b8-5001-4001-8001-000000000007', 'c6ac2d94-60de-4d4b-94c1-d731936d3f17', 'c3d4e5f6-3001-4001-8001-000000000012', 'Agua mineral', 1500, -300, 100);
