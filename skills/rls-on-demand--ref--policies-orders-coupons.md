# Reference: Políticas RLS para `orders`, `order_items`, `coupons`

**Aplica a:** Plan Emprendimiento y Empresa (cualquier sub-rama).
**No aplica a:** Plan Esencial.

```sql
-- =============================================
-- orders
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
-- order_items
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
-- coupons
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
```

## Notas

- `orders`, `order_items` y `coupons` no tienen lectura pública. El storefront NO consulta estas tablas con anon key — siempre se accede desde API routes con service_role.
- La validación de cupones desde el storefront se hace vía `/api/coupons/validate` que usa service_role.
- La creación de orders se hace vía `/api/create-preference` que usa service_role.
