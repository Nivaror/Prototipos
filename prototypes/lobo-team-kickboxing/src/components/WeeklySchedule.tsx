"use client";

import { useEffect, useState } from "react";
import { week, todayIndex } from "@/lib/schedule";
import styles from "./WeeklySchedule.module.css";

export function WeeklySchedule() {
  const [today, setToday] = useState<number | null>(null);

  useEffect(() => {
    setToday(todayIndex());
  }, []);

  return (
    <section id="horarios" className={`section ${styles.section}`}>
      <div className="container">
        <h2 className={styles.title}>Horarios de la semana</h2>
        <p className={styles.lead}>
          Bloques distintos según el día, no un horario corrido. Martes a
          viernes siguen el mismo esquema que el lunes, confirmalo por
          Facebook al anotarte.
        </p>
        <div className={styles.grid}>
          {week.map((day, i) => (
            <div
              key={day.label}
              className={`${styles.day} ${i === today ? styles.today : ""}`}
            >
              <span className={styles.dayLabel}>{day.label}</span>
              {day.closed ? (
                <span className={styles.closed}>Cerrado</span>
              ) : day.blocks.length > 0 ? (
                <div className={styles.blocks}>
                  {day.blocks.map((b) => (
                    <span key={b} className={styles.block}>
                      {b}
                    </span>
                  ))}
                </div>
              ) : (
                <span className={styles.note}>{day.note}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
