"use client";

import { useCallback } from "react";
import { PencilSimple, ArrowCounterClockwise, Check } from "@phosphor-icons/react";
import { useProgram, useArgentinaNow } from "./ProgramProvider";
import { SCHEDULE, isLongNight } from "./hours";
import { WEEK, nightWeekday, nowInArgentina, shiftLabel } from "./schedule";
import styles from "./page.module.css";

/**
 * The week as a billing board, one row per night. In owner mode the two text
 * fields become inputs: loading the week is the job this page takes off
 * WhatsApp, so the demo has to show it being loaded, not just displayed.
 */
export function Board({
  initial,
}: {
  initial: { weekday: number; minutes: number };
}) {
  const read = useCallback(() => nowInArgentina(), []);
  const now = useArgentinaNow(read, initial);
  const { program, owner, edited, setOwner, updateNight, reset } = useProgram();
  const tonight = nightWeekday(SCHEDULE, now.weekday, now.minutes);

  return (
    <div className={styles.board}>
      <div className={styles.boardTools}>
        <button
          type="button"
          className={styles.toolButton}
          data-active={owner}
          onClick={() => setOwner(!owner)}
          aria-pressed={owner}
        >
          {owner ? <Check size={17} weight="bold" /> : <PencilSimple size={17} weight="bold" />}
          {owner ? "Listo, así queda" : "Cargar la cartelera"}
        </button>
        {edited ? (
          <button type="button" className={styles.toolReset} onClick={reset}>
            <ArrowCounterClockwise size={16} weight="bold" />
            Volver a la original
          </button>
        ) : null}
      </div>

      <ol className={styles.boardRows}>
        {WEEK.map((day) => {
          const night = program.find((item) => item.weekday === day.index);
          const shifts = SCHEDULE[day.index] ?? [];
          const late = isLongNight(shifts);
          if (!night) return null;
          return (
            <li
              key={day.index}
              className={styles.boardRow}
              data-tonight={day.index === tonight}
            >
              <div className={styles.rowDay}>
                <span className={styles.rowDayName}>{day.short}</span>
                {day.index === tonight ? (
                  <span className={styles.rowFlag}>hoy</span>
                ) : null}
              </div>

              <div className={styles.rowBill}>
                {owner ? (
                  <input
                    className={styles.rowInput}
                    value={night.title}
                    aria-label={`Qué hay el ${day.long}`}
                    onChange={(event) =>
                      updateNight(day.index, { title: event.target.value })
                    }
                  />
                ) : (
                  <span className={styles.rowTitle}>{night.title}</span>
                )}
                {owner ? (
                  <input
                    className={styles.rowInputSmall}
                    value={night.note}
                    aria-label={`Detalle del ${day.long}`}
                    onChange={(event) =>
                      updateNight(day.index, { note: event.target.value })
                    }
                  />
                ) : (
                  <span className={styles.rowNote}>{night.note}</span>
                )}
              </div>

              <div className={styles.rowHours}>
                {shifts.map((shift) => (
                  <span key={shift.from} className={styles.rowShift}>
                    {shiftLabel(shift)}
                  </span>
                ))}
                {late ? <span className={styles.rowLate}>noche larga</span> : null}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
