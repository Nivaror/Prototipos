import Image from "next/image";
import {
  ArrowSquareOut,
  Baby,
  Car,
  CreditCard,
  ForkKnife,
  HandHeart,
  Moon,
  Moped,
  ShoppingBag,
  Star,
  Wheelchair,
  WifiHigh,
} from "@phosphor-icons/react/dist/ssr";
import { DayBand } from "./OpenStatus";
import { Reservation } from "./Reservation";
import { Reveal } from "./Reveal";
import { MAPS_URL } from "./hours";
import hero from "../../public/images/hero-noche.jpg";
import madrugada from "../../public/images/madrugada.jpg";
import auto from "../../public/images/auto.jpg";
import styles from "./page.module.css";

const SERVICIOS = [
  "Desayunos",
  "Desayuno-almuerzo",
  "Almuerzo",
  "Cena",
  "Comidas durante la madrugada",
];

export default function Home() {
  return (
    <>
      <header className={styles.nav}>
        <a className={styles.wordmark} href="#top">
          <span className={styles.mark} aria-hidden="true" />
          <span>
            En Lo De Ramón
            <span className={styles.wordmarkSub}>Abierto las 24 horas · Ituzaingó</span>
          </span>
        </a>
        <nav className={styles.navLinks}>
          <a className={styles.navLink} href="#siempre">
            El día entero
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
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.ticket}>
              <span className={styles.ticketDot} aria-hidden="true" />
              <span>
                <strong>Siempre abierto</strong> · Corrientes 2499, Ituzaingó
              </span>
            </p>
            <h1 className={styles.h1}>
              No cerramos.
              <br />
              Nunca.
            </h1>
            <p className={styles.lead}>
              Las 24 horas, los siete días. Desayuno a las seis de la mañana o algo caliente a
              las cuatro: es la misma cocina, siempre encendida.
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
              alt="Esquina de un restaurante de noche, con la luz cálida del interior sobre la vereda vacía"
              placeholder="blur"
              priority
              sizes="(max-width: 900px) 100vw, 46vw"
            />
          </div>
        </section>

        {/* No week grid: every day is identical. The day itself is the thing to show. */}
        <section className={styles.week_} id="siempre">
          <Reveal>
            <div className={styles.weekHead}>
              <h2 className={styles.h2}>Las veinticuatro horas.</h2>
              <p className={styles.body}>
                Los otros locales de Ituzaingó cierran al menos un día. Acá no hay una hora del
                día en la que la respuesta sea "está cerrado".
              </p>
            </div>
            <DayBand />
            <div className={styles.chips}>
              {SERVICIOS.map((s) => (
                <span className={styles.chip} key={s}>
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </section>

        <section className={styles.reserve} id="reservar">
          <Reveal>
            <div className={styles.reserveGrid}>
              <div className={styles.reserveForm}>
                <h2 className={styles.h2}>Reservá a la hora que sea.</h2>
                <p className={styles.body}>
                  Se aceptan reservas. Como no hay horario de cierre, el formulario no rechaza
                  ninguna hora: la que elijas es una hora en la que el local está abierto.
                </p>
                <Reservation />
              </div>
              <div className={styles.reserveImage}>
                <Image
                  src={madrugada}
                  alt="Un café y un sándwich sobre el mostrador de madrugada, con el salón vacío"
                  placeholder="blur"
                  sizes="(max-width: 900px) 100vw, 44vw"
                />
              </div>
            </div>
          </Reveal>
        </section>

        {/* A confirmed listing tag that says something real about the place. */}
        <section className={styles.safeBand}>
          <Reveal>
            <div className={styles.safeInner}>
              <HandHeart size={34} weight="duotone" aria-hidden="true" />
              <p className={styles.safeText}>
                Amigable con la comunidad LGBTQ+ y espacio seguro para personas transgénero.
              </p>
              <p className={styles.safeNote}>
                Figura así en la ficha pública del negocio en Google Maps. A las cuatro de la
                mañana, saber de antemano dónde te van a atender bien no es un detalle.
              </p>
            </div>
          </Reveal>
        </section>

        <section className={styles.services}>
          <Reveal>
            <h2 className={styles.h2}>Cuatro maneras de comer acá.</h2>
            <div className={styles.bento}>
              <div className={`${styles.cell} ${styles.cellSupport}`}>
                <h3 className={styles.h3}>En el salón</h3>
                <ul className={styles.cellList}>
                  <li>
                    <ForkKnife size={19} weight="duotone" aria-hidden="true" />
                    Servicio a la mesa y en el mostrador
                  </li>
                  <li>
                    <WifiHigh size={19} weight="duotone" aria-hidden="true" />
                    Wi-Fi gratis
                  </li>
                  <li>
                    <Moon size={19} weight="duotone" aria-hidden="true" />
                    Asientos al aire libre
                  </li>
                </ul>
              </div>

              <div className={styles.cellPhoto}>
                <Image
                  src={auto}
                  alt="Una bolsa de papel entregada por la ventanilla de un auto, de noche"
                  placeholder="blur"
                  sizes="(max-width: 900px) 100vw, 33vw"
                />
                <div className={styles.cellPhotoBody}>
                  <h3 className={styles.h3}>Sin bajarte</h3>
                  <ul className={styles.cellList}>
                    <li>
                      <Car size={19} weight="duotone" aria-hidden="true" />
                      Pedidos desde el automóvil
                    </li>
                    <li>
                      <Moped size={19} weight="duotone" aria-hidden="true" />
                      Entrega a domicilio, también sin contacto
                    </li>
                    <li>
                      <ShoppingBag size={19} weight="duotone" aria-hidden="true" />
                      Para llevar
                    </li>
                  </ul>
                </div>
              </div>

              <div className={styles.cell}>
                <h3 className={styles.h3}>Para todos</h3>
                <ul className={styles.cellList}>
                  <li>
                    <Baby size={19} weight="duotone" aria-hidden="true" />
                    Ideal para ir con niños
                  </li>
                  <li>
                    <Wheelchair size={19} weight="duotone" aria-hidden="true" />
                    Espacio accesible y sanitarios unisex
                  </li>
                  <li>
                    <CreditCard size={19} weight="duotone" aria-hidden="true" />
                    Débito, crédito y NFC
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
        </section>

        <section className={styles.rating}>
          <Reveal>
            <div className={styles.ratingInner}>
              <p className={styles.ratingScore}>
                4,4
                <Star size={26} weight="fill" aria-hidden="true" />
              </p>
              <p className={styles.ratingText}>
                Calificación en Google sobre 94 reseñas.
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
          <Reveal>
            <div className={styles.placeBody}>
              <div>
                <h2 className={styles.h2}>Corrientes 2499.</h2>
                <p className={styles.body}>
                  Ituzaingó, Corrientes. Estacionamiento gratuito en la calle, a cualquier hora.
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
          Prototipo de demostración creado por Nivaror. No es el sitio oficial de En Lo De Ramón
          y no está asociado al local.
        </p>
        <p className={styles.footerNote}>
          Los horarios, servicios y la calificación provienen de la ficha pública del negocio en
          Google Maps. Los horarios de cada comida no se muestran porque la ficha no los
          publica. Las fotos son imágenes de referencia generadas para esta maqueta y no
          muestran el local ni sus platos. No se publica el teléfono del local.
        </p>
      </footer>
    </>
  );
}
