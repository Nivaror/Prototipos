import Image from "next/image";
import {
  ArrowSquareOut,
  Armchair,
  Baby,
  Coffee,
  Confetti,
  FacebookLogo,
  Martini,
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
import hero from "../../public/images/hero-terraza.jpg";
import barra from "../../public/images/barra.jpg";
import mesa from "../../public/images/mesa-noche.jpg";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <header className={styles.nav}>
        <a className={styles.wordmark} href="#top">
          <span className={styles.mark} aria-hidden="true" />
          <span>
            RIO
            <span className={styles.wordmarkSub}>Resto bar · Ituzaingó</span>
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
              Cada día abre
              <br />
              a una hora distinta.
            </h1>
            <p className={styles.lead}>
              Mediodía casi toda la semana, y de noche hasta las 4 los sábados. Acá está el
              horario de hoy, sin buscarlo en un posteo viejo.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.btnPrimary} href="#reservar">
                Reservar mesa
              </a>
              <a className={styles.btnGhost} href="#horarios">
                Ver la semana
              </a>
            </div>
          </div>
          <div className={styles.heroImage}>
            <Image
              src={hero}
              alt="Terraza de noche con guirnaldas de luces cálidas y mesas bajas de madera"
              placeholder="blur"
              priority
              sizes="(max-width: 900px) 100vw, 46vw"
            />
          </div>
        </section>

        {/* The gap, stated plainly: seven days, no two alike. */}
        <section className={styles.week_} id="horarios">
          <Reveal>
            <div className={styles.weekHead}>
              <h2 className={styles.h2}>La semana entera, de un vistazo.</h2>
              <p className={styles.body}>
                Dos turnos casi todos los días: mediodía y noche. El lunes está cerrado y el
                martes solo abre al mediodía.
              </p>
            </div>
            <WeekBand />
            <p className={styles.lateBanner}>
              La noche larga: <strong>miércoles y jueves hasta las 02:00</strong>
              <strong>viernes hasta las 03:00</strong>
              <strong>sábado hasta las 04:00</strong>
            </p>
          </Reveal>
        </section>

        <section className={styles.reserve} id="reservar">
          <Reveal>
            <div className={styles.reserveGrid}>
              <div className={styles.reserveForm}>
                <h2 className={styles.h2}>Reservá la mesa de la noche.</h2>
                <p className={styles.body}>
                  Se aceptan reservas. Cargá día, hora y cuántos son: queda anotado sin escribir
                  por Facebook y esperar la respuesta.
                </p>
                <Reservation />
              </div>
              <div className={styles.reserveImage}>
                <Image
                  src={barra}
                  alt="Dos cócteles servidos en la barra, de noche, con botellas desenfocadas al fondo"
                  placeholder="blur"
                  sizes="(max-width: 900px) 100vw, 44vw"
                />
              </div>
            </div>
          </Reveal>
        </section>

        {/* Everything below is tagged on the Maps listing. Nothing added. */}
        <section className={styles.services}>
          <Reveal>
            <h2 className={styles.h2}>Terraza, barra y cocina.</h2>
            <div className={styles.bento}>
              <div className={`${styles.cell} ${styles.cellSupport}`}>
                <h3 className={styles.h3}>En la barra</h3>
                <ul className={styles.cellList}>
                  <li>
                    <Martini size={19} weight="duotone" aria-hidden="true" />
                    Buenos cócteles
                  </li>
                  <li>
                    <Wine size={19} weight="duotone" aria-hidden="true" />
                    Selección de vinos y cervezas
                  </li>
                  <li>
                    <Coffee size={19} weight="duotone" aria-hidden="true" />
                    Buen café y postres
                  </li>
                  <li>
                    <Confetti size={19} weight="duotone" aria-hidden="true" />
                    Comidas durante la madrugada
                  </li>
                </ul>
              </div>

              <div className={styles.cellPhoto}>
                <Image
                  src={mesa}
                  alt="Mesa de madera vista desde arriba, con platos para compartir y vasos de cerveza"
                  placeholder="blur"
                  sizes="(max-width: 900px) 100vw, 33vw"
                />
                <div className={styles.cellPhotoBody}>
                  <h3 className={styles.h3}>Para sentarse</h3>
                  <ul className={styles.cellList}>
                    <li>
                      <Armchair size={19} weight="duotone" aria-hidden="true" />
                      Asientos en la terraza
                    </li>
                    <li>
                      <Baby size={19} weight="duotone" aria-hidden="true" />
                      Menú y sillas para chicos
                    </li>
                    <li>
                      <Wheelchair size={19} weight="duotone" aria-hidden="true" />
                      Entrada, sanitarios y estacionamiento accesibles
                    </li>
                  </ul>
                </div>
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
                    <Moped size={19} weight="duotone" aria-hidden="true" />
                    Entrega sin contacto
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
                4,3
                <Star size={26} weight="fill" aria-hidden="true" />
              </p>
              <p className={styles.ratingText}>
                Calificación en Google sobre 997 reseñas — el volumen más alto de la zona.
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
                <h2 className={styles.h2}>San Martín 1534.</h2>
                <p className={styles.body}>
                  Ituzaingó, Corrientes. Estacionamiento accesible y entrada accesible para
                  sillas de ruedas.
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
          Prototipo de demostración creado por Nivaror. No es el sitio oficial de RIO y no está
          asociado al local.
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
