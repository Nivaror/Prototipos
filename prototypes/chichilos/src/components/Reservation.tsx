"use client";

import { FormEvent, useState } from "react";
import styles from "./Reservation.module.css";

type FormState = {
  name: string;
  date: string;
  time: string;
  guests: string;
};

const EMPTY: FormState = { name: "", date: "", time: "", guests: "" };

function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  if (!year || !month || !day) return isoDate;
  return `${day}/${month}/${year}`;
}

export function Reservation() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [confirmed, setConfirmed] = useState(false);

  function update(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validate(): boolean {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Ingresá tu nombre";
    if (!form.date) next.date = "Elegí una fecha";
    if (!form.time) next.time = "Elegí un horario";
    if (!form.guests || Number(form.guests) < 1) next.guests = "¿Cuántos son?";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (validate()) {
      setConfirmed(true);
    }
  }

  if (confirmed) {
    return (
      <section className={styles.section} id="reserva">
        <div className={styles.inner}>
          <div className={styles.confirm}>
            <div>
              <div className={styles.confirmTitle}>¡Reserva recibida, {form.name}!</div>
              <div className={styles.confirmBody}>
                Mesa para {form.guests} el {formatDate(form.date)} a las {form.time}. Esto es una muestra
                — en la versión real, Chichilo&apos;s recibiría este pedido al instante.
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section} id="reserva">
      <div className={styles.inner}>
        <h2 className={styles.heading}>Reservá tu mesa para la cena</h2>
        <p className={styles.deck}>
          Se recomienda reservar para la cena. Hoy ese pedido solo pasa por Instagram o
          teléfono — acá se resuelve en un formulario.
        </p>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>
          <div className={styles.field}>
            <label htmlFor="date">Fecha</label>
            <input
              id="date"
              type="date"
              value={form.date}
              onChange={(e) => update("date", e.target.value)}
            />
            {errors.date && <span className={styles.error}>{errors.date}</span>}
          </div>
          <div className={styles.field}>
            <label htmlFor="time">Horario</label>
            <input
              id="time"
              type="time"
              value={form.time}
              onChange={(e) => update("time", e.target.value)}
            />
            {errors.time && <span className={styles.error}>{errors.time}</span>}
          </div>
          <div className={styles.field}>
            <label htmlFor="guests">Personas</label>
            <input
              id="guests"
              type="number"
              min={1}
              max={20}
              value={form.guests}
              onChange={(e) => update("guests", e.target.value)}
            />
            {errors.guests && <span className={styles.error}>{errors.guests}</span>}
          </div>
          <button type="submit" className={`btn btn-primary ${styles.submit}`}>
            Reservar
          </button>
        </form>
        <p className={styles.note}>
          Muestra sin envío real — ninguna reserva llega a Chichilo&apos;s todavía.
        </p>
      </div>
    </section>
  );
}
