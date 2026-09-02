import styles from "./Nav.module.css";

export function Nav() {
  return (
    <nav className={styles.nav}>
      <span className={styles.brand}>Summum Gym</span>
      <div className={styles.links}>
        <a className={styles.link} href="#horario">
          Horario
        </a>
        <a className={styles.link} href="#contacto">
          Contacto
        </a>
        <a className={styles.cta} href="#contacto">
          Escribinos
        </a>
      </div>
    </nav>
  );
}
