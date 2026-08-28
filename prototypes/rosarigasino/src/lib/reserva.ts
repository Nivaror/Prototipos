// Single dinner-focused reservation flow. Unlike mapu-rosario's tabbed
// three-window flow or puerto-pichon's accordion three-window flow, this
// lead only has one booking need (dinner), so there is deliberately no
// window-switching model here - just validation for one flow.

export const DINNER_SLOTS = ["20:00", "20:30", "21:00", "21:30", "22:00", "22:30"] as const;
export type DinnerSlot = (typeof DINNER_SLOTS)[number];

export type ReservationInput = {
  name: string;
  date: string; // yyyy-mm-dd
  time: string;
  partySize: number;
};

export type ValidationResult = { ok: true } | { ok: false; error: string };

export function validateReservation(input: ReservationInput): ValidationResult {
  if (!input.name.trim()) {
    return { ok: false, error: "Ingresá tu nombre." };
  }
  if (!input.date) {
    return { ok: false, error: "Elegí una fecha." };
  }
  const chosenDate = new Date(`${input.date}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (Number.isNaN(chosenDate.getTime()) || chosenDate < today) {
    return { ok: false, error: "Elegí una fecha válida, a partir de hoy." };
  }
  if (!DINNER_SLOTS.includes(input.time as DinnerSlot)) {
    return { ok: false, error: "Elegí un horario de cena." };
  }
  if (!Number.isInteger(input.partySize) || input.partySize < 1 || input.partySize > 12) {
    return { ok: false, error: "La cantidad de comensales debe ser entre 1 y 12." };
  }
  return { ok: true };
}
