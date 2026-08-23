import Image from "next/image";
import {
  Barbell,
  PersonSimpleRun,
  UsersThree,
  IdentificationBadge,
} from "@phosphor-icons/react/dist/ssr";
import weights from "../../public/images/detail-weights-rack.jpg";
import functional from "../../public/images/functional-training-zone.jpg";
import { Reveal } from "./Reveal";
import styles from "./page.module.css";

const CLASSES = [
  {
    icon: Barbell,
    title: "Musculación",
    body: "Sector de pesas libres y máquinas para tu rutina de fuerza.",
    image: weights,
  },
  {
    icon: PersonSimpleRun,
    title: "Funcional",
    body: "Entrenamiento con el propio peso corporal y elementos variados.",
    image: functional,
  },
  {
    icon: UsersThree,
    title: "Clases grupales",
    body: "Entrená acompañado, a un ritmo pensado para todo el grupo.",
    image: null,
  },
  {
    icon: IdentificationBadge,
    title: "Entrenamiento personalizado",
    body: "Seguimiento uno a uno según tu objetivo y tu nivel.",
    image: null,
  },
];

export function ClassesSection() {
  return (
    <section className={styles.classesSection}>
      <Reveal>
        <h2 className={styles.h2}>Entrená como quieras</h2>
      </Reveal>
      <div className={styles.classesGrid}>
        {CLASSES.map(({ icon: Icon, title, body, image }) => (
          <Reveal key={title} className={styles.classCard}>
            {image && (
              <Image
                src={image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className={styles.classCardImage}
              />
            )}
            <div className={styles.classCardOverlay} />
            <div className={styles.classCardContent}>
              <span className={styles.classCardIcon}>
                <Icon size={24} weight="bold" />
              </span>
              <h3 className={styles.classCardTitle}>{title}</h3>
              <p className={styles.classCardBody}>{body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
