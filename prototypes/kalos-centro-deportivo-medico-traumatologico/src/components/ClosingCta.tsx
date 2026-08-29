import Reveal from "./Reveal";
import styles from "./ClosingCta.module.css";

export default function ClosingCta() {
  return (
    <section className={styles.section}>
      <Reveal className={styles.inner}>
        <h2 className={styles.headline}>
          Pedí tu turno cuando lo necesites, no cuando atiendan el teléfono.
        </h2>
        <a href="#turno" className={styles.cta}>
          Pedir turno
        </a>
      </Reveal>
    </section>
  );
}
