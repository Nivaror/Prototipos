"use client";

import { useCallback } from "react";
import { useProgram, useArgentinaNow } from "./ProgramProvider";
import { SCHEDULE } from "./hours";
import {
  WEEK,
  closesAt,
  isOpenAt,
  nextOpening,
  nightWeekday,
  nowInArgentina,
} from "./schedule";
import styles from "./page.module.css";

/**
 * The line the whole page exists for: what is on tonight, and whether the door
 * is open right now. Server-rendered from Argentina time, then kept ticking.
 */
export function TonightBilling({
  initial,
}: {
  initial: { weekday: number; minutes: number };
}) {
  const read = useCallback(() => nowInArgentina(), []);
  const now = useArgentinaNow(read, initial);
  const { nightOf } = useProgram();
  const night = nightOf(nightWeekday(SCHEDULE, now.weekday, now.minutes));

  return <span className={styles.heroBilling}>{night.title}</span>;
}

export function DoorState({
  initial,
}: {
  initial: { weekday: number; minutes: number };
}) {
  const read = useCallback(() => nowInArgentina(), []);
  const now = useArgentinaNow(read, initial);
  const open = isOpenAt(SCHEDULE, now.weekday, now.minutes);
  const until = closesAt(SCHEDULE, now.weekday, now.minutes);
  const next = nextOpening(SCHEDULE, now.weekday, now.minutes);
  const dayName = WEEK.find((d) => d.index === now.weekday)?.long ?? "";

  return (
    <p className={styles.door} data-open={open}>
      <span className={styles.doorDot} aria-hidden="true" />
      {open ? (
        <span>
          Abierto ahora, hasta las <strong>{until}</strong>
        </span>
      ) : (
        <span>
          Cerrado, abre {next.when} a las <strong>{next.at}</strong>
        </span>
      )}
      <span className={styles.doorDay}>{dayName} en Ituzaingó</span>
    </p>
  );
}
