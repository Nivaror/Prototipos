import Image from "next/image";
import {
  Star,
  MapPin,
  ShieldCheck,
  UsersThree,
  Baby,
  ArrowSquareOut,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./Reveal";
import { StatusBadge } from "./StatusBadge";
import { HeroPreview } from "./HeroPreview";
import { Booking } from "./Booking";
import { ADDRESS, MAPS_URL } from "./hours";
import styles from "./page.module.css";
import ambiance from "../../public/images/ambiance-exam-room.jpg";
import team from "../../public/images/service-consultation-hands.jpg";
import exterior from "../../public/images/exterior-clinic-entrance.jpg";

export default function Home() {
  return (
    <>
      <header className={styles.nav}>
        <a className={styles.wordmark} href="#top">
          <span className={styles.mark} aria-hidden="true" />
          <span>
            DOMO
            <span className={styles.wordmarkSub}>Centro Médico</span>
          </span>
        </a>
        <nav className={styles.navLinks}>
          <a className={styles.navLink} href="#turnos">
            Turnos
          </a>
          <a className={styles.navLink} href="#horarios">
            Horarios
          </a>
          <a className={styles.btnPrimarySm} href="#turnos">
            Reservar turno
          </a>
        </nav>
      </header>

      <main id="top">
        {/* Micro info bar sits ABOVE the hero, not after it, unlike the
            sector's other prototype — a deliberate order swap, not just a
            different look. */}
        <div className={styles.infoBar}>
          <span className={styles.infoItem}>
            <Star size={14} weight="fill" className={styles.starIcon} />
            4.6 · 21 reseñas en Google
          </span>
          <span className={styles.infoDivider} aria-hidden="true" />
          <span className={styles.infoItem}>
            <MapPin size={14} weight="regular" />
            {ADDRESS}
          </span>
          <span className={styles.infoDivider} aria-hidden="true" />
          <StatusBadge />
        </div>

        {/* Split hero, but the right column is a live-looking booking
            preview widget, not a photo — no image in the hero at all,
            which neither sibling clinic prototype does. */}
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.badge}>
              <ShieldCheck size={14} weight="fill" />
              Espacio seguro y confidencial
            </span>
            <h1 className={styles.h1}>Elegí tu turno, sin tener que llamar.</h1>
            <p className={styles.lead}>
              Ginecología y salud sexual y reproductiva en Rosario. Mirá los horarios
              disponibles y reservá sin necesidad de una llamada.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.btnPrimary} href="#turnos">
                Reservar turno
              </a>
              <a className={styles.btnGhost} href="#horarios">
                Ver horarios
              </a>
            </div>
          </div>
          <HeroPreview />
        </section>

        <section className={styles.safeBand}>
          <div className={styles.safeItem}>
            <ShieldCheck size={22} weight="duotone" className={styles.safeIcon} />
            <span>Espacio seguro y confidencial</span>
          </div>
          <div className={styles.safeItem}>
            <UsersThree size={22} weight="duotone" className={styles.safeIcon} />
            <span>Ambiente LGBTQ+ friendly, safe space para personas trans</span>
          </div>
          <div className={styles.safeItem}>
            <Baby size={22} weight="duotone" className={styles.safeIcon} />
            <span>Sala de lactancia disponible</span>
          </div>
        </section>

        <section className={styles.section} id="turnos">
          <Reveal>
            <div className={styles.sectionHeadCenter}>
              <h2 className={styles.h2}>Turnos disponibles</h2>
              <p className={styles.sectionLead}>
                Elegí día y horario, y completá tus datos en el mismo lugar, sin escribir
                primero por WhatsApp para pedir un horario.
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <Booking />
          </Reveal>
        </section>

        <Reveal>
          <section className={styles.quoteBreak}>
            <Image
              src={ambiance}
              alt="Sala de atención de un consultorio ginecológico"
              className={styles.quoteBreakImg}
              sizes="100vw"
            />
            <div className={styles.quoteBreakScrim} aria-hidden="true" />
            <p className={styles.quoteBreakText}>
              Un espacio pensado para que te sientas escuchada, tranquila y en confianza.
            </p>
          </section>
        </Reveal>

        <section className={styles.section}>
          <Reveal>
            <div className={styles.teamCard}>
              <Image
                src={team}
                alt="Consulta ginecológica"
                className={styles.teamImg}
                sizes="(max-width: 800px) 100vw, 360px"
              />
              <div className={styles.teamCopy}>
                <p className={styles.teamName}>Dra. Valentina Suárez</p>
                <p className={styles.teamRole}>Ginecóloga, equipo de DOMO</p>
                <p className={styles.teamBio}>
                  Consultas con tiempo para escuchar, en un espacio pensado para que te
                  sientas cómoda en cada visita.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        <section className={styles.section} id="horarios">
          <Reveal>
            <div className={styles.bento3}>
              <div className={styles.bentoCard}>
                <p className={styles.bentoLabel}>Horarios</p>
                <dl className={styles.hoursList}>
                  <div className={styles.hoursRow}>
                    <dt>Lunes a viernes</dt>
                    <dd>9:00 a 19:00</dd>
                  </div>
                  <div className={styles.hoursRow}>
                    <dt>Sábado</dt>
                    <dd>9:00 a 12:30</dd>
                  </div>
                  <div className={styles.hoursRow}>
                    <dt>Domingo</dt>
                    <dd>Cerrado</dd>
                  </div>
                </dl>
              </div>
              <div className={styles.bentoCard}>
                <p className={styles.bentoLabel}>Ubicación</p>
                <p className={styles.bentoBody}>{ADDRESS}</p>
                <a className={styles.mapLink} href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                  Ver en el mapa
                  <ArrowSquareOut size={14} weight="bold" />
                </a>
              </div>
              <div className={`${styles.bentoCard} ${styles.bentoCardAccent}`}>
                <p className={styles.bentoLabel}>Cómo reservar</p>
                <p className={styles.bentoBody}>
                  Turnos online, eligiendo día y horario, sin llamada ni mensaje inicial.
                </p>
                <a className={styles.mapLink} href="#turnos">
                  Ir al turnero
                  <ArrowSquareOut size={14} weight="bold" />
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        <Reveal>
          <section className={styles.closing}>
            <Image
              src={exterior}
              alt="Entrada de un centro médico"
              className={styles.closingImg}
              sizes="100vw"
            />
            <div className={styles.closingScrim} aria-hidden="true" />
            <div className={styles.closingContent}>
              <h2 className={styles.h2}>Tu turno, cuando vos quieras.</h2>
              <p className={styles.sectionLead}>
                Sin llamar, sin escribir primero. Elegí el horario que te quede mejor.
              </p>
              <a className={styles.btnPrimary} href="#turnos">
                Reservar turno
              </a>
            </div>
          </section>
        </Reveal>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <span className={styles.wordmarkSub}>DOMO · Centro Médico</span>
          <span>{ADDRESS}</span>
          <span>Lun a vie, 9:00 a 19:00 · Sáb, 9:00 a 12:30</span>
        </div>
        <p className={styles.disclaimer}>
          Esta página es una demo de Nivaror para DOMO Centro Médico, no es el sitio
          oficial del centro. Los horarios de turnos que se muestran en el turnero son
          ilustrativos.
        </p>
      </footer>
    </>
  );
}
