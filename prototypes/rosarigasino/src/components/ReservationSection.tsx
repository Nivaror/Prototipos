import Reservation from "./Reservation";

export default function ReservationSection() {
  return (
    <section id="reservas" className="reservation">
      <div className="wrap reservation__inner">
        <div className="reservation__intro">
          <h2 className="font-display">Reservá tu mesa para la cena</h2>
          <p>
            La cena se recomienda con reserva. Contanos para cuándo y cuántos son
            y te confirmamos.
          </p>
        </div>
        <Reservation />
      </div>
    </section>
  );
}
