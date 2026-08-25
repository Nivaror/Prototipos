// Reservation-window data for Mapu Rosario's three separate booking windows
// (brunch/almuerzo/cena) — the lead's real gap, per its Google listing's own
// "Planificación" field (reserva recomendada/requerida per window). Slot
// times are illustrative placeholders (the source confirms the windows and
// the day's opening hours, not exact slot granularity) but stay inside the
// confirmed Wed-Sun 12:00-20:00 operating hours.

export type WindowId = "brunch" | "almuerzo" | "cena";

export interface ReservationWindow {
  id: WindowId;
  label: string;
  hours: string;
  description: string;
  slots: string[];
  note?: string;
}

export const WINDOWS: ReservationWindow[] = [
  {
    id: "brunch",
    label: "Desayuno-almuerzo",
    hours: "12:00 a 13:30",
    description: "Café de especialidad y postres caseros para arrancar la tarde en la terraza.",
    slots: ["12:00", "12:30", "13:00", "13:30"],
  },
  {
    id: "almuerzo",
    label: "Almuerzo",
    hours: "13:30 a 16:00",
    description: "Barra de ensaladas y platos del mediodía, con opciones vegetarianas y menú infantil.",
    slots: ["13:30", "14:00", "14:30", "15:00", "15:30"],
  },
  {
    id: "cena",
    label: "Cena",
    hours: "18:00 a 20:00",
    description: "Cócteles de autor y buena cerveza junto a la chimenea, cuando el río se pone lindo.",
    slots: ["18:00", "18:30", "19:00", "19:30"],
    note: "Algunas noches hay música en vivo y presentaciones. La fecha exacta se confirma por Instagram.",
  },
];

export const MIN_GUESTS = 1;
export const MAX_GUESTS = 10;

export interface BookingDraft {
  windowId: WindowId;
  slot: string | null;
  guests: number;
  name: string;
}

export interface ValidationResult {
  ok: boolean;
  error?: string;
}

export function validateBooking(draft: BookingDraft): ValidationResult {
  const window = WINDOWS.find((w) => w.id === draft.windowId);
  if (!window) return { ok: false, error: "Elegí una franja horaria." };
  if (!draft.slot || !window.slots.includes(draft.slot)) {
    return { ok: false, error: "Elegí un horario disponible." };
  }
  if (!Number.isInteger(draft.guests) || draft.guests < MIN_GUESTS || draft.guests > MAX_GUESTS) {
    return { ok: false, error: `La cantidad de personas debe ser entre ${MIN_GUESTS} y ${MAX_GUESTS}.` };
  }
  if (!draft.name.trim()) {
    return { ok: false, error: "Ingresá un nombre para la reserva." };
  }
  return { ok: true };
}

// ponytail: no test runner in this template (throwaway demo, YAGNI) — a
// dev-only assert-based self-check stands in for a unit test.
if (typeof window === "undefined" && process.env.NODE_ENV !== "production") {
  const base: BookingDraft = { windowId: "cena", slot: "18:30", guests: 2, name: "Ana" };
  console.assert(validateBooking(base).ok, "windows.ts self-check: valid draft should pass");
  console.assert(!validateBooking({ ...base, slot: null }).ok, "windows.ts self-check: missing slot should fail");
  console.assert(!validateBooking({ ...base, guests: 0 }).ok, "windows.ts self-check: guests below min should fail");
  console.assert(!validateBooking({ ...base, guests: 99 }).ok, "windows.ts self-check: guests above max should fail");
  console.assert(!validateBooking({ ...base, name: "  " }).ok, "windows.ts self-check: blank name should fail");
}
