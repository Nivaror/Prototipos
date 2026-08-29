import OpenStatus from "./OpenStatus";
import { SCHEDULE, DAY_LABELS, PEER_SATURDAY_CLOSE, toPercent } from "./hours";
import styles from "./HoursSection.module.css";

// Order Monday first for the display list (SCHEDULE itself stays
// Date#getDay()-indexed for the live-status lookup).
const DISPLAY_ORDER = [1, 2, 3, 4, 5, 6, 0];

export default function HoursSection() {
  return (
    <section id="horarios" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.heading}>Horarios de la semana</h2>
          <OpenStatus />
        </div>

        <div className={styles.chart}>
          {DISPLAY_ORDER.map((dayIndex) => {
            const block = SCHEDULE[dayIndex];
            const isSaturday = dayIndex === 6;
            return (
              <div key={dayIndex} className={styles.row}>
                <span className={styles.day}>{DAY_LABELS[dayIndex]}</span>
                <div className={styles.track}>
                  {block ? (
                    <div
                      className={`${styles.bar} ${isSaturday ? styles.barAccent : ""}`}
                      style={{
                        left: `${toPercent(block.open)}%`,
                        width: `${toPercent(block.close) - toPercent(block.open)}%`,
                      }}
                    />
                  ) : (
                    <span className={styles.closedLabel}>Cerrado</span>
                  )}
                  {isSaturday && (
                    <div
                      className={styles.peerMarker}
                      style={{ left: `${toPercent(PEER_SATURDAY_CLOSE)}%` }}
                    />
                  )}
                </div>
                <span className={styles.hoursText}>
                  {block ? `${block.open}:00 - ${block.close}:00` : ""}
                </span>
              </div>
            );
          })}
        </div>

        <p className={styles.note}>
          <span className={styles.noteMark} /> La linea punteada marca donde
          suele cerrar la mayoria de los gimnasios de la zona los sabados.
          Zona Norte sigue abierto casi cinco horas mas.
        </p>
      </div>
    </section>
  );
}
