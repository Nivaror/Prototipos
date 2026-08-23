import Image from "next/image";
import { Star, MapPin, ArrowSquareOut } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./Reveal";
import { OpenBadge } from "./OpenBadge";
import { Consult } from "./Consult";
import { ADDRESS, MAPS_URL } from "./hours";
import styles from "./page.module.css";
import hero from "../../public/images/hero-waiting-room.jpg";
import ambiance from "../../public/images/ambiance-exam-room.jpg";
import exterior from "../../public/images/exterior-clinic-entrance.jpg";
import handsShot from "../../public/images/service-consultation-hands.jpg";

export default function Home() {
  return (
    <>
      <header className={styles.nav}>
        <a className={styles.wordmark} href="#top">
          <span className={styles.mark} aria-hidden="true" />
          <span>
            KINAP
            <span className={styles.wordmarkSub}>Centro Integral Rehabilitación</span>
          </span>
        </a>
        <nav className={styles.navLinks}>
          <a className={styles.navLink} href="#areas">
            Áreas
          </a>
          <a className={styles.navLink} href="#horarios">
            Horarios
          </a>
          <a className={styles.btnPrimarySm} href="#areas">
            Consultar
          </a>
        </nav>
      </header>

      <main id="top">
        {/* Full-bleed, bottom-anchored hero: no left/right split, content sits
            over the photo instead of beside it. */}
        <section className={styles.hero}>
          <Image src={hero} alt="" fill priority className={styles.heroImg} sizes="100vw" />
          <div className={styles.heroScrim} aria-hidden="true" />
          <div className={styles.heroContent}>
            <h1 className={styles.h1}>
              Nueve áreas de salud,
              <br />
              un solo lugar en Alberdi.
            </h1>
            <p className={styles.lead}>
              Kinesiología, gimnasio, pileta, nutrición y más, cada una con su propia consulta,
              en vez de un único teléfono para todo.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.btnPrimary} href="#areas">
                Ver las nueve áreas
              </a>
            </div>
          </div>
        </section>

        <section className={styles.trustBar}>
          <span className={styles.trustItem}>
            <Star size={16} weight="fill" className={styles.starIcon} />
            4.2 · 61 reseñas en Google
          </span>
          <span className={styles.trustDivider} aria-hidden="true" />
          <span className={styles.trustItem}>
            <MapPin size={16} weight="regular" />
            {ADDRESS}
          </span>
          <span className={styles.trustDivider} aria-hidden="true" />
          <OpenBadge />
        </section>

        <section className={styles.section} id="areas">
          <Reveal>
            <div className={styles.sectionHead}>
              <h2 className={styles.h2}>Elegí tu área antes de llamar</h2>
              <p className={styles.sectionLead}>
                Hoy todo pasa por un mismo teléfono. Acá cada área tiene su propia consulta,
                para que sepas con quién vas a hablar.
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <Consult />
          </Reveal>
        </section>

        <Reveal>
          <section className={styles.ambiance}>
            <Image
              src={ambiance}
              alt="Sala de atención de un centro de rehabilitación"
              className={styles.ambianceImg}
              sizes="100vw"
            />
          </section>
        </Reveal>

        <section className={styles.section} id="horarios">
          <div className={styles.splitAsym}>
            <Reveal>
              <div>
                <h2 className={styles.h2}>Horarios y ubicación</h2>
                <dl className={styles.hoursList}>
                  <div className={styles.hoursRow}>
                    <dt>Lunes a viernes</dt>
                    <dd>8:00 a 21:00</dd>
                  </div>
                  <div className={styles.hoursRow}>
                    <dt>Sábado y domingo</dt>
                    <dd>Cerrado</dd>
                  </div>
                </dl>
                <a className={styles.mapLink} href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                  {ADDRESS}
                  <ArrowSquareOut size={15} weight="bold" />
                </a>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className={styles.exteriorWrap}>
                <Image
                  src={exterior}
                  alt="Entrada de un centro de salud"
                  className={styles.exteriorImg}
                  sizes="(max-width: 800px) 100vw, 480px"
                />
              </div>
            </Reveal>
          </div>
        </section>

        <Reveal>
          <section className={styles.closing}>
            <Image
              src={handsShot}
              alt=""
              className={styles.closingImg}
              sizes="(max-width: 800px) 100vw, 50vw"
            />
            <div className={styles.closingCopy}>
              <h2 className={styles.h2}>¿No sabés bien qué área necesitás?</h2>
              <p className={styles.sectionLead}>
                Contanos qué te pasa y te orientamos nosotros a la especialidad correcta.
              </p>
              <a className={styles.btnPrimary} href="#areas">
                Consultar
              </a>
            </div>
          </section>
        </Reveal>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <span className={styles.wordmarkSub}>KINAP · Centro Integral Rehabilitación</span>
          <span>{ADDRESS}</span>
          <span>Lun a vie, 8:00 a 21:00</span>
        </div>
        <p className={styles.disclaimer}>
          Esta página es una demo de Nivaror para KINAP, no es el sitio oficial del centro.
        </p>
      </footer>
    </>
  );
}
