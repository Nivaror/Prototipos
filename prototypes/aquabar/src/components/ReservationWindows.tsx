"use client";

import { useState } from "react";
import styles from "./ReservationWindows.module.css";
import { RESERVATION_WINDOWS, timeSlots, todayISO, type ReservationWindow } from "@/lib/reservation";
import Reveal from "./Reveal";

function ReservationCard({ window }: { window: ReservationWindow }) {
  const [date, setDate] = useState(todayISO());
  const [party, setParty] = useState(2);
  const [time, setTime] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const slots = timeSlots(window);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!date) {
      setError("Elegí una fecha.");
      return;
    }
    if (!time) {
      setError("Elegí un horario dentro de la franja.");
      return;
    }
    setError(null);
    setConfirmed(true);
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHead}>
        <h3>{window.label}</h3>
        <span>{window.range}</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor={`date-${window.id}`}>Fecha</label>
          <input
            id={`date-${window.id}`}
            type="date"
            min={todayISO()}
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setConfirmed(false);
            }}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor={`party-${window.id}`}>Comensales</label>
          <select
            id={`party-${window.id}`}
            value={party}
            onChange={(e) => {
              setParty(Number(e.target.value));
              setConfirmed(false);
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "persona" : "personas"}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label>Horario</label>
          <div className={styles.slots}>
            {slots.map((slot) => (
              <button
                type="button"
                key={slot}
                className={`${styles.slot} ${time === slot ? styles.slotActive : ""}`}
                onClick={() => {
                  setTime(slot);
                  setConfirmed(false);
                  setError(null);
                }}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        {confirmed ? (
          <p className={styles.success}>
            Mesa para {party} {party === 1 ? "persona" : "personas"} el {date}{" "}
            a las {time} ({window.label.toLowerCase()}) reservada. Muestra
            demostrativa, no se envía a Aquabar.
          </p>
        ) : (
          <button type="submit" className={styles.submit}>
            Confirmar {window.label.toLowerCase()}
          </button>
        )}
      </form>
    </div>
  );
}

export default function ReservationWindows() {
  return (
    <section id="reservas" className={styles.section}>
      <div className="container">
        <Reveal>
          <div className={styles.heading}>
            <h2>Dos horarios, una reserva</h2>
            <p>
              Aquabar recomienda reservar tanto para almuerzo como para cena.
              Elegí la franja, la fecha y el horario, sin pasar por
              Facebook.
            </p>
          </div>
        </Reveal>
        <div className={styles.grid}>
          {RESERVATION_WINDOWS.map((window, i) => (
            <Reveal key={window.id} delay={i * 80}>
              <ReservationCard window={window} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
