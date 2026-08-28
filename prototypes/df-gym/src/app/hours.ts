// DF-Centro de entrenamiento hours: Mon-Fri 06:00-20:30 (early open), Saturday
// 08:30-13:00, Sunday closed. Independent implementation for this prototype
// (per prototype-workflow.md's reuse rule: the live-status pattern is reused
// freely across prototypes, but written fresh every time, never copied from
// a sibling gym prototype's hours.ts).

export type DayCode = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export interface DaySchedule {
  code: DayCode;
  label: string;
  open: boolean;
  opensAt?: string;
  closesAt?: string;
}

export const WEEK_SCHEDULE: DaySchedule[] = [
  { code: "mon", label: "Lunes", open: true, opensAt: "06:00", closesAt: "20:30" },
  { code: "tue", label: "Martes", open: true, opensAt: "06:00", closesAt: "20:30" },
  { code: "wed", label: "Miércoles", open: true, opensAt: "06:00", closesAt: "20:30" },
  { code: "thu", label: "Jueves", open: true, opensAt: "06:00", closesAt: "20:30" },
  { code: "fri", label: "Viernes", open: true, opensAt: "06:00", closesAt: "20:30" },
  { code: "sat", label: "Sábado", open: true, opensAt: "08:30", closesAt: "13:00" },
  { code: "sun", label: "Domingo", open: false },
];

// JS Date#getDay(): 0 = Sunday ... 6 = Saturday
const JS_DAY_TO_SCHEDULE_INDEX = [6, 0, 1, 2, 3, 4, 5];

export interface LiveStatus {
  isOpen: boolean;
  label: string;
  detail: string;
}

const TIMEZONE = "America/Argentina/Buenos_Aires";

// Shift `now` into Argentina wall-clock time regardless of the viewer's own
// timezone, so the live status is correct for DF's real location even if the
// demo link is opened from outside Argentina.
function toArgentinaTime(now: Date): Date {
  return new Date(now.toLocaleString("en-US", { timeZone: TIMEZONE }));
}

function rangeForDay(day: DaySchedule): [number, number] | null {
  if (!day.open || !day.opensAt || !day.closesAt) return null;
  const [oh, om] = day.opensAt.split(":").map(Number);
  const [ch, cm] = day.closesAt.split(":").map(Number);
  return [oh + om / 60, ch + cm / 60];
}

export function getLiveStatus(now: Date = new Date()): LiveStatus {
  const argNow = toArgentinaTime(now);
  const today = WEEK_SCHEDULE[JS_DAY_TO_SCHEDULE_INDEX[argNow.getDay()]];
  const hour = argNow.getHours() + argNow.getMinutes() / 60;
  const range = rangeForDay(today);

  if (range && hour >= range[0] && hour < range[1]) {
    return {
      isOpen: true,
      label: "Abierto ahora",
      detail: `Cierra hoy a las ${today.closesAt}`,
    };
  }

  if (today.open && range && hour < range[0]) {
    return {
      isOpen: false,
      label: "Cerrado ahora",
      detail: `Abre hoy a las ${today.opensAt}`,
    };
  }

  return {
    isOpen: false,
    label: "Cerrado ahora",
    detail: getNextOpenDay(now),
  };
}

function getNextOpenDay(now: Date): string {
  const argNow = toArgentinaTime(now);
  for (let offset = 1; offset <= 7; offset++) {
    const d = new Date(argNow);
    d.setDate(argNow.getDate() + offset);
    const sched = WEEK_SCHEDULE[JS_DAY_TO_SCHEDULE_INDEX[d.getDay()]];
    if (sched.open) {
      const dayWord = offset === 1 ? "mañana" : sched.label.toLowerCase();
      return `Abre ${dayWord} a las ${sched.opensAt}`;
    }
  }
  return "Consultá el próximo horario";
}
