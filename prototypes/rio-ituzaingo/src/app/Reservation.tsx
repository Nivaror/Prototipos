"use client";

import { FormEvent, useState } from "react";
import { ArrowSquareOut, CheckCircle, Warning } from "@phosphor-icons/react/dist/ssr";
import {
  MAPS_URL,
  TIME_SLOTS,
  formatISO,
  hasNightService,
  todayISOInArgentina,
  weekdayOfISO,
} from "./hours";
import styles from "./page.module.css";

type Booking = { name: string; people: string; date: string; time: string };

export function Reservation() {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const date = String(data.get("date") ?? "");

    // The form only offers night slots, so a day without night service can't take one.
    if (!hasNightService(weekdayOfISO(date))) {
      setDateError("Ese día no hay servicio de noche. Probá de miércoles a domingo.");
      return;
    }
    setDateError(null);
    setSending(true);

    window.setTimeout(() => {
      setSending(false);
      setBooking({
        name: String(data.get("name") ?? ""),
        people: String(data.get("people") ?? ""),
        date,
        time: String(data.get("time") ?? ""),
      });
    }, 700);
  }

  if (booking) {
    return (
      <div className={styles.confirm}>
        <CheckCircle size={30} weight="duotone" className={styles.confirmIcon} />
        <p className={styles.confirmTitle}>Listo, {booking.name}.</p>
        <p className={styles.confirmDetail}>
          Mesa para {booking.people} el {formatISO(booking.date)} a las {booking.time}.
        </p>
        <a className={styles.btnPrimary} href={MAPS_URL} target="_blank" rel="noopener noreferrer">
          Cómo llegar
          <ArrowSquareOut size={17} weight="bold" aria-hidden="true" />
        </a>
        <button type="button" className={styles.btnGhost} onClick={() => setBooking(null)}>
          Cargar otra reserva
        </button>
        <p className={styles.note}>
          Vista previa: esta reserva no salió de tu navegador. En la versión real entra directo
          a la lista de la noche, sin pasar por Facebook.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="name">
          Nombre
        </label>
        <input
          className={styles.input}
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="A nombre de quién"
        />
      </div>

      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="people">
            Personas
          </label>
          <select className={styles.input} id="people" name="people" defaultValue="4" required>
            {Array.from({ length: 14 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="date">
            Fecha
          </label>
          <input
            className={styles.input}
            id="date"
            name="date"
            type="date"
            required
            min={todayISOInArgentina()}
            aria-describedby={dateError ? "date-error" : "date-help"}
            aria-invalid={dateError ? true : undefined}
            data-invalid={dateError ? "true" : undefined}
            onChange={() => setDateError(null)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="time">
            Hora
          </label>
          <select className={styles.input} id="time" name="time" defaultValue="21:00" required>
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
      </div>

      {dateError ? (
        <p className={styles.error} id="date-error" role="alert">
          <Warning size={16} weight="fill" aria-hidden="true" />
          {dateError}
        </p>
      ) : (
        <p className={styles.help} id="date-help">
          Servicio de noche, de miércoles a domingo. Los lunes está cerrado y los martes solo
          hay mediodía.
        </p>
      )}

      <button type="submit" className={styles.btnPrimary} disabled={sending}>
        {sending ? "Enviando" : "Reservar mesa"}
      </button>

      <p className={styles.note}>
        Prototipo de demostración: la reserva es una simulación y no llega al local.
      </p>
    </form>
  );
}
