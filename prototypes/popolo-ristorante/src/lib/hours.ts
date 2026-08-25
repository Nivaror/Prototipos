// Weekly schedule for Popolo Ristorante.
// Source: lead audit (Nivaror Vault /leads/popolo-ristorante.md) - dinner-focused
// most nights, closed Wednesday, plus weekend lunch. No exact clock times were
// found in the source, so this describes service windows, not hours, on purpose.

export type DayInfo = {
  /** JS Date.getDay() index: 0 = Sunday ... 6 = Saturday */
  index: number;
  label: string;
  short: string;
  closed: boolean;
  service: string;
};

export const WEEK: DayInfo[] = [
  { index: 1, label: "Lunes", short: "LUN", closed: false, service: "Cena" },
  { index: 2, label: "Martes", short: "MAR", closed: false, service: "Cena" },
  { index: 3, label: "Miércoles", short: "MIÉ", closed: true, service: "Cerrado" },
  { index: 4, label: "Jueves", short: "JUE", closed: false, service: "Cena" },
  { index: 5, label: "Viernes", short: "VIE", closed: false, service: "Cena" },
  { index: 6, label: "Sábado", short: "SÁB", closed: false, service: "Almuerzo y cena" },
  { index: 0, label: "Domingo", short: "DOM", closed: false, service: "Almuerzo y cena" },
];

export function todayIndex(): number {
  return new Date().getDay();
}

export function isClosedDay(dateISO: string): boolean {
  if (!dateISO) return false;
  // Parse as local date (avoid UTC shift from `new Date("YYYY-MM-DD")`).
  const [y, m, d] = dateISO.split("-").map(Number);
  const date = new Date(y, (m ?? 1) - 1, d ?? 1);
  return date.getDay() === 3;
}

const DINNER_SLOTS = ["20:00", "20:30", "21:00", "21:30", "22:00", "22:30"];
const WEEKEND_LUNCH_SLOTS = ["12:30", "13:00", "13:30", "14:00"];

/** Time slots offered for a given date: dinner every open day, plus lunch on weekends. */
export function timeSlots(dateISO: string): string[] {
  if (!dateISO || isClosedDay(dateISO)) return [];
  const [y, m, d] = dateISO.split("-").map(Number);
  const day = new Date(y, (m ?? 1) - 1, d ?? 1).getDay();
  const isWeekend = day === 0 || day === 6;
  return isWeekend ? [...WEEKEND_LUNCH_SLOTS, ...DINNER_SLOTS] : DINNER_SLOTS;
}
