export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-panel">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <p className="max-w-[60ch] text-xs leading-relaxed text-ink-soft">
          Este sitio es una demo de reserva online creada por Nivaror para
          Rebecca Beauty &amp; Nail Bar, sucursal Fisherton. No es el sitio
          oficial del salón ni está afiliado a Rebecca Beauty &amp; Nail Bar.
          Los turnos de esta demo no se confirman ni se procesan de verdad.
          Para reservar de verdad, visitá{" "}
          <a
            href="http://www.rebeccanailbar.com.ar/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            rebeccanailbar.com.ar
          </a>
          .
        </p>
        <p className="mt-4 text-xs text-ink-soft">
          Prototipo por{" "}
          <span className="font-semibold text-ink">Nivaror</span> — Rosario,
          Santa Fe.
        </p>
      </div>
    </footer>
  );
}
