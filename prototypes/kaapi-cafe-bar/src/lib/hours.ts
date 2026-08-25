// KAAPI - Café Bar hours: Mon-Fri 8-22, Sat 8-14, Sun 8-24 (midnight).
// Independent implementation for this prototype (per reuse-tiers rule:
// logic is fine to reimplement fresh, never copy a sibling's file).

export type DaySchedule = { open: number; close: number } | null; // minutes from 00:00, close=1440 means midnight

// index 0 = Sunday ... 6 = Saturday, matching Date#getDay()
export const WEEK_SCHEDULE: DaySchedule[] = [
  { open: 8 * 60, close: 24 * 60 }, // Sunday 8:00-24:00 (midnight)
  { open: 8 * 60, close: 22 * 60 }, // Monday
  { open: 8 * 60, close: 22 * 60 }, // Tuesday
  { open: 8 * 60, close: 22 * 60 }, // Wednesday
  { open: 8 * 60, close: 22 * 60 }, // Thursday
  { open: 8 * 60, close: 22 * 60 }, // Friday
  { open: 8 * 60, close: 14 * 60 }, // Saturday
];

export const DAY_LABELS = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

function formatMinutes(mins: number): string {
  const h = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  const suffix = h < 12 ? "AM" : "PM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${h12} ${suffix}` : `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function scheduleLabel(day: DaySchedule): string {
  if (!day) return "Cerrado";
  if (day.close === 24 * 60) return `${formatMinutes(day.open)} - 12 AM`;
  return `${formatMinutes(day.open)} - ${formatMinutes(day.close)}`;
}

export function rosarioNow(): Date {
  // Business is in Rosario (America/Argentina/Buenos_Aires, UTC-3, no DST).
  // Read "now" through that timezone rather than the visitor's own, so the
  // schedule is correct for the venue regardless of who's viewing the demo.
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Argentina/Buenos_Aires",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "0";
  return new Date(
    `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}:${get("second")}`
  );
}

export function isOpenAt(date: Date): boolean {
  const day = WEEK_SCHEDULE[date.getDay()];
  if (!day) return false;
  const mins = date.getHours() * 60 + date.getMinutes();
  return mins >= day.open && mins < day.close;
}

export function nextChangeLabel(date: Date): string {
  const today = WEEK_SCHEDULE[date.getDay()];
  const mins = date.getHours() * 60 + date.getMinutes();
  if (today && mins >= today.open && mins < today.close) {
    return `Cierra a las ${formatMinutes(today.close === 24 * 60 ? 0 : today.close)}`;
  }
  // find next open day (including today if before opening)
  if (today && mins < today.open) {
    return `Abre a las ${formatMinutes(today.open)}`;
  }
  for (let i = 1; i <= 7; i++) {
    const idx = (date.getDay() + i) % 7;
    const day = WEEK_SCHEDULE[idx];
    if (day) {
      return `Abre ${DAY_LABELS[idx]} a las ${formatMinutes(day.open)}`;
    }
  }
  return "";
}
