"use client";

import { useState, type FormEvent } from "react";
import { CalendarBlank, Users, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { isValidPartySize, type ReservationWindow } from "@/lib/reservation";

const today = () => new Date().toISOString().slice(0, 10);

export function ReservationCard({ window: win }: { window: ReservationWindow }) {
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState(win.slots[0]);
  const [partySize, setPartySize] = useState(2);
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!date) {
      setError("Elegí una fecha.");
      return;
    }
    if (!name.trim()) {
      setError("Ingresá un nombre para la reserva.");
      return;
    }
    if (!isValidPartySize(partySize)) {
      setError("La cantidad de comensales debe ser entre 1 y 12.");
      return;
    }
    setError(null);
    setConfirmed(true);
  }

  if (confirmed) {
    return (
      <div className="flex h-full flex-col justify-center gap-3 rounded-md border border-[#c1502f]/40 bg-[#221a14] p-6 text-[#f3ece1]">
        <CheckCircle size={28} weight="fill" className="text-[#c1502f]" />
        <p className="font-display text-xl">Reserva registrada</p>
        <p className="text-sm text-[#f3ece1]/75">
          {win.label} para {partySize} {partySize === 1 ? "persona" : "personas"}, el {date} a las{" "}
          {slot} hs, a nombre de {name}.
        </p>
        <button
          type="button"
          onClick={() => setConfirmed(false)}
          className="mt-2 w-fit text-sm text-[#e4805f] underline underline-offset-4 hover:text-[#f3ece1]"
        >
          Hacer otra reserva
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full flex-col gap-4 rounded-md border border-[#f3ece1]/12 bg-[#221a14] p-6"
    >
      <div>
        <p className="font-display text-2xl text-[#f3ece1]">{win.label}</p>
        <p className="mt-1 text-sm text-[#e4805f]">{win.timeRange}</p>
        <p className="mt-1 text-xs text-[#f3ece1]/55">{win.note}</p>
      </div>

      <label className="flex flex-col gap-1.5 text-xs text-[#f3ece1]/70">
        Fecha
        <span className="relative">
          <CalendarBlank size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#f3ece1]/40" />
          <input
            type="date"
            min={today()}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-sm border border-[#f3ece1]/15 bg-[#18130f] py-2 pl-9 pr-3 text-sm text-[#f3ece1] outline-none focus:border-[#c1502f]"
          />
        </span>
      </label>

      <label className="flex flex-col gap-1.5 text-xs text-[#f3ece1]/70">
        Horario
        <select
          value={slot}
          onChange={(e) => setSlot(e.target.value)}
          className="w-full rounded-sm border border-[#f3ece1]/15 bg-[#18130f] px-3 py-2 text-sm text-[#f3ece1] outline-none focus:border-[#c1502f]"
        >
          {win.slots.map((s) => (
            <option key={s} value={s}>
              {s} hs
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5 text-xs text-[#f3ece1]/70">
        Comensales
        <span className="relative">
          <Users size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#f3ece1]/40" />
          <input
            type="number"
            min={1}
            max={12}
            value={partySize}
            onChange={(e) => setPartySize(Number(e.target.value))}
            className="w-full rounded-sm border border-[#f3ece1]/15 bg-[#18130f] py-2 pl-9 pr-3 text-sm text-[#f3ece1] outline-none focus:border-[#c1502f]"
          />
        </span>
      </label>

      <label className="flex flex-col gap-1.5 text-xs text-[#f3ece1]/70">
        Nombre
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre y apellido"
          className="w-full rounded-sm border border-[#f3ece1]/15 bg-[#18130f] px-3 py-2 text-sm text-[#f3ece1] outline-none placeholder:text-[#f3ece1]/35 focus:border-[#c1502f]"
        />
      </label>

      {error && <p className="text-xs text-[#e4805f]">{error}</p>}

      <button
        type="submit"
        className="mt-auto rounded-sm bg-[#c1502f] py-2.5 text-sm font-semibold text-[#f3ece1] transition hover:bg-[#a8442a] active:scale-[0.98]"
      >
        Confirmar reserva
      </button>
    </form>
  );
}
