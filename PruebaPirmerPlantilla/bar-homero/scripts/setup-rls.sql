-- =============================================
-- RLS Policies — Bar Homero (Plan Emprendimiento)
-- Tenant: 73ae2f8c-37c6-4f6d-b5cf-450bdfe385a9
-- Idempotente: se puede ejecutar múltiples veces
-- =============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipping_zones ENABLE ROW LEVEL SECURITY;


-- =============================================
-- tenants
-- =============================================

DROP POLICY IF EXISTS "Users can view own tenants" ON public.tenants;

CREATE POLICY "Users can view own tenants"
  ON public.tenants FOR SELECT TO authenticated
  USING (
    id IN (SELECT tenant_id FROM public.user_tenants WHERE user_id = (SELECT auth.uid()))
  );


-- =============================================
-- user_tenants
-- =============================================

DROP POLICY IF EXISTS "Users can view own memberships" ON public.user_tenants;

CREATE POLICY "Users can view own memberships"
  ON public.user_tenants FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) = user_id);


-- =============================================
-- categories
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
-- subcategories
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
-- products
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
-- product_images
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
-- product_variants
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
-- orders (Emprendimiento)
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


-- =============================================
-- order_items (Emprendimiento)
-- =============================================

DROP POLICY IF EXISTS "Tenant members manage order items" ON public.order_items;

CREATE POLICY "Tenant members manage order items"
  ON public.order_items FOR ALL TO authenticated
  USING (
    tenant_id IN (SELECT tenant_id FROM public.user_tenants WHERE user_id = (SELECT auth.uid()))
  )
  WITH CHECK (
    tenant_id IN (SELECT tenant_id FROM public.user_tenants WHERE user_id = (SELECT auth.uid()))
  );


-- =============================================
-- coupons (Emprendimiento)
-- =============================================

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
-- shipping_zones (Emprendimiento)
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
