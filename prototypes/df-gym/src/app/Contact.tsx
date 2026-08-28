"use client";

import { useState, type FormEvent } from "react";
import { FacebookLogo, PaperPlaneTilt } from "@phosphor-icons/react/dist/ssr";
import styles from "./Contact.module.css";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Contanos tu nombre para poder escribirte.");
      return;
    }
    setError("");
    setSent(true);
  }

  return (
    <section id="contacto" className={styles.section}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.headline}>Probá una clase</h2>
          <p className={styles.subtext}>
            Dejanos tu nombre y cuándo te gustaría entrenar. Te contactamos
            nosotros.
          </p>
        </div>

        <a
          className={styles.fbRow}
          href="https://facebook.com/distritofuerza"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookLogo size={18} weight="fill" />
          También podés escribirnos por Facebook (Distrito Fuerza)
        </a>

        {sent ? (
          <div className={styles.success} role="status">
            <p>¡Listo! Recibimos tu consulta, te contactamos pronto.</p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label htmlFor="name">Nombre</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="¿Cómo te llamás?"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {error && <span className={styles.error}>{error}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="when">¿Cuándo te gustaría entrenar?</label>
              <select id="when" name="when" defaultValue="temprano">
                <option value="temprano">Bien temprano (6 a 9 hs)</option>
                <option value="mediodia">Al mediodía</option>
                <option value="tarde">Por la tarde</option>
                <option value="sabado">Sábado</option>
              </select>
            </div>

            <button type="submit" className={styles.submit}>
              Enviar consulta
              <PaperPlaneTilt size={16} weight="fill" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
