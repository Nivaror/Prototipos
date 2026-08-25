import { BUSINESS } from "@/lib/business";

export function Footer() {
  return (
    <footer className="border-t border-slate-soft bg-ink text-white/70">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-lg font-bold text-white">KAAPI</p>
            <p className="mt-1 max-w-[38ch] text-sm">
              {BUSINESS.address} · {BUSINESS.neighborhood}
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a href="#menu" className="hover:text-white">Menú</a>
            <a href="#pedir" className="hover:text-white">Pedir</a>
            <a href="#horarios" className="hover:text-white">Horarios y ubicación</a>
          </nav>
        </div>

        <div className="mt-8 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs leading-relaxed text-white/60">
          Esta es una demo de Nivaror creada para mostrarle a KAAPI - Café Bar
          una posible página propia. No es el sitio oficial del negocio ni
          está afiliada a él.
        </div>
      </div>
    </footer>
  );
}
