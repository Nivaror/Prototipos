import Image from "next/image";
import {
  ArrowSquareOut,
  Baby,
  BeerStein,
  CreditCard,
  Dog,
  ForkKnife,
  MoonStars,
  ShoppingBag,
  Star,
  Tree,
  Wheelchair,
} from "@phosphor-icons/react/dist/ssr";
import { OpenTicket, WeekBand } from "./OpenStatus";
import { Reservation } from "./Reservation";
import { Reveal } from "./Reveal";
import { MAPS_URL } from "./hours";
import hero from "../../public/images/hero-patio.jpg";
import cervezas from "../../public/images/cervezas.jpg";
import perro from "../../public/images/perro.jpg";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <header className={styles.nav}>
        <a className={styles.wordmark} href="#top">
          <span className={styles.mark} aria-hidden="true" />
          <span>
            Birrería Del Paso
            <span className={styles.wordmarkSub}>Cervecería al aire libre</span>
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
        {/* Full-bleed night photo: an open-air place sells the patio first. */}
        <section className={styles.heroFull}>
          <Image
            src={hero}
            alt="Patio de cervecería de noche, con mesas largas de madera bajo guirnaldas de luces"
            placeholder="blur"
            priority
            sizes="100vw"
          />
          <div className={styles.heroFullCopy}>
            <OpenTicket />
            <h1 className={styles.h1}>
              Cerveza al aire
              <br />
              libre hasta las 2.
            </h1>
            <p className={styles.lead}>
              Jueves y viernes desde las 19, sábado y domingo desde el mediodía. Sobre la
              costanera, con los perros bienvenidos.
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
        </section>

        {/* Three days shut, four days late: the single fact worth putting up front. */}
        <section className={styles.week_} id="horarios">
          <Reveal>
            <div className={styles.weekHead}>
              <h2 className={styles.h2}>Cuatro días, siempre hasta las 2.</h2>
              <p className={styles.body}>
                Lunes, martes y miércoles está cerrado. Jueves y viernes abre a las 19; sábado y
                domingo, desde las 12 del mediodía.
              </p>
            </div>
            <WeekBand />
            <p className={styles.lateBanner}>
              Cierre parejo: <strong>02:00 los cuatro días</strong>
            </p>
          </Reveal>
        </section>

        <section className={styles.price}>
          <Reveal>
            <div className={styles.priceInner}>
              <span className={styles.priceNum}>$10.000–20.000</span>
              <p className={styles.priceText}>
                Rango de precios por persona según la ficha de Google — el más accesible de la
                costanera entre los locales relevados.
              </p>
            </div>
          </Reveal>
        </section>

        <section className={styles.reserve} id="reservar">
          <Reveal>
            <div className={styles.reserveGrid}>
              <div className={styles.reserveForm}>
                <h2 className={styles.h2}>Guardá la mesa.</h2>
                <p className={styles.body}>
                  Se aceptan reservas. Cargá el día, la hora y cuántos son: en un patio que se
                  llena, la mesa queda tomada antes de salir de casa.
                </p>
                <Reservation />
              </div>
              <div className={styles.reserveImage}>
                <Image
                  src={cervezas}
                  alt="Dos vasos de cerveza tirada sobre una mesa de madera, de noche"
                  placeholder="blur"
                  sizes="(max-width: 900px) 100vw, 44vw"
                />
              </div>
            </div>
          </Reveal>
        </section>

        <section className={styles.services}>
          <Reveal>
            <h2 className={styles.h2}>Cómo es el patio.</h2>
            <div className={styles.bento}>
              <div className={`${styles.cell} ${styles.cellSupport}`}>
                <h3 className={styles.h3}>Para tomar</h3>
                <ul className={styles.cellList}>
                  <li>
                    <BeerStein size={19} weight="duotone" aria-hidden="true" />
                    Muy buena selección de cervezas
                  </li>
                  <li>
                    <ForkKnife size={19} weight="duotone" aria-hidden="true" />
                    Bocadillos, aperitivos y comida en el bar
                  </li>
                  <li>
                    <MoonStars size={19} weight="duotone" aria-hidden="true" />
                    Comidas durante la madrugada
                  </li>
                </ul>
              </div>

              <div className={styles.cellPhoto}>
                <Image
                  src={perro}
                  alt="Un perro echado bajo una mesa de madera en un patio iluminado con guirnaldas"
                  placeholder="blur"
                  sizes="(max-width: 900px) 100vw, 33vw"
                />
                <div className={styles.cellPhotoBody}>
                  <h3 className={styles.h3}>Quién puede venir</h3>
                  <ul className={styles.cellList}>
                    <li>
                      <Dog size={19} weight="duotone" aria-hidden="true" />
                      Se permiten perros
                    </li>
                    <li>
                      <Baby size={19} weight="duotone" aria-hidden="true" />
                      Ideal para ir con niños
                    </li>
                    <li>
                      <Tree size={19} weight="duotone" aria-hidden="true" />
                      Asientos al aire libre
                    </li>
                  </ul>
                </div>
              </div>

              <div className={styles.cell}>
                <h3 className={styles.h3}>Al llegar</h3>
                <ul className={styles.cellList}>
                  <li>
                    <Wheelchair size={19} weight="duotone" aria-hidden="true" />
                    Entrada y espacio accesibles
                  </li>
                  <li>
                    <CreditCard size={19} weight="duotone" aria-hidden="true" />
                    Débito, crédito y NFC
                  </li>
                  <li>
                    <ShoppingBag size={19} weight="duotone" aria-hidden="true" />
                    También para llevar
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
                4,8
                <Star size={26} weight="fill" aria-hidden="true" />
              </p>
              <p className={styles.ratingText}>
                Calificación en Google sobre 429 reseñas — la más alta entre los locales de la
                costanera relevados.
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
                <h2 className={styles.h2}>Lapacho y Costanera.</h2>
                <p className={styles.body}>
                  Paso de la Patria, Corrientes. Estacionamiento gratuito y lugar de sobra.
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
          Prototipo de demostración creado por Nivaror. No es el sitio oficial de Birrería Del
          Paso y no está asociado al local.
        </p>
        <p className={styles.footerNote}>
          Los horarios, servicios, el rango de precios y la calificación provienen de la ficha
          pública del negocio en Google Maps. Las fotos son imágenes de referencia generadas
          para esta maqueta y no muestran el local ni sus productos. No se publica el teléfono
          del local.
        </p>
      </footer>
    </>
  );
}
