"use client";

import { useEffect, useState } from "react";
import { isOpenNow } from "@/lib/hours";
import styles from "./QuickFacts.module.css";

export default function OpenStatus() {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const update = () => setOpen(isOpenNow());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={styles.statusPill} data-open={open ?? undefined}>
      <span className={styles.statusDot} aria-hidden="true" />
      {open === null ? "Consultando horario" : open ? "Abierto ahora" : "Cerrado ahora"}
    </span>
  );
}
