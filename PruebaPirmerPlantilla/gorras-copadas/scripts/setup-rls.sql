-- =============================================
-- GORRAS COPADAS — Setup inicial + RLS
-- Tenant ID: a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27
-- =============================================

-- 1. Insertar el tenant (omitir si ya existe)
INSERT INTO public.tenants (id, name, slug, url, plan, status, max_products)
VALUES (
  'a89cb741-b6d0-4d5b-a0fd-2d5a832a1b27',
  'Gorras Copadas',
  'gorras-copadas',
  'gorras.com.ar',
  'empresa',
  'active',
  NULL  -- empresa = ilimitado
)
ON CONFLICT (id) DO NOTHING;

-- 2. Habilitar RLS en todas las tablas
/* ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_tenants ENABLE ROW LEVEL SECURITY; */

-- 3. Políticas de LECTURA PÚBLICA (anon puede leer catálogo)
/* CREATE POLICY "public_read_products"
  ON public.products FOR SELECT USING (active = true);

CREATE POLICY "public_read_product_images"
  ON public.product_images FOR SELECT USING (true);

CREATE POLICY "public_read_product_variants"
  ON public.product_variants FOR SELECT USING (true);

CREATE POLICY "public_read_categories"
  ON public.categories FOR SELECT USING (active = true);

CREATE POLICY "public_read_subcategories"
  ON public.subcategories FOR SELECT USING (active = true); */

-- 4. Políticas de ESCRITURA — Solo service_role (bypass RLS en server)
-- Las operaciones de admin usan el cliente con service_role_key que bypasea RLS.
-- No se crean políticas de escritura para usuarios anon.

-- 5. Política de user_tenants — solo el user puede ver su membresía
/* CREATE POLICY "user_sees_own_memberships"
  ON public.user_tenants FOR SELECT
  USING (auth.uid() = user_id); */

-- 6. Contact messages — solo insertar (public), leer con service_role
/* CREATE POLICY "public_insert_contact"
  ON public.contact_messages FOR INSERT WITH CHECK (true);
 */
-- 7. Coupons — solo lectura con service_role (no exponer al público)
-- Sin política pública de lectura. El validate endpoint usa service_role.
