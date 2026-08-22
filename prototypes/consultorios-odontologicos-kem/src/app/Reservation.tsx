"use client";

import { FormEvent, useState } from "react";
import { ArrowSquareOut, CheckCircle, Warning } from "@phosphor-icons/react/dist/ssr";
import {
  MAPS_URL,
  REASONS,
  TIME_SLOTS,
  formatISO,
  todayISOInArgentina,
  weekdayOfISO,
} from "./hours";
import styles from "./page.module.css";

type Turno = { name: string; reason: string; date: string; time: string };

export function Reservation() {
  const [turno, setTurno] = useState<Turno | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const date = String(data.get("date") ?? "");

    // Sunday is the one day this demo refuses — the real schedule isn't public,
    // so the form can't pretend to know more than that.
    if (weekdayOfISO(date) === 0) {
      setDateError("Los domingos no se toman turnos. Elegí otro día.");
      return;
    }
    setDateError(null);
    setSending(true);

    window.setTimeout(() => {
      setSending(false);
      setTurno({
        name: String(data.get("name") ?? ""),
        reason: String(data.get("reason") ?? ""),
        date,
        time: String(data.get("time") ?? ""),
      });
    }, 700);
  }

  if (turno) {
    return (
      <div className={styles.confirm}>
        <CheckCircle size={30} weight="duotone" className={styles.confirmIcon} />
        <p className={styles.confirmTitle}>Listo, {turno.name}.</p>
        <p className={styles.confirmDetail}>
          {turno.reason} el {formatISO(turno.date)} a las {turno.time}. Te llega la
          confirmación y un recordatorio el día anterior.
        </p>
        <a className={styles.btnPrimary} href={MAPS_URL} target="_blank" rel="noopener noreferrer">
          Cómo llegar
          <ArrowSquareOut size={17} weight="bold" aria-hidden="true" />
        </a>
        <button type="button" className={styles.btnGhost} onClick={() => setTurno(null)}>
          Pedir otro turno
        </button>
        <p className={styles.note}>
          Vista previa: este turno no salió de tu navegador. En la versión real entra en la
          agenda del consultorio y el recordatorio sale solo.
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
          placeholder="Tu nombre"
        />
      </div>

      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="reason">
            Motivo
          </label>
          <select className={styles.input} id="reason" name="reason" defaultValue={REASONS[0]} required>
            {REASONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="date">
            Día
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
          <select className={styles.input} id="time" name="time" defaultValue="10:00" required>
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
          Los motivos y las franjas horarias de esta maqueta son de ejemplo: se ajustan a la
          agenda real del consultorio.
        </p>
      )}

      <button type="submit" className={styles.btnPrimary} disabled={sending}>
        {sending ? "Enviando" : "Pedir turno"}
      </button>

      <p className={styles.note}>
        Prototipo de demostración: el turno es una simulación y no llega al consultorio.
      </p>
    </form>
  );
}
