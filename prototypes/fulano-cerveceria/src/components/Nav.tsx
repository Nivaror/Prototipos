import Link from "next/link";

export default function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav__inner">
        <span className="nav__mark">Fulano Cervecería</span>
        <nav className="nav__links">
          <Link href="#agenda">Agenda</Link>
          <Link href="#reservas">Reservas</Link>
        </nav>
        <Link href="#reservas" className="btn btn-primary nav__cta">
          Reservar mesa
        </Link>
      </div>
    </header>
  );
}
