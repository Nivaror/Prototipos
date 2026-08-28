import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div>
            <p className={styles.brand}>AF Gimnasio</p>
            <p className={styles.address}>Dr. Luis Vila 660, Rosario</p>
          </div>
          <div className={styles.hours}>
            <p>Lun / Mié / Vie: 6:30 a 21:15</p>
            <p>Mar / Jue: 8:00 a 21:15</p>
            <p>Sáb: 9:00 a 12:00 · Dom: cerrado</p>
          </div>
          <div className={styles.rating}>
            <p>4,8 sobre 5</p>
            <p>102 reseñas en Google</p>
          </div>
        </div>

        <p className={styles.disclaimer}>
          Esta página es una demo creada por Nivaror para mostrarle a AF
          Gimnasio cómo podría verse su sitio. No es el sitio oficial del
          gimnasio.
        </p>
      </div>
    </footer>
  );
}
