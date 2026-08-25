const IG_URL = "https://www.instagram.com/nuitheladoartesanal";

export function Footer() {
  return (
    <footer className="border-t border-ink/8 bg-cream">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-display text-lg font-bold text-ink">
            Nuit <span className="text-raspberry">Helado</span>
          </span>
          <a
            href={IG_URL}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-ink/60 underline decoration-ink/20 underline-offset-4 transition-colors hover:text-raspberry"
          >
            @nuitheladoartesanal
          </a>
        </div>
        <p className="mt-6 max-w-[60ch] text-xs leading-relaxed text-ink/40">
          Esta página es una muestra creada por Nivaror para mostrarle a Nuit
          Helado Artesanal cómo sería tener un pedido de delivery propio, sin
          reemplazar su Instagram. No es el sitio oficial del local.
        </p>
      </div>
    </footer>
  );
}
