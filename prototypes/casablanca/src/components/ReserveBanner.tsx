import WhatsAppButton from "./WhatsAppButton";
import Reveal from "./Reveal";
import styles from "./ReserveBanner.module.css";

export default function ReserveBanner() {
  return (
    <section className={styles.section}>
      <Reveal className={`reveal wrap ${styles.inner}`}>
        <h2 className={styles.heading}>¿Reservás tu mesa?</h2>
        <p className={styles.sub}>
          Escribinos por WhatsApp y te confirmamos el lugar, sin llamadas.
        </p>
        <div className={styles.ctaWrap}>
          <WhatsAppButton />
        </div>
      </Reveal>
    </section>
  );
}
