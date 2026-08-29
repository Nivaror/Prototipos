import Image from "next/image";
import { Star } from "@phosphor-icons/react/dist/ssr";
import styles from "./Hero.module.css";
import { RATING_TEXT } from "@/lib/hours";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.photo}>
        <Image
          src="/images/hero-waiting-room.jpg"
          alt="Sala de espera del centro"
          fill
          priority
          sizes="(max-width: 900px) 100vw, 55vw"
          className={styles.img}
        />
      </div>
      <div className={styles.panel}>
        <div className={styles.panelInner}>
          <h1 className={styles.headline}>Cuando una lesión no puede esperar</h1>
          <p className={styles.subtext}>
            Kinesiología y traumatología deportiva en Rosario. Pedí tu turno
            online, sin depender de que atiendan el teléfono.
          </p>
          <div className={styles.ctaRow}>
            <a href="#turno" className={styles.primaryCta}>
              Pedir turno
            </a>
            <span className={styles.ratingChip}>
              <Star weight="fill" size={15} />
              {RATING_TEXT}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
