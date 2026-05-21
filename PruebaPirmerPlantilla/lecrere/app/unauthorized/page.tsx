import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <p className="font-display text-6xl font-light text-neutral-300 mb-4">403</p>
        <h1 className="font-display text-2xl font-light text-neutral-900 mb-3">
          Sin acceso
        </h1>
        <p className="font-body text-sm text-neutral-600 mb-8">
          No tenés permisos para ver esta página.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-body text-sm text-brand-secondary hover:underline"
        >
          ← Ir al inicio
        </Link>
      </div>
    </div>
  );
}
