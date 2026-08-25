import { FacebookLogo } from "@phosphor-icons/react/dist/ssr";
import { FACEBOOK_URL } from "./hours";
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <header className={styles.nav}>
      <div className={`container ${styles.inner}`}>
        <span className={styles.mark}>OLIMPO GYM</span>
        <nav className={styles.links}>
          <a href="#servicios">Servicios</a>
          <a href="#horarios">Horarios</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <a
          href={FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.fb}
          aria-label="Facebook de Olimpo Gym"
        >
          <FacebookLogo size={20} weight="bold" />
        </a>
      </div>
    </header>
  );
}
