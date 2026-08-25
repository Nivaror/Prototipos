import styles from "./Highlights.module.css";

const HIGHLIGHTS = [
  "Terraza junto al río",
  "Chimenea",
  "Música en vivo",
  "Buenos cócteles",
  "Muy buena selección de cervezas",
  "Apto para chicos",
  "Se permiten perros",
  "Wifi gratis",
  "Menú en braille",
  "Acceso en silla de ruedas",
];

export default function Highlights() {
  return (
    <section className={styles.section}>
      <div className={`wrap ${styles.scroller}`}>
        {HIGHLIGHTS.map((item) => (
          <span key={item} className={styles.pill}>
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
