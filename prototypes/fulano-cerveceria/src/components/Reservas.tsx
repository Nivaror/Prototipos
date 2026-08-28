"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";

const DIAS = ["Hoy", "Mañana", "Viernes", "Sábado", "Domingo"];
const PERSONAS = ["1-2", "3-4", "5-6", "7+"];

export default function Reservas() {
  const [confirmed, setConfirmed] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setConfirmed(true);
  }

  return (
    <section className="reservas" id="reservas">
      <div className="wrap reservas__inner">
        <div className="reservas__copy">
          <h2>Reservá tu mesa</h2>
          <p>
            Para las noches con más movimiento, dejá tu mesa reservada antes
            de salir.
          </p>
        </div>

        <form className="reservas__form" onSubmit={handleSubmit}>
          <div className="reservas__row">
            <div className="field">
              <label htmlFor="dia">Día</label>
              <select id="dia" defaultValue={DIAS[0]}>
                {DIAS.map((dia) => (
                  <option key={dia} value={dia}>
                    {dia}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="personas">Personas</label>
              <select id="personas" defaultValue={PERSONAS[0]}>
                {PERSONAS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="field">
            <label htmlFor="nombre">Nombre y apellido</label>
            <input id="nombre" type="text" placeholder="Ej: Marcos Ferreyra" required />
          </div>

          <button type="submit" className="btn btn-primary reservas__submit">
            Confirmar reserva
          </button>

          {confirmed && (
            <p className="reservas__confirm">
              <CheckCircle size={16} weight="fill" />{" "}
              ¡Reserva simulada! En la versión real, esto llegaría directo a
              Fulano.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
