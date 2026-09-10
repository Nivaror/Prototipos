"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import styles from "./Contact.module.css";

export function Contact() {
  const [name, setName] = useState("");
  const [interest, setInterest] = useState("");
  const [question, setQuestion] = useState("");
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
          <h2 className={styles.heading}>Quiero hacerme socio</h2>
          <p className={styles.intro}>Elegí tu objetivo y dejanos un contacto. Te contamos cómo sumarte.</p>

          {sent ? (
            <p className={styles.success}>
              Listo, {name}. Registramos tu interés; en la versión real esto llega directo al gimnasio.
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
                <label htmlFor="interest">Objetivo</label>
                <select id="interest" value={interest} onChange={(e) => setInterest(e.target.value)}>
                  <option value="">Elegí una opción</option>
                  <option value="musculacion">Musculación</option>
                  <option value="funcional">Funcional</option>
                  <option value="opciones">Conocer las opciones</option>
                </select>
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
              <div className={styles.field}>
                <label htmlFor="contact">WhatsApp o email</label>
                <input id="contact" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Cómo te contactamos" autoComplete="email" />
              </div>
              {error && <span className={styles.error}>{error}</span>}
              <button className={styles.submit} type="submit">
                Quiero hacerme socio
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
