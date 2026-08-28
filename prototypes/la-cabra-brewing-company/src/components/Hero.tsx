import Link from "next/link";
import { SunHorizon, MoonStars } from "@phosphor-icons/react/dist/ssr";
import { MORNING_LABEL, EVENING_LABEL } from "@/lib/hours";

// Diptych hero: two equal color-block halves (dawn cream / night navy), no
// photo, no offset frame, no top/bottom overlap panel. A left/right split
// like puerto-pichon's, but symmetric rather than an asymmetric bleed, and a
// flat color-panel device rather than a photo-plus-frame one, so this is a
// genuinely different combination from every bares sibling to date.
export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__diptych">
        <div className="hero__half hero__half--am">
          <SunHorizon size={22} weight="regular" />
          <span>Mañana</span>
          <span className="hero__half-time">{MORNING_LABEL}</span>
        </div>
        <div className="hero__seam" aria-hidden="true" />
        <div className="hero__half hero__half--pm">
          <MoonStars size={22} weight="regular" />
          <span>Noche</span>
          <span className="hero__half-time">{EVENING_LABEL}</span>
        </div>
      </div>
      <div className="hero__band">
        <div className="wrap hero__inner">
          <h1 className="hero__headline">
            Un bar con dos horarios muy distintos.
          </h1>
          <p className="hero__subtext">
            Abre de mañana, cierra al mediodía, y vuelve de noche. Ese corte
            es fácil de perder si solo miras Google.
          </p>
          <div className="hero__ctas">
            <Link href="#horario" className="btn btn-primary">
              Ver el horario
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
