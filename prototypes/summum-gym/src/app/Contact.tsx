"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import styles from "./Contact.module.css";

export function Contact() {
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !question.trim()) {
      setError("Completá tu nombre y tu consulta antes de enviar.");
      return;
    }
    setError("");
    setSent(true);
  }

  return (
    <section id="contacto" className={styles.section}>
      <div className={styles.bg}>
        <Image
          src="/images/detail-weights-rack.jpg"
          alt="Zona de pesas de Summum Gym"
          fill
          sizes="100vw"
        />
      </div>
      <div className={styles.scrim} aria-hidden="true" />
      <div className={styles.cardWrap}>
        <div className={styles.card}>
          <h2 className={styles.heading}>Consultá tu plan</h2>
          <p className={styles.intro}>Dejanos tu nombre y tu consulta, te respondemos a la brevedad.</p>

          {sent ? (
            <p className={styles.success}>
              Listo, {name}. Registramos tu consulta, en la versión real esto llega directo al gimnasio.
            </p>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.field}>
                <label htmlFor="name">Nombre</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="question">Tu consulta</label>
                <textarea
                  id="question"
                  rows={3}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>
              {error && <span className={styles.error}>{error}</span>}
              <button className={styles.submit} type="submit">
                Enviar consulta
              </button>
            </form>
          )}

          <div className={styles.divider} />
          <a
            className={styles.instagramLink}
            href="https://instagram.com/summumgym"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramLogo size={18} weight="regular" />
            Escribinos por Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
