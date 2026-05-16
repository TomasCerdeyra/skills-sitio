---
name: scaffold-base
description: Genera la base técnica común a todos los scaffolds de SitioHoy (Esencial, Emprendimiento, Empresa). Crea el proyecto Next.js + TypeScript + Tailwind + App Router, configura Supabase multi-tenant (cliente browser/server/admin/proxy), helpers compartidos (tenant, WhatsApp), endpoints comunes (tenant-config, contact), auth (login/signup/signout), y el archivo .env.local.example. Este skill es invocado SIEMPRE como primer paso por scaffold-esencial, scaffold-emprendimiento y scaffold-empresa antes de agregar lo específico del plan. Usar también si se quiere recrear los archivos base de un proyecto existente.
---

# Skill: Scaffold Base

Base técnica común a los 3 planes. Los scaffolds específicos (Esencial, Emprendimiento, Empresa) invocan este skill primero y luego agregan lo particular del plan.

## Inputs requeridos

Estos los pide el scaffold que llama a este (no este skill directamente):

1. Nombre del cliente
2. Slug (carpeta del proyecto)
3. Tenant ID (UUID)
4. Dominio final
5. Número de WhatsApp del negocio
6. Plan (`esencial` | `emprendimiento` | `empresa`)

Si se invoca este skill solo, preguntar 1-5. El plan no es necesario para la base.

---

## Paso 1 — Crear proyecto Next.js

```bash
npx create-next-app@latest <slug> --typescript --tailwind --app --src-dir=false --import-alias="@/*"
cd <slug>
```

**IMPORTANTE — Limpiar archivos default de Next.js:**
```bash
# Borrar la página default que crea create-next-app (interfiere con app/(public)/page.tsx)
rm app/page.tsx
# Borrar assets default que no se usan
rm -f public/next.svg public/vercel.svg public/file.svg public/globe.svg public/window.svg
```

> ⚠️ Si NO se borra `app/page.tsx`, la ruta `/` muestra "To get started, edit the page.tsx file" en vez de la home real que está en `app/(public)/page.tsx`.

---

### ⚠️ Paso 1.5 — Detectar versión de Tailwind antes de continuar

`create-next-app@latest` instala **Tailwind CSS v4** desde fines de 2024. La sintaxis es **incompatible con v3** — usar la sintaxis equivocada resulta en una página sin ningún estilo (texto plano, todo apilado verticalmente).

```bash
# Verificar versión instalada
cat package.json | grep tailwindcss
```

| Versión encontrada | Sintaxis requerida |
|---|---|
| `tailwindcss >= 4.x` | `@import "tailwindcss"` + `@theme {}` en globals.css. **NO** usar `@tailwind base/components/utilities`. |
| `tailwindcss 3.x` | Sintaxis clásica `@tailwind base/components/utilities` + `tailwind.config.ts` con `theme.extend`. |

**Regla crítica para v4:**
- El `app/globals.css` generado por `create-next-app` ya tiene la sintaxis correcta. **NO sobreescribir con sintaxis v3.**
- Los tokens de color, fuente y animación van en `@theme {}` dentro del CSS.
- El `tailwind.config.ts` es **ignorado** en v4 salvo que se referencie con `@config` explícitamente.
- Ver `sitio-diseno--ref--colores.md` y `sitio-diseno--ref--tipografia.md` para la sintaxis v4 correcta.

---

### ⚠️ Paso 1.6 — Configurar `next.config.ts` con `remotePatterns`

Las plantillas usan imágenes de Unsplash y Picsum. El componente `<Image>` de Next.js lanza error de runtime si el hostname externo no está en `remotePatterns`. Agregar **siempre** al crear el proyecto:

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
```

> Si el cliente después sube imágenes propias (Supabase Storage), agregar el hostname del bucket de Supabase al array.

**Alternativa para thumbnails pequeños (carrito, avatares):** usar `<img>` nativo en lugar de `<Image>` de Next.js. Para imágenes de ≤ 100px no hay beneficio real de optimización y evita el problema de `remotePatterns`.

Instalar dependencias base (Supabase + Resend siempre, mercadopago solo si plan != esencial):

```bash
# Siempre
npm install @supabase/ssr @supabase/supabase-js resend
npm install -D @types/node

# Solo si plan = emprendimiento o empresa
npm install mercadopago @mercadopago/sdk-react
```

---

## Paso 2 — Estructura de carpetas base

```
<slug>/
├── app/
│   ├── (public)/
│   │   ├── page.tsx                     # placeholder
│   │   ├── nosotros/page.tsx            # placeholder
│   │   ├── contacto/page.tsx            # placeholder
│   │   └── layout.tsx                   # placeholder
│   ├── api/
│   │   ├── tenant-config/route.ts
│   │   └── contact/route.ts
│   ├── login/page.tsx
│   ├── login/actions.ts
│   ├── auth/signout/route.ts
│   ├── unauthorized/page.tsx
│   ├── layout.tsx                       # root layout
│   └── globals.css
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   ├── admin.ts
│   │   └── proxy.ts
│   ├── tenant.ts
│   └── whatsapp.ts
├── proxy.ts                             # NO middleware.ts
├── .env.local.example
└── README.md
```

---

## Paso 3 — Generar archivos desde references

Copiar cada reference al path correspondiente del proyecto. **Cada `--ref--` es un archivo en el knowledge del proyecto.**

| Ref a leer | Path destino en el proyecto |
|---|---|
| `scaffold-base--ref--proxy.md` | `proxy.ts` (raíz) |
| `scaffold-base--ref--lib-supabase-client.md` | `lib/supabase/client.ts` |
| `scaffold-base--ref--lib-supabase-server.md` | `lib/supabase/server.ts` |
| `scaffold-base--ref--lib-supabase-admin.md` | `lib/supabase/admin.ts` |
| `scaffold-base--ref--lib-supabase-proxy.md` | `lib/supabase/proxy.ts` |
| `scaffold-base--ref--lib-tenant.md` | `lib/tenant.ts` |
| `scaffold-base--ref--lib-whatsapp.md` | `lib/whatsapp.ts` |
| `scaffold-base--ref--api-tenant-config.md` | `app/api/tenant-config/route.ts` |
| `scaffold-base--ref--api-contact.md` | `app/api/contact/route.ts` |
| `scaffold-base--ref--login-page.md` | `app/login/page.tsx` |
| `scaffold-base--ref--login-actions.md` | `app/login/actions.ts` |
| `scaffold-base--ref--auth-signout.md` | `app/auth/signout/route.ts` |
| `scaffold-base--ref--unauthorized-page.md` | `app/unauthorized/page.tsx` |
| `scaffold-base--ref--placeholders-publicos.md` | Páginas placeholder (Home, Nosotros, layout público) |
| `scaffold-base--ref--env-local-example.md` | `.env.local.example` |
| `scaffold-base--ref--readme.md` | `README.md` |

**Para cada ref:** leer el archivo del knowledge → escribir el contenido al path destino → el modelo NO modifica el contenido salvo placeholders explícitos como `{NOMBRE_CLIENTE}`.

---

## Paso 4 — Verificar

- [ ] `proxy.ts` en raíz (NO `middleware.ts`)
- [ ] `lib/supabase/{client,server,admin,proxy}.ts` presentes
- [ ] `lib/tenant.ts` y `lib/whatsapp.ts` presentes
- [ ] `app/api/tenant-config/route.ts` y `app/api/contact/route.ts` presentes
- [ ] Auth (login + signup + signout) presente
- [ ] `.env.local.example` con todas las variables base

---

## Reglas

1. **NUNCA usar `middleware.ts`** — siempre `proxy.ts` en raíz.
2. **NUNCA crear `app/admin/`** en este skill — el panel admin se conecta externamente.
3. **SIEMPRE borrar `app/page.tsx`** después de `create-next-app` — la home va en `app/(public)/page.tsx`.
4. El admin client (`lib/supabase/admin.ts`) es server-only. Nunca exponerlo al cliente.
5. Los archivos generados deben quedar idénticos a lo que dicen los `--ref--`. Solo cambiar placeholders explícitos.
6. Después de este skill, el scaffold del plan agrega lo suyo (catálogo, checkout, shipping, etc.).
7. **Verificar versión de Tailwind** (Paso 1.5) antes de cualquier CSS. En v4 la sintaxis es `@import "tailwindcss"` + `@theme {}`. En v3 es `@tailwind base/components/utilities`. Mezclarlas resulta en cero estilos aplicados.
8. **`next.config.ts` con `remotePatterns`** (Paso 1.6) es obligatorio si la plantilla usa imágenes de Unsplash o Picsum con `<Image>` de Next.js.
