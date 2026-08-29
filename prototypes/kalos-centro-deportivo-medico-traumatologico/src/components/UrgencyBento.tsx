import { FirstAidKit, Timer, ArrowsClockwise } from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";
import styles from "./UrgencyBento.module.css";

const CARDS = [
  {
    icon: FirstAidKit,
    title: "Lesión aguda",
    body: "Un esguince, un golpe, un dolor que apareció de un día para el otro. Cuanto antes se evalúa, mejor evoluciona.",
    tone: "teal" as const,
  },
  {
    icon: Timer,
    title: "Vuelta a la actividad",
    body: "Si hay una fecha para volver a entrenar o competir, el seguimiento tiene que ir al ritmo de esa fecha.",
    tone: "coral" as const,
  },
  {
    icon: ArrowsClockwise,
    title: "Control post-lesión",
    body: "Las sesiones de seguimiento también necesitan un horario propio, sin depender de encontrar un hueco en el teléfono.",
    tone: "plain" as const,
  },
];

export default function UrgencyBento() {
  return (
    <section className={styles.section}>
      <Reveal>
        <h2 className={styles.heading}>Por qué el momento importa</h2>
      </Reveal>
      <div className={styles.grid}>
        {CARDS.map((card, i) => (
          <Reveal key={card.title} className={styles.revealCell}>
            <div className={`${styles.card} ${styles[card.tone]}`} style={{ transitionDelay: `${i * 80}ms` }}>
              <card.icon size={26} weight="duotone" />
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardBody}>{card.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
