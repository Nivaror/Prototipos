import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.col}>
          <span className={styles.mark}>Gimnasio Zona Norte</span>
          <p>Juan Jose Paso 1065, Rosario, Santa Fe</p>
        </div>
        <div className={styles.col}>
          <p>Lunes a viernes: 9:00 a 21:00</p>
          <p>Sabados: 9:00 a 19:00</p>
          <p>Domingos: cerrado</p>
        </div>
        <div className={styles.col}>
          <p>4,5 estrellas &middot; 106 resenas en Google</p>
          <a
            href="https://www.instagram.com/gimnasio.zonanorte"
            target="_blank"
            rel="noopener noreferrer"
          >
            @gimnasio.zonanorte
          </a>
        </div>
      </div>
      <p className={styles.disclaimer}>
        Esta es una muestra creada por Nivaror para mostrar como podria verse
        un sitio propio. No es el sitio oficial de Gimnasio Zona Norte.
      </p>
    </footer>
  );
}
