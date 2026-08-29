"use client";

import { useEffect, useState } from "react";
import { getLiveStatus } from "./hours";
import styles from "./OpenStatus.module.css";

export default function OpenStatus() {
  const [status, setStatus] = useState<{ isOpen: boolean; label: string } | null>(
    () => null
  );

  useEffect(() => {
    // Runs client-side only, after mount: renders a neutral placeholder on
    // the server (avoids a hydration mismatch from server vs. viewer clock),
    // then fills in the real open/closed read and keeps it fresh every minute.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: first paint after mount, not a render loop
    setStatus(getLiveStatus());
    const id = setInterval(() => setStatus(getLiveStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!status) {
    return <span className={styles.pill} aria-hidden />;
  }

  return (
    <span className={`${styles.pill} ${status.isOpen ? styles.open : styles.closed}`}>
      <span className={styles.dot} />
      {status.label}
    </span>
  );
}
