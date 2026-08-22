"use client";

import { FormEvent, useState } from "react";
import { ArrowSquareOut, CheckCircle, Warning } from "@phosphor-icons/react/dist/ssr";
import { MAPS_URL, SCHEDULE } from "./hours";
import { fmt, formatISO, todayISOInArgentina, weekdayOfISO } from "./schedule";
import styles from "./page.module.css";

type Placed = { name: string; mode: string; date: string; time: string; items: string };

/**
 * Pickup/delivery times come from the real schedule for the chosen day, every
 * 15 minutes, stopping 15 before close. No slot exists when the truck is shut,
 * which is the point — Sunday has no midday, and every day closes 00:30.
 */
function slotsFor(weekday: number) {
  const out: string[] = [];
  for (const shift of SCHEDULE[weekday] ?? []) {
    for (let m = shift.from; m <= shift.to - 15; m += 15) out.push(fmt(m));
  }
  return out;
}

export function Order() {
  const [date, setDate] = useState(todayISOInArgentina());
  const [placed, setPlaced] = useState<Placed | null>(null);
  const [sending, setSending] = useState(false);

  const slots = slotsFor(weekdayOfISO(date));

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (slots.length === 0) return;
    const data = new FormData(event.currentTarget);
    setSending(true);

    window.setTimeout(() => {
      setSending(false);
      setPlaced({
        name: String(data.get("name") ?? ""),
        mode: String(data.get("mode") ?? ""),
        date,
        time: String(data.get("time") ?? ""),
        items: String(data.get("items") ?? ""),
      });
    }, 700);
  }

  if (placed) {
    return (
      <div className={styles.confirm}>
        <CheckCircle size={30} weight="duotone" className={styles.confirmIcon} />
        <p className={styles.confirmTitle}>Pedido tomado, {placed.name}.</p>
        <p className={styles.confirmDetail}>
          {placed.mode} el {formatISO(placed.date)} a las {placed.time}.
        </p>
        {placed.items ? <p className={styles.orderEcho}>“{placed.items}”</p> : null}
        <a className={styles.btnPrimary} href={MAPS_URL} target="_blank" rel="noopener noreferrer">
          Cómo llegar
          <ArrowSquareOut size={17} weight="bold" aria-hidden="true" />
        </a>
        <button type="button" className={styles.btnGhost} onClick={() => setPlaced(null)}>
          Hacer otro pedido
        </button>
        <p className={styles.note}>
          Vista previa: este pedido no salió de tu navegador. En la versión real entra en la
          cola de la cocina con el horario ya reservado.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="name">
          Nombre
        </label>
        <input
          className={styles.input}
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="A nombre de quién"
        />
      </div>

      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="mode">
            Cómo
          </label>
          <select className={styles.input} id="mode" name="mode" defaultValue="Delivery" required>
            <option value="Delivery">Delivery</option>
            <option value="Retiro">Paso a retirar</option>
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="date">
            Día
          </label>
          <input
            className={styles.input}
            id="date"
            name="date"
            type="date"
            required
            value={date}
            min={todayISOInArgentina()}
            onChange={(e) => setDate(e.target.value)}
            aria-describedby="slot-help"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="time">
            Horario
          </label>
          <select
            className={styles.input}
            id="time"
            name="time"
            required
            disabled={slots.length === 0}
            defaultValue={slots[Math.floor(slots.length / 2)] ?? ""}
          >
            {slots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="items">
          Tu pedido
        </label>
        <textarea
          className={styles.input}
          id="items"
          name="items"
          rows={3}
          placeholder="Escribí lo que querés pedir"
        />
      </div>

      {slots.length === 0 ? (
        <p className={styles.error} role="alert">
          <Warning size={16} weight="fill" aria-hidden="true" />
          Ese día no hay servicio en ese horario. Los domingos abrimos solo de noche.
        </p>
      ) : (
        <p className={styles.help} id="slot-help">
          Los horarios que aparecen son los turnos reales de ese día. La carta con precios va
          acá cuando el local la pase — no se inventa nada en esta maqueta.
        </p>
      )}

      <button type="submit" className={styles.btnPrimary} disabled={sending || slots.length === 0}>
        {sending ? "Enviando" : "Enviar pedido"}
      </button>

      <p className={styles.note}>
        Prototipo de demostración: el pedido es una simulación y no llega al local.
      </p>
    </form>
  );
}
