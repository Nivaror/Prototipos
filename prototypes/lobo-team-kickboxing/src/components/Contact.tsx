"use client";

import { useState, type FormEvent } from "react";
import { MapPin, FacebookLogo } from "@phosphor-icons/react/dist/ssr";
import styles from "./Contact.module.css";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const contact = String(form.get("contact") || "").trim();

    if (!name || !contact) {
      setError("Completá tu nombre y un dato de contacto.");
      return;
    }

    setError("");
    setSent(true);
  }

  return (
    <section id="contacto" className="section">
      <div className={`container ${styles.grid}`}>
        <div className={`card ${styles.formCard}`}>
          <h2 className={styles.title}>Sumate a una clase</h2>
          {sent ? (
            <p className={styles.success}>
              Listo, quedó registrada tu consulta. Te contactamos para
              coordinar tu primera clase.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form} noValidate>
              <div className={styles.field}>
                <label htmlFor="name">Nombre</label>
                <input id="name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={styles.field}>
                <label htmlFor="contact">Email o teléfono</label>
                <input id="contact" name="contact" type="text" autoComplete="email" />
              </div>
              <div className={styles.field}>
                <label htmlFor="message">Mensaje (opcional)</label>
                <textarea id="message" name="message" rows={3} />
              </div>
              {error && <p className={styles.error}>{error}</p>}
              <button type="submit" className="btn btn-primary">
                Enviar consulta
              </button>
            </form>
          )}
        </div>

        <div className={styles.info}>
          <div className={styles.infoRow}>
            <MapPin size={20} weight="regular" />
            <span>Galería Estadio, Av. Alberdi, Rosario</span>
          </div>
          <a
            href="https://facebook.com/LoboTeam.KB"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.infoRow}
          >
            <FacebookLogo size={20} weight="regular" />
            <span>facebook.com/LoboTeam.KB</span>
          </a>
          <p className={styles.note}>
            Los horarios exactos por día se confirman por Facebook o en tu
            primera consulta.
          </p>
        </div>
      </div>
    </section>
  );
}
