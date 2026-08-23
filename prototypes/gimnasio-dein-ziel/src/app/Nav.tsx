import styles from "./page.module.css";
import { OpenStatus } from "./OpenStatus";

export function Nav() {
  return (
    <header className={styles.nav}>
      <a className={styles.wordmark} href="#top">
        DEIN-ZIEL
      </a>
      <div className={styles.navRight}>
        <OpenStatus />
        <a className={`${styles.btn} ${styles.btnPrimary} ${styles.navCta}`} href="#proba">
          Pedí tu clase de prueba
        </a>
      </div>
    </header>
  );
}
