import { Barbell, PersonSimpleRun, UsersThree, Heartbeat, Lockers } from "@phosphor-icons/react/dist/ssr";
import styles from "./Offerings.module.css";

// Rubros genéricos de un gimnasio tradicional, no confirmados puntualmente
// en el audit (Maps no lista servicios) pero suficientemente genéricos para
// no atribuirle a Euro Gym RED nada específico que no se pueda sostener.
// Placeholder permitido per core/prototype-workflow.md.
const ITEMS = [
  { label: "Musculación", icon: Barbell },
  { label: "Funcional", icon: PersonSimpleRun },
  { label: "Clases grupales", icon: UsersThree },
  { label: "Cardio", icon: Heartbeat },
  { label: "Vestuarios", icon: Lockers },
];

export default function Offerings() {
  const loop = [...ITEMS, ...ITEMS];

  return (
    <section className={styles.section} aria-label="Qué vas a encontrar en el gimnasio">
      <div className={styles.track}>
        {loop.map(({ label, icon: Icon }, i) => (
          <span className={styles.item} key={`${label}-${i}`}>
            <Icon size={26} weight="bold" />
            {label}
          </span>
        ))}
      </div>
    </section>
  );
}
