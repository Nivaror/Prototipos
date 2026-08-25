import { Star } from "@phosphor-icons/react/dist/ssr";

export function Reputation() {
  return (
    <section className="bg-[#221a14] px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-3 md:divide-x md:divide-[#f3ece1]/10">
        <div className="md:pr-10">
          <div className="flex items-end gap-2">
            <span className="font-display text-6xl text-[#f3ece1] sm:text-7xl">4,5</span>
            <Star size={28} weight="fill" className="mb-2 text-[#c1502f]" />
          </div>
          <p className="mt-2 text-sm text-[#f3ece1]/60">Calificación promedio en Google</p>
        </div>

        <div className="md:px-10">
          <span className="font-display text-6xl text-[#f3ece1] sm:text-7xl">8.547</span>
          <p className="mt-2 text-sm text-[#f3ece1]/60">Reseñas acumuladas en Google</p>
        </div>

        <div className="md:pl-10">
          <p className="font-display text-xl leading-snug text-[#f3ece1]">
            Miles de comensales ya dejaron su opinión sobre Escauriza.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#f3ece1]/70">
            Buen café, postres caseros y una selección de vinos que suele destacarse junto con la
            parrilla, según las mismas reseñas que hoy solo se leen en Google.
          </p>
        </div>
      </div>
    </section>
  );
}
