import {
  Barbell,
  Lightning,
  Wheelchair,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import styles from "./Highlights.module.css";

const ITEMS = [
  {
    icon: Barbell,
    label: "Musculación",
    detail: "Zona de pesas y máquinas para todos los niveles.",
  },
  {
    icon: Lightning,
    label: "Entrenamiento funcional",
    detail: "Espacio dedicado a rutinas de alta intensidad.",
  },
  {
    icon: UsersThree,
    label: "Atención personalizada",
    detail: "Seguimiento cercano dentro y fuera del horario de clase.",
  },
  {
    icon: Wheelchair,
    label: "Entrada accesible",
    detail: "Ingreso en silla de ruedas, confirmado en el local.",
  },
];

export default function Highlights() {
  return (
    <section id="nosotros" className={styles.section}>
      <div className={styles.row}>
        {ITEMS.map(({ icon: Icon, label, detail }) => (
          <div className={styles.item} key={label}>
            <Icon size={26} weight="regular" className={styles.icon} />
            <div>
              <p className={styles.label}>{label}</p>
              <p className={styles.detail}>{detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
