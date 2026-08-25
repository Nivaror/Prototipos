import Image from "next/image";
import { Star, LinkSimple } from "@phosphor-icons/react/dist/ssr";

export function Reputation() {
  return (
    <section className="bg-[var(--background)] px-6 py-20 md:px-14">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
        <div className="flex flex-col gap-5">
          <div className="flex items-end gap-3">
            <span className="font-display text-7xl font-semibold text-[var(--wine)] md:text-8xl">
              4,7
            </span>
            <div className="flex flex-col gap-1 pb-2">
              <div className="flex gap-1 text-[var(--wine)]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} weight="fill" />
                ))}
              </div>
              <span className="text-sm text-[var(--foreground)]/60">
                3.135 reseñas en Google
              </span>
            </div>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-[var(--foreground)]/75">
            Cientos de comensales en Rosario avalan la cocina de Popolo. Hoy
            esa reputación vive solo en Google y en un Linktree, sin una
            página propia que la acompañe.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl">
            <Image
              src="/images/ambiance-bar-drinks.jpg"
              alt="Barra de Popolo Ristorante con la carta de vinos"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <a
            href="https://linktr.ee/popoloristorante2"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-start rounded-full border border-[var(--wine)]/30 px-5 py-2.5 text-sm font-medium text-[var(--wine)] transition hover:border-[var(--wine)]"
          >
            <LinkSimple size={16} weight="bold" />
            Más en nuestras redes
          </a>
        </div>
      </div>
    </section>
  );
}
