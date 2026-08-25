import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.inner}`}>
        <div>
          <p className={styles.brand}>Mapu</p>
          <p className={styles.info}>
            Av. Eudoro Carrasco 3610, Costanera y Escauriza, La Florida, Rosario.
            <br />
            Miércoles a domingo, 12 a 20 hs. Cerrado lunes y martes.
          </p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Mapu%20Rosario&query_place_id=ChIJf4bOLJBTtpURfqD4J191LP8"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mapLink}
          >
            Ver en Google Maps
          </a>
        </div>

        <div className={styles.right}>
          <a
            href="https://www.instagram.com/MapuRosario"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn pill-btn--ghost"
          >
            Seguir en Instagram
          </a>
          <p className={styles.disclaimer}>
            Esta página es una muestra creada por Nivaror para mostrarle a Mapu
            cómo podría verse su presencia digital. No es el sitio oficial del
            negocio ni fue publicada por su equipo.
          </p>
        </div>
      </div>
    </footer>
  );
}
