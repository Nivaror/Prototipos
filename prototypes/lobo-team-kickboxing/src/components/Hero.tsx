import Image from "next/image";
import { FacebookLogo } from "@phosphor-icons/react/dist/ssr";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.grain} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <h1 className={styles.headline}>Horarios de clase, sin vueltas</h1>
        <p className={styles.subtext}>
          Lobo Team organiza sus clases en varios bloques por día, no un
          horario corrido. Acá los ves todos, ordenados.
        </p>
        <div className={styles.ctas}>
          <a href="#horarios" className="btn btn-primary">
            Ver horarios
          </a>
          <a
            href="https://facebook.com/LoboTeam.KB"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            <FacebookLogo size={18} weight="fill" />
            Seguinos
          </a>
        </div>
        <div className={styles.imageCard}>
          <Image
            src="/images/glove-detail.jpg"
            alt="Guantes de entrenamiento"
            width={700}
            height={848}
            className={styles.image}
            priority
          />
          <div className={styles.stat}>
            <strong>4.7★</strong>
            <span>67 reseñas en Google</span>
          </div>
        </div>
      </div>
    </section>
  );
}
