"use client";
import { FormEvent, useState } from "react";
import styles from "./page.module.css";

const schedule = [
  { label: "Mañana", time: "08:00 a 12:00", note: "Para empezar el día con foco" },
  { label: "Tarde", time: "16:00 a 20:00", note: "Una pausa activa después del trabajo" },
];

export default function Home() {
  const [form, setForm] = useState({ name: "", preference: "", contact: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("loading"); window.setTimeout(() => setStatus("success"), 700);
  }
  return <div className={styles.page}>
    <header className={styles.nav}><a className={styles.wordmark} href="#inicio"><span>Q</span> QUALITY</a><nav aria-label="Navegación principal"><a href="#horarios">Horarios</a><a href="#solicitud">Disponibilidad</a><a href="https://www.instagram.com/quality.fitness" target="_blank" rel="noreferrer">Instagram ↗</a></nav></header>
    <main>
      <section className={styles.hero} id="inicio"><div className={styles.heroCopy}><p className={styles.eyebrow}>Pilates en Fisherton</p><h1>Tu práctica,<br /><em>a tu ritmo.</em></h1><p className={styles.heroText}>Encontrá una franja que te quede bien y pedí disponibilidad para tu próxima clase.</p><a className={styles.primaryButton} href="#solicitud">Ver disponibilidad <span>↓</span></a></div><div className={styles.heroVisual} aria-label="Ambiente de entrenamiento"><div className={styles.visualImage} /><div className={styles.stamp}>MOVIMIENTO<br /><strong>CONSCIENTE</strong></div><p>French 7809<br />Rosario, Santa Fe</p></div></section>
      <section className={styles.intro}><p className={styles.sectionNumber}>01 / EL ESPACIO</p><div><h2>Un lugar para volver<br />a tu centro.</h2><p>Una propuesta de Pilates pensada para encontrar una práctica que acompañe tus tiempos.</p></div><div className={styles.lineNote}><span>5★</span><small>15 reseñas en Google</small></div></section>
      <section className={styles.scheduleSection} id="horarios"><div className={styles.scheduleHeading}><p className={styles.sectionNumber}>02 / TU MOMENTO</p><h2>Elegí cuándo<br />te queda mejor.</h2></div><div className={styles.scheduleList}>{schedule.map((slot) => <div className={styles.scheduleRow} key={slot.label}><span className={styles.scheduleLabel}>{slot.label}</span><strong>{slot.time}</strong><span className={styles.scheduleNote}>{slot.note}</span></div>)}<p className={styles.scheduleFootnote}>Lunes a viernes · Consultá disponibilidad para tu horario.</p></div></section>
      <section className={styles.requestSection} id="solicitud"><div className={styles.requestIntro}><p className={styles.sectionNumber}>03 / PRÓXIMO PASO</p><h2>Probá una clase<br /><em>que te encuentre.</em></h2><p>Contanos qué franja preferís. Te respondemos para confirmar las opciones disponibles.</p></div><form className={styles.form} onSubmit={submit}>{status === "success" ? <div className={styles.success} role="status"><span>✓</span><div><h3>Recibimos tu consulta.</h3><p>Te contactaremos para compartirte las opciones disponibles.</p><button type="button" onClick={() => setStatus("idle")}>Hacer otra consulta</button></div></div> : <><label>Tu nombre<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label><label>¿Qué franja preferís?<select required value={form.preference} onChange={(e) => setForm({ ...form, preference: e.target.value })}><option value="">Elegí una opción</option><option>Mañana · 08:00 a 12:00</option><option>Tarde · 16:00 a 20:00</option><option>Me adapto a ambas</option></select></label><label>¿Cómo te contactamos?<input required type="text" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} /></label><button className={styles.submitButton} type="submit" disabled={status === "loading"}>{status === "loading" ? "Enviando consulta..." : "Pedir disponibilidad →"}</button><p className={styles.formHint}>Demo de solicitud, sin envío real.</p></>}</form></section>
    </main>
    <footer><a className={styles.wordmark} href="#inicio"><span>Q</span> QUALITY</a><p>French 7809 · Fisherton</p><p className={styles.demo}>Demo creada por Nivaror · No es el sitio oficial</p></footer>
  </div>;
}
