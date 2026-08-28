import { MapPin, Star } from "@phosphor-icons/react/dist/ssr";
import OpenStatusBadge from "./OpenStatusBadge";

export default function InfoBand() {
  return (
    <section className="info-band">
      <div className="wrap info-band__inner">
        <div className="info-band__item">
          <MapPin size={22} weight="duotone" />
          <span>Bv Avellaneda 599 bis, Las Malvinas, Rosario</span>
        </div>
        <div className="info-band__item">
          <Star size={22} weight="duotone" />
          <span>4,3 · 2.503 reseñas en Google</span>
        </div>
        <div className="info-band__item">
          <OpenStatusBadge withHours />
        </div>
      </div>
    </section>
  );
}
