import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <header className={styles.nav}>
      <div className={`wrap ${styles.inner}`}>
        <span className={styles.brand}>Mapu</span>
        <nav className={styles.links}>
          <a href="#reservas">Reservas</a>
          <a href="#ambiente">El lugar</a>
          <a
            href="https://www.instagram.com/MapuRosario"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.instagram}
          >
            Instagram
          </a>
        </nav>
      </div>
    </header>
  );
}
