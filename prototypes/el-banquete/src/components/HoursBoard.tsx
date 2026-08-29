"use client";

import { useEffect, useState } from "react";
import { WEEK, todayKey, type DayKey } from "@/lib/hours";
import styles from "./HoursBoard.module.css";

export default function HoursBoard() {
  // Computed after mount only, so the server-rendered board never guesses
  // "today" from a build-time clock that could disagree with the visitor's.
  const [today, setToday] = useState<DayKey | null>(null);

  useEffect(() => {
    // Deliberately deferred to the client: a build-time Date would freeze
    // "today" at the prerender day, not the visitor's.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToday(todayKey());
  }, []);

  return (
    <section id="horarios" className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Horarios</h2>
        <p className={styles.sub}>Servicio partido, mediodía y noche, todos los días excepto domingo.</p>
      </div>

      <div className={styles.board}>
        {WEEK.map((day, i) => (
          <div
            key={day.key}
            className={`${styles.row} ${day.key === today ? styles.rowToday : ""} ${day.closed ? styles.rowClosed : ""}`}
            style={{ "--i": i } as React.CSSProperties}
          >
            <span className={styles.dayCode}>{day.short}</span>
            <span className={styles.dayLabel}>{day.label}</span>

            {day.closed ? (
              <span className={styles.closedTag}>CERRADO</span>
            ) : (
              <div className={styles.periods}>
                <span className={styles.chip}>MEDIODÍA</span>
                <span className={styles.chip}>NOCHE</span>
              </div>
            )}

            {day.key === today && <span className={styles.todayTag}>HOY</span>}
          </div>
        ))}
      </div>
    </section>
  );
}
