import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <header className={styles.nav}>
      <span className={styles.wordmark}>El Banquete</span>
      <div className={styles.links}>
        <a href="#horarios" className={styles.link}>
          Horarios
        </a>
        <a href="#pedido" className={styles.link}>
          Pedido
        </a>
      </div>
    </header>
  );
}
