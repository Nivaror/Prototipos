import Link from "next/link";
import { InstagramLogo } from "@phosphor-icons/react/dist/ssr";

export default function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav__inner">
        <Link href="#" className="nav__mark">
          <span className="nav__mark-badge">CB</span>
          Cuervo Blanco
        </Link>
        <nav className="nav__links">
          <Link href="#carta">Carta</Link>
          <Link href="#horario">Horarios</Link>
          <a
            href="https://instagram.com/cuervoblanco.puertonorte"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de Cuervo Blanco"
          >
            <InstagramLogo size={20} weight="regular" />
          </a>
          <Link href="#reservas" className="btn btn-primary">
            Reservar
          </Link>
        </nav>
      </div>
    </header>
  );
}
