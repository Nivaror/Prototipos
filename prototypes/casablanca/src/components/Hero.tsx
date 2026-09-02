import WhatsAppButton from "./WhatsAppButton";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.grain} aria-hidden="true" />
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.blockRow}>
          <div className={styles.panel}>
            <span className={styles.tag}>Pub restaurante · Frente al río</span>
            <h1 className={styles.headline}>Casablanca</h1>
            <p className={styles.sub}>
              En La Florida, a metros del Paraná y del Puente Rosario-Victoria.
              Terraza pet friendly, delivery y reservas, todos los días del año.
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
