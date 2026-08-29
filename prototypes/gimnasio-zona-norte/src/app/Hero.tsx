import Image from "next/image";
import OpenStatus from "./OpenStatus";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.rail}>
          <OpenStatus />
          <p className={styles.railAddress}>
            Juan Jose Paso 1065
            <br />
            Lisandro de la Torre, Rosario
          </p>
        </div>

        <div className={styles.photoCol}>
          <Image
            src="/images/hero-gym-floor.jpg"
            alt="Piso de entrenamiento de Gimnasio Zona Norte"
            fill
            priority
            className={styles.photo}
            sizes="(max-width: 767px) 100vw, 40vw"
          />
        </div>

        <div className={styles.textCol}>
          <h1 className={styles.headline}>
            Zona Norte no cierra temprano los sabados.
          </h1>
          <p className={styles.subtext}>
            Sabados de 9 a 19, mas horas que la mayoria de los gimnasios de la
            zona.
          </p>
          <div className={styles.ctas}>
            <a href="#contacto" className={styles.primary}>
              Sumate este sabado
            </a>
            <a
              href="https://www.instagram.com/gimnasio.zonanorte"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondary}
            >
              Ver en Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
