import { InstagramLogo, MapPin } from "@phosphor-icons/react/dist/ssr";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950 px-4 py-12 text-sm text-zinc-400 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-display text-lg text-white">Burger House Grill</p>
          <p className="mt-2 flex items-center gap-1.5">
            <MapPin size={16} />
            Mariano Perdriel 115, Alberdi, Rosario
          </p>
        </div>
        <a
          href="https://instagram.com/burgerhousegrill.ros"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 transition hover:text-white"
        >
          <InstagramLogo size={18} />
          @burgerhousegrill.ros
        </a>
      </div>
      <p className="mx-auto mt-8 max-w-6xl border-t border-white/10 pt-6 text-xs text-zinc-500">
        Esta página es una muestra de Nivaror pensada para Burger House Grill y no es su sitio oficial.
        Menú y precios ilustrativos.
      </p>
    </footer>
  );
}
