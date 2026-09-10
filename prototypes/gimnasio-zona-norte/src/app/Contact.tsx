"use client";

import { useState, type FormEvent } from "react";
import styles from "./Contact.module.css";

const DAYS = ["Lunes a viernes", "Sabado"];

export default function Contact() {
  const [name, setName] = useState("");
  const [interest, setInterest] = useState("");
  const [day, setDay] = useState(DAYS[0]);
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !interest || !contact.trim()) {
      setError("Completá tu nombre, objetivo y un canal de contacto.");
      return;
    }
    setError("");
    setSent(true); // mock submit, no backend on a demo prototype
  }

  return (
    <section id="contacto" className={styles.section}>
      <div className={`container ${styles.wrap}`}>
        <div className={styles.ticket}>
          <span className={`${styles.notch} ${styles.notchTop}`} />
          <span className={`${styles.notch} ${styles.notchBottom}`} />

          <div className={styles.info}>
            <h2 className={styles.heading}>Quiero hacerme socio</h2>
            <dl className={styles.infoList}>
              <div>
                <dt>Direccion</dt>
                <dd>Juan Jose Paso 1065, Rosario</dd>
              </div>
              <div>
                <dt>Barrio</dt>
                <dd>Lisandro de la Torre</dd>
              </div>
              <div>
                <dt>Sabados</dt>
                <dd>9:00 a 19:00</dd>
              </div>
            </dl>
            <a
              href="https://www.instagram.com/gimnasio.zonanorte"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.igLink}
            >
              @gimnasio.zonanorte
            </a>
          </div>

          <div className={styles.divider} aria-hidden />

          <div className={styles.formSide}>
            {sent ? (
              <p className={styles.success}>
                Listo, {name}. Te contactamos para coordinar tu visita.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form} noValidate>
                <div className={styles.field}>
                  <label htmlFor="name">Nombre</label>
                  <input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre"
                  />
                  {error && <p className={styles.error}>{error}</p>}
                </div>
                <div className={styles.field}>
                  <label htmlFor="interest">Objetivo</label>
                  <select id="interest" value={interest} onChange={(e) => setInterest(e.target.value)}>
                    <option value="">Elegí una opción</option>
                    <option value="musculacion">Musculación</option>
                    <option value="funcional">Funcional</option>
                    <option value="opciones">Conocer las opciones</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <label htmlFor="day">Dia que te queda mejor</label>
                  <select id="day" value={day} onChange={(e) => setDay(e.target.value)}>
                    {DAYS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.field}>
                  <label htmlFor="contact">WhatsApp o email</label>
                  <input id="contact" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Cómo te contactamos" autoComplete="email" />
                </div>
                <button type="submit" className={styles.submit}>
                  Quiero hacerme socio
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
