import Reveal from "./Reveal";
import TurnoRequest from "./TurnoRequest";
import styles from "./TurnoSection.module.css";

export default function TurnoSection() {
  return (
    <section id="turno" className={styles.section}>
      <Reveal className={styles.header}>
        <h2 className={styles.heading}>Pedí tu turno</h2>
        <p className={styles.subtext}>
          Contanos el motivo y el horario que te queda mejor. El centro te
          confirma por WhatsApp o llamada, sin que dependas de encontrar la
          línea libre.
        </p>
      </Reveal>
      <Reveal className={styles.formWrap}>
        <TurnoRequest />
      </Reveal>
    </section>
  );
}
