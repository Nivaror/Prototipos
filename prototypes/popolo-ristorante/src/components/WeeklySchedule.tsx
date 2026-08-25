"use client";

import { useEffect, useState } from "react";
import { ForkKnife, Prohibit } from "@phosphor-icons/react/dist/ssr";
import { WEEK } from "@/lib/hours";

export function WeeklySchedule() {
  const [today, setToday] = useState<number | null>(null);

  useEffect(() => {
    setToday(new Date().getDay());
  }, []);

  return (
    <section id="horario" className="bg-[var(--background)] px-6 py-20 md:px-14">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-3xl font-semibold text-[var(--wine)] md:text-4xl">
          Nuestra semana
        </h2>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[var(--foreground)]/70">
          Cerramos los miércoles. El resto de la semana abrimos a la noche,
          y también al mediodía los fines de semana.
        </p>

        <div className="mt-8 flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory md:grid md:grid-cols-7 md:overflow-visible md:pb-0 md:snap-none">
          {WEEK.map((day) => {
            const isToday = today === day.index;
            return (
              <div
                key={day.index}
                className={`flex min-w-[112px] shrink-0 snap-start flex-col items-center gap-3 rounded-2xl border px-3 py-6 text-center md:min-w-0 ${
                  day.closed
                    ? "border-[var(--wine)]/30 bg-[var(--wine)]/10"
                    : "border-black/8 bg-white"
                } ${isToday ? "ring-2 ring-[var(--wine)] ring-offset-2 ring-offset-[var(--background)]" : ""}`}
              >
                {day.closed ? (
                  <Prohibit size={22} weight="bold" className="text-[var(--wine)]" />
                ) : (
                  <ForkKnife size={22} weight="bold" className="text-[var(--wine)]/70" />
                )}
                <span className="text-xs font-semibold tracking-wide text-[var(--foreground)]/50">
                  {day.short}
                </span>
                <span
                  className={`text-sm font-medium ${
                    day.closed ? "text-[var(--wine)]" : "text-[var(--foreground)]"
                  }`}
                >
                  {day.service}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
