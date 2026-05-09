# Reference: Políticas RLS para `shipping_zones`

**Aplica a:**
- ✅ Plan Emprendimiento (siempre)
- ✅ Plan Empresa con zonas fijas (sin Envia.com)
- ❌ Plan Empresa con Envia.com (NO incluir este bloque)
- ❌ Plan Esencial (NO usa la tabla)

```sql
-- =============================================
-- shipping_zones
-- =============================================
DROP POLICY IF EXISTS "Public read active shipping zones" ON public.shipping_zones;
DROP POLICY IF EXISTS "Tenant members manage shipping zones" ON public.shipping_zones;

-- Lectura pública de zonas activas (el checkout las muestra al comprador)
CREATE POLICY "Public read active shipping zones"
  ON public.shipping_zones FOR SELECT
  TO anon, authenticated
  USING (active = true);

-- Tenant members gestionan zonas (lectura completa + escritura)
CREATE POLICY "Tenant members manage shipping zones"
  ON public.shipping_zones FOR ALL TO authenticated
  USING (
    tenant_id IN (SELECT tenant_id FROM public.user_tenants WHERE user_id = (SELECT auth.uid()))
  )
  WITH CHECK (
    tenant_id IN (SELECT tenant_id FROM public.user_tenants WHERE user_id = (SELECT auth.uid()))
  );
```
