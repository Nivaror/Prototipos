export function Footer() {
  return (
    <footer className="border-t border-wine-700/60 bg-wine-950">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-display text-lg font-semibold text-gold-400">
            Club Monaghan
          </span>
          <a
            href="https://clubmonaghan.com"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-wine-100/70 underline decoration-wine-700 underline-offset-4 transition-colors hover:text-gold-400"
          >
            clubmonaghan.com
          </a>
        </div>
        <p className="mt-6 max-w-[60ch] text-xs leading-relaxed text-wine-100/40">
          Esta página es una muestra creada por Nivaror para mostrar cómo se vería
          una reserva online integrada al sitio de Club Monaghan. No es el sitio
          oficial del local.
        </p>
      </div>
    </footer>
  );
}
