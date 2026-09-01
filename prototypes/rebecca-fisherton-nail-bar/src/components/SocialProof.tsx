import { Star } from "@phosphor-icons/react/dist/ssr";

const ratings = [
  { value: "4.9", label: "91 reseñas en Google", branch: "Fisherton" },
  { value: "4.4", label: "558 reseñas en Google", branch: "Casa Central" },
];

export function SocialProof() {
  return (
    <section className="bg-ink py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex flex-wrap items-end gap-x-10 gap-y-6">
          {ratings.map((r) => (
            <div key={r.branch} className="flex items-end gap-4">
              <span className="font-display text-5xl font-bold text-bg md:text-6xl">
                {r.value}
              </span>
              <div className="flex flex-col gap-1 pb-1.5">
                <div className="flex gap-1 text-accent">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} weight="fill" />
                  ))}
                </div>
                <span className="text-sm text-bg">{r.branch}</span>
                <span className="text-xs text-bg/70">{r.label}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="max-w-[38ch] text-sm text-bg/70">
          Reputación real en las dos sucursales, construida turno a turno. La
          reserva online suma un canal más, no reemplaza lo que ya funciona.
        </p>
      </div>
    </section>
  );
}
