import Image from "next/image";

export function Hero() {
  return (
    <section className="relative grid min-h-[100dvh] w-full grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col justify-center gap-6 bg-[var(--wine-dark)] px-6 py-16 text-[#f3ece9] md:px-14 md:py-0">
        <div className="reveal flex max-w-md flex-col gap-6">
          <h1 className="font-display text-4xl leading-[1.08] font-semibold md:text-6xl">
            Trattoria italiana en el corazón de Las Malvinas
          </h1>
          <p className="max-w-sm text-base leading-relaxed text-[#f3ece9]/85 md:text-lg">
            4,7★ en Google con más de 3.000 reseñas. Reserva recomendada
            para la cena, ahora también se puede hacer online.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#reservas"
              className="rounded-full bg-[#f3ece9] px-6 py-3 text-sm font-medium text-[var(--wine-dark)] transition hover:bg-white"
            >
              Reservar mesa
            </a>
            <a
              href="#horario"
              className="rounded-full border border-[#f3ece9]/40 px-6 py-3 text-sm font-medium text-[#f3ece9] transition hover:border-[#f3ece9]"
            >
              Ver horario
            </a>
          </div>
        </div>
      </div>
      <div className="relative min-h-[45vh] md:min-h-[100dvh]">
        <Image
          src="/images/ambiance-dining-room.jpg"
          alt="Salón de Popolo Ristorante con mesas de madera y luz cálida"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
