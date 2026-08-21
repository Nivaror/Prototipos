import Image from "next/image";
import {
  ArrowSquareOut,
  Baby,
  Car,
  Coffee,
  Dog,
  Leaf,
  Star,
  UsersThree,
  Wheelchair,
  WifiHigh,
} from "@phosphor-icons/react/dist/ssr";
import { OpenTicket, WeekBand } from "./OpenStatus";
import { Reservation } from "./Reservation";
import { Reveal } from "./Reveal";
import { MAPS_URL } from "./hours";
import hero from "../../public/images/hero-isla.jpg";
import llegada from "../../public/images/llegada.jpg";
import mesaVerde from "../../public/images/mesa-verde.jpg";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <header className={styles.nav}>
        <a className={styles.wordmark} href="#top">
          <span className={styles.mark} aria-hidden="true" />
          <span>
            Isla Centenario
            <span className={styles.wordmarkSub}>Restaurante · Tigre</span>
          </span>
        </a>
        <nav className={styles.navLinks}>
          <a className={styles.navLink} href="#llegar">
            Cómo llegar
          </a>
          <a className={styles.navLink} href="#horarios">
            Horarios
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
              Antes de venir,
              <br />
              hay que saber llegar.
            </h1>
            <p className={styles.lead}>
              Estamos en la isla. Eso cambia la primera pregunta de todo el mundo — y hoy no hay
              ningún lado donde esté contestada.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.btnPrimary} href="#llegar">
                Cómo llegar
              </a>
              <a className={styles.btnGhost} href="#reservar">
                Reservar mesa
              </a>
            </div>
          </div>
          <div className={styles.heroImage}>
            <Image
              src={hero}
              alt="Muelle de madera en una isla del delta con una lancha amarrada y vegetación densa"
              placeholder="blur"
              priority
              sizes="(max-width: 900px) 100vw, 46vw"
            />
          </div>
        </section>

        {/* The whole reason this prototype exists: the access question, answered once. */}
        <section className={styles.arrive} id="llegar">
          <Reveal>
            <div className={styles.arriveHead}>
              <h2 className={styles.h2}>Cómo se llega.</h2>
              <p className={styles.body}>
                Un restaurante con dirección de calle no necesita explicar esto. Uno en la isla,
                sí — y es la consulta que hoy se responde por teléfono, una por una.
              </p>
            </div>
            <div className={styles.arriveGrid}>
              <div className={styles.arriveSteps}>
                <div className={styles.step}>
                  <span className={styles.stepNum}>1</span>
                  <div className={styles.stepBody}>
                    <p className={styles.stepTitle}>Desde dónde salís</p>
                    <p className={styles.stepText}>
                      El punto de partida, el muelle o la estación, y cuánto lleva el cruce.
                      Esto lo carga el restaurante: la ficha de Google no lo dice y no se
                      inventa acá.
                    </p>
                    <span className={styles.faqPending}>a completar</span>
                  </div>
                </div>
                <div className={styles.step}>
                  <span className={styles.stepNum}>2</span>
                  <div className={styles.stepBody}>
                    <p className={styles.stepTitle}>Horarios del cruce</p>
                    <p className={styles.stepText}>
                      A qué hora conviene salir para llegar dentro del horario de cocina, que
                      cierra a las 18.
                    </p>
                    <span className={styles.faqPending}>a completar</span>
                  </div>
                </div>
                <div className={styles.step}>
                  <span className={styles.stepNum}>3</span>
                  <div className={styles.stepBody}>
                    <p className={styles.stepTitle}>Si venís en auto</p>
                    <p className={styles.stepText}>
                      La ficha de Google confirma estacionamiento gratuito en el lugar. Dónde se
                      deja el auto exactamente, lo completa el restaurante.
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.arriveImage}>
                <Image
                  src={llegada}
                  alt="Lancha de pasajeros acercándose a un muelle en el delta del Paraná"
                  placeholder="blur"
                  sizes="(max-width: 900px) 100vw, 38vw"
                />
              </div>
            </div>
          </Reveal>
        </section>

        <section className={styles.week_} id="horarios">
          <Reveal>
            <div className={styles.weekHead}>
              <h2 className={styles.h2}>De miércoles a domingo.</h2>
              <p className={styles.body}>
                De 11 a 18, cinco días por semana. Lunes y martes no hay servicio — un dato que
                importa el doble cuando el viaje incluye cruzar.
              </p>
            </div>
            <WeekBand />
          </Reveal>
        </section>

        <section className={styles.reserve} id="reservar">
          <Reveal>
            <div className={styles.reserveGrid}>
              <div className={styles.reserveForm}>
                <h2 className={styles.h2}>Reservá antes de cruzar.</h2>
                <p className={styles.body}>
                  Se aceptan reservas. Con 4,9 de promedio y una capacidad que no es la de un
                  local sobre la avenida, la mesa conviene tenerla tomada.
                </p>
                <Reservation />
              </div>
              <div className={styles.reserveImage}>
                <Image
                  src={mesaVerde}
                  alt="Mesa al aire libre bajo los árboles con café y postre, y un perro descansando al lado"
                  placeholder="blur"
                  sizes="(max-width: 900px) 100vw, 44vw"
                />
              </div>
            </div>
          </Reveal>
        </section>

        <section className={styles.services}>
          <Reveal>
            <h2 className={styles.h2}>Cómo es el lugar.</h2>
            <div className={styles.bento}>
              <div className={`${styles.cell} ${styles.cellSupport}`}>
                <h3 className={styles.h3}>En la mesa</h3>
                <ul className={styles.cellList}>
                  <li>
                    <Leaf size={19} weight="duotone" aria-hidden="true" />
                    Platos vegetarianos
                  </li>
                  <li>
                    <Coffee size={19} weight="duotone" aria-hidden="true" />
                    Buen café y postres
                  </li>
                  <li>
                    <UsersThree size={19} weight="duotone" aria-hidden="true" />
                    Servicio de catering
                  </li>
                </ul>
              </div>

              <div className={styles.cell}>
                <h3 className={styles.h3}>Quién viene</h3>
                <ul className={styles.cellList}>
                  <li>
                    <Dog size={19} weight="duotone" aria-hidden="true" />
                    Se admiten perros, adentro y afuera
                  </li>
                  <li>
                    <Baby size={19} weight="duotone" aria-hidden="true" />
                    Ideal para ir con niños
                  </li>
                  <li>
                    <Wheelchair size={19} weight="duotone" aria-hidden="true" />
                    Entrada, espacio y sanitarios accesibles
                  </li>
                </ul>
              </div>

              <div className={styles.cell}>
                <h3 className={styles.h3}>Mientras estás</h3>
                <ul className={styles.cellList}>
                  <li>
                    <WifiHigh size={19} weight="duotone" aria-hidden="true" />
                    Wi-Fi gratis
                  </li>
                  <li>
                    <Car size={19} weight="duotone" aria-hidden="true" />
                    Estacionamiento gratuito en el lugar
                  </li>
                  <li>
                    <Leaf size={19} weight="duotone" aria-hidden="true" />
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
                4,9
                <Star size={26} weight="fill" aria-hidden="true" />
              </p>
              <p className={styles.ratingText}>
                Calificación en Google sobre 121 reseñas — la más alta de todos los locales
                relevados en esta tanda.
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
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerLead}>
          Prototipo de demostración creado por Nivaror. No es el sitio oficial de Isla Centenario
          Restaurant y no está asociado al restaurante.
        </p>
        <p className={styles.footerNote}>
          Los horarios, servicios y la calificación provienen de la ficha pública del negocio en
          Google Maps. Los pasos para llegar quedan sin completar a propósito: la ficha no dice
          cómo se accede a la isla y no se inventan datos. Las fotos son imágenes de referencia
          generadas para esta maqueta y no muestran el lugar. No se publica el teléfono del
          restaurante.
        </p>
      </footer>
    </>
  );
}
