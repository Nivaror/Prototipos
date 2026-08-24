import { services, formatARS } from "@/lib/booking";

const swatch = ["#c98a63", "#a8654a", "#e3c3a3", "#8b5e46"];

export function Services() {
  return (
    <section id="servicios" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
        Servicios más elegidos
      </h2>
      <p className="mt-3 max-w-[50ch] text-ink-soft">
        Precios de referencia. El detalle final se confirma en tu turno.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {services.map((s, i) => (
          <div
            key={s.id}
            className="flex items-start gap-4 rounded-2xl border border-line bg-panel p-6"
          >
            <span
              className="mt-1 h-3 w-3 shrink-0 rounded-full"
              style={{ backgroundColor: swatch[i % swatch.length] }}
            />
            <div className="flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-lg font-semibold text-ink">
                  {s.name}
                </h3>
                <span className="whitespace-nowrap font-display text-lg font-semibold text-accent">
                  {formatARS(s.price)}
                </span>
              </div>
              <p className="mt-2 text-sm text-ink-soft">{s.blurb}</p>
              <span className="mt-3 inline-block text-xs font-medium uppercase tracking-wide text-ink-soft">
                {s.duration} min
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
