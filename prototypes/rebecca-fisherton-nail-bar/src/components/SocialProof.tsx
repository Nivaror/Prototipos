import { Star } from "@phosphor-icons/react/dist/ssr";

export function SocialProof() {
  return (
    <section className="bg-ink py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-end gap-4">
          <span className="font-display text-6xl font-bold text-bg md:text-7xl">
            4.9
          </span>
          <div className="flex flex-col gap-1 pb-2">
            <div className="flex gap-1 text-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} weight="fill" />
              ))}
            </div>
            <span className="text-sm text-bg/70">91 reseñas en Google</span>
          </div>
        </div>
        <p className="max-w-[38ch] text-sm text-bg/70">
          Reputación real, construida turno a turno. La reserva online suma un
          canal más, no reemplaza lo que ya funciona.
        </p>
      </div>
    </section>
  );
}
