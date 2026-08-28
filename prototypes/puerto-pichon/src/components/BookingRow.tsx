"use client";

import { useMemo, useState } from "react";
import {
  CaretDown,
  Minus,
  Plus,
  CheckCircle,
} from "@phosphor-icons/react/dist/ssr";
import type { DayIndex } from "@/lib/hours";
import { dayLabel, rangeLabel } from "@/lib/hours";
import {
  WindowDef,
  windowRangeForDay,
  generateSlots,
  validateReserva,
  MIN_PARTY_SIZE,
  MAX_PARTY_SIZE,
  ReservaErrors,
} from "@/lib/reservas";
import styles from "./BookingFlow.module.css";

function todayISO(): string {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function isoToDay(iso: string): DayIndex {
  // Parse as local calendar date (no timezone shift) rather than
  // new Date(iso), which UTC-parses and can land on the wrong weekday.
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).getDay() as DayIndex;
}

export default function BookingRow({
  windowDef,
  isOpen,
  onToggle,
}: {
  windowDef: WindowDef;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [partySize, setPartySize] = useState(2);
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<ReservaErrors>({});
  const [confirmed, setConfirmed] = useState<null | {
    date: string;
    time: string;
    partySize: number;
    name: string;
  }>(null);

  const day = date ? isoToDay(date) : null;
  const range = day !== null ? windowRangeForDay(windowDef.id, day) : null;
  const slots = useMemo(
    () => (day !== null ? generateSlots(windowDef.id, day) : []),
    [day, windowDef.id]
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors = validateReserva({ date, time, partySize, name });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setConfirmed({ date, time, partySize, name });
    }
  }

  function reset() {
    setConfirmed(null);
    setDate("");
    setTime("");
    setPartySize(2);
    setName("");
    setErrors({});
  }

  return (
    <div className={`${styles.row} ${isOpen ? styles.rowOpen : ""}`}>
      <button
        type="button"
        className={styles.rowHeader}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div>
          <span className={styles.rowLabel}>{windowDef.label}</span>
          <span className={styles.rowDesc}>{windowDef.description}</span>
        </div>
        <CaretDown
          size={20}
          weight="bold"
          className={styles.caret}
          style={{ transform: isOpen ? "rotate(180deg)" : "none" }}
        />
      </button>

      {isOpen && (
        <div className={styles.panel}>
          {confirmed ? (
            <div className={styles.confirm}>
              <CheckCircle size={28} weight="fill" className={styles.confirmIcon} />
              <p>
                Reserva de {windowDef.label.toLowerCase()} para{" "}
                <strong>{confirmed.partySize}</strong>{" "}
                {confirmed.partySize === 1 ? "persona" : "personas"} a nombre
                de <strong>{confirmed.name}</strong>, el{" "}
                {new Date(`${confirmed.date}T00:00:00`).toLocaleDateString(
                  "es-AR",
                  { day: "numeric", month: "long" }
                )}{" "}
                a las {confirmed.time}.
              </p>
              <p className={styles.confirmNote}>
                Muestra de cómo quedaría confirmada, todavía no se envió a
                Puerto Pichón.
              </p>
              <button type="button" className={styles.resetLink} onClick={reset}>
                Reservar otra franja
              </button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.field}>
                <label htmlFor={`date-${windowDef.id}`}>Fecha</label>
                <input
                  id={`date-${windowDef.id}`}
                  type="date"
                  min={todayISO()}
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setTime("");
                  }}
                />
                {errors.date && <span className={styles.error}>{errors.date}</span>}
              </div>

              {date && !range && (
                <p className={styles.unavailable}>
                  Los {dayLabel(day as DayIndex)} abrimos{" "}
                  {rangeLabel(day as DayIndex)}, así que no hay{" "}
                  {windowDef.label.toLowerCase()} ese día. Probá otra fecha u
                  otra franja.
                </p>
              )}

              {date && range && (
                <div className={styles.field}>
                  <label>Horario</label>
                  <div className={styles.slots}>
                    {slots.map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        className={`${styles.slot} ${time === slot ? styles.slotActive : ""}`}
                        onClick={() => setTime(slot)}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                  {errors.time && <span className={styles.error}>{errors.time}</span>}
                </div>
              )}

              <div className={styles.field}>
                <label htmlFor={`party-${windowDef.id}`}>Comensales</label>
                <div className={styles.stepper}>
                  <button
                    type="button"
                    aria-label="Restar comensal"
                    onClick={() => setPartySize((p) => Math.max(MIN_PARTY_SIZE, p - 1))}
                  >
                    <Minus size={16} weight="bold" />
                  </button>
                  <span id={`party-${windowDef.id}`}>{partySize}</span>
                  <button
                    type="button"
                    aria-label="Sumar comensal"
                    onClick={() => setPartySize((p) => Math.min(MAX_PARTY_SIZE + 1, p + 1))}
                  >
                    <Plus size={16} weight="bold" />
                  </button>
                </div>
                {errors.partySize && (
                  <span className={styles.error}>{errors.partySize}</span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor={`name-${windowDef.id}`}>Nombre</label>
                <input
                  id={`name-${windowDef.id}`}
                  type="text"
                  placeholder="Nombre y apellido"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <span className={styles.error}>{errors.name}</span>}
              </div>

              <button type="submit" className="pill-btn pill-btn--accent">
                Reservar
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
