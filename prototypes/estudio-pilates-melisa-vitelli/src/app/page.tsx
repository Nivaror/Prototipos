"use client";

import { FormEvent, useState } from "react";
import styles from "./page.module.css";

const schedule = [
  { day: "Lun", fullDay: "Lunes", time: "8:00 a 21:00", tone: "wide" },
  { day: "Mar", fullDay: "Martes", time: "8:00 a 20:00", tone: "standard" },
  { day: "Mié", fullDay: "Miércoles", time: "8:00 a 21:00", tone: "wide" },
  { day: "Jue", fullDay: "Jueves", time: "8:00 a 20:00", tone: "standard" },
  { day: "Vie", fullDay: "Viernes", time: "8:00 a 20:00", tone: "standard" },
  { day: "Sáb", fullDay: "Sábado", time: "9:00 a 12:00", tone: "short" },
  { day: "Dom", fullDay: "Domingo", time: "Cerrado", tone: "closed" },
];

type FormData = {
  name: string;
  interest: string;
  day: string;
  moment: string;
  contact: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialForm: FormData = {
  name: "",
  interest: "",
  day: "",
  moment: "",
  contact: "",
};

export default function Home() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  function updateField(field: keyof FormData, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function validate() {
    const nextErrors: FormErrors = {};
    if (!form.name.trim()) nextErrors.name = "Escribí tu nombre.";
    if (!form.interest) nextErrors.interest = "Elegí una opción.";
    if (!form.day) nextErrors.day = "Elegí un día.";
    if (!form.moment) nextErrors.moment = "Elegí un momento.";
    if (!form.contact.trim()) nextErrors.contact = "Dejanos un email o tu usuario de Instagram.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    window.setTimeout(() => setStatus("success"), 650);
  }

  function resetForm() {
    setForm(initialForm);
    setErrors({});
    setStatus("idle");
  }

  return (
    <div className={styles.page}>
      <div className={styles.demoBar}>
        <span>Muestra conceptual de Nivaror</span>
        <span>No es el sitio oficial del estudio</span>
      </div>

      <header className={styles.nav}>
        <a className={styles.wordmark} href="#inicio" aria-label="Inicio">
          <span className={styles.wordmarkMark} aria-hidden="true">MV</span>
          <span>Melisa Vitelli<small>Estudio Pilates</small></span>
        </a>
        <nav className={styles.navLinks} aria-label="Navegación principal">
          <a href="#encaja">Cómo es</a>
          <a href="#horarios">Horarios</a>
          <a className={styles.navCta} href="#consulta">Consultar disponibilidad <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <main>
        <section className={styles.hero} id="inicio" aria-labelledby="hero-title">
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Centro de pilates en Alberdi</p>
            <h1 id="hero-title">Un primer paso claro para volver a moverte.</h1>
            <p className={styles.heroIntro}>Conocé el estudio, revisá los horarios y contá qué estás buscando.</p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#consulta">Consultar disponibilidad <span aria-hidden="true">↗</span></a>
              <a className={styles.textLink} href="#encaja">Ver cómo es <span aria-hidden="true">↓</span></a>
            </div>
          </div>

          <div className={styles.heroVisual} aria-label="Resumen de horarios">
            <div className={`${styles.orbit} ${styles.orbitOne}`} aria-hidden="true" />
            <div className={`${styles.orbit} ${styles.orbitTwo}`} aria-hidden="true" />
            <div className={`${styles.orbit} ${styles.orbitThree}`} aria-hidden="true" />
            <div className={styles.schedulePreview}>
              <div className={styles.previewHeader}><span>Horarios publicados</span><span className={styles.previewRule} aria-hidden="true" /></div>
              <div className={styles.previewRows}>
                <div><span>Lun / Mié</span><strong>8:00 a 21:00</strong></div>
                <div><span>Mar / Jue / Vie</span><strong>8:00 a 20:00</strong></div>
                <div><span>Sábado</span><strong>9:00 a 12:00</strong></div>
              </div>
              <div className={styles.previewFooter}><span>Domingo</span><span>Cerrado</span></div>
            </div>
            <span className={styles.visualCaption}>La disponibilidad de una clase se confirma por consulta.</span>
          </div>
        </section>

        <section className={styles.fitSection} id="encaja" aria-labelledby="fit-title">
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>Antes de reservar</p>
            <h2 id="fit-title">¿Te puede encajar?</h2>
            <p>Una página simple también puede ayudarte a llegar con una pregunta concreta.</p>
          </div>
          <div className={styles.fitGrid}>
            <article className={`${styles.fitCard} ${styles.fitCardLight}`}>
              <span className={styles.cardIndex}>01</span>
              <h3>Querés empezar</h3>
              <p>Contá que estás buscando y consultá qué horario podría acomodarse a tu semana.</p>
              <a href="#consulta">Contar lo que buscás <span aria-hidden="true">↗</span></a>
            </article>
            <article className={`${styles.fitCard} ${styles.fitCardAccent}`}>
              <span className={styles.cardIndex}>02</span>
              <h3>Ya practicás Pilates</h3>
              <p>Indicá tu experiencia y el momento del día que preferís para orientar la conversación.</p>
              <a href="#consulta">Consultar un horario <span aria-hidden="true">↗</span></a>
            </article>
          </div>
        </section>

        <section className={styles.scheduleSection} id="horarios" aria-labelledby="hours-title">
          <div className={styles.scheduleHeading}>
            <div><p className={styles.kicker}>La semana a la vista</p><h2 id="hours-title">Encontrá tu momento.</h2></div>
            <p>Estos son los horarios publicados del estudio. La clase y el lugar se confirman después de tu consulta.</p>
          </div>
          <div className={styles.scheduleList}>
            {schedule.map((item) => (
              <div className={`${styles.scheduleRow} ${styles[item.tone]}`} key={item.day}>
                <span className={styles.dayShort}>{item.day}</span>
                <span className={styles.dayFull}>{item.fullDay}</span>
                <span className={styles.rowLine} aria-hidden="true" />
                <strong>{item.time}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.consultationSection} id="consulta" aria-labelledby="consult-title">
          <div className={styles.consultationIntro}>
            <p className={styles.kicker}>Tu primer paso</p>
            <h2 id="consult-title">Una consulta breve alcanza para empezar.</h2>
            <p>Dejanos tus datos y una preferencia. La idea es que Melisa pueda orientarte sin hacerte buscar la información en varios mensajes.</p>
            <div className={styles.firstStepNotes}>
              <div><span>01</span><strong>Contá</strong><p>qué te gustaría consultar.</p></div>
              <div><span>02</span><strong>Elegí</strong><p>un día y un momento.</p></div>
              <div><span>03</span><strong>Confirmá</strong><p>tu canal de respuesta.</p></div>
            </div>
          </div>

          <div className={styles.formShell}>
            {status === "success" ? (
              <div className={styles.successState} role="status" aria-live="polite">
                <span className={styles.successMark} aria-hidden="true">✓</span>
                <p className={styles.kicker}>Consulta recibida</p>
                <h3>Listo, ya tenemos tu primer paso.</h3>
                <p>Esta confirmación es parte de la demo. En una versión real, Melisa recibiría la consulta para responderte.</p>
                <button className={styles.secondaryButton} type="button" onClick={resetForm}>Hacer otra consulta</button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.formTopline}><span>Consultá sin compromiso</span><span aria-hidden="true">05 min</span></div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="name">Tu nombre</label>
                  <input id="name" name="name" type="text" autoComplete="name" value={form.name} onChange={(event) => updateField("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
                  {errors.name && <span className={styles.error} id="name-error">{errors.name}</span>}
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="interest">¿Qué querés consultar?</label>
                  <select id="interest" name="interest" value={form.interest} onChange={(event) => updateField("interest", event.target.value)} aria-invalid={Boolean(errors.interest)} aria-describedby={errors.interest ? "interest-error" : undefined}>
                    <option value="">Elegí una opción</option>
                    <option value="empezar">Quiero empezar Pilates</option>
                    <option value="continuar">Ya practico Pilates</option>
                    <option value="orientacion">Necesito orientación</option>
                  </select>
                  {errors.interest && <span className={styles.error} id="interest-error">{errors.interest}</span>}
                </div>

                <div className={styles.formRow}>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="day">Día que te sirve</label>
                    <select id="day" name="day" value={form.day} onChange={(event) => updateField("day", event.target.value)} aria-invalid={Boolean(errors.day)} aria-describedby={errors.day ? "day-error" : undefined}>
                      <option value="">Elegí un día</option>
                      <option value="lunes">Lunes</option><option value="martes">Martes</option><option value="miercoles">Miércoles</option><option value="jueves">Jueves</option><option value="viernes">Viernes</option><option value="sabado">Sábado</option>
                    </select>
                    {errors.day && <span className={styles.error} id="day-error">{errors.day}</span>}
                  </div>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="moment">Momento preferido</label>
                    <select id="moment" name="moment" value={form.moment} onChange={(event) => updateField("moment", event.target.value)} aria-invalid={Boolean(errors.moment)} aria-describedby={errors.moment ? "moment-error" : undefined}>
                      <option value="">Elegí un momento</option><option value="manana">Mañana</option><option value="tarde">Tarde</option><option value="noche">Noche</option><option value="flexible">Me adapto</option>
                    </select>
                    {errors.moment && <span className={styles.error} id="moment-error">{errors.moment}</span>}
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="contact">¿Dónde te respondemos?</label>
                  <input id="contact" name="contact" type="text" autoComplete="email" placeholder="Tu email o usuario de Instagram" value={form.contact} onChange={(event) => updateField("contact", event.target.value)} aria-invalid={Boolean(errors.contact)} aria-describedby={errors.contact ? "contact-error" : "contact-hint"} />
                  {errors.contact ? <span className={styles.error} id="contact-error">{errors.contact}</span> : <span className={styles.helper} id="contact-hint">No hace falta compartir tu teléfono.</span>}
                </div>

                <button className={styles.submitButton} type="submit" disabled={status === "submitting"}>
                  {status === "submitting" ? <span className={styles.loadingLabel} aria-live="polite"><span className={styles.loadingBar} aria-hidden="true" />Enviando consulta</span> : <>Consultar disponibilidad <span aria-hidden="true">↗</span></>}
                </button>
              </form>
            )}
          </div>
        </section>

        <section className={styles.placeSection} aria-labelledby="place-title">
          <div><p className={styles.kicker}>Encontrá el estudio</p><h2 id="place-title">Guayaquil 689</h2><p>Alberdi, Rosario, Santa Fe</p></div>
          <div className={styles.placeMeta}><strong>5★</strong><span>9 reseñas en Google</span></div>
          <a className={styles.instagramLink} href="https://instagram.com/melisavitelli" target="_blank" rel="noreferrer">Instagram <span>@melisavitelli</span> <span aria-hidden="true">↗</span></a>
        </section>
      </main>

      <footer className={styles.footer}><span>Melisa Vitelli · Estudio Pilates</span><span>Una muestra de Nivaror para conversar una posible solución digital.</span></footer>
    </div>
  );
}
