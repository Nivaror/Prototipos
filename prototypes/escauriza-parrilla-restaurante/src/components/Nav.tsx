export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#f3ece1]/10 bg-[#18130f]/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <span className="font-display text-lg tracking-tight text-[#f3ece1]">
          Escauriza
        </span>
        <a
          href="#reservas"
          className="rounded-sm border border-[#f3ece1]/20 px-4 py-2 text-sm text-[#f3ece1] transition hover:border-[#c1502f] hover:text-[#e4805f]"
        >
          Reservar
        </a>
      </nav>
    </header>
  );
}
