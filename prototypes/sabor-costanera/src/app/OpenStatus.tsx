"use client";

import { useEffect, useState } from "react";
import styles from "./OpenStatus.module.css";
import { getStatus, SCHEDULE, type Status } from "./hours";

export function OpenTicket() {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const update = () => setStatus(getStatus());
    const id = setInterval(update, 60_000);
    const initial = setTimeout(update, 0);
    return () => {
      clearInterval(id);
      clearTimeout(initial);
    };
  }, []);

  if (!status) {
    return <div className={styles.ticket} aria-hidden="true" />;
  }

  return (
    <div className={styles.ticket} data-open={status.isOpen}>
      <span className={styles.dot} />
      <span className={styles.headline}>{status.headline}</span>
      <span className={styles.detail}>{status.detail}</span>
    </div>
  );
}

export function WeekBand() {
  const [todayIndex, setTodayIndex] = useState<number | null>(null);

  useEffect(() => {
    const id = setTimeout(() => setTodayIndex(new Date().getDay()), 0);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className={styles.weekBand}>
      {SCHEDULE.map((row) => {
        const isToday = row.day === todayIndex;
        const isClosed = row.openMinute === null;
        return (
          <div
            key={row.day}
            className={styles.dayPill}
            data-today={isToday}
            data-closed={isClosed}
          >
            <span className={styles.dayShort}>{row.short}</span>
            <span className={styles.dayHours}>
              {isClosed ? "Cerrado" : "19:30 a 00:00"}
            </span>
          </div>
        );
      })}
    </div>
  );
}
