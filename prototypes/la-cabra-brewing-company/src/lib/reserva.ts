// Reservation slot generation for La Cabra. Unlike the sector's siblings
// (mapu/puerto-pichon's three fixed windows, cuervo-blanco/rosarigasino's
// single fixed window), this lead genuinely has two shifts a day, so the
// reservation flow surfaces both real ones instead of one and lets the
// visitor pick which shift they mean, tying the booking flow directly to
// the split-schedule problem instead of treating it as unrelated.
import {
  MORNING_OPEN,
  MORNING_CLOSE,
  EVENING_OPEN,
  EVENING_CLOSE,
  isOpenDay,
} from "./hours";

export const MIN_PARTY = 1;
export const MAX_PARTY = 8;

export function isValidParty(n: number): boolean {
  return Number.isInteger(n) && n >= MIN_PARTY && n <= MAX_PARTY;
}

function fmt(totalMin: number): string {
  const h = Math.floor(totalMin / 60) % 24;
  const m = totalMin % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

// Slots every 30 min, stopping 30 min before the shift's own close so the
// last reservation isn't seated at closing time.
function slotsBetween(open: number, close: number): string[] {
  const slots: string[] = [];
  for (let t = open; t < close - 30; t += 30) slots.push(fmt(t));
  return slots;
}

export function shiftsForDate(dateISO: string): {
  manana: string[];
  tarde: string[];
} {
  const day = new Date(`${dateISO}T12:00:00`).getDay();
  if (!isOpenDay(day)) return { manana: [], tarde: [] };
  return {
    manana: slotsBetween(MORNING_OPEN, MORNING_CLOSE),
    tarde: slotsBetween(EVENING_OPEN, EVENING_CLOSE),
  };
}
