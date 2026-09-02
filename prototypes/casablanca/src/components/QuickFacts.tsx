import { MapPin, Star } from "@phosphor-icons/react/dist/ssr";
import OpenStatus from "./OpenStatus";
import Reveal from "./Reveal";
import styles from "./QuickFacts.module.css";

export default function QuickFacts() {
  return (
    <section id="horarios" className={styles.section}>
      <div className="wrap">
        <div className={styles.grid}>
          <Reveal className={`reveal ${styles.hoursCell}`}>
            <div className={styles.hoursTop}>
              <span className={styles.cellLabel}>Horario</span>
              <OpenStatus />
            </div>
            <span className={styles.cellValue}>08:00 a 01:00 hs (aprox.)</span>
            <p className={styles.cellNote}>Abre los siete días de la semana.</p>
          </Reveal>

          <Reveal className={`reveal ${styles.plainCell}`} delay={80}>
            <MapPin size={26} weight="fill" className={styles.cellIcon} />
            <span className={styles.cellLabel}>Ubicación</span>
            <span className={styles.cellValue}>Av. Eudoro Carrasco 4174</span>
            <p className={styles.cellNote}>La Florida, Rosario — a metros del río y del Puente Rosario-Victoria.</p>
            <a
              className={styles.mapLink}
              href="https://www.google.com/maps/search/?api=1&query=Av.+Eudoro+Carrasco+4174+Rosario"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cómo llegar
            </a>
          </Reveal>

          <Reveal className={`reveal ${styles.plainCell} ${styles.glowCell}`} delay={160}>
            <Star size={26} weight="fill" className={styles.cellIcon} />
            <span className={styles.cellLabel}>En Google</span>
            <span className={styles.cellValue}>3.7 · 5.447 reseñas</span>
            <p className={styles.cellNote}>
              Movimiento real y constante, todos los días de la semana.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
