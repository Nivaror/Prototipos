"use client";

import { useEffect, useState } from "react";
import { getLiveStatus, type LiveStatus } from "./hours";
import styles from "./HoursSection.module.css";

export default function OpenStatus() {
  const [status, setStatus] = useState<LiveStatus | null>(null);

  useEffect(() => {
    // Intentional: status depends on the client's clock, so it can only be
    // computed after mount (computing it during render would mismatch the
    // server-rendered placeholder and cause a hydration error).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStatus(getLiveStatus());
    const id = setInterval(() => setStatus(getLiveStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!status) {
    return <div className={styles.statusPlaceholder} aria-hidden="true" />;
  }

  return (
    <div
      className={`${styles.status} ${status.isOpen ? styles.statusOpen : styles.statusClosed}`}
    >
      <span className={styles.statusDot} />
      <span>
        {status.label} · {status.detail}
      </span>
    </div>
  );
}
