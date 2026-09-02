"use client";

import { useEffect, useState } from "react";
import { getLiveStatus, type LiveStatus } from "./hours";
import styles from "./OpenStatus.module.css";

export default function OpenStatus() {
  const [status, setStatus] = useState<LiveStatus>(() => getLiveStatus());

  useEffect(() => {
    const id = setInterval(() => setStatus(getLiveStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.badge} data-open={status.isOpen}>
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.label}>{status.label}</span>
      <span className={styles.detail}>{status.detail}</span>
    </div>
  );
}
