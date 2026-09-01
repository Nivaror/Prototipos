import Link from "next/link";

const LINKS = [
  { href: "#agenda", label: "Agenda" },
  { href: "#reservas", label: "Reservas" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#delivery", label: "Delivery" },
];

export default function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav__inner">
        <span className="nav__logo font-display">Rosarigasino</span>
        <nav className="nav__links" aria-label="Principal">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="nav__link">
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="#reservas" className="btn btn-primary nav__cta">
          Reservar
        </Link>
      </div>
    </header>
  );
}
