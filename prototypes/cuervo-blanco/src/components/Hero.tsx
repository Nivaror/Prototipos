import Image from "next/image";
import Link from "next/link";
import heroBand from "../../public/images/hero-band.jpg";

export default function Hero() {
  return (
    <section>
      <div className="hero__band">
        <Image
          src={heroBand}
          alt="Barra de Cuervo Blanco con café, té y vino"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="hero__panel">
        <div className="wrap hero__inner">
          <h1 className="hero__headline">
            Café, té y vino, casi a cualquier hora del día.
          </h1>
          <p className="hero__subtext">
            Abren casi todos los días, de la mañana a la madrugada, con
            reservas para el almuerzo, ahora bien visibles.
          </p>
          <div className="hero__ctas">
            <Link href="#reservas" className="btn btn-primary">
              Reservar el almuerzo
            </Link>
            <Link href="#carta" className="btn btn-ghost-ink">
              Ver la carta
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
