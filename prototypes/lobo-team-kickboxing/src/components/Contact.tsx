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
    <section id="contacto" className={styles.section}>
      <div className="container">
        <div className={`card ${styles.card}`}>
          <h2 className={styles.title}>Sumate a una clase</h2>
          {sent ? (
            <p className={styles.success}>
              Listo, quedó registrada tu consulta. Te contactamos para
              coordinar tu primera clase.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form} noValidate>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="name">Nombre</label>
                  <input id="name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="contact">Email o teléfono</label>
                  <input id="contact" name="contact" type="text" autoComplete="email" />
                </div>
              </div>
              <div className={styles.field}>
                <label htmlFor="message">Mensaje (opcional)</label>
                <textarea id="message" name="message" rows={2} />
              </div>
              {error && <p className={styles.error}>{error}</p>}
              <button type="submit" className="btn btn-primary">
                Enviar consulta
              </button>
            </form>
          )}
          <div className={styles.info}>
            <span className={styles.infoItem}>
              <MapPin size={16} weight="regular" />
              Galería Estadio, Av. Alberdi, Rosario
            </span>
            <a
              href="https://facebook.com/LoboTeam.KB"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.infoItem}
            >
              <FacebookLogo size={16} weight="regular" />
              facebook.com/LoboTeam.KB
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
