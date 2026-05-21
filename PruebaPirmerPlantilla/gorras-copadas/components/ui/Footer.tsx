import Link from "next/link";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <p
              className="text-[#D4FF00] text-2xl tracking-widest mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              GORRAS COPADAS
            </p>
            <p className="text-[#A0A0A0] text-sm leading-relaxed max-w-xs">
              La tienda de gorras más copada de Argentina. Para los que se animan a destacarse.
            </p>
          </div>

          <div>
            <p className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">Navegación</p>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Inicio" },
                { href: "/catalogo", label: "Catálogo" },
                { href: "/nosotros", label: "Nosotros" },
                { href: "/contacto", label: "Contacto" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#A0A0A0] text-sm hover:text-[#D4FF00] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">Contacto</p>
            <ul className="space-y-3">
              <li>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A0A0A0] text-sm hover:text-[#D4FF00] transition-colors flex items-center gap-2"
                >
                  <span>WhatsApp</span>
                </a>
              </li>
              <li>
                <Link href="/contacto" className="text-[#A0A0A0] text-sm hover:text-[#D4FF00] transition-colors">
                  Formulario de contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#1A1A1A] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#2E2E2E] text-xs">
            © {new Date().getFullYear()} Gorras Copadas. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-[#2E2E2E] text-xs hover:text-[#A0A0A0] transition-colors">
              Términos y condiciones
            </Link>
            <Link href="#" className="text-[#2E2E2E] text-xs hover:text-[#A0A0A0] transition-colors">
              Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
