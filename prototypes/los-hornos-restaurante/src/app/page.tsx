import Image from "next/image";
import {
  ArrowSquareOut,
  Baby,
  Coffee,
  CreditCard,
  FacebookLogo,
  Fire,
  Moped,
  ShoppingBag,
  Star,
  Wheelchair,
  Wine,
} from "@phosphor-icons/react/dist/ssr";
import { OpenTicket, WeekBand } from "./OpenStatus";
import { Reservation } from "./Reservation";
import { Reveal } from "./Reveal";
import { FACEBOOK_URL, MAPS_URL } from "./hours";
import hero from "../../public/images/hero-salon.jpg";
import fuego from "../../public/images/fuego.jpg";
import mesa from "../../public/images/mesa.jpg";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <header className={styles.nav}>
        <a className={styles.wordmark} href="#top">
          <span className={styles.mark} aria-hidden="true" />
          <span>
            Los Hornos
            <span className={styles.wordmarkSub}>Restaurante · Ituzaingó</span>
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
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <OpenTicket />
            <h1 className={styles.h1}>
              Abierto los siete
              <br />
              días, mediodía y noche.
            </h1>
            <p className={styles.lead}>
              Ninguno de los otros lugares de Ituzaingó abre toda la semana. Acá se ve de una si
              está abierto ahora, sin llamar para preguntar.
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
              alt="Salón rústico con chimenea encendida, mesas de madera y piso de baldosa"
              placeholder="blur"
              priority
              sizes="(max-width: 900px) 100vw, 46vw"
            />
          </div>
        </section>

        {/* The fireplace is the one thing the listing flags that nobody else here has. */}
        <section className={styles.fireBand}>
          <div className={styles.fireCopy}>
            <h2 className={styles.h2}>Con chimenea.</h2>
            <p className={styles.body}>
              Es lo que la ficha de Google destaca del salón, y lo que no se ve en ningún
              posteo: cómo es el lugar cuando afuera hace frío.
            </p>
          </div>
          <div className={styles.fireImage}>
            <Image
              src={fuego}
              alt="Fuego de leña ardiendo dentro de un horno de ladrillo, con brasas encendidas"
              placeholder="blur"
              sizes="(max-width: 860px) 100vw, 58vw"
            />
          </div>
        </section>

        <section className={styles.week_} id="horarios">
          <Reveal>
            <div className={styles.weekHead}>
              <h2 className={styles.h2}>Dos turnos, todos los días.</h2>
              <p className={styles.body}>
                Mediodía desde las 11 y noche desde las 20. Viernes y sábado la cocina sigue
                hasta las 00:30.
              </p>
            </div>
            <WeekBand />
            <p className={styles.lateBanner}>
              Fin de semana largo: <strong>viernes y sábado hasta las 00:30</strong>
            </p>
          </Reveal>
        </section>

        <section className={styles.reserve} id="reservar">
          <Reveal>
            <div className={styles.reserveGrid}>
              <div className={styles.reserveForm}>
                <h2 className={styles.h2}>Reservá tu mesa.</h2>
                <p className={styles.body}>
                  Se aceptan reservas. Elegí turno de mediodía o de noche, cargá cuántos son y
                  listo — sin escribir por Facebook y esperar respuesta.
                </p>
                <Reservation />
              </div>
              <div className={styles.reserveImage}>
                <Image
                  src={mesa}
                  alt="Mesa de madera con platos para compartir, pan y una copa de vino tinto"
                  placeholder="blur"
                  sizes="(max-width: 900px) 100vw, 44vw"
                />
              </div>
            </div>
          </Reveal>
        </section>

        <section className={styles.services}>
          <Reveal>
            <h2 className={styles.h2}>Qué hay en la carta y en el salón.</h2>
            <div className={styles.bento}>
              <div className={`${styles.cell} ${styles.cellSupport}`}>
                <h3 className={styles.h3}>Para tomar y cerrar</h3>
                <ul className={styles.cellList}>
                  <li>
                    <Wine size={19} weight="duotone" aria-hidden="true" />
                    Muy buena selección de vinos y cervezas
                  </li>
                  <li>
                    <Coffee size={19} weight="duotone" aria-hidden="true" />
                    Buen café y postres
                  </li>
                  <li>
                    <Fire size={19} weight="duotone" aria-hidden="true" />
                    Comidas durante la madrugada
                  </li>
                </ul>
              </div>

              <div className={styles.cell}>
                <h3 className={styles.h3}>Si no venís</h3>
                <ul className={styles.cellList}>
                  <li>
                    <Moped size={19} weight="duotone" aria-hidden="true" />
                    Entrega a domicilio
                  </li>
                  <li>
                    <ShoppingBag size={19} weight="duotone" aria-hidden="true" />
                    Para llevar
                  </li>
                  <li>
                    <CreditCard size={19} weight="duotone" aria-hidden="true" />
                    Débito, crédito y NFC
                  </li>
                </ul>
              </div>

              <div className={styles.cell}>
                <h3 className={styles.h3}>Con la familia</h3>
                <ul className={styles.cellList}>
                  <li>
                    <Baby size={19} weight="duotone" aria-hidden="true" />
                    Menú para niños y sillas altas
                  </li>
                  <li>
                    <Wheelchair size={19} weight="duotone" aria-hidden="true" />
                    Entrada y espacio accesibles
                  </li>
                  <li>
                    <Fire size={19} weight="duotone" aria-hidden="true" />
                    Asientos al aire libre
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
                4,2
                <Star size={26} weight="fill" aria-hidden="true" />
              </p>
              <p className={styles.ratingText}>
                Calificación en Google sobre 380 reseñas.
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
                <h2 className={styles.h2}>Francisco López 1525.</h2>
                <p className={styles.body}>
                  Ituzaingó, Corrientes. Estacionamiento gratuito en la calle.
                </p>
              </div>
              <div className={styles.heroActions}>
                <a
                  className={styles.btnPrimary}
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cómo llegar
                  <ArrowSquareOut size={17} weight="bold" aria-hidden="true" />
                </a>
                <a
                  className={styles.btnGhost}
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookLogo size={18} weight="fill" aria-hidden="true" />
                  Facebook
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerLead}>
          Prototipo de demostración creado por Nivaror. No es el sitio oficial de Los Hornos
          Restaurante y no está asociado al local.
        </p>
        <p className={styles.footerNote}>
          Los horarios, servicios y la calificación provienen de la ficha pública del negocio en
          Google Maps. Las fotos son imágenes de referencia generadas para esta maqueta y no
          muestran el local ni sus platos. No se publica el teléfono del local.
        </p>
      </footer>
    </>
  );
}
