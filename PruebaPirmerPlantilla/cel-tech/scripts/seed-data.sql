-- =============================================
-- Seed Data — Cel Tech (rubro: tienda de celulares)
-- Generado: Mayo 2026
-- Ejecutar UNA SOLA VEZ después de setup-rls.sql
-- =============================================
--
-- setup-rls.sql ya creó el tenant. Copiar el UUID que imprimió
-- y hacer Ctrl+H → buscar 29f0040b-2479-4c23-a036-aa03a32ea26b → reemplazar con el UUID.
--
-- Si querés borrar todo este seed:
--   DELETE FROM public.product_variants WHERE tenant_id = 'TU_UUID';
--   DELETE FROM public.product_images WHERE tenant_id = 'TU_UUID';
--   DELETE FROM public.products WHERE tenant_id = 'TU_UUID';
--   DELETE FROM public.subcategories WHERE tenant_id = 'TU_UUID';
--   DELETE FROM public.categories WHERE tenant_id = 'TU_UUID';
--   DELETE FROM public.shipping_zones WHERE tenant_id = 'TU_UUID';
--   DELETE FROM public.coupons WHERE tenant_id = 'TU_UUID';
-- =============================================

-- =============================================
-- CATEGORÍAS
-- =============================================
INSERT INTO public.categories (id, tenant_id, name, slug, position, active) VALUES
  ('7f3d9a2b-1c8e-4f5d-b6a0-3e2c9d4f1b7a', '29f0040b-2479-4c23-a036-aa03a32ea26b', 'iPhone', 'iphone', 0, true),
  ('2a8c5f0e-9b3d-4a7c-8f1e-6d0b5c3a9e2f', '29f0040b-2479-4c23-a036-aa03a32ea26b', 'Samsung', 'samsung', 1, true),
  ('9e1b4d7c-0f2a-5e8d-3b6c-7a4f0e9d2c1b', '29f0040b-2479-4c23-a036-aa03a32ea26b', 'Motorola', 'motorola', 2, true),
  ('4c6f0a3e-8d1b-9c5f-2a7e-0b3d6c4f8a1e', '29f0040b-2479-4c23-a036-aa03a32ea26b', 'Xiaomi', 'xiaomi', 3, true);

-- =============================================
-- SUBCATEGORÍAS
-- =============================================
INSERT INTO public.subcategories (id, tenant_id, category_id, name, slug, position, active) VALUES
  ('b5d2f8a1-7c4e-4b9d-8f3a-1e8c5d0f2b4a', '29f0040b-2479-4c23-a036-aa03a32ea26b', '7f3d9a2b-1c8e-4f5d-b6a0-3e2c9d4f1b7a', 'iPhone 15 Series', 'iphone-15', 0, true),
  ('0e7c3b9d-4f1a-4e2c-8b0d-9a6f3c7e1b4d', '29f0040b-2479-4c23-a036-aa03a32ea26b', '7f3d9a2b-1c8e-4f5d-b6a0-3e2c9d4f1b7a', 'iPhone 14 Series', 'iphone-14', 1, true),
  ('6a4d0f8b-3c7e-4a9b-8f2d-8e0c6a3d7f1b', '29f0040b-2479-4c23-a036-aa03a32ea26b', '2a8c5f0e-9b3d-4a7c-8f1e-6d0b5c3a9e2f', 'Galaxy S Series', 'galaxy-s', 0, true),
  ('3d1b8c5e-9f0a-4d3b-8c4e-2a5f8d1c0b9e', '29f0040b-2479-4c23-a036-aa03a32ea26b', '2a8c5f0e-9b3d-4a7c-8f1e-6d0b5c3a9e2f', 'Galaxy A Series', 'galaxy-a', 1, true),
  ('8c5f2a9e-1b0d-4c6f-aa4b-5e9d2c1f7b0a', '29f0040b-2479-4c23-a036-aa03a32ea26b', '9e1b4d7c-0f2a-5e8d-3b6c-7a4f0e9d2c1b', 'Motorola Edge', 'motorola-edge', 0, true),
  ('1f9b6c3d-8a0e-4f2b-9d7c-4b8a6f9e3c0d', '29f0040b-2479-4c23-a036-aa03a32ea26b', '9e1b4d7c-0f2a-5e8d-3b6c-7a4f0e9d2c1b', 'Motorola Moto G', 'motorola-moto-g', 1, true);

-- =============================================
-- PRODUCTOS
-- =============================================
INSERT INTO public.products (id, tenant_id, name, slug, description, price, compare_at_price, category_id, active, featured) VALUES
  ('a0c3f7d9-2b8e-4a1c-9f5b-7d0e3c8a2f6b', '29f0040b-2479-4c23-a036-aa03a32ea26b', 'iPhone 15 Pro Max',
    'iphone-15-pro-max',
    'El iPhone más avanzado con chip A17 Pro, carcasa de titanio aeroespacial y sistema de cámara Pro de 48 MP con zoom óptico 5x. Pantalla Always-On de 6.7 pulgadas.',
    2150000, 2350000, '7f3d9a2b-1c8e-4f5d-b6a0-3e2c9d4f1b7a', true, true),

  ('5e8b1f4a-9c2d-4f0e-ab6a-1d4c8f5e9b2a', '29f0040b-2479-4c23-a036-aa03a32ea26b', 'iPhone 15 Pro',
    'iphone-15-pro',
    'Chip A17 Pro, titanio, zoom óptico 3x y pantalla ProMotion de 6.1 pulgadas. La versión compacta del iPhone más avanzado.',
    1890000, NULL, '7f3d9a2b-1c8e-4f5d-b6a0-3e2c9d4f1b7a', true, true),

  ('2b9d5c7f-0e3a-4b2d-af1c-4a7e0b9d5c3f', '29f0040b-2479-4c23-a036-aa03a32ea26b', 'iPhone 14',
    'iphone-14',
    'Chip A15 Bionic, pantalla Super Retina XDR de 6.1 pulgadas, sistema de cámara de 12 MP con modo Acción y crash detection.',
    1290000, 1450000, '7f3d9a2b-1c8e-4f5d-b6a0-3e2c9d4f1b7a', true, false),

  ('7f1a4e8b-3c9d-4f5a-ab7e-8d1c4f7a3e9b', '29f0040b-2479-4c23-a036-aa03a32ea26b', 'iPhone 13',
    'iphone-13',
    'Chip A15 Bionic, pantalla OLED de 6.1 pulgadas con ProMotion. Cámara dual de 12 MP con modo cinematográfico. Batería de hasta 19 horas.',
    980000, 1100000, '7f3d9a2b-1c8e-4f5d-b6a0-3e2c9d4f1b7a', true, false),

  ('4d8c0b3f-7a2e-4d4c-af1b-0e3a8d0b7c4f', '29f0040b-2479-4c23-a036-aa03a32ea26b', 'Samsung Galaxy S24 Ultra',
    'samsung-galaxy-s24-ultra',
    'S Pen integrado, pantalla Dynamic AMOLED 2X de 6.8 pulgadas, chip Snapdragon 8 Gen 3 y sistema de cámara de 200 MP. El Galaxy más potente.',
    1890000, NULL, '2a8c5f0e-9b3d-4a7c-8f1e-6d0b5c3a9e2f', true, true),

  ('9a2e7f1b-4c0d-4a9e-af3b-5d8c2f7e4a1b', '29f0040b-2479-4c23-a036-aa03a32ea26b', 'Samsung Galaxy S24',
    'samsung-galaxy-s24',
    'Snapdragon 8 Gen 3, pantalla Dynamic AMOLED 2X de 6.2 pulgadas y triple cámara de 50 MP. El Galaxy compacto de alta gama.',
    1250000, NULL, '2a8c5f0e-9b3d-4a7c-8f1e-6d0b5c3a9e2f', true, false),

  ('1c6f3d9a-8b0e-4c5f-ad1a-3f9b6e0c8d2a', '29f0040b-2479-4c23-a036-aa03a32ea26b', 'Samsung Galaxy A55',
    'samsung-galaxy-a55',
    'Pantalla Super AMOLED de 120 Hz, triple cámara de 50 MP, procesador Exynos 1480 y resistencia IP67. La gama media que supera expectativas.',
    490000, NULL, '2a8c5f0e-9b3d-4a7c-8f1e-6d0b5c3a9e2f', true, false),

  ('6f0a8c4d-3e7b-4f9a-ac2d-8b0e5c3f7a9d', '29f0040b-2479-4c23-a036-aa03a32ea26b', 'Motorola Edge 50 Pro',
    'motorola-edge-50-pro',
    'Pantalla pOLED de 144 Hz con cámara de 50 MP con OIS y carga ultra rápida de 125W. El flagship al alcance de todos.',
    780000, NULL, '9e1b4d7c-0f2a-5e8d-3b6c-7a4f0e9d2c1b', true, true),

  ('3b7d2f9c-0a4e-4b1d-ac3f-2a5e0b7d4c8f', '29f0040b-2479-4c23-a036-aa03a32ea26b', 'Motorola Moto G84',
    'motorola-moto-g84',
    'Pantalla pOLED de 120 Hz, cámara principal de 50 MP con estabilización óptica y batería de 5000 mAh. Rendimiento premium sin pagar de más.',
    320000, NULL, '9e1b4d7c-0f2a-5e8d-3b6c-7a4f0e9d2c1b', true, false),

  ('8e4c1b7f-5d0a-4e8c-ab4f-6a9d1e5c0b7f', '29f0040b-2479-4c23-a036-aa03a32ea26b', 'Xiaomi Redmi Note 13 Pro',
    'xiaomi-redmi-note-13-pro',
    'Cámara de 200 MP, pantalla AMOLED FHD+ de 120 Hz, Snapdragon 7s Gen 2 y carga de 67W. La foto más detallada en gama media.',
    420000, NULL, '4c6f0a3e-8d1b-9c5f-2a7e-0b3d6c4f8a1e', true, false),

  ('0d9b5f2e-7c3a-4d0b-a84c-5e2a9d7b3f1e', '29f0040b-2479-4c23-a036-aa03a32ea26b', 'Motorola Moto G54',
    'motorola-moto-g54',
    'Pantalla IPS LCD de 120 Hz, cámara de 50 MP y Dimensity 7020. El equilibrio perfecto entre precio y rendimiento.',
    240000, NULL, '9e1b4d7c-0f2a-5e8d-3b6c-7a4f0e9d2c1b', true, false),

  ('5c0e8d3a-2f9b-4c0e-aa7d-1b5f2e8c9a3d', '29f0040b-2479-4c23-a036-aa03a32ea26b', 'Xiaomi 14',
    'xiaomi-14',
    'Chip Snapdragon 8 Gen 3, sistema Leica de cámara triple con lente de 75mm y pantalla AMOLED de 120 Hz. Flagship killer chino.',
    1150000, NULL, '4c6f0a3e-8d1b-9c5f-2a7e-0b3d6c4f8a1e', true, false);

-- =============================================
-- IMÁGENES DE PRODUCTOS
-- Nota: usar SIEMPRE images.unsplash.com/photo-{id}
-- =============================================
INSERT INTO public.product_images (id, tenant_id, product_id, url, alt, position) VALUES
  ('d8f2a6c1-3b9e-4d5f-aa2c-4e1b8d6a3f9c', '29f0040b-2479-4c23-a036-aa03a32ea26b', 'a0c3f7d9-2b8e-4a1c-9f5b-7d0e3c8a2f6b',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80&auto=format&fit=crop', 'iPhone 15 Pro Max', 0),
  ('1a5d9f3b-8c2e-4a4d-a07b-3c9e5d1a8f2b', '29f0040b-2479-4c23-a036-aa03a32ea26b', '5e8b1f4a-9c2d-4f0e-ab6a-1d4c8f5e9b2a',
    'https://images.unsplash.com/photo-1632158338861-0f1edda5d6ce?w=800&q=80&auto=format&fit=crop', 'iPhone 15 Pro', 0),
  ('6e3b0d8a-1f5c-4e2b-a40a-8f6c3e1b7d5a', '29f0040b-2479-4c23-a036-aa03a32ea26b', '2b9d5c7f-0e3a-4b2d-af1c-4a7e0b9d5c3f',
    'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&q=80&auto=format&fit=crop', 'iPhone 14', 0),
  ('3c8f4a7d-2e0b-4c8f-a14e-7d3b0c9f6a2e', '29f0040b-2479-4c23-a036-aa03a32ea26b', '7f1a4e8b-3c9d-4f5a-ab7e-8d1c4f7a3e9b',
    'https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=800&q=80&auto=format&fit=crop', 'iPhone 13', 0),
  ('8a0c7f2e-5d1b-4a8c-a90d-2e5b8a1c4f7d', '29f0040b-2479-4c23-a036-aa03a32ea26b', '4d8c0b3f-7a2e-4d4c-af1b-0e3a8d0b7c4f',
    'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80&auto=format&fit=crop', 'Samsung Galaxy S24 Ultra', 0),
  ('2f5e1b9d-0c4a-4f2e-a83d-1a8f5e0c9b4d', '29f0040b-2479-4c23-a036-aa03a32ea26b', '9a2e7f1b-4c0d-4a9e-af3b-5d8c2f7e4a1b',
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80&auto=format&fit=crop', 'Samsung Galaxy S24', 0),
  ('7b9d4c0f-3a6e-4b7d-af1c-9e0a4b8d3c6f', '29f0040b-2479-4c23-a036-aa03a32ea26b', '1c6f3d9a-8b0e-4c5f-ad1a-3f9b6e0c8d2a',
    'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80&auto=format&fit=crop', 'Samsung Galaxy A55', 0),
  ('4e0b8d5c-9f2a-4e0b-ac7f-6a1d9e4b0c8f', '29f0040b-2479-4c23-a036-aa03a32ea26b', '6f0a8c4d-3e7b-4f9a-ac2d-8b0e5c3f7a9d',
    'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80&auto=format&fit=crop', 'Motorola Edge 50 Pro', 0),
  ('9d3a0f7c-4b8e-4d9a-a25f-7b0e3d8a1c5f', '29f0040b-2479-4c23-a036-aa03a32ea26b', '3b7d2f9c-0a4e-4b1d-ac3f-2a5e0b7d4c8f',
    'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80&auto=format&fit=crop', 'Motorola Moto G84', 0),
  ('0c6f4b2e-7a1d-4c0f-ab9e-5d2a7c6f1b0e', '29f0040b-2479-4c23-a036-aa03a32ea26b', '8e4c1b7f-5d0a-4e8c-ab4f-6a9d1e5c0b7f',
    'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&q=80&auto=format&fit=crop', 'Xiaomi Redmi Note 13 Pro', 0),
  ('5f2d9a4b-1e7c-4f2d-a80e-3c9b5f4d2a7c', '29f0040b-2479-4c23-a036-aa03a32ea26b', '0d9b5f2e-7c3a-4d0b-a84c-5e2a9d7b3f1e',
    'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&q=80&auto=format&fit=crop', 'Motorola Moto G54', 0),
  ('a1e8c3d7-6f0b-4c5f-ad2b-9c4a1e8c7d0f', '29f0040b-2479-4c23-a036-aa03a32ea26b', '5c0e8d3a-2f9b-4c0e-aa7d-1b5f2e8c9a3d',
    'https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=800&q=80&auto=format&fit=crop', 'Xiaomi 14', 0);

-- =============================================
-- VARIANTES DE PRODUCTOS
-- =============================================
INSERT INTO public.product_variants (id, tenant_id, product_id, name, price, price_modifier, stock) VALUES
  -- iPhone 15 Pro Max
  ('e7a9c2f4-8d1b-4e3a-a57f-2b4d9e7a1c0f', '29f0040b-2479-4c23-a036-aa03a32ea26b', 'a0c3f7d9-2b8e-4a1c-9f5b-7d0e3c8a2f6b', '256 GB', 2150000, 0, 5),
  ('2c5f8d0b-3e7a-4c2f-a04b-1a8e5c0f3d7b', '29f0040b-2479-4c23-a036-aa03a32ea26b', 'a0c3f7d9-2b8e-4a1c-9f5b-7d0e3c8a2f6b', '512 GB', 2480000, 0, 3),
  ('7d0e4a9c-1f3b-4d0e-ab6f-5c1a7d4e9c3b', '29f0040b-2479-4c23-a036-aa03a32ea26b', 'a0c3f7d9-2b8e-4a1c-9f5b-7d0e3c8a2f6b', '1 TB', 2780000, 0, 1),
  -- iPhone 15 Pro
  ('4b8c1f5d-0a3e-4b7c-a09d-4a0e8b5c1f3d', '29f0040b-2479-4c23-a036-aa03a32ea26b', '5e8b1f4a-9c2d-4f0e-ab6a-1d4c8f5e9b2a', '128 GB', 1890000, 0, 6),
  ('9f3d7b2e-5a0c-4f1d-a03b-7c2a9f7d5b0e', '29f0040b-2479-4c23-a036-aa03a32ea26b', '5e8b1f4a-9c2d-4f0e-ab6a-1d4c8f5e9b2a', '256 GB', 2100000, 0, 4),
  -- iPhone 14
  ('1e6a0c8f-4b9d-4e1a-a72c-0d6b4a1f9c8e', '29f0040b-2479-4c23-a036-aa03a32ea26b', '2b9d5c7f-0e3a-4b2d-af1c-4a7e0b9d5c3f', '128 GB', 1290000, 0, 6),
  ('6c1f4e9d-2b7a-4c6f-a10d-3e8b6c9f5a2d', '29f0040b-2479-4c23-a036-aa03a32ea26b', '2b9d5c7f-0e3a-4b2d-af1c-4a7e0b9d5c3f', '256 GB', 1480000, 0, 4),
  -- iPhone 13
  ('3a8d2c7f-9e0b-4a4d-ab8c-6b1e9a5d2c0f', '29f0040b-2479-4c23-a036-aa03a32ea26b', '7f1a4e8b-3c9d-4f5a-ab7e-8d1c4f7a3e9b', '128 GB', 980000, 0, 8),
  ('8f5b9e1a-0d4c-4f8b-a03e-1c5d0b9f2e4a', '29f0040b-2479-4c23-a036-aa03a32ea26b', '7f1a4e8b-3c9d-4f5a-ab7e-8d1c4f7a3e9b', '256 GB', 1150000, 0, 3),
  -- Samsung S24 Ultra
  ('5d2a6f0e-8c1b-4d5a-a94c-7e0b5a8f3d1c', '29f0040b-2479-4c23-a036-aa03a32ea26b', '4d8c0b3f-7a2e-4d4c-af1b-0e3a8d0b7c4f', '256 GB', 1890000, 0, 8),
  ('0e9c3b7d-1f5a-4e0c-ab8f-2d9a3e7b1c5f', '29f0040b-2479-4c23-a036-aa03a32ea26b', '4d8c0b3f-7a2e-4d4c-af1b-0e3a8d0b7c4f', '512 GB', 2100000, 0, 4),
  -- Samsung S24
  ('7a4f1c5b-3d8e-4a7f-a09d-5e1b4a0f8c3d', '29f0040b-2479-4c23-a036-aa03a32ea26b', '9a2e7f1b-4c0d-4a9e-af3b-5d8c2f7e4a1b', '128 GB', 1250000, 0, 5),
  -- Samsung A55
  ('4f1b8a3d-6c0e-4f4b-a92d-0c8e1b5f6a3d', '29f0040b-2479-4c23-a036-aa03a32ea26b', '1c6f3d9a-8b0e-4c5f-ad1a-3f9b6e0c8d2a', '128 GB', 490000, 0, 20),
  -- Motorola Edge 50 Pro
  ('b3e7d0c9-4f2a-4e7b-a85a-8c0f3b7e4d2a', '29f0040b-2479-4c23-a036-aa03a32ea26b', '6f0a8c4d-3e7b-4f9a-ac2d-8b0e5c3f7a9d', '256 GB', 780000, 0, 12),
  -- Motorola G84
  ('2d0f5c8a-1e9b-4d2f-a10a-4b7e0f5c9a1b', '29f0040b-2479-4c23-a036-aa03a32ea26b', '3b7d2f9c-0a4e-4b1d-ac3f-2a5e0b7d4c8f', '256 GB', 320000, 0, 15),
  -- Xiaomi Redmi Note 13 Pro
  ('9c7b4d1f-0e3a-4c9b-a02d-1a6e4b0d7f3a', '29f0040b-2479-4c23-a036-aa03a32ea26b', '8e4c1b7f-5d0a-4e8c-ab4f-6a9d1e5c0b7f', '256 GB', 420000, 0, 10),
  -- Motorola G54
  ('4a2c9e6d-7f1b-4a4c-a08f-6d2b9a7e1c0f', '29f0040b-2479-4c23-a036-aa03a32ea26b', '0d9b5f2e-7c3a-4d0b-a84c-5e2a9d7b3f1e', '256 GB', 240000, 0, 18),
  -- Xiaomi 14
  ('7e5a1c0d-2b4f-4e7a-a93c-0b8f2e6a4c1d', '29f0040b-2479-4c23-a036-aa03a32ea26b', '5c0e8d3a-2f9b-4c0e-aa7d-1b5f2e8c9a3d', '256 GB', 1150000, 0, 4);

-- =============================================
-- ZONAS DE ENVÍO
-- =============================================
INSERT INTO public.shipping_zones (id, tenant_id, name, description, price, position, active) VALUES
  ('c4d9f3a7-1b0e-4c4d-a52a-9e6b3c0f7d1a', '29f0040b-2479-4c23-a036-aa03a32ea26b', 'CABA', 'Capital Federal', 1800, 0, true),
  ('8b0f7d2c-9a3e-4b8f-a16d-3e0a7b9f2d5c', '29f0040b-2479-4c23-a036-aa03a32ea26b', 'GBA Norte', 'Vicente López, San Isidro, Tigre y zona', 2500, 1, true),
  ('3e7a1c5f-0b4d-4e3a-a91c-5d8b0e4a7c2f', '29f0040b-2479-4c23-a036-aa03a32ea26b', 'GBA Sur y Oeste', 'Lomas, Quilmes, Morón, La Matanza', 2800, 2, true),
  ('6f4c8b0e-5a2d-4f6c-a19a-4d7e0c8f5b2d', '29f0040b-2479-4c23-a036-aa03a32ea26b', 'Interior del país', 'Resto del país vía correo asegurado', 4500, 3, true);

-- =============================================
-- CUPONES DE PRUEBA
-- =============================================
INSERT INTO public.coupons (id, tenant_id, code, type, value, min_amount, max_uses, uses_count, expires_at, starts_at, active) VALUES
  ('d2b6f0a9-4c1e-4d2b-a85a-0e3c9d6b4f1e', '29f0040b-2479-4c23-a036-aa03a32ea26b', 'BIENVENIDA10', 'percent', 10, 100000, 100, 0, '2026-12-31T23:59:59Z', NOW(), true),
  ('1c9e5a3d-8f0b-4c9e-ab4d-7a1f0e5c3d8b', '29f0040b-2479-4c23-a036-aa03a32ea26b', 'CELTECH50K', 'fixed', 50000, 500000, 50, 0, '2026-12-31T23:59:59Z', NOW(), true);
