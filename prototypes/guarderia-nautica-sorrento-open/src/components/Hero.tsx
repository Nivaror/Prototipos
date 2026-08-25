import Image from "next/image";

export function Hero() {
  return (
    <section className="relative flex min-h-[88dvh] items-center justify-center overflow-hidden">
      <Image
        src="/images/hero-marina.jpg"
        alt="Muelle con botes amarrados en agua calma"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c1a24]/80 via-[#0c1a24]/55 to-[#0c1a24]/85" />
      <div className="relative z-10 mx-auto max-w-4xl px-4 pt-16 text-center sm:px-6">
        <h1 className="font-display text-4xl font-semibold leading-[1.1] text-white md:text-6xl">
          Tu guardería náutica, siempre disponible online.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-white/85 md:text-lg">
          Casi 150 reseñas en Google avalan a Sorrento Open. Consultá planes de
          guardado y disponibilidad sin llamar.
        </p>
        <a
          href="#contacto"
          className="mt-8 inline-block rounded-md bg-[#c98a3e] px-7 py-3 text-sm font-semibold text-[#12202b] transition-transform active:scale-[0.98] md:text-base"
        >
          Consultar disponibilidad
        </a>
      </div>
    </section>
  );
}
