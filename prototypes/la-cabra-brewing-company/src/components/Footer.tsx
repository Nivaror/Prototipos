import { Info } from "@phosphor-icons/react/dist/ssr";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <div className="footer__disclaimer">
          <Info size={18} weight="regular" />
          <span>
            Esta es una muestra creada por Nivaror para mostrarle a La
            Cabra Brewing Company una idea de página. No es el sitio
            oficial del bar.
          </span>
        </div>
        <div className="footer__meta">
          <span>La Cabra Brewing Company - Alberdi, Rosario</span>
          <span>Muestra hecha por Nivaror</span>
        </div>
      </div>
    </footer>
  );
}
