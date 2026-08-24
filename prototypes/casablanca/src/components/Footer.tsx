import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer id="llegar" className={styles.footer}>
      <div className="wrap">
        <div className={styles.top}>
          <div>
            <div className={styles.brand}>Casablanca</div>
            <p className={styles.info}>
              Av. Eudoro Carrasco 4174, La Florida, Rosario, Santa Fe.
              <br />
              Abierto todos los días, 09:00 a 01:00 hs (aprox.).
              <br />
              <a
                href="https://www.google.com/maps/search/?api=1&query=Av.+Eudoro+Carrasco+4174+Rosario"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver en Google Maps
              </a>
            </p>
          </div>
          <p className={styles.disclaimer}>
            Esta página es una muestra creada por Nivaror para mostrarle a
            Casablanca cómo podría verse su presencia digital. No es el sitio
            oficial del negocio ni fue publicada por su equipo.
          </p>
        </div>
        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} Casablanca</span>
          <span>Muestra hecha por Nivaror</span>
        </div>
      </div>
    </footer>
  );
}
