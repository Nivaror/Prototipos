// El Banquete's source data only confirms two facts: closed Sunday, and a
// split lunch/dinner service the rest of the week — no exact clock times.
// We show the two service blocks by name (Mediodía / Noche) rather than
// inventing HH:MM figures the business never gave us.

export type DayKey =
  | "lunes"
  | "martes"
  | "miercoles"
  | "jueves"
  | "viernes"
  | "sabado"
  | "domingo";

export interface DaySchedule {
  key: DayKey;
  label: string;
  short: string;
  closed: boolean;
}

export const WEEK: DaySchedule[] = [
  { key: "lunes", label: "Lunes", short: "LUN", closed: false },
  { key: "martes", label: "Martes", short: "MAR", closed: false },
  { key: "miercoles", label: "Miércoles", short: "MIÉ", closed: false },
  { key: "jueves", label: "Jueves", short: "JUE", closed: false },
  { key: "viernes", label: "Viernes", short: "VIE", closed: false },
  { key: "sabado", label: "Sábado", short: "SÁB", closed: false },
  { key: "domingo", label: "Domingo", short: "DOM", closed: true },
];

// JS getDay(): 0 = Sunday ... 6 = Saturday.
const DAY_INDEX: DayKey[] = [
  "domingo",
  "lunes",
  "martes",
  "miercoles",
  "jueves",
  "viernes",
  "sabado",
];

export function todayKey(date = new Date()): DayKey {
  return DAY_INDEX[date.getDay()];
}
