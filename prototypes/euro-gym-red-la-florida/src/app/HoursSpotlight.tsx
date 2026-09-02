"use client";

import { useEffect, useState } from "react";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { WEEK_SCHEDULE, getLiveStatus, type LiveStatus } from "./hours";
import styles from "./HoursSpotlight.module.css";

export default function HoursSpotlight() {
  const [status, setStatus] = useState<LiveStatus>(() => getLiveStatus());
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setStatus(getLiveStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className={styles.section} id="horarios">
      <h2 className={styles.headline}>¿Está abierto ahora?</h2>

      <div className={styles.card}>
        <div className={styles.spotlight}>
          <div className={styles.statusGroup}>
            <span
              className={`${styles.dot} ${status?.isOpen ? styles.dotOpen : styles.dotClosed}`}
              aria-hidden
            />
            <div className={styles.statusText}>
              <span className={styles.statusLabel}>
                {status ? status.label : "Consultando horario"}
              </span>
              <span className={styles.statusDetail}>{status?.detail ?? ""}</span>
            </div>
          </div>

          {status && status.todayShifts.length > 0 && (
            <div className={styles.shiftPills}>
              {status.todayShifts.map((s) => (
                <span key={s.opensAt} className={styles.shiftPill}>
                  {s.opensAt} - {s.closesAt}
                </span>
              ))}
            </div>
          )}

          <button
            type="button"
            className={styles.toggle}
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
          >
            {expanded ? "Ocultar semana" : "Ver semana completa"}
            <CaretDown
              size={15}
              weight="bold"
              style={{
                transform: expanded ? "rotate(180deg)" : "none",
                transition: "transform 0.2s ease",
              }}
            />
          </button>
        </div>

        {expanded && (
          <div className={styles.week}>
            {WEEK_SCHEDULE.map((day) => (
              <div key={day.code} className={styles.dayRow}>
                <div className={styles.dayLabel}>{day.label}</div>
                <div className={styles.dayShifts}>
                  {day.shifts.map((s) => (
                    <span key={s.opensAt}>
                      {s.opensAt} - {s.closesAt}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
