import Image from "next/image";
import Link from "next/link";
import { FacebookLogo } from "@phosphor-icons/react/dist/ssr";
import ambiance from "../../public/images/ambiance-bar.jpg";

export default function Nosotros() {
  return (
    <section className="nosotros">
      <Image
        src={ambiance}
        alt="Barra de Fulano Cervecería"
        fill
        sizes="100vw"
      />
      <div className="nosotros__scrim" />
      <div className="wrap nosotros__inner">
        <div className="nosotros__copy">
          <h2>Fulano Cervecería</h2>
          <p>
            Av. Alberdi 699, Rosario. Seguinos en Facebook para la agenda
            completa de la semana.
          </p>
          <Link
            href="https://facebook.com/FulanoCerveceria"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ marginTop: 20 }}
          >
            <FacebookLogo size={18} weight="fill" />
            Facebook
          </Link>
        </div>
        <div className="nosotros__rating">
          <strong>4★</strong>
          <span>1.870 reseñas en Google</span>
        </div>
      </div>
    </section>
  );
}
