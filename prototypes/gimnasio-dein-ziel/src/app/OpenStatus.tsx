"use client";

import { useEffect, useState } from "react";
import { currentStatus, nowInArgentina } from "./hours";
import styles from "./page.module.css";

export function OpenStatus() {
  const [status, setStatus] = useState<ReturnType<typeof currentStatus> | null>(null);

  useEffect(() => {
    function tick() {
      const { weekday, minutes } = nowInArgentina();
      setStatus(currentStatus(weekday, minutes));
    }
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!status) return null;

  return (
    <span className={`${styles.statusPill} ${status.open ? styles.statusOpen : styles.statusClosed}`}>
      <span className={styles.statusDot} aria-hidden="true" />
      {status.open ? `Abierto ahora · cierra ${status.until}` : `Cerrado · abre ${status.when} ${status.at}`}
    </span>
  );
}
