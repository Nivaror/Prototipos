import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.col}>
          <span className={styles.wordmark}>El Banquete</span>
          <span className={styles.address}>José Ingenieros 6898, Rosario, Santa Fe</span>
        </div>
        <p className={styles.disclaimer}>
          Esta página es una muestra de Nivaror, no el sitio oficial de El Banquete.
        </p>
      </div>
    </footer>
  );
}
