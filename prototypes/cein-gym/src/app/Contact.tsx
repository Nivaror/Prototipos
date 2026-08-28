"use client";

import { useState, type FormEvent } from "react";
import { MapPin, Wheelchair } from "@phosphor-icons/react/dist/ssr";
import styles from "./Contact.module.css";

const MAPS_URL =
  "https://www.google.com/maps/place/?q=place_id:ChIJ76qcWfhTtpURt5lGxjXRPFM";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [day, setDay] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !day.trim()) {
      setError("Completá tu nombre y un día de preferencia.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  return (
    <section id="contacto" className={styles.section}>
      <div className={styles.cardWrap}>
        <div className={styles.infoChip}>
          <div className={styles.infoRow}>
            <MapPin size={18} weight="bold" />
            <span>Darregueira 1265, Rosario</span>
          </div>
          <div className={styles.infoRow}>
            <Wheelchair size={18} weight="bold" />
            <span>Entrada y baños accesibles</span>
          </div>
          <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className={styles.infoLink}>
            Cómo llegar
          </a>
        </div>

        <div className={styles.card}>
          <h2 className={styles.heading}>Consultá tu horario</h2>
          <p className={styles.subtext}>
            Dejanos tu nombre y el día que te queda mejor. Te contestamos por
            el mismo medio que prefieras.
          </p>

          {submitted ? (
            <div className={styles.success} role="status">
              <p>Listo, {name.split(" ")[0]}. Recibimos tu consulta.</p>
              <p className={styles.successDetail}>
                El equipo de CEIN se pone en contacto para coordinar tu visita.
              </p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.field}>
                <label htmlFor="name">Nombre</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="day">Día que te queda mejor</label>
                <input
                  id="day"
                  name="day"
                  type="text"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  placeholder="Ej: martes por la tarde"
                />
              </div>
              {error && <p className={styles.error}>{error}</p>}
              <button type="submit" className={styles.submit}>
                Enviar consulta
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
