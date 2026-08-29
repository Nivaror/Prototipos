import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.grid}>
        <div className={styles.textCell}>
          <h1 className={styles.headline}>Pizzería de barrio, ahora con página propia.</h1>
          <p className={styles.subtext}>
            Hasta hoy, sin web ni redes. Ahora: horarios claros y una forma simple de armar tu
            pedido.
          </p>
          <div className={styles.ctaRow}>
            <a href="#horarios" className={styles.btnSolid}>
              Ver horarios
            </a>
            <a href="#pedido" className={styles.btnGhost}>
              Armar pedido
            </a>
          </div>
        </div>

        <div className={`${styles.photoCell} ${styles.photoOne}`}>
          <Image
            src="/images/pizza-board.jpg"
            alt="Pizza recién horneada, cortada en porciones, sobre una tabla de madera"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className={styles.statCell}>
          <span className={styles.statValue}>4.4★</span>
          <span className={styles.statLabel}>42 reseñas en Google</span>
        </div>

        <div className={`${styles.photoCell} ${styles.photoTwo}`}>
          <Image
            src="/images/pizza-cutting-board.jpg"
            alt="Pizza entera con tomate fresco, sobre tabla de madera clara"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
}
