import Image from "next/image";
import ScheduleReconciler from "./ScheduleReconciler";
import StartForm from "./StartForm";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.nav}>
        <a href="#inicio" className={styles.wordmark}>BRUNO CORREA <span>GYM</span></a>
        <nav aria-label="Navegación principal">
          <a href="#horarios">Horarios</a>
          <a href="#entrenamiento">Entrenamiento</a>
          <a href="#contacto" className={styles.navCta}>Quiero arrancar</a>
        </nav>
      </header>

      <main>
        <section className={styles.hero} id="inicio">
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Gimnasio en Alberdi</p>
            <h1>Entrená con un horario que entendés.</h1>
            <p className={styles.heroText}>Musculación y funcional, con la información que necesitás antes de salir de casa.</p>
            <a className={styles.primaryButton} href="#horarios">Ver horarios</a>
          </div>
          <div className={styles.heroVisual}>
            <Image src="/images/hero-gym-floor.jpg" alt="Sala de entrenamiento" fill priority sizes="(max-width: 767px) 100vw, 42vw" />
            <div className={styles.imageCaption}>Sala de entrenamiento</div>
          </div>
          <div className={styles.heroStamp} aria-label="Reputación en Google">
            <strong>5,0</strong>
            <span>159 reseñas en Google</span>
          </div>
        </section>

        <section className={styles.solutionSection}>
          <ScheduleReconciler />
        </section>

        <section className={styles.trainingSection} id="entrenamiento">
          <div className={styles.sectionLead}>
            <h2>Tu objetivo marca el próximo paso.</h2>
            <p>Una página simple puede explicar la propuesta y recibir consultas sin hacerte buscar entre publicaciones.</p>
          </div>
          <div className={styles.trainingVisuals}>
            <figure className={styles.trainingImageLarge}>
              <Image src="/images/functional-training-zone.jpg" alt="Zona de entrenamiento funcional" fill sizes="(max-width: 767px) 100vw, 44vw" />
              <figcaption>Funcional</figcaption>
            </figure>
            <figure className={styles.trainingImageSmall}>
              <Image src="/images/detail-weights-rack.jpg" alt="Equipamiento de musculación" fill sizes="(max-width: 767px) 100vw, 25vw" />
              <figcaption>Musculación</figcaption>
            </figure>
          </div>
        </section>

        <section className={styles.proofSection}>
          <div className={styles.proofNumber}>5,0</div>
          <div>
            <p className={styles.miniLabel}>Una reputación para mostrar</p>
            <h2>El barrio ya habla de ustedes.</h2>
            <p>La propuesta le da un lugar propio a una señal que hoy vive separada de la información práctica.</p>
          </div>
          <a className={styles.outlineButton} href="https://www.instagram.com/brunoalancorrea.team" target="_blank" rel="noreferrer">Ver Instagram</a>
        </section>

        <section className={styles.contactSection} id="contacto">
          <div className={styles.contactCopy}>
            <h2>Contanos qué querés entrenar.</h2>
            <p>En la versión final, esta consulta llega al canal que el equipo confirme.</p>
          </div>
          <StartForm />
        </section>
      </main>

      <footer className={styles.footer}>
        <span>Bruno Correa GYM</span>
        <span>Cmte. José Superí 1602, Alberdi</span>
        <a href="https://www.instagram.com/brunoalancorrea.team" target="_blank" rel="noreferrer">Instagram</a>
        <small>Demo de Nivaror. No es el sitio oficial del negocio.</small>
      </footer>
    </div>
  );
}
