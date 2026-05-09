import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <p className="text-5xl mb-4">🔒</p>
        <h1 className="font-display text-2xl text-neutral-900 mb-2">Acceso restringido</h1>
        <p className="text-neutral-500 text-sm mb-8">
          No tenés permisos para acceder a esta sección.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/login"
            className="px-6 py-2.5 bg-brand-primary text-white rounded-lg text-sm font-medium hover:bg-brand-primary/90 transition-colors"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/"
            className="px-6 py-2.5 bg-neutral-100 text-neutral-700 rounded-lg text-sm font-medium hover:bg-neutral-200 transition-colors"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
