"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { DINNER_SLOTS, validateReservation } from "@/lib/reserva";

function todayISO(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60_000);
  return local.toISOString().slice(0, 10);
}

export default function Reservation() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState<string>(DINNER_SLOTS[0]);
  const [partySize, setPartySize] = useState(2);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const result = validateReservation({ name, date, time, partySize });
    if (!result.ok) {
      setError(result.error);
      setConfirmed(false);
      return;
    }
    setError(null);
    setConfirmed(true);
  }

  if (confirmed) {
    return (
      <div className="reservation__confirm">
        <CheckCircle size={40} weight="fill" />
        <h3>¡Reserva simulada con éxito!</h3>
        <p>
          Esta es una demostración: en el sitio real, {name}, tu mesa para{" "}
          {partySize} {partySize === 1 ? "persona" : "personas"} el {date} a las{" "}
          {time} quedaría confirmada al instante.
        </p>
        <button className="btn btn-secondary" onClick={() => setConfirmed(false)}>
          Hacer otra reserva
        </button>
      </div>
    );
  }

  return (
    <form className="reservation__form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="res-name">Nombre</label>
        <input
          id="res-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tu nombre"
        />
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="res-date">Fecha</label>
          <input
            id="res-date"
            type="date"
            min={todayISO()}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="res-time">Horario</label>
          <select id="res-time" value={time} onChange={(e) => setTime(e.target.value)}>
            {DINNER_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="res-party">Comensales</label>
        <div className="stepper">
          <button
            type="button"
            aria-label="Restar comensal"
            onClick={() => setPartySize((n) => Math.max(1, n - 1))}
          >
            −
          </button>
          <span id="res-party">{partySize}</span>
          <button
            type="button"
            aria-label="Sumar comensal"
            onClick={() => setPartySize((n) => Math.min(12, n + 1))}
          >
            +
          </button>
        </div>
      </div>

      {error ? (
        <p className="field-error" role="alert">
          {error}
        </p>
      ) : null}

      <button type="submit" className="btn btn-primary reservation__submit">
        Confirmar reserva
      </button>
    </form>
  );
}
