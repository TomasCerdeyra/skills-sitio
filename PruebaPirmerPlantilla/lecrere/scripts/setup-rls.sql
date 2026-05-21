-- =============================================
-- Setup RLS — Lecrere (Plan Emprendimiento)
-- Ejecutar UNA SOLA VEZ antes del seed-data.sql
-- =============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE public.tenants         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subcategories   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipping_zones  ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura pública (catálogo visible sin autenticación)
CREATE POLICY "public_read_categories"   ON public.categories     FOR SELECT USING (active = true);
CREATE POLICY "public_read_subcategories" ON public.subcategories FOR SELECT USING (active = true);
CREATE POLICY "public_read_products"     ON public.products       FOR SELECT USING (active = true);
CREATE POLICY "public_read_images"       ON public.product_images FOR SELECT USING (true);
CREATE POLICY "public_read_variants"     ON public.product_variants FOR SELECT USING (true);
CREATE POLICY "public_read_zones"        ON public.shipping_zones  FOR SELECT USING (active = true);

-- Políticas para service_role (admin panel + API routes con admin client)
CREATE POLICY "service_all_orders"    ON public.orders      FOR ALL USING (true);
CREATE POLICY "service_all_items"     ON public.order_items FOR ALL USING (true);
CREATE POLICY "service_all_coupons"   ON public.coupons     FOR ALL USING (true);
CREATE POLICY "service_all_products"  ON public.products    FOR ALL USING (true);
CREATE POLICY "service_all_images"    ON public.product_images FOR ALL USING (true);
CREATE POLICY "service_all_variants"  ON public.product_variants FOR ALL USING (true);
CREATE POLICY "service_all_zones"     ON public.shipping_zones  FOR ALL USING (true);
CREATE POLICY "service_all_tenants"   ON public.tenants         FOR ALL USING (true);
