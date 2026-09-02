import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.col}>
          <span>Summum Gym</span>
          <span>Blvd. Rondeau 3810, La Florida, Rosario</span>
        </div>
        <div className={styles.col}>
          <span>Lun a Vie 07:00 a 22:00</span>
          <span>Sáb y Dom 10:00 a 22:00</span>
        </div>
        <div className={styles.col}>
          <a href="https://instagram.com/summumgym" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a
            href="https://www.google.com/maps/place/?q=place_id:ChIJB003raRTtpUR0-46Tz-d2D4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Maps
          </a>
        </div>
      </div>
      <p className={styles.disclaimer}>
        Esta página es una muestra hecha por Nivaror, no es el sitio oficial de Summum Gym.
      </p>
    </footer>
  );
}
