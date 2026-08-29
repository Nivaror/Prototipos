import styles from "./Reputation.module.css";

export default function Reputation() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.row}`}>
        <div className={styles.stat}>
          <span className={styles.num}>4,5</span>
          <span className={styles.label}>estrellas en Google</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.num}>106</span>
          <span className={styles.label}>reseñas</span>
        </div>
        <a
          href="https://www.instagram.com/gimnasio.zonanorte"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.igStat}
        >
          <span className={styles.num}>IG</span>
          <span className={styles.label}>seguinos ahi</span>
        </a>
      </div>
    </section>
  );
}
