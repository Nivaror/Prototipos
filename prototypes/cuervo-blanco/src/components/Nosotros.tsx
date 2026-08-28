import Image from "next/image";
import { InstagramLogo, MapPin, Star } from "@phosphor-icons/react/dist/ssr";
import nosotrosBand from "../../public/images/nosotros-band.jpg";

export default function Nosotros() {
  return (
    <section className="nosotros" id="nosotros">
      <Image
        src={nosotrosBand}
        alt="Ambiente y terraza de Cuervo Blanco"
        fill
        sizes="100vw"
        style={{ objectFit: "cover" }}
      />
      <div className="wrap nosotros__inner">
        <div>
          <h2>Puerto Norte, con terraza y buena mesa</h2>
          <p>
            Bar restaurante en Av. Carballo 158, Las Malvinas, Rosario. Con
            terraza y una carta pensada para quedarse un rato largo, de
            mañana a madrugada.
          </p>
          <div className="nosotros__links">
            <a
              className="btn btn-ghost-ink"
              href="https://instagram.com/cuervoblanco.puertonorte"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramLogo size={18} weight="regular" />
              Instagram
            </a>
            <a
              className="btn btn-ghost-ink"
              href="https://www.google.com/maps/search/?api=1&query=Av.+Carballo+158,+Rosario"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPin size={18} weight="regular" />
              Cómo llegar
            </a>
          </div>
        </div>
        <div className="rating">
          <div className="rating__num">4,3</div>
          <div className="rating__stars" aria-hidden="true">
            <Star size={16} weight="fill" />
            <Star size={16} weight="fill" />
            <Star size={16} weight="fill" />
            <Star size={16} weight="fill" />
            <Star size={16} weight="regular" />
          </div>
          <div className="rating__count">5.666 reseñas en Google</div>
        </div>
      </div>
    </section>
  );
}
