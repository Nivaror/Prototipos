import Image from "next/image";
import { Star } from "@phosphor-icons/react/dist/ssr";

export function Hero() {
  return (
    <section className="relative bg-zinc-950 px-4 pb-20 pt-16 sm:px-6 sm:pt-20">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <h1 className="font-display text-4xl leading-[1.05] tracking-tight text-white sm:text-6xl">
          Hamburguesas que Rosario ya eligió
        </h1>
        <p className="max-w-xl text-balance text-base text-zinc-400 sm:text-lg">
          Todas las noches desde las 19 hs, en Alberdi. Ahora también pedís tu mesa online, antes de
          salir de tu casa.
        </p>
        <a
          href="#menu"
          className="rounded-full bg-orange-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-orange-500 active:scale-[0.98]"
        >
          Ver el menú
        </a>
      </div>

      <div className="relative mx-auto mt-14 max-w-4xl">
        <div className="absolute -inset-8 rounded-[3rem] bg-orange-600/20 blur-3xl" aria-hidden />
        <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] border border-white/10 sm:aspect-[21/9]">
          <Image
            src="/images/hero-burger.jpg"
            alt="Hamburguesa doble de Burger House Grill sobre fondo oscuro"
            fill
            priority
            sizes="(min-width: 1024px) 900px, 100vw"
            className="object-cover object-[center_28%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
        </div>

        <div className="absolute -bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900 px-5 py-3 shadow-xl shadow-black/40">
          <Star size={22} weight="fill" className="text-orange-400" />
          <div className="text-left">
            <p className="text-sm font-semibold text-white">4.9 sobre 5</p>
            <p className="text-xs text-zinc-400">1.509 reseñas en Google</p>
          </div>
        </div>
      </div>
    </section>
  );
}
