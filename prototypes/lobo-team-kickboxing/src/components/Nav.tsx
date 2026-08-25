import { FacebookLogo } from "@phosphor-icons/react/dist/ssr";
import styles from "./Nav.module.css";

export function Nav() {
  return (
    <header className={styles.nav}>
      <div className={`container ${styles.inner}`}>
        <span className={styles.wordmark}>LOBO TEAM</span>
        <nav className={styles.links}>
          <a href="#horarios">Horarios</a>
          <a href="#programas">Programas</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <a
          href="https://facebook.com/LoboTeam.KB"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.fb}
          aria-label="Facebook de Lobo Team"
        >
          <FacebookLogo size={20} weight="fill" />
        </a>
      </div>
    </header>
  );
}
