import styles from "./Programs.module.css";

const programs = [
  {
    step: "01",
    name: "Iniciación",
    body: "Técnica de base, resistencia y adaptación al ritmo de clase. Sin experiencia previa.",
  },
  {
    step: "02",
    name: "Intermedio",
    body: "Combinaciones, trabajo con guantes y compañero, más volumen por clase.",
  },
  {
    step: "03",
    name: "Avanzado",
    body: "Sparring controlado e intensidad de competencia para alumnos con base sólida.",
  },
];

export function Programs() {
  return (
    <section id="programas" className="section">
      <div className="container">
        <h2 className={styles.title}>Niveles de entrenamiento</h2>
        <div className={styles.ladder}>
          {programs.map(({ step, name, body }, i) => (
            <div key={name} className={styles.rung}>
              <div className={styles.node}>
                <span className={styles.step}>{step}</span>
                {i < programs.length - 1 && <span className={styles.connector} aria-hidden="true" />}
              </div>
              <div className={styles.copy}>
                <h3 className={styles.name}>{name}</h3>
                <p className={styles.body}>{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
