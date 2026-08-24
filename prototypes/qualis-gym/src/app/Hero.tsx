import Image from "next/image";
import { InstagramLogo, Star } from "@phosphor-icons/react/dist/ssr";
import styles from "./page.module.css";
import { Reveal } from "./Reveal";
import { INSTAGRAM_URL } from "./hours";
import photo from "../../public/images/ambiance-reception.jpg";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.wrap}>
        <div className={styles.heroGrid}>
          <Reveal className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              El gimnasio mejor calificado que <span className={styles.heroAccent}>cierra el fin de semana</span>.
            </h1>
            <p className={styles.heroSubtitle}>
              108 reseñas en Google y un horario que conviene mirar antes de venir un sábado.
            </p>
            <div className={styles.heroCtas}>
              <a className={`${styles.btn} ${styles.btnPrimary}`} href="#consultar">
                Consultá tu plan
              </a>
              <a
                className={`${styles.btn} ${styles.btnOutline}`}
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramLogo size={17} weight="bold" />
                Ver Instagram
              </a>
            </div>
            <div className={styles.heroFacts}>
              <div className={styles.heroFact}>
                <span className={styles.heroFactValue}>4,9★</span>
                <span className={styles.heroFactLabel}>108 reseñas en Google</span>
              </div>
              <div className={styles.heroFact}>
                <span className={styles.heroFactValue}>Lun a Vie</span>
                <span className={styles.heroFactLabel}>7:00 a 21:00</span>
              </div>
              <div className={styles.heroFact}>
                <span className={styles.heroFactValue}>Sarmiento</span>
                <span className={styles.heroFactLabel}>Rosario</span>
              </div>
            </div>
          </Reveal>
          <Reveal className={styles.heroImageWrap}>
            <div className={styles.heroImageFrame}>
              <Image src={photo} alt="Interior de Qualis Gym" priority sizes="(max-width: 860px) 100vw, 40vw" />
            </div>
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeIcon}>
                <Star size={18} weight="fill" />
              </span>
              <span>
                <span className={styles.heroBadgeTitle}>Cerrado sábado y domingo</span>
                <br />
                <span className={styles.heroBadgeText}>Todo el resto de la semana, de 7 a 21.</span>
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
