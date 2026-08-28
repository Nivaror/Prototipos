"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { MapPinLine, Wheelchair, Clock } from "@phosphor-icons/react/dist/ssr";
import styles from "./Contact.module.css";

export default function Contact() {
  const [name, setName] = useState("");
  const [preferredDay, setPreferredDay] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Contanos tu nombre para poder responderte.");
      return;
    }
    setError("");
    setSent(true);
  }

  return (
    <section id="contacto" className={styles.section}>
      <div className={styles.info}>
        <Image
          src="/images/ambiance-reception.jpg"
          alt="Recepción de AF Gimnasio"
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
          className={styles.infoPhoto}
        />
        <div className={styles.infoScrim} />
        <div className={styles.infoContent}>
          <p className={styles.infoLabel}>AF Gimnasio</p>
          <div className={styles.infoRow}>
            <MapPinLine size={18} weight="bold" />
            <span>Dr. Luis Vila 660, Alberdi, Rosario</span>
          </div>
          <div className={styles.infoRow}>
            <Clock size={18} weight="bold" />
            <span>Horario según el día, ver arriba</span>
          </div>
          <div className={styles.infoRow}>
            <Wheelchair size={18} weight="bold" />
            <span>Entrada accesible en silla de ruedas</span>
          </div>
        </div>
      </div>

      <div className={styles.formPanel}>
        <h2 className={styles.heading}>¿Con qué día empezamos?</h2>
        <p className={styles.sub}>
          Dejanos tu nombre y el día que te queda mejor. Te respondemos por
          este mismo canal.
        </p>

        {sent ? (
          <div className={styles.success} role="status">
            <p>¡Gracias, {name}! Te contactamos a la brevedad.</p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label htmlFor="name">Nombre</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
              />
              {error && <p className={styles.error}>{error}</p>}
            </div>

            <div className={styles.field}>
              <label htmlFor="day">Día que te queda mejor</label>
              <select
                id="day"
                value={preferredDay}
                onChange={(e) => setPreferredDay(e.target.value)}
              >
                <option value="">Elegí un día</option>
                <option value="lmv">Lunes, miércoles o viernes (6:30)</option>
                <option value="mj">Martes o jueves (8:00)</option>
                <option value="sab">Sábado (9:00 a 12:00)</option>
              </select>
            </div>

            <button className={styles.submit} type="submit">
              Consultar
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
