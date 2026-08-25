"use client";

import { useEffect, useState } from "react";
import {
  MAX_GUESTS,
  MIN_GUESTS,
  WINDOWS,
  validateBooking,
  type WindowId,
} from "@/lib/windows";
import styles from "./BookingFlow.module.css";

export default function BookingFlow() {
  const [activeId, setActiveId] = useState<WindowId>("brunch");
  const [slot, setSlot] = useState<string | null>(null);
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.replace("#reservas-", "");
    if (WINDOWS.some((w) => w.id === hash)) {
      setActiveId(hash as WindowId);
    }
  }, []);

  const active = WINDOWS.find((w) => w.id === activeId)!;

  function selectWindow(id: WindowId) {
    setActiveId(id);
    setSlot(null);
    setError(null);
    setConfirmed(false);
  }

  function submit() {
    const result = validateBooking({ windowId: activeId, slot, guests, name });
    if (!result.ok) {
      setError(result.error ?? "Revisá los datos de la reserva.");
      return;
    }
    setError(null);
    setConfirmed(true);
  }

  return (
    <section id="reservas" className={styles.section}>
      <div className="wrap">
        <h2 className={styles.heading}>Elegí tu franja</h2>
        <p className={styles.subtext}>
          Brunch, almuerzo y cena se reservan por separado, cada una con su propio horario.
        </p>

        <div className={styles.tabs} role="tablist">
          {WINDOWS.map((w) => (
            <button
              key={w.id}
              id={`reservas-${w.id}`}
              role="tab"
              aria-selected={w.id === activeId}
              className={`${styles.tab} ${w.id === activeId ? styles.tabActive : ""}`}
              onClick={() => selectWindow(w.id)}
            >
              {w.label}
            </button>
          ))}
        </div>

        <div className={styles.panel}>
          <p className={styles.panelDescription}>{active.description}</p>
          {active.note ? <p className={styles.panelNote}>{active.note}</p> : null}

          {confirmed ? (
            <div className={styles.confirmation}>
              <p className={styles.confirmationTitle}>Reserva simulada lista</p>
              <p className={styles.confirmationDetail}>
                {active.label} · {slot} hs · {guests} {guests === 1 ? "persona" : "personas"} · a nombre de {name}
              </p>
              <p className={styles.confirmationNote}>
                Esta es una demo: la reserva no se envió a Mapu. Para reservar de
                verdad, escribí por{" "}
                <a
                  href="https://www.instagram.com/MapuRosario"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
                .
              </p>
              <button
                className={styles.again}
                onClick={() => {
                  setConfirmed(false);
                  setSlot(null);
                  setName("");
                }}
              >
                Hacer otra reserva
              </button>
            </div>
          ) : (
            <>
              <div className={styles.slots}>
                {active.slots.map((s) => (
                  <button
                    key={s}
                    className={`${styles.slot} ${slot === s ? styles.slotActive : ""}`}
                    onClick={() => setSlot(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label htmlFor="guests">Personas</label>
                  <div className={styles.stepper}>
                    <button
                      type="button"
                      aria-label="Restar persona"
                      onClick={() => setGuests((g) => Math.max(MIN_GUESTS, g - 1))}
                    >
                      –
                    </button>
                    <span id="guests">{guests}</span>
                    <button
                      type="button"
                      aria-label="Sumar persona"
                      onClick={() => setGuests((g) => Math.min(MAX_GUESTS, g + 1))}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="name">Nombre</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="¿A nombre de quién?"
                  />
                </div>
              </div>

              {error ? <p className={styles.error}>{error}</p> : null}

              <button className={`pill-btn pill-btn--accent ${styles.submit}`} onClick={submit}>
                Confirmar reserva
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
