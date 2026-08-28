import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.imageCol}>
        <Image
          src="/images/hero-bar.png"
          alt="Barra y salón de Aquabar, Rosario"
          fill
          priority
          sizes="(max-width: 900px) 100vw, 55vw"
        />
      </div>
      <div className={styles.textCol}>
        <div className={styles.textInner}>
          <h1 className={styles.headline}>
            Tu mesa en Aquabar, reservada antes de llegar.
          </h1>
          <p className={styles.sub}>
            Ambiente romántico, comedor privado y vista al río. Elegí
            almuerzo o cena y reservá en un minuto.
          </p>
          <div className={styles.rating}>4,1 ★ · 3.728 reseñas en Google</div>
          <div className={styles.ctaRow}>
            <a className={styles.primary} href="#reservas">
              Reservar ahora
            </a>
            <a
              className={styles.secondary}
              href="https://facebook.com/AquaBarRosario"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver Facebook
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
