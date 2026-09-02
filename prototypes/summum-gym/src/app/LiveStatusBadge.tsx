"use client";

import { useEffect, useState } from "react";
import { getLiveStatus, type LiveStatus } from "./hours";
import styles from "./LiveStatusBadge.module.css";

export function LiveStatusBadge() {
  const [status, setStatus] = useState<LiveStatus>(() => getLiveStatus());

  useEffect(() => {
    const id = setInterval(() => setStatus(getLiveStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.badge}>
      <span className={`${styles.dot} ${status.isOpen ? styles.dotOpen : styles.dotClosed}`} />
      <span className={styles.label}>{status.label}</span>
      <span className={styles.detail}>{status.detail}</span>
    </div>
  );
}
