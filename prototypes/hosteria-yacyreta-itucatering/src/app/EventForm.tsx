"use client";

import { useState } from "react";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import styles from "./page.module.css";

type FormState = {
  nombre: string;
  tipo: string;
  fecha: string;
  invitados: string;
  mensaje: string;
};

const EMPTY: FormState = { nombre: "", tipo: "", fecha: "", invitados: "", mensaje: "" };

export function EventForm() {
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
    if (!form.tipo) next.tipo = "Elegí un tipo de evento.";
    if (!form.invitados.trim()) next.invitados = "Falta la cantidad de invitados.";
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
            <p className={styles.successTitle}>Consulta enviada</p>
            <p className={styles.successText}>
              Te contactamos para coordinar el menú, la fecha y el presupuesto
              de tu evento.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form className={styles.formPanel} onSubmit={handleSubmit} noValidate>
      <div className={styles.formRow}>
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
          <label className={styles.label} htmlFor="tipo">Tipo de evento</label>
          <select
            id="tipo"
            className={styles.select}
            value={form.tipo}
            onChange={(e) => update("tipo", e.target.value)}
          >
            <option value="">Elegir</option>
            <option value="cumpleanos">Cumpleaños</option>
            <option value="casamiento">Casamiento</option>
            <option value="empresarial">Evento empresarial</option>
            <option value="otro">Otro</option>
          </select>
          {errors.tipo && <span className={styles.error}>{errors.tipo}</span>}
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="fecha">Fecha estimada</label>
          <input
            id="fecha"
            type="date"
            className={styles.input}
            value={form.fecha}
            onChange={(e) => update("fecha", e.target.value)}
          />
          <span className={styles.helper}>Podés dejarla tentativa.</span>
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="invitados">Cantidad de invitados</label>
          <input
            id="invitados"
            inputMode="numeric"
            className={styles.input}
            value={form.invitados}
            onChange={(e) => update("invitados", e.target.value)}
          />
          {errors.invitados && <span className={styles.error}>{errors.invitados}</span>}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="mensaje">Contanos sobre el evento</label>
        <textarea
          id="mensaje"
          className={styles.textarea}
          value={form.mensaje}
          onChange={(e) => update("mensaje", e.target.value)}
        />
      </div>

      <div className={styles.submitRow}>
        <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
          Enviar consulta
        </button>
        <span className={styles.submitNote}>Sin compromiso.</span>
      </div>
    </form>
  );
}
