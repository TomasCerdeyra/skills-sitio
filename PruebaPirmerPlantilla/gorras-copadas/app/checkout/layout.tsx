import Link from "next/link";

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <header className="border-b border-[#1A1A1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-[#D4FF00] text-lg tracking-widest hover:opacity-80 transition-opacity" style={{ fontFamily: "var(--font-display)" }}>
            GORRAS COPADAS
          </Link>
          <div className="flex items-center gap-2 text-[#A0A0A0] text-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4FF00" strokeWidth={2}>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>Compra segura</span>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
