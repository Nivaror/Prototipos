"use client";

import { useMemo, useState } from "react";
import { CheckCircle, ArrowCounterClockwise } from "@phosphor-icons/react/dist/ssr";
import { getUpcomingDays, getTimeSlots, PARTY_SIZES } from "@/lib/reservation";

// The reservation centerpiece, built as a horizontal day-scroller plus a
// time-slot chip grid - a UI shape not used by any sibling in the
// food-service family (not escauriza's staggered card stack, not popolo's
// single framed panel with a recomputing dropdown, not chichilos's compact
// inline form, not hosteria-yacyreta-itucatering's two-door selector).
export function Reservation() {
  const days = useMemo(() => getUpcomingDays(), []);
  const slots = useMemo(() => getTimeSlots(), []);

  const [dayIso, setDayIso] = useState(days[0].iso);
  const [time, setTime] = useState<string | null>(null);
  const [party, setParty] = useState<(typeof PARTY_SIZES)[number]>(2);
  const [name, setName] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedDay = days.find((d) => d.iso === dayIso) ?? days[0];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!time) {
      setError("Elegí un horario para tu reserva.");
      return;
    }
    if (!name.trim()) {
      setError("Contanos a nombre de quién reservamos.");
      return;
    }
    setError(null);
    setConfirmed(true);
  }

  function reset() {
    setConfirmed(false);
    setTime(null);
    setName("");
    setParty(2);
  }

  if (confirmed) {
    return (
      <section id="reservar" className="bg-[var(--background)] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-[var(--panel)] p-10 text-center">
          <CheckCircle size={40} weight="fill" className="mx-auto text-[var(--accent-soft)]" />
          <h3 className="font-display mt-4 text-2xl font-semibold">
            Reserva simulada confirmada
          </h3>
          <p className="mt-2 text-sm text-[var(--foreground)]/70">
            {name} · {selectedDay.weekday} {selectedDay.dayNumber} de{" "}
            {selectedDay.month} · {time} hs · {party}{" "}
            {party === 1 ? "persona" : "personas"}
          </p>
          <p className="mt-4 text-xs text-[var(--foreground)]/50">
            Esto es una simulación de la muestra Nivaror, ninguna reserva real
            fue enviada.
          </p>
          <button
            onClick={reset}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium transition hover:border-white/35"
          >
            <ArrowCounterClockwise size={16} />
            Hacer otra reserva
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="reservar" className="bg-[var(--background)] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display text-3xl font-semibold md:text-4xl">
          Reservá tu mesa
        </h2>
        <p className="mt-3 max-w-[52ch] text-sm text-[var(--foreground)]/70">
          En Lo de Tere la reserva es obligatoria, no solo recomendada.
          Elegí día y horario para asegurar tu mesa; los turnos de brunch y
          cena están marcados como especialmente pedidos.
        </p>

        <form onSubmit={handleSubmit} className="mt-10">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {days.map((d) => {
              const active = d.iso === dayIso;
              return (
                <button
                  type="button"
                  key={d.iso}
                  onClick={() => setDayIso(d.iso)}
                  className={`flex shrink-0 flex-col items-center rounded-2xl px-4 py-3 text-sm transition ${
                    active
                      ? "bg-[var(--accent)] text-white"
                      : "border border-white/10 text-[var(--foreground)]/75 hover:border-white/30"
                  }`}
                >
                  <span className="text-[11px] uppercase tracking-wide opacity-80">
                    {d.isToday ? "Hoy" : d.weekday}
                  </span>
                  <span className="font-display mt-0.5 text-lg font-semibold">
                    {d.dayNumber}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-5">
            {slots.map((s) => {
              const active = s.time === time;
              return (
                <button
                  type="button"
                  key={s.time}
                  onClick={() => setTime(s.time)}
                  className={`relative rounded-xl px-3 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-[var(--accent)] text-white"
                      : "border border-white/10 text-[var(--foreground)]/80 hover:border-white/30"
                  }`}
                >
                  {s.time}
                  {s.recommended && (
                    <span className="mt-1 block text-[10px] font-normal uppercase tracking-wide opacity-70">
                      Recomendado
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--foreground)]/80">
                Personas
              </label>
              <div className="flex flex-wrap gap-2">
                {PARTY_SIZES.map((p) => (
                  <button
                    type="button"
                    key={p}
                    onClick={() => setParty(p)}
                    className={`h-10 min-w-10 rounded-full px-3 text-sm font-medium transition ${
                      party === p
                        ? "bg-[var(--accent)] text-white"
                        : "border border-white/10 text-[var(--foreground)]/75 hover:border-white/30"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="reservation-name"
                className="mb-2 block text-sm font-medium text-[var(--foreground)]/80"
              >
                A nombre de
              </label>
              <input
                id="reservation-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre y apellido"
                className="w-full rounded-xl border border-white/15 bg-[var(--panel)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus:border-[var(--accent-soft)] focus:outline-none"
              />
            </div>
          </div>

          {error && (
            <p className="mt-4 text-sm text-red-300">{error}</p>
          )}

          <button
            type="submit"
            className="mt-8 rounded-full bg-[var(--accent)] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(61,107,214,0.4)] transition hover:bg-[var(--accent-soft)]"
          >
            Confirmar reserva
          </button>
        </form>
      </div>
    </section>
  );
}
