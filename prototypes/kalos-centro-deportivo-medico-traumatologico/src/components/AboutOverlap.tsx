import Image from "next/image";
import Reveal from "./Reveal";
import styles from "./AboutOverlap.module.css";

export default function AboutOverlap() {
  return (
    <section className={styles.section}>
      <Reveal className={styles.text}>
        <h2 className={styles.heading}>Enfocados en lesiones deportivas</h2>
        <p className={styles.body}>
          El centro atiende kinesiología y traumatología deportiva, con
          seguimiento pensado para el ritmo de cada recuperación: desde la
          primera consulta después de una lesión hasta el alta para volver a
          entrenar o competir.
        </p>
      </Reveal>
      <Reveal className={styles.visual}>
        <div className={styles.colorBlock} />
        <div className={styles.photoCard}>
          <Image
            src="/images/service-consultation-hands.jpg"
            alt="Sesión de kinesiología en el centro"
            width={1536}
            height={2048}
            sizes="(max-width: 900px) 70vw, 340px"
            className={styles.photo}
          />
        </div>
      </Reveal>
    </section>
  );
}
