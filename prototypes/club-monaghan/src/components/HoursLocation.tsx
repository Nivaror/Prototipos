"use client";

import { useEffect, useState } from "react";
import { MapPin, Clock } from "@phosphor-icons/react";
import { isOpenAt } from "@/lib/hours";

export function HoursLocation() {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const update = () => setOpen(isOpenAt(new Date()));
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="ubicacion"
      className="mx-auto grid max-w-6xl gap-8 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-14"
    >
      <div>
        <h2 className="font-display text-3xl font-semibold text-wine-100 md:text-4xl">
          Horarios
        </h2>

        {open !== null && (
          <span
            className={
              open
                ? "mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-300"
                : "mt-4 inline-flex items-center gap-2 rounded-full border border-wine-700/70 bg-wine-900 px-3.5 py-1.5 text-xs font-medium text-wine-100/60"
            }
          >
            <span
              className={
                open ? "h-1.5 w-1.5 rounded-full bg-emerald-400" : "h-1.5 w-1.5 rounded-full bg-wine-100/40"
              }
            />
            {open ? "Abierto ahora" : "Cerrado ahora"}
          </span>
        )}

        <dl className="mt-6 space-y-4 text-sm">
          <div className="flex items-start gap-3">
            <Clock size={18} className="mt-0.5 text-gold-400" />
            <div>
              <dt className="text-wine-100/60">Jueves a sábado</dt>
              <dd className="text-wine-100">16 a 00 hs</dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock size={18} className="mt-0.5 text-gold-400" />
            <div>
              <dt className="text-wine-100/60">Lunes a miércoles</dt>
              <dd className="text-wine-100">16 a 22 hs</dd>
            </div>
          </div>
          <p className="pl-8 text-wine-100/45">Cerrado los domingos.</p>
        </dl>
      </div>

      <div className="flex flex-col justify-between rounded-2xl border border-wine-700/60 bg-wine-900 p-7">
        <div className="flex items-start gap-3">
          <MapPin size={22} className="mt-0.5 shrink-0 text-gold-400" />
          <div>
            <p className="text-wine-100">Av. Carballo 122, Local 4</p>
            <p className="text-wine-100/60">Las Malvinas, Rosario</p>
          </div>
        </div>
        <a
          href="https://clubmonaghan.com"
          target="_blank"
          rel="noreferrer"
          className="mt-8 text-sm font-medium text-gold-400 underline decoration-gold-600/50 underline-offset-4 transition-colors hover:text-gold-300"
        >
          Ver el sitio real de Club Monaghan
        </a>
      </div>
    </section>
  );
}
