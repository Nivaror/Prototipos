"use client";

import { FormEvent, useMemo, useState } from "react";
import { CheckCircle, ChatCircleDots, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { getWeekSlots, REASONS } from "./slots";
import styles from "./page.module.css";

type Step = "picking" | "form" | "submitting" | "confirmed";

export function Booking() {
  const week = useMemo(() => getWeekSlots(), []);
  const [dayIndex, setDayIndex] = useState(0);
  const [time, setTime] = useState<string | null>(null);
  const [step, setStep] = useState<Step>("picking");
  const [name, setName] = useState("");
  const [reason, setReason] = useState(REASONS[0].id);
  const [nameError, setNameError] = useState(false);

  const day = week[dayIndex];

  function pickTime(t: string) {
    setTime(t);
    setStep("form");
  }

  function changeDay(i: number) {
    setDayIndex(i);
    setTime(null);
    setStep("picking");
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (name.trim().length < 2) {
      setNameError(true);
      return;
    }
    setNameError(false);
    setStep("submitting");
    window.setTimeout(() => setStep("confirmed"), 900);
  }

  function startOver() {
    setStep("picking");
    setTime(null);
    setName("");
    setReason(REASONS[0].id);
  }

  if (step === "confirmed" && time) {
    const reasonLabel = REASONS.find((r) => r.id === reason)?.label ?? "";
    return (
      <div className={styles.bookingConfirm}>
        <CheckCircle size={40} weight="fill" className={styles.bookingConfirmIcon} />
        <p className={styles.bookingConfirmTitle}>Turno reservado</p>
        <p className={styles.bookingConfirmDetail}>
          {day.label} {time} hs · {reasonLabel}
        </p>
        <p className={styles.bookingConfirmBody}>
          <ChatCircleDots size={16} weight="regular" className={styles.inlineIcon} />
          Vamos a confirmarte este turno por WhatsApp para coordinar los últimos detalles, sin
          que tengas que iniciar vos la conversación.
        </p>
        <button type="button" className={styles.btnGhost} onClick={startOver}>
          Reservar otro turno
        </button>
      </div>
    );
  }

  return (
    <div className={styles.booking}>
      <div className={styles.dayTabs} role="tablist" aria-label="Elegir día">
        {week.map((d, i) => (
          <button
            key={d.label}
            type="button"
            role="tab"
            aria-selected={i === dayIndex}
            className={`${styles.dayTab} ${i === dayIndex ? styles.dayTabActive : ""}`}
            onClick={() => changeDay(i)}
          >
            {d.shortLabel}
          </button>
        ))}
      </div>

      <div className={styles.timeGrid}>
        {day.slots.map((slot) => (
          <button
            key={slot.time}
            type="button"
            disabled={slot.taken}
            className={`${styles.timeChip} ${time === slot.time ? styles.timeChipActive : ""}`}
            onClick={() => pickTime(slot.time)}
          >
            {slot.time}
          </button>
        ))}
      </div>

      {(step === "form" || step === "submitting") && time && (
        <form className={styles.bookingForm} onSubmit={handleSubmit}>
          <p className={styles.bookingFormLead}>
            {day.label} a las {time} hs
          </p>
          <div className={styles.field}>
            <label htmlFor="booking-name">Nombre</label>
            <input
              id="booking-name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (nameError) setNameError(false);
              }}
              placeholder="Tu nombre"
              disabled={step === "submitting"}
            />
            {nameError && (
              <span className={styles.fieldError}>
                <WarningCircle size={14} weight="fill" />
                Contanos tu nombre para reservar el turno.
              </span>
            )}
          </div>
          <div className={styles.field}>
            <label htmlFor="booking-reason">Motivo</label>
            <select
              id="booking-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              disabled={step === "submitting"}
            >
              {REASONS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className={styles.btnPrimary} disabled={step === "submitting"}>
            {step === "submitting" ? "Confirmando..." : "Confirmar turno"}
          </button>
        </form>
      )}
    </div>
  );
}
