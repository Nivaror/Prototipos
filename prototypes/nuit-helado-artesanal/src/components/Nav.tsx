"use client";

import { InstagramLogo, List, X } from "@phosphor-icons/react";
import { useState } from "react";

const IG_URL = "https://www.instagram.com/nuitheladoartesanal";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/5 bg-cream/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="font-display text-xl font-bold tracking-tight text-ink">
          Nuit <span className="text-raspberry">Helado</span>
        </a>

        <nav className="hidden items-center gap-7 text-sm font-medium text-ink/80 md:flex">
          <a className="transition-colors hover:text-raspberry" href="#pedido">
            Pedí online
          </a>
          <a className="transition-colors hover:text-raspberry" href="#ubicacion">
            Ubicación
          </a>
          <a
            href={IG_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-raspberry"
          >
            <InstagramLogo size={18} weight="bold" />
            Instagram
          </a>
          <a
            href="#pedido"
            className="rounded-full bg-raspberry px-4 py-2 text-sm font-semibold text-cream transition-transform active:scale-[0.97]"
          >
            Pedí ahora
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
          className="text-ink md:hidden"
        >
          {open ? <X size={26} /> : <List size={26} />}
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-1 border-t border-ink/5 bg-cream px-5 py-4 text-sm font-medium text-ink/80 md:hidden">
          <a className="py-2" href="#pedido" onClick={() => setOpen(false)}>
            Pedí online
          </a>
          <a className="py-2" href="#ubicacion" onClick={() => setOpen(false)}>
            Ubicación
          </a>
          <a
            className="flex items-center gap-1.5 py-2"
            href={IG_URL}
            target="_blank"
            rel="noreferrer"
          >
            <InstagramLogo size={18} weight="bold" />
            Instagram
          </a>
        </div>
      )}
    </header>
  );
}
