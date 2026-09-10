import Link from "next/link";
import { SunHorizon, MoonStars } from "@phosphor-icons/react/dist/ssr";
import { MORNING_LABEL, EVENING_LABEL } from "@/lib/hours";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__lights" aria-hidden="true">
        {Array.from({ length: 9 }, (_, index) => (
          <span className="hero__bulb" key={index} />
        ))}
      </div>
      <div className="hero__diptych">
        <div className="hero__half hero__half--am">
          <div className="hero__plate">
            <SunHorizon size={24} weight="regular" />
            <span>Mañana</span>
            <span className="hero__half-time">{MORNING_LABEL}</span>
          </div>
        </div>
        <div className="hero__seam" aria-hidden="true" />
        <div className="hero__half hero__half--pm">
          <div className="hero__plate">
            <MoonStars size={24} weight="regular" />
            <span>Noche</span>
            <span className="hero__half-time">{EVENING_LABEL}</span>
          </div>
        </div>
      </div>
      <div className="hero__band">
        <div className="wrap hero__inner">
          <h1 className="hero__headline">
            Dos turnos. Un bar al que volver.
          </h1>
          <div className="hero__copy">
            <p className="hero__subtext">
              La Cabra abre de mañana, baja la persiana y vuelve a encender
              las luces cuando cae el sol. Acá se entiende de un vistazo.
            </p>
            <div className="hero__ctas">
              <Link href="#horario" className="btn btn-primary">
                Ver el horario
              </Link>
            </div>
            <p className="hero__signal">horario partido · reservas por turno</p>
          </div>
        </div>
      </div>
    </section>
  );
}
