# Reference: `.env.local.example` base

Path destino: `.env.local.example`

Variables base que aplican a TODOS los planes. Los scaffolds específicos pueden agregar más:
- Esencial: solo las base.
- Emprendimiento / Empresa: las base + agregar nada extra (las credenciales de MP y Resend van en la tabla `tenants` de Supabase, no en .env).

```env
# === Supabase ===
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# === Multi-tenant ===
NEXT_PUBLIC_TENANT_ID=

# === Sitio ===
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com.ar

# === WhatsApp ===
NEXT_PUBLIC_WHATSAPP_NUMBER=549XXXXXXXXXX

# === Resend ===
# Las API keys van en tenants.resend_api_key (Supabase). Estas son solo de configuración.
RESEND_FROM_DOMAIN=tu-dominio.com.ar
RESEND_FROM_EMAIL=noreply@tu-dominio.com.ar
CONTACT_EMAIL=info@tu-dominio.com.ar

# === Umami ===
# IMPORTANTE: el ID debe ser el UUID que da Umami Cloud (ej: 550e8400-e29b-41d4-a716-446655440000)
# NO poner emails ni texto libre — la API de Umami devuelve 400 con valores inválidos
NEXT_PUBLIC_UMAMI_WEBSITE_ID=
NEXT_PUBLIC_UMAMI_SRC=https://cloud.umami.is/script.js
# Dominio de producción (sin https://) — evita que Umami dispare eventos en localhost
NEXT_PUBLIC_SITE_DOMAIN=
```

## Notas sobre credenciales

**MercadoPago (`mp_access_token`, `mp_public_key`):** NO van en .env. Se almacenan en `tenants.mp_access_token` y `tenants.mp_public_key`. Se leen en runtime desde la API.

**Resend API key:** NO va en .env. Se almacena en `tenants.resend_api_key`. Lo único que va en .env son los datos del remitente/destinatario.

**Envia.com (solo plan Empresa):** `tenants.envia_access_token` + `tenants.origin_*`.
