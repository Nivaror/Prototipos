import Image from "next/image";
import { InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.copy}>
          <h1 className={styles.headline}>
            Tu mesa en Puerto Pichón,
            <br />
            para cada franja del día.
          </h1>
          <p className={styles.subtext}>
            Brunch, almuerzo y cena con reserva propia, y el comedor privado
            que hoy solo se ve por Instagram.
          </p>
          <div className={styles.ctas}>
            <a href="#reservas" className="pill-btn pill-btn--accent">
              Reservar
            </a>
            <a
              href="https://instagram.com/puertopichon"
              target="_blank"
              rel="noopener noreferrer"
              className="pill-btn pill-btn--ghost"
            >
              <InstagramLogo size={18} weight="bold" />
              Ver Instagram
            </a>
          </div>
        </div>

        <div className={styles.frameWrap}>
          <div className={styles.frameOffset} aria-hidden />
          <div className={styles.frame}>
            <Image
              src="/images/hero-parrilla.jpg"
              alt="Parrilla de Puerto Pichón"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 45vw"
              className={styles.frameImg}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
