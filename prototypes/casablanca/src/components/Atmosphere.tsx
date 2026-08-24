import Image from "next/image";
import { Bicycle, CalendarCheck, Umbrella } from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";
import styles from "./Atmosphere.module.css";

const offers = [
  {
    icon: Umbrella,
    title: "Terraza",
    desc: "Mesas al aire libre para comer o tomar algo con mejor clima.",
  },
  {
    icon: Bicycle,
    title: "Delivery",
    desc: "Pedí desde casa cuando no tenés ganas de salir.",
  },
  {
    icon: CalendarCheck,
    title: "Reservas",
    desc: "Asegurá tu mesa antes de venir, sin vueltas.",
  },
];

export default function Atmosphere() {
  return (
    <section id="propuesta" className={styles.section}>
      <div className={`wrap ${styles.grid}`}>
        <Reveal className={`reveal ${styles.text}`}>
          <h2 className={styles.heading}>Bar, terraza y buena mesa</h2>
          <p className={styles.body}>
            Comida de bar y tragos en un ambiente relajado, pensado para pasar un
            rato con amigos o resolver una comida rápida sin ceremonias.
          </p>
          <div className={styles.offerList}>
            {offers.map((offer) => (
              <div className={styles.offerItem} key={offer.title}>
                <offer.icon size={26} weight="duotone" className={styles.offerIcon} />
                <div>
                  <div className={styles.offerTitle}>{offer.title}</div>
                  <div className={styles.offerDesc}>{offer.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className={`reveal ${styles.imageWrap}`} delay={120}>
          <Image
            src="/images/bar-drinks.png"
            alt="Barra con tragos servidos, ambiente de pub"
            fill
            sizes="(min-width: 950px) 40vw, 90vw"
          />
        </Reveal>
      </div>
    </section>
  );
}
