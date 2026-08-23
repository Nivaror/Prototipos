"use client";

import { useEffect, useState } from "react";
import { SCHEDULE, WEEK, currentStatus, fmt, nowInArgentina } from "./hours";
import styles from "./page.module.css";

export function ScheduleStatus() {
  const [now, setNow] = useState<{ weekday: number; minutes: number } | null>(null);

  useEffect(() => {
    setNow(nowInArgentina());
    const id = setInterval(() => setNow(nowInArgentina()), 60_000);
    return () => clearInterval(id);
  }, []);

  const status = now ? currentStatus(now.weekday, now.minutes) : null;

  return (
    <>
      <div className={styles.statusBadge}>
        <span className={styles.statusDot} data-open={status ? String(status.open) : undefined} />
        {status
          ? status.open
            ? `Abierto ahora, hasta las ${status.until}`
            : `Cerrado. Abre ${status.when} a las ${status.at}`
          : "Consultando horario..."}
      </div>

      <ol className={styles.scheduleList}>
        {WEEK.map((day) => {
          const shifts = SCHEDULE[day.index];
          const isToday = now?.weekday === day.index;
          return (
            <li key={day.index} className={styles.scheduleRow} data-today={isToday}>
              <span className={styles.scheduleDay}>{day.short}</span>
              <span className={styles.scheduleHours}>
                {shifts.length === 0
                  ? "Cerrado"
                  : shifts.map((s) => `${fmt(s.from)}–${fmt(s.to)}`).join(" · ")}
              </span>
            </li>
          );
        })}
      </ol>
    </>
  );
}
