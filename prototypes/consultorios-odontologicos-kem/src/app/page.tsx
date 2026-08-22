import Image from "next/image";
import {
  ArrowSquareOut,
  CalendarCheck,
  Clock,
  CurrencyDollar,
  Question,
  Star,
} from "@phosphor-icons/react/dist/ssr";
import { Reservation } from "./Reservation";
import { Reveal } from "./Reveal";
import { MAPS_URL, OPENS_AT } from "./hours";
import hero from "../../public/images/hero-consultorio.jpg";
import recepcion from "../../public/images/recepcion.jpg";
import atencion from "../../public/images/atencion.jpg";
import styles from "./page.module.css";

/** Real Google reviews, shortened and initialled — nothing invented, nobody's full name published. */
const VOICES = [
  {
    text: "Les tengo miedo a los dentistas, pero me sentí cómoda. Me explicó cómo estaba mi salud bucal y qué seguía.",
    who: "Rocío L. · Local Guide · hace 1 año",
  },
  {
    text: "Voy en forma particular aunque tengo obra social, por la dedicación y la excelente atención.",
    who: "Fernando C. · hace 6 meses",
  },
  {
    text: "Gracias por la atención recibida: calidez, amabilidad y profesionalismo.",
    who: "Marisa N. · hace 2 meses",
  },
];

export default function Home() {
  return (
    <>
      <header className={styles.nav}>
        <a className={styles.wordmark} href="#top">
          <span className={styles.mark} aria-hidden="true" />
          <span>
            KEM
            <span className={styles.wordmarkSub}>Consultorios odontológicos</span>
          </span>
        </a>
        <nav className={styles.navLinks}>
          <a className={styles.navLink} href="#antes">
            Antes de venir
          </a>
          <a className={styles.navLink} href="#llegar">
            Cómo llegar
          </a>
          <a className={styles.btnPrimarySm} href="#turnos">
            Pedir turno
          </a>
        </nav>
      </header>

      <main id="top">
        {/* Image-left hero: the room does the reassuring before the copy does. */}
        <section className={`${styles.hero} ${styles.heroFlip}`}>
          <div className={styles.heroCopy}>
            <p className={styles.ticket}>
              <span className={styles.ticketDot} aria-hidden="true" />
              <span>
                Abre {OPENS_AT} · San Juan 3943, Rosario
              </span>
            </p>
            <h1 className={styles.h1}>
              Pedí tu turno sin
              <br />
              esperar una respuesta.
            </h1>
            <p className={styles.lead}>
              Elegís el día y la hora, queda anotado en la agenda del consultorio y te llega un
              recordatorio. El chat queda para lo que de verdad hace falta hablar.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.btnPrimary} href="#turnos">
                Pedir turno
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
              alt="Consultorio odontológico con luz natural, mueble de madera clara y un sillón tapizado en verde suave"
              placeholder="blur"
              priority
              sizes="(max-width: 900px) 100vw, 46vw"
            />
          </div>
        </section>

        {/* The three questions that today get retyped over WhatsApp, one by one. */}
        <section className={styles.faq} id="antes">
          <Reveal>
            <div className={styles.faqHead}>
              <h2 className={styles.h2}>Lo que todos preguntan antes de venir.</h2>
              <p className={styles.body}>
                Tres preguntas que hoy se responden una y otra vez por chat. Escritas acá una
                sola vez, dejan de interrumpir la atención.
              </p>
            </div>
            <div className={styles.faqGrid}>
              <div className={styles.faqCard}>
                <p className={styles.faqQ}>
                  <CurrencyDollar size={20} weight="duotone" aria-hidden="true" />
                  ¿Cuánto sale la consulta?
                </p>
                <p className={styles.faqA}>
                  Acá va el valor de la consulta y de los tratamientos más frecuentes, con la
                  fecha de última actualización.
                </p>
                <span className={styles.faqPending}>a completar</span>
              </div>

              <div className={styles.faqCard}>
                <p className={styles.faqQ}>
                  <Question size={20} weight="duotone" aria-hidden="true" />
                  ¿Atienden por obra social?
                </p>
                <p className={styles.faqA}>
                  Acá va la lista de obras sociales y cómo funciona la atención particular, que
                  hoy es la duda que más se repite en las reseñas.
                </p>
                <span className={styles.faqPending}>a completar</span>
              </div>

              <div className={styles.faqCard}>
                <p className={styles.faqQ}>
                  <Clock size={20} weight="duotone" aria-hidden="true" />
                  ¿Qué días atienden?
                </p>
                <p className={styles.faqA}>
                  De la ficha de Google solo surge que abre a las {OPENS_AT}. El horario
                  completo lo carga el consultorio y se muestra acá.
                </p>
                <span className={styles.faqPending}>a completar</span>
              </div>
            </div>
          </Reveal>
        </section>

        {/* The feature the pitch is actually about. */}
        <section className={styles.reserve} id="turnos">
          <Reveal>
            <div className={styles.reserveGrid}>
              <div className={styles.reserveForm}>
                <h2 className={styles.h2}>Turnos, sin ir y venir.</h2>
                <p className={styles.body}>
                  El paciente carga día, hora y motivo. El consultorio lo ve en su agenda, sin
                  turnos superpuestos y con el recordatorio automático que evita ausencias.
                </p>
                <Reservation />
              </div>
              <div className={styles.reserveImage}>
                <Image
                  src={recepcion}
                  alt="Sala de espera con banco de madera clara, almohadones verdes y plantas junto a una ventana"
                  placeholder="blur"
                  sizes="(max-width: 900px) 100vw, 44vw"
                />
              </div>
            </div>
          </Reveal>
        </section>

        {/* Real reviews. The reputation is the strongest asset here — quote it, don't invent it. */}
        <section className={styles.voices}>
          <Reveal>
            <h2 className={styles.h2}>Lo que dicen los pacientes.</h2>
            <div className={styles.voiceGrid}>
              {VOICES.map((v) => (
                <blockquote className={styles.voice} key={v.who}>
                  <p className={styles.voiceText}>{v.text}</p>
                  <footer className={styles.voiceWho}>{v.who}</footer>
                </blockquote>
              ))}
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
                Calificación del consultorio en Google, sobre 55 reseñas.
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
              src={atencion}
              alt="Manos con guantes sosteniendo un espejo odontológico y un modelo de dientes sobre una mesa de madera clara"
              placeholder="blur"
              sizes="100vw"
            />
          </div>
          <Reveal>
            <div className={styles.placeBody}>
              <div>
                <h2 className={styles.h2}>San Juan 3943, Rosario.</h2>
                <p className={styles.body}>
                  Consultorio odontológico en Rosario, Santa Fe. La ficha de Google lo señala
                  además como un espacio amigable con la comunidad LGBTQ+.
                </p>
              </div>
              <a
                className={styles.btnPrimary}
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <CalendarCheck size={18} weight="bold" aria-hidden="true" />
                Ver en Google Maps
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerLead}>
          Prototipo de demostración creado por Nivaror. No es el sitio oficial de Consultorios
          Odontológicos KEM y no está asociado al consultorio.
        </p>
        <p className={styles.footerNote}>
          La dirección, el horario de apertura y la calificación provienen de la ficha pública
          del negocio en Google Maps; las reseñas citadas son públicas y se muestran abreviadas.
          Las fotos son imágenes de referencia generadas para esta maqueta y no muestran el
          consultorio real. Los precios y las obras sociales quedan sin completar a propósito:
          no se inventan datos que el consultorio no publicó.
        </p>
      </footer>
    </>
  );
}
