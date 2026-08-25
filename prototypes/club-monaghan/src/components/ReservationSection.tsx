import { Booking } from "./Booking";

export function ReservationSection() {
  return (
    <section id="reservar" className="bg-wine-900/40 py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-3xl font-semibold text-wine-100 md:text-4xl">
            Reservá tu mesa
          </h2>
          <p className="mt-3 text-sm text-wine-100/70">
            Confirmación al instante, sin esperar una respuesta por WhatsApp.
          </p>
        </div>
        <div className="mt-10">
          <Booking />
        </div>
      </div>
    </section>
  );
}
