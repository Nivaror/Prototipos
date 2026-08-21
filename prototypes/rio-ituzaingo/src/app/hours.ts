/**
 * Confirmed weekly schedule from the Google Maps listing. RIO runs two services
 * most days and the night one crosses midnight (up to 4 AM on Saturday), so a
 * shift is stored in minutes from midnight of its OWN day and may exceed 1440.
 * Monday is closed. Nothing here is inferred — every range is on the listing.
 */
export type Shift = { from: number; to: number };

const h = (hour: number, min = 0) => hour * 60 + min;

/** Index matches Date#getDay(): 0 = Sunday. */
export const SCHEDULE: Record<number, Shift[]> = {
  0: [{ from: h(11), to: h(16) }, { from: h(19), to: h(24) }],          // Dom
  1: [],                                                                 // Lun cerrado
  2: [{ from: h(11), to: h(15, 30) }],                                   // Mar
  3: [{ from: h(11), to: h(15, 30) }, { from: h(19), to: h(26) }],       // Mié → 2 AM
  4: [{ from: h(11), to: h(15, 30) }, { from: h(19), to: h(26) }],       // Jue → 2 AM
  5: [{ from: h(11), to: h(15, 30) }, { from: h(19), to: h(27) }],       // Vie → 3 AM
  6: [{ from: h(11), to: h(15, 30) }, { from: h(19), to: h(28) }],       // Sáb → 4 AM
};

export const WEEK = [
  { index: 1, short: "Lun", long: "lunes" },
  { index: 2, short: "Mar", long: "martes" },
  { index: 3, short: "Mié", long: "miércoles" },
  { index: 4, short: "Jue", long: "jueves" },
  { index: 5, short: "Vie", long: "viernes" },
  { index: 6, short: "Sáb", long: "sábado" },
  { index: 0, short: "Dom", long: "domingo" },
];

/** "19:00" / "04:00" — minutes past 1440 wrap into the next morning. */
export function fmt(minutes: number) {
  const m = minutes % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

export function shiftLabel(s: Shift) {
  return `${fmt(s.from)}–${fmt(s.to)}`;
}

/** A shift that runs past midnight is the one worth calling out on the page. */
export function isLate(s: Shift) {
  return s.to > 1440;
}

/**
 * Open now, accounting for last night's shift still running this morning:
 * at 02:30 on Saturday the relevant shift is Friday's 19:00–27:00.
 */
export function isOpenAt(weekday: number, minutes: number) {
  const today = SCHEDULE[weekday] ?? [];
  if (today.some((s) => minutes >= s.from && minutes < s.to)) return true;
  const yesterday = SCHEDULE[(weekday + 6) % 7] ?? [];
  return yesterday.some((s) => s.to > 1440 && minutes + 1440 < s.to);
}

/** The next shift that starts after `minutes` today, or the next open day's first shift. */
export function nextOpening(weekday: number, minutes: number) {
  const later = (SCHEDULE[weekday] ?? []).find((s) => s.from > minutes);
  if (later) return { when: "hoy", at: fmt(later.from) };
  for (let step = 1; step <= 7; step++) {
    const day = (weekday + step) % 7;
    const first = (SCHEDULE[day] ?? [])[0];
    if (first) {
      const name = WEEK.find((d) => d.index === day)?.long ?? "";
      return { when: step === 1 ? "mañana" : `el ${name}`, at: fmt(first.from) };
    }
  }
  return { when: "", at: "" };
}

/** The shift currently running, so the page can say when it ends. */
export function closesAt(weekday: number, minutes: number) {
  const today = (SCHEDULE[weekday] ?? []).find((s) => minutes >= s.from && minutes < s.to);
  if (today) return fmt(today.to);
  const yesterday = (SCHEDULE[(weekday + 6) % 7] ?? []).find(
    (s) => s.to > 1440 && minutes + 1440 < s.to,
  );
  return yesterday ? fmt(yesterday.to) : "";
}

export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=RIO&query_place_id=ChIJTVz0PYw4V5QRBwT1VDFX8mE";

export const FACEBOOK_URL = "https://m.facebook.com/riorestoobar";

const TZ = "America/Argentina/Buenos_Aires";

/** Current day-of-week and minute-of-day in Argentina, independent of the visitor's clock. */
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

/** Reservation form: night service only — that's where the rooftop pressure is. */
export const TIME_SLOTS = [
  "19:00", "19:30", "20:00", "20:30", "21:00", "21:30",
  "22:00", "22:30", "23:00", "23:30",
];

export function todayISOInArgentina() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(new Date());
}

export function weekdayOfISO(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).getDay();
}

/** Days with a night service. Tuesday closes at 15:30, Monday is shut. */
export function hasNightService(weekday: number) {
  return (SCHEDULE[weekday] ?? []).some((s) => s.from >= h(19));
}

export function formatISO(iso: string) {
  if (!iso) return iso;
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}
