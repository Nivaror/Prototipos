"use client";

import { useEffect, useState } from "react";
import { WEEK, fmt, nowInArgentina, currentStatus } from "./hours";
import styles from "./HoursSection.module.css";

export default function Hours() {
  const [now, setNow] = useState<{ weekday: number; minutes: number } | null>(null);

  useEffect(() => {
    setNow(nowInArgentina());
    const id = setInterval(() => setNow(nowInArgentina()), 60_000);
    return () => clearInterval(id);
  }, []);

  const status = now ? currentStatus(now.weekday, now.minutes) : null;

  return (
    <section id="horarios" className={styles.section}>
      <div className="container">
        <h2 className={styles.heading}>Horarios</h2>

        <ul className={styles.ledger}>
          {WEEK.map((day) => {
            const isToday = now?.weekday === day.index;
            return (
              <li
                key={day.index}
                className={`${styles.row} ${isToday ? styles.rowToday : ""}`}
              >
                <span className={styles.day}>{day.long}</span>

                <span className={styles.shifts}>
                  {day.shifts.length === 0 && <span className={styles.closed}>Cerrado</span>}
                  {day.shifts.map((s, i) => (
                    <span key={i} className={styles.chip}>
                      {fmt(s.from)}-{fmt(s.to)}
                    </span>
                  ))}
                </span>

                {isToday && status && (
                  <span className={`${styles.status} ${status.open ? styles.statusOpen : styles.statusClosed}`}>
                    {status.open
                      ? `Abierto ahora · hasta las ${status.until}`
                      : status.when
                        ? `Cerrado · abre ${status.when} a las ${status.at}`
                        : "Cerrado"}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
