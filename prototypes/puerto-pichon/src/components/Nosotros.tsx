import Image from "next/image";
import {
  Fire,
  WifiHigh,
  Wheelchair,
  Car,
  Coffee,
} from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";
import styles from "./Nosotros.module.css";

const AMENITIES = [
  { icon: Fire, label: "Chimenea" },
  { icon: Coffee, label: "Terraza y buen café" },
  { icon: WifiHigh, label: "WiFi gratis" },
  { icon: Wheelchair, label: "Acceso en silla de ruedas" },
  { icon: Car, label: "Estacionamiento gratuito" },
];

export default function Nosotros() {
  return (
    <section id="nosotros" className={styles.section}>
      <div className={styles.bgWrap}>
        <Image
          src="/images/ambiente-salon.jpg"
          alt="Salón de Puerto Pichón"
          fill
          sizes="100vw"
          className={styles.bg}
        />
        <div className={styles.scrim} />
      </div>

      <div className={`wrap ${styles.content}`}>
        <Reveal>
          <h2 className={styles.title}>
            Terraza, chimenea y sobremesa larga.
          </h2>
          <p className={styles.body}>
            Un bar con onda de barrio en Alberdi, pensado para quedarse un
            rato más después de comer.
          </p>
          <ul className={styles.amenities}>
            {AMENITIES.map(({ icon: Icon, label }) => (
              <li key={label}>
                <Icon size={16} weight="bold" />
                {label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
