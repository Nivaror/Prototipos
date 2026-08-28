import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div>
          <p className={styles.brand}>CEIN</p>
          <p className={styles.address}>Darregueira 1265, Rosario, Santa Fe</p>
        </div>
        <div className={styles.hours}>
          <p>Lunes a viernes, 7 a 21 hs</p>
          <p>Sábado y domingo, cerrado</p>
        </div>
      </div>
      <div className={styles.disclaimer}>
        Este sitio es una demo creada por Nivaror a modo de muestra. No es el
        sitio oficial de CEIN.
      </div>
    </footer>
  );
}
