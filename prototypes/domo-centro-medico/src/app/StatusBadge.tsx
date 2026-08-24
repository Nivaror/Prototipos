"use client";

import { useEffect, useState } from "react";
import { isOpenNow } from "./hours";
import styles from "./page.module.css";

/**
 * Live open/closed indicator for the micro info bar. Own implementation,
 * checks against DOMO's real two-shift schedule (hours.ts), not copied from
 * any sibling's OpenBadge.
 */
export function StatusBadge() {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only read of the current clock, cannot run during SSR/prerender
    setOpen(isOpenNow());
    const id = setInterval(() => setOpen(isOpenNow()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (open === null) return null;

  return (
    <span className={styles.statusBadge} data-open={open}>
      <span className={styles.statusDot} aria-hidden="true" />
      {open ? "Abierto ahora" : "Cerrado ahora"}
    </span>
  );
}
