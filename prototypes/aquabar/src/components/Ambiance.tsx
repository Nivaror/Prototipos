import Image from "next/image";
import styles from "./Ambiance.module.css";
import Reveal from "./Reveal";

export default function Ambiance() {
  return (
    <section className={styles.section}>
      <Image
        src="/images/ambiance-dining.png"
        alt="Salón principal de Aquabar"
        fill
        className={styles.image}
        sizes="100vw"
      />
      <div className={styles.scrim} />
      <div className={styles.content}>
        <Reveal>
          <h2>Comedor privado, para ocasiones especiales.</h2>
          <p>
            Aquabar se eligió durante años para festejos y cenas de pareja.
            Eso se nota en las reseñas, hoy solo visible en Facebook.
          </p>
          <div className={styles.tags}>
            <span className={styles.tag}>Ambiente romántico</span>
            <span className={styles.tag}>Comedor privado</span>
            <span className={styles.tag}>Abierto todos los días</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
