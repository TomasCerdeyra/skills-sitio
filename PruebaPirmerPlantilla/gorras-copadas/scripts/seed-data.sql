-- =============================================
-- GORRAS COPADAS — Seed Data
-- Tenant ID: a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27
-- Ejecutar DESPUÉS de setup-rls.sql
-- =============================================

-- Add position column to products if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'position'
  ) THEN
    ALTER TABLE public.products ADD COLUMN position INTEGER;
  END IF;
END $$;

-- CATEGORIES
INSERT INTO public.categories (id, tenant_id, name, slug, position, active) VALUES
  ('c1f3a2b4-1111-4aaa-8bbb-000000000001', 'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27', 'Snapback', 'snapback', 1, true),
  ('c1f3a2b4-1111-4aaa-8bbb-000000000002', 'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27', 'Dad Hat', 'dad-hat', 2, true),
  ('c1f3a2b4-1111-4aaa-8bbb-000000000003', 'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27', 'Fitted', 'fitted', 3, true),
  ('c1f3a2b4-1111-4aaa-8bbb-000000000004', 'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27', 'Bucket Hat', 'bucket', 4, true),
  ('c1f3a2b4-1111-4aaa-8bbb-000000000005', 'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27', 'Trucker', 'trucker', 5, true)
ON CONFLICT (id) DO NOTHING;

-- PRODUCTS (12 gorras con position)
INSERT INTO public.products (id, tenant_id, name, slug, price, description, active, featured, category_id, position)
VALUES
  (
    'f7e2c9d1-2a3b-4c5d-8e6f-7a8b9c0d1e2f',
    'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27',
    'Snapback Acid',
    'snapback-acid',
    12500,
    'La Snapback Acid te va a hacer destacar donde sea que vayas. Visera recta, ajuste trasero con botón, bordado en frente.',
    true, true,
    'c1f3a2b4-1111-4aaa-8bbb-000000000001',
    1
  ),
  (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27',
    'Dad Hat Chaos',
    'dad-hat-chaos',
    9800,
    'El caos hecho gorra. Lavada, desestructurada y con ese fit relajado que te cierra para cualquier ocasión.',
    true, true,
    'c1f3a2b4-1111-4aaa-8bbb-000000000002',
    2
  ),
  (
    'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27',
    'Fitted Neon',
    'fitted-neon',
    14200,
    'Fitted cerrada con bordado neon en frente. Tela premium, ajuste perfecto.',
    true, false,
    'c1f3a2b4-1111-4aaa-8bbb-000000000003',
    3
  ),
  (
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27',
    'Bucket Skate',
    'bucket-skate',
    10500,
    'Bucket hat de lona con logo brodado. La usás al derecho o al revés, igual queda fire.',
    true, false,
    'c1f3a2b4-1111-4aaa-8bbb-000000000004',
    4
  ),
  (
    'd4e5f6a7-b8c9-0123-defa-234567890123',
    'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27',
    'Trucker Graffiti',
    'trucker-graffiti',
    11000,
    'Panel de malla trasero, parche de cuero en frente con arte graffiti.',
    true, false,
    'c1f3a2b4-1111-4aaa-8bbb-000000000005',
    5
  ),
  (
    'e5f6a7b8-c9d0-1234-efab-345678901234',
    'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27',
    'Snapback Chrome',
    'snapback-chrome',
    13800,
    'Visera con efecto metálico, parche bordado. Edición limitada.',
    true, true,
    'c1f3a2b4-1111-4aaa-8bbb-000000000001',
    6
  ),
  (
    'f6a7b8c9-d0e1-2345-fabc-456789012345',
    'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27',
    'Dad Hat Vintage',
    'dad-hat-vintage',
    9200,
    'Tratamiento vintage con decolorado natural. Cada unidad es única.',
    true, false,
    'c1f3a2b4-1111-4aaa-8bbb-000000000002',
    7
  ),
  (
    'a7b8c9d0-e1f2-3456-abcd-567890123456',
    'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27',
    'Bucket Jungle',
    'bucket-jungle',
    11500,
    'Estampado all-over con motivos de jungla urbana. Material resistente al agua.',
    true, false,
    'c1f3a2b4-1111-4aaa-8bbb-000000000004',
    8
  ),
  (
    'b8c9d0e1-f2a3-4567-bcde-678901234567',
    'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27',
    'Fitted Blackout',
    'fitted-blackout',
    15000,
    'All black everything. Fitted cerrada con detalles en relieve negro sobre negro.',
    true, false,
    'c1f3a2b4-1111-4aaa-8bbb-000000000003',
    9
  ),
  (
    'c9d0e1f2-a3b4-5678-cdef-789012345678',
    'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27',
    'Snapback Wild',
    'snapback-wild',
    12000,
    'Colores que no piden permiso. Bordado 3D en frente, visera recta en contraste.',
    true, false,
    'c1f3a2b4-1111-4aaa-8bbb-000000000001',
    10
  ),
  (
    'd0e1f2a3-b4c5-6789-defa-890123456789',
    'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27',
    'Trucker Flames',
    'trucker-flames',
    10800,
    'Llamas bordadas en el lateral, malla trasera premium.',
    true, false,
    'c1f3a2b4-1111-4aaa-8bbb-000000000005',
    11
  ),
  (
    'e1f2a3b4-c5d6-7890-efab-901234567890',
    'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27',
    'Dad Hat Smiley',
    'dad-hat-smiley',
    9500,
    'La clásica con bordado de carita. Porque a veces el estilo está en los detalles simples.',
    true, false,
    'c1f3a2b4-1111-4aaa-8bbb-000000000002',
    12
  )
ON CONFLICT (id) DO NOTHING;

-- PRODUCT IMAGES
INSERT INTO public.product_images (id, product_id, tenant_id, url, alt, position) VALUES
  ('aa100001-0000-4000-8000-000000000001', 'f7e2c9d1-2a3b-4c5d-8e6f-7a8b9c0d1e2f', 'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27', 'https://loremflickr.com/800/800/snapback,cap?lock=101', 'Snapback Acid', 1),
  ('aa100001-0000-4000-8000-000000000002', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27', 'https://loremflickr.com/800/800/dadhat,cap?lock=102', 'Dad Hat Chaos', 1),
  ('aa100001-0000-4000-8000-000000000003', 'b2c3d4e5-f6a7-8901-bcde-f12345678901', 'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27', 'https://loremflickr.com/800/800/fitted,cap?lock=103', 'Fitted Neon', 1),
  ('aa100001-0000-4000-8000-000000000004', 'c3d4e5f6-a7b8-9012-cdef-123456789012', 'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27', 'https://loremflickr.com/800/800/bucket,hat?lock=104', 'Bucket Skate', 1),
  ('aa100001-0000-4000-8000-000000000005', 'd4e5f6a7-b8c9-0123-defa-234567890123', 'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27', 'https://loremflickr.com/800/800/trucker,cap?lock=105', 'Trucker Graffiti', 1),
  ('aa100001-0000-4000-8000-000000000006', 'e5f6a7b8-c9d0-1234-efab-345678901234', 'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27', 'https://loremflickr.com/800/800/snapback,streetwear?lock=106', 'Snapback Chrome', 1),
  ('aa100001-0000-4000-8000-000000000007', 'f6a7b8c9-d0e1-2345-fabc-456789012345', 'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27', 'https://loremflickr.com/800/800/vintage,hat?lock=107', 'Dad Hat Vintage', 1),
  ('aa100001-0000-4000-8000-000000000008', 'a7b8c9d0-e1f2-3456-abcd-567890123456', 'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27', 'https://loremflickr.com/800/800/jungle,hat?lock=108', 'Bucket Jungle', 1),
  ('aa100001-0000-4000-8000-000000000009', 'b8c9d0e1-f2a3-4567-bcde-678901234567', 'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27', 'https://loremflickr.com/800/800/cap,black?lock=109', 'Fitted Blackout', 1),
  ('aa100001-0000-4000-8000-000000000010', 'c9d0e1f2-a3b4-5678-cdef-789012345678', 'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27', 'https://loremflickr.com/800/800/cap,colorful?lock=110', 'Snapback Wild', 1),
  ('aa100001-0000-4000-8000-000000000011', 'd0e1f2a3-b4c5-6789-defa-890123456789', 'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27', 'https://loremflickr.com/800/800/trucker,flames?lock=111', 'Trucker Flames', 1),
  ('aa100001-0000-4000-8000-000000000012', 'e1f2a3b4-c5d6-7890-efab-901234567890', 'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27', 'https://loremflickr.com/800/800/smiley,hat?lock=112', 'Dad Hat Smiley', 1)
ON CONFLICT (id) DO NOTHING;

-- PRODUCT VARIANTS
INSERT INTO public.product_variants (id, product_id, tenant_id, name, sku, stock, price) VALUES
  ('bb200001-0000-4000-8000-000000000001', 'f7e2c9d1-2a3b-4c5d-8e6f-7a8b9c0d1e2f', 'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27', 'Talle único', 'SNAK-ACID-TU', 15, 12500),
  ('bb200001-0000-4000-8000-000000000002', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27', 'Talle único', 'DAD-CHAOS-TU', 8, 9800),
  ('bb200001-0000-4000-8000-000000000003', 'b2c3d4e5-f6a7-8901-bcde-f12345678901', 'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27', 'S/M', 'FIT-NEON-SM', 5, 14200),
  ('bb200001-0000-4000-8000-000000000004', 'b2c3d4e5-f6a7-8901-bcde-f12345678901', 'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27', 'L/XL', 'FIT-NEON-LXL', 3, 14200),
  ('bb200001-0000-4000-8000-000000000005', 'c3d4e5f6-a7b8-9012-cdef-123456789012', 'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27', 'Talle único', 'BKT-SKATE-TU', 20, 10500),
  ('bb200001-0000-4000-8000-000000000006', 'd4e5f6a7-b8c9-0123-defa-234567890123', 'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27', 'Talle único', 'TRUK-GRAFF-TU', 12, 11000),
  ('bb200001-0000-4000-8000-000000000007', 'e5f6a7b8-c9d0-1234-efab-345678901234', 'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27', 'Talle único', 'SNAK-CHROM-TU', 4, 13800),
  ('bb200001-0000-4000-8000-000000000008', 'f6a7b8c9-d0e1-2345-fabc-456789012345', 'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27', 'Talle único', 'DAD-VINT-TU', 7, 9200),
  ('bb200001-0000-4000-8000-000000000009', 'a7b8c9d0-e1f2-3456-abcd-567890123456', 'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27', 'Talle único', 'BKT-JUNG-TU', 10, 11500),
  ('bb200001-0000-4000-8000-000000000010', 'b8c9d0e1-f2a3-4567-bcde-678901234567', 'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27', 'S/M', 'FIT-BLCK-SM', 6, 15000),
  ('bb200001-0000-4000-8000-000000000011', 'b8c9d0e1-f2a3-4567-bcde-678901234567', 'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27', 'L/XL', 'FIT-BLCK-LXL', 2, 15000),
  ('bb200001-0000-4000-8000-000000000012', 'c9d0e1f2-a3b4-5678-cdef-789012345678', 'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27', 'Talle único', 'SNAK-WILD-TU', 9, 12000),
  ('bb200001-0000-4000-8000-000000000013', 'd0e1f2a3-b4c5-6789-defa-890123456789', 'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27', 'Talle único', 'TRUK-FLAM-TU', 11, 10800),
  ('bb200001-0000-4000-8000-000000000014', 'e1f2a3b4-c5d6-7890-efab-901234567890', 'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27', 'Talle único', 'DAD-SMIL-TU', 14, 9500)
ON CONFLICT (id) DO NOTHING;

-- COUPONS
INSERT INTO public.coupons (id, tenant_id, code, type, value, min_amount, max_uses, uses_count, active, starts_at, expires_at) VALUES
  (
    'cc300001-0000-4000-8000-000000000001',
    'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27',
    'SKATE10',
    'percent',
    10,
    8000,
    100,
    0,
    true,
    NOW(),
    NOW() + INTERVAL '6 months'
  ),
  (
    'cc300001-0000-4000-8000-000000000002',
    'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27',
    'PRIMERA2000',
    'fixed',
    2000,
    10000,
    50,
    0,
    true,
    NOW(),
    NOW() + INTERVAL '3 months'
  )
ON CONFLICT (id) DO NOTHING;
