"use client";

import { useCallback, useMemo, useState } from "react";
import { useProgram } from "./ProgramProvider";
import { SCHEDULE, isLongNight } from "./hours";
import {
  WEEK,
  addDays,
  formatISO,
  shiftLabel,
  slotsOf,
  todayISOInArgentina,
  weekdayOfISO,
} from "./schedule";
import styles from "./page.module.css";

const PARTY = ["2", "3", "4", "5", "6", "7", "8", "más de 8"];

/**
 * Reservation keyed to a night rather than to a bare date and time: at a venue
 * where the draw changes night to night, "which night" is the decision being
 * made, so picking it also picks the billing and the hours that go with it.
 */
export function Reserva() {
  const { nightOf } = useProgram();
  const today = useMemo(() => todayISOInArgentina(), []);

  const nights = useMemo(
    () =>
      Array.from({ length: 7 }, (_, offset) => {
        const iso = addDays(today, offset);
        const weekday = weekdayOfISO(iso);
        return {
          iso,
          weekday,
          long: WEEK.find((d) => d.index === weekday)?.long ?? "",
        };
      }),
    [today],
  );

  const [iso, setIso] = useState(nights[0].iso);
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [party, setParty] = useState(PARTY[0]);
  const [sent, setSent] = useState(false);

  const weekday = weekdayOfISO(iso);
  const shifts = SCHEDULE[weekday] ?? [];
  const slots = useMemo(() => slotsOf(shifts), [shifts]);
  const billing = nightOf(weekday);
  const chosen = nights.find((night) => night.iso === iso);

  const pickNight = useCallback((next: string) => {
    setIso(next);
    setTime("");
    setSent(false);
  }, []);

  return (
    <div className={styles.reserva}>
      <form
        className={styles.form}
        onSubmit={(event) => {
          event.preventDefault();
          setSent(true);
        }}
      >
        <div className={styles.field}>
          <label className={styles.label} htmlFor="noche">
            Qué noche
          </label>
          <select
            id="noche"
            className={styles.control}
            value={iso}
            onChange={(event) => pickNight(event.target.value)}
          >
            {nights.map((night, index) => (
              <option key={night.iso} value={night.iso}>
                {index === 0 ? "Hoy" : night.long} {formatISO(night.iso)}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.fieldPair}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="hora">
              A qué hora
            </label>
            <select
              id="hora"
              className={styles.control}
              value={time}
              required
              onChange={(event) => {
                setTime(event.target.value);
                setSent(false);
              }}
            >
              <option value="">Elegir</option>
              {slots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="personas">
              Cuántos son
            </label>
            <select
              id="personas"
              className={styles.control}
              value={party}
              onChange={(event) => setParty(event.target.value)}
            >
              {PARTY.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="nombre">
            A nombre de
          </label>
          <input
            id="nombre"
            className={styles.control}
            value={name}
            required
            placeholder="Tu nombre"
            onChange={(event) => {
              setName(event.target.value);
              setSent(false);
            }}
          />
        </div>

        <button type="submit" className={styles.submit}>
          Reservar mesa
        </button>

        <p className={styles.formNote} role="status">
          {sent
            ? "Vista previa: esta reserva no salió de tu navegador. En la versión real le llega al local con la noche y la hora ya cargadas."
            : "Prototipo de demostración: la reserva es una simulación y no llega al local."}
        </p>
      </form>

      <aside className={styles.ticket} aria-live="polite">
        <p className={styles.ticketDay}>
          {chosen && chosen.iso === nights[0].iso ? "Hoy" : chosen?.long}
        </p>
        <p className={styles.ticketTitle}>{billing.title}</p>
        <p className={styles.ticketNote}>{billing.note}</p>
        <dl className={styles.ticketMeta}>
          <div>
            <dt>Puertas</dt>
            <dd>{shifts.map(shiftLabel).join(" / ")}</dd>
          </div>
          <div>
            <dt>Mesa</dt>
            <dd>{party} personas</dd>
          </div>
          <div>
            <dt>Hora</dt>
            <dd>{time || "sin elegir"}</dd>
          </div>
        </dl>
        {isLongNight(shifts) ? (
          <p className={styles.ticketLate}>Noche larga: la barra sigue hasta las 03:00.</p>
        ) : null}
      </aside>
    </div>
  );
}
