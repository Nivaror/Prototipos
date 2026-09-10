"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import styles from "./page.module.css";

type Question = "sede" | "horarios" | "propuesta";
type FormStatus = "idle" | "loading" | "success";

const questions: { value: Question; label: string; detail: string }[] = [
  {
    value: "sede",
    label: "Confirmar la sede",
    detail: "Quiero saber si esta guía corresponde a Boulevard Rondeau.",
  },
  {
    value: "horarios",
    label: "Consultar horarios",
    detail: "Necesito saber cuándo conviene acercarme.",
  },
  {
    value: "propuesta",
    label: "Conocer la propuesta",
    detail: "Quiero entender qué puedo encontrar en el bar.",
  },
];

export default function Home() {
  const [question, setQuestion] = useState<Question | "">("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [reservationDate, setReservationDate] = useState("");
  const [reservationTime, setReservationTime] = useState("");
  const [reservationGuests, setReservationGuests] = useState("2");
  const [reservationName, setReservationName] = useState("");
  const [reservationContact, setReservationContact] = useState("");
  const [reservationError, setReservationError] = useState("");
  const [reservationStatus, setReservationStatus] = useState<FormStatus>("idle");

  function validate() {
    const nextErrors: Record<string, string> = {};
    const cleanName = name.trim();
    const cleanContact = contact.trim();
    const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanContact);
    const looksLikeInstagram = /^@?[a-zA-Z0-9._-]{3,}$/.test(cleanContact);

    if (!question) nextErrors.question = "Elegí qué querés consultar.";
    if (cleanName.length < 2) nextErrors.name = "Escribí tu nombre.";
    if (!looksLikeEmail && !looksLikeInstagram) {
      nextErrors.contact = "Usá un email o un usuario de Instagram.";
    }

    return nextErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 650);
  }

  function handleReservationSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (reservationStatus === "loading") return;

    const cleanName = reservationName.trim();
    const cleanContact = reservationContact.trim();
    const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanContact);
    const looksLikeInstagram = /^@?[a-zA-Z0-9._-]{3,}$/.test(cleanContact);

    if (!reservationDate || !reservationTime || cleanName.length < 2 || (!looksLikeEmail && !looksLikeInstagram)) {
      setReservationError("Completá fecha, horario, nombre y un email o Instagram.");
      return;
    }

    setReservationError("");
    setReservationStatus("loading");
    window.setTimeout(() => setReservationStatus("success"), 650);
  }

  function resetReservation() {
    setReservationDate("");
    setReservationTime("");
    setReservationGuests("2");
    setReservationName("");
    setReservationContact("");
    setReservationError("");
    setReservationStatus("idle");
  }

  function resetForm() {
    setQuestion("");
    setName("");
    setContact("");
    setMessage("");
    setErrors({});
    setStatus("idle");
  }

  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#contenido">
        Ir al contenido
      </a>

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a className={styles.wordmark} href="#inicio" aria-label="Don García, inicio">
            <span className={styles.wordmarkMark} aria-hidden="true" />
            <span>Don García</span>
          </a>
          <nav className={styles.nav} aria-label="Navegación principal">
            <a href="#identidad">La idea</a>
            <a href="#respuestas">Qué se confirma</a>
            <a href="#reservas">Reservar</a>
            <a className={styles.navAction} href="#consulta">
              Consultar
            </a>
          </nav>
        </div>
      </header>

      <main id="contenido">
        <section className={styles.hero} id="inicio" aria-labelledby="hero-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Bar restaurante / Rosario</p>
            <h1 id="hero-title">Don García, claro.</h1>
            <p className={styles.heroLead}>
              Una entrada única para ubicar la sede de Alberdi, entender la propuesta y consultar antes de ir.
            </p>
            <a className={styles.primaryButton} href="#identidad">
              Ver la propuesta
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <figure className={styles.heroFigure}>
            <Image
              src="/images/ambiente-bar.jpg"
              alt=""
              width={2048}
              height={1152}
              priority
              sizes="(max-width: 767px) 100vw, 58vw"
            />
            <figcaption>Imagen de ambiente para esta demo, no una foto de la sede.</figcaption>
          </figure>
        </section>

        <section className={styles.factRail} aria-label="Datos confirmados de la sede">
          <div>
            <span className={styles.factValue}>4,2★</span>
            <span className={styles.factLabel}>Google</span>
          </div>
          <div>
            <span className={styles.factValue}>7.285</span>
            <span className={styles.factLabel}>reseñas</span>
          </div>
          <div>
            <span className={styles.factValue}>Alberdi</span>
            <span className={styles.factLabel}>Rosario</span>
          </div>
        </section>

        <section className={styles.reservationSection} id="reservas" aria-labelledby="reservation-title">
          <div className={styles.reservationHeading}>
            <h2 id="reservation-title">Guardá tu mesa antes de venir.</h2>
            <p>
              Elegí una fecha y un horario preferido. En una versión conectada, el equipo confirmaría la disponibilidad por tu canal.
            </p>
          </div>

          <div className={styles.reservationDesk}>
            <div className={styles.reservationFormShell}>
              {reservationStatus === "success" ? (
                <div className={styles.reservationSuccess} role="status" aria-live="polite">
                  <span className={styles.successMark} aria-hidden="true">✓</span>
                  <h3>Solicitud recibida.</h3>
                  <p>
                    Dejaste una preferencia para el {reservationDate.split("-").reverse().join("/")} a las {reservationTime}, para {reservationGuests === "5" ? "5 o más personas" : `${reservationGuests} personas`}.
                  </p>
                  <button className={styles.secondaryButton} type="button" onClick={resetReservation}>
                    Hacer otra solicitud
                  </button>
                </div>
              ) : (
                <form onSubmit={handleReservationSubmit} noValidate>
                  <fieldset className={styles.reservationFieldset}>
                    <legend>Elegí cuándo venir</legend>
                    <p className={styles.reservationLegendNote}>Horarios orientativos para mostrar el flujo.</p>
                    <div className={styles.reservationFields}>
                      <label className={styles.reservationInputGroup}>
                        <span>Fecha</span>
                        <input
                          name="reservation-date"
                          type="date"
                          value={reservationDate}
                          onChange={(event) => setReservationDate(event.target.value)}
                          required
                        />
                      </label>

                      <label className={styles.reservationInputGroup}>
                        <span>Horario preferido</span>
                        <select
                          name="reservation-time"
                          value={reservationTime}
                          onChange={(event) => setReservationTime(event.target.value)}
                          required
                        >
                          <option value="" disabled>Elegí un horario</option>
                          <option value="19:00">19:00 hs</option>
                          <option value="20:30">20:30 hs</option>
                          <option value="22:00">22:00 hs</option>
                        </select>
                      </label>

                      <label className={styles.reservationInputGroup}>
                        <span>Personas</span>
                        <select
                          name="reservation-guests"
                          value={reservationGuests}
                          onChange={(event) => setReservationGuests(event.target.value)}
                        >
                          <option value="2">2 personas</option>
                          <option value="3">3 personas</option>
                          <option value="4">4 personas</option>
                          <option value="5">5 o más personas</option>
                        </select>
                      </label>
                    </div>
                  </fieldset>

                  <fieldset className={styles.reservationFieldset}>
                    <legend>¿A nombre de quién?</legend>
                    <div className={styles.reservationPersonalFields}>
                      <label className={styles.reservationInputGroup}>
                        <span>Nombre</span>
                        <input
                          name="reservation-name"
                          type="text"
                          autoComplete="name"
                          value={reservationName}
                          onChange={(event) => setReservationName(event.target.value)}
                          placeholder="Nombre y apellido"
                          required
                        />
                      </label>

                      <label className={styles.reservationInputGroup}>
                        <span>Email o Instagram</span>
                        <input
                          name="reservation-contact"
                          type="text"
                          autoComplete="email"
                          value={reservationContact}
                          onChange={(event) => setReservationContact(event.target.value)}
                          placeholder="nombre@correo.com o @usuario"
                          required
                        />
                      </label>
                    </div>
                  </fieldset>

                  {reservationError && <p className={styles.reservationError} role="alert">{reservationError}</p>}

                  <div className={styles.reservationFooter}>
                    <p>Esta demostración no confirma disponibilidad ni envía datos reales.</p>
                    <button className={styles.submitButton} type="submit" disabled={reservationStatus === "loading"}>
                      {reservationStatus === "loading" ? <span className={styles.loadingLabel}>Guardando solicitud</span> : "Solicitar mesa"}
                      <span aria-hidden="true">↗</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            <aside className={styles.reservationNote}>
              <span className={styles.reservationNoteLabel}>Así funcionaría</span>
              <h3>Una solicitud clara para cada visita.</h3>
              <div className={styles.reservationSteps}>
                <div className={styles.reservationStep}>
                  <span>1</span>
                  <p>Elegís fecha, horario y cantidad de personas.</p>
                </div>
                <div className={styles.reservationStep}>
                  <span>2</span>
                  <p>Dejás un nombre y un canal de respuesta.</p>
                </div>
                <div className={styles.reservationStep}>
                  <span>3</span>
                  <p>El equipo confirma la mesa por ese canal.</p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className={styles.identitySection} id="identidad" aria-labelledby="identity-title">
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>La idea</p>
            <h2 id="identity-title">Una puerta de entrada, sin mezclar ciudades.</h2>
            <p>
              La guía pone primero la sede de Boulevard Rondeau y deja visibles las señales que todavía necesitan confirmación.
            </p>
          </div>

          <div className={styles.identityBoard}>
            <article className={styles.homeBase}>
              <span className={styles.boardLabel}>Sede base del demo</span>
              <h3>Blvd. Rondeau 1802</h3>
              <p>Alberdi, Rosario, Santa Fe</p>
              <a
                className={styles.textLink}
                href="https://www.google.com/maps/search/?api=1&query=Blvd.%20Rondeau%201802%2C%20Rosario%2C%20Santa%20Fe"
                target="_blank"
                rel="noreferrer"
              >
                Abrir en Google Maps <span aria-hidden="true">↗</span>
              </a>
            </article>

            <div className={styles.signalList}>
              <div className={styles.signalRow}>
                <div>
                  <span className={styles.signalPlace}>Rosario</span>
                  <h3>Don Garcia · Rosario</h3>
                </div>
                <p>La cuenta comunica desayunos, meriendas y opciones dulces y saladas.</p>
                <a
                  className={styles.textLink}
                  href="https://www.instagram.com/dongarciarosario/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver canal <span aria-hidden="true">↗</span>
                </a>
              </div>

              <div className={styles.signalRow}>
                <div>
                  <span className={styles.signalPlace}>Rosario Zona Norte</span>
                  <h3>Don Garcia Río</h3>
                </div>
                <p>Otro canal menciona pedidos y horarios de 11 a 15 y de 20 a 23.</p>
                <a
                  className={styles.textLink}
                  href="https://www.instagram.com/dongarciario/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver canal <span aria-hidden="true">↗</span>
                </a>
              </div>

              <div className={styles.separateRow}>
                <div>
                  <span className={styles.signalPlace}>Otra ciudad</span>
                  <h3>Santa Fe / Riobamba 8180</h3>
                </div>
                <p>Esta referencia queda aparte hasta confirmar si tiene relación con la sede de Rosario.</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.answersSection} id="respuestas" aria-labelledby="answers-title">
          <div className={styles.answersHeader}>
            <h2 id="answers-title">Antes de salir, tres respuestas.</h2>
            <p>La propuesta ordena la información que una visita necesita, sin prometer horarios que todavía no están confirmados.</p>
          </div>

          <div className={styles.answerList}>
            <article className={styles.answerItem}>
              <span className={styles.answerNumber}>01</span>
              <div>
                <h3>Ubicar</h3>
                <p>La sede de referencia aparece con dirección completa, barrio y acceso directo al mapa.</p>
              </div>
            </article>
            <article className={styles.answerItem}>
              <span className={styles.answerNumber}>02</span>
              <div>
                <h3>Reconocer</h3>
                <p>Las cuentas de Rosario se muestran como señales distintas, para que cada propuesta conserve su contexto.</p>
              </div>
            </article>
            <article className={styles.answerItem}>
              <span className={styles.answerNumber}>03</span>
              <div>
                <h3>Consultar</h3>
                <p>Si el horario vigente no está claro, la persona puede hacer una pregunta concreta antes de moverse.</p>
              </div>
            </article>
          </div>

          <div className={styles.hoursNote}>
            <span className={styles.hoursMarker} aria-hidden="true" />
            <div>
              <strong>Horario vigente</strong>
              <p>Por confirmar para esta sede. La guía lo puede actualizar sin cambiar el resto de la página.</p>
            </div>
          </div>

          <figure className={styles.secondaryFigure}>
            <Image
              src="/images/ambiente-salon.jpg"
              alt=""
              width={2048}
              height={1152}
              loading="eager"
              sizes="(max-width: 767px) 100vw, 72vw"
            />
            <figcaption>Segunda imagen de ambiente para esta demo, no una foto de la sede.</figcaption>
          </figure>
        </section>

        <section className={styles.inquirySection} id="consulta" aria-labelledby="inquiry-title">
          <div className={styles.inquiryIntro}>
            <p className={styles.eyebrow}>Consulta rápida</p>
            <h2 id="inquiry-title">Elegí una pregunta y dejá tu contacto.</h2>
            <p>Un camino corto para resolver sede, horarios o propuesta antes de planear la visita.</p>
          </div>

          <div className={styles.formShell}>
            {status === "success" ? (
              <div className={styles.successState} role="status" aria-live="polite">
                <span className={styles.successMark} aria-hidden="true">✓</span>
                <h3>Consulta simulada enviada.</h3>
                <p>En una versión conectada, el equipo recibiría estos datos para responderte por el canal elegido.</p>
                <button className={styles.secondaryButton} type="button" onClick={resetForm}>
                  Hacer otra consulta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <fieldset className={styles.questionFieldset}>
                  <legend>¿Qué querés consultar?</legend>
                  <div className={styles.questionOptions}>
                    {questions.map((item) => (
                      <label className={styles.questionOption} key={item.value}>
                        <input
                          type="radio"
                          name="question"
                          value={item.value}
                          checked={question === item.value}
                          onChange={() => {
                            setQuestion(item.value);
                            setErrors((current) => ({ ...current, question: "" }));
                          }}
                        />
                        <span>
                          <strong>{item.label}</strong>
                          <small>{item.detail}</small>
                        </span>
                      </label>
                    ))}
                  </div>
                  {errors.question && <p className={styles.errorText}>{errors.question}</p>}
                </fieldset>

                <div className={styles.formGrid}>
                  <label className={styles.inputGroup}>
                    <span>Tu nombre</span>
                    <input
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      placeholder="Cómo te llamás"
                    />
                    {errors.name && <small id="name-error" className={styles.errorText}>{errors.name}</small>}
                  </label>

                  <label className={styles.inputGroup}>
                    <span>Email o Instagram</span>
                    <input
                      name="contact"
                      type="text"
                      autoComplete="email"
                      value={contact}
                      onChange={(event) => setContact(event.target.value)}
                      aria-invalid={Boolean(errors.contact)}
                      aria-describedby={errors.contact ? "contact-error" : undefined}
                      placeholder="nombre@correo.com o @usuario"
                    />
                    {errors.contact && <small id="contact-error" className={styles.errorText}>{errors.contact}</small>}
                  </label>
                </div>

                <label className={styles.inputGroup}>
                  <span>Mensaje <em>Opcional</em></span>
                  <textarea
                    name="message"
                    rows={3}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Contanos qué necesitás saber"
                  />
                </label>

                <div className={styles.formFooter}>
                  <p>Esta demostración no envía mensajes reales.</p>
                  <button className={styles.submitButton} type="submit" disabled={status === "loading"}>
                    {status === "loading" ? "Procesando" : "Enviar consulta"}
                    <span aria-hidden="true">↗</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div>
          <span className={styles.wordmark}>Don García</span>
          <p>Blvd. Rondeau 1802, Alberdi, Rosario.</p>
        </div>
        <div className={styles.footerRight}>
          <a href="https://www.instagram.com/dongarciarosario/" target="_blank" rel="noreferrer">
            Instagram Rosario <span aria-hidden="true">↗</span>
          </a>
          <p>Muestra de Nivaror. No es el sitio oficial del negocio.</p>
        </div>
      </footer>
    </div>
  );
}
