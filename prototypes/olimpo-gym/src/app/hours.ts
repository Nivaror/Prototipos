/**
 * Confirmed schedule from the Google Maps listing: split weekday shifts,
 * 7:00-12:00 and 16:00-21:30 Mon-Fri; Saturday 10:00-12:00 only; closed Sunday.
 * Independent reimplementation of the open/closed pattern used elsewhere in
 * this sector (see market/sectors/gimnasios.md) — this schedule has two
 * shifts per weekday, which neither dein-ziel's nor qualis-gym's version needs.
 */
export type Shift = { from: number; to: number };
export type DayInfo = { index: number; short: string; long: string; shifts: Shift[] };

const toMin = (h: number, m: number) => h * 60 + m;

const WEEKDAY_SHIFTS: Shift[] = [
  { from: toMin(7, 0), to: toMin(12, 0) },
  { from: toMin(16, 0), to: toMin(21, 30) },
];
const SATURDAY_SHIFTS: Shift[] = [{ from: toMin(10, 0), to: toMin(12, 0) }];

/** Index matches Date#getDay(): 0 = Sunday. */
export const WEEK: DayInfo[] = [
  { index: 1, short: "Lun", long: "Lunes", shifts: WEEKDAY_SHIFTS },
  { index: 2, short: "Mar", long: "Martes", shifts: WEEKDAY_SHIFTS },
  { index: 3, short: "Mié", long: "Miércoles", shifts: WEEKDAY_SHIFTS },
  { index: 4, short: "Jue", long: "Jueves", shifts: WEEKDAY_SHIFTS },
  { index: 5, short: "Vie", long: "Viernes", shifts: WEEKDAY_SHIFTS },
  { index: 6, short: "Sáb", long: "Sábado", shifts: SATURDAY_SHIFTS },
  { index: 0, short: "Dom", long: "Domingo", shifts: [] },
];

export function fmt(minutes: number) {
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

const TZ = "America/Argentina/Buenos_Aires";

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

/** Live open/closed status, aware of the midday gap between the two weekday shifts. */
export function currentStatus(weekday: number, minutes: number) {
  const today = WEEK.find((d) => d.index === weekday)!;
  const activeShift = today.shifts.find((s) => minutes >= s.from && minutes < s.to);
  if (activeShift) return { open: true as const, until: fmt(activeShift.to) };

  const nextShiftToday = today.shifts.find((s) => minutes < s.from);
  if (nextShiftToday) return { open: false as const, when: "hoy", at: fmt(nextShiftToday.from) };

  for (let step = 1; step <= 7; step++) {
    const day = WEEK.find((d) => d.index === (weekday + step) % 7)!;
    if (day.shifts.length) {
      return {
        open: false as const,
        when: step === 1 ? "mañana" : day.long.toLowerCase(),
        at: fmt(day.shifts[0].from),
      };
    }
  }
  return { open: false as const, when: "", at: "" };
}

export const ADDRESS = "Av. Alberdi 727, Rosario, Santa Fe";
export const RATING = { value: "4,9", count: 47 };
export const FACEBOOK_URL = "https://m.facebook.com/olimporosario.gym";
export const MAPS_URL =
  "https://www.google.com/maps/place/?q=place_id:ChIJyVesj1tTtpUR7MfpsXq_7ck";
