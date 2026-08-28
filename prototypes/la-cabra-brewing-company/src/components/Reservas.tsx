"use client";

import { useMemo, useState } from "react";
import { CheckCircle, Minus, Plus, SunHorizon, MoonStars } from "@phosphor-icons/react/dist/ssr";
import { shiftsForDate, isValidParty, MIN_PARTY, MAX_PARTY } from "@/lib/reserva";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

type ShiftKey = "manana" | "tarde";

export default function Reservas() {
  const [date, setDate] = useState(todayISO());
  const [shift, setShift] = useState<ShiftKey | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [party, setParty] = useState(2);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const shifts = useMemo(() => shiftsForDate(date), [date]);
  const dayClosed = shifts.manana.length === 0 && shifts.tarde.length === 0;
  const activeSlots = shift ? shifts[shift] : [];

  function pickDate(next: string) {
    setDate(next);
    setShift(null);
    setSlot(null);
    setError(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (dayClosed) {
      setError("Ese día está cerrado, elegí otra fecha.");
      return;
    }
    if (!shift) {
      setError("Elegí turno mañana o noche.");
      return;
    }
    if (!slot) {
      setError("Elegí un horario dentro del turno.");
      return;
    }
    if (!name.trim()) {
      setError("Falta el nombre.");
      return;
    }
    if (!isValidParty(party)) {
      setError(`La mesa es de ${MIN_PARTY} a ${MAX_PARTY} personas.`);
      return;
    }
    setError(null);
    setConfirmed(true);
  }

  return (
    <section className="reservas" id="reservas">
      <div className="wrap">
        <div className="section-head">
          <h2>Reserva tu turno</h2>
          <p>
            Elegí el día, el turno (mañana o noche) y un horario. Hoy esto
            solo se coordina por Instagram, esta es una muestra de cómo se
            vería ordenado.
          </p>
        </div>

        <div className="reservas__card">
          {confirmed ? (
            <div className="reservas__confirm" role="status">
              <CheckCircle size={22} weight="fill" />
              <span>
                Turno de muestra confirmado para {name}, {party}{" "}
                {party === 1 ? "persona" : "personas"}, el {date} en el
                turno {shift === "manana" ? "mañana" : "noche"} a las{" "}
                {slot}. Esto es una demo, todavía no se envía a ningún lado.
              </span>
            </div>
          ) : (
            <form className="form-grid" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="fecha">Fecha</label>
                  <input
                    id="fecha"
                    type="date"
                    min={todayISO()}
                    value={date}
                    onChange={(e) => pickDate(e.target.value)}
                  />
                </div>
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
              </div>

              {dayClosed ? (
                <p className="reservas__closed">
                  La Cabra no abre ese día (lunes cerrado). Elegí otra
                  fecha.
                </p>
              ) : (
                <>
                  <div className="field">
                    <label>Turno</label>
                    <div className="shift-toggle">
                      <button
                        type="button"
                        className={`shift-btn${shift === "manana" ? " is-active" : ""}`}
                        onClick={() => {
                          setShift("manana");
                          setSlot(null);
                        }}
                      >
                        <SunHorizon size={18} weight="regular" />
                        Mañana
                      </button>
                      <button
                        type="button"
                        className={`shift-btn${shift === "tarde" ? " is-active" : ""}`}
                        onClick={() => {
                          setShift("tarde");
                          setSlot(null);
                        }}
                      >
                        <MoonStars size={18} weight="regular" />
                        Noche
                      </button>
                    </div>
                  </div>

                  {shift && (
                    <div className="field">
                      <label>Horario</label>
                      <div className="slot-grid">
                        {activeSlots.map((s) => (
                          <button
                            type="button"
                            key={s}
                            className={`slot-chip${slot === s ? " is-active" : ""}`}
                            onClick={() => setSlot(s)}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              <div className="field">
                <label htmlFor="party">Personas</label>
                <div className="stepper">
                  <button
                    type="button"
                    onClick={() => setParty((p) => Math.max(MIN_PARTY, p - 1))}
                    aria-label="Menos personas"
                  >
                    <Minus size={16} weight="bold" />
                  </button>
                  <span id="party">{party}</span>
                  <button
                    type="button"
                    onClick={() => setParty((p) => Math.min(MAX_PARTY, p + 1))}
                    aria-label="Mas personas"
                  >
                    <Plus size={16} weight="bold" />
                  </button>
                </div>
              </div>

              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}

              <button type="submit" className="btn btn-primary">
                Confirmar reserva
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
