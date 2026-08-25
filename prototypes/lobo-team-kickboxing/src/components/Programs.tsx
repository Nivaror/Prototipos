import { BoxingGlove, Target, Lightning } from "@phosphor-icons/react/dist/ssr";
import styles from "./Programs.module.css";

const programs = [
  {
    icon: BoxingGlove,
    name: "Iniciación",
    body: "Técnica de base, resistencia y adaptación al ritmo de clase. Sin experiencia previa.",
  },
  {
    icon: Target,
    name: "Intermedio",
    body: "Combinaciones, trabajo con guantes y compañero, más volumen por clase.",
  },
  {
    icon: Lightning,
    name: "Avanzado",
    body: "Sparring controlado e intensidad de competencia para alumnos con base sólida.",
  },
];

export function Programs() {
  return (
    <section id="programas" className="section">
      <div className="container">
        <h2 className={styles.title}>Niveles de entrenamiento</h2>
        <div className={styles.grid}>
          {programs.map(({ icon: Icon, name, body }) => (
            <div key={name} className={`card ${styles.card}`}>
              <Icon size={26} weight="regular" className={styles.icon} />
              <h3 className={styles.name}>{name}</h3>
              <p className={styles.body}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
