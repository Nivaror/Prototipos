import { Star, FacebookLogo } from "@phosphor-icons/react/dist/ssr";
import { RATING, FACEBOOK_URL } from "./hours";
import styles from "./Reputation.module.css";

export default function Reputation() {
  return (
    <section className={`container ${styles.section}`}>
      <div className={styles.stat}>
        <Star size={40} weight="fill" className={styles.star} />
        <span className={styles.number}>{RATING.value}</span>
      </div>

      <div className={styles.copy}>
        <p className={styles.line}>
          {RATING.count} reseñas en Google. Hoy, la única forma de encontrarnos
          online además de Maps es nuestro Facebook.
        </p>
        <a
          href={FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          <FacebookLogo size={18} weight="bold" />
          Ir al Facebook de Olimpo Gym
        </a>
      </div>
    </section>
  );
}
