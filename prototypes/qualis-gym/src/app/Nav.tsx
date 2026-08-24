import { InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import styles from "./page.module.css";
import { INSTAGRAM_URL } from "./hours";

export function Nav() {
  return (
    <header className={styles.nav}>
      <div className={styles.navInner}>
        <span className={styles.navLogo}>Qualis Gym</span>
        <nav className={`${styles.navLinksHideMobile} ${styles.navLinks}`}>
          <a className={styles.navLink} href="#horarios">
            Horarios
          </a>
          <a
            className={styles.navLink}
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramLogo size={16} weight="bold" />
            Instagram
          </a>
        </nav>
        <a className={`${styles.btn} ${styles.btnPrimary}`} href="#consultar">
          Consultá tu plan
        </a>
      </div>
    </header>
  );
}
