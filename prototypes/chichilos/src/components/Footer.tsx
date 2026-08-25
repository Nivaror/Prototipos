import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <div className={styles.brand}>Chichilo&apos;s</div>
          <p className={styles.address}>Gorriti 415, Las Malvinas, Rosario, Santa Fe</p>
        </div>
        <div className={styles.links}>
          <a
            href="https://instagram.com/chichilospizzaok"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.igLink}
          >
            @chichilospizzaok
          </a>
          <p className={styles.fine}>
            Muestra de Nivaror, no el sitio oficial de Chichilo&apos;s.
          </p>
        </div>
      </div>
    </footer>
  );
}
