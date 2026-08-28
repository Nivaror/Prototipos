import { DAY_GROUPS } from "./hours";
import OpenStatus from "./OpenStatus";
import styles from "./HoursSection.module.css";

export default function HoursSection() {
  return (
    <section id="horarios" className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>El horario cambia según el día</h2>
        <OpenStatus />
      </div>

      <div className={styles.groups}>
        {DAY_GROUPS.map((group) => (
          <div
            className={styles.group}
            data-closed={group.hours === "Cerrado"}
            key={group.title}
          >
            <p className={styles.groupTitle}>{group.title}</p>
            <p className={styles.groupDays}>{group.days}</p>
            <p className={styles.groupHours}>{group.hours}</p>
            <p className={styles.groupNote}>{group.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
