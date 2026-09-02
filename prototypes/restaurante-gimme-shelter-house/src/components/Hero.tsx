import Image from "next/image";
import ReservationWidget from "./ReservationWidget";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} id="reservar">
      <Image
        src="/images/ambiance-bar-drinks.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className={styles.bg}
      />
      <div className={styles.scrim} />
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h1 className={styles.headline}>
            Reservá tu mesa sin salir de este sitio
          </h1>
          <p className={styles.subtext}>
            Cocktails, cocina gourmet y catas en Fisherton. Elegí día, turno y
            personas acá, sin arrancar de cero por WhatsApp.
          </p>
        </div>
        <ReservationWidget />
      </div>
    </section>
  );
}
