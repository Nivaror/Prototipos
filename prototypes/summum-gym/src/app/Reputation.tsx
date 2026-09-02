import styles from "./Reputation.module.css";

export function Reputation() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.stamp}>
          <span className={styles.stampRating}>4.3</span>
          <span className={styles.stampStars}>★★★★☆</span>
        </div>
        <p className={styles.text}>157 reseñas en Google, en Blvd. Rondeau al 3800, La Florida.</p>
        <a
          className={styles.link}
          href="https://www.google.com/maps/place/?q=place_id:ChIJB003raRTtpUR0-46Tz-d2D4"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver en Google Maps
        </a>
      </div>
    </section>
  );
}
