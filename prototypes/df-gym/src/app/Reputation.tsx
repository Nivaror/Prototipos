import { Star, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import styles from "./Reputation.module.css";

const MAPS_URL =
  "https://www.google.com/maps/place/?q=place_id:ChIJnedtupZVtpURBAwmephJnl4";

export default function Reputation() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.statBlock}>
          <span className={styles.rating}>4,8</span>
          <div className={styles.starsAndCount}>
            <div className={styles.stars}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} weight="fill" size={16} />
              ))}
            </div>
            <span className={styles.count}>117 reseñas en Google</span>
          </div>
        </div>

        <p className={styles.copy}>
          Un gimnasio con reputación sólida en el barrio, todavía sin una
          página propia que la muestre.
        </p>

        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Ver reseñas en Maps
          <ArrowUpRight size={15} weight="bold" />
        </a>
      </div>
    </section>
  );
}
