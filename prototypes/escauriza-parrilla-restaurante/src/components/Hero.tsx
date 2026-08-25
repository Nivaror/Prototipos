import Image from "next/image";

export function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] items-end overflow-hidden">
      <Image
        src="/images/hero-plated-dish.jpg"
        alt="Plato de parrilla servido en Escauriza"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0e0b08] via-[#0e0b08]/55 to-[#0e0b08]/10" />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-16 pt-24 sm:px-6 sm:pb-20">
        <div className="max-w-2xl reveal">
          <h1 className="font-display text-4xl leading-[1.08] text-[#f3ece1] sm:text-5xl lg:text-6xl">
            Reservá tu mesa en Escauriza, sin llamar.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-[#f3ece1]/85 sm:text-lg">
            Una parrilla con 4,5 estrellas y más de 8.500 reseñas en Google. Elegí tu franja y
            reservá al instante.
          </p>
          <a
            href="#reservas"
            className="mt-8 inline-block rounded-sm bg-[#c1502f] px-7 py-3 text-sm font-semibold text-[#f3ece1] transition hover:bg-[#a8442a] active:scale-[0.98]"
          >
            Reservar ahora
          </a>
        </div>
      </div>
    </section>
  );
}
