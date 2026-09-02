"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { WEEK_SCHEDULE } from "./hours";
import styles from "./Contact.module.css";

export default function Contact() {
  const [name, setName] = useState("");
  const [day, setDay] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Contanos tu nombre para poder reservarte el lugar.");
      return;
    }
    if (!day) {
      setError("Elegí un día para tu clase de prueba.");
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
        <h3 className={styles.formTitle}>Reservar prueba</h3>

        {sent ? (
          <p className={styles.success}>
            Listo, anotamos tu interés. El gimnasio te va a contactar por
            Instagram para confirmar el día.
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

            {error && <p className={styles.error} style={{ marginTop: 10 }}>{error}</p>}

            <button type="submit" className={styles.submit} style={{ marginTop: 18 }}>
              Reservar mi clase
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
