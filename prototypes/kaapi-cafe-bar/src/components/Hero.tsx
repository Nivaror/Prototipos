import Image from "next/image";
import { OpenStatus } from "./OpenStatus";
import { BUSINESS } from "@/lib/business";

export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-7xl px-4 pt-10 pb-16 md:px-8 md:pt-14 md:pb-24">
      <div className="relative md:min-h-[460px]">
        {/* Photo card, offset to the right */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[28px] shadow-lg md:absolute md:right-0 md:top-0 md:aspect-auto md:h-[440px] md:w-[60%]">
          <Image
            src="https://images.unsplash.com/photo-1757010055723-fccb3bb5c4ce?w=1600&q=75&auto=format&fit=crop"
            alt="Barra de café en KAAPI"
            fill
            priority
            sizes="(min-width: 768px) 60vw, 100vw"
            className="object-cover"
          />
          <div className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-sm font-semibold text-ink shadow-sm">
            {BUSINESS.rating}★ · {BUSINESS.reviewCount} reseñas
          </div>
        </div>

        {/* Text panel, overlapping the photo's bottom-left corner */}
        <div className="relative z-10 -mt-8 w-full rounded-[28px] bg-ink p-8 text-white shadow-2xl md:absolute md:bottom-0 md:left-0 md:mt-0 md:w-[56%] md:p-10">
          <div className="mb-4">
            <OpenStatus compact />
          </div>
          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
            Café, birra y fútbol en {BUSINESS.neighborhood.split(",")[0]}
          </h1>
          <p className="mt-4 max-w-[46ch] text-base text-white/75">
            Delivery y para llevar todos los días. Mirá el menú y pedí sin
            tener que llamar por teléfono.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#pedir"
              className="rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-terracotta-dark"
            >
              Pedir ahora
            </a>
            <a
              href="#menu"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/60"
            >
              Ver el menú
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
