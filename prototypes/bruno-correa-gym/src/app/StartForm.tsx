"use client";

import { useState, type FormEvent } from "react";
import styles from "./page.module.css";

export default function StartForm() {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [contact, setContact] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !goal || !contact.trim()) { setError("Completá tu nombre, objetivo y un canal de contacto."); return; }
    setError("");
    setSent(true);
  }

  if (sent) return <div className={styles.formSuccess} role="status"><span className={styles.successMark} aria-hidden="true">OK</span><h3>Interés registrado</h3><p>En la versión final, el equipo te responde por el canal que indicaste.</p><button className={styles.textButton} onClick={() => setSent(false)}>Enviar otra consulta</button></div>;

  return <form className={styles.form} onSubmit={submit} noValidate>
    <label htmlFor="name">Tu nombre</label><input id="name" value={name} onChange={(event) => setName(event.target.value)} />
    <label htmlFor="goal">¿Qué querés hacer?</label><select id="goal" value={goal} onChange={(event) => setGoal(event.target.value)}><option value="">Elegí una opción</option><option value="musculacion">Empezar musculación</option><option value="funcional">Conocer funcional</option><option value="consulta">Consultar horarios</option></select>
    <label htmlFor="contact">WhatsApp o email</label><input id="contact" value={contact} onChange={(event) => setContact(event.target.value)} placeholder="Cómo te contactamos" autoComplete="email" />
    {error && <p className={styles.formError} role="alert">{error}</p>}
    <button className={styles.primaryButton} type="submit">Quiero hacerme socio</button>
  </form>;
}
