"use client";

import { FormEvent, useState } from "react";
import styles from "./page.module.css";

type Field = "name" | "email" | "date" | "people";
type Errors = Partial<Record<Field, string>>;

function validate(form: FormData) {
  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const date = String(form.get("date") ?? "");
  const people = String(form.get("people") ?? "");
  const errors: Errors = {};

  if (name.length < 2) errors.name = "Escribí tu nombre.";
  if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = "Revisá tu email.";
  if (!date) errors.date = "Elegí una fecha orientativa.";
  if (!people) errors.people = "Elegí una cantidad.";

  return errors;
}

export default function InterestForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 700);
  }

  if (status === "success") {
    return (
      <div className={styles.successState} role="status" aria-live="polite">
        <span className={styles.successMark}>Listo</span>
        <h3>La muestra recibió tu interés.</h3>
        <p>No se envió ningún dato. Así se vería la confirmación después de completar el pedido.</p>
        <a className={styles.inlineLink} href="#inicio">Volver al inicio</a>
      </div>
    );
  }

  return (
    <form className={styles.interestForm} onSubmit={handleSubmit} noValidate>
      <div className={styles.formGrid}>
        <div className={styles.field}>
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : "name-hint"}
          />
          <span className={styles.fieldHint} id="name-hint">Para saber a quién responder.</span>
          {errors.name && <span className={styles.error} id="name-error">{errors.name}</span>}
        </div>

        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : "email-hint"}
          />
          <span className={styles.fieldHint} id="email-hint">Un canal alternativo a Instagram.</span>
          {errors.email && <span className={styles.error} id="email-error">{errors.email}</span>}
        </div>

        <div className={styles.field}>
          <label htmlFor="date">Fecha orientativa</label>
          <input
            id="date"
            name="date"
            type="date"
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? "date-error" : "date-hint"}
          />
          <span className={styles.fieldHint} id="date-hint">No confirma disponibilidad.</span>
          {errors.date && <span className={styles.error} id="date-error">{errors.date}</span>}
        </div>

        <div className={styles.field}>
          <label htmlFor="people">Personas</label>
          <select
            id="people"
            name="people"
            defaultValue=""
            aria-invalid={Boolean(errors.people)}
            aria-describedby={errors.people ? "people-error" : "people-hint"}
          >
            <option value="" disabled>Elegí una opción</option>
            <option value="1">1 persona</option>
            <option value="2">2 personas</option>
            <option value="3">3 personas</option>
            <option value="4">4 personas</option>
            <option value="5">5 personas</option>
            <option value="6">6 personas</option>
          </select>
          <span className={styles.fieldHint} id="people-hint">Una referencia para tu consulta.</span>
          {errors.people && <span className={styles.error} id="people-error">{errors.people}</span>}
        </div>
      </div>

      <div className={styles.formFooter}>
        <p>Esta es una muestra local. No hay backend ni se envía una reserva real.</p>
        <button className={styles.primaryButton} type="submit" disabled={status === "loading"}>
          {status === "loading" ? <><span className={styles.loadingBar} /> Procesando</> : "Enviar consulta"}
        </button>
      </div>
    </form>
  );
}
