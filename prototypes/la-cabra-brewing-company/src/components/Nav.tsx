import Link from "next/link";
import { InstagramLogo } from "@phosphor-icons/react/dist/ssr";

export default function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav__inner">
        <Link href="#" className="nav__mark">
          <span>La Cabra</span>
          <small>Brewing Company · Alberdi</small>
        </Link>
        <nav className="nav__links">
          <Link href="#horario">Horario</Link>
          <Link href="#reservas">Reservas</Link>
          <a
            href="https://instagram.com/la.cabra.bar"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de La Cabra Brewing Company"
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
