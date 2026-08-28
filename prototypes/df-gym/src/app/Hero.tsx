import Image from "next/image";
import { ArrowRight, MapPinLine } from "@phosphor-icons/react/dist/ssr";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.photoPanel}>
        <Image
          src="/images/action-workout-silhouette.jpg"
          alt="Entrenamiento en DF-Centro de entrenamiento"
          fill
          priority
          sizes="(max-width: 860px) 100vw, 62vw"
          className={styles.photo}
        />
      </div>

      <div className={styles.copyPanel}>
        <h1 className={styles.headline}>Entrená desde las 6 AM.</h1>
        <p className={styles.subtext}>
          DF-Centro de entrenamiento, en Las Malvinas, abre antes que la
          ciudad. Horarios claros, todos los días de semana.
        </p>
        <div className={styles.ctas}>
          <a className={styles.primary} href="#horarios">
            Ver horarios
            <ArrowRight size={16} weight="bold" />
          </a>
          <a className={styles.secondary} href="#nombres">
            ¿Por qué dos nombres?
          </a>
        </div>
      </div>

      <div className={styles.plaque}>
        <MapPinLine size={20} weight="fill" className={styles.plaqueIcon} />
        <p>
          En Maps figuramos como <strong>DF-Centro de entrenamiento</strong>.
          En Facebook nos vas a encontrar como <strong>Distrito Fuerza</strong>.
        </p>
        <a href="#nombres" className={styles.plaqueLink}>
          Es el mismo lugar
          <ArrowRight size={13} weight="bold" />
        </a>
      </div>
    </section>
  );
}
