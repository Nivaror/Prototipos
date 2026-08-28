import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <header className={styles.nav}>
      <div className={styles.inner}>
        <a href="#" className={styles.brand}>
          <span className={styles.mark}>AF</span>
          <span className={styles.brandText}>Gimnasio</span>
        </a>
        <nav className={styles.links}>
          <a href="#horarios">Horarios</a>
          <a href="#nosotros">Entrenamiento</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <a className={styles.cta} href="#contacto">
          Escribinos
        </a>
      </div>
    </header>
  );
}
