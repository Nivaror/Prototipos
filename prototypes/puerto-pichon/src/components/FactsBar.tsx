"use client";

import { useEffect, useState } from "react";
import { Star, MapPin, Clock } from "@phosphor-icons/react/dist/ssr";
import { currentStatus, OpenStatus } from "@/lib/hours";
import styles from "./FactsBar.module.css";

export default function FactsBar() {
  // Computed client-side only, to avoid a server/client clock mismatch on
  // first paint (same convention as casablanca/mapu's OpenStatus pieces,
  // reimplemented fresh here for this venue's own hours shape).
  const [status, setStatus] = useState<OpenStatus | null>(null);

  useEffect(() => {
    // Polling the wall clock is a legitimate external-system subscription,
    // not derivable state, so the initial sync call is intentional here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStatus(currentStatus());
    const id = setInterval(() => setStatus(currentStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className={styles.bar}>
      <div className={`wrap ${styles.row}`}>
        <div className={styles.item}>
          <Clock size={18} weight="bold" className={styles.icon} />
          <span className={status?.isOpen ? styles.open : styles.closed}>
            {status ? status.label : "Consultando horario"}
          </span>
        </div>
        <div className={styles.item}>
          <Star size={18} weight="fill" className={styles.icon} />
          <span>4,3 · 2.444 reseñas en Google</span>
        </div>
        <div className={styles.item}>
          <MapPin size={18} weight="bold" className={styles.icon} />
          <span>Alberdi, Rosario</span>
        </div>
      </div>
    </section>
  );
}
