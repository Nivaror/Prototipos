import Image from "next/image";
import { ArrowRight, MapPinLine } from "@phosphor-icons/react/dist/ssr";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.copy}>
        <h1 className={styles.headline}>
          Sabé exactamente cuándo abrimos.
        </h1>
        <p className={styles.subtext}>
          Lunes, miércoles y viernes abrimos a las 6:30. Martes y jueves, a
          las 8. Así no perdés el viaje.
        </p>
        <div className={styles.ctas}>
          <a className={styles.primary} href="#horarios">
            Ver horarios
            <ArrowRight size={16} weight="bold" />
          </a>
          <a
            className={styles.secondary}
            href="https://www.google.com/maps/search/?api=1&query=Dr.+Luis+Vila+660+Rosario"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MapPinLine size={16} weight="bold" />
            Cómo llegar
          </a>
        </div>
      </div>

      <div className={styles.mosaic}>
        <div className={styles.tileMain}>
          <Image
            src="/images/hero-gym-floor.jpg"
            alt="Piso de entrenamiento de AF Gimnasio"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 46vw"
            className={styles.photo}
          />
        </div>
        <div className={styles.tileSmallA}>
          <Image
            src="/images/detail-weights-rack.jpg"
            alt="Sector de pesas de AF Gimnasio"
            fill
            sizes="(max-width: 900px) 50vw, 23vw"
            className={styles.photo}
          />
        </div>
        <div className={styles.tileSmallB}>
          <Image
            src="/images/functional-training-zone.jpg"
            alt="Zona de entrenamiento funcional de AF Gimnasio"
            fill
            sizes="(max-width: 900px) 50vw, 23vw"
            className={styles.photo}
          />
        </div>
      </div>
    </section>
  );
}
