import WhatsAppButton from "./WhatsAppButton";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.grain} aria-hidden="true" />
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.blockRow}>
          <div className={styles.panel}>
            <span className={styles.tag}>Pub restaurante · La Florida</span>
            <h1 className={styles.headline}>Casablanca</h1>
            <p className={styles.sub}>
              Terraza, delivery y reservas en Rosario, todos los días del año.
            </p>
            <div className={styles.ctaRow}>
              <WhatsAppButton />
              <a className={styles.secondary} href="#horarios">
                Ver horarios
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
