import { Sun } from "@phosphor-icons/react/dist/ssr";
import OpenStatus from "./OpenStatus";
import styles from "./HoursSection.module.css";

const ROWS = [
  { label: "Lunes a viernes", value: "06:00 - 20:30" },
  { label: "Sábado", value: "08:30 - 13:00" },
  { label: "Domingo", value: "Cerrado" },
];

export default function HoursSection() {
  return (
    <section id="horarios" className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.callout}>
          <Sun size={40} weight="fill" className={styles.calloutIcon} />
          <p className={styles.calloutBig}>Abrimos desde las 6:00</p>
          <p className={styles.calloutSub}>
            Pensado para quienes entrenan antes de arrancar el día.
          </p>
        </div>

        <div className={styles.schedule}>
          <OpenStatus />
          <ul className={styles.rows}>
            {ROWS.map((row) => (
              <li key={row.label} className={styles.row}>
                <span className={styles.rowLabel}>{row.label}</span>
                <span
                  className={
                    row.value === "Cerrado"
                      ? styles.rowValueClosed
                      : styles.rowValue
                  }
                >
                  {row.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
