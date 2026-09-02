import Image from "next/image";
import { ArrowRight, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.copy}>
        <h1 className={styles.headline}>
          Tus horarios, <span className={styles.accent}>sin entrar a Instagram</span>.
        </h1>
        <p className={styles.subtext}>
          Reservá tu clase de prueba en Euro Gym RED, La Florida. Sin login, sin
          esperar respuesta.
        </p>
        <div className={styles.ctaRow}>
          <a href="#contacto" className={styles.primaryCta}>
            Reservar prueba
            <ArrowRight size={17} weight="bold" />
          </a>
          <a
            href="https://instagram.com/eurogymredrosario"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondaryCta}
          >
            <InstagramLogo size={17} weight="bold" />
            Instagram
          </a>
        </div>
      </div>

      <div className={styles.visual}>
        <div className={styles.photoCard}>
          <Image
            src="/images/hero-gym.jpg"
            alt="Piso de entrenamiento de Euro Gym RED"
            fill
            priority
            sizes="(max-width: 860px) 100vw, 55vw"
          />
          <div className={styles.photoScrim} />
        </div>
        <div className={styles.badge}>
          <span className={styles.badgeStat}>4.5</span>
          <span className={styles.badgeLabel}>
            ★★★★★
            <br />
            375 reseñas en Google
          </span>
        </div>
      </div>
    </section>
  );
}
