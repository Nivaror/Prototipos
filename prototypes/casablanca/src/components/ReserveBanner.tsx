import ReservationForm from "./ReservationForm";
import Reveal from "./Reveal";
import styles from "./ReserveBanner.module.css";

export default function ReserveBanner() {
  return (
    <section className={styles.section}>
      <Reveal className={`reveal wrap ${styles.inner}`}>
        <h2 className={styles.heading}>¿Reservás tu mesa?</h2>
        <p className={styles.sub}>Elegí día y horario, te confirmamos por WhatsApp.</p>
        <div className={styles.card}>
          <ReservationForm />
        </div>
        <p className={styles.altContact}>
          ¿Preferís escribir directo?{" "}
          <a href="https://wa.me/3417485610" target="_blank" rel="noopener noreferrer">
            Mandanos un WhatsApp
          </a>
          .
        </p>
      </Reveal>
    </section>
  );
}
