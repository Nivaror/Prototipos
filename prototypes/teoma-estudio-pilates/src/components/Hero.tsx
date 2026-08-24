import { Star } from "@phosphor-icons/react/dist/ssr";
import MovementMark from "./MovementMark";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.text}>
        <h1 className={styles.headline}>
          Pilates y funcional, bajo un mismo techo.
        </h1>
        <p className={styles.sub}>
          Pilates y entrenamiento funcional en Alberdi, con clases pensadas
          para cada nivel y objetivo.
        </p>
        <div className={styles.actions}>
          <a className={styles.primaryCta} href="#disciplinas">
            Ver las disciplinas
          </a>
          <span className={styles.rating}>
            <Star size={16} weight="fill" color="var(--sage-deep)" />
            4.8 en Google · 29 reseñas
          </span>
        </div>
      </div>
      <div className={styles.visual}>
        <div className={styles.mark}>
          <MovementMark />
        </div>
      </div>
    </section>
  );
}
