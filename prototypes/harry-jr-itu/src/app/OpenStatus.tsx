"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

const DAYS = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];
const HOURS_LABEL = "18:30 a 00:30";

function getBuenosAiresParts() {
  const fmt = new Intl.DateTimeFormat("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = fmt.formatToParts(new Date());
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  return { weekday: weekday.toLowerCase(), hour, minute };
}

export function OpenTicket() {
  const [state, setState] = useState<{ isOpen: boolean } | null>(null);

  useEffect(() => {
    const update = () => {
      const { hour, minute } = getBuenosAiresParts();
      const minutesSinceMidnight = hour * 60 + minute;
      const isOpen = minutesSinceMidnight >= 18 * 60 + 30 || minutesSinceMidnight < 30;
      setState({ isOpen });
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.ticket}>
      <span className={styles.ticketDot} data-open={state?.isOpen ? "true" : "false"} />
      <span>
        <span className={styles.ticketLabel}>
          {state ? (state.isOpen ? "Abierto ahora" : "Cerrado ahora") : "Horario"}
        </span>{" "}
        <span className={styles.ticketValue}>· Todos los días {HOURS_LABEL}</span>
      </span>
    </div>
  );
}

export function HoursList() {
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    setToday(getBuenosAiresParts().weekday);
  }, []);

  return (
    <ul className={styles.hoursList}>
      {DAYS.map((day) => (
        <li
          key={day}
          className={styles.hoursRow}
          data-today={day === today ? "true" : "false"}
        >
          <span className={styles.hoursDay}>{day}</span>
          <span>{HOURS_LABEL}</span>
        </li>
      ))}
    </ul>
  );
}
