"use client";

import { useState, type FormEvent } from "react";
import { PaperPlaneRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import styles from "./ContactBar.module.css";

export default function ContactBar() {
  const [name, setName] = useState("");
  const [interest, setInterest] = useState("musculacion");
  const [contact, setContact] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) {
      setError("Completá tu nombre y un canal de contacto.");
      return;
    }
    setError("");
    setSent(true);
  }

  return (
    <section id="contacto" className={styles.section}>
      <div className="container">
        <h2 className={styles.heading}>Quiero hacerme socio</h2>

        {sent ? (
          <div className={styles.success}>
            <CheckCircle size={22} weight="fill" />
            <span>Gracias, {name}. Te contactamos a la brevedad.</span>
          </div>
        ) : (
          <form className={styles.bar} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label htmlFor="name">Nombre</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="contact">WhatsApp o email</label>
              <input
                id="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Cómo te contactamos"
                autoComplete="email"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="interest">Te interesa</label>
              <select
                id="interest"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
              >
                <option value="musculacion">Musculación</option>
                <option value="pilates">Pilates</option>
                <option value="no-se">No estoy seguro</option>
              </select>
            </div>

            <button type="submit" className={styles.submit}>
              Quiero hacerme socio
              <PaperPlaneRight size={16} weight="bold" />
            </button>
          </form>
        )}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </section>
  );
}
