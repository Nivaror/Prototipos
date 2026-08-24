import Reveal from "./Reveal";
import styles from "./Disciplines.module.css";

const items = [
  {
    tone: "light",
    title: "Pilates",
    body: "Trabajo de control, postura y respiración en mat y reformer, en grupos reducidos pensados para progresar con acompañamiento cercano.",
    chips: ["Mat", "Reformer", "Grupos reducidos"],
  },
  {
    tone: "dark",
    title: "Funcional",
    body: "Entrenamiento con el propio peso corporal y elementos, orientado a fuerza, movilidad y resistencia, con series adaptadas a cada nivel.",
    chips: ["Fuerza", "Movilidad", "Resistencia"],
  },
] as const;

export default function Disciplines() {
  return (
    <section id="disciplinas" className={styles.section}>
      <Reveal>
        <h2 className={styles.heading}>Dos prácticas, dos formas de entrenar.</h2>
      </Reveal>
      <div className={styles.grid}>
        {items.map((item) => (
          <Reveal key={item.title}>
            <article className={`${styles.card} ${styles[item.tone]}`}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardBody}>{item.body}</p>
              <div className={styles.chips}>
                {item.chips.map((chip) => (
                  <span key={chip} className={styles.chip}>
                    {chip}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
