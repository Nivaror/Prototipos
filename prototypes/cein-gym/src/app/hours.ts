// Weekday-only schedule: Monday-Friday 07:00-21:00, closed Saturday and Sunday.
// Independent implementation for this prototype (per prototype-workflow.md's
// reuse rule: logic pattern reused freely across prototypes, but written fresh
// each time, never copied from a sibling gym prototype's hours.ts).

export type DayCode = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export interface DaySchedule {
  code: DayCode;
  label: string;
  shortLabel: string;
  open: boolean;
  opensAt?: string;
  closesAt?: string;
}

const OPEN_HOUR = 7;
const CLOSE_HOUR = 21;

export const WEEK_SCHEDULE: DaySchedule[] = [
  { code: "mon", label: "Lunes", shortLabel: "L", open: true, opensAt: "07:00", closesAt: "21:00" },
  { code: "tue", label: "Martes", shortLabel: "M", open: true, opensAt: "07:00", closesAt: "21:00" },
  { code: "wed", label: "Miércoles", shortLabel: "X", open: true, opensAt: "07:00", closesAt: "21:00" },
  { code: "thu", label: "Jueves", shortLabel: "J", open: true, opensAt: "07:00", closesAt: "21:00" },
  { code: "fri", label: "Viernes", shortLabel: "V", open: true, opensAt: "07:00", closesAt: "21:00" },
  { code: "sat", label: "Sábado", shortLabel: "S", open: false },
  { code: "sun", label: "Domingo", shortLabel: "D", open: false },
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
// timezone, so the live status is correct for CEIN's real location even if
// the demo is opened from outside Argentina.
function toArgentinaTime(now: Date): Date {
  return new Date(now.toLocaleString("en-US", { timeZone: TIMEZONE }));
}

export function getLiveStatus(now: Date = new Date()): LiveStatus {
  const argNow = toArgentinaTime(now);
  const today = WEEK_SCHEDULE[JS_DAY_TO_SCHEDULE_INDEX[argNow.getDay()]];
  const hour = argNow.getHours() + argNow.getMinutes() / 60;

  if (today.open && hour >= OPEN_HOUR && hour < CLOSE_HOUR) {
    return {
      isOpen: true,
      label: "Abierto ahora",
      detail: `Cierra hoy a las ${today.closesAt}`,
    };
  }

  const next = getNextOpenDay(now);
  return {
    isOpen: false,
    label: "Cerrado ahora",
    detail: next,
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
