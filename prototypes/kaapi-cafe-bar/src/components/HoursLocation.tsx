"use client";

import { useEffect, useState } from "react";
import { MapPin } from "@phosphor-icons/react/dist/ssr";
import { DAY_LABELS, WEEK_SCHEDULE, scheduleLabel, rosarioNow } from "@/lib/hours";
import { OpenStatus } from "./OpenStatus";
import { BUSINESS } from "@/lib/business";

export function HoursLocation() {
  const [todayIndex, setTodayIndex] = useState<number | null>(null);

  useEffect(() => {
    setTodayIndex(rosarioNow().getDay());
  }, []);

  return (
    <section id="horarios" className="mx-auto max-w-5xl px-4 py-14 md:px-8 md:py-20">
      <div className="grid grid-cols-1 gap-10 rounded-[28px] border border-slate-soft bg-surface p-6 md:grid-cols-2 md:gap-0 md:divide-x md:divide-slate-soft md:p-10">
        <div className="md:pr-10">
          <h2 className="text-xl font-bold tracking-tight text-ink">Horarios</h2>
          <div className="mt-3">
            <OpenStatus />
          </div>
          <ul className="mt-5 flex flex-col gap-2 text-sm">
            {WEEK_SCHEDULE.map((day, i) => (
              <li
                key={DAY_LABELS[i]}
                className={`flex items-center justify-between rounded-lg px-3 py-2 ${
                  todayIndex === i ? "bg-terracotta-100 text-terracotta-dark" : "text-ink-soft"
                }`}
              >
                <span className={todayIndex === i ? "font-semibold" : ""}>
                  {DAY_LABELS[i]}
                </span>
                <span className={todayIndex === i ? "font-semibold" : ""}>
                  {scheduleLabel(day)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:pl-10">
          <h2 className="text-xl font-bold tracking-tight text-ink">Ubicación</h2>
          <div className="mt-3 flex items-start gap-3 text-ink-soft">
            <MapPin size={20} weight="fill" className="mt-0.5 shrink-0 text-terracotta" />
            <p className="text-sm">
              {BUSINESS.address}
              <br />
              {BUSINESS.neighborhood}
            </p>
          </div>
          <a
            href={BUSINESS.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-soft px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-terracotta/50"
          >
            Cómo llegar
          </a>
          <p className="mt-6 text-sm text-ink-soft">
            Con mesas afuera para tomar algo al aire libre, y opción de
            comer en la barra o sentado.
          </p>
        </div>
      </div>
    </section>
  );
}
