import Image from "next/image";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.inner}>
        <h1 className={styles.headline}>El horario real de Summum Gym.</h1>
        <p className={styles.subtext}>
          Instagram y Google Maps no coinciden. Acá te mostramos el horario confirmado, sin
          adivinar cuál es el correcto.
        </p>
        <div className={styles.ctaRow}>
          <a className={styles.primaryCta} href="#horario">
            Ver horario confirmado
          </a>
          <a
            className={styles.secondaryCta}
            href="https://instagram.com/summumgym"
            target="_blank"
            rel="noopener noreferrer"
          >
            @summumgym en Instagram
          </a>
        </div>
        <div className={styles.photoCard}>
          <Image
            src="/images/ambiance-reception.jpg"
            alt="Recepción de Summum Gym"
            width={520}
            height={650}
            priority
          />
        </div>
      </div>
    </header>
  );
}
