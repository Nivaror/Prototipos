export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-wine-700/60 bg-wine-950/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <span className="font-display text-xl font-semibold tracking-wide text-gold-400">
          Club Monaghan
        </span>
        <nav className="hidden items-center gap-8 text-sm text-wine-100/80 md:flex">
          <a href="#reservar" className="transition-colors hover:text-gold-400">
            Reservar
          </a>
          <a href="#carta" className="transition-colors hover:text-gold-400">
            Carta
          </a>
          <a href="#ubicacion" className="transition-colors hover:text-gold-400">
            Ubicación
          </a>
        </nav>
        <a
          href="#reservar"
          className="rounded-full bg-gold-500 px-5 py-2 text-sm font-medium text-wine-950 transition-transform active:scale-[0.98]"
        >
          Reservar
        </a>
      </div>
    </header>
  );
}
