"use client";

import { useState } from "react";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import styles from "./page.module.css";

type FormState = {
  nombre: string;
  interes: string;
  horario: string;
  contacto: string;
};

const EMPTY: FormState = { nombre: "", interes: "", horario: "", contacto: "" };

export function TrialForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [sent, setSent] = useState(false);

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: Partial<FormState> = {};
    if (!form.nombre.trim()) next.nombre = "Falta el nombre.";
    if (!form.interes) next.interes = "Elegí qué te interesa.";
    if (!form.contacto.trim()) next.contacto = "Dejanos un WhatsApp o email.";
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  }

  if (sent) {
    return (
      <div className={styles.formPanel}>
        <div className={styles.successBox}>
          <span className={styles.successIcon}>
            <CheckCircle size={22} weight="fill" />
          </span>
          <div>
            <p className={styles.successTitle}>Interés registrado</p>
            <p className={styles.successText}>
              Te contactamos para coordinar el próximo paso según tu objetivo.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form className={styles.formPanel} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          className={styles.input}
          value={form.nombre}
          onChange={(e) => update("nombre", e.target.value)}
        />
        {errors.nombre && <span className={styles.error}>{errors.nombre}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="interes">¿Qué te interesa?</label>
        <select
          id="interes"
          className={styles.select}
          value={form.interes}
          onChange={(e) => update("interes", e.target.value)}
        >
          <option value="">Elegir</option>
          <option value="musculacion">Musculación</option>
          <option value="funcional">Entrenamiento funcional</option>
          <option value="grupales">Clases grupales</option>
          <option value="personalizado">Entrenamiento personalizado</option>
          <option value="membresia">Conocer las membresías</option>
        </select>
        {errors.interes && <span className={styles.error}>{errors.interes}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="contacto">WhatsApp o email</label>
        <input
          id="contacto"
          className={styles.input}
          placeholder="Cómo te contactamos"
          value={form.contacto}
          onChange={(e) => update("contacto", e.target.value)}
          autoComplete="email"
        />
        {errors.contacto && <span className={styles.error}>{errors.contacto}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="horario">Horario que te queda mejor</label>
        <input
          id="horario"
          className={styles.input}
          placeholder="Ej: mañanas, después de las 19hs"
          value={form.horario}
          onChange={(e) => update("horario", e.target.value)}
        />
        <span className={styles.helper}>Opcional, para coordinar mejor.</span>
      </div>

      <div className={styles.submitRow}>
        <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
          Quiero hacerme socio
        </button>
        <span className={styles.submitNote}>Sin compromiso.</span>
      </div>
    </form>
  );
}
