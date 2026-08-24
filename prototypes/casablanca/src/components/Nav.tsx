import WhatsAppButton from "./WhatsAppButton";
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <header className={styles.nav}>
      <div className={`wrap ${styles.inner}`}>
        <span className={styles.brand}>Casablanca</span>
        <nav className={styles.links}>
          <a href="#horarios">Horarios</a>
          <a href="#propuesta">Propuesta</a>
          <a href="#llegar">Cómo llegar</a>
        </nav>
        <WhatsAppButton small />
      </div>
    </header>
  );
}
