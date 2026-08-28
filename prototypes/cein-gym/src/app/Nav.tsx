import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <header className={styles.nav}>
      <a href="#top" className={styles.brand}>
        CEIN
      </a>
      <nav className={styles.links}>
        <a href="#horarios">Horarios</a>
        <a href="#servicios">Servicios</a>
        <a href="#contacto">Contacto</a>
      </nav>
      <a href="#contacto" className={styles.cta}>
        Consultar
      </a>
    </header>
  );
}
