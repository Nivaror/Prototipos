import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <header className={styles.nav}>
      <span className={styles.brand}>
        EURO GYM <span className={styles.brandAccent}>RED</span>
      </span>
      <a href="#contacto" className={styles.cta}>
        Reservar prueba
      </a>
    </header>
  );
}
