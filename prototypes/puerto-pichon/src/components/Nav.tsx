import { InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <header className={styles.nav}>
      <div className={`wrap ${styles.inner}`}>
        <span className={styles.mark}>Puerto Pichón</span>
        <nav className={styles.links}>
          <a href="#reservas">Reservas</a>
          <a href="#comedor-privado">Comedor privado</a>
          <a href="#nosotros">Nosotros</a>
        </nav>
        <a
          href="https://instagram.com/puertopichon"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ig}
          aria-label="Instagram de Puerto Pichón"
        >
          <InstagramLogo size={20} weight="bold" />
        </a>
      </div>
    </header>
  );
}
