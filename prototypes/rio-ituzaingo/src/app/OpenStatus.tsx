"use client";

import { useEffect, useState } from "react";
import {
  SCHEDULE,
  WEEK,
  closesAt,
  isLate,
  isOpenAt,
  nextOpening,
  nowInArgentina,
  shiftLabel,
} from "./hours";
import styles from "./page.module.css";

/** Live open/closed. Blank on the server so the markup matches on hydration. */
export function OpenTicket() {
  const [state, setState] = useState<{
    open: boolean;
    until: string;
    next: { when: string; at: string };
  } | null>(null);

  useEffect(() => {
    const update = () => {
      const { weekday, minutes } = nowInArgentina();
      setState({
        open: isOpenAt(weekday, minutes),
        until: closesAt(weekday, minutes),
        next: nextOpening(weekday, minutes),
      });
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className={styles.ticket} data-open={state ? String(state.open) : "pending"}>
      <span className={styles.ticketDot} aria-hidden="true" />
      {state === null ? (
        <span>Terraza, cocina y barra · San Martín 1534</span>
      ) : state.open ? (
        <span>
          <strong>Abierto ahora</strong>, hasta las {state.until}
        </span>
      ) : (
        <span>
          <strong>Cerrado ahora</strong>, abrimos {state.next.when} a las {state.next.at}
        </span>
      )}
    </p>
  );
}

/** Seven days, two services, no two the same — the reason this section exists. */
export function WeekBand() {
  const [today, setToday] = useState<number | null>(null);

  useEffect(() => {
    setToday(nowInArgentina().weekday);
  }, []);

  return (
    <ol className={styles.week}>
      {WEEK.map((day) => {
        const shifts = SCHEDULE[day.index] ?? [];
        return (
          <li
            key={day.index}
            className={styles.weekDay}
            data-open={shifts.length > 0}
            data-today={today === day.index}
          >
            <span className={styles.weekName}>{day.short}</span>
            {shifts.length === 0 ? (
              <span className={styles.weekHours}>Cerrado</span>
            ) : (
              <span className={styles.shift}>
                {shifts.map((s) => (
                  <span key={s.from} className={isLate(s) ? styles.shiftLate : undefined}>
                    {shiftLabel(s)}
                  </span>
                ))}
              </span>
            )}
            {today === day.index ? <span className={styles.weekToday}>Hoy</span> : null}
          </li>
        );
      })}
    </ol>
  );
}
