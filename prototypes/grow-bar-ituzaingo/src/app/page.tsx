import Image from "next/image";
import {
  GameController,
  Television,
  Microphone,
  Sun,
  WifiHigh,
  MoonStars,
  Wheelchair,
  Car,
  Storefront,
  MapPin,
  Star,
} from "@phosphor-icons/react/dist/ssr";
import { ProgramProvider } from "./ProgramProvider";
import { TonightBilling, DoorState } from "./Tonight";
import { Board } from "./Board";
import { Reserva } from "./Reserva";
import { Reveal } from "./Reveal";
import { ADDRESS, MAPS_URL, RATING } from "./hours";
import { nowInArgentina } from "./schedule";
import styles from "./page.module.css";

// Rendered per request so the first paint already carries Argentina's real
// clock: a page whose whole job is "what is on tonight" cannot open on a
// build-time snapshot of the week.
export const dynamic = "force-dynamic";

export default function Page() {
  const initial = nowInArgentina();

  return (
    <ProgramProvider>
      <header className={styles.nav}>
        <div className={styles.navInner}>
          <a href="#top" className={styles.wordmark}>
            Grow Bar
          </a>
          <div className={styles.navRight}>
            <DoorState initial={initial} />
            <a href="#reservar" className={styles.navCta}>
              Reservar
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              <span className={styles.heroKicker}>Hoy en Ituzaingó</span>
              <TonightBilling initial={initial} />
            </h1>
            <p className={styles.heroLead}>
              Bar con juegos, karaoke, deportes y música en vivo. La cartelera de la semana,
              a la vista, sin tener que preguntar.
            </p>
            <div className={styles.heroCtas}>
              <a href="#reservar" className={styles.primary}>
                Reservar mesa
              </a>
              <a href="#cartelera" className={styles.ghost}>
                Ver la semana
              </a>
            </div>
          </div>
          <div className={styles.heroImage}>
            <Image
              src="/images/barra-noche.jpg"
              alt="La barra iluminada de un bar de noche, con tragos servidos sobre el mostrador"
              width={1800}
              height={1013}
              priority
              sizes="(max-width: 900px) 100vw, 46vw"
            />
          </div>
        </section>

        <section className={styles.cartelera} id="cartelera">
          <Reveal>
            <div className={styles.carteleraHead}>
              <h2 className={styles.sectionTitle}>La semana</h2>
              <p className={styles.sectionLead}>
                Cada noche tiene lo suyo y su propio horario. Viernes y sábados la barra
                sigue hasta las 03:00.
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <Board initial={initial} />
          </Reveal>
        </section>

        <section className={styles.casa}>
          <Reveal>
            <h2 className={styles.sectionTitle}>La casa</h2>
          </Reveal>
          <Reveal delay={60}>
            <div className={styles.bento}>
              <figure className={styles.bentoPhoto}>
                <Image
                  src="/images/salon.jpg"
                  alt="Salón de madera cálida con mesas puestas y luces colgantes encendidas"
                  width={1800}
                  height={1013}
                  sizes="(max-width: 900px) 100vw, 52vw"
                />
              </figure>

              <div className={styles.bentoLead}>
                <GameController size={26} weight="duotone" />
                <h3>Bar con juegos</h3>
                <p>
                  Las mesas de juego son parte del lugar, no un extra. Se puede venir a jugar
                  sin plan y quedarse a cenar.
                </p>
              </div>

              <div className={styles.bentoCell}>
                <Microphone size={22} weight="duotone" />
                <h3>Karaoke</h3>
                <p>Micrófono y pantalla para el que se anime.</p>
              </div>

              <div className={styles.bentoCell}>
                <Television size={22} weight="duotone" />
                <h3>Deportes</h3>
                <p>Los partidos de la fecha, en pantalla y con la barra abierta.</p>
              </div>

              <div className={styles.bentoAccent}>
                <Sun size={22} weight="duotone" />
                <h3>Terraza</h3>
                <p>Asientos al aire libre para las noches que lo piden.</p>
              </div>

              <div className={styles.bentoWide}>
                <MoonStars size={22} weight="duotone" />
                <h3>Cocina de madrugada</h3>
                <p>Se come tarde: la cocina acompaña el horario de la barra.</p>
              </div>

              <div className={styles.bentoWide}>
                <WifiHigh size={22} weight="duotone" />
                <h3>Wi-Fi gratis</h3>
                <p>Para grupos que se quedan y para los que están de paso.</p>
              </div>
            </div>
          </Reveal>
        </section>

        <section className={styles.reservar} id="reservar">
          <Reveal>
            <div className={styles.reservarHead}>
              <h2 className={styles.sectionTitle}>Reservar una noche</h2>
              <p className={styles.sectionLead}>
                Elegí la noche antes que la hora. Se aceptan reservas y las mesas grandes
                entran mejor avisando.
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <Reserva />
          </Reveal>
        </section>

        <section className={styles.donde}>
          <Reveal>
            <div className={styles.dondeGrid}>
              <div className={styles.dondeCol}>
                <h3 className={styles.colTitle}>Para llevar y delivery</h3>
                <ul className={styles.plainList}>
                  <li>Entrega a domicilio</li>
                  <li>Entrega sin contacto</li>
                  <li>Pedidos desde el automóvil</li>
                  <li>Para llevar</li>
                  <li>Consumo en el lugar</li>
                </ul>
              </div>

              <div className={styles.dondeCol}>
                <h3 className={styles.colTitle}>Lo que hay en el lugar</h3>
                <ul className={styles.iconList}>
                  <li>
                    <Storefront size={19} weight="duotone" />
                    Barra, servicio a la mesa y de mostrador
                  </li>
                  <li>
                    <Wheelchair size={19} weight="duotone" />
                    Entrada, espacio y estacionamiento accesibles
                  </li>
                  <li>
                    <Car size={19} weight="duotone" />
                    Estacionamiento gratuito, en el lugar y en la calle
                  </li>
                </ul>
              </div>

              <div className={styles.dondeCol}>
                <h3 className={styles.colTitle}>Dónde</h3>
                <p className={styles.address}>{ADDRESS}</p>
                <a
                  className={styles.mapLink}
                  href={MAPS_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <MapPin size={18} weight="fill" />
                  Abrir en Google Maps
                </a>
                <p className={styles.rating}>
                  <Star size={17} weight="fill" />
                  {RATING.score} de {RATING.reviews} reseñas en Google
                </p>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
        <p className={styles.footerBrand}>Grow Bar</p>
        <p className={styles.disclaimer}>
          Prototipo de demostración creado por Nivaror. No es el sitio oficial de Grow Bar
          y no está asociado al local. Los datos de contacto, los horarios y la
          calificación provienen de su ficha pública de Google Maps; la cartelera de cada
          noche es contenido de muestra y se puede editar en esta misma página.
        </p>
        </div>
      </footer>
    </ProgramProvider>
  );
}
