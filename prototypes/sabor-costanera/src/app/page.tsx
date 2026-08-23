import Image from "next/image";
import styles from "./page.module.css";
import { OpenTicket, WeekBand } from "./OpenStatus";
import { Order } from "./Order";

const SERVICE_TAGS = [
  "Delivery",
  "Para llevar",
  "Retiro sin bajar del auto",
  "Pedidos sin contacto",
];

export default function Home() {
  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h1 className={styles.title}>Sabor Costanera</h1>
          <p className={styles.subtitle}>
            Pizza a la noche en Corrientes. Delivery, para llevar y retiro en
            el local, de miércoles a lunes.
          </p>
          <OpenTicket />
          <a href="#pedido" className={styles.heroCta}>
            Ver el menú
          </a>
        </div>
        <div className={styles.heroImage}>
          <Image
            src="/images/hero-pizzeria.png"
            alt=""
            fill
            priority
            sizes="(max-width: 900px) 100vw, 50vw"
            className={styles.heroImageEl}
          />
        </div>
      </section>

      <section id="pedido" className={styles.section}>
        <h2 className={styles.sectionTitle}>Armá tu pedido</h2>
        <p className={styles.lede}>
          Hoy, para pedir hay que llamar sin saber bien qué hay disponible.
          Así se vería poder armarlo antes de eso.
        </p>
        <Order />
      </section>

      <section id="horarios" className={styles.weekSection}>
        <h2 className={styles.sectionTitle}>Abierto toda la semana, menos los martes</h2>
        <WeekBand />
      </section>

      <section className={styles.banner}>
        <Image
          src="/images/ambiance-costanera.png"
          alt=""
          fill
          sizes="100vw"
          className={styles.bannerImage}
        />
        <div className={styles.bannerScrim} aria-hidden="true" />
        <div className={styles.bannerContent}>
          <span className={styles.rating}>★ 4.8 en Google · 15 reseñas</span>
          <p className={styles.bannerText}>
            Una pizzería de barrio, para pedir a la noche y comer donde
            quieras.
          </p>
          <div className={styles.tags}>
            {SERVICE_TAGS.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p className={styles.footerTitle}>Sabor Costanera</p>
          <p className={styles.address}>C. 22, Corrientes</p>
          <p className={styles.disclaimer}>
            Prototipo de demostración creado por Nivaror a partir de datos
            públicos de Google Maps. No es el sitio oficial de Sabor
            Costanera. La foto del local es una imagen ambiental generada por
            IA, no una fotografía real del negocio.
          </p>
        </div>
      </footer>
    </main>
  );
}
