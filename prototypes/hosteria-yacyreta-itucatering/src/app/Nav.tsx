import styles from "./page.module.css";

export function Nav() {
  return (
    <header className={styles.nav}>
      <div className={`${styles.container} ${styles.navInner}`}>
        <span className={styles.navBrand}>Hostería Yacyretá</span>
        <nav className={styles.navLinks}>
          <a href="#restaurante">Restaurante</a>
          <a href="#catering">Catering</a>
        </nav>
      </div>
    </header>
  );
}
