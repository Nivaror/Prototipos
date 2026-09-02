import { InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import styles from "./Reputation.module.css";

export default function Reputation() {
  return (
    <section className={styles.section}>
      <span className={styles.watermark} aria-hidden>
        4.5
      </span>
      <div className={styles.card}>
        <span className={styles.stars}>★★★★★</span>
        <span className={styles.count}>375 reseñas en Google, sin filtro</span>
        <a
          href="https://instagram.com/eurogymredrosario"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          <InstagramLogo size={16} weight="bold" style={{ verticalAlign: "-3px", marginRight: 6 }} />
          @eurogymredrosario
        </a>
      </div>
    </section>
  );
}
