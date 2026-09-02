// Confirmed schedule per the lead's Maps data (the one number Nivaror can
// stand behind): Mon-Fri 07:00-22:00, Sat-Sun 10:00-22:00. Independent
// implementation for this prototype (per prototype-workflow.md's reuse rule:
// the pattern is reused freely across gym prototypes, but each is written
// fresh, never copied from a sibling's hours.ts). Ninth reimplementation in
// this sector, and the first written specifically to be the single source of
// truth in a page whose whole pitch is resolving a real Instagram/Maps
// mismatch, not just displaying hours.

export type DayCode = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export interface DaySchedule {
  code: DayCode;
  label: string;
  shortLabel: string;
  opensAt: string;
  closesAt: string;
}

export const WEEK_SCHEDULE: DaySchedule[] = [
  { code: "mon", label: "Lunes", shortLabel: "Lun", opensAt: "07:00", closesAt: "22:00" },
  { code: "tue", label: "Martes", shortLabel: "Mar", opensAt: "07:00", closesAt: "22:00" },
  { code: "wed", label: "Miércoles", shortLabel: "Mié", opensAt: "07:00", closesAt: "22:00" },
  { code: "thu", label: "Jueves", shortLabel: "Jue", opensAt: "07:00", closesAt: "22:00" },
  { code: "fri", label: "Viernes", shortLabel: "Vie", opensAt: "07:00", closesAt: "22:00" },
  { code: "sat", label: "Sábado", shortLabel: "Sáb", opensAt: "10:00", closesAt: "22:00" },
  { code: "sun", label: "Domingo", shortLabel: "Dom", opensAt: "10:00", closesAt: "22:00" },
];

// JS Date#getDay(): 0 = Sunday ... 6 = Saturday
const JS_DAY_TO_SCHEDULE_INDEX = [6, 0, 1, 2, 3, 4, 5];
const TIMEZONE = "America/Argentina/Buenos_Aires";

function toArgentinaTime(now: Date): Date {
  return new Date(now.toLocaleString("en-US", { timeZone: TIMEZONE }));
}

function toDecimalHour(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h + m / 60;
}

export interface LiveStatus {
  isOpen: boolean;
  label: string;
  detail: string;
  today: DaySchedule;
}

export function getLiveStatus(now: Date = new Date()): LiveStatus {
  const argNow = toArgentinaTime(now);
  const today = WEEK_SCHEDULE[JS_DAY_TO_SCHEDULE_INDEX[argNow.getDay()]];
  const hour = argNow.getHours() + argNow.getMinutes() / 60;

  const isOpen = hour >= toDecimalHour(today.opensAt) && hour < toDecimalHour(today.closesAt);

  if (isOpen) {
    return { isOpen: true, label: "Abierto ahora", detail: `Cierra a las ${today.closesAt}`, today };
  }

  if (hour < toDecimalHour(today.opensAt)) {
    return { isOpen: false, label: "Cerrado ahora", detail: `Abre hoy a las ${today.opensAt}`, today };
  }

  const argTomorrow = new Date(argNow);
  argTomorrow.setDate(argNow.getDate() + 1);
  const tomorrow = WEEK_SCHEDULE[JS_DAY_TO_SCHEDULE_INDEX[argTomorrow.getDay()]];
  return { isOpen: false, label: "Cerrado ahora", detail: `Abre mañana a las ${tomorrow.opensAt}`, today };
}
