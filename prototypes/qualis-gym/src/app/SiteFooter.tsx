import { Clock, InstagramLogo, MapPin, Star } from "@phosphor-icons/react/dist/ssr";
import styles from "./page.module.css";
import { INSTAGRAM_URL, MAPS_URL, OPEN_LABEL } from "./hours";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        <div className={styles.footerGrid}>
          <div>
            <span className={styles.footerBrand}>Qualis Gym</span>
            <p className={styles.footerTagline}>
              Gimnasio en el barrio Sarmiento, Rosario. 4,9 estrellas en Google.
            </p>
          </div>
          <div>
            <p className={styles.footerColTitle}>Dónde y cuándo</p>
            <a className={styles.footerLine} href={MAPS_URL} target="_blank" rel="noopener noreferrer">
              <MapPin size={16} weight="fill" />
              Ignacio Warnes 1019, Rosario
            </a>
            <p className={styles.footerLine}>
              <Clock size={16} weight="fill" />
              Lun a vie, {OPEN_LABEL}. Sáb y dom, cerrado.
            </p>
            <p className={styles.footerLine}>
              <Star size={16} weight="fill" />
              4,9★ sobre 108 reseñas en Google
            </p>
          </div>
          <div>
            <p className={styles.footerColTitle}>Seguinos</p>
            <a className={styles.footerLine} href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              <InstagramLogo size={16} weight="fill" />
              @qualis.gym
            </a>
          </div>
        </div>
        <p className={styles.footerDisclaimer}>
          Esta página es una demo hecha por Nivaror para mostrarle a Qualis Gym cómo podría verse su web. No es el
          sitio oficial del gimnasio, y los datos de contacto reales viven en su cuenta de Instagram.
        </p>
      </div>
    </footer>
  );
}
