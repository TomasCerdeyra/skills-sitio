-- =============================================
-- RLS Setup + Tenant Creation — Plan Emprendimiento
-- Negocio: La Fermentada
-- Generado: 2026-05-12
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- =============================================
--
-- Este script:
-- 1. Crea el tenant en la tabla tenants (genera UUID automático)
-- 2. Habilita RLS en todas las tablas del plan
-- 3. Crea las políticas de seguridad
--
-- IMPORTANTE: Anotar el UUID del tenant que imprime al final.
-- Ese UUID se usa en:
--   - .env.local → NEXT_PUBLIC_TENANT_ID
--   - scripts/seed-data.sql → Ctrl+H reemplazar TODO_TENANT_ID
--
-- Si las políticas ya existen, los DROP POLICY IF EXISTS
-- las eliminan antes de recrearlas.
--

-- =============================================
-- 0. CREAR TENANT
-- =============================================
DO $$
DECLARE
  _tenant_id UUID;
BEGIN
  INSERT INTO public.tenants (name, slug, plan, status, max_products)
  VALUES ('La Fermentada', 'la-fermentada', 'emprendimiento', 'active', 200)
  RETURNING id INTO _tenant_id;

  RAISE NOTICE '';
  RAISE NOTICE '================================================';
  RAISE NOTICE '  ✅ TENANT CREADO';
  RAISE NOTICE '  UUID: %', _tenant_id;
  RAISE NOTICE '================================================';
  RAISE NOTICE '';
  RAISE NOTICE '  → Copiar este UUID y pegarlo en:';
  RAISE NOTICE '    1. .env.local → NEXT_PUBLIC_TENANT_ID=%', _tenant_id;
  RAISE NOTICE '    2. seed-data.sql → Ctrl+H TODO_TENANT_ID → %', _tenant_id;
  RAISE NOTICE '';
END $$;

-- =============================================
-- 1. Habilitar RLS en todas las tablas del plan
-- =============================================
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipping_zones ENABLE ROW LEVEL SECURITY;

-- =============================================
-- 2. Políticas — products
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

-- =============================================
-- 3. Políticas — product_images
-- =============================================
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

-- =============================================
-- 4. Políticas — product_variants
-- =============================================
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
-- 5. Políticas — categories
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

-- =============================================
-- 6. Políticas — subcategories
-- =============================================
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
-- 7. Políticas — shipping_zones
-- =============================================
DROP POLICY IF EXISTS "Public read active shipping zones" ON public.shipping_zones;
DROP POLICY IF EXISTS "Tenant members manage shipping zones" ON public.shipping_zones;

CREATE POLICY "Public read active shipping zones"
  ON public.shipping_zones FOR SELECT
  TO anon, authenticated
  USING (active = true);

CREATE POLICY "Tenant members manage shipping zones"
  ON public.shipping_zones FOR ALL TO authenticated
  USING (
    tenant_id IN (SELECT tenant_id FROM public.user_tenants WHERE user_id = (SELECT auth.uid()))
  )
  WITH CHECK (
    tenant_id IN (SELECT tenant_id FROM public.user_tenants WHERE user_id = (SELECT auth.uid()))
  );

-- =============================================
-- 8. Políticas — orders, order_items, coupons
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
-- 9. Políticas — tenants, user_tenants
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
