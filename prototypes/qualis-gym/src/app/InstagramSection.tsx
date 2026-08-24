import Image from "next/image";
import { ArrowUpRight, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import styles from "./page.module.css";
import { Reveal } from "./Reveal";
import { INSTAGRAM_URL } from "./hours";
import weights from "../../public/images/detail-weights-rack.jpg";
import functional from "../../public/images/functional-training-zone.jpg";
import action from "../../public/images/action-workout-silhouette.jpg";

export function InstagramSection() {
  return (
    <section className={styles.instagram}>
      <div className={styles.wrap}>
        <Reveal>
          <div className={styles.instagramHeadRow}>
            <div>
              <h2 className={styles.sectionTitle}>Seguí el día a día en Instagram</h2>
              <p className={styles.sectionBody}>
                @qualis.gym es el canal que ya usan. Esta página lo acompaña, no lo reemplaza.
              </p>
            </div>
            <a
              className={`${styles.btn} ${styles.btnOutline}`}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramLogo size={17} weight="bold" />
              @qualis.gym
            </a>
          </div>
        </Reveal>
        <Reveal>
          <div className={styles.instagramGrid}>
            <a
              className={styles.instagramTile}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir Instagram de Qualis Gym"
            >
              <Image src={weights} alt="Sector de pesas de Qualis Gym" sizes="25vw" />
            </a>
            <a
              className={styles.instagramTile}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir Instagram de Qualis Gym"
            >
              <Image src={functional} alt="Zona de entrenamiento funcional" sizes="25vw" />
            </a>
            <a
              className={styles.instagramTile}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir Instagram de Qualis Gym"
            >
              <Image src={action} alt="Entrenamiento en Qualis Gym" sizes="25vw" />
            </a>
            <a
              className={`${styles.instagramTile} ${styles.instagramCta}`}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramLogo size={26} weight="bold" />
              <span>Ver más</span>
              <ArrowUpRight size={16} weight="bold" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
