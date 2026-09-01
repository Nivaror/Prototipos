const links = [
  { href: "#servicios", label: "Servicios" },
  { href: "#reservar", label: "Reservar" },
  { href: "#ubicacion", label: "Sucursales" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-panel/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#" className="flex flex-col leading-none">
          <span className="font-display text-lg font-bold tracking-tight text-ink">
            Rebecca
          </span>
          <span className="text-[10px] uppercase tracking-[0.14em] text-ink-soft">
            Beauty &amp; Nail Bar
          </span>
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#reservar"
          className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-ink transition-transform active:scale-[0.98]"
        >
          Reservar turno
        </a>
      </nav>
    </header>
  );
}
