import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <div className={styles.stats}>
        <div className={`container ${styles.statsRow}`}>
          <span>
            <strong>4,1</strong> · calificación en Google
          </span>
          <span>
            <strong>3.728</strong> reseñas
          </span>
          <span>
            <strong>9:00 a 00:00</strong> · todos los días
          </span>
        </div>
      </div>
      <footer className={styles.footer}>
        <div className={`container ${styles.top}`}>
          <div>
            <div className={styles.brand}>Aquabar</div>
            <p className={styles.address}>Cordiviola y el Río, Rosario, Santa Fe.</p>
          </div>
          <div className={styles.links}>
            <a
              href="https://facebook.com/AquaBarRosario"
              target="_blank"
              rel="noopener noreferrer"
            >
              facebook.com/AquaBarRosario
            </a>
          </div>
        </div>
        <div className={`container ${styles.disclaimer}`}>
          Esta página es una muestra creada por Nivaror para mostrarle a
          Aquabar cómo podría verse una reserva online. No es el sitio
          oficial del negocio, no está afiliada a Aquabar y las reservas
          hechas acá no llegan al restaurante.
        </div>
      </footer>
    </>
  );
}
