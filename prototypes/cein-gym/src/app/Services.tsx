import Image from "next/image";
import { UserFocus, UsersThree } from "@phosphor-icons/react/dist/ssr";
import styles from "./Services.module.css";

const services = [
  {
    name: "Musculación",
    desc: "Sector de pesas libres y máquinas guiadas.",
    image: "/images/detail-weights-rack.jpg",
  },
  {
    name: "Funcional",
    desc: "Circuitos de fuerza y movilidad en grupo reducido.",
    image: "/images/functional-training-zone.jpg",
  },
  {
    name: "Cardio",
    desc: "Cintas, bicicletas y zona de acondicionamiento.",
    image: "/images/action-workout-silhouette.jpg",
  },
  {
    name: "Entrenamiento personalizado",
    desc: "Plan armado con un profesor según tu objetivo.",
    icon: UserFocus,
  },
  {
    name: "Clases grupales",
    desc: "Turnos fijos de lunes a viernes, cupo limitado.",
    icon: UsersThree,
  },
];

export default function Services() {
  return (
    <section id="servicios" className={styles.section}>
      <h2 className={styles.heading}>Lo que vas a encontrar en el gimnasio</h2>
      <div className={styles.row}>
        {services.map((s) => (
          <article key={s.name} className={styles.card}>
            <div className={styles.visual}>
              {s.image ? (
                <Image
                  src={s.image}
                  alt=""
                  fill
                  sizes="220px"
                  className={styles.visualImage}
                />
              ) : s.icon ? (
                <s.icon size={30} weight="light" />
              ) : null}
            </div>
            <h3 className={styles.cardTitle}>{s.name}</h3>
            <p className={styles.cardDesc}>{s.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
