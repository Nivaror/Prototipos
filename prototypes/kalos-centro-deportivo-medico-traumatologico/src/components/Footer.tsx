import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.disclaimer}>
          Esta página es una muestra creada por Nivaror para KALOS Centro
          Deportivo Médico Traumatológico y no es el sitio oficial del
          centro. Los datos de horario, dirección y calificación provienen de
          su ficha pública de Google. El formulario de turno es una
          demostración: no envía la solicitud a ningún sistema real todavía.
        </p>
        <p className={styles.credit}>Hecho por Nivaror</p>
      </div>
    </footer>
  );
}
