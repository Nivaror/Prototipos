import Image from "next/image";
import {
  ArrowSquareOut,
  Baby,
  BowlSteam,
  CalendarCheck,
  Car,
  CreditCard,
  DeviceMobile,
  Drop,
  ForkKnife,
  ShoppingBag,
  Star,
  Users,
} from "@phosphor-icons/react/dist/ssr";
import { OpenTicket, WeekBand } from "./OpenStatus";
import { Reservation } from "./Reservation";
import { Reveal } from "./Reveal";
import { MAPS_URL } from "./hours";
import ambiance from "../../public/images/ambiance-terraza.jpg";
import exterior from "../../public/images/exterior-ruta.jpg";
import hero from "../../public/images/hero-parrilla.jpg";
import tabla from "../../public/images/tabla-asado.jpg";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <header className={styles.nav}>
        <a className={styles.wordmark} href="#top">
          <span className={styles.mark} aria-hidden="true" />
          <span>
            Ruta 20
            <span className={styles.wordmarkSub}>Parrilla en Itatí</span>
          </span>
        </a>
        <nav className={styles.navLinks}>
          <a className={styles.navLink} href="#horarios">
            Horarios
          </a>
          <a className={styles.navLink} href="#llegar">
            Cómo llegar
          </a>
          <a className={styles.btnPrimarySm} href="#reservar">
            Reservar mesa
          </a>
        </nav>
      </header>

      <main id="top">
        {/* Hero: asymmetric split, live status, one primary and one secondary action. */}
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <OpenTicket />
            <h1 className={styles.h1}>
              Parrilla al mediodía,
              <br />
              de viernes a domingo.
            </h1>
            <p className={styles.lead}>
              Mesas para grupos y familias, servicio a la mesa y reserva online sin tener que
              llamar.
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
              alt="Costillar y chorizo asándose sobre brasas en una parrilla a leña"
              placeholder="blur"
              priority
              sizes="(max-width: 900px) 100vw, 46vw"
            />
          </div>
        </section>

        {/* The gap this page exists to close: nobody can tell when the parrilla is open. */}
        <section className={styles.week_} id="horarios">
          <Reveal>
            <div className={styles.weekHead}>
              <h2 className={styles.h2}>Abrimos tres días por semana.</h2>
              <p className={styles.body}>
                De viernes a domingo, de 9 a 17. El resto de la semana la parrilla está apagada.
              </p>
            </div>
            <WeekBand />
          </Reveal>
        </section>

        {/* Reservation: the one feature the listing already promises but cannot deliver online. */}
        <section className={styles.reserve} id="reservar">
          <Reveal>
            <div className={styles.reserveGrid}>
              <div className={styles.reserveForm}>
                <h2 className={styles.h2}>Reservá tu mesa.</h2>
                <p className={styles.body}>
                  Se aceptan reservas. Cargá el día, la hora y cuántos son, y la mesa queda
                  anotada antes de que llegues.
                </p>
                <Reservation />
              </div>
              <div className={styles.reserveImage}>
                <Image
                  src={ambiance}
                  alt="Mesas de madera bajo un techo de chapa y árboles, en un comedor al aire libre"
                  placeholder="blur"
                  sizes="(max-width: 900px) 100vw, 44vw"
                />
              </div>
            </div>
          </Reveal>
        </section>

        {/* Three clusters, three cells. Every line below is confirmed on the Maps listing. */}
        <section className={styles.services}>
          <Reveal>
            <h2 className={styles.h2}>Qué encontrás cuando llegás.</h2>
            <div className={styles.bento}>
              <div className={`${styles.cell} ${styles.cellOlive}`}>
                <h3 className={styles.h3}>En la mesa</h3>
                <ul className={styles.cellList}>
                  <li>
                    <ForkKnife size={19} weight="duotone" aria-hidden="true" />
                    Servicio a la mesa
                  </li>
                  <li>
                    <ShoppingBag size={19} weight="duotone" aria-hidden="true" />
                    También para llevar
                  </li>
                  <li>
                    <BowlSteam size={19} weight="duotone" aria-hidden="true" />
                    Almuerzo y cena
                  </li>
                  <li>
                    <Drop size={19} weight="duotone" aria-hidden="true" />
                    Sanitario
                  </li>
                </ul>
              </div>

              <div className={styles.cellPhoto}>
                <Image
                  src={tabla}
                  alt="Tabla de madera con provoleta a la parrilla, chorizo en rodajas y chimichurri"
                  placeholder="blur"
                  sizes="(max-width: 900px) 100vw, 33vw"
                />
                <div className={styles.cellPhotoBody}>
                  <h3 className={styles.h3}>Para el grupo</h3>
                  <ul className={styles.cellList}>
                    <li>
                      <Users size={19} weight="duotone" aria-hidden="true" />
                      Grupos y turistas
                    </li>
                    <li>
                      <Baby size={19} weight="duotone" aria-hidden="true" />
                      Ideal para ir con niños
                    </li>
                    <li>
                      <CalendarCheck size={19} weight="duotone" aria-hidden="true" />
                      Se aceptan reservas
                    </li>
                  </ul>
                </div>
              </div>

              <div className={styles.cell}>
                <h3 className={styles.h3}>Al llegar</h3>
                <ul className={styles.cellList}>
                  <li>
                    <Car size={19} weight="duotone" aria-hidden="true" />
                    Estacionamiento gratuito en la calle
                  </li>
                  <li>
                    <CreditCard size={19} weight="duotone" aria-hidden="true" />
                    Tarjetas de crédito y débito
                  </li>
                  <li>
                    <DeviceMobile size={19} weight="duotone" aria-hidden="true" />
                    Pagos con NFC desde el celular
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Real, attributable numbers only. No invented testimonials. */}
        <section className={styles.rating}>
          <Reveal>
            <div className={styles.ratingInner}>
              <p className={styles.ratingScore}>
                4,6
                <Star size={26} weight="fill" aria-hidden="true" />
              </p>
              <p className={styles.ratingText}>
                Calificación de la parrilla en Google, sobre 8 reseñas.
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

        <section className={styles.place} id="llegar">
          <div className={styles.placeImage}>
            <Image
              src={exterior}
              alt="Comedor de campo bajo techo de chapa junto a un camino de tierra colorada"
              placeholder="blur"
              sizes="100vw"
            />
          </div>
          <Reveal>
            <div className={styles.placeBody}>
              <div>
                <h2 className={styles.h2}>Sobre la ruta, en Itatí.</h2>
                <p className={styles.body}>
                  Itatí, Corrientes. Estacionamiento gratuito en la calle, así que se puede
                  parar con el auto o con la combi del grupo.
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
          Prototipo de demostración creado por Nivaror. No es el sitio oficial de Parrilla
          Restaurante Ruta 20 y no está asociado al local.
        </p>
        <p className={styles.footerNote}>
          Los horarios, servicios y la calificación provienen de la ficha pública del negocio
          en Google Maps. Las fotos son imágenes de referencia generadas para esta maqueta y no
          muestran el local ni sus platos.
        </p>
      </footer>
    </>
  );
}
