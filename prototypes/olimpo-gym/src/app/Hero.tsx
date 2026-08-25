import Image from "next/image";
import { FacebookLogo, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { FACEBOOK_URL } from "./hours";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.imageBand}>
        <Image
          src="/images/hero-gym-floor.jpg"
          alt="Sala de entrenamiento de Olimpo Gym"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="container">
        <div className={styles.textZone}>
          <h1 className={styles.headline}>
            Musculación y pilates, en Olimpo Gym.
          </h1>
          <p className={styles.subtext}>
            4,9 estrellas en Google con 47 reseñas. Conocé los horarios y los
            dos servicios antes de venir.
          </p>
          <div className={styles.ctas}>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.primary}
            >
              <FacebookLogo size={18} weight="bold" />
              Ver Facebook
            </a>
            <a href="#contacto" className={styles.secondary}>
              Consultar planes
              <ArrowRight size={16} weight="bold" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
