// Weekly schedule for Gimnasio Zona Norte, confirmed from Google Maps listing.
// Independent implementation for this prototype (not copied from a sibling gym
// prototype's hours.ts), normalized to Argentina wall-clock time so a viewer's
// local device clock/timezone never affects the "open now" read.

export type DayBlock = { open: number; close: number } | null; // hour-of-day, 24h, null = closed

// Index 0 = Sunday ... 6 = Saturday, matching Date#getDay().
export const SCHEDULE: DayBlock[] = [
  null, // Sunday: closed
  { open: 9, close: 21 }, // Monday
  { open: 9, close: 21 }, // Tuesday
  { open: 9, close: 21 }, // Wednesday
  { open: 9, close: 21 }, // Thursday
  { open: 9, close: 21 }, // Friday
  { open: 9, close: 19 }, // Saturday
];

export const DAY_LABELS = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
];

// Typical Saturday close time for other gyms in this batch (sector research,
// see market/sectors/gimnasios.md): most close early-to-mid afternoon.
export const PEER_SATURDAY_CLOSE = 14;

// Timeline scale used by the hours bar chart (HoursSection).
export const SCALE_START = 6;
export const SCALE_END = 22;

export function toPercent(hour: number): number {
  return ((hour - SCALE_START) / (SCALE_END - SCALE_START)) * 100;
}

function nowInArgentina(): { day: number; hour: number; minute: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Argentina/Buenos_Aires",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(new Date());

  const weekdayShort = parts.find((p) => p.type === "weekday")?.value ?? "Sun";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  const map: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  return { day: map[weekdayShort] ?? 0, hour: hour === 24 ? 0 : hour, minute };
}

export function getLiveStatus(): {
  isOpen: boolean;
  label: string;
  day: number;
} {
  const { day, hour, minute } = nowInArgentina();
  const block = SCHEDULE[day];
  if (!block) return { isOpen: false, label: "Cerrado hoy", day };

  const minutesNow = hour * 60 + minute;
  const isOpen = minutesNow >= block.open * 60 && minutesNow < block.close * 60;

  if (isOpen) {
    return { isOpen: true, label: `Abierto hasta las ${block.close}:00`, day };
  }
  if (minutesNow < block.open * 60) {
    return { isOpen: false, label: `Abre a las ${block.open}:00`, day };
  }
  return { isOpen: false, label: "Cerrado ahora", day };
}
