import { LiveStatusBadge } from "./LiveStatusBadge";
import styles from "./Reconciliation.module.css";

export function Reconciliation() {
  return (
    <section id="horario" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Dos fuentes, un solo horario</h2>
        <p className={styles.intro}>
          Instagram y Google Maps no siempre muestran lo mismo. Antes de armar la muestra,
          confirmamos el horario directo con la ficha oficial del gimnasio.
        </p>

        <div className={styles.sources}>
          <div className={styles.sourceChip}>
            <span className={styles.sourceChipLabel}>Instagram</span>
            <p className={styles.sourceChipText}>Un horario publicado, sin actualizar hace tiempo.</p>
          </div>
          <div className={styles.sourceChip}>
            <span className={styles.sourceChipLabel}>Google Maps</span>
            <p className={styles.sourceChipText}>Otro horario, cargado directo en la ficha del negocio.</p>
          </div>
        </div>

        <div className={styles.connector} aria-hidden="true" />

        <div className={styles.confirmed}>
          <span className={styles.confirmedLabel}>Horario confirmado</span>
          <div className={styles.confirmedRows}>
            <div className={styles.confirmedRow}>
              <span>LUN A VIE</span>
              <span>07:00 A 22:00</span>
            </div>
            <div className={styles.confirmedRow}>
              <span>SAB Y DOM</span>
              <span>10:00 A 22:00</span>
            </div>
          </div>
          <p className={styles.confirmedNote}>Verificado contra la ficha de Google Maps del gimnasio.</p>
          <div className={styles.statusRow}>
            <LiveStatusBadge />
          </div>
        </div>
      </div>
    </section>
  );
}
