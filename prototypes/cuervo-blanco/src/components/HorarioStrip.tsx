"use client";

import { useEffect, useState } from "react";
import { ClockCountdown } from "@phosphor-icons/react/dist/ssr";
import { getStatus, hourIsOpen, OPEN_LABEL, CLOSE_LABEL, type Status } from "@/lib/hours";
import { useReveal } from "@/lib/useReveal";

const HOURS = Array.from({ length: 24 }, (_, h) => h);

export default function HorarioStrip() {
  const [status, setStatus] = useState<Status | null>(null);
  const { ref, visible } = useReveal<HTMLDivElement>();

  useEffect(() => {
    // Time-of-day is only known client-side, so the first read has to
    // happen here (not in useState's initializer) to avoid a server/client
    // hydration mismatch. The interval then keeps it in sync going forward.
    const id = setInterval(() => setStatus(getStatus()), 60_000);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStatus(getStatus());
    return () => clearInterval(id);
  }, []);

  return (
    <section className="section" id="horario">
      <div className="wrap">
        <div className="section-head">
          <h2>Casi siempre abierto, pero eso no se nota desde afuera</h2>
          <p>
            El horario real de Cuervo Blanco es más largo que lo que muestra
            Instagram. Esto es lo que un cliente vería hoy si entrara a
            buscarlo.
          </p>
        </div>
        <div
          ref={ref}
          className={`horario__card reveal${visible ? " is-visible" : ""}`}
        >
          <div className="horario__top">
            <div className="horario__status">
              <span
                className={`horario__dot${status?.isOpen ? " is-open" : ""}`}
                aria-hidden="true"
              />
              <span className="horario__label">
                {status?.label ?? "Consultando horario..."}
              </span>
            </div>
            {status && (
              <span className="horario__change">
                <ClockCountdown
                  size={16}
                  weight="regular"
                  style={{ verticalAlign: "-2px", marginRight: 4 }}
                />
                {status.changeLabel}
              </span>
            )}
          </div>

          <div
            className="hourstrip"
            role="img"
            aria-label={`Abierto aproximadamente de ${OPEN_LABEL} a ${CLOSE_LABEL}, todos los días`}
          >
            {HOURS.map((h) => (
              <span
                key={h}
                className={`hourstrip__tick${hourIsOpen(h) ? " is-open" : ""}${
                  status?.currentHour === h ? " is-now" : ""
                }`}
              />
            ))}
          </div>
          <div className="hourstrip__marks">
            <span>00</span>
            <span>06</span>
            <span>12</span>
            <span>18</span>
            <span>23</span>
          </div>

          <p className="horario__note">
            Mismo horario aproximado los 7 días de la semana, según lo que
            confirman las reseñas del local.
          </p>
        </div>
      </div>
    </section>
  );
}
