// Three-window reservation logic for Puerto Pichón, written fresh for this
// lead. Not a fork of mapu-rosario's lib/windows.ts (tabbed segmented-control
// model) or escauriza's lib/reservation.ts (staggered-card-stack model) - this
// prototype's booking flow is an accordion, and derives each window's slot
// range from the venue's real per-day hours instead of a fixed hour block.

import { DayIndex, hoursForDay } from "./hours";

export type WindowId = "brunch" | "almuerzo" | "cena";

export interface WindowDef {
  id: WindowId;
  label: string;
  description: string;
}

export const WINDOWS: WindowDef[] = [
  {
    id: "brunch",
    label: "Brunch",
    description: "Café, tostados y algo dulce para arrancar el día.",
  },
  {
    id: "almuerzo",
    label: "Almuerzo",
    description: "El mediodía de siempre, con la parrilla ya prendida.",
  },
  {
    id: "cena",
    label: "Cena",
    description: "Parrilla, vinos y sobremesa larga.",
  },
];

const BRUNCH_END = 12 * 60;
const ALMUERZO_END = 16 * 60;
const CENA_START = 20 * 60;

export interface SlotRange {
  startMin: number;
  endMin: number;
}

/**
 * Derives a window's bookable range from the venue's real hours for that
 * day, rather than a fixed block - honest about days where a window doesn't
 * apply (e.g. no cena Sunday/Monday, since the venue closes at 16:00).
 */
export function windowRangeForDay(windowId: WindowId, day: DayIndex): SlotRange | null {
  const { openMin, closeMin } = hoursForDay(day);

  if (windowId === "brunch") {
    const end = Math.min(BRUNCH_END, closeMin);
    return openMin < end ? { startMin: openMin, endMin: end } : null;
  }

  if (windowId === "almuerzo") {
    const start = Math.max(openMin, BRUNCH_END);
    const end = Math.min(ALMUERZO_END, closeMin);
    return start < end ? { startMin: start, endMin: end } : null;
  }

  // cena
  const start = Math.max(openMin, CENA_START);
  return start < closeMin ? { startMin: start, endMin: closeMin } : null;
}

function formatSlot(min: number): string {
  const wrapped = min % 1440;
  const h = Math.floor(wrapped / 60);
  const m = wrapped % 60;
  const base = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  return min >= 1440 ? `${base} (ya sábado noche)` : base;
}

/** 30-minute slot chips inside a window's range, last seating 30min before close. */
export function generateSlots(windowId: WindowId, day: DayIndex): string[] {
  const range = windowRangeForDay(windowId, day);
  if (!range) return [];
  const slots: string[] = [];
  for (let t = range.startMin; t < range.endMin; t += 30) {
    slots.push(formatSlot(t));
  }
  return slots;
}

export const MAX_PARTY_SIZE = 8;
export const MIN_PARTY_SIZE = 1;

export interface ReservaInput {
  date: string; // yyyy-mm-dd
  time: string;
  partySize: number;
  name: string;
}

export interface ReservaErrors {
  date?: string;
  time?: string;
  partySize?: string;
  name?: string;
}

export function validateReserva(input: ReservaInput): ReservaErrors {
  const errors: ReservaErrors = {};

  if (!input.date) errors.date = "Elegí una fecha.";
  if (!input.time) errors.time = "Elegí un horario.";
  if (!input.name.trim()) errors.name = "Contanos a nombre de quién reservamos.";

  if (input.partySize < MIN_PARTY_SIZE) {
    errors.partySize = "Mínimo 1 persona.";
  } else if (input.partySize > MAX_PARTY_SIZE) {
    errors.partySize = `Para ${MAX_PARTY_SIZE}+ personas escribinos por Instagram, te conviene el comedor privado.`;
  }

  return errors;
}
