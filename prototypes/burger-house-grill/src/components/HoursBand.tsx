"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Moon } from "@phosphor-icons/react/dist/ssr";
import { isOpenNow, nextOpenLabel } from "@/lib/hours";

export function HoursBand() {
  const [label, setLabel] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setOpen(isOpenNow(now));
      setLabel(nextOpenLabel(now));
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="grid grid-cols-1 bg-zinc-900 md:grid-cols-2">
      <div className="flex flex-col justify-center gap-5 px-4 py-16 sm:px-6 md:px-12 md:py-20">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs text-zinc-300">
          <Moon size={14} weight="fill" className="text-orange-400" />
          Servicio nocturno
        </span>
        <h2 className="font-display text-3xl text-white sm:text-4xl">Todas las noches, hasta tarde</h2>
        <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
          Abrimos los 7 días desde las 19 hs. Sin turno fijo de cierre, así que si tenés hambre a la
          medianoche, seguimos prendidos.
        </p>
        {label && (
          <div className="flex items-center gap-2 text-sm">
            <span className={`h-2 w-2 rounded-full ${open ? "bg-emerald-400" : "bg-zinc-500"}`} />
            <span className="text-white">{label}</span>
          </div>
        )}
      </div>
      <div className="relative min-h-[280px]">
        <Image
          src="/images/social-friends-eating.jpg"
          alt="Grupo de amigos compartiendo hamburguesas y papas fritas"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
