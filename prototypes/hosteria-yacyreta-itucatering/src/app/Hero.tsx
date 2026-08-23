import Image from "next/image";
import hero from "../../public/images/hero-dish.jpg";
import styles from "./page.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <Image
        src={hero}
        alt=""
        fill
        priority
        sizes="100vw"
        className={styles.heroImg}
      />
      <div className={styles.heroScrim} aria-hidden="true" />
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Hostería Yacyretá</h1>
        <p className={styles.heroSub}>
          Cocina de estación al mediodía y a la noche, más el servicio de
          catering para tu próximo evento.
        </p>
        <div className={styles.heroCtas}>
          <a href="#restaurante" className={`${styles.btn} ${styles.btnPrimary}`}>
            Ver el restaurante
          </a>
          <a href="#catering" className={`${styles.btn} ${styles.btnGhost}`}>
            Consultar catering
          </a>
        </div>
      </div>
    </section>
  );
}
