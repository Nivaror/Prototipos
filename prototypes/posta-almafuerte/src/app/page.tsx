import Image from "next/image";
import InterestForm from "./interest-form";
import styles from "./page.module.css";

const instagramUrl = "https://instagram.com/posta_almafuerte_";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.demoNotice}>
        Muestra de Nivaror. No es el sitio oficial de Posta Almafuerte.
      </div>

      <header className={styles.nav}>
        <a className={styles.wordmark} href="#inicio" aria-label="Posta Almafuerte, inicio">
          <span>Posta</span>
          <strong>Almafuerte</strong>
        </a>
        <nav className={styles.navLinks} aria-label="Navegación principal">
          <a href="#carta">La carta</a>
          <a href="#visita">Visitar</a>
          <a className={styles.navAction} href="#mesa">Mesa</a>
        </nav>
      </header>

      <main>
        <section className={styles.hero} id="inicio">
          <div className={styles.heroTop}>
            <div className={styles.heroCopy}>
              <p className={styles.heroKicker}>Restaurante en Rosario</p>
              <h1>Todo lo que necesitás para ir.</h1>
              <p className={styles.heroText}>
                Carta, horarios y una forma simple de dejar tu interés por una mesa.
              </p>
              <div className={styles.heroActions}>
                <a className={styles.primaryButton} href="#carta">Ver la carta</a>
                <a className={styles.textButton} href="#visita">Ver horarios</a>
              </div>
            </div>

            <aside className={styles.heroFacts} aria-label="Datos destacados">
              <p className={styles.factIntro}>Lo esencial antes de salir</p>
              <div className={styles.factRow}>
                <span>Dirección</span>
                <strong>Almafuerte 1240, Rosario</strong>
              </div>
              <div className={styles.factRow}>
                <span>Reseñas</span>
                <strong>4.7★ <em>340 reseñas</em></strong>
              </div>
              <div className={styles.factRow}>
                <span>Rango relevado</span>
                <strong>$5.000 a $20.000</strong>
              </div>
            </aside>
          </div>

          <div className={styles.heroMedia}>
            <figure className={styles.heroDining}>
              <Image
                src="/images/posta-dining-room.jpg"
                alt="Dos sándwiches artesanales cortados al medio sobre una tabla de madera"
                fill
                priority
                sizes="(max-width: 767px) 100vw, 67vw"
              />
            </figure>
            <figure className={styles.heroDish}>
              <Image
                src="/images/posta-plated-dish.jpg"
                alt="Sándwich de focaccia tostada con pollo, queso, rúcula y morrones asados"
                fill
                sizes="(max-width: 767px) 100vw, 33vw"
              />
            </figure>
          </div>
        </section>

        <section className={`${styles.section} ${styles.menuSection}`} id="carta">
          <div className={styles.sectionIntro}>
            <p className={styles.sectionLabel}>Carta y formas de pedir</p>
            <h2>Elegí cómo querés disfrutarlo.</h2>
            <p>
              Una sola vista para entender qué podés consultar, pedir y resolver antes de ir.
            </p>
          </div>

          <div className={styles.menuGrid}>
            <div className={styles.menuImage}>
              <Image
                src="/images/posta-chef-cooking.jpg"
                alt="Dos sándwiches tostados cortados al medio sobre papel madera"
                fill
                sizes="(max-width: 767px) 100vw, 38vw"
              />
            </div>
            <div className={styles.menuCopy}>
              <h3>La carta, lista para consultar.</h3>
              <p>
                La carta completa no quedó confirmada en los datos relevados. Este espacio puede mostrarla de forma clara cuando Posta la comparta.
              </p>
              <a className={styles.inlineLink} href={instagramUrl} target="_blank" rel="noreferrer">
                Consultar por Instagram
              </a>
            </div>
            <div className={styles.serviceList}>
              <div className={styles.serviceItem}>
                <strong>En el local</strong>
                <span>Almafuerte 1240, Rosario</span>
              </div>
              <div className={styles.serviceItem}>
                <strong>Para llevar</strong>
                <span>Takeout disponible</span>
              </div>
              <div className={styles.serviceItem}>
                <strong>Delivery</strong>
                <span>También podés pedir con delivery</span>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.interestSection}`} id="mesa">
          <div className={styles.interestIntro}>
            <p className={styles.sectionLabel}>Tu próxima visita</p>
            <h2>Dejá tu interés por una mesa.</h2>
            <p>
              Una solicitud breve para que el equipo pueda responderte por el canal que prefieras.
            </p>
          </div>
          <InterestForm />
        </section>

        <section className={`${styles.section} ${styles.visitSection}`} id="visita">
          <div className={styles.visitHeading}>
            <h2>Para llegar con la info clara.</h2>
            <p>Estos son los datos disponibles para planificar la visita.</p>
          </div>

          <div className={styles.visitDetails}>
            <div className={styles.visitBlock}>
              <span className={styles.detailLabel}>Dónde</span>
              <strong>Almafuerte 1240</strong>
              <span>Rosario, Santa Fe</span>
            </div>
            <div className={styles.visitBlock}>
              <span className={styles.detailLabel}>Cuándo</span>
              <dl className={styles.hoursList}>
                <div><dt>Lunes</dt><dd>Cerrado</dd></div>
                <div><dt>La mayoría de las noches</dt><dd>Servicio nocturno</dd></div>
                <div><dt>Viernes</dt><dd>También mediodía</dd></div>
              </dl>
            </div>
            <div className={`${styles.visitBlock} ${styles.ratingBlock}`}>
              <span className={styles.detailLabel}>Cómo lo valoran</span>
              <strong>4.7★</strong>
              <span>340 reseñas en Google</span>
            </div>
          </div>

          <div className={styles.visitNote}>
            <p>¿Querés confirmar la carta o los horarios exactos?</p>
            <a className={styles.inlineLink} href={instagramUrl} target="_blank" rel="noreferrer">
              Escribir por Instagram
            </a>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div>
          <p className={styles.footerName}>Posta Almafuerte</p>
          <p>Almafuerte 1240, Rosario</p>
        </div>
        <div className={styles.footerMeta}>
          <a href={instagramUrl} target="_blank" rel="noreferrer">Instagram</a>
          <p>Muestra de Nivaror. No es el sitio oficial.</p>
        </div>
      </footer>
    </div>
  );
}
