import Image from "next/image";
import action from "../../public/images/action-workout-silhouette.jpg";
import { TrialForm } from "./TrialForm";
import { Reveal } from "./Reveal";
import styles from "./page.module.css";

export function TrialSection() {
  return (
    <section id="proba" className={styles.trialSection}>
      <Reveal className={styles.trialGrid}>
        <div className={styles.trialTextCell}>
          <h2 className={styles.h2}>Empezá sin vueltas</h2>
          <p className={styles.body}>
            Contanos qué te interesa y coordinamos el próximo paso, en el horario que mejor
            te quede.
          </p>
          <TrialForm />
        </div>
        <div className={styles.trialImageCell}>
          <Image
            src={action}
            alt="Entrenamiento en Gimnasio Dein-Ziel"
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className={styles.trialImage}
          />
        </div>
      </Reveal>
    </section>
  );
}
