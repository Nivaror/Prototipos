"use client";

import { useEffect, useState } from "react";
import { SunHorizon, MoonStars, ClockCountdown } from "@phosphor-icons/react/dist/ssr";
import {
  getStatus,
  weekGrid,
  MORNING_LABEL,
  EVENING_LABEL,
  type Status,
} from "@/lib/hours";
import { useReveal } from "@/lib/useReveal";

const DAYS = weekGrid();

// Centerpiece: a 7x2 weekly grid (day columns, morning/evening rows), the
// sector's first calendar-style schedule visual. Distinct from casablanca's
// badge, mapu's window chips, puerto-pichon's hairline stat row,
// rosarigasino's icon-led band and cuervo-blanco's 24-tick hour strip: this
// is a two-row grid because the real problem is two disjoint daily blocks,
// not one continuous window.
export default function HorarioGrid() {
  const [status, setStatus] = useState<Status | null>(null);
  const { ref, visible } = useReveal<HTMLDivElement>();

  useEffect(() => {
    const id = setInterval(() => setStatus(getStatus()), 60_000);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStatus(getStatus());
    return () => clearInterval(id);
  }, []);

  return (
    <section className="section" id="horario">
      <div className="wrap">
        <div className="section-head">
          <h2>El horario partido, de un vistazo</h2>
          <p>
            La Cabra abre a la mañana, cierra, y vuelve a la noche. Los
            lunes no abre. Así se ve la semana completa, sin adivinar.
          </p>
        </div>

        <div className="horario__status">
          <span
            className={`horario__dot${status?.isOpen ? " is-open" : ""}`}
            aria-hidden="true"
          />
          <span className="horario__label">
            {status?.label ?? "Consultando horario..."}
          </span>
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
          ref={ref}
          className={`weekgrid reveal${visible ? " is-visible" : ""}`}
          role="table"
          aria-label="Horario semanal de La Cabra Brewing Company"
        >
          <div className="weekgrid__row weekgrid__row--head" role="row">
            <div className="weekgrid__label" role="columnheader" />
            {DAYS.map((d) => (
              <div
                key={d.day}
                className="weekgrid__daylabel"
                role="columnheader"
              >
                {d.short}
              </div>
            ))}
          </div>

          <div className="weekgrid__row" role="row">
            <div className="weekgrid__label" role="rowheader">
              <SunHorizon size={16} weight="regular" />
              Mañana
              <span className="weekgrid__label-time">{MORNING_LABEL}</span>
            </div>
            {DAYS.map((d) => (
              <div key={d.day} role="cell" className="weekgrid__cell-wrap">
                <span
                  className={`weekgrid__cell${d.manana ? " is-open" : ""}`}
                  aria-label={
                    d.manana
                      ? `${d.label}, mañana abierto`
                      : `${d.label}, cerrado`
                  }
                />
              </div>
            ))}
          </div>

          <div className="weekgrid__row" role="row">
            <div className="weekgrid__label" role="rowheader">
              <MoonStars size={16} weight="regular" />
              Noche
              <span className="weekgrid__label-time">{EVENING_LABEL}</span>
            </div>
            {DAYS.map((d) => (
              <div key={d.day} role="cell" className="weekgrid__cell-wrap">
                <span
                  className={`weekgrid__cell${d.tarde ? " is-open" : ""}`}
                  aria-label={
                    d.tarde
                      ? `${d.label}, noche abierto`
                      : `${d.label}, cerrado`
                  }
                />
              </div>
            ))}
          </div>
        </div>

        <p className="horario__note">
          Mismo horario los siete días, excepto los lunes que permanece
          cerrado todo el día.
        </p>
      </div>
    </section>
  );
}
