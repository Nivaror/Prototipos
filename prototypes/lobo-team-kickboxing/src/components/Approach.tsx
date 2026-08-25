import styles from "./Approach.module.css";

export function Approach() {
  return (
    <section className="section">
      <div className={`container ${styles.wrap}`}>
        <div className={styles.block}>
          <h2 className={styles.title}>Cómo se entrena acá</h2>
          <p className={styles.body}>
            Grupos reducidos, técnica antes que ritmo, y progresión real entre
            niveles. La clase se adapta a quien la toma, no al revés.
          </p>
        </div>
      </div>
    </section>
  );
}
