"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { Reveal } from "./Reveal";
import { OpenStatus } from "./OpenStatus";
import { OPEN_LABEL, WEEK, nowInArgentina } from "./hours";

export function HoursSection() {
  const [today, setToday] = useState<number | null>(null);

  useEffect(() => {
    function detectToday() {
      setToday(nowInArgentina().weekday);
    }
    detectToday();
  }, []);

  return (
    <section className={styles.hoursSection} id="horarios">
      <div className={styles.wrap}>
        <Reveal>
          <div className={styles.hoursBand}>
            <div className={styles.hoursTop}>
              <div>
                <h2 className={styles.hoursTitle}>Horarios</h2>
                <p className={styles.hoursNote}>
                  Abren de lunes a viernes, siempre {OPEN_LABEL}. Sábado y domingo, cerrado.
                </p>
              </div>
              <OpenStatus />
            </div>
            <div className={styles.hoursStrip}>
              {WEEK.map((day) => (
                <div
                  key={day.index}
                  className={`${styles.hoursCell} ${day.open ? styles.hoursCellOpen : styles.hoursCellClosed} ${
                    today === day.index ? styles.hoursCellToday : ""
                  }`}
                >
                  <span className={styles.hoursDay}>{day.short}</span>
                  <p className={styles.hoursTime}>{day.open ? OPEN_LABEL : "Cerrado"}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
