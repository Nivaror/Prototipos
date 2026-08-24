import Image from "next/image";
import { Star } from "@phosphor-icons/react/dist/ssr";
import styles from "./page.module.css";
import { Reveal } from "./Reveal";
import photo from "../../public/images/hero-gym-floor.jpg";

export function ReputationSection() {
  return (
    <section className={styles.reputation}>
      <div className={styles.wrap}>
        <Reveal className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Un gimnasio con trayectoria</h2>
        </Reveal>
        <Reveal>
          <div className={styles.bentoGrid}>
            <div className={`${styles.bentoCell} ${styles.bentoStat}`}>
              <div>
                <span className={styles.bentoStatValue}>4,9</span>
                <div className={styles.bentoStars} aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} weight="fill" />
                  ))}
                </div>
              </div>
              <p className={styles.bentoStatLabel}>108 reseñas en Google</p>
            </div>
            <div className={`${styles.bentoCell} ${styles.bentoImage}`}>
              <Image src={photo} alt="Piso de entrenamiento de Qualis Gym" sizes="(max-width: 860px) 100vw, 55vw" />
            </div>
            <div className={`${styles.bentoCell} ${styles.bentoCopy}`}>
              <p className={styles.bentoCopyTitle}>Instagram, complementado</p>
              <p className={styles.bentoCopyText}>
                Hoy solo están en @qualis.gym. Esta página no reemplaza esa cuenta, resuelve lo que un feed no
                muestra bien: el horario.
              </p>
            </div>
            <div className={`${styles.bentoCell} ${styles.bentoCopy}`}>
              <p className={styles.bentoCopyTitle}>Sin sorpresas de horario</p>
              <p className={styles.bentoCopyText}>
                Siempre de 7 a 21, de lunes a viernes. Ningún día cambia, ningún horario partido.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
