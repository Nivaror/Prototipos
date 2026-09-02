import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.col}>
        <span className={styles.brand}>Euro Gym RED</span>
        <span>Blvd. Rondeau 3540, La Florida, Rosario</span>
        <a href="https://instagram.com/eurogymredrosario" target="_blank" rel="noopener noreferrer">
          @eurogymredrosario
        </a>
      </div>
      <div className={styles.col}>
        <span>4.5★ · 375 reseñas en Google</span>
        <span>Lun-Vie 06:00-21:00 · Sáb 06:00-20:00</span>
        <span>Dom 09:00-12:00 y 17:00-20:00</span>
      </div>
      <div className={styles.col}>
        <span>Muestra hecha por Nivaror.</span>
        <span>No es el sitio oficial de Euro Gym RED.</span>
      </div>
    </footer>
  );
}
