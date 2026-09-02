"use client";

import { useMemo, useState, type FormEvent } from "react";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import WhatsAppButton from "./WhatsAppButton";
import { nextDays, slotsForDate, validateReserva } from "@/lib/reserva";
import styles from "./ReservationForm.module.css";

export default function ReservationForm() {
  const days = useMemo(() => nextDays(), []);
  const [selectedDate, setSelectedDate] = useState(days[0].iso);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [partySize, setPartySize] = useState(2);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const slots = useMemo(() => slotsForDate(selectedDate), [selectedDate]);
  const dateLabel = days.find((d) => d.iso === selectedDate)?.label ?? selectedDate;

  function pickDate(iso: string) {
    setSelectedDate(iso);
    setSelectedTime(null);
    setConfirmed(false);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!selectedTime) return;
    const result = validateReserva({ name, partySize });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setError(null);
    setConfirmed(true);
  }

  if (confirmed && selectedTime) {
    const whatsappMessage = `Hola! Quiero confirmar mi reserva en Casablanca: ${partySize} ${
      partySize === 1 ? "persona" : "personas"
    }, ${dateLabel.toLowerCase()} a las ${selectedTime}, a nombre de ${name}.`;

    return (
      <div className={styles.confirm}>
        <CheckCircle size={40} weight="fill" className={styles.confirmIcon} />
        <h3 className={styles.confirmTitle}>¡Reserva simulada con éxito!</h3>
        <p className={styles.confirmBody}>
          Guardamos el pedido: {name}, mesa para {partySize}{" "}
          {partySize === 1 ? "persona" : "personas"}, {dateLabel.toLowerCase()} a las{" "}
          {selectedTime}. Es una demostración — no hay ningún sistema real detrás todavía. Para
          asegurar el lugar de verdad, confirmalo por WhatsApp:
        </p>
        <WhatsAppButton message={whatsappMessage} label="Confirmar por WhatsApp" />
        <button
          type="button"
          className={styles.reset}
          onClick={() => {
            setConfirmed(false);
            setSelectedTime(null);
          }}
        >
          Hacer otra reserva
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <span className={styles.label}>Día</span>
        <div className={styles.dayStrip}>
          {days.map((d) => (
            <button
              type="button"
              key={d.iso}
              className={`${styles.chip} ${selectedDate === d.iso ? styles.chipActive : ""}`}
              onClick={() => pickDate(d.iso)}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.field}>
        <span className={styles.label}>Horario</span>
        {slots.length === 0 ? (
          <p className={styles.empty}>
            No quedan horarios disponibles para hoy. Probá otro día, o escribinos directo por
            WhatsApp si buscás algo de último momento.
          </p>
        ) : (
          <div className={styles.slotGrid}>
            {slots.map((slot) => (
              <button
                type="button"
                key={slot}
                className={`${styles.chip} ${selectedTime === slot ? styles.chipActive : ""}`}
                onClick={() => setSelectedTime(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedTime && (
        <div className={styles.details}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="res-name">
              Nombre
            </label>
            <input
              id="res-name"
              type="text"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
            />
          </div>

          <div className={styles.field}>
            <span className={styles.label}>Comensales</span>
            <div className={styles.stepper}>
              <button
                type="button"
                aria-label="Restar comensal"
                onClick={() => setPartySize((n) => Math.max(1, n - 1))}
              >
                −
              </button>
              <span>{partySize}</span>
              <button
                type="button"
                aria-label="Sumar comensal"
                onClick={() => setPartySize((n) => Math.min(12, n + 1))}
              >
                +
              </button>
            </div>
          </div>

          {error && (
            <p className={styles.fieldError} role="alert">
              {error}
            </p>
          )}

          <button type="submit" className={styles.submit}>
            Reservar {dateLabel.toLowerCase()} a las {selectedTime}
          </button>
        </div>
      )}
    </form>
  );
}
