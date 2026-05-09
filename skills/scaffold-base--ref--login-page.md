# Reference: `app/login/page.tsx`

Path destino: `app/login/page.tsx`

Página de login. Form mínimo que llama a las server actions. El skill de diseño puede estilizar después.

```typescript
import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <div style={{ maxWidth: 400, margin: "80px auto", padding: 24 }}>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>Acceso admin</h1>
      <form>
        <label htmlFor="email" style={{ display: "block", marginTop: 12 }}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          style={{ width: "100%", padding: 8, border: "1px solid #ccc", borderRadius: 4 }}
        />
        <label htmlFor="password" style={{ display: "block", marginTop: 12 }}>
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          style={{ width: "100%", padding: 8, border: "1px solid #ccc", borderRadius: 4 }}
        />
        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <button formAction={login} style={{ flex: 1, padding: 8 }}>
            Ingresar
          </button>
          <button formAction={signup} style={{ flex: 1, padding: 8 }}>
            Crear cuenta
          </button>
        </div>
      </form>
    </div>
  );
}
```
