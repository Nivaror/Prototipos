// Real per-day hours for Puerto Pichón, from the Maps scrape
// (raw/maps/Primer_scrappeo_Rosario.md). Saturday crosses midnight,
// so it's stored as minutes past local midnight up to 25:00 (=01:00 next day).
// Written fresh for this lead: a near-24h weekday block plus a genuinely
// different Sat/Sun/Mon shape than casablanca's single continuous 09:00-01:00
// crossing every day, or mapu's flat Wed-Sun 12:00-20:00.

export type DayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday, matches Date#getDay()

export interface DayRange {
  openMin: number; // minutes past local midnight
  closeMin: number; // minutes past local midnight, > 1440 means past midnight
}

const HOURS: Record<DayIndex, DayRange> = {
  0: { openMin: 8 * 60, closeMin: 16 * 60 }, // Domingo 08:00-16:00
  1: { openMin: 9 * 60, closeMin: 16 * 60 }, // Lunes 09:00-16:00
  2: { openMin: 9 * 60, closeMin: 23 * 60 + 30 }, // Martes 09:00-23:30
  3: { openMin: 9 * 60, closeMin: 23 * 60 + 30 }, // Miércoles
  4: { openMin: 9 * 60, closeMin: 23 * 60 + 30 }, // Jueves
  5: { openMin: 9 * 60, closeMin: 23 * 60 + 30 }, // Viernes
  6: { openMin: 8 * 60, closeMin: 25 * 60 }, // Sábado 08:00-01:00 (+1)
};

const DAY_LABELS: Record<DayIndex, string> = {
  0: "domingo",
  1: "lunes",
  2: "martes",
  3: "miércoles",
  4: "jueves",
  5: "viernes",
  6: "sábado",
};

export function hoursForDay(day: DayIndex): DayRange {
  return HOURS[day];
}

export function dayLabel(day: DayIndex): string {
  return DAY_LABELS[day];
}

function fmt(min: number): string {
  const wrapped = min % 1440;
  const h = Math.floor(wrapped / 60);
  const m = wrapped % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function rangeLabel(day: DayIndex): string {
  const { openMin, closeMin } = HOURS[day];
  return `${fmt(openMin)} a ${fmt(closeMin)}`;
}

// Argentina doesn't observe DST, fixed UTC-3 year-round, so this stays
// correct without a timezone library.
function nowInArgentina(): Date {
  const utc = Date.now();
  return new Date(utc - 3 * 60 * 60 * 1000);
}

export interface OpenStatus {
  isOpen: boolean;
  label: string;
}

export function currentStatus(): OpenStatus {
  const now = nowInArgentina();
  const minutesNow = now.getUTCHours() * 60 + now.getUTCMinutes();
  const today = now.getUTCDay() as DayIndex;
  const yesterday = ((today + 6) % 7) as DayIndex;

  const todayRange = HOURS[today];
  const openToday = minutesNow >= todayRange.openMin && minutesNow < todayRange.closeMin;

  // Handle a spillover from yesterday's close crossing past midnight (Saturday -> Sunday).
  const yestRange = HOURS[yesterday];
  const spillover = yestRange.closeMin > 1440 && minutesNow < yestRange.closeMin - 1440;

  if (openToday || spillover) {
    const closeMin = spillover ? yestRange.closeMin - 1440 : todayRange.closeMin;
    return { isOpen: true, label: `Abierto ahora · cierra a las ${fmt(closeMin)}` };
  }

  return { isOpen: false, label: `Cerrado ahora · abre a las ${fmt(todayRange.openMin)}` };
}
