/**
 * Confirmed schedule from the Google Maps listing: Mon-Fri 7:00-21:00,
 * closed Saturday and Sunday. Weekday-only, no split shifts.
 */
export type DayInfo = { index: number; short: string; long: string; open: boolean };

const OPEN_FROM = 7 * 60;
const OPEN_TO = 21 * 60;

/** Index matches Date#getDay(): 0 = Sunday. */
export const WEEK: DayInfo[] = [
  { index: 1, short: "Lun", long: "Lunes", open: true },
  { index: 2, short: "Mar", long: "Martes", open: true },
  { index: 3, short: "Mié", long: "Miércoles", open: true },
  { index: 4, short: "Jue", long: "Jueves", open: true },
  { index: 5, short: "Vie", long: "Viernes", open: true },
  { index: 6, short: "Sáb", long: "Sábado", open: false },
  { index: 0, short: "Dom", long: "Domingo", open: false },
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

/** Live open/closed status plus the next opening, for the hero strip's status line. */
export function currentStatus(weekday: number, minutes: number) {
  const today = WEEK.find((d) => d.index === weekday);
  if (today?.open && minutes >= OPEN_FROM && minutes < OPEN_TO) {
    return { open: true as const, until: fmt(OPEN_TO) };
  }

  if (today?.open && minutes < OPEN_FROM) {
    return { open: false as const, when: "hoy", at: fmt(OPEN_FROM) };
  }

  for (let step = 1; step <= 7; step++) {
    const day = WEEK.find((d) => d.index === (weekday + step) % 7);
    if (day?.open) {
      return {
        open: false as const,
        when: step === 1 ? "mañana" : day.long.toLowerCase(),
        at: fmt(OPEN_FROM),
      };
    }
  }
  return { open: false as const, when: "", at: "" };
}

export const OPEN_LABEL = "7:00 a 21:00";

export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Qualis%20Gym&query_place_id=ChIJb69tj_BTtpURDE7ye0PL-EY";

export const INSTAGRAM_URL = "https://instagram.com/qualis.gym";
