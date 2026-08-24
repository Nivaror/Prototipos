const swatches = [
  "#c98a63",
  "#e3c3a3",
  "#8b5e46",
  "#d9a894",
  "#f1e4d0",
  "#a8654a",
  "#efc9b6",
  "#6f4632",
  "#e9dcc4",
];

export function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-4 pt-12 pb-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pt-16">
      <div>
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink md:text-[2.75rem] lg:text-5xl">
          Reservá tu turno, sin salir de tu sitio.
        </h1>
        <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-ink-soft md:text-lg">
          Un flujo de reservas pensado para Rebecca Fisherton: elegís
          servicio, horario y confirmás, todo con la misma calidez de
          siempre.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#reservar"
            className="rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-ink transition-transform active:scale-[0.98]"
          >
            Reservar turno
          </a>
          <a
            href="#servicios"
            className="rounded-full border border-line px-7 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink"
          >
            Ver servicios
          </a>
        </div>
      </div>

      <div className="relative">
        <div className="grid grid-cols-3 gap-3 rounded-2xl border border-line bg-panel p-4">
          {swatches.map((color, i) => (
            <div
              key={color}
              className="aspect-square rounded-xl"
              style={{
                backgroundColor: color,
                marginTop: i % 3 === 1 ? "1.25rem" : 0,
              }}
            />
          ))}
        </div>
        <div className="absolute -bottom-5 -left-5 flex items-center gap-3 rounded-2xl border border-line bg-panel px-5 py-3 shadow-[0_12px_30px_-18px_rgba(33,29,25,0.35)]">
          <span className="font-display text-2xl font-bold text-ink">
            4.9
          </span>
          <span className="text-xs leading-tight text-ink-soft">
            91 reseñas
            <br />
            en Google
          </span>
        </div>
      </div>
    </section>
  );
}
