import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <span className={styles.brandName}>teoma</span>
          <p className={styles.tagline}>
            Estudio boutique de pilates y entrenamiento funcional en Alberdi,
            Rosario.
          </p>
        </div>
        <div className={styles.meta}>
          <span>Dr. Pedro José Agrelo 3132, Rosario, Santa Fe</span>
          <span>Lunes a viernes, 8:00 a 21:00</span>
        </div>
        <p className={styles.disclaimer}>
          Este sitio es una muestra creada por Nivaror a modo de propuesta y
          no es el sitio oficial de teoma estudio pilates &amp; funcional.
          Los datos de horario, dirección y reseñas provienen de la ficha
          pública del negocio en Google Maps.
        </p>
      </div>
    </footer>
  );
}
