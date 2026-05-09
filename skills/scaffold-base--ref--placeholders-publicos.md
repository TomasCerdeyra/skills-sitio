# Reference: páginas placeholder públicas

Estas páginas quedan como esqueleto vacío esperando al skill de diseño. **No agregar contenido visual ni copy hardcodeado** — solo los archivos mínimos para que el proyecto compile.

## `app/(public)/page.tsx` — Home

Path destino: `app/(public)/page.tsx`

```typescript
// TODO: skill sitio-diseno
export default function HomePage() {
  return <div>TODO: home</div>;
}
```

## `app/(public)/nosotros/page.tsx`

Path destino: `app/(public)/nosotros/page.tsx`

```typescript
// TODO: skill sitio-diseno
export default function NosotrosPage() {
  return <div>TODO: nosotros</div>;
}
```

## `app/(public)/contacto/page.tsx`

Path destino: `app/(public)/contacto/page.tsx`

Form mínimo que postea al endpoint de contacto. El skill de diseño lo estiliza después.

```typescript
"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  // TODO: skill sitio-diseno
  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Nombre" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="phone" placeholder="Teléfono (opcional)" />
      <textarea name="message" placeholder="Mensaje" required rows={5} />
      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Enviando..." : "Enviar consulta"}
      </button>
      {status === "ok" && <p>¡Mensaje enviado! Te respondemos pronto.</p>}
      {status === "error" && <p>Hubo un error. Escribinos por WhatsApp.</p>}
    </form>
  );
}
```

## `app/(public)/layout.tsx` — Layout público

Path destino: `app/(public)/layout.tsx`

```typescript
// TODO: skill sitio-diseno (Header + Footer)
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```
