import { FacebookLogo, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <header className={styles.nav}>
      <div className={styles.inner}>
        <a href="#" className={styles.brand}>
          <span className={styles.mark}>DF</span>
          <span className={styles.brandText}>Centro de entrenamiento</span>
        </a>
        <nav className={styles.links}>
          <a href="#nombres">Los dos nombres</a>
          <a href="#horarios">Horarios</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <div className={styles.actions}>
          <a
            className={styles.socialLink}
            href="https://instagram.com/distritofuerza"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram: @distritofuerza"
          >
            <InstagramLogo size={18} weight="fill" />
            <span>Instagram</span>
          </a>
          <a
            className={styles.socialLink}
            href="https://facebook.com/distritofuerza"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook: Distrito Fuerza"
          >
            <FacebookLogo size={18} weight="fill" />
            <span>Facebook</span>
          </a>
          <a className={styles.cta} href="#contacto">
            Escribinos
          </a>
        </div>
      </div>
    </header>
  );
}
