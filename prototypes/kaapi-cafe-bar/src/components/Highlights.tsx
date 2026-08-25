import Image from "next/image";
import { Television, Clock } from "@phosphor-icons/react/dist/ssr";

export function Highlights() {
  return (
    <section id="destacados" className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
      <h2 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">
        Lo que distingue a KAAPI
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-5">
        <div className="relative col-span-1 overflow-hidden rounded-[24px] md:col-span-3">
          <div className="relative aspect-[16/10] w-full md:aspect-[16/9]">
            <Image
              src="https://images.unsplash.com/photo-1648135636478-bfb3ff451dd3?w=1400&q=75&auto=format&fit=crop"
              alt="Barra con canillas de cerveza"
              fill
              sizes="(min-width: 768px) 60vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
          </div>
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
            <span className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-medium text-white backdrop-blur">
              <Television size={16} weight="bold" />
              Se ve el partido
            </span>
            <p className="max-w-[38ch] text-lg font-semibold text-white">
              Pantallas prendidas para no perderse ningún partido, con algo
              rico para picar al lado.
            </p>
          </div>
        </div>

        <div className="col-span-1 flex flex-col rounded-[24px] bg-terracotta p-6 text-white md:col-span-2 md:p-7">
          <span className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-medium">
            <Clock size={16} weight="bold" />
            Happy hour
          </span>
          <p className="text-lg font-semibold">
            Precios especiales en tragos y picadas.
          </p>

          <div className="my-6 rounded-2xl bg-white/10 px-5 py-6 text-center">
            <p className="text-4xl font-bold tracking-tight md:text-5xl">
              18 a 20
            </p>
            <p className="mt-1 text-sm text-white/80">todos los días</p>
          </div>

          <p className="mt-auto text-sm text-white/80">
            Ideal para el after office o para arrancar la previa antes de
            salir.
          </p>
        </div>
      </div>
    </section>
  );
}
