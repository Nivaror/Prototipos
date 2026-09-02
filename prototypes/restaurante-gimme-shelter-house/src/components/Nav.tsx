import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <header className={styles.nav}>
      <span className={styles.wordmark}>Gimme Shelter House</span>
      <nav className={styles.links}>
        <a href="#catas" className={styles.link}>
          Catas y eventos
        </a>
        <a href="#reservar" className={styles.cta}>
          Reservar
        </a>
      </nav>
    </header>
  );
}
