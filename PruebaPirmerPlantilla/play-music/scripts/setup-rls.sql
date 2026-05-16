-- =============================================
-- RLS Setup + Tenant Creation — Plan Empresa (Envia.com)
-- Negocio: Play Music
-- Slug: play-music
-- Generado: 2026-05-13
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- =============================================
--
-- Este script:
-- 1. Crea el tenant en la tabla tenants (genera UUID automático)
-- 2. Habilita RLS en todas las tablas del plan Empresa con Envia.com
-- 3. Crea las políticas de seguridad
--
-- IMPORTANTE: Anotar el UUID del tenant que imprime al final.
-- Ese UUID se usa en:
--   - .env.local → NEXT_PUBLIC_TENANT_ID
--   - scripts/seed-data.sql → Ctrl+H reemplazar TODO_TENANT_ID
--
-- Si las políticas ya existen, descomentar los DROP POLICY
-- IF EXISTS antes de crearlas (vienen comentados en cada bloque).
--
-- NOTA Envia.com: después de crear el tenant, completar en la tabla tenants:
--   UPDATE public.tenants SET
--     envia_access_token = 'TU_TOKEN_ENVIA',
--     origin_name = 'Play Music',
--     origin_phone = '1144005678',
--     origin_address = 'Av. Corrientes 1234',
--     origin_city = 'Buenos Aires',
--     origin_postal_code = '1043',
--     origin_state = 'CABA'
--   WHERE slug = 'play-music';
-- =============================================

-- =============================================
-- 0. CREAR TENANT
-- Plan Empresa: max_products = NULL (ilimitado)
-- =============================================
DO $$
DECLARE
  _tenant_id UUID;
BEGIN
  INSERT INTO public.tenants (name, slug, plan, status, max_products)
  VALUES ('Play Music', 'play-music', 'empresa', 'active', NULL)
  RETURNING id INTO _tenant_id;

  RAISE NOTICE '';
  RAISE NOTICE '================================================';
  RAISE NOTICE '  ✅ TENANT CREADO — Play Music';
  RAISE NOTICE '  UUID: %', _tenant_id;
  RAISE NOTICE '================================================';
  RAISE NOTICE '';
  RAISE NOTICE '  → Copiar este UUID y pegarlo en:';
  RAISE NOTICE '    1. .env.local → NEXT_PUBLIC_TENANT_ID=%', _tenant_id;
  RAISE NOTICE '    2. seed-data.sql → Ctrl+H TODO_TENANT_ID → %', _tenant_id;
  RAISE NOTICE '';
  RAISE NOTICE '  → Completar en tenants: envia_access_token + origin_*';
  RAISE NOTICE '';
END $$;

-- =============================================
-- 1. Habilitar RLS en tablas del plan Empresa (Envia.com)
-- =============================================
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_tenants ENABLE ROW LEVEL SECURITY;

-- Emprendimiento/Empresa
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;

-- NO habilitar shipping_zones (plan Empresa con Envia.com no la usa)
-- ALTER TABLE public.shipping_zones ENABLE ROW LEVEL SECURITY;

-- =============================================
-- 2. POLÍTICAS: products, product_images, product_variants
-- =============================================
DROP POLICY IF EXISTS "Public read active products" ON public.products;
DROP POLICY IF EXISTS "Tenant members read all products" ON public.products;
DROP POLICY IF EXISTS "Tenant members insert products" ON public.products;
DROP POLICY IF EXISTS "Tenant members update products" ON public.products;
DROP POLICY IF EXISTS "Tenant members delete products" ON public.products;

CREATE POLICY "Public read active products"
  ON public.products FOR SELECT
  TO anon, authenticated
  USING (active = true);

CREATE POLICY "Tenant members read all products"
  ON public.products FOR SELECT
  TO authenticated
  USING (
    tenant_id IN (SELECT tenant_id FROM public.user_tenants WHERE user_id = (SELECT auth.uid()))
  );

CREATE POLICY "Tenant members insert products"
  ON public.products FOR INSERT TO authenticated
  WITH CHECK (
    tenant_id IN (SELECT tenant_id FROM public.user_tenants WHERE user_id = (SELECT auth.uid()))
  );

CREATE POLICY "Tenant members update products"
  ON public.products FOR UPDATE TO authenticated
  USING (
    tenant_id IN (SELECT tenant_id FROM public.user_tenants WHERE user_id = (SELECT auth.uid()))
  );

CREATE POLICY "Tenant members delete products"
  ON public.products FOR DELETE TO authenticated
  USING (
    tenant_id IN (SELECT tenant_id FROM public.user_tenants WHERE user_id = (SELECT auth.uid()))
  );

DROP POLICY IF EXISTS "Public read product images" ON public.product_images;
DROP POLICY IF EXISTS "Tenant members manage product images" ON public.product_images;

CREATE POLICY "Public read product images"
  ON public.product_images FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Tenant members manage product images"
  ON public.product_images FOR ALL TO authenticated
  USING (
    tenant_id IN (SELECT tenant_id FROM public.user_tenants WHERE user_id = (SELECT auth.uid()))
  )
  WITH CHECK (
    tenant_id IN (SELECT tenant_id FROM public.user_tenants WHERE user_id = (SELECT auth.uid()))
  );

DROP POLICY IF EXISTS "Public read product variants" ON public.product_variants;
DROP POLICY IF EXISTS "Tenant members manage product variants" ON public.product_variants;

CREATE POLICY "Public read product variants"
  ON public.product_variants FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Tenant members manage product variants"
  ON public.product_variants FOR ALL TO authenticated
  USING (
    tenant_id IN (SELECT tenant_id FROM public.user_tenants WHERE user_id = (SELECT auth.uid()))
  )
  WITH CHECK (
    tenant_id IN (SELECT tenant_id FROM public.user_tenants WHERE user_id = (SELECT auth.uid()))
  );

-- =============================================
-- 3. POLÍTICAS: categories, subcategories
-- =============================================
DROP POLICY IF EXISTS "Public read active categories" ON public.categories;
DROP POLICY IF EXISTS "Tenant members manage categories" ON public.categories;

CREATE POLICY "Public read active categories"
  ON public.categories FOR SELECT
  TO anon, authenticated
  USING (active = true);

CREATE POLICY "Tenant members manage categories"
  ON public.categories FOR ALL TO authenticated
  USING (
    tenant_id IN (SELECT tenant_id FROM public.user_tenants WHERE user_id = (SELECT auth.uid()))
  )
  WITH CHECK (
    tenant_id IN (SELECT tenant_id FROM public.user_tenants WHERE user_id = (SELECT auth.uid()))
  );

DROP POLICY IF EXISTS "Public read active subcategories" ON public.subcategories;
DROP POLICY IF EXISTS "Tenant members manage subcategories" ON public.subcategories;

CREATE POLICY "Public read active subcategories"
  ON public.subcategories FOR SELECT
  TO anon, authenticated
  USING (active = true);

CREATE POLICY "Tenant members manage subcategories"
  ON public.subcategories FOR ALL TO authenticated
  USING (
    tenant_id IN (SELECT tenant_id FROM public.user_tenants WHERE user_id = (SELECT auth.uid()))
  )
  WITH CHECK (
    tenant_id IN (SELECT tenant_id FROM public.user_tenants WHERE user_id = (SELECT auth.uid()))
  );

-- =============================================
-- 4. POLÍTICAS: orders, order_items, coupons
-- NO shipping_zones (Rama A — Envia.com)
-- =============================================
DROP POLICY IF EXISTS "Tenant members manage orders" ON public.orders;

CREATE POLICY "Tenant members manage orders"
  ON public.orders FOR ALL TO authenticated
  USING (
    tenant_id IN (SELECT tenant_id FROM public.user_tenants WHERE user_id = (SELECT auth.uid()))
  )
  WITH CHECK (
    tenant_id IN (SELECT tenant_id FROM public.user_tenants WHERE user_id = (SELECT auth.uid()))
  );

DROP POLICY IF EXISTS "Tenant members manage order items" ON public.order_items;

CREATE POLICY "Tenant members manage order items"
  ON public.order_items FOR ALL TO authenticated
  USING (
    tenant_id IN (SELECT tenant_id FROM public.user_tenants WHERE user_id = (SELECT auth.uid()))
  )
  WITH CHECK (
    tenant_id IN (SELECT tenant_id FROM public.user_tenants WHERE user_id = (SELECT auth.uid()))
  );

DROP POLICY IF EXISTS "Tenant members manage coupons" ON public.coupons;

CREATE POLICY "Tenant members manage coupons"
  ON public.coupons FOR ALL TO authenticated
  USING (
    tenant_id IN (SELECT tenant_id FROM public.user_tenants WHERE user_id = (SELECT auth.uid()))
  )
  WITH CHECK (
    tenant_id IN (SELECT tenant_id FROM public.user_tenants WHERE user_id = (SELECT auth.uid()))
  );

-- =============================================
-- 5. POLÍTICAS: tenants, user_tenants
-- =============================================
DROP POLICY IF EXISTS "Users can view own tenants" ON public.tenants;

CREATE POLICY "Users can view own tenants"
  ON public.tenants FOR SELECT TO authenticated
  USING (
    id IN (SELECT tenant_id FROM public.user_tenants WHERE user_id = (SELECT auth.uid()))
  );

DROP POLICY IF EXISTS "Users can view own memberships" ON public.user_tenants;

CREATE POLICY "Users can view own memberships"
  ON public.user_tenants FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) = user_id);
