"use client";

import { useEffect, useState } from "react";
import {
  HOURS_LABEL,
  OPEN_DAYS,
  WEEK,
  isOpenNow,
  nextOpenLabel,
  nowInArgentina,
} from "./hours";
import styles from "./page.module.css";

/** Live open/closed state. Rendered blank on the server so the markup matches on hydration. */
export function OpenTicket() {
  const [state, setState] = useState<{ open: boolean; next: string } | null>(null);

  useEffect(() => {
    const update = () => setState({ open: isOpenNow(), next: nextOpenLabel() });
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className={styles.ticket} data-open={state ? String(state.open) : "pending"}>
      <span className={styles.ticketDot} aria-hidden="true" />
      {state === null ? (
        <span>Viernes, sábado y domingo de {HOURS_LABEL}</span>
      ) : state.open ? (
        <span>
          <strong>Abierto ahora</strong>, hasta las 17
        </span>
      ) : (
        <span>
          <strong>Cerrado ahora</strong>, abrimos {state.next} a las 9
        </span>
      )}
    </p>
  );
}

/** The whole week at a glance. The point of the section: four of these days are closed. */
export function WeekBand() {
  const [today, setToday] = useState<number | null>(null);

  useEffect(() => {
    setToday(nowInArgentina().weekday);
  }, []);

  return (
    <ol className={styles.week}>
      {WEEK.map((day) => {
        const open = OPEN_DAYS.includes(day.index);
        return (
          <li
            key={day.index}
            className={styles.weekDay}
            data-open={open}
            data-today={today === day.index}
          >
            <span className={styles.weekName}>{day.short}</span>
            <span className={styles.weekHours}>{open ? HOURS_LABEL : "Cerrado"}</span>
            {today === day.index ? <span className={styles.weekToday}>Hoy</span> : null}
          </li>
        );
      })}
    </ol>
  );
}
