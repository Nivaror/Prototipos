import styles from "./page.module.css";
import { OpenTicket, HoursList } from "./OpenStatus";

const SERVICE_TAGS = [
  "Delivery a domicilio",
  "Para llevar",
  "Mesas al aire libre",
  "Apto para chicos",
  "Estacionamiento gratuito en la calle",
  "Tarjetas y pagos por NFC",
];

export default function Home() {
  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <p className={styles.eyebrow}>Pizzería · Ituzaingó, Corrientes</p>
        <h1 className={styles.title}>HARRY JR.</h1>
        <p className={styles.subtitle}>
          Pizzas a la noche, todos los días de la semana.
        </p>
        <OpenTicket />
        <p className={styles.scrollCue}>Bajá para ver más ↓</p>
      </section>

      <section className={styles.section}>
        <p className={styles.sectionEyebrow}>Así es Harry Jr.</p>
        <h2 className={styles.sectionTitle}>
          Un clásico nocturno de Ituzaingó
        </h2>
        <p className={styles.lede}>
          Un lugar informal y con buena onda, pensado para juntadas con
          amigos, salidas en grupo y visitas de fin de semana. Tiene mesas al
          aire libre y es un buen punto de encuentro para estudiantes,
          grupos y turistas de paso por la ciudad.
        </p>
        <span className={styles.rating}>★ 4.8 en Google · 51 reseñas</span>
      </section>

      <section className={styles.section}>
        <p className={styles.sectionEyebrow}>Servicios</p>
        <h2 className={styles.sectionTitle}>Cómo pedir y disfrutar</h2>
        <div className={styles.tags}>
          {SERVICE_TAGS.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <p className={styles.sectionEyebrow}>Horarios</p>
        <h2 className={styles.sectionTitle}>Cuándo pasar</h2>
        <HoursList />
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p className={styles.footerTitle}>¿Se te antojó?</p>
          <p className={styles.address}>
            Francisco López y Belgrano, Ituzaingó, Corrientes
          </p>
          <a
            className={styles.cta}
            href="https://instagram.com/harryjr._itu"
            target="_blank"
            rel="noopener noreferrer"
          >
            Seguinos en Instagram →
          </a>
          <p className={styles.meta}>
            Ticket estimado (Google): $10.000 – $20.000
          </p>
          <p className={styles.disclaimer}>
            Prototipo de demostración creado por Nivaror a partir de datos
            públicos de Google Maps. No es el sitio oficial de Harry Jr.
          </p>
        </div>
      </footer>
    </main>
  );
}
