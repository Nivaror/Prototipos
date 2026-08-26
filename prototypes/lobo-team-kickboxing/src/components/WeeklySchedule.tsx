"use client";

import { useEffect, useState } from "react";
import { week, todayIndex } from "@/lib/schedule";
import styles from "./WeeklySchedule.module.css";

export function WeeklySchedule() {
  const [today, setToday] = useState<number | null>(null);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const t = todayIndex();
    setToday(t);
    setSelected(t);
  }, []);

  const day = week[selected];

  return (
    <section id="horarios" className={`section ${styles.section}`}>
      <div className="container">
        <h2 className={styles.title}>Horarios de la semana</h2>
        <p className={styles.lead}>
          Bloques distintos según el día, no un horario corrido. Martes a
          viernes siguen el mismo esquema que el lunes, confirmalo por
          Facebook al anotarte.
        </p>
        <div className={styles.panel}>
          <div className={styles.tabs}>
            {week.map((d, i) => (
              <button
                key={d.label}
                type="button"
                onClick={() => setSelected(i)}
                className={`${styles.tab} ${i === selected ? styles.tabActive : ""}`}
              >
                <span className={styles.tabLabel}>{d.label.slice(0, 3)}</span>
                {i === today && <span className={styles.tabDot} aria-hidden="true" />}
              </button>
            ))}
          </div>
          <div className={styles.detail}>
            <span className={styles.detailDay}>
              {day.label}
              {selected === today && <span className={styles.todayFlag}>Hoy</span>}
            </span>
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
        </div>
      </div>
    </section>
  );
}
