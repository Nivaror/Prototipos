import Image from "next/image";
import styles from "./page.module.css";
import { OpenTicket, HoursList } from "./OpenStatus";
import { Reservation } from "./Reservation";
import { PizzaMark } from "./PizzaMark";

const SERVICE_TAGS = [
  "Delivery a domicilio",
  "Para llevar",
  "Mesas al aire libre",
  "Apto para chicos",
  "Estacionamiento gratuito en la calle",
  "Tarjetas y pagos por NFC",
];

const MENU_CATEGORIES = [
  {
    label: "Pizzas",
    note: "El fuerte de la casa — la especialidad con la que abren cada noche.",
    image: "/images/menu-pizzas.png",
  },
  {
    label: "Aperitivos",
    note: "Para arrancar mientras llega el resto de la mesa.",
    image: "/images/menu-aperitivos.png",
  },
  {
    label: "Bocadillos",
    note: "Opciones más chicas, para picar o para llevar.",
    image: "/images/menu-bocadillos.png",
  },
];

export default function Home() {
  return (
    <main>
      <section className={styles.hero}>
        <Image
          src="/images/hero-pizzeria.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroScrim} aria-hidden="true" />
        <div className={styles.heroContent}>
          <PizzaMark className={styles.pizzaMark} />
          <h1 className={styles.title}>HARRY JR.</h1>
          <p className={styles.subtitle}>
            Pizzería a la noche en Ituzaingó, Corrientes — pizzas todos los
            días de la semana.
          </p>
          <OpenTicket />
          <div className={styles.quickActions}>
            <a href="#menu" className={styles.quickBtn}>
              Ver el menú
            </a>
            <a href="#reservar" className={styles.quickBtnPrimary}>
              Reservar mesa
            </a>
          </div>
        </div>
      </section>

      <section id="menu" className={styles.menuSection}>
        <h2 className={styles.sectionTitle}>Qué vas a encontrar</h2>
        <p className={styles.lede}>
          El menú completo (con precios y variedades) todavía no está
          publicado online — lo compartimos por Instagram. Estas son las
          categorías confirmadas de la casa:
        </p>
        <div className={styles.menuGrid}>
          {MENU_CATEGORIES.map((cat) => (
            <div key={cat.label} className={styles.menuCard}>
              <div className={styles.menuCardImage}>
                <Image
                  src={cat.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className={styles.menuCardBody}>
                <span className={styles.menuLabel}>{cat.label}</span>
                <span className={styles.menuNote}>{cat.note}</span>
              </div>
            </div>
          ))}
        </div>
        <a
          className={styles.cta}
          href="https://instagram.com/harryjr._itu"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver menú completo en Instagram →
        </a>
      </section>

      <section id="reservar" className={styles.section}>
        <h2 className={styles.sectionTitle}>Reservá tu mesa</h2>
        <p className={styles.lede}>
          Ideal para juntadas con amigos o salidas en grupo. Dejá tus datos y
          coordinamos tu mesa afuera.
        </p>
        <Reservation />
      </section>

      <section className={styles.splitSection}>
        <div className={styles.splitImage}>
          <Image
            src="/images/outdoor-seating.png"
            alt=""
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
        <div className={styles.splitContent}>
          <h2 className={styles.sectionTitle}>
            Un clásico nocturno de Ituzaingó
          </h2>
          <p className={styles.lede}>
            Un lugar informal y con buena onda, pensado para juntadas con
            amigos, salidas en grupo y visitas de fin de semana. Tiene mesas
            al aire libre y es un buen punto de encuentro para estudiantes,
            grupos y turistas de paso por la ciudad.
          </p>
          <span className={styles.rating}>★ 4.8 en Google · 51 reseñas</span>
          <div className={styles.tags}>
            {SERVICE_TAGS.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Cuándo pasar</h2>
        <p className={styles.lede}>
          Cocina abierta solo de noche — no hay servicio de almuerzo.
        </p>
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
            públicos de Google Maps. No es el sitio oficial de Harry Jr. Las
            fotos de este sitio son imágenes ambientales generadas por IA, no
            fotografías reales del local ni de sus platos.
          </p>
        </div>
      </footer>
    </main>
  );
}
