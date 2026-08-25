"use client";

import { useMemo, useState } from "react";
import { CheckCircle, UsersThree, CalendarBlank, Clock } from "@phosphor-icons/react";
import { scheduleFor, timeSlotsFor } from "@/lib/hours";

const DAY_NAMES = [
  "domingo",
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
];

function dayOfWeek(dateStr: string): number | null {
  if (!dateStr) return null;
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).getDay();
}

export function Booking() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [party, setParty] = useState(2);
  const [name, setName] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [touched, setTouched] = useState(false);

  const day = dayOfWeek(date);
  const schedule = day !== null ? scheduleFor(day) : null;
  const slots = useMemo(() => (day !== null ? timeSlotsFor(day) : []), [day]);
  const closedDay = date !== "" && !schedule;

  const canSubmit = date !== "" && !closedDay && time !== "" && name.trim() !== "";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!canSubmit) return;
    setConfirmed(true);
  }

  if (confirmed) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-2xl border border-gold-600/40 bg-wine-900 px-8 py-12 text-center">
        <CheckCircle size={44} weight="fill" className="text-gold-400" />
        <h3 className="font-display text-2xl font-semibold text-wine-100">
          Reserva confirmada
        </h3>
        <p className="text-sm text-wine-100/75">
          {name}, tu mesa para {party} {party === 1 ? "persona" : "personas"}{" "}
          quedó reservada el {DAY_NAMES[day ?? 0]} {date.split("-").reverse().slice(0, 2).join("/")} a las {time} hs.
        </p>
        <p className="text-xs text-wine-100/50">
          Esto es una muestra: en el sitio real, esta confirmación llegaría también por
          mail o WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto grid max-w-2xl gap-5 rounded-2xl border border-wine-700/60 bg-wine-900 p-6 sm:grid-cols-2 sm:p-8"
    >
      <div className="flex flex-col gap-2 sm:col-span-1">
        <label htmlFor="date" className="flex items-center gap-1.5 text-sm text-wine-100/85">
          <CalendarBlank size={16} className="text-gold-400" />
          Fecha
        </label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            setTime("");
          }}
          className="rounded-[10px] border border-wine-700/70 bg-wine-950 px-3 py-2.5 text-sm text-wine-100 outline-none focus:border-gold-500"
        />
        {touched && date === "" && (
          <p className="text-xs text-rose-300">Elegí una fecha.</p>
        )}
        {closedDay && (
          <p className="text-xs text-rose-300">Cerrado los domingos, probá otro día.</p>
        )}
      </div>

      <div className="flex flex-col gap-2 sm:col-span-1">
        <label htmlFor="time" className="flex items-center gap-1.5 text-sm text-wine-100/85">
          <Clock size={16} className="text-gold-400" />
          Horario
        </label>
        <select
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          disabled={!date || closedDay}
          className="rounded-[10px] border border-wine-700/70 bg-wine-950 px-3 py-2.5 text-sm text-wine-100 outline-none focus:border-gold-500 disabled:opacity-40"
        >
          <option value="">Elegí un horario</option>
          {slots.map((s) => (
            <option key={s} value={s}>
              {s} hs
            </option>
          ))}
        </select>
        {touched && date && !closedDay && time === "" && (
          <p className="text-xs text-rose-300">Elegí un horario.</p>
        )}
      </div>

      <div className="flex flex-col gap-2 sm:col-span-1">
        <label htmlFor="party" className="flex items-center gap-1.5 text-sm text-wine-100/85">
          <UsersThree size={16} className="text-gold-400" />
          Personas
        </label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setParty((p) => Math.max(1, p - 1))}
            className="h-9 w-9 rounded-[10px] border border-wine-700/70 text-wine-100 transition-colors hover:border-gold-500"
          >
            −
          </button>
          <span className="w-6 text-center text-sm text-wine-100">{party}</span>
          <button
            type="button"
            onClick={() => setParty((p) => Math.min(12, p + 1))}
            className="h-9 w-9 rounded-[10px] border border-wine-700/70 text-wine-100 transition-colors hover:border-gold-500"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:col-span-1">
        <label htmlFor="name" className="text-sm text-wine-100/85">
          Nombre
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tu nombre"
          className="rounded-[10px] border border-wine-700/70 bg-wine-950 px-3 py-2.5 text-sm text-wine-100 outline-none placeholder:text-wine-100/35 focus:border-gold-500"
        />
        {touched && name.trim() === "" && (
          <p className="text-xs text-rose-300">Contanos a nombre de quién es la reserva.</p>
        )}
      </div>

      <button
        type="submit"
        className="mt-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-medium text-wine-950 transition-transform active:scale-[0.98] sm:col-span-2"
      >
        Confirmar reserva
      </button>
    </form>
  );
}
