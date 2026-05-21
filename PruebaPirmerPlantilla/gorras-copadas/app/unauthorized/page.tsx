import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <span className="text-6xl block mb-6">🚫</span>
        <h1 className="text-5xl font-black text-[#FF3131] mb-4" style={{ fontFamily: "var(--font-display)" }}>
          SIN ACCESO
        </h1>
        <p className="text-[#A0A0A0] mb-8">
          No tenés permisos para ver esta página.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 border border-[#2E2E2E] text-white rounded-full hover:border-[#D4FF00] hover:text-[#D4FF00] transition-colors"
          >
            Ir al inicio
          </Link>
          <Link
            href="/login"
            className="px-6 py-3 bg-[#D4FF00] text-[#0A0A0A] font-bold rounded-full hover:bg-white transition-colors"
          >
            Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
