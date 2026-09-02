// Mon-Fri 06:00-21:00, Sat 06:00-20:00, Sun split into two shifts (09:00-12:00
// and 17:00-20:00). Independent implementation for this prototype (per
// prototype-workflow.md's reuse rule: the pattern is reused freely across
// gym prototypes, but each one is written fresh, never copied from a
// sibling's hours.ts). This is the first in the sector to model a day as a
// list of shifts rather than a single open/close pair, since every prior
// gym in this sector has at most one shift per day.

export type DayCode = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export interface Shift {
  opensAt: string;
  closesAt: string;
}

export interface DaySchedule {
  code: DayCode;
  label: string;
  shortLabel: string;
  shifts: Shift[];
}

export const WEEK_SCHEDULE: DaySchedule[] = [
  { code: "mon", label: "Lunes", shortLabel: "Lun", shifts: [{ opensAt: "06:00", closesAt: "21:00" }] },
  { code: "tue", label: "Martes", shortLabel: "Mar", shifts: [{ opensAt: "06:00", closesAt: "21:00" }] },
  { code: "wed", label: "Miércoles", shortLabel: "Mié", shifts: [{ opensAt: "06:00", closesAt: "21:00" }] },
  { code: "thu", label: "Jueves", shortLabel: "Jue", shifts: [{ opensAt: "06:00", closesAt: "21:00" }] },
  { code: "fri", label: "Viernes", shortLabel: "Vie", shifts: [{ opensAt: "06:00", closesAt: "21:00" }] },
  { code: "sat", label: "Sábado", shortLabel: "Sáb", shifts: [{ opensAt: "06:00", closesAt: "20:00" }] },
  {
    code: "sun",
    label: "Domingo",
    shortLabel: "Dom",
    shifts: [
      { opensAt: "09:00", closesAt: "12:00" },
      { opensAt: "17:00", closesAt: "20:00" },
    ],
  },
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
  todayShifts: Shift[];
}

export function getLiveStatus(now: Date = new Date()): LiveStatus {
  const argNow = toArgentinaTime(now);
  const today = WEEK_SCHEDULE[JS_DAY_TO_SCHEDULE_INDEX[argNow.getDay()]];
  const hour = argNow.getHours() + argNow.getMinutes() / 60;

  const activeShift = today.shifts.find(
    (s) => hour >= toDecimalHour(s.opensAt) && hour < toDecimalHour(s.closesAt),
  );

  if (activeShift) {
    return {
      isOpen: true,
      label: "Abierto ahora",
      detail: `Cierra a las ${activeShift.closesAt}`,
      todayShifts: today.shifts,
    };
  }

  const upcomingToday = today.shifts.find((s) => hour < toDecimalHour(s.opensAt));
  if (upcomingToday) {
    return {
      isOpen: false,
      label: "Cerrado ahora",
      detail: `Abre hoy a las ${upcomingToday.opensAt}`,
      todayShifts: today.shifts,
    };
  }

  return {
    isOpen: false,
    label: "Cerrado ahora",
    detail: getNextOpenDay(now),
    todayShifts: today.shifts,
  };
}

function getNextOpenDay(now: Date): string {
  const argNow = toArgentinaTime(now);
  for (let offset = 1; offset <= 7; offset++) {
    const d = new Date(argNow);
    d.setDate(argNow.getDate() + offset);
    const sched = WEEK_SCHEDULE[JS_DAY_TO_SCHEDULE_INDEX[d.getDay()]];
    const dayWord = offset === 1 ? "mañana" : sched.label.toLowerCase();
    return `Abre ${dayWord} a las ${sched.shifts[0].opensAt}`;
  }
  return "Consultá el próximo horario";
}
