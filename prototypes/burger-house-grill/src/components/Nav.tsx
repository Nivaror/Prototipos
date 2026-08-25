import { InstagramLogo } from "@phosphor-icons/react/dist/ssr";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <span className="font-display text-lg tracking-tight text-white">
          Burger House Grill
        </span>
        <div className="flex items-center gap-6">
          <a href="#menu" className="hidden text-sm text-zinc-300 transition hover:text-white sm:block">
            Menú
          </a>
          <a href="#reputacion" className="hidden text-sm text-zinc-300 transition hover:text-white sm:block">
            Reseñas
          </a>
          <a
            href="https://instagram.com/burgerhousegrill.ros"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-sm text-white transition hover:border-orange-500/60 hover:text-orange-400"
          >
            <InstagramLogo size={16} weight="regular" />
            Instagram
          </a>
        </div>
      </nav>
    </header>
  );
}
