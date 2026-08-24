import { MapPin, InstagramLogo, FacebookLogo, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

const hours = [
  { day: "Lunes", range: "14:00 a 19:00" },
  { day: "Martes a viernes", range: "9:00 a 20:00" },
  { day: "Sábado", range: "9:00 a 15:00" },
  { day: "Domingo", range: "Cerrado" },
];

export function LocationHours() {
  return (
    <section id="ubicacion" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Fisherton, Rosario
          </h2>
          <p className="mt-4 flex items-start gap-2 text-ink-soft">
            <MapPin size={20} className="mt-0.5 shrink-0 text-accent" />
            Schweitzer 8883, S2000 Rosario, Santa Fe
          </p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Schweitzer+8883+Rosario+Santa+Fe"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
          >
            Ver en Google Maps <ArrowUpRight size={14} />
          </a>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="http://www.rebeccanailbar.com.ar/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink hover:border-ink/30"
            >
              Sitio oficial <ArrowUpRight size={14} />
            </a>
            <a
              href="https://www.instagram.com/rebeccanailbar/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink hover:border-ink/30"
            >
              <InstagramLogo size={16} /> Instagram
            </a>
            <a
              href="https://www.facebook.com/rebeccanailbar/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink hover:border-ink/30"
            >
              <FacebookLogo size={16} /> Facebook
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-panel p-6">
          <h3 className="font-display text-lg font-semibold text-ink">
            Horarios
          </h3>
          <dl className="mt-4 divide-y divide-line">
            {hours.map((h) => (
              <div
                key={h.day}
                className="flex items-center justify-between py-3 text-sm"
              >
                <dt className="text-ink-soft">{h.day}</dt>
                <dd className="font-medium text-ink">{h.range}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
