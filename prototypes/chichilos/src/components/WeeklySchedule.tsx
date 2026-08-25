"use client";

import { useEffect, useState } from "react";
import { schedule } from "@/lib/hours";
import styles from "./WeeklySchedule.module.css";

const CELL_CLASS: Record<string, string> = {
  lunes: styles.cellMon,
  martes: styles.cellTue,
  miercoles: styles.cellWed,
  jueves: styles.cellThu,
  viernes: styles.cellFri,
  sabado: styles.cellSat,
  domingo: styles.cellSun,
};

export function WeeklySchedule() {
  // Computed after mount only, so the server-rendered markup never guesses
  // "today" and can't mismatch the client's local date.
  const [todayDow, setTodayDow] = useState<number | null>(null);

  useEffect(() => {
    // One-time read of an external value (the client's local date) that the
    // server can't know — the documented exception to "don't setState in an
    // effect" (https://react.dev/learn/you-might-not-need-an-effect).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTodayDow(new Date().getDay());
  }, []);

  return (
    <section className={styles.section} id="horarios">
      <div className={styles.inner}>
        <h2 className={styles.heading}>El horario, día por día</h2>
        <p className={styles.deck}>
          Nada de adivinar mirando el feed de Instagram: acá está la semana entera de
          Chichilo&apos;s tal cual la confirmaron. El miércoles es el día que cambia todo —
          abre las 24 horas.
        </p>
        <div className={styles.grid}>
          {schedule.map((day) => {
            const isToday = todayDow === day.dow;
            const classes = [
              styles.cell,
              CELL_CLASS[day.key],
              day.dominant ? styles.dominant : "",
              isToday ? styles.today : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <div key={day.key} className={classes}>
                <span className={styles.cellDay}>{day.label}</span>
                <span className={styles.cellHours}>{day.hours}</span>
                {day.note && <span className={styles.cellNote}>{day.note}</span>}
                {isToday && <span className={styles.todayTag}>Hoy</span>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
