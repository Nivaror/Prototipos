import {
  Martini,
  ForkKnife,
  BowlFood,
  Wine,
  MusicNotes,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import styles from "./Offerings.module.css";

const OFFERINGS = [
  { icon: Martini, label: "Coctelería de autor" },
  { icon: BowlFood, label: "Street food" },
  { icon: ForkKnife, label: "Cocina gourmet" },
  { icon: Wine, label: "Cava propia" },
  { icon: UsersThree, label: "Eventos privados" },
  { icon: MusicNotes, label: "Música en vivo" },
];

export default function Offerings() {
  return (
    <section className={styles.section} aria-label="Lo que ofrece Gimme Shelter House">
      <div className={styles.row}>
        {OFFERINGS.map(({ icon: Icon, label }) => (
          <div className={styles.chip} key={label}>
            <Icon size={22} weight="duotone" className={styles.icon} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
