"use client";

import { useSyncExternalStore } from "react";
import { getOpenStatus, HOURS_DISPLAY } from "@/lib/hours";

// Subscribes to a value that only ever changes with the clock: re-check
// every minute. useSyncExternalStore (React stdlib, no new dependency)
// keeps this SSR-safe without the set-state-in-effect footgun a plain
// useEffect + useState pair would hit for a value that ticks over time.
function subscribe(callback: () => void) {
  const id = setInterval(callback, 60_000);
  return () => clearInterval(id);
}

function getSnapshot(): "open" | "closed" {
  return getOpenStatus().isOpen ? "open" : "closed";
}

function getServerSnapshot(): "pending" {
  return "pending";
}

export default function OpenStatusBadge({ withHours = false }: { withHours?: boolean }) {
  const status = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (status === "pending") {
    return <span className="status-pill status-pill--pending">Horario</span>;
  }

  const isOpen = status === "open";

  return (
    <span className={`status-pill ${isOpen ? "status-pill--open" : "status-pill--closed"}`}>
      <span className="status-pill__dot" aria-hidden="true" />
      {isOpen ? "Abierto ahora" : "Cerrado ahora"}
      {withHours ? <span className="status-pill__hours"> · {HOURS_DISPLAY}</span> : null}
    </span>
  );
}
