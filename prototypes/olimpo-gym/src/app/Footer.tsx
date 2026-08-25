import { FacebookLogo, MapPin, Star } from "@phosphor-icons/react/dist/ssr";
import { ADDRESS, RATING, FACEBOOK_URL, MAPS_URL } from "./hours";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div>
          <span className={styles.mark}>OLIMPO GYM</span>
          <p className={styles.item}>
            <MapPin size={16} weight="bold" />
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
              {ADDRESS}
            </a>
          </p>
          <p className={styles.item}>
            <Star size={16} weight="fill" />
            {RATING.value} · {RATING.count} reseñas en Google
          </p>
          <p className={styles.item}>
            <FacebookLogo size={16} weight="bold" />
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
              Facebook oficial
            </a>
          </p>
        </div>

        <div className={styles.hours}>
          <span className={styles.label}>Horarios</span>
          <p>Lunes a viernes: 07:00-12:00 y 16:00-21:30</p>
          <p>Sábado: 10:00-12:00</p>
          <p>Domingo: cerrado</p>
        </div>
      </div>

      <div className="container">
        <p className={styles.disclaimer}>
          Esta página es una demo creada por Nivaror y no es el sitio oficial
          de Olimpo Gym. Para contactarlos directamente, visitá su Facebook.
        </p>
      </div>
    </footer>
  );
}
