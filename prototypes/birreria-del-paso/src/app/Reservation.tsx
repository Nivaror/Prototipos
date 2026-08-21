"use client";

import { FormEvent, useState } from "react";
import { ArrowSquareOut, CheckCircle, Warning } from "@phosphor-icons/react/dist/ssr";
import {
  MAPS_URL,
  RESERVE_CONFIRM,
  RESERVE_CTA,
  RESERVE_ERROR,
  RESERVE_HELP,
  RESERVE_NOTE,
  TIME_SLOTS,
  canReserveOn,
} from "./hours";
import { formatISO, todayISOInArgentina, weekdayOfISO } from "./schedule";
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

    // The form must not accept a day the business is shut — that is the whole
    // point of putting the real schedule behind it.
    if (!canReserveOn(weekdayOfISO(date))) {
      setDateError(RESERVE_ERROR);
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
        <p className={styles.note}>{RESERVE_CONFIRM}</p>
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
          <select
            className={styles.input}
            id="time"
            name="time"
            defaultValue={TIME_SLOTS[Math.floor(TIME_SLOTS.length / 2)]}
            required
          >
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
          {RESERVE_HELP}
        </p>
      )}

      <button type="submit" className={styles.btnPrimary} disabled={sending}>
        {sending ? "Enviando" : RESERVE_CTA}
      </button>

      <p className={styles.note}>{RESERVE_NOTE}</p>
    </form>
  );
}
