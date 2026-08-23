import Image from "next/image";
import { MapPin } from "@phosphor-icons/react/dist/ssr";
import hero from "../../public/images/hero-gym-floor.jpg";
import { MAPS_URL } from "./hours";
import styles from "./page.module.css";

export function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <Image
        src={hero}
        alt="Sala de entrenamiento de Gimnasio Dein-Ziel"
        fill
        priority
        sizes="100vw"
        className={styles.heroImage}
      />
      <div className={styles.heroScrim} aria-hidden="true" />
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Tu gimnasio en Las Malvinas</h1>
        <p className={styles.heroSubtitle}>
          4.7★ en Google con 195 reseñas. Entrada, espacio, estacionamiento y sanitarios
          accesibles para todos.
        </p>
        <div className={styles.heroActions}>
          <a className={`${styles.btn} ${styles.btnPrimary}`} href="#proba">
            Pedí tu clase de prueba
          </a>
          <a
            className={`${styles.btn} ${styles.btnGhost}`}
            href={MAPS_URL}
            target="_blank"
            rel="noreferrer"
          >
            <MapPin size={18} weight="bold" />
            Cómo llegar
          </a>
        </div>
      </div>
    </section>
  );
}
