"use client";

import { useEffect, useState } from "react";
import { getLiveStatus, type LiveStatus } from "./hours";
import styles from "./OpenStatus.module.css";

export default function OpenStatus() {
  const [status, setStatus] = useState<LiveStatus | null>(null);

  useEffect(() => {
    setStatus(getLiveStatus());
    const id = setInterval(() => setStatus(getLiveStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!status) return null;

  return (
    <div className={styles.badge} data-open={status.isOpen}>
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.label}>{status.label}</span>
      <span className={styles.detail}>{status.detail}</span>
    </div>
  );
}
