import { RESERVATION_WINDOWS } from "@/lib/reservation";
import { ReservationCard } from "@/components/ReservationCard";

export function ReservationStack() {
  return (
    <section id="reservas" className="bg-[#18130f] px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-3xl text-[#f3ece1] sm:text-4xl">
          Tres franjas, una reserva sin llamar
        </h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-[#f3ece1]/70">
          Hoy cada franja se reserva por teléfono, por separado. Acá se ve todo junto.
        </p>

        <div className="mt-14 flex flex-col gap-6 md:mt-20 md:flex-row md:items-start md:gap-0">
          <div className="md:relative md:z-10 md:w-[320px]">
            <ReservationCard window={RESERVATION_WINDOWS[0]} />
          </div>
          <div className="md:relative md:z-20 md:-ml-8 md:mt-14 md:w-[320px]">
            <ReservationCard window={RESERVATION_WINDOWS[1]} />
          </div>
          <div className="md:relative md:z-30 md:-ml-8 md:mt-28 md:w-[320px]">
            <ReservationCard window={RESERVATION_WINDOWS[2]} />
          </div>
        </div>
      </div>
    </section>
  );
}
