"use client";

import { useEffect, useState } from "react";
import { isOpenNow } from "@/lib/hours";
import styles from "./StatusBadge.module.css";

export default function StatusBadge({ className = "" }: { className?: string }) {
  // Rendered after mount to avoid a server/client time mismatch.
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    // Read the current time once on mount, client-only (avoids an SSR/client mismatch).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(isOpenNow());
  }, []);

  if (open === null) return <span className={`${styles.badge} ${className}`} aria-hidden />;

  return (
    <span className={`${styles.badge} ${open ? styles.open : styles.closed} ${className}`}>
      <span className={styles.dot} />
      {open ? "Abierto ahora" : "Cerrado ahora"}
    </span>
  );
}
