"use client";

import { CalendarBlank, CaretRight } from "@phosphor-icons/react/dist/ssr";
import { getWeekSlots } from "./slots";
import styles from "./page.module.css";

/**
 * Small live-looking preview of the next open slots, shown beside the hero
 * copy instead of a photo. It is the hero's visual asset: proof that the
 * booking grid is real and browsable, not a promise to fill in later. Reuses
 * the same slots.ts data as Booking.tsx but renders its own compact view.
 */
export function HeroPreview() {
  const week = getWeekSlots();
  const next = week
    .flatMap((d) => d.slots.filter((s) => !s.taken).map((s) => ({ day: d.shortLabel, time: s.time })))
    .slice(0, 3);

  return (
    <div className={styles.heroPreview}>
      <div className={styles.heroPreviewHead}>
        <CalendarBlank size={18} weight="regular" />
        <span>Próximos turnos libres</span>
      </div>
      <ul className={styles.heroPreviewList}>
        {next.map((s) => (
          <li key={`${s.day}-${s.time}`} className={styles.heroPreviewRow}>
            <span className={styles.heroPreviewDay}>{s.day}</span>
            <span className={styles.heroPreviewTime}>{s.time} hs</span>
          </li>
        ))}
      </ul>
      <a className={styles.heroPreviewCta} href="#turnos">
        Ver agenda completa
        <CaretRight size={13} weight="bold" />
      </a>
    </div>
  );
}
