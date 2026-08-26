import styles from "./Approach.module.css";

const points = [
  { n: "01", text: "Grupos reducidos" },
  { n: "02", text: "Técnica antes que ritmo" },
  { n: "03", text: "Progresión real entre niveles" },
];

export function Approach() {
  return (
    <section className={`section ${styles.section}`}>
      <div className={`container ${styles.wrap}`}>
        <h2 className={styles.title}>Cómo se entrena acá</h2>
        <div className={styles.strip}>
          {points.map((p) => (
            <div key={p.n} className={styles.point}>
              <span className={styles.n}>{p.n}</span>
              <span>{p.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
