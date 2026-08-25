import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <span>Lobo Team Kickboxing · Galería Estadio, Av. Alberdi, Rosario</span>
        <span className={styles.disclaimer}>
          Muestra creada por Nivaror, no es el sitio oficial del negocio.
        </span>
      </div>
    </footer>
  );
}
