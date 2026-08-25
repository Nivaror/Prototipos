export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-[var(--background)]/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <span className="font-display text-xl font-semibold tracking-tight text-[var(--wine)]">
          Popolo Ristorante
        </span>
        <a
          href="#reservas"
          className="rounded-full bg-[var(--wine)] px-5 py-2 text-sm font-medium text-white transition hover:bg-[var(--wine-dark)]"
        >
          Reservar
        </a>
      </div>
    </header>
  );
}
