"use client";

import { useEffect, useState } from "react";
import styles from "./HoursLocation.module.css";

function isOpenNow(date: Date) {
  const day = date.getDay();
  const hour = date.getHours();
  const isWeekday = day >= 1 && day <= 5;
  return isWeekday && hour >= 8 && hour < 21;
}

export default function OpenStatus() {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    // ponytail: reads the viewer's local clock, not Rosario time; fine for a demo, swap to a timezone-aware check if this ships.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only computation to avoid SSR/client hydration mismatch
    setOpen(isOpenNow(new Date()));
  }, []);

  if (open === null) return null;

  return (
    <span className={styles.status}>
      <span className={open ? styles.dotOpen : styles.dotClosed} />
      {open ? "Abierto ahora" : "Cerrado ahora"}
    </span>
  );
}
