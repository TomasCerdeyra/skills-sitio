-- =============================================
-- Seed Data — Bar Homero (rubro: bar/bebidas)
-- Tenant: 73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9
-- Generado: 2026-05-08
-- Ejecutar UNA SOLA VEZ después de setup-rls.sql
-- =============================================
--
-- Este SQL pobla la base con productos de ejemplo para que la plantilla
-- se vea completa en el preview. Después de aprobar la plantilla, el
-- dueño del negocio gestionará su catálogo real desde el admin panel.
--
-- Si querés borrar todo este seed antes de cargar productos reales:
--   DELETE FROM public.product_variants WHERE tenant_id = '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9';
--   DELETE FROM public.product_images WHERE tenant_id = '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9';
--   DELETE FROM public.products WHERE tenant_id = '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9';
--   DELETE FROM public.subcategories WHERE tenant_id = '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9';
--   DELETE FROM public.categories WHERE tenant_id = '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9';
--   DELETE FROM public.shipping_zones WHERE tenant_id = '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9';
--   DELETE FROM public.coupons WHERE tenant_id = '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9';
-- =============================================

-- Insertar tenant primero si no existe
INSERT INTO public.tenants (id, name, slug)
VALUES ('73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9', 'Bar Homero', 'bar-homero')
ON CONFLICT (id) DO NOTHING;


-- =============================================
-- CATEGORÍAS
-- =============================================
INSERT INTO public.categories (id, tenant_id, name, slug, position, active) VALUES
  ('a1000000-0000-0000-0000-000000000001', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9', 'Bebidas', 'bebidas', 0, true),
  ('a1000000-0000-0000-0000-000000000002', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9', 'Cervezas', 'cervezas', 1, true),
  ('a1000000-0000-0000-0000-000000000003', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9', 'Tragos', 'tragos', 2, true),
  ('a1000000-0000-0000-0000-000000000004', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9', 'Picadas y Comidas', 'picadas-comidas', 3, true),
  ('a1000000-0000-0000-0000-000000000005', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9', 'Vinos', 'vinos', 4, true);


-- =============================================
-- SUBCATEGORÍAS
-- =============================================
INSERT INTO public.subcategories (id, tenant_id, category_id, name, slug, position, active) VALUES
  ('b1000000-0000-0000-0000-000000000001', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9', 'a1000000-0000-0000-0000-000000000001', 'Sin alcohol', 'sin-alcohol', 0, true),
  ('b1000000-0000-0000-0000-000000000002', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9', 'a1000000-0000-0000-0000-000000000001', 'Con alcohol', 'con-alcohol', 1, true),
  ('b1000000-0000-0000-0000-000000000003', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9', 'a1000000-0000-0000-0000-000000000002', 'Artesanales', 'artesanales', 0, true),
  ('b1000000-0000-0000-0000-000000000004', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9', 'a1000000-0000-0000-0000-000000000002', 'Importadas', 'importadas', 1, true),
  ('b1000000-0000-0000-0000-000000000005', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9', 'a1000000-0000-0000-0000-000000000003', 'Clásicos', 'clasicos', 0, true),
  ('b1000000-0000-0000-0000-000000000006', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9', 'a1000000-0000-0000-0000-000000000003', 'Modernos', 'modernos', 1, true);


-- =============================================
-- PRODUCTOS
-- =============================================
INSERT INTO public.products (id, tenant_id, name, slug, description, price, compare_at_price, category_id, active, featured) VALUES

  -- Bebidas
  ('c1000000-0000-0000-0000-000000000001', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9',
    'Fernet con Coca',
    'fernet-con-coca',
    'El clásico que une a todos. Fernet Branca con Coca-Cola bien fría, hielo en abundancia y rodaja de limón. Se sirve en vaso largo.',
    1800, NULL,
    'a1000000-0000-0000-0000-000000000001', true, false),

  ('c1000000-0000-0000-0000-000000000002', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9',
    'Limonada con Menta',
    'limonada-con-menta',
    'Limonada natural con hojas de menta fresca y pepitas de pomelo. Sin alcohol, ideal para las noches de calor.',
    1200, NULL,
    'a1000000-0000-0000-0000-000000000001', true, false),

  -- Cervezas
  ('c1000000-0000-0000-0000-000000000003', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9',
    'IPA Artesanal',
    'ipa-artesanal',
    'Lupulada e intensa, con notas de pomelo y pino. Elaborada en microbrewery local, amargura equilibrada y final largo. La preferida de los que saben.',
    1600, NULL,
    'a1000000-0000-0000-0000-000000000002', true, true),

  ('c1000000-0000-0000-0000-000000000004', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9',
    'Rubia Artesanal',
    'rubia-artesanal',
    'Suave, espumosa y refrescante. Fermentada con levaduras propias, tiene un color dorado brillante y un regusto ligeramente dulce.',
    1400, NULL,
    'a1000000-0000-0000-0000-000000000002', true, false),

  ('c1000000-0000-0000-0000-000000000005', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9',
    'Stout Oscura',
    'stout-oscura',
    'Oscura, cremosa y con aroma a café tostado. Para los que no tienen miedo al cuerpo. Maridaje ideal con la tabla de fiambres.',
    1700, NULL,
    'a1000000-0000-0000-0000-000000000002', true, false),

  -- Tragos
  ('c1000000-0000-0000-0000-000000000006', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9',
    'Aperol Spritz',
    'aperol-spritz',
    'Aperol, prosecco italiano, soda y rodaja de naranja. Fresco, ligeramente amargo y elegante. El aperitivo que nunca falla.',
    2200, NULL,
    'a1000000-0000-0000-0000-000000000003', true, true),

  ('c1000000-0000-0000-0000-000000000007', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9',
    'Daiquiri de Frutilla',
    'daiquiri-frutilla',
    'Ron blanco, frutillas frescas de temporada, jugo de limón y azúcar. Batido y servido bien frío en copa de cocktail.',
    2000, NULL,
    'a1000000-0000-0000-0000-000000000003', true, false),

  ('c1000000-0000-0000-0000-000000000008', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9',
    'Negroni',
    'negroni',
    'Gin, Campari y vermouth rosso a partes iguales. Con cáscara de naranja y una esfera de hielo. Para los que buscan carácter.',
    2400, NULL,
    'a1000000-0000-0000-0000-000000000003', true, false),

  -- Picadas y Comidas
  ('c1000000-0000-0000-0000-000000000009', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9',
    'Tabla de Fiambres y Quesos',
    'tabla-fiambres',
    'Selección de salame artesanal, jamón cocido natural, queso cremoso, brie y gouda. Con aceitunas marinadas, pepinillos y pan de campo.',
    4500, NULL,
    'a1000000-0000-0000-0000-000000000004', true, true),

  ('c1000000-0000-0000-0000-000000000010', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9',
    'Papas Fritas con Cheddar',
    'papas-fritas-cheddar',
    'Papas rústicas crocantes bañadas en salsa de cheddar casero. El acompañamiento ideal para cualquier bebida.',
    1600, NULL,
    'a1000000-0000-0000-0000-000000000004', true, false),

  -- Vinos
  ('c1000000-0000-0000-0000-000000000011', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9',
    'Malbec - Copa',
    'malbec-copa',
    'Selección de bodegas mendocinas de alta gama. Cuerpo pleno, taninos sedosos, notas de ciruela y especias. Perfecto para la tarde.',
    1800, NULL,
    'a1000000-0000-0000-0000-000000000005', true, false),

  ('c1000000-0000-0000-0000-000000000012', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9',
    'Sauvignon Blanc - Copa',
    'sauvignon-blanc-copa',
    'Fresco, mineral y afrutado. Con notas de pomelo, maracuyá y un final limpio. Ideal para las noches de verano.',
    1800, NULL,
    'a1000000-0000-0000-0000-000000000005', true, false);


-- =============================================
-- IMÁGENES
-- =============================================
INSERT INTO public.product_images (id, tenant_id, product_id, url, alt, position) VALUES
  ('d1000000-0000-0000-0000-000000000001', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9', 'c1000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&q=80&auto=format&fit=crop', 'Fernet con Coca', 0),
  ('d1000000-0000-0000-0000-000000000002', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9', 'c1000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800&q=80&auto=format&fit=crop', 'Limonada con menta', 0),
  ('d1000000-0000-0000-0000-000000000003', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9', 'c1000000-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800&q=80&auto=format&fit=crop', 'IPA Artesanal', 0),
  ('d1000000-0000-0000-0000-000000000004', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9', 'c1000000-0000-0000-0000-000000000004', 'https://images.unsplash.com/photo-1565718822353-06b7a5f7c9e0?w=800&q=80&auto=format&fit=crop', 'Cerveza Rubia', 0),
  ('d1000000-0000-0000-0000-000000000005', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9', 'c1000000-0000-0000-0000-000000000005', 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=800&q=80&auto=format&fit=crop', 'Stout Oscura', 0),
  ('d1000000-0000-0000-0000-000000000006', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9', 'c1000000-0000-0000-0000-000000000006', 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=800&q=80&auto=format&fit=crop', 'Aperol Spritz', 0),
  ('d1000000-0000-0000-0000-000000000007', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9', 'c1000000-0000-0000-0000-000000000007', 'https://images.unsplash.com/photo-1551751299-1b51cab2694c?w=800&q=80&auto=format&fit=crop', 'Daiquiri de Frutilla', 0),
  ('d1000000-0000-0000-0000-000000000008', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9', 'c1000000-0000-0000-0000-000000000008', 'https://images.unsplash.com/photo-1436935439985-196e1f2f1c9e?w=800&q=80&auto=format&fit=crop', 'Negroni', 0),
  ('d1000000-0000-0000-0000-000000000009', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9', 'c1000000-0000-0000-0000-000000000009', 'https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=800&q=80&auto=format&fit=crop', 'Tabla de Fiambres', 0),
  ('d1000000-0000-0000-0000-000000000010', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9', 'c1000000-0000-0000-0000-000000000010', 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=80&auto=format&fit=crop', 'Papas Fritas con Cheddar', 0),
  ('d1000000-0000-0000-0000-000000000011', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9', 'c1000000-0000-0000-0000-000000000011', 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80&auto=format&fit=crop', 'Malbec Copa', 0),
  ('d1000000-0000-0000-0000-000000000012', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9', 'c1000000-0000-0000-0000-000000000012', 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=800&q=80&auto=format&fit=crop', 'Sauvignon Blanc Copa', 0);


-- =============================================
-- VARIANTES (en 4 productos)
-- =============================================
INSERT INTO public.product_variants (id, tenant_id, product_id, name, price, price_modifier, stock) VALUES

  -- IPA (pinta vs media pinta)
  ('e1000000-0000-0000-0000-000000000001', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9', 'c1000000-0000-0000-0000-000000000003', 'Pinta (500ml)', 1600, 0, 30),
  ('e1000000-0000-0000-0000-000000000002', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9', 'c1000000-0000-0000-0000-000000000003', 'Media Pinta (250ml)', 950, -650, 30),

  -- Rubia
  ('e1000000-0000-0000-0000-000000000003', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9', 'c1000000-0000-0000-0000-000000000004', 'Pinta (500ml)', 1400, 0, 30),
  ('e1000000-0000-0000-0000-000000000004', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9', 'c1000000-0000-0000-0000-000000000004', 'Media Pinta (250ml)', 850, -550, 30),

  -- Tabla de Fiambres (para 2 / para 4)
  ('e1000000-0000-0000-0000-000000000005', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9', 'c1000000-0000-0000-0000-000000000009', 'Para 2 personas', 4500, 0, 15),
  ('e1000000-0000-0000-0000-000000000006', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9', 'c1000000-0000-0000-0000-000000000009', 'Para 4 personas', 7500, 3000, 10),

  -- Vinos (copa vs botella)
  ('e1000000-0000-0000-0000-000000000007', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9', 'c1000000-0000-0000-0000-000000000011', 'Copa', 1800, 0, 25),
  ('e1000000-0000-0000-0000-000000000008', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9', 'c1000000-0000-0000-0000-000000000011', 'Botella (750ml)', 6500, 4700, 15),
  ('e1000000-0000-0000-0000-000000000009', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9', 'c1000000-0000-0000-0000-000000000012', 'Copa', 1800, 0, 25),
  ('e1000000-0000-0000-0000-000000000010', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9', 'c1000000-0000-0000-0000-000000000012', 'Botella (750ml)', 6500, 4700, 15);


-- =============================================
-- ZONAS DE ENVÍO (Emprendimiento)
-- =============================================
INSERT INTO public.shipping_zones (id, tenant_id, name, description, price, position, active) VALUES
  ('f1000000-0000-0000-0000-000000000001', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9', 'Retiro en el local', 'Retirás vos mismo en Bar Homero', 0, 0, true),
  ('f1000000-0000-0000-0000-000000000002', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9', 'CABA', 'Capital Federal — entrega el mismo día', 1500, 1, true),
  ('f1000000-0000-0000-0000-000000000003', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9', 'GBA Norte', 'Vicente López, San Isidro, Tigre y zona', 2200, 2, true),
  ('f1000000-0000-0000-0000-000000000004', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9', 'GBA Sur y Oeste', 'Lomas, Quilmes, Morón, La Matanza', 2500, 3, true);


-- =============================================
-- CUPONES DE PRUEBA (Emprendimiento)
-- =============================================
INSERT INTO public.coupons (id, tenant_id, code, type, value, min_amount, max_uses, uses_count, expires_at, starts_at, active) VALUES
  ('71000000-0000-0000-0000-000000000001', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9', 'BIENVENIDA10', 'percent', 10, 5000, 100, 0, '2026-12-31T23:59:59Z', NOW(), true),
  ('71000000-0000-0000-0000-000000000002', '73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9', 'HOMERO5000', 'fixed', 5000, 20000, 50, 0, '2026-12-31T23:59:59Z', NOW(), true);
