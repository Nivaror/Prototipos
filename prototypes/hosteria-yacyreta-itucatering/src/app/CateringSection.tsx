import Image from "next/image";
import { Confetti, UsersThree, Cookie } from "@phosphor-icons/react/dist/ssr";
import evento from "../../public/images/evento.jpg";
import { Reveal } from "./Reveal";
import { EventForm } from "./EventForm";
import styles from "./page.module.css";

const SERVICES = [
  {
    icon: Confetti,
    title: "Eventos y celebraciones",
    text: "Cumpleaños, aniversarios y festejos, con el espacio al aire libre disponible.",
  },
  {
    icon: UsersThree,
    title: "Menú para grupos",
    text: "Propuesta cerrada por persona, pensada para reuniones y empresas.",
  },
  {
    icon: Cookie,
    title: "Mesa dulce y catering",
    text: "Servicio de mesa dulce y viandas para eventos fuera del salón.",
  },
];

export function CateringSection() {
  return (
    <section id="catering" className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.container}>
        <div className={styles.cateringIntro}>
          <Reveal>
            <h2 className={styles.sectionTitle}>Catering y eventos</h2>
            <p className={styles.sectionLead}>
              Además del salón, organizan el servicio para tu evento. Hoy esa
              parte del negocio no se ve en ningún lado online: contanos qué
              necesitás y lo coordinamos desde acá.
            </p>
          </Reveal>
          <Reveal className={styles.cateringImg}>
            <Image src={evento} alt="" fill className={styles.bannerImg} sizes="(max-width: 860px) 100vw, 40vw" />
          </Reveal>
        </div>

        <Reveal className={styles.serviceGrid}>
          {SERVICES.map((s) => (
            <div key={s.title} className={styles.serviceCard}>
              <span className={styles.serviceIcon}>
                <s.icon size={20} weight="bold" />
              </span>
              <p className={styles.serviceTitle}>{s.title}</p>
              <p className={styles.serviceText}>{s.text}</p>
            </div>
          ))}
        </Reveal>

        <Reveal>
          <EventForm />
        </Reveal>
      </div>
    </section>
  );
}
