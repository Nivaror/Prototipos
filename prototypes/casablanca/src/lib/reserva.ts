import { OPEN_MIN, TIMEZONE, minutesOf } from "./hours";

// Bar is open ~08:00 to ~01:00 (crossing midnight), but the picker only
// offers slots up to 23:30 same-day — booking the 00:00-01:00 tail adds
// date-wraparound complexity for a handful of late slots nobody actually
// requests in a reservation. Same "no invented precision" discipline as the
// rest of the sector's hours.ts implementations.
const SLOT_STEP = 30;
const LAST_SLOT_START = 23 * 60 + 30;

const WEEKDAYS = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];

export type DateOption = { iso: string; label: string };

function argDateParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  return { year: get("year"), month: get("month"), day: get("day") };
}

export function todayISO(date: Date = new Date()): string {
  const { year, month, day } = argDateParts(date);
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function nextDays(count = 7, from: Date = new Date()): DateOption[] {
  const { year, month, day } = argDateParts(from);
  const anchor = new Date(Date.UTC(year, month - 1, day));
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(anchor);
    d.setUTCDate(d.getUTCDate() + i);
    const iso = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
    const label = i === 0 ? "Hoy" : i === 1 ? "Mañana" : `${WEEKDAYS[d.getUTCDay()]} ${d.getUTCDate()}`;
    return { iso, label };
  });
}

function formatSlot(minute: number): string {
  const h = Math.floor(minute / 60);
  const m = minute % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function slotsForDate(iso: string, now: Date = new Date()): string[] {
  const isToday = iso === todayISO(now);
  const nowMinute = minutesOf(now);
  const start =
    isToday && nowMinute >= OPEN_MIN ? Math.ceil(nowMinute / SLOT_STEP) * SLOT_STEP : OPEN_MIN;

  const slots: string[] = [];
  for (let m = start; m <= LAST_SLOT_START; m += SLOT_STEP) {
    slots.push(formatSlot(m));
  }
  return slots;
}

export type ReservaInput = { name: string; partySize: number };
export type ReservaResult = { ok: true } | { ok: false; error: string };

export function validateReserva({ name, partySize }: ReservaInput): ReservaResult {
  if (!name.trim()) return { ok: false, error: "Falta el nombre." };
  if (partySize < 1 || partySize > 12) {
    return { ok: false, error: "La mesa es para entre 1 y 12 personas." };
  }
  return { ok: true };
}
