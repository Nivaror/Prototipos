import { Clock, Star, MapPin } from "@phosphor-icons/react/dist/ssr";

export default function InfoBand() {
  return (
    <div className="infoband">
      <div className="wrap infoband__inner">
        <span className="infoband__item">
          <Clock size={18} weight="fill" />
          Abre los <strong>7 días</strong>, horario más largo los findes
        </span>
        <span className="infoband__item">
          <Star size={18} weight="fill" />
          <strong>4★</strong> · 1.870 reseñas en Google
        </span>
        <span className="infoband__item">
          <MapPin size={18} weight="fill" />
          Av. Alberdi 699, Rosario
        </span>
      </div>
    </div>
  );
}
