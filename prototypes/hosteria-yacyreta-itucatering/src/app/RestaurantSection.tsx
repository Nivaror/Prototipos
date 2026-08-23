import Image from "next/image";
import {
  Star,
  TreeEvergreen,
  Wheelchair,
  CalendarCheck,
} from "@phosphor-icons/react/dist/ssr";
import bodega from "../../public/images/bodega.jpg";
import { Reveal } from "./Reveal";
import { ScheduleStatus } from "./ScheduleStatus";
import styles from "./page.module.css";

const FACTS = [
  {
    icon: TreeEvergreen,
    title: "Espacio al aire libre",
    text: "Mesas afuera además del salón, para los días de buen clima.",
  },
  {
    icon: CalendarCheck,
    title: "Se aceptan reservas",
    text: "Para grupos o una mesa segura antes de venir.",
  },
  {
    icon: Wheelchair,
    title: "Accesible en silla de ruedas",
    text: "El espacio está preparado para recibir a todos.",
  },
  {
    icon: Star,
    title: "4.5 sobre 5",
    text: "27 reseñas en Google.",
  },
];

export function RestaurantSection() {
  return (
    <section id="restaurante" className={styles.section}>
      <div className={styles.container}>
        <Reveal className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>El restaurante</h2>
          <p className={styles.sectionLead}>
            Servicio de mediodía y de noche, todos los días excepto el lunes.
          </p>
        </Reveal>

        <Reveal className={styles.infoGrid}>
          <div>
            <ScheduleStatus />
          </div>
          <ul className={styles.factsList}>
            {FACTS.map((fact) => (
              <li key={fact.title} className={styles.factItem}>
                <span className={styles.factIcon}>
                  <fact.icon size={19} weight="bold" />
                </span>
                <div>
                  <p className={styles.factTitle}>{fact.title}</p>
                  <p className={styles.factText}>{fact.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className={styles.banner}>
          <Image src={bodega} alt="" fill className={styles.bannerImg} sizes="100vw" />
          <div className={styles.bannerScrim} aria-hidden="true" />
          <p className={styles.bannerText}>
            Buena carta de vinos, café de sobremesa y postres de la casa.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
