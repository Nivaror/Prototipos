"use client";

import { useState } from "react";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { timeSlots } from "@/lib/hours";
import {
  validateReservation,
  type ReservationErrors,
  type ReservationFields,
} from "@/lib/reservation";

const EMPTY: ReservationFields = { name: "", date: "", time: "", partySize: "2" };

function todayISO(): string {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

export function Reservation() {
  const [fields, setFields] = useState<ReservationFields>(EMPTY);
  const [errors, setErrors] = useState<ReservationErrors>({});
  const [confirmed, setConfirmed] = useState<ReservationFields | null>(null);

  const slots = fields.date ? timeSlots(fields.date) : [];

  function update<K extends keyof ReservationFields>(key: K, value: string) {
    setFields((f) => ({
      ...f,
      [key]: value,
      ...(key === "date" ? { time: "" } : {}),
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors = validateReservation(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setConfirmed(fields);
    }
  }

  return (
    <section id="reservas" className="bg-white px-6 py-20 md:px-14">
      <div className="mx-auto max-w-md">
        <h2 className="font-display text-center text-3xl font-semibold text-[var(--wine)] md:text-4xl">
          Reservá tu mesa
        </h2>
        <p className="mt-3 text-center text-[15px] leading-relaxed text-[var(--foreground)]/70">
          Contanos día, horario y cuántos son. Te confirmamos al momento.
        </p>

        <div className="mt-8 rounded-3xl border border-black/8 bg-[var(--background)] p-6 md:p-8">
          {confirmed ? (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              <CheckCircle size={40} weight="fill" className="text-[var(--wine)]" />
              <p className="font-display text-2xl font-semibold text-[var(--wine)]">
                ¡Reserva confirmada!
              </p>
              <p className="text-sm text-[var(--foreground)]/75">
                {confirmed.name}, te esperamos el {confirmed.date} a las{" "}
                {confirmed.time} para {confirmed.partySize}{" "}
                {Number(confirmed.partySize) === 1 ? "persona" : "personas"}.
              </p>
              <button
                type="button"
                onClick={() => {
                  setConfirmed(null);
                  setFields(EMPTY);
                  setErrors({});
                }}
                className="mt-2 rounded-full border border-[var(--wine)]/30 px-5 py-2 text-sm font-medium text-[var(--wine)] transition hover:border-[var(--wine)]"
              >
                Hacer otra reserva
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-[var(--foreground)]">
                  Nombre
                </label>
                <input
                  id="name"
                  type="text"
                  value={fields.name}
                  onChange={(e) => update("name", e.target.value)}
                  className="rounded-xl border border-black/15 bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--wine)]"
                  placeholder="Tu nombre"
                />
                {errors.name && <p className="text-xs text-[var(--wine)]">{errors.name}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="date" className="text-sm font-medium text-[var(--foreground)]">
                  Fecha
                </label>
                <input
                  id="date"
                  type="date"
                  min={todayISO()}
                  value={fields.date}
                  onChange={(e) => update("date", e.target.value)}
                  className="rounded-xl border border-black/15 bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--wine)]"
                />
                {errors.date && <p className="text-xs text-[var(--wine)]">{errors.date}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="time" className="text-sm font-medium text-[var(--foreground)]">
                  Horario
                </label>
                <select
                  id="time"
                  value={fields.time}
                  onChange={(e) => update("time", e.target.value)}
                  disabled={slots.length === 0}
                  className="rounded-xl border border-black/15 bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--wine)] disabled:opacity-50"
                >
                  <option value="">
                    {fields.date ? "Elegí un horario" : "Primero elegí la fecha"}
                  </option>
                  {slots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                {errors.time && <p className="text-xs text-[var(--wine)]">{errors.time}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="partySize" className="text-sm font-medium text-[var(--foreground)]">
                  Personas
                </label>
                <input
                  id="partySize"
                  type="number"
                  min={1}
                  max={12}
                  value={fields.partySize}
                  onChange={(e) => update("partySize", e.target.value)}
                  className="rounded-xl border border-black/15 bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--wine)]"
                />
                {errors.partySize && (
                  <p className="text-xs text-[var(--wine)]">{errors.partySize}</p>
                )}
              </div>

              <button
                type="submit"
                className="mt-2 rounded-full bg-[var(--wine)] px-6 py-3 text-sm font-medium text-white transition hover:bg-[var(--wine-dark)]"
              >
                Confirmar reserva
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
