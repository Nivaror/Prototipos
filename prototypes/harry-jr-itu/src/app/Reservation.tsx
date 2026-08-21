"use client";

import { FormEvent, useState } from "react";
import styles from "./page.module.css";

const TIME_SLOTS = [
  "18:30", "19:00", "19:30", "20:00", "20:30",
  "21:00", "21:30", "22:00", "22:30", "23:00",
];

function todayISO() {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Argentina/Buenos_Aires",
  });
  return fmt.format(new Date());
}

type Booking = {
  name: string;
  people: string;
  date: string;
  time: string;
};

export function Reservation() {
  const [booking, setBooking] = useState<Booking | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setBooking({
      name: String(data.get("name") ?? ""),
      people: String(data.get("people") ?? ""),
      date: String(data.get("date") ?? ""),
      time: String(data.get("time") ?? ""),
    });
  }

  if (booking) {
    return (
      <div className={styles.confirmBox}>
        <p className={styles.confirmTitle}>¡Reserva pre-cargada, {booking.name}!</p>
        <p className={styles.confirmDetail}>
          Mesa afuera para {booking.people} · {formatDate(booking.date)} a las{" "}
          {booking.time}
        </p>
        <a
          className={styles.cta}
          href="https://instagram.com/harryjr._itu"
          target="_blank"
          rel="noopener noreferrer"
        >
          Confirmar por Instagram →
        </a>
        <button
          type="button"
          className={styles.secondaryBtn}
          onClick={() => setBooking(null)}
        >
          Cargar otra reserva
        </button>
        <p className={styles.formNote}>
          Vista previa de demostración — esta reserva no se envió a Harry Jr.
          todavía. En la versión real, este paso le llega directo al local.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.reserveForm} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor="name">
          Nombre
        </label>
        <input
          className={styles.input}
          id="name"
          name="name"
          type="text"
          required
          placeholder="¿Cómo te llamamos?"
        />
      </div>
      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="people">
            Personas
          </label>
          <select className={styles.input} id="people" name="people" required defaultValue="2">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="date">
            Fecha
          </label>
          <input
            className={styles.input}
            id="date"
            name="date"
            type="date"
            required
            min={todayISO()}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="time">
            Hora
          </label>
          <select className={styles.input} id="time" name="time" required defaultValue="20:00">
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button type="submit" className={styles.submitBtn}>
        Reservar mesa afuera
      </button>
      <p className={styles.formNote}>
        Mesas al aire libre, sujetas a disponibilidad. Prototipo de
        demostración: esta reserva es una simulación, no llega al local.
      </p>
    </form>
  );
}

function formatDate(iso: string) {
  if (!iso) return iso;
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}
