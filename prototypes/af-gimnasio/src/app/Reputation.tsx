import Image from "next/image";
import { Star } from "@phosphor-icons/react/dist/ssr";
import styles from "./Reputation.module.css";

export default function Reputation() {
  return (
    <section className={styles.section}>
      <div className={styles.frame}>
        <Image
          src="/images/action-workout-silhouette.jpg"
          alt="Entrenamiento en AF Gimnasio"
          fill
          sizes="(max-width: 700px) 80vw, 380px"
          className={styles.photo}
        />
        <div className={styles.badge}>
          <span className={styles.rating}>4,8</span>
          <div className={styles.stars}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} weight="fill" />
            ))}
          </div>
          <span className={styles.count}>102 reseñas</span>
        </div>
      </div>

      <div className={styles.text}>
        <p className={styles.lead}>
          Casi cien reseñas de cinco estrellas antes de tener sitio propio.
        </p>
        <a
          className={styles.link}
          href="https://www.google.com/maps/place/?q=place_id:ChIJnWj12ZdTtpUReunkFIsR0IM"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver reseñas en Google Maps
        </a>
      </div>
    </section>
  );
}
