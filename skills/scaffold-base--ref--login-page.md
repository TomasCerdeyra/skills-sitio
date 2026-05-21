# Reference: `app/login/page.tsx`

Path destino: `app/login/page.tsx`

Pagina de login. Server Component que lee `searchParams` para mostrar errores. Llama a la server action `loginAction`.

## Reglas Next.js 15+

- **`searchParams` es una Promise en Next.js 15+.** La funcion debe ser `async` y hacer `await searchParams`.
- `params` y `searchParams` en Server Components siempre son `Promise<{...}>` en Next.js 15+.

```typescript
import { loginAction } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div style={{ maxWidth: 400, margin: "80px auto", padding: 24 }}>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>Acceso admin</h1>

      <form action={loginAction}>
        <label htmlFor="email" style={{ display: "block", marginTop: 12 }}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          style={{ width: "100%", padding: 8, border: "1px solid #ccc", borderRadius: 4 }}
        />

        <label htmlFor="password" style={{ display: "block", marginTop: 12 }}>
          Contrasena
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          style={{ width: "100%", padding: 8, border: "1px solid #ccc", borderRadius: 4 }}
        />

        {error === "invalid_credentials" && (
          <p style={{ color: "red", marginTop: 8, fontSize: 14 }}>
            Email o contrasena incorrectos.
          </p>
        )}

        <button
          type="submit"
          style={{ width: "100%", padding: 10, marginTop: 16, background: "#000", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}
```

## Notas

- `loginAction` en `./actions.ts` maneja la autenticacion con Supabase y redirige a `/admin` si es exitoso, o a `/login?error=invalid_credentials` si falla.
- El skill de diseno estiliza esta pagina segun el design system del cliente.
- No usar `formAction` en el `<button>` — usar `action={loginAction}` en el `<form>`.
