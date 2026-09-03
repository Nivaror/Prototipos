"use client";

import { FormEvent, useState } from "react";
import styles from "./page.module.css";

type FormValues = {
  interest: string;
  moment: string;
  name: string;
  contact: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  interest: "",
  moment: "",
  name: "",
  contact: "",
};

const interests = [
  { value: "empezar", label: "Estoy empezando" },
  { value: "retomar", label: "Quiero retomar" },
  { value: "regularidad", label: "Busco regularidad" },
];

const moments = ["Mañana", "Mediodía", "Tarde"];

function InquiryForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function updateField(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitted(false);
  }

  function validate() {
    const nextErrors: FormErrors = {};

    if (!values.interest) nextErrors.interest = "Elegí una opción para continuar.";
    if (!values.moment) nextErrors.moment = "Elegí un momento del día.";
    if (!values.name.trim()) nextErrors.name = "Escribí tu nombre.";
    if (!values.contact.trim()) nextErrors.contact = "Dejanos un canal de contacto.";

    return nextErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className={styles.confirmation} aria-live="polite">
        <span className={styles.confirmationMark} aria-hidden="true">
          ✓
        </span>
        <div>
          <p className={styles.confirmationKicker}>Consulta lista</p>
          <h3>Gracias, {values.name.trim()}.</h3>
          <p>
            Esta demostración confirma la interacción en pantalla. No se envió ningún
            mensaje.
          </p>
        </div>
        <button
          className={styles.textButton}
          type="button"
          onClick={() => {
            setValues(initialValues);
            setSubmitted(false);
          }}
        >
          Hacer otra consulta
        </button>
      </div>
    );
  }

  return (
    <form className={styles.inquiryForm} onSubmit={handleSubmit} noValidate>
      <fieldset className={styles.fieldset}>
        <legend>¿Desde dónde te gustaría empezar?</legend>
        <div className={styles.choiceGrid}>
          {interests.map((item) => (
            <label className={styles.choice} key={item.value}>
              <input
                type="radio"
                name="interest"
                value={item.value}
                checked={values.interest === item.value}
                onChange={(event) => updateField("interest", event.target.value)}
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
        {errors.interest && <p className={styles.error}>{errors.interest}</p>}
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend>¿Qué momento te acomoda?</legend>
        <div className={styles.momentGrid}>
          {moments.map((moment) => (
            <label className={styles.choice} key={moment}>
              <input
                type="radio"
                name="moment"
                value={moment}
                checked={values.moment === moment}
                onChange={(event) => updateField("moment", event.target.value)}
              />
              <span>{moment}</span>
            </label>
          ))}
        </div>
        {errors.moment && <p className={styles.error}>{errors.moment}</p>}
      </fieldset>

      <div className={styles.formFields}>
        <div className={styles.fieldGroup}>
          <label htmlFor="name">Tu nombre</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            placeholder="Cómo te llamás"
          />
          {errors.name && (
            <p className={styles.error} id="name-error">
              {errors.name}
            </p>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="contact">Email o WhatsApp</label>
          <input
            id="contact"
            name="contact"
            type="text"
            autoComplete="email"
            value={values.contact}
            onChange={(event) => updateField("contact", event.target.value)}
            aria-invalid={Boolean(errors.contact)}
            aria-describedby={errors.contact ? "contact-error" : undefined}
            placeholder="Tu canal de contacto"
          />
          {errors.contact && (
            <p className={styles.error} id="contact-error">
              {errors.contact}
            </p>
          )}
        </div>
      </div>

      <div className={styles.formFooter}>
        <p>Sin compromiso. Solo una primera orientación.</p>
        <button className={styles.submitButton} type="submit">
          Enviar consulta <span aria-hidden="true">↗</span>
        </button>
      </div>
    </form>
  );
}

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.demoNotice} role="note">
        <span className={styles.noticeMark} aria-hidden="true">
          N
        </span>
        <p>
          Concepto de muestra de Nivaror.
          <strong>No es el sitio oficial de La Casa.</strong>
        </p>
      </div>

      <header className={styles.siteHeader}>
        <a className={styles.wordmark} href="#inicio" aria-label="La Casa, inicio">
          <span>La</span> Casa
        </a>
        <nav className={styles.nav} aria-label="Navegación principal">
          <a href="#clases">La propuesta</a>
          <a href="#identidad">Identidad</a>
          <a className={styles.navCta} href="#consulta">
            Quiero consultar
          </a>
        </nav>
      </header>

      <main>
        <section className={styles.hero} id="inicio" aria-labelledby="hero-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Centro de Pilates</p>
            <h1 id="hero-title">
              Volver al cuerpo,
              <em> con presencia.</em>
            </h1>
            <p className={styles.heroLead}>
              Una identidad serena para descubrir una clase y dar el primer paso.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#consulta">
                Quiero consultar <span aria-hidden="true">↗</span>
              </a>
              <a className={styles.secondaryButton} href="#clases">
                Ver cómo empezar
              </a>
            </div>
          </div>

          <div className={styles.heroVisual} aria-hidden="true">
            <div className={styles.visualOrb} />
            <div className={`${styles.visualRing} ${styles.visualRingOne}`} />
            <div className={`${styles.visualRing} ${styles.visualRingTwo}`} />
            <div className={`${styles.visualLine} ${styles.visualLineOne}`} />
            <div className={`${styles.visualLine} ${styles.visualLineTwo}`} />
            <div className={styles.visualBlock} />
          </div>
        </section>

        <section className={styles.statement} aria-label="Idea principal">
          <p>La práctica puede comenzar con una pregunta simple:</p>
          <h2>¿Qué necesitás encontrar hoy?</h2>
        </section>

        <section className={styles.inquirySection} id="consulta" aria-labelledby="inquiry-title">
          <div className={styles.sectionIntro}>
            <p className={styles.sectionNote}>Una consulta clara</p>
            <h2 id="inquiry-title">Empezá por lo que querés encontrar.</h2>
            <p>
              No hace falta conocer el nombre de una clase. Contanos qué buscás y cuándo
              te gustaría acercarte.
            </p>
          </div>

          <div className={styles.inquiryLayout}>
            <aside className={styles.inquiryAside}>
              <p className={styles.asideLabel}>Tu punto de partida</p>
              <p className={styles.asideQuote}>
                Una buena consulta deja lugar para que la respuesta también sea personal.
              </p>
              <div className={styles.asideRule} />
              <p className={styles.asideDetail}>
                La propuesta está pensada para que pedir información sea simple, amable y
                concreto.
              </p>
            </aside>
            <InquiryForm />
          </div>
        </section>

        <section className={styles.classSection} id="clases" aria-labelledby="classes-title">
          <div className={styles.classIntro}>
            <h2 id="classes-title">Tres formas de contar qué buscás.</h2>
            <p>
              Elegí la frase que más se parezca a tu momento. El resto se conversa.
            </p>
          </div>

          <div className={styles.classGrid}>
            <article className={`${styles.classCard} ${styles.classCardPrimary}`}>
              <p>Movilidad</p>
              <h3>Sentir más espacio</h3>
              <span>Para empezar desde cómo querés moverte.</span>
            </article>
            <article className={`${styles.classCard} ${styles.classCardQuiet}`}>
              <p>Control</p>
              <h3>Volver a conectar</h3>
              <span>Para recuperar atención en cada gesto.</span>
            </article>
            <article className={`${styles.classCard} ${styles.classCardLine}`}>
              <p>Fuerza</p>
              <h3>Construir sostén</h3>
              <span>Para explorar una práctica con continuidad.</span>
            </article>
          </div>
        </section>

        <section className={styles.identitySection} id="identidad" aria-labelledby="identity-title">
          <div className={styles.identityMark} aria-label="La Casa Pilates">
            <span>La</span>
            <strong>Casa</strong>
            <small>Pilates</small>
          </div>
          <div className={styles.identityCopy}>
            <h2 id="identity-title">Un lugar para volver a vos.</h2>
            <p>
              Una dirección visual cálida y precisa, con espacio para que la experiencia del
              estudio tome la palabra.
            </p>
            <dl className={styles.identityFacts}>
              <div>
                <dt>Disciplina</dt>
                <dd>Centro de Pilates</dd>
              </div>
              <div>
                <dt>Zona</dt>
                <dd>Fisherton, Rosario</dd>
              </div>
              <div>
                <dt>Atención informada</dt>
                <dd>Lunes a viernes, 7 a 13 h y 15 a 19 h</dd>
              </div>
            </dl>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div>
          <a className={styles.footerWordmark} href="#inicio">
            <span>La</span> Casa
          </a>
          <p>Centro de Pilates en Rosario.</p>
        </div>
        <div className={styles.footerLinks}>
          <a href="#clases">La propuesta</a>
          <a href="#consulta">Quiero consultar</a>
        </div>
        <p className={styles.footerDisclaimer}>
          Concepto de muestra de Nivaror. No es el sitio oficial.
        </p>
      </footer>
    </div>
  );
}
