import Image from "next/image";
import { Barbell, Heartbeat } from "@phosphor-icons/react/dist/ssr";
import styles from "./Services.module.css";

const CARDS = [
  {
    key: "musculacion",
    title: "Musculación",
    body: "Sala equipada para entrenar a tu ritmo, con series libres y máquinas para todos los niveles.",
    image: "/images/detail-weights-rack.jpg",
    icon: Barbell,
  },
  {
    key: "pilates",
    title: "Pilates",
    body: "Clases en grupos reducidos para mejorar postura, flexibilidad y fuerza.",
    image: "/images/ambiance-reception.jpg",
    icon: Heartbeat,
  },
];

function Card({ item, className }: { item: (typeof CARDS)[number]; className?: string }) {
  const Icon = item.icon;
  return (
    <article className={`${styles.card} ${className ?? ""}`}>
      <div className={styles.cardImage}>
        <Image src={item.image} alt="" fill sizes="(min-width: 768px) 420px, 100vw" style={{ objectFit: "cover" }} />
      </div>
      <div className={styles.cardBody}>
        <Icon size={22} weight="bold" className={styles.cardIcon} />
        <h3 className={styles.cardTitle}>{item.title}</h3>
        <p className={styles.cardText}>{item.body}</p>
      </div>
    </article>
  );
}

export default function Services() {
  return (
    <section id="servicios" className={`container ${styles.section}`}>
      <h2 className={styles.heading}>Dos formas de entrenar</h2>

      <div className={styles.stackDesktop}>
        <Card item={CARDS[0]} className={styles.cardA} />
        <Card item={CARDS[1]} className={styles.cardB} />
      </div>

      <div className={styles.stackMobile}>
        <Card item={CARDS[0]} />
        <Card item={CARDS[1]} />
      </div>
    </section>
  );
}
