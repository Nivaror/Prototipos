import { InstagramLogo, FacebookLogo, Star } from "@phosphor-icons/react/dist/ssr";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div>
          <p className={styles.wordmark}>Gimme Shelter House</p>
          <p className={styles.address}>Blvd. Argentino 8013, Fisherton, Rosario</p>
        </div>
        <div className={styles.rating}>
          <Star size={16} weight="fill" />
          <span>4.4 · 3.072 reseñas en Google</span>
        </div>
        <div className={styles.social}>
          <a
            href="https://instagram.com/gimmeshelterhouse"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <InstagramLogo size={20} />
          </a>
          <a
            href="https://www.facebook.com/GimmeShelterHouse"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            <FacebookLogo size={20} />
          </a>
        </div>
      </div>
      <p className={styles.disclaimer}>
        Muestra de Nivaror, no es el sitio oficial de Gimme Shelter House. El
        sitio real es gimmeshelter.com.ar.
      </p>
    </footer>
  );
}
