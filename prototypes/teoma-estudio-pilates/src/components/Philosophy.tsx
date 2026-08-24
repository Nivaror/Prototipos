import Reveal from "./Reveal";
import styles from "./Philosophy.module.css";

export default function Philosophy() {
  return (
    <section id="filosofia" className={styles.band}>
      <div className={styles.inner}>
        <Reveal>
          <p className={styles.statement}>
            Cada clase se adapta a tu punto de partida. No hace falta
            experiencia previa, solo ganas de moverte mejor.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
