import { MapPin, Star } from "@phosphor-icons/react/dist/ssr";
import { MAPS_URL } from "./hours";
import styles from "./page.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div>
          <p className={styles.footerBrand}>DEIN-ZIEL</p>
          <p className={styles.footerAddress}>
            <MapPin size={16} weight="bold" />
            Stephenson Bis 374, Las Malvinas, Rosario
          </p>
        </div>
        <div className={styles.footerRating}>
          <Star size={18} weight="fill" />
          4.7★ · 195 reseñas en Google
        </div>
      </div>
      <div className={styles.footerHours}>
        <span>Lun a Vie 7:00 a 22:00</span>
        <span>Sáb 10:00 a 14:00</span>
        <span>Dom cerrado</span>
      </div>
      <div className={styles.footerBottom}>
        <a href={MAPS_URL} target="_blank" rel="noreferrer" className={styles.footerLink}>
          Ver en Google Maps
        </a>
        <p className={styles.disclaimer}>
          Esta es una demo hecha por Nivaror, no el sitio oficial de Gimnasio Dein-Ziel.
        </p>
      </div>
    </footer>
  );
}
