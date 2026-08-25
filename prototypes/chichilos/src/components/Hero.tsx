import Image from "next/image";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.photoBand}>
        <Image
          src="/images/hero-pizza.jpg"
          alt="Pizza recién horneada, cortada, sobre una tabla de madera"
          fill
          priority
          sizes="100vw"
        />
      </div>
      <div className={styles.contentBand}>
        <div className={styles.inner}>
          <span className={styles.eyebrow}>Las Malvinas, Rosario</span>
          <h1 className={styles.headline}>El horario de Chichilo&apos;s, claro de una vez.</h1>
          <p className={styles.subtext}>
            4.5★ en Google con casi 500 reseñas — pero hoy el único modo de saber si está
            abierto es entrar a Instagram. Acá está la semana completa, día por día, y un
            lugar para reservar la mesa de la cena.
          </p>
          <div className={styles.ctaRow}>
            <a href="#horarios" className={styles.btnSolid}>
              Ver horario semanal
            </a>
            <a href="#reserva" className={styles.btnGhost}>
              Reservar para la cena
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
