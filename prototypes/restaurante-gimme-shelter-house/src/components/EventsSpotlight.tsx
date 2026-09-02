import Image from "next/image";
import styles from "./EventsSpotlight.module.css";

export default function EventsSpotlight() {
  return (
    <section className={styles.section} id="catas">
      <Image
        src="/images/detail-table-setting.jpg"
        alt=""
        fill
        sizes="100vw"
        className={styles.bg}
      />
      <div className={styles.scrim} />
      <div className={styles.content}>
        <p className={styles.eyebrow}>Cava propia y ciclo de catas</p>
        <h2 className={styles.headline}>
          Las catas y los eventos privados también se reservan acá arriba
        </h2>
        <p className={styles.body}>
          Elegí &quot;Evento / cata&quot; en el selector de la portada y contanos qué
          estás armando. Nada de escribir todo desde cero por WhatsApp.
        </p>
        <a href="#reservar" className={styles.cta}>
          Ir al selector
        </a>
      </div>
    </section>
  );
}
