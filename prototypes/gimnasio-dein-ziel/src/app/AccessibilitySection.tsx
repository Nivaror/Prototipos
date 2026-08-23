import Image from "next/image";
import {
  DoorOpen,
  Wheelchair,
  Car,
  Toilet,
} from "@phosphor-icons/react/dist/ssr";
import reception from "../../public/images/ambiance-reception.jpg";
import { Reveal } from "./Reveal";
import styles from "./page.module.css";

const FEATURES = [
  { icon: DoorOpen, label: "Entrada accesible" },
  { icon: Wheelchair, label: "Espacio accesible" },
  { icon: Car, label: "Estacionamiento accesible" },
  { icon: Toilet, label: "Sanitarios accesibles" },
];

export function AccessibilitySection() {
  return (
    <section className={styles.accessSection}>
      <Reveal className={styles.accessGrid}>
        <div className={styles.accessImageCell}>
          <Image
            src={reception}
            alt="Recepción de Gimnasio Dein-Ziel"
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className={styles.accessImage}
          />
        </div>
        <div className={styles.accessTextCell}>
          <h2 className={styles.h2}>Pensado para que nadie se quede afuera</h2>
          <p className={styles.body}>
            Entrada, espacio de entrenamiento, estacionamiento y sanitarios con accesibilidad
            completa para personas en silla de ruedas.
          </p>
          <ul className={styles.featureList}>
            {FEATURES.map(({ icon: Icon, label }) => (
              <li key={label} className={styles.featureItem}>
                <span className={styles.featureIcon}>
                  <Icon size={22} weight="bold" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
