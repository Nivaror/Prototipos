"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { WEEK_SCHEDULE } from "./hours";
import styles from "./Contact.module.css";

export default function Contact() {
  const [name, setName] = useState("");
  const [interest, setInterest] = useState("");
  const [day, setDay] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) {
      setError("Completá tu nombre y un canal de contacto.");
      return;
    }
    if (!interest || !day) {
      setError("Elegí qué te interesa y un día de preferencia.");
      return;
    }
    setError("");
    setSent(true);
  }

  return (
    <section className={styles.section} id="contacto">
      <div className={styles.info}>
        <Image
          src="/images/functional-zone.jpg"
          alt="Zona de entrenamiento funcional"
          fill
          sizes="(max-width: 860px) 100vw, 55vw"
          style={{ objectFit: "cover" }}
        />
        <div className={styles.infoContent}>
          <h2 className={styles.infoHeadline}>Blvd. Rondeau 3540, La Florida, Rosario</h2>
          <span className={styles.infoLine}>Euro Gym RED</span>
        </div>
      </div>

      <div className={styles.formCard}>
        <h3 className={styles.formTitle}>Empezá tu entrenamiento</h3>

        {sent ? (
          <p className={styles.success}>
            Listo, anotamos tu interés. El gimnasio te va a contactar por el
            canal indicado para confirmar el próximo paso.
          </p>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label htmlFor="name">Nombre</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Cómo te llamás"
              />
            </div>

            <div className={styles.field} style={{ marginTop: 14 }}>
              <label htmlFor="interest">¿Qué te interesa?</label>
              <select id="interest" value={interest} onChange={(e) => setInterest(e.target.value)}>
                <option value="">Elegí una opción</option>
                <option value="membresia">Conocer las membresías</option>
                <option value="prueba">Clase de prueba</option>
              </select>
            </div>

            <div className={styles.field} style={{ marginTop: 14 }}>
              <label htmlFor="day">Día preferido</label>
              <select id="day" value={day} onChange={(e) => setDay(e.target.value)}>
                <option value="">Elegí un día</option>
                {WEEK_SCHEDULE.map((d) => (
                  <option key={d.code} value={d.code}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field} style={{ marginTop: 14 }}>
              <label htmlFor="contact">WhatsApp o email</label>
              <input id="contact" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Cómo te contactamos" autoComplete="email" />
            </div>

            {error && <p className={styles.error} style={{ marginTop: 10 }}>{error}</p>}

            <button type="submit" className={styles.submit} style={{ marginTop: 18 }}>
              Quiero empezar
            </button>
          </form>
        )}

        <p className={styles.disclaimer}>
          Muestra hecha por Nivaror. No es el sitio oficial de Euro Gym RED.
        </p>
      </div>
    </section>
  );
}
