"use client";

import { useEffect, useState } from "react";
import { nowInArgentina } from "./schedule";
import styles from "./page.module.css";

const HOURS = Array.from({ length: 24 }, (_, i) => i);

/**
 * A 24-hour band with the current hour lit. No meal windows are drawn on it:
 * the listing confirms desayuno, almuerzo, cena and madrugada are served, but
 * never says at what times, and this page does not invent them.
 */
export function DayBand() {
  const [now, setNow] = useState<{ hour: number; label: string } | null>(null);

  useEffect(() => {
    const update = () => {
      const { minutes } = nowInArgentina();
      const hour = Math.floor(minutes / 60);
      setNow({
        hour,
        label: `${String(hour).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`,
      });
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.dayBand}>
      <ol className={styles.dayHours} aria-label="Las veinticuatro horas del día">
        {HOURS.map((hourOfDay) => (
          <li
            key={hourOfDay}
            className={styles.dayHour}
            data-now={now?.hour === hourOfDay}
            aria-current={now?.hour === hourOfDay ? "time" : undefined}
          >
            <span className={styles.dayHourTick} aria-hidden="true" />
            {hourOfDay % 3 === 0 ? (
              <span className={styles.dayHourLabel}>{String(hourOfDay).padStart(2, "0")}</span>
            ) : null}
          </li>
        ))}
      </ol>
      <p className={styles.dayNow}>
        {now === null ? (
          <span>Sin hora de cierre, ningún día de la semana.</span>
        ) : (
          <span>
            Son las <strong>{now.label}</strong> en Ituzaingó, y está abierto — como a cualquier
            otra hora que mires esta página.
          </span>
        )}
      </p>
    </div>
  );
}
