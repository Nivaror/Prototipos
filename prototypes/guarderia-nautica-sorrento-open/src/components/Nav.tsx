const LINKS = [
  { href: "#servicios", label: "Servicios" },
  { href: "#instalaciones", label: "Instalaciones" },
  { href: "#horarios", label: "Horarios" },
  { href: "#contacto", label: "Contacto" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#12202b]/10 bg-[#f6f4ee]/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <span className="font-display text-lg font-semibold tracking-tight text-[#12202b]">
          Sorrento Open
        </span>
        <ul className="hidden items-center gap-8 text-sm text-[#12202b]/80 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-colors hover:text-[#12202b]">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contacto"
          className="rounded-md bg-[#12202b] px-4 py-2 text-sm font-medium text-white transition-transform active:scale-[0.98]"
        >
          Consultar
        </a>
      </nav>
    </header>
  );
}
