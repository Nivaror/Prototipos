import Image from "next/image";
import { WINDOWS } from "@/lib/windows";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.photoCell}>
          <Image
            src="/images/ambiente-salon.jpg"
            alt="Salón de Mapu Rosario"
            fill
            priority
            sizes="(max-width: 860px) 100vw, 55vw"
            className={styles.photo}
          />
          <span className={styles.rating}>4.7 ★ · 9083 reseñas en Google</span>
        </div>

        <div className={styles.copyCell}>
          <h1 className={styles.headline}>Reservá tu lugar en la Costanera</h1>
          <p className={styles.subtext}>
            Brunch, almuerzo o cena: elegí tu franja y asegurá la mesa antes de ir.
          </p>
          <a href="#reservas" className="pill-btn pill-btn--accent">
            Reservar ahora
          </a>
        </div>

        <div className={styles.chipsCell}>
          {WINDOWS.map((w) => (
            <a key={w.id} href={`#reservas-${w.id}`} className={styles.chip}>
              <span className={styles.chipLabel}>{w.label}</span>
              <span className={styles.chipHours}>{w.hours}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
