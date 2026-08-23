import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import salon from "../../public/images/salon.jpg";
import cocina from "../../public/images/cocina.jpg";
import styles from "./page.module.css";

export function PathSelector() {
  return (
    <section className={styles.pathSection}>
      <div className={`${styles.container} ${styles.pathGrid}`}>
        <a href="#restaurante" className={styles.pathCard}>
          <Image src={salon} alt="" fill className={styles.pathCardImg} sizes="(max-width: 768px) 100vw, 50vw" />
          <div className={styles.pathCardScrim} aria-hidden="true" />
          <div className={styles.pathCardBody}>
            <span className={styles.pathCardTag}>Todos los días menos lunes</span>
            <h2 className={styles.pathCardTitle}>El restaurante</h2>
            <p className={styles.pathCardText}>
              Salón, horarios y lo que sirven al mediodía y a la noche.
            </p>
            <span className={styles.pathCardArrow}>
              Ver horarios <ArrowRight size={16} weight="bold" />
            </span>
          </div>
        </a>
        <a href="#catering" className={styles.pathCard}>
          <Image src={cocina} alt="" fill className={styles.pathCardImg} sizes="(max-width: 768px) 100vw, 50vw" />
          <div className={styles.pathCardScrim} aria-hidden="true" />
          <div className={styles.pathCardBody}>
            <span className={styles.pathCardTag}>Eventos y grupos</span>
            <h2 className={styles.pathCardTitle}>Catering</h2>
            <p className={styles.pathCardText}>
              El servicio para tu evento, con una consulta directa sin llamar.
            </p>
            <span className={styles.pathCardArrow}>
              Ver servicios <ArrowRight size={16} weight="bold" />
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}
