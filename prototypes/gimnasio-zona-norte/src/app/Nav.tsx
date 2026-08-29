import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <header className={styles.nav}>
      <div className={`container ${styles.inner}`}>
        <span className={styles.mark}>Zona Norte</span>
        <nav className={styles.links}>
          <a href="#horarios">Horarios</a>
          <a href="#instalaciones">Instalaciones</a>
          <a href="#contacto">Contacto</a>
          <a
            href="https://www.instagram.com/gimnasio.zonanorte"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </nav>
      </div>
    </header>
  );
}
