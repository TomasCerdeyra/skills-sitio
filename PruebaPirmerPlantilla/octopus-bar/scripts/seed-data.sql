-- =============================================
-- Seed Data — Café del Norte (rubro: cafetería de especialidad)
-- Generado: 2026-05-12
-- Ejecutar UNA SOLA VEZ después de setup-rls.sql
-- =============================================
--
-- setup-rls.sql ya creó el tenant. Copiar el UUID que imprimió
-- y pegarlo abajo reemplazando 2695d895-7a75-4bc9-a2ff-a568719079ee con Ctrl+H.
--
-- ORDEN: categorías → subcategorías → productos → imágenes → variantes → shipping_zones → cupones
--
-- Si querés borrar todo este seed:
--   DELETE FROM public.coupons WHERE tenant_id = 'TU-UUID';
--   DELETE FROM public.shipping_zones WHERE tenant_id = 'TU-UUID';
--   DELETE FROM public.product_variants WHERE tenant_id = 'TU-UUID';
--   DELETE FROM public.product_images WHERE tenant_id = 'TU-UUID';
--   DELETE FROM public.products WHERE tenant_id = 'TU-UUID';
--   DELETE FROM public.subcategories WHERE tenant_id = 'TU-UUID';
--   DELETE FROM public.categories WHERE tenant_id = 'TU-UUID';
-- =============================================

-- ⚠️ Ctrl+H: reemplazar 2695d895-7a75-4bc9-a2ff-a568719079ee con el UUID que imprimió setup-rls.sql

-- =============================================
-- CATEGORÍAS
-- =============================================
INSERT INTO public.categories (id, tenant_id, name, slug, position, active) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567801', '2695d895-7a75-4bc9-a2ff-a568719079ee', 'Cafetería',      'cafeteria',      0, true),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567802', '2695d895-7a75-4bc9-a2ff-a568719079ee', 'Pastelería',     'pasteleria',     1, true),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567803', '2695d895-7a75-4bc9-a2ff-a568719079ee', 'Sandwichería',   'sandwicheria',   2, true),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567804', '2695d895-7a75-4bc9-a2ff-a568719079ee', 'Bebidas frías',  'bebidas-frias',  3, true);

-- =============================================
-- SUBCATEGORÍAS
-- =============================================
INSERT INTO public.subcategories (id, tenant_id, category_id, name, slug, position, active) VALUES
  ('b1c2d3e4-f5a6-7890-bcde-ef1234567801', '2695d895-7a75-4bc9-a2ff-a568719079ee', 'a1b2c3d4-e5f6-7890-abcd-ef1234567801', 'Café caliente', 'cafe-caliente', 0, true),
  ('b1c2d3e4-f5a6-7890-bcde-ef1234567802', '2695d895-7a75-4bc9-a2ff-a568719079ee', 'a1b2c3d4-e5f6-7890-abcd-ef1234567801', 'Tés e infusiones', 'tes-infusiones', 1, true),
  ('b1c2d3e4-f5a6-7890-bcde-ef1234567803', '2695d895-7a75-4bc9-a2ff-a568719079ee', 'a1b2c3d4-e5f6-7890-abcd-ef1234567802', 'Masas y medialunas', 'masas-medialunas', 0, true),
  ('b1c2d3e4-f5a6-7890-bcde-ef1234567804', '2695d895-7a75-4bc9-a2ff-a568719079ee', 'a1b2c3d4-e5f6-7890-abcd-ef1234567802', 'Tortas y postres', 'tortas-postres', 1, true);

-- =============================================
-- PRODUCTOS
-- =============================================
INSERT INTO public.products (id, tenant_id, name, slug, description, price, compare_at_price, category_id, active, featured) VALUES
  ('c1d2e3f4-a5b6-7890-cdef-ef1234567801', '2695d895-7a75-4bc9-a2ff-a568719079ee',
    'Café americano', 'cafe-americano',
    'Café de tueste medio, recién molido, servido en taza grande. Aroma intenso, cuerpo balanceado. Disponible en tamaño mediano o doble.',
    1200, NULL, 'a1b2c3d4-e5f6-7890-abcd-ef1234567801', true, true),

  ('c1d2e3f4-a5b6-7890-cdef-ef1234567802', '2695d895-7a75-4bc9-a2ff-a568719079ee',
    'Cortado', 'cortado',
    'Espresso doble cortado con leche caliente. La medida perfecta entre café y leche. Intenso sin ser amargo.',
    1300, NULL, 'a1b2c3d4-e5f6-7890-abcd-ef1234567801', true, false),

  ('c1d2e3f4-a5b6-7890-cdef-ef1234567803', '2695d895-7a75-4bc9-a2ff-a568719079ee',
    'Capuchino', 'capuchino',
    'Espresso, leche vaporizada y un toque de cacao en polvo. Cremoso, suave y con esa espuma que no falta.',
    1500, NULL, 'a1b2c3d4-e5f6-7890-abcd-ef1234567801', true, true),

  ('c1d2e3f4-a5b6-7890-cdef-ef1234567804', '2695d895-7a75-4bc9-a2ff-a568719079ee',
    'Latte', 'latte',
    'Espresso con abundante leche vaporizada y microespuma sedosa. El favorito para empezar la mañana con calma.',
    1600, NULL, 'a1b2c3d4-e5f6-7890-abcd-ef1234567801', true, false),

  ('c1d2e3f4-a5b6-7890-cdef-ef1234567805', '2695d895-7a75-4bc9-a2ff-a568719079ee',
    'Medialuna de manteca', 'medialuna-de-manteca',
    'Hechas cada mañana con manteca, harina seleccionada y fermentación lenta. Doraditas, crujientes y esponjosas por dentro.',
    900, NULL, 'a1b2c3d4-e5f6-7890-abcd-ef1234567802', true, false),

  ('c1d2e3f4-a5b6-7890-cdef-ef1234567806', '2695d895-7a75-4bc9-a2ff-a568719079ee',
    'Cheesecake de frutos rojos', 'cheesecake-frutos-rojos',
    'Base de galletas artesanales, queso crema batido y salsa de frutos rojos hecha en casa. Una porción que vale la pausa.',
    2400, 2900, 'a1b2c3d4-e5f6-7890-abcd-ef1234567802', true, true),

  ('c1d2e3f4-a5b6-7890-cdef-ef1234567807', '2695d895-7a75-4bc9-a2ff-a568719079ee',
    'Brownie con helado', 'brownie-con-helado',
    'Brownie casero tibio con bocha de helado de crema americana. Para compartir o no, la decisión es tuya.',
    2600, NULL, 'a1b2c3d4-e5f6-7890-abcd-ef1234567802', true, false),

  ('c1d2e3f4-a5b6-7890-cdef-ef1234567808', '2695d895-7a75-4bc9-a2ff-a568719079ee',
    'Tostado de jamón y queso', 'tostado-jamon-queso',
    'Pan de campo con jamón cocido natural y queso por tabla. Servido caliente, con el queso derretido. Clásico que nunca falla.',
    3200, NULL, 'a1b2c3d4-e5f6-7890-abcd-ef1234567803', true, false),

  ('c1d2e3f4-a5b6-7890-cdef-ef1234567809', '2695d895-7a75-4bc9-a2ff-a568719079ee',
    'Sandwich de miga triple', 'sandwich-miga-triple',
    'Tres pisos de pan de miga sin corteza, con jamón, queso y tomate. Ideal para acompañar el café de las 11.',
    2800, NULL, 'a1b2c3d4-e5f6-7890-abcd-ef1234567803', true, false),

  ('c1d2e3f4-a5b6-7890-cdef-ef1234567810', '2695d895-7a75-4bc9-a2ff-a568719079ee',
    'Cold Brew', 'cold-brew',
    'Café infusionado en frío durante 12 horas. Suave, sin acidez, refrescante. La opción perfecta para los días de calor.',
    1800, NULL, 'a1b2c3d4-e5f6-7890-abcd-ef1234567804', true, false),

  ('c1d2e3f4-a5b6-7890-cdef-ef1234567811', '2695d895-7a75-4bc9-a2ff-a568719079ee',
    'Matcha latte', 'matcha-latte',
    'Matcha japonés de calidad ceremonial con leche vaporizada. Cremoso, terroso y con un verde que entra por los ojos.',
    2000, NULL, 'a1b2c3d4-e5f6-7890-abcd-ef1234567804', true, false),

  ('c1d2e3f4-a5b6-7890-cdef-ef1234567812', '2695d895-7a75-4bc9-a2ff-a568719079ee',
    'Espresso tónico', 'espresso-tonico',
    'Espresso doble sobre agua tónica con hielo. Amargo, efervescente, refrescante. Nuestro hit del verano.',
    1900, NULL, 'a1b2c3d4-e5f6-7890-abcd-ef1234567804', true, true);

-- =============================================
-- IMÁGENES (Unsplash — images.unsplash.com)
-- =============================================
INSERT INTO public.product_images (id, tenant_id, product_id, url, alt, position) VALUES
  ('d1e2f3a4-b5c6-7890-defa-ef1234567801', '2695d895-7a75-4bc9-a2ff-a568719079ee', 'c1d2e3f4-a5b6-7890-cdef-ef1234567801',
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80&auto=format&fit=crop', 'Café americano', 0),

  ('d1e2f3a4-b5c6-7890-defa-ef1234567802', '2695d895-7a75-4bc9-a2ff-a568719079ee', 'c1d2e3f4-a5b6-7890-cdef-ef1234567802',
    'https://images.unsplash.com/photo-1485808191679-5f86510bd9d4?w=800&q=80&auto=format&fit=crop', 'Cortado', 0),

  ('d1e2f3a4-b5c6-7890-defa-ef1234567803', '2695d895-7a75-4bc9-a2ff-a568719079ee', 'c1d2e3f4-a5b6-7890-cdef-ef1234567803',
    'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&q=80&auto=format&fit=crop', 'Capuchino', 0),

  ('d1e2f3a4-b5c6-7890-defa-ef1234567804', '2695d895-7a75-4bc9-a2ff-a568719079ee', 'c1d2e3f4-a5b6-7890-cdef-ef1234567804',
    'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80&auto=format&fit=crop', 'Latte', 0),

  ('d1e2f3a4-b5c6-7890-defa-ef1234567805', '2695d895-7a75-4bc9-a2ff-a568719079ee', 'c1d2e3f4-a5b6-7890-cdef-ef1234567805',
    'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80&auto=format&fit=crop', 'Medialuna de manteca', 0),

  ('d1e2f3a4-b5c6-7890-defa-ef1234567806', '2695d895-7a75-4bc9-a2ff-a568719079ee', 'c1d2e3f4-a5b6-7890-cdef-ef1234567806',
    'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80&auto=format&fit=crop', 'Cheesecake de frutos rojos', 0),

  ('d1e2f3a4-b5c6-7890-defa-ef1234567807', '2695d895-7a75-4bc9-a2ff-a568719079ee', 'c1d2e3f4-a5b6-7890-cdef-ef1234567807',
    'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80&auto=format&fit=crop', 'Brownie con helado', 0),

  ('d1e2f3a4-b5c6-7890-defa-ef1234567808', '2695d895-7a75-4bc9-a2ff-a568719079ee', 'c1d2e3f4-a5b6-7890-cdef-ef1234567808',
    'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=800&q=80&auto=format&fit=crop', 'Tostado de jamón y queso', 0),

  ('d1e2f3a4-b5c6-7890-defa-ef1234567809', '2695d895-7a75-4bc9-a2ff-a568719079ee', 'c1d2e3f4-a5b6-7890-cdef-ef1234567809',
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80&auto=format&fit=crop', 'Sandwich de miga triple', 0),

  ('d1e2f3a4-b5c6-7890-defa-ef1234567810', '2695d895-7a75-4bc9-a2ff-a568719079ee', 'c1d2e3f4-a5b6-7890-cdef-ef1234567810',
    'https://images.unsplash.com/photo-1442512435-cd787031a5e5?w=800&q=80&auto=format&fit=crop', 'Cold Brew', 0),

  ('d1e2f3a4-b5c6-7890-defa-ef1234567811', '2695d895-7a75-4bc9-a2ff-a568719079ee', 'c1d2e3f4-a5b6-7890-cdef-ef1234567811',
    'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80&auto=format&fit=crop', 'Matcha latte', 0),

  ('d1e2f3a4-b5c6-7890-defa-ef1234567812', '2695d895-7a75-4bc9-a2ff-a568719079ee', 'c1d2e3f4-a5b6-7890-cdef-ef1234567812',
    'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=800&q=80&auto=format&fit=crop', 'Espresso tónico', 0);

-- =============================================
-- VARIANTES (en productos con opciones de tamaño)
-- =============================================
INSERT INTO public.product_variants (id, tenant_id, product_id, name, sku, price, price_modifier, stock) VALUES
  -- Café americano: mediano / doble
  ('e1f2a3b4-c5d6-7890-efab-ef1234567801', '2695d895-7a75-4bc9-a2ff-a568719079ee', 'c1d2e3f4-a5b6-7890-cdef-ef1234567801', 'Mediano', 'CAF-AM-M', 1200, NULL, 80),
  ('e1f2a3b4-c5d6-7890-efab-ef1234567802', '2695d895-7a75-4bc9-a2ff-a568719079ee', 'c1d2e3f4-a5b6-7890-cdef-ef1234567801', 'Doble',   'CAF-AM-D', 1700, NULL, 80),

  -- Capuchino: chico / grande
  ('e1f2a3b4-c5d6-7890-efab-ef1234567803', '2695d895-7a75-4bc9-a2ff-a568719079ee', 'c1d2e3f4-a5b6-7890-cdef-ef1234567803', 'Chico',  'CAP-CH', 1300, NULL, 80),
  ('e1f2a3b4-c5d6-7890-efab-ef1234567804', '2695d895-7a75-4bc9-a2ff-a568719079ee', 'c1d2e3f4-a5b6-7890-cdef-ef1234567803', 'Grande', 'CAP-GR', 1700, NULL, 80),

  -- Cold Brew: regular / grande
  ('e1f2a3b4-c5d6-7890-efab-ef1234567805', '2695d895-7a75-4bc9-a2ff-a568719079ee', 'c1d2e3f4-a5b6-7890-cdef-ef1234567810', 'Regular 350ml', 'CB-R', 1800, NULL, 40),
  ('e1f2a3b4-c5d6-7890-efab-ef1234567806', '2695d895-7a75-4bc9-a2ff-a568719079ee', 'c1d2e3f4-a5b6-7890-cdef-ef1234567810', 'Grande 500ml',  'CB-G', 2300, NULL, 40),

  -- Sandwich de miga: sin TACC disponible
  ('e1f2a3b4-c5d6-7890-efab-ef1234567807', '2695d895-7a75-4bc9-a2ff-a568719079ee', 'c1d2e3f4-a5b6-7890-cdef-ef1234567809', 'Clásico',    'SM-CL', 2800, NULL, 30),
  ('e1f2a3b4-c5d6-7890-efab-ef1234567808', '2695d895-7a75-4bc9-a2ff-a568719079ee', 'c1d2e3f4-a5b6-7890-cdef-ef1234567809', 'Sin TACC',   'SM-ST', 3200, NULL, 15);

-- =============================================
-- ZONAS DE ENVÍO (Plan Emprendimiento)
-- =============================================
INSERT INTO public.shipping_zones (id, tenant_id, name, description, price, position, active) VALUES
  ('f1a2b3c4-d5e6-7890-fabc-ef1234567801', '2695d895-7a75-4bc9-a2ff-a568719079ee', 'CABA',         'Capital Federal',                              1500, 0, true),
  ('f1a2b3c4-d5e6-7890-fabc-ef1234567802', '2695d895-7a75-4bc9-a2ff-a568719079ee', 'GBA Norte',    'Vicente López, San Isidro, Tigre y zona',      2200, 1, true),
  ('f1a2b3c4-d5e6-7890-fabc-ef1234567803', '2695d895-7a75-4bc9-a2ff-a568719079ee', 'GBA Sur/Oeste','Lomas, Quilmes, Morón, La Matanza',            2500, 2, true),
  ('f1a2b3c4-d5e6-7890-fabc-ef1234567804', '2695d895-7a75-4bc9-a2ff-a568719079ee', 'Interior',     'Resto del país (vía correo o mensajería)',     4500, 3, true);

-- =============================================
-- CUPONES DE PRUEBA (Plan Emprendimiento)
-- =============================================
INSERT INTO public.coupons (id, tenant_id, code, type, value, min_amount, max_uses, uses_count, expires_at, starts_at, active) VALUES
  ('a9b8c7d6-e5f4-3210-abcd-ef1234567701', '2695d895-7a75-4bc9-a2ff-a568719079ee',
    'BIENVENIDA10', 'percent', 10, 5000, 100, 0, '2027-12-31T23:59:59Z', NOW(), true),
  ('a9b8c7d6-e5f4-3210-abcd-ef1234567702', '2695d895-7a75-4bc9-a2ff-a568719079ee',
    'PRIMERAVEZ', 'fixed', 2000, 8000, 50, 0, '2027-12-31T23:59:59Z', NOW(), true);
