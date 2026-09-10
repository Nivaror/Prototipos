"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { MapPinLine, Wheelchair, Clock } from "@phosphor-icons/react/dist/ssr";
import styles from "./Contact.module.css";

export default function Contact() {
  const [name, setName] = useState("");
  const [interest, setInterest] = useState("");
  const [preferredDay, setPreferredDay] = useState("");
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
        <h2 className={styles.heading}>Quiero hacerme socio</h2>
        <p className={styles.sub}>
          Elegí tu objetivo y un día de preferencia. Te contamos cómo sumarte
          por el canal que indiques.
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
              <label htmlFor="interest">Objetivo</label>
              <select id="interest" value={interest} onChange={(e) => setInterest(e.target.value)}>
                <option value="">Elegí una opción</option>
                <option value="musculacion">Musculación</option>
                <option value="funcional">Funcional</option>
                <option value="opciones">Conocer las opciones</option>
              </select>
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
            <div className={styles.field}>
              <label htmlFor="contact">WhatsApp o email</label>
              <input id="contact" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Cómo te contactamos" autoComplete="email" />
            </div>

            <button className={styles.submit} type="submit">
              Quiero hacerme socio
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
