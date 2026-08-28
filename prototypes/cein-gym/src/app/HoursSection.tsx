import Image from "next/image";
import { LockSimple } from "@phosphor-icons/react/dist/ssr";
import { WEEK_SCHEDULE } from "./hours";
import OpenStatus from "./OpenStatus";
import styles from "./HoursSection.module.css";

export default function HoursSection() {
  const weekdays = WEEK_SCHEDULE.filter((d) => d.open);

  return (
    <section id="horarios" className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Horario de lunes a viernes</h2>
        <OpenStatus />
      </div>

      <div className={styles.grid}>
        {weekdays.map((day) => (
          <div key={day.code} className={styles.dayCell}>
            <span className={styles.dayLabel}>{day.label}</span>
            <span className={styles.dayHours}>
              {day.opensAt} - {day.closesAt}
            </span>
          </div>
        ))}

        <div className={styles.weekendCell}>
          <Image
            src="/images/ambiance-reception.jpg"
            alt=""
            fill
            sizes="(min-width: 900px) 60vw, 100vw"
            className={styles.weekendImage}
          />
          <div className={styles.weekendOverlay} />
          <div className={styles.weekendContent}>
            <LockSimple size={22} weight="bold" />
            <div>
              <span className={styles.weekendTitle}>Sábado y domingo</span>
              <span className={styles.weekendSubtitle}>Cerrado, sin excepciones</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
