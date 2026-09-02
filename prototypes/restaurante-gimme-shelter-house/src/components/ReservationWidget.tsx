"use client";

import { useMemo, useState } from "react";
import {
  addDaysISO,
  blocksForDate,
  EVENT_TYPES,
  formatDateLabel,
  isClosed,
  PARTY_SIZES,
  todayISO,
  type PartySize,
  type ReservationKind,
} from "@/lib/reservation";
import styles from "./ReservationWidget.module.css";

const NEXT_DAYS = Array.from({ length: 10 }, (_, i) => addDaysISO(todayISO(), i));

export default function ReservationWidget() {
  const [kind, setKind] = useState<ReservationKind>("mesa");
  const [date, setDate] = useState(NEXT_DAYS.find((d) => !isClosed(d)) ?? NEXT_DAYS[0]);
  const [block, setBlock] = useState<string | null>(null);
  const [party, setParty] = useState<PartySize>(2);
  const [eventType, setEventType] = useState<(typeof EVENT_TYPES)[number]>(EVENT_TYPES[0]);
  const [name, setName] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const blocks = useMemo(() => blocksForDate(date), [date]);
  const closed = isClosed(date);

  function handleDateChange(next: string) {
    setDate(next);
    setBlock(null);
    setConfirmed(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (kind === "mesa" && (!block || !name.trim())) return;
    if (kind === "evento" && !name.trim()) return;
    setConfirmed(true);
  }

  if (confirmed) {
    return (
      <div className={styles.card}>
        <div className={styles.confirmed}>
          <span className={styles.confirmedBadge}>Listo</span>
          <p className={styles.confirmedTitle}>
            {kind === "mesa"
              ? `Mesa para ${party} personas`
              : eventType}
          </p>
          <p className={styles.confirmedMeta}>
            {formatDateLabel(date)}
            {block ? ` · ${block === "mediodia" ? "Mediodía" : "Noche"}` : ""}
          </p>
          <p className={styles.confirmedNote}>
            Así de simple sería para tus clientes. Esta es una muestra: la reserva
            real todavía no se envió a ningún lado.
          </p>
          <button
            type="button"
            className={styles.secondaryBtn}
            onClick={() => setConfirmed(false)}
          >
            Ver de nuevo
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className={styles.card} onSubmit={handleSubmit}>
      <div className={styles.tabs} role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={kind === "mesa"}
          className={`${styles.tab} ${kind === "mesa" ? styles.tabActive : ""}`}
          onClick={() => setKind("mesa")}
        >
          Mesa
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={kind === "evento"}
          className={`${styles.tab} ${kind === "evento" ? styles.tabActive : ""}`}
          onClick={() => setKind("evento")}
        >
          Evento / cata
        </button>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="date">
          Fecha
        </label>
        <div className={styles.dateScroller}>
          {NEXT_DAYS.map((d) => {
            const disabled = isClosed(d);
            return (
              <button
                type="button"
                key={d}
                disabled={disabled}
                onClick={() => handleDateChange(d)}
                className={`${styles.dateChip} ${date === d ? styles.dateChipActive : ""}`}
                aria-pressed={date === d}
              >
                {formatDateLabel(d)}
              </button>
            );
          })}
        </div>
        {closed && <p className={styles.helper}>Cerrado los lunes. Elegí otro día.</p>}
      </div>

      {kind === "mesa" ? (
        <>
          <div className={styles.field}>
            <label className={styles.label}>Turno</label>
            <div className={styles.blockRow}>
              {blocks.length === 0 && (
                <p className={styles.helper}>No hay turnos este día.</p>
              )}
              {blocks.map((b) => (
                <button
                  type="button"
                  key={b.id}
                  className={`${styles.blockChip} ${block === b.id ? styles.blockChipActive : ""}`}
                  onClick={() => setBlock(b.id)}
                  aria-pressed={block === b.id}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="party">
              Personas
            </label>
            <select
              id="party"
              className={styles.select}
              value={party}
              onChange={(e) =>
                setParty(
                  (e.target.value === "7+" ? "7+" : Number(e.target.value)) as PartySize
                )
              }
            >
              {PARTY_SIZES.map((p) => (
                <option key={p} value={p}>
                  {p} personas
                </option>
              ))}
            </select>
          </div>
        </>
      ) : (
        <div className={styles.field}>
          <label className={styles.label} htmlFor="eventType">
            Tipo de evento
          </label>
          <select
            id="eventType"
            className={styles.select}
            value={eventType}
            onChange={(e) => setEventType(e.target.value as (typeof EVENT_TYPES)[number])}
          >
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className={styles.field}>
        <label className={styles.label} htmlFor="name">
          Nombre
        </label>
        <input
          id="name"
          className={styles.input}
          placeholder="¿A nombre de quién?"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className={styles.submitBtn}
        disabled={closed || (kind === "mesa" && !block)}
      >
        Confirmar reserva
      </button>
    </form>
  );
}
