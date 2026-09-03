"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import styles from "./page.module.css";

const event = {
  id: "cocina-con-amigos",
  title: "Cocina con Amigos",
  guests: "Carlos Avalle + Julio Baez",
  partner: "Con el acompañamiento de ZUCCARDI",
};

type FieldErrors = Partial<Record<"name" | "contact" | "guests", string>>;

export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState(event.id);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [guests, setGuests] = useState("2");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  function openRequest() {
    setSelectedEvent(event.id);
    document.getElementById("solicitar")?.scrollIntoView({ behavior: "smooth" });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const nextErrors: FieldErrors = {};
    if (name.trim().length < 2) nextErrors.name = "Escribí tu nombre.";
    if (contact.trim().length < 4) nextErrors.contact = "Sumá un WhatsApp o usuario de Instagram.";
    if (!guests) nextErrors.guests = "Elegí cuántas personas serían.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    window.setTimeout(() => setStatus("success"), 700);
  }

  return (
    <div className={styles.page}>
      <header className={styles.nav}>
        <div className={styles.navInner}>
          <a className={styles.wordmark} href="#inicio" aria-label="Restaurant Refinería, inicio">
            <span className={styles.mark} aria-hidden="true">R</span>
            <span>Refinería</span>
          </a>
          <nav className={styles.navLinks} aria-label="Navegación principal">
            <a href="#agenda">Agenda</a>
            <a href="#casa">La casa</a>
            <a href="https://www.instagram.com/refineriarestaurant/" target="_blank" rel="noreferrer">
              Instagram
            </a>
          </nav>
          <a className={styles.navCta} href="#solicitar">Pedir lugar</a>
        </div>
      </header>

      <main>
        <section className={styles.hero} id="inicio">
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Agenda de experiencias</p>
            <h1>Las noches de Refinería.</h1>
            <p className={styles.heroIntro}>
              Una agenda propia para seguir cada encuentro y pedir lugar sin perderse en el feed.
            </p>
            <a className={styles.primaryButton} href="#agenda">Ver la agenda</a>
          </div>
          <div className={styles.heroMedia}>
            <Image
              src="/images/hero-plated-dish.jpg"
              alt="Plato servido en una mesa de restaurante"
              fill
              priority
              sizes="(max-width: 767px) 100vw, 50vw"
            />
            <div className={styles.heroMediaShade} aria-hidden="true" />
            <p className={styles.heroMediaNote}>Cocina criolla. Invitados. Una noche para recordar.</p>
          </div>
        </section>

        <section className={styles.infoRail} aria-label="Información de la casa">
          <div>
            <span>Rosario</span>
            <strong>Rawson 443</strong>
          </div>
          <div>
            <span>Servicio</span>
            <strong>Lunes a sábado</strong>
          </div>
          <div>
            <span>Por la noche</span>
            <strong>20:00 a 00:00</strong>
          </div>
          <div>
            <span>Reputación</span>
            <strong>4.4★ en Google</strong>
          </div>
        </section>

        <section className={styles.agendaSection} id="agenda">
          <div className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>La cartelera</p>
            <h2>Lo que viene toma forma aquí.</h2>
            <p>
              Un recorrido simple para descubrir el próximo encuentro, entender la propuesta y pedir lugar.
            </p>
          </div>

          <div className={styles.agendaLayout}>
            <article className={styles.eventCard}>
              <div className={styles.eventImage}>
                <Image
                  src="/images/service-chef-cooking.jpg"
                  alt="Chef terminando un plato"
                  fill
                  sizes="(max-width: 767px) 100vw, 45vw"
                />
              </div>
              <div className={styles.eventBody}>
                <div className={styles.eventTopline}>
                  <span>Experiencia destacada</span>
                  <span>Fecha a confirmar</span>
                </div>
                <h3>{event.title}</h3>
                <p className={styles.eventGuests}>{event.guests}</p>
                <p className={styles.eventDescription}>
                  Un encuentro de cocina con invitados, presentado en una página propia para que la propuesta se entienda antes de escribir.
                </p>
                <div className={styles.eventFooter}>
                  <span>{event.partner}</span>
                  <button className={styles.textButton} type="button" onClick={openRequest}>
                    Pedir lugar <span aria-hidden="true">↗</span>
                  </button>
                </div>
              </div>
            </article>

            <aside className={styles.agendaAside}>
              <p className={styles.asideTitle}>Agenda abierta</p>
              <div className={styles.agendaNote}>
                <span>Próxima edición</span>
                <strong>Se anuncia al confirmar fecha y menú</strong>
              </div>
              <div className={styles.agendaNote}>
                <span>Pedido de lugar</span>
                <strong>El equipo confirma disponibilidad por WhatsApp</strong>
              </div>
              <p className={styles.asideFootnote}>
                La fecha y la disponibilidad no se inventan: se consultan con el equipo antes de cerrar la reserva.
              </p>
            </aside>
          </div>
        </section>

        <section className={styles.casaSection} id="casa">
          <div className={styles.casaStatement}>
            <h2>La información justa para decidir la noche.</h2>
            <p>
              Del primer vistazo al pedido de lugar, todo lo importante queda cerca: la propuesta, el horario y el canal que ya funciona.
            </p>
          </div>
          <div className={styles.casaDetails}>
            <div className={styles.detailBlock}>
              <span>01</span>
              <div>
                <h3>Elegís qué te interesa</h3>
                <p>La agenda pone cada evento en contexto, sin obligarte a reconstruirlo desde posteos sueltos.</p>
              </div>
            </div>
            <div className={styles.detailBlock}>
              <span>02</span>
              <div>
                <h3>Pedís lugar</h3>
                <p>El pedido llega al canal habitual del equipo, con el evento y la cantidad de personas ya claros.</p>
              </div>
            </div>
            <div className={styles.detailBlock}>
              <span>03</span>
              <div>
                <h3>El equipo confirma</h3>
                <p>Fecha, disponibilidad y detalles quedan definidos por quienes organizan la noche.</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.requestSection} id="solicitar">
          <div className={styles.requestIntro}>
            <h2>¿Querés estar en la próxima?</h2>
            <p>
              Dejanos tus datos y el equipo puede confirmar la fecha cuando la agenda esté lista.
            </p>
            <div className={styles.requestSummary}>
              <span>Experiencia elegida</span>
              <strong>{selectedEvent === event.id ? event.title : "Cocina con Amigos"}</strong>
              <small>Fecha a confirmar con el equipo</small>
            </div>
          </div>

          <div className={styles.formPanel}>
            {status === "success" ? (
              <div className={styles.successState} role="status" aria-live="polite">
                <span className={styles.successMark} aria-hidden="true">✓</span>
                <h3>Pedido preparado.</h3>
                <p>
                  Esto es una demo, así que no se envió ningún dato. En una versión real, la solicitud llega al canal habitual de Refinería para que el equipo la confirme.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className={styles.formHeader}>
                  <span>Solicitud breve</span>
                  <strong>Sin pago. Sin compromiso.</strong>
                </div>

                <label className={styles.field} htmlFor="name">
                  <span>Nombre</span>
                  <input
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    autoComplete="name"
                  />
                  {errors.name && <small id="name-error" className={styles.error}>{errors.name}</small>}
                </label>

                <label className={styles.field} htmlFor="contact">
                  <span>¿Dónde te confirmamos?</span>
                  <input
                    id="contact"
                    name="contact"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    aria-invalid={Boolean(errors.contact)}
                    aria-describedby={errors.contact ? "contact-error" : undefined}
                    placeholder="WhatsApp o usuario de Instagram"
                  />
                  {errors.contact && <small id="contact-error" className={styles.error}>{errors.contact}</small>}
                </label>

                <label className={styles.field} htmlFor="guests">
                  <span>Personas</span>
                  <select
                    id="guests"
                    name="guests"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    aria-invalid={Boolean(errors.guests)}
                    aria-describedby={errors.guests ? "guests-error" : undefined}
                  >
                    <option value="1">1 persona</option>
                    <option value="2">2 personas</option>
                    <option value="3">3 personas</option>
                    <option value="4">4 personas</option>
                    <option value="5+">5 o más personas</option>
                  </select>
                  {errors.guests && <small id="guests-error" className={styles.error}>{errors.guests}</small>}
                </label>

                <button className={styles.submitButton} type="submit" disabled={status === "submitting"}>
                  {status === "submitting" ? "Preparando pedido..." : "Pedir lugar"}
                </button>
                <p className={styles.formNote}>Demo de Nivaror. No envía mensajes ni reemplaza el canal real.</p>
              </form>
            )}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <a className={styles.wordmark} href="#inicio">
            <span className={styles.mark} aria-hidden="true">R</span>
            <span>Refinería</span>
          </a>
          <p>Rawson 443, Las Malvinas, Rosario</p>
          <a href="https://www.instagram.com/refineriarestaurant/" target="_blank" rel="noreferrer">@refineriarestaurant</a>
        </div>
        <div className={styles.footerBottom}>
          <span>Lunes a sábado, 20:00 a 00:00. Domingo cerrado.</span>
          <span>Demo conceptual de Nivaror. No es el sitio oficial del negocio.</span>
        </div>
      </footer>
    </div>
  );
}
