"use client";

import { FormEvent, useState } from "react";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import styles from "./page.module.css";

type Status = "idle" | "loading" | "success";
type Errors = { name?: string; message?: string };

export function ContactForm() {
  const [name, setName] = useState("");
  const [day, setDay] = useState("Cualquiera");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  function validate(): Errors {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Contanos tu nombre.";
    if (message.trim().length > 0 && message.trim().length < 3) next.message = "Un poco más de detalle, por favor.";
    return next;
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("loading");
    // Mock submission: no backend wired up in this demo.
    setTimeout(() => setStatus("success"), 700);
  }

  if (status === "success") {
    return (
      <div className={styles.formSuccess}>
        <CheckCircle size={40} weight="fill" className={styles.formSuccessIcon} />
        <p className={styles.formSuccessTitle}>Listo, {name.split(" ")[0]}.</p>
        <p className={styles.formSuccessText}>
          En el sitio real esto le llegaría al gimnasio. Te responderían un día hábil, entre lunes y viernes.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className={styles.formGroup}>
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Como te llamás"
          autoComplete="name"
        />
        {errors.name && <span className={styles.fieldError}>{errors.name}</span>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="day">Día que preferís pasar</label>
        <select id="day" value={day} onChange={(e) => setDay(e.target.value)}>
          <option>Cualquiera</option>
          <option>Lunes</option>
          <option>Martes</option>
          <option>Miércoles</option>
          <option>Jueves</option>
          <option>Viernes</option>
        </select>
        <span className={styles.formHelp}>Recordá: cerrado sábado y domingo.</span>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="message">Contanos qué buscás (opcional)</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ej: quiero probar una clase, o pregunto por planes"
        />
        {errors.message && <span className={styles.fieldError}>{errors.message}</span>}
      </div>
      <button type="submit" className={`${styles.btn} ${styles.btnPrimary} ${styles.formSubmit}`} disabled={status === "loading"}>
        {status === "loading" ? "Enviando..." : "Consultá tu plan"}
      </button>
    </form>
  );
}
