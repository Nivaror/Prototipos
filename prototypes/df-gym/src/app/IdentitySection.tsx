import {
  MapPinLine,
  FacebookLogo,
  LinkSimple,
  Star,
} from "@phosphor-icons/react/dist/ssr";
import styles from "./IdentitySection.module.css";

export default function IdentitySection() {
  return (
    <section id="nombres" className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.headline}>Un mismo gimnasio, dos nombres</h2>
        <p className={styles.body}>
          En Maps buscás &ldquo;DF-Centro de entrenamiento&rdquo;. En
          Facebook, el mismo gimnasio se llama &ldquo;Distrito
          Fuerza&rdquo;.
        </p>
      </div>

      <div className={styles.pair}>
        <article className={styles.card}>
          <span className={styles.cardLabel}>
            <MapPinLine size={16} weight="fill" />
            Así aparecemos en Google Maps
          </span>
          <h3 className={styles.cardTitle}>DF-Centro de entrenamiento</h3>
          <div className={styles.rating}>
            <Star size={15} weight="fill" />
            <span>4,8 · 117 reseñas</span>
          </div>
          <p className={styles.cardDetail}>
            Gorriti 357, Las Malvinas, Rosario
          </p>
        </article>

        <div className={styles.connector} aria-hidden="true">
          <span className={styles.connectorLine} />
          <span className={styles.connectorBadge}>
            <LinkSimple size={16} weight="bold" />
          </span>
          <span className={styles.connectorLine} />
        </div>

        <article className={styles.card}>
          <span className={styles.cardLabel}>
            <FacebookLogo size={16} weight="fill" />
            Así aparecemos en Facebook
          </span>
          <h3 className={styles.cardTitle}>Distrito Fuerza</h3>
          <p className={styles.cardDetail}>
            La única presencia online del gimnasio, hasta ahora.
          </p>
          <a
            className={styles.cardLink}
            href="https://facebook.com/distritofuerza"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver la página en Facebook
            <LinkSimple size={13} weight="bold" />
          </a>
        </article>
      </div>
    </section>
  );
}
