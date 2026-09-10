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

const availableSlots = [
  { id: "lunes-0800", dayId: "lunes", day: "Lunes", time: "08:00 a 09:30", available: true },
  { id: "lunes-1800", dayId: "lunes", day: "Lunes", time: "18:00 a 19:30", available: false },
  { id: "martes-1600", dayId: "martes", day: "Martes", time: "16:00 a 17:30", available: true },
  { id: "martes-1800", dayId: "martes", day: "Martes", time: "18:00 a 19:30", available: true },
  { id: "jueves-0900", dayId: "jueves", day: "Jueves", time: "09:00 a 10:30", available: true },
  { id: "viernes-1700", dayId: "viernes", day: "Viernes", time: "17:00 a 18:30", available: false },
] as const;

type FormData = {
  name: string;
  plan: string;
  day: string;
  time: string;
  contact: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialForm: FormData = {
  name: "",
  plan: "",
  day: "",
  time: "",
  contact: "",
};

export default function Home() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const timesForDay = availableSlots.filter((slot) => slot.dayId === form.day);
  const selectedSlot = availableSlots.find((slot) => slot.id === form.time);
  const reservationSummary = selectedSlot
    ? `Todos los ${selectedSlot.day.toLowerCase()}, de ${selectedSlot.time}, durante 1 mes.`
    : "Elegí un día y un horario disponible.";

  function updateField(field: keyof FormData, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
      ...(field === "day" ? { time: "" } : {}),
    }));
    setErrors((current) => ({
      ...current,
      [field]: undefined,
      ...(field === "day" ? { time: undefined } : {}),
    }));
  }

  function validate() {
    const nextErrors: FormErrors = {};
    if (!form.name.trim()) nextErrors.name = "Escribí tu nombre.";
    if (!form.plan) nextErrors.plan = "Elegí un plan.";
    if (!form.day) nextErrors.day = "Elegí un día.";
    if (!form.time || !selectedSlot || selectedSlot.dayId !== form.day || !selectedSlot.available) nextErrors.time = "Elegí un horario disponible.";
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
          <a className={styles.navCta} href="#reserva">Reservar plan mensual <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <main>
        <section className={styles.hero} id="inicio" aria-labelledby="hero-title">
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Centro de pilates en Alberdi</p>
            <h1 id="hero-title">Un primer paso claro para volver a moverte.</h1>
            <p className={styles.heroIntro}>Conocé el estudio, revisá los horarios y contá qué estás buscando.</p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#reserva">Reservar plan mensual <span aria-hidden="true">↗</span></a>
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
            <span className={styles.visualCaption}>La disponibilidad se consulta en el selector de reserva.</span>
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
              <p>Elegí un plan mensual y encontrá un horario fijo que se acomode a tu semana.</p>
              <a href="#reserva">Elegir un horario <span aria-hidden="true">↗</span></a>
            </article>
            <article className={`${styles.fitCard} ${styles.fitCardAccent}`}>
              <span className={styles.cardIndex}>02</span>
              <h3>Ya practicás Pilates</h3>
              <p>Reservá el mismo día y horario todas las semanas durante un mes.</p>
              <a href="#reserva">Reservar tu lugar <span aria-hidden="true">↗</span></a>
            </article>
          </div>
        </section>

        <section className={styles.scheduleSection} id="horarios" aria-labelledby="hours-title">
          <div className={styles.scheduleHeading}>
            <div><p className={styles.kicker}>La semana a la vista</p><h2 id="hours-title">Encontrá tu momento.</h2></div>
            <p>Estos son los horarios publicados del estudio. El selector de reserva muestra los turnos con cupo.</p>
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

        <section className={styles.consultationSection} id="reserva" aria-labelledby="consult-title">
          <div className={styles.consultationIntro}>
            <p className={styles.kicker}>Reservá tu lugar</p>
            <h2 id="consult-title">Tu horario fijo, resuelto en un momento.</h2>
            <p>Elegí un plan mensual, un día y un horario disponible. Todas las semanas se repite esa misma clase.</p>
            <div className={styles.firstStepNotes}>
              <div><span>01</span><strong>Elegí</strong><p>tu plan mensual.</p></div>
              <div><span>02</span><strong>Buscá</strong><p>un día y horario libre.</p></div>
              <div><span>03</span><strong>Confirmá</strong><p>tu reserva recurrente.</p></div>
            </div>
          </div>

          <div className={styles.formShell}>
            {status === "success" ? (
              <div className={styles.successState} role="status" aria-live="polite">
                <span className={styles.successMark} aria-hidden="true">✓</span>
                <p className={styles.kicker}>Horario reservado</p>
                <h3>Listo, tu semana ya tiene un espacio.</h3>
                <p>Te anotaste al Plan mensual: {reservationSummary} Esta confirmación es parte de la demo. En una versión real, el estudio validaría el cupo y te enviaría el detalle.</p>
                <button className={styles.secondaryButton} type="button" onClick={resetForm}>Elegir otro horario</button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.formTopline}><span>Reserva online</span><span aria-hidden="true">1 mes</span></div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="name">Tu nombre</label>
                  <input id="name" name="name" type="text" autoComplete="name" value={form.name} onChange={(event) => updateField("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
                  {errors.name && <span className={styles.error} id="name-error">{errors.name}</span>}
                </div>

                <fieldset className={styles.planFieldset} aria-describedby={errors.plan ? "plan-error" : undefined}>
                  <legend className={styles.fieldLabel}>Elegí tu plan</legend>
                  <label className={`${styles.planChoice} ${form.plan ? styles.planChoiceSelected : ""}`}>
                    <input type="radio" name="plan" value="mensual" checked={form.plan === "mensual"} onChange={(event) => updateField("plan", event.target.value)} />
                    <span className={styles.planChoiceCopy}><strong>Plan mensual</strong><small>4 clases, 1 horario fijo por semana</small></span>
                    <span className={styles.planChoiceMeta}>1 mes</span>
                  </label>
                  {errors.plan && <span className={styles.error} id="plan-error">{errors.plan}</span>}
                </fieldset>

                <div className={styles.formRow}>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="day">Día que te sirve</label>
                    <select id="day" name="day" value={form.day} onChange={(event) => updateField("day", event.target.value)} aria-invalid={Boolean(errors.day)} aria-describedby={errors.day ? "day-error" : undefined}>
                      <option value="">Elegí un día</option>
                      {Array.from(new Set(availableSlots.filter((slot) => slot.available).map((slot) => `${slot.dayId}|${slot.day}`))).map((day) => {
                        const [dayId, dayName] = day.split("|");
                        return <option value={dayId} key={dayId}>{dayName}</option>;
                      })}
                    </select>
                    {errors.day && <span className={styles.error} id="day-error">{errors.day}</span>}
                  </div>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="time">Horario disponible</label>
                    <select id="time" name="time" value={form.time} onChange={(event) => updateField("time", event.target.value)} disabled={!form.day} aria-invalid={Boolean(errors.time)} aria-describedby={errors.time ? "time-error" : undefined}>
                      <option value="">{form.day ? "Elegí un horario" : "Elegí primero un día"}</option>
                      {timesForDay.map((slot) => <option value={slot.id} key={slot.id} disabled={!slot.available}>{slot.time} {slot.available ? "· Disponible" : "· Sin cupos"}</option>)}
                    </select>
                    {errors.time && <span className={styles.error} id="time-error">{errors.time}</span>}
                  </div>
                </div>

                <div className={styles.reservationPreview} aria-live="polite">
                  <span>Tu reserva</span>
                  <strong>{reservationSummary}</strong>
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="contact">¿Dónde te respondemos?</label>
                  <input id="contact" name="contact" type="text" autoComplete="email" placeholder="Tu email o usuario de Instagram" value={form.contact} onChange={(event) => updateField("contact", event.target.value)} aria-invalid={Boolean(errors.contact)} aria-describedby={errors.contact ? "contact-error" : "contact-hint"} />
                  {errors.contact ? <span className={styles.error} id="contact-error">{errors.contact}</span> : <span className={styles.helper} id="contact-hint">No hace falta compartir tu teléfono.</span>}
                </div>

                <button className={styles.submitButton} type="submit" disabled={status === "submitting"}>
                  {status === "submitting" ? <span className={styles.loadingLabel} aria-live="polite"><span className={styles.loadingBar} aria-hidden="true" />Guardando reserva</span> : <>Reservar este horario <span aria-hidden="true">↗</span></>}
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
