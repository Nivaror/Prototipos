import { Star } from "@phosphor-icons/react/dist/ssr";
import styles from "./Reputation.module.css";

const MAPS_URL =
  "https://www.google.com/maps/place/?q=place_id:ChIJ76qcWfhTtpURt5lGxjXRPFM";

export default function Reputation() {
  return (
    <section className={styles.section}>
      <div className={styles.badge}>
        <div className={styles.ring}>
          <span className={styles.rating}>4,9</span>
          <div className={styles.stars}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} weight="fill" size={16} />
            ))}
          </div>
        </div>
      </div>
      <p className={styles.count}>88 reseñas en Google</p>
      <p className={styles.copy}>
        La mejor referencia sigue siendo el boca en boca del barrio Sarmiento.
      </p>
      <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className={styles.link}>
        Ver reseñas en Google Maps
      </a>
    </section>
  );
}
