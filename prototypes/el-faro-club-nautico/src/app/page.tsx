import Image from "next/image";
import {
  Armchair,
  ArrowSquareOut,
  Baby,
  Car,
  Coffee,
  CreditCard,
  MusicNotes,
  Star,
  UsersThree,
  Wheelchair,
  Wine,
} from "@phosphor-icons/react/dist/ssr";
import { OpenTicket, WeekBand } from "./OpenStatus";
import { Reservation } from "./Reservation";
import { Reveal } from "./Reveal";
import { MAPS_URL } from "./hours";
import hero from "../../public/images/hero-costa.jpg";
import musica from "../../public/images/musica.jpg";
import salon from "../../public/images/salon.jpg";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <header className={styles.nav}>
        <a className={styles.wordmark} href="#top">
          <span className={styles.mark} aria-hidden="true" />
          <span>
            El Faro
            <span className={styles.wordmarkSub}>Club náutico · Paso de la Patria</span>
          </span>
        </a>
        <nav className={styles.navLinks}>
          <a className={styles.navLink} href="#horarios">
            Horarios
          </a>
          <a className={styles.navLink} href="#eventos">
            Eventos
          </a>
          <a className={styles.btnPrimarySm} href="#reservar">
            Reservar mesa
          </a>
        </nav>
      </header>

      <main id="top">
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <OpenTicket />
            <h1 className={styles.h1}>
              Tres días junto
              <br />
              al río.
            </h1>
            <p className={styles.lead}>
              Viernes, sábado y domingo, de 11 de la mañana hasta que baja el sol. El resto de la
              semana el club está cerrado — así no venís al pedo.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.btnPrimary} href="#reservar">
                Reservar mesa
              </a>
              <a
                className={styles.btnGhost}
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Cómo llegar
                <ArrowSquareOut size={17} weight="bold" aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className={styles.heroImage}>
            <Image
              src={hero}
              alt="Deck de un club sobre el río al atardecer, con mesas bajo lonas y arena clara"
              placeholder="blur"
              priority
              sizes="(max-width: 900px) 100vw, 46vw"
            />
          </div>
        </section>

        <section className={styles.week_} id="horarios">
          <Reveal>
            <div className={styles.weekHead}>
              <h2 className={styles.h2}>Abre el fin de semana, nada más.</h2>
              <p className={styles.body}>
                Viernes y sábado de 11 a 18, domingo hasta las 19. De lunes a jueves no hay
                servicio.
              </p>
            </div>
            <WeekBand />
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNum}>634</span>
                <span className={styles.statLabel}>reseñas en Google, 4,6 de promedio</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>3</span>
                <span className={styles.statLabel}>días de servicio por semana</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>11:00</span>
                <span className={styles.statLabel}>hora de apertura, los tres días</span>
              </div>
            </div>
          </Reveal>
        </section>

        <section className={styles.reserve} id="reservar">
          <Reveal>
            <div className={styles.reserveGrid}>
              <div className={styles.reserveForm}>
                <h2 className={styles.h2}>El almuerzo se llena.</h2>
                <p className={styles.body}>
                  La ficha del club lo dice: para el almuerzo conviene reservar. Cargá el día, la
                  hora y cuántos son, y la mesa queda tomada.
                </p>
                <Reservation />
              </div>
              <div className={styles.reserveImage}>
                <Image
                  src={musica}
                  alt="Guitarra criolla y micrófono sobre un escenario al aire libre, a la tarde"
                  placeholder="blur"
                  sizes="(max-width: 900px) 100vw, 44vw"
                />
              </div>
            </div>
          </Reveal>
        </section>

        <section className={styles.services}>
          <Reveal>
            <h2 className={styles.h2}>Bar, terraza y música en vivo.</h2>
            <div className={styles.bento}>
              <div className={`${styles.cell} ${styles.cellSupport}`}>
                <h3 className={styles.h3}>En la barra</h3>
                <ul className={styles.cellList}>
                  <li>
                    <Wine size={19} weight="duotone" aria-hidden="true" />
                    Buenos cócteles, cervezas y vinos
                  </li>
                  <li>
                    <Coffee size={19} weight="duotone" aria-hidden="true" />
                    Buen café y postres
                  </li>
                  <li>
                    <MusicNotes size={19} weight="duotone" aria-hidden="true" />
                    Música en vivo
                  </li>
                </ul>
              </div>

              <div className={styles.cellPhoto}>
                <Image
                  src={salon}
                  alt="Mesa larga tendida para un evento privado bajo un techo de paja junto al río"
                  placeholder="blur"
                  sizes="(max-width: 900px) 100vw, 33vw"
                />
                <div className={styles.cellPhotoBody}>
                  <h3 className={styles.h3}>Para el grupo</h3>
                  <ul className={styles.cellList}>
                    <li>
                      <UsersThree size={19} weight="duotone" aria-hidden="true" />
                      Comedor privado y salón para eventos
                    </li>
                    <li>
                      <Baby size={19} weight="duotone" aria-hidden="true" />
                      Menú para niños y sillas altas
                    </li>
                    <li>
                      <Armchair size={19} weight="duotone" aria-hidden="true" />
                      Asientos en la terraza y al aire libre
                    </li>
                  </ul>
                </div>
              </div>

              <div className={styles.cell}>
                <h3 className={styles.h3}>Al llegar</h3>
                <ul className={styles.cellList}>
                  <li>
                    <Car size={19} weight="duotone" aria-hidden="true" />
                    Estacionamiento gratuito, con lugar
                  </li>
                  <li>
                    <Wheelchair size={19} weight="duotone" aria-hidden="true" />
                    Espacio y sanitarios accesibles
                  </li>
                  <li>
                    <CreditCard size={19} weight="duotone" aria-hidden="true" />
                    Débito, crédito y pagos con NFC
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Events: the listing sells a private salon, so the page has to answer for it. */}
        <section className={styles.faq} id="eventos">
          <Reveal>
            <div className={styles.faqHead}>
              <h2 className={styles.h2}>¿Y para un evento?</h2>
              <p className={styles.body}>
                El club figura además como salón para eventos y tiene comedor privado. Lo que
                falta es lo que hoy nadie puede ver sin llamar.
              </p>
            </div>
            <div className={styles.faqGrid}>
              <div className={styles.faqCard}>
                <p className={styles.faqQ}>¿Cuánta gente entra?</p>
                <p className={styles.faqA}>
                  Capacidad del salón y del comedor privado, para saber de entrada si el evento
                  entra o no.
                </p>
                <span className={styles.faqPending}>a completar</span>
              </div>
              <div className={styles.faqCard}>
                <p className={styles.faqQ}>¿Qué incluye?</p>
                <p className={styles.faqA}>
                  Menús, barra, música: lo que el club arma y lo que corre por cuenta de quien
                  organiza.
                </p>
                <span className={styles.faqPending}>a completar</span>
              </div>
              <div className={styles.faqCard}>
                <p className={styles.faqQ}>¿Se puede fuera del fin de semana?</p>
                <p className={styles.faqA}>
                  El servicio normal es viernes a domingo. Si un evento privado puede tomar otro
                  día, decirlo acá evita la consulta.
                </p>
                <span className={styles.faqPending}>a completar</span>
              </div>
            </div>
          </Reveal>
        </section>

        <section className={styles.rating}>
          <Reveal>
            <div className={styles.ratingInner}>
              <p className={styles.ratingScore}>
                4,6
                <Star size={26} weight="fill" aria-hidden="true" />
              </p>
              <p className={styles.ratingText}>
                Calificación del club en Google, sobre 634 reseñas.
              </p>
              <a
                className={styles.btnGhost}
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver reseñas
                <ArrowSquareOut size={17} weight="bold" aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </section>

        <section className={styles.place}>
          <Reveal>
            <div className={styles.placeBody}>
              <div>
                <h2 className={styles.h2}>Barrio Saltos del San Juan.</h2>
                <p className={styles.body}>
                  Parcela 103, Paso de la Patria, Corrientes. Hay lugar de sobra para estacionar
                  y la entrada es gratuita.
                </p>
              </div>
              <a
                className={styles.btnPrimary}
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Cómo llegar
                <ArrowSquareOut size={17} weight="bold" aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerLead}>
          Prototipo de demostración creado por Nivaror. No es el sitio oficial de El Faro Club
          Náutico y no está asociado al club.
        </p>
        <p className={styles.footerNote}>
          Los horarios, servicios y la calificación provienen de la ficha pública del negocio en
          Google Maps. Las fotos son imágenes de referencia generadas para esta maqueta y no
          muestran el club ni sus platos. No se publica el teléfono del local.
        </p>
      </footer>
    </>
  );
}
