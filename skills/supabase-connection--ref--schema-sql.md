# Reference: Schema SQL completo (CREATE TABLE)

**Cuándo usar este archivo:** SOLO cuando se monta una nueva instancia de Supabase desde cero.

**No ejecutar** este SQL si la instancia de SitioHoy ya existe — las tablas ya están creadas.

Pegar todo el bloque en el **SQL Editor de Supabase** del proyecto nuevo.

```sql
-- =============================================
-- TENANTS
-- =============================================
CREATE TABLE IF NOT EXISTS public.tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  mp_access_token TEXT,
  mp_public_key TEXT,
  url TEXT UNIQUE,
  resend_api_key TEXT,
  plan TEXT,                              -- 'esencial' | 'emprendimiento' | 'empresa'
  status TEXT,
  max_products INTEGER,                   -- 50 / 200 / NULL (ilimitado)
  created_at TIMESTAMPTZ DEFAULT now(),
  umami_url TEXT,
  envia_access_token TEXT,                -- Solo plan Empresa con envíos automáticos
  subscription_id TEXT,
  subscription_status TEXT,
  current_period_end TIMESTAMPTZ,
  origin_name TEXT,                       -- Para Envia.com (plan Empresa)
  origin_phone TEXT,
  origin_address TEXT,
  origin_city TEXT,
  origin_postal_code TEXT,
  origin_state TEXT
);

-- =============================================
-- USER TENANTS (membresía)
-- =============================================
CREATE TABLE IF NOT EXISTS public.user_tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  role TEXT,                              -- 'owner' | 'admin' | 'editor'
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- CATEGORIES
-- =============================================
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  position INTEGER,
  active BOOLEAN
);

-- =============================================
-- SUBCATEGORIES
-- =============================================
CREATE TABLE IF NOT EXISTS public.subcategories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  category_id UUID NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  active BOOLEAN,
  position INTEGER
);

-- =============================================
-- PRODUCTS
-- =============================================
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id),
  active BOOLEAN,
  featured BOOLEAN,
  description TEXT,
  slug TEXT,
  category_id UUID REFERENCES public.categories(id),
  compare_at_price NUMERIC
);

-- =============================================
-- PRODUCT IMAGES (tabla separada, no array en products)
-- =============================================
CREATE TABLE IF NOT EXISTS public.product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt TEXT,
  position INTEGER,
  tenant_id UUID NOT NULL
);

-- =============================================
-- PRODUCT VARIANTS
-- =============================================
CREATE TABLE IF NOT EXISTS public.product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sku TEXT,
  stock INTEGER,
  price_modifier NUMERIC,
  tenant_id UUID NOT NULL,
  price NUMERIC
);

-- =============================================
-- SHIPPING ZONES (Emprendimiento siempre, Empresa cuando NO usa Envia.com)
-- =============================================
CREATE TABLE IF NOT EXISTS public.shipping_zones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  name TEXT NOT NULL,                     -- "CABA", "GBA", "Interior"
  description TEXT,
  price NUMERIC NOT NULL,                 -- Costo fijo del envío para esta zona
  position INTEGER,
  active BOOLEAN
);

-- =============================================
-- ORDERS (Emprendimiento y Empresa)
-- =============================================
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  mp_payment_id TEXT,
  status TEXT,                            -- 'created' | 'pending' | 'approved' | 'cancelled' | 'rejected'
  total NUMERIC,
  payer_email TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  currency TEXT DEFAULT 'ARS',
  payment_status TEXT,
  payment_provider TEXT DEFAULT 'mercadopago',
  external_reference TEXT,
  customer_first_name TEXT,
  customer_last_name TEXT,
  customer_phone TEXT,
  shipping_address JSONB,                 -- { street, city, state, postal_code, notes? }
  tracking_token TEXT UNIQUE DEFAULT gen_random_uuid()::text,
  notes TEXT,
  -- Columnas de envío (rellenar según provider de envío)
  shipping_carrier TEXT,                  -- "OCA", "Andreani", "Correo Argentino", o nombre de zona
  shipping_service TEXT,                  -- "Estándar", "Express", null si es zona fija
  shipping_cost NUMERIC,
  shipping_label_url TEXT,                -- URL de la etiqueta (solo Envia.com)
  shipping_tracking_number TEXT,
  shipping_postal_code TEXT,
  -- Columnas de cupón
  coupon_code TEXT,
  discount_amount NUMERIC
);

-- =============================================
-- ORDER ITEMS (Emprendimiento y Empresa)
-- =============================================
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id),
  variant_id UUID REFERENCES public.product_variants(id),
  name TEXT NOT NULL,
  variant_name TEXT,
  quantity INTEGER NOT NULL,
  unit_price NUMERIC NOT NULL,
  tenant_id UUID NOT NULL
);

-- =============================================
-- COUPONS (Emprendimiento y Empresa)
-- =============================================
CREATE TABLE IF NOT EXISTS public.coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  code TEXT NOT NULL,
  type TEXT NOT NULL,                     -- 'percent' | 'fixed'
  value NUMERIC NOT NULL,
  min_amount NUMERIC,
  max_uses INTEGER,
  uses_count INTEGER,
  expires_at TIMESTAMPTZ,
  active BOOLEAN,
  starts_at TIMESTAMPTZ
);

-- =============================================
-- ÍNDICES recomendados (mejoran performance de queries comunes)
-- =============================================
CREATE INDEX IF NOT EXISTS idx_products_tenant_active ON public.products(tenant_id, active);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(tenant_id, slug);
CREATE INDEX IF NOT EXISTS idx_categories_tenant ON public.categories(tenant_id, active, position);
CREATE INDEX IF NOT EXISTS idx_subcategories_category ON public.subcategories(category_id, active);
CREATE INDEX IF NOT EXISTS idx_product_images_product ON public.product_images(product_id, position);
CREATE INDEX IF NOT EXISTS idx_product_variants_product ON public.product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_shipping_zones_tenant ON public.shipping_zones(tenant_id, active, position);
CREATE INDEX IF NOT EXISTS idx_orders_tenant_status ON public.orders(tenant_id, status);
CREATE INDEX IF NOT EXISTS idx_orders_external_ref ON public.orders(external_reference);
CREATE INDEX IF NOT EXISTS idx_orders_mp_payment ON public.orders(mp_payment_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_coupons_tenant_code ON public.coupons(tenant_id, code);
CREATE INDEX IF NOT EXISTS idx_user_tenants_user ON public.user_tenants(user_id);
CREATE INDEX IF NOT EXISTS idx_user_tenants_tenant ON public.user_tenants(tenant_id);
```

## Después de ejecutar el SQL

1. Crear el bucket de storage — ver skill `supabase-storage`.
2. Habilitar RLS y crear políticas — ver skill `rls-on-demand`.
3. Insertar el tenant inicial — ver skill `supabase-connection` (sección "Insertar tenant inicial").
