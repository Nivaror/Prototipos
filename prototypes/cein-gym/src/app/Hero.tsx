import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.copy}>
        <h1 className={styles.headline}>
          Entrenamiento integral, de lunes a viernes.
        </h1>
        <p className={styles.subtext}>
          Sarmiento, Rosario. 4,9 estrellas y 88 reseñas. Abrimos de 7 a 21 hs,
          sábados y domingos cerrado.
        </p>
        <div className={styles.actions}>
          <a href="#contacto" className={styles.primaryCta}>
            Consultar
          </a>
          <a href="#horarios" className={styles.secondaryLink}>
            Ver horarios
          </a>
        </div>
      </div>
      <div className={styles.imageWrap}>
        <Image
          src="/images/hero-gym-floor.jpg"
          alt="Piso de entrenamiento de CEIN"
          fill
          priority
          sizes="(min-width: 900px) 60vw, 100vw"
          className={styles.image}
        />
        <div className={styles.imageScrim} />
      </div>
    </section>
  );
}
