import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function Footer() {
  const whatsappLink = buildWhatsAppLink({ message: "Hola, quería hacer una consulta" });

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <p className="font-display text-white text-2xl mb-3">Bar Homero</p>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-xs">
              Bar de barrio con sabor propio. Bebidas, picadas y buenas tardes en Buenos Aires.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="text-xs uppercase tracking-widest text-neutral-500 mb-4 font-medium">Menú</p>
            <nav className="space-y-2">
              {[
                { href: "/", label: "Inicio" },
                { href: "/catalogo", label: "Carta" },
                { href: "/nosotros", label: "Nosotros" },
                { href: "/contacto", label: "Contacto" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="block text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs uppercase tracking-widest text-neutral-500 mb-4 font-medium">Contacto</p>
            <div className="space-y-2 text-sm text-neutral-400">
              <p>Buenos Aires, Argentina</p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-green-400 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.1.543 4.072 1.497 5.782L0 24l6.385-1.673C8.013 23.374 9.956 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.896 0-3.66-.52-5.17-1.424l-.37-.22-3.789.993 1.01-3.688-.241-.38A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-neutral-600">
            © {new Date().getFullYear()} Bar Homero · Todos los derechos reservados
          </p>
          <a
            href="https://sitiohoy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-neutral-600 hover:text-neutral-400 transition-colors"
          >
            Sitio creado con SitioHoy ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
