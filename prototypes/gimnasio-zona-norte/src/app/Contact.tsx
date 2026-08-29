"use client";

import { useState, type FormEvent } from "react";
import styles from "./Contact.module.css";

const DAYS = ["Lunes a viernes", "Sabado"];

export default function Contact() {
  const [name, setName] = useState("");
  const [day, setDay] = useState(DAYS[0]);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Contanos tu nombre para poder responderte.");
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
            <h2 className={styles.heading}>Vení a conocer el gimnasio</h2>
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
                  <label htmlFor="day">Dia que te queda mejor</label>
                  <select id="day" value={day} onChange={(e) => setDay(e.target.value)}>
                    {DAYS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className={styles.submit}>
                  Quiero que me escriban
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
