import { OpenStatus } from "./OpenStatus";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-soft bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-[72px] md:px-8">
        <a href="#top" className="text-xl font-bold tracking-tight text-ink">
          KAAPI
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-ink-soft md:flex">
          <a href="#menu" className="transition-colors hover:text-terracotta">
            Menú
          </a>
          <a href="#destacados" className="transition-colors hover:text-terracotta">
            Fútbol &amp; Happy Hour
          </a>
          <a href="#horarios" className="transition-colors hover:text-terracotta">
            Horarios y ubicación
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <OpenStatus />
          </div>
          <a
            href="#pedir"
            className="rounded-full bg-terracotta px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-terracotta-dark"
          >
            Pedir
          </a>
        </div>
      </div>
    </header>
  );
}
