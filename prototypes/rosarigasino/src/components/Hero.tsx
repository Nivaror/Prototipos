import Link from "next/link";
import OpenStatusBadge from "./OpenStatusBadge";

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero__inner">
        <OpenStatusBadge withHours />
        <h1 className="hero__headline font-display">
          Un clásico de Las Malvinas, con música en vivo.
        </h1>
        <p className="hero__subtext">
          Bar restaurante con historia, cena con reserva y agenda de música y fútbol
          en pantalla todas las semanas.
        </p>
        <div className="hero__ctas">
          <Link href="#reservas" className="btn btn-primary">
            Reservar
          </Link>
          <Link href="#agenda" className="btn btn-secondary">
            Ver agenda
          </Link>
        </div>
      </div>
      <div className="hero__rule" aria-hidden="true" />
    </section>
  );
}
