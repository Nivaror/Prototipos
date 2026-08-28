import { HOURS_DISPLAY } from "@/lib/hours";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <div>
          <span className="footer__logo font-display">Rosarigasino</span>
          <p className="footer__address">Bv Avellaneda 599 bis, Las Malvinas, Rosario</p>
          <p className="footer__hours">{HOURS_DISPLAY}</p>
        </div>
        <p className="footer__disclaimer">
          Este sitio es una demostración creada por Nivaror y no es el sitio
          oficial de Rosarigasino.
        </p>
      </div>
    </footer>
  );
}
