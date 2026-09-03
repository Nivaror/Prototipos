"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import styles from "./page.module.css";

const goals = ["Empezar de cero", "Ganar fuerza", "Mejorar mi estado físico"];

type FormValues = {
  goal: string;
  name: string;
  channel: "WhatsApp" | "Email";
  contact: string;
};

type FormErrors = Partial<Record<"goal" | "name" | "contact", string>>;

const initialValues: FormValues = {
  goal: "",
  name: "",
  channel: "WhatsApp",
  contact: "",
};

export default function Home() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  function validate() {
    const nextErrors: FormErrors = {};

    if (!values.goal) nextErrors.goal = "Elegí un objetivo para empezar.";
    if (values.name.trim().length < 2) nextErrors.name = "Escribí tu nombre.";
    if (values.contact.trim().length < 5) {
      nextErrors.contact = "Ingresá un WhatsApp o email válido.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    window.setTimeout(() => setStatus("success"), 650);
  }

  function updateValue(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    if (field in errors) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  }

  function resetForm() {
    setValues(initialValues);
    setErrors({});
    setStatus("idle");
  }

  return (
    <div className={styles.page}>
      <header className={styles.nav}>
        <a className={styles.brand} href="#inicio" aria-label="TRIBU FIT, volver al inicio">
          <span>TRIBU</span>
          <span className={styles.brandAccent}>FIT</span>
        </a>
        <nav className={styles.navLinks} aria-label="Navegación principal">
          <a href="#horarios">Horarios</a>
          <a href="https://www.instagram.com/tribufit.gym/" target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a className={styles.navCta} href="#empezar">
            Quiero empezar
          </a>
        </nav>
      </header>

      <main>
        <section className={styles.hero} id="inicio" aria-labelledby="hero-title">
          <div className={styles.heroPhoto} aria-hidden="true">
            <Image
              src="/images/hero-gym-floor.jpg"
              alt=""
              fill
              priority
              sizes="(max-width: 767px) 100vw, 40vw"
            />
          </div>
          <div className={styles.heroShade} aria-hidden="true" />
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>Gimnasio en Rosario</p>
            <h1 id="hero-title">Tu próximo entrenamiento empieza acá.</h1>
            <p className={styles.heroIntro}>
              Conocé TRIBU FIT, revisá los horarios y contanos qué querés trabajar.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#empezar">
                Quiero empezar
                <span aria-hidden="true">↘</span>
              </a>
              <a className={styles.secondaryButton} href="#horarios">
                Ver horarios
              </a>
            </div>
          </div>
          <div className={styles.heroMarker} aria-hidden="true">
            <span>TRIBU FIT</span>
            <span className={styles.markerLine} />
          </div>
        </section>

        <section className={styles.proofBand} aria-label="Información destacada">
          <div>
            <strong>5★</strong>
            <span>en Google</span>
          </div>
          <div>
            <strong>11</strong>
            <span>reseñas</span>
          </div>
          <div>
            <strong>Lun a vie</strong>
            <span>08:00 a 21:00</span>
          </div>
          <div>
            <strong>Av. Alberdi 727</strong>
            <span>Piso 1, Rosario</span>
          </div>
        </section>

        <section className={styles.startSection} id="empezar" aria-labelledby="start-title">
          <div className={styles.startIntro}>
            <p className={styles.sectionKicker}>Empezar es simple</p>
            <h2 id="start-title">Elegí tu objetivo.</h2>
            <p>
              Dejanos tu objetivo, nombre y canal de contacto. La confirmación que ves acá es
              simulada.
            </p>
            <div className={styles.startImage}>
              <Image
                src="/images/action-workout-silhouette.jpg"
                alt="Persona entrenando con una barra en un gimnasio"
                fill
                sizes="(max-width: 767px) 100vw, 37vw"
              />
            </div>
          </div>

          <div className={styles.formWrap}>
            {status === "success" ? (
              <div className={styles.successState} role="status" aria-live="polite">
                <span className={styles.successMark} aria-hidden="true">
                  ✓
                </span>
                <p className={styles.formKicker}>Consulta preparada</p>
                <h3>Listo, {values.name.trim()}.</h3>
                <p>
                  Esta es una confirmación simulada. No se envió ningún mensaje ni se activó una
                  membresía.
                </p>
                <button className={styles.textButton} type="button" onClick={resetForm}>
                  Nueva consulta <span aria-hidden="true">↗</span>
                </button>
              </div>
            ) : (
              <form className={styles.intakeForm} onSubmit={handleSubmit} noValidate>
                <p className={styles.formKicker}>Tu punto de partida</p>
                <h3>Contanos qué buscás.</h3>
                <p className={styles.formIntro}>
                  Así el equipo puede saber qué querés trabajar antes de contactarte.
                </p>

                <fieldset className={styles.fieldset} aria-describedby={errors.goal ? "goal-error" : undefined}>
                  <legend>¿Qué querés trabajar?</legend>
                  <div className={styles.goalOptions}>
                    {goals.map((goal) => (
                      <label className={styles.goalOption} key={goal}>
                        <input
                          type="radio"
                          name="goal"
                          value={goal}
                          checked={values.goal === goal}
                          onChange={(event) => updateValue("goal", event.target.value)}
                        />
                        <span>{goal}</span>
                      </label>
                    ))}
                  </div>
                  {errors.goal && (
                    <p className={styles.error} id="goal-error">
                      {errors.goal}
                    </p>
                  )}
                </fieldset>

                <div className={styles.inputGroup}>
                  <label htmlFor="name">Nombre</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={(event) => updateValue("name", event.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : "name-help"}
                    placeholder="Tu nombre"
                  />
                  <span id="name-help" className={styles.helper}>
                    Solo para identificar tu consulta.
                  </span>
                  {errors.name && (
                    <p className={styles.error} id="name-error">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className={styles.contactRow}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="channel">Canal</label>
                    <select
                      id="channel"
                      name="channel"
                      value={values.channel}
                      onChange={(event) => updateValue("channel", event.target.value)}
                    >
                      <option>WhatsApp</option>
                      <option>Email</option>
                    </select>
                  </div>
                  <div className={styles.inputGroup}>
                    <label htmlFor="contact">Tu contacto</label>
                    <input
                      id="contact"
                      name="contact"
                      type="text"
                      value={values.contact}
                      onChange={(event) => updateValue("contact", event.target.value)}
                      aria-invalid={Boolean(errors.contact)}
                      aria-describedby={errors.contact ? "contact-error" : "contact-help"}
                      placeholder={values.channel === "Email" ? "tu@email.com" : "Tu número"}
                    />
                    <span id="contact-help" className={styles.helper}>
                      Sin datos de pago.
                    </span>
                    {errors.contact && (
                      <p className={styles.error} id="contact-error">
                        {errors.contact}
                      </p>
                    )}
                  </div>
                </div>

                <button className={styles.formButton} type="submit" disabled={status === "submitting"}>
                  {status === "submitting" ? "Preparando consulta" : "Quiero empezar"}
                  <span aria-hidden="true">↘</span>
                </button>
                <p className={styles.formNote}>Demo sin cobro ni alta real.</p>
              </form>
            )}
          </div>
        </section>

        <section className={styles.hoursSection} id="horarios" aria-labelledby="hours-title">
          <div className={styles.hoursHeading}>
            <p className={styles.sectionKicker}>Antes de venir</p>
            <h2 id="hours-title">Horarios para organizar tu visita.</h2>
            <p>Encontrá el momento que te quede mejor para conocer TRIBU FIT.</p>
          </div>
          <div className={styles.hoursContent}>
            <dl className={styles.schedule}>
              <div>
                <dt>Lunes a viernes</dt>
                <dd>08:00 a 21:00</dd>
              </div>
              <div>
                <dt>Sábado</dt>
                <dd>09:00 a 13:00</dd>
              </div>
              <div>
                <dt>Domingo</dt>
                <dd>Cerrado</dd>
              </div>
            </dl>
            <div className={styles.locationBlock}>
              <span className={styles.locationLabel}>Ubicación</span>
              <strong>Av. Alberdi 727</strong>
              <span>Piso 1, S2000 Rosario, Santa Fe</span>
            </div>
          </div>
        </section>

        <section className={styles.spaceSection} aria-labelledby="space-title">
          <div className={styles.spaceImage}>
            <Image
              src="/images/detail-weights-rack.jpg"
              alt="Mancuernas en un rack de gimnasio"
              fill
              sizes="(max-width: 767px) 100vw, 58vw"
            />
          </div>
          <div className={styles.spaceCopy}>
            <p className={styles.sectionKicker}>Más de TRIBU FIT</p>
            <h2 id="space-title">Conocé el espacio antes de venir.</h2>
            <p>Para ver más del día a día, encontrá a TRIBU FIT en Instagram.</p>
            <a
              className={styles.textButton}
              href="https://www.instagram.com/tribufit.gym/"
              target="_blank"
              rel="noreferrer"
            >
              Ver Instagram <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div>
          <a className={styles.brand} href="#inicio" aria-label="TRIBU FIT, volver al inicio">
            <span>TRIBU</span>
            <span className={styles.brandAccent}>FIT</span>
          </a>
          <p>Av. Alberdi 727, Piso 1. Rosario, Santa Fe.</p>
        </div>
        <div className={styles.footerRight}>
          <a href="https://www.instagram.com/tribufit.gym/" target="_blank" rel="noreferrer">
            Instagram @tribufit.gym ↗
          </a>
          <p>Muestra de Nivaror. No es el sitio oficial de TRIBU FIT GYM.</p>
          <p>No se envían mensajes ni se activa ninguna membresía.</p>
        </div>
      </footer>
    </div>
  );
}
