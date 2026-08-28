"use client";

import { useState } from "react";
import { CheckCircle, Minus, Plus } from "@phosphor-icons/react/dist/ssr";
import { lunchSlots, isValidParty, MIN_PARTY, MAX_PARTY } from "@/lib/reservas";

const SLOTS = lunchSlots();

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function Reservas() {
  const [name, setName] = useState("");
  const [party, setParty] = useState(2);
  const [date, setDate] = useState(todayISO());
  const [slot, setSlot] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Falta el nombre.");
      return;
    }
    if (!isValidParty(party)) {
      setError(`La mesa es de ${MIN_PARTY} a ${MAX_PARTY} personas.`);
      return;
    }
    if (!slot) {
      setError("Elegí un horario para el almuerzo.");
      return;
    }
    setError(null);
    setConfirmed(true);
  }

  return (
    <section className="reservas" id="reservas">
      <div className="wrap">
        <div className="reservas__card">
          <div className="reservas__intro">
            <h2>Reservá tu mesa para el almuerzo</h2>
            <p>
              Las reseñas piden reservar para almorzar. Esta es una muestra
              de cómo se vería un turno ordenado, sin depender de un mensaje
              directo.
            </p>
          </div>

          {confirmed ? (
            <div className="reservas__confirm" role="status">
              <CheckCircle size={22} weight="fill" />
              <span>
                Turno de muestra confirmado para {name}, {party}{" "}
                {party === 1 ? "persona" : "personas"}, el {date} a las{" "}
                {slot}. (Esto es una demo: todavía no se envía a ningún
                lado.)
              </span>
            </div>
          ) : (
            <form className="form-grid" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    id="nombre"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="field">
                  <label htmlFor="fecha">Fecha</label>
                  <input
                    id="fecha"
                    type="date"
                    min={todayISO()}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="field">
                <label id="personas-label">Personas</label>
                <div
                  className="stepper"
                  role="group"
                  aria-labelledby="personas-label"
                >
                  <button
                    type="button"
                    aria-label="Restar persona"
                    onClick={() => setParty((p) => Math.max(MIN_PARTY, p - 1))}
                  >
                    <Minus size={14} weight="bold" />
                  </button>
                  <span>{party}</span>
                  <button
                    type="button"
                    aria-label="Sumar persona"
                    onClick={() => setParty((p) => Math.min(MAX_PARTY, p + 1))}
                  >
                    <Plus size={14} weight="bold" />
                  </button>
                </div>
              </div>

              <div className="field">
                <label id="turno-label">Horario de almuerzo</label>
                <div
                  className="slots"
                  role="group"
                  aria-labelledby="turno-label"
                >
                  {SLOTS.map((s) => (
                    <button
                      type="button"
                      key={s}
                      className={`slot${slot === s ? " is-selected" : ""}`}
                      aria-pressed={slot === s}
                      onClick={() => setSlot(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {error && <p className="field-error">{error}</p>}

              <button type="submit" className="btn btn-primary">
                Confirmar turno
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
