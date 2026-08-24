import { MapPin } from "@phosphor-icons/react/dist/ssr";
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <header className={styles.nav}>
      <div className={styles.brand}>
        <span className={styles.brandName}>teoma</span>
        <span className={styles.brandTag}>ESTUDIO PILATES &amp; FUNCIONAL</span>
      </div>
      <nav className={styles.links}>
        <a href="#disciplinas">Disciplinas</a>
        <a href="#filosofia">Filosofía</a>
        <a href="#horarios">Horarios</a>
      </nav>
      <a className={styles.cta} href="#horarios">
        <MapPin size={16} weight="bold" />
        Cómo llegar
      </a>
    </header>
  );
}
