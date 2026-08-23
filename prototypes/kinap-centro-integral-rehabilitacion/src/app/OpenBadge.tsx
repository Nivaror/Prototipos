"use client";

import { useEffect, useState } from "react";
import { isOpenNow } from "./hours";
import styles from "./page.module.css";

export function OpenBadge() {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only read of the current clock, can't run during SSR/prerender
    setOpen(isOpenNow());
    const id = setInterval(() => setOpen(isOpenNow()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (open === null) return null;

  return (
    <span className={styles.openBadge} data-open={open}>
      <span className={styles.openDot} aria-hidden="true" />
      {open ? "Abierto ahora" : "Cerrado ahora"}
    </span>
  );
}
