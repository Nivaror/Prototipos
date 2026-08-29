import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <header className={styles.nav}>
      <div className={styles.inner}>
        <span className={styles.mark}>KALOS</span>
        <a href="#turno" className={styles.cta}>
          Pedir turno
        </a>
      </div>
    </header>
  );
}
