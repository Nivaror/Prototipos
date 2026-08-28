"use client";

import { useState } from "react";
import Image from "next/image";
import { PaperPlaneTilt, ArrowCounterClockwise } from "@phosphor-icons/react/dist/ssr";

const FEATURES = [
  "Eventos corporativos",
  "Cumpleaños y celebraciones",
  "Menú a coordinar según la ocasión",
];

const EVENT_TYPES = ["Cumpleaños", "Evento corporativo", "Otro"] as const;

// Short full-bleed banner (not a hero-height background, not a scrim'd
// hero like escauriza's) with a headline anchored top-left, followed by a
// two-column row below it: feature pills on one side, a plain vertical
// inquiry form on the other. This is a different layout family from every
// section already on this page (Hero's overlapping stack, InfoStrip's chip
// bar, Reservation's day-scroller) and from every sibling's catering
// treatment in the family (hosteria-yacyreta-itucatering's two-door
// selector + 3-card service grid + event-inquiry panel) - single-flow
// placement, no path split, a from-scratch form shape (plain stacked
// fields, not day/time chips).
export function Catering() {
  const [name, setName] = useState("");
  const [eventType, setEventType] = useState<(typeof EVENT_TYPES)[number] | "">("");
  const [guests, setGuests] = useState("");
  const [notes, setNotes] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !eventType || !guests.trim()) {
      setError("Completá nombre, tipo de evento y cantidad de invitados.");
      return;
    }
    setError(null);
    setConfirmed(true);
  }

  function reset() {
    setConfirmed(false);
    setName("");
    setEventType("");
    setGuests("");
    setNotes("");
  }

  return (
    <section id="catering" className="bg-[var(--background)]">
      <div className="relative h-[34vh] min-h-[220px] w-full overflow-hidden">
        <Image
          src="/images/catering-table-setting.jpg"
          alt="Mesa preparada para un evento de catering de Lo de Tere"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/40 to-transparent" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-6 pb-8">
          <h2 className="font-display text-3xl font-semibold text-[var(--foreground)] md:text-4xl">
            Catering para tu evento
          </h2>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 md:py-20">
        <div>
          <p className="max-w-[46ch] text-base leading-relaxed text-[var(--foreground)]/75">
            Lo de Tere también arma el catering de tu evento. Hoy esto solo se
            coordina llamando por teléfono, así que te dejamos un primer
            contacto para que nos cuentes qué necesitás.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {FEATURES.map((f) => (
              <span
                key={f}
                className="rounded-full border border-[var(--tan)]/30 bg-[var(--panel)] px-4 py-2 text-sm text-[var(--foreground)]/85"
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        {confirmed ? (
          <div className="rounded-3xl border border-white/10 bg-[var(--panel)] p-8 text-center">
            <PaperPlaneTilt size={32} weight="fill" className="mx-auto text-[var(--tan)]" />
            <h3 className="font-display mt-4 text-xl font-semibold">
              Consulta simulada enviada
            </h3>
            <p className="mt-2 text-sm text-[var(--foreground)]/70">
              {name} · {eventType} · {guests} invitados
            </p>
            <p className="mt-4 text-xs text-[var(--foreground)]/50">
              Esto es una simulación de la muestra Nivaror, ninguna consulta
              real fue enviada.
            </p>
            <button
              onClick={reset}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium transition hover:border-white/35"
            >
              <ArrowCounterClockwise size={16} />
              Consultar otro evento
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/10 bg-[var(--panel)] p-8"
          >
            <div className="grid gap-5">
              <div>
                <label
                  htmlFor="catering-name"
                  className="mb-2 block text-sm font-medium text-[var(--foreground)]/80"
                >
                  Nombre
                </label>
                <input
                  id="catering-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nombre y apellido"
                  className="w-full rounded-xl border border-white/15 bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus:border-[var(--tan)] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="catering-event-type"
                    className="mb-2 block text-sm font-medium text-[var(--foreground)]/80"
                  >
                    Tipo de evento
                  </label>
                  <select
                    id="catering-event-type"
                    value={eventType}
                    onChange={(e) =>
                      setEventType(e.target.value as (typeof EVENT_TYPES)[number])
                    }
                    className="w-full rounded-xl border border-white/15 bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] focus:border-[var(--tan)] focus:outline-none"
                  >
                    <option value="">Elegir</option>
                    {EVENT_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="catering-guests"
                    className="mb-2 block text-sm font-medium text-[var(--foreground)]/80"
                  >
                    Invitados
                  </label>
                  <input
                    id="catering-guests"
                    type="number"
                    min={1}
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    placeholder="Ej: 30"
                    className="w-full rounded-xl border border-white/15 bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus:border-[var(--tan)] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="catering-notes"
                  className="mb-2 block text-sm font-medium text-[var(--foreground)]/80"
                >
                  Contanos más (opcional)
                </label>
                <textarea
                  id="catering-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Fecha aproximada, horario, algo puntual que necesites"
                  className="w-full resize-none rounded-xl border border-white/15 bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus:border-[var(--tan)] focus:outline-none"
                />
              </div>
            </div>

            {error && <p className="mt-4 text-sm text-red-300">{error}</p>}

            <button
              type="submit"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--tan)] px-8 py-3.5 text-sm font-semibold text-[var(--background)] transition hover:brightness-110"
            >
              <PaperPlaneTilt size={16} weight="bold" />
              Consultar catering
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
