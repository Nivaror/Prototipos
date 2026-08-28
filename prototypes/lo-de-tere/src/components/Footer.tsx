// Plain footer: address, hours recap, and the required demo disclaimer.
// No phone number (excluded per prototype-workflow), no social links
// (none exist for this lead - zero digital presence is the whole premise).
export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[var(--background)] px-6 py-10 text-sm text-[var(--foreground)]/60">
      <div className="mx-auto max-w-7xl">
        <p className="font-display text-base font-semibold text-[var(--foreground)]/90">
          Lo de Tere
        </p>
        <p className="mt-2">Maciel 493, Rosario, Santa Fe</p>
        <p>Abierto todos los días de 8 a 24 hs</p>
        <p className="mt-6 max-w-[60ch] text-xs text-[var(--foreground)]/45">
          Esta es una muestra creada por Nivaror para mostrarle a Lo de Tere
          cómo podría verse su presencia online. No es el sitio oficial del
          negocio ni está afiliada a Lo de Tere.
        </p>
      </div>
    </footer>
  );
}
