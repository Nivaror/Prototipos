"use client";

import { useState, type FormEvent } from "react";
import styles from "./page.module.css";

export default function StartForm() {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !goal) { setError("Completá tu nombre y elegí cómo querés entrenar."); return; }
    setError("");
    setSent(true);
  }

  if (sent) return <div className={styles.formSuccess} role="status"><span className={styles.successMark} aria-hidden="true">OK</span><h3>Consulta recibida</h3><p>En la versión final, el equipo te responde por el canal que prefiera.</p><button className={styles.textButton} onClick={() => setSent(false)}>Enviar otra consulta</button></div>;

  return <form className={styles.form} onSubmit={submit} noValidate>
    <label htmlFor="name">Tu nombre</label><input id="name" value={name} onChange={(event) => setName(event.target.value)} />
    <label htmlFor="goal">¿Qué querés hacer?</label><select id="goal" value={goal} onChange={(event) => setGoal(event.target.value)}><option value="">Elegí una opción</option><option value="musculacion">Empezar musculación</option><option value="funcional">Conocer funcional</option><option value="consulta">Consultar horarios</option></select>
    {error && <p className={styles.formError} role="alert">{error}</p>}
    <button className={styles.primaryButton} type="submit">Quiero arrancar</button>
  </form>;
}
