import Image from "next/image";
import { Star } from "@phosphor-icons/react/dist/ssr";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-5 pt-14 pb-20 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14 lg:pt-20">
      <div>
        <h1 className="font-display text-4xl leading-[1.05] font-semibold text-wine-100 md:text-5xl lg:text-6xl">
          Reservá tu mesa en Club Monaghan sin esperar respuesta.
        </h1>
        <p className="mt-5 max-w-[46ch] text-base text-wine-100/75 md:text-lg">
          Vinoteca y coctelería en Rosario. Elegí día, horario y cantidad de
          personas, confirmá al instante, sin pasar por WhatsApp.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#reservar"
            className="rounded-full bg-gold-500 px-7 py-3 text-sm font-medium text-wine-950 transition-transform active:scale-[0.98]"
          >
            Reservar mesa
          </a>
          <a
            href="#carta"
            className="text-sm font-medium text-wine-100/80 underline decoration-wine-700 underline-offset-4 transition-colors hover:text-gold-400"
          >
            Ver la carta
          </a>
        </div>
      </div>

      <div className="relative">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-wine-700/60">
          <Image
            src="/images/hero-bar-cocktails.jpg"
            alt="Barra de Club Monaghan con cócteles servidos"
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover"
          />
        </div>
        <div className="absolute -bottom-5 left-6 flex items-center gap-2 rounded-full border border-wine-700/60 bg-wine-900/95 px-4 py-2.5 shadow-lg shadow-black/30">
          <Star size={18} weight="fill" className="text-gold-400" />
          <span className="text-sm font-medium text-wine-100">
            4.7 <span className="text-wine-100/60">· 94 reseñas</span>
          </span>
        </div>
      </div>
    </section>
  );
}
