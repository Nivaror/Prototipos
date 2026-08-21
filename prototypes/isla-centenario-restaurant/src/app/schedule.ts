/**
 * Weekly-schedule helpers shared by the restaurant prototypes. Each business
 * supplies its own SCHEDULE in ./hours.ts and passes it in, so this file stays
 * pure and its check script can run it straight through node.
 *
 * Shifts are minutes from midnight of their OWN day, so a night ending at 2 AM
 * is stored as 26 * 60 and "still open from yesterday" needs no date maths.
 */
export type Shift = { from: number; to: number };
export type Schedule = Record<number, Shift[]>;

export const h = (hour: number, min = 0) => hour * 60 + min;

export const WEEK = [
  { index: 1, short: "Lun", long: "lunes" },
  { index: 2, short: "Mar", long: "martes" },
  { index: 3, short: "Mié", long: "miércoles" },
  { index: 4, short: "Jue", long: "jueves" },
  { index: 5, short: "Vie", long: "viernes" },
  { index: 6, short: "Sáb", long: "sábado" },
  { index: 0, short: "Dom", long: "domingo" },
];

/** "19:00" / "02:00" — minutes past 1440 wrap into the next morning. */
export function fmt(minutes: number) {
  const m = minutes % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

export function shiftLabel(s: Shift) {
  return `${fmt(s.from)}–${fmt(s.to)}`;
}

export function isLate(s: Shift) {
  return s.to > 1440;
}

/** Open now, counting last night's shift if it is still running this morning. */
export function isOpenAt(schedule: Schedule, weekday: number, minutes: number) {
  const today = schedule[weekday] ?? [];
  if (today.some((s) => minutes >= s.from && minutes < s.to)) return true;
  const yesterday = schedule[(weekday + 6) % 7] ?? [];
  return yesterday.some((s) => s.to > 1440 && minutes + 1440 < s.to);
}

/** The next shift starting after `minutes` today, else the next open day's first. */
export function nextOpening(schedule: Schedule, weekday: number, minutes: number) {
  const later = (schedule[weekday] ?? []).find((s) => s.from > minutes);
  if (later) return { when: "hoy", at: fmt(later.from) };
  for (let step = 1; step <= 7; step++) {
    const day = (weekday + step) % 7;
    const first = (schedule[day] ?? [])[0];
    if (first) {
      const name = WEEK.find((d) => d.index === day)?.long ?? "";
      return { when: step === 1 ? "mañana" : `el ${name}`, at: fmt(first.from) };
    }
  }
  return { when: "", at: "" };
}

/** When the shift currently running ends, so the page can say "hasta las …". */
export function closesAt(schedule: Schedule, weekday: number, minutes: number) {
  const today = (schedule[weekday] ?? []).find((s) => minutes >= s.from && minutes < s.to);
  if (today) return fmt(today.to);
  const yesterday = (schedule[(weekday + 6) % 7] ?? []).find(
    (s) => s.to > 1440 && minutes + 1440 < s.to,
  );
  return yesterday ? fmt(yesterday.to) : "";
}

export function isOpenDay(schedule: Schedule, weekday: number) {
  return (schedule[weekday] ?? []).length > 0;
}

const TZ = "America/Argentina/Buenos_Aires";

/** Day-of-week and minute-of-day in Argentina, independent of the visitor's clock. */
export function nowInArgentina() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const weekdayMap: Record<string, number> = {
    Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
  };
  const weekday = weekdayMap[parts.find((p) => p.type === "weekday")?.value ?? "Sun"] ?? 0;
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0") % 24;
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  return { weekday, minutes: hour * 60 + minute };
}

export function todayISOInArgentina() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(new Date());
}

export function weekdayOfISO(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).getDay();
}

export function formatISO(iso: string) {
  if (!iso) return iso;
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}
