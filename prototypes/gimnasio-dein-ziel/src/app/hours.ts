/**
 * Confirmed schedule from the Google Maps listing: Mon-Fri 7:00-22:00,
 * Sat 10:00-14:00, closed Sunday. No shift crosses midnight.
 */
export type Shift = { from: number; to: number };

const h = (hour: number, min = 0) => hour * 60 + min;

/** Index matches Date#getDay(): 0 = Sunday. */
export const SCHEDULE: Record<number, Shift[]> = {
  0: [],
  1: [{ from: h(7), to: h(22) }],
  2: [{ from: h(7), to: h(22) }],
  3: [{ from: h(7), to: h(22) }],
  4: [{ from: h(7), to: h(22) }],
  5: [{ from: h(7), to: h(22) }],
  6: [{ from: h(10), to: h(14) }],
};

export const WEEK = [
  { index: 1, short: "Lun" },
  { index: 2, short: "Mar" },
  { index: 3, short: "Mié" },
  { index: 4, short: "Jue" },
  { index: 5, short: "Vie" },
  { index: 6, short: "Sáb" },
  { index: 0, short: "Dom" },
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

/** The shift running now, or the next one today/this week, for the status line. */
export function currentStatus(weekday: number, minutes: number) {
  const today = SCHEDULE[weekday] ?? [];
  const running = today.find((s) => minutes >= s.from && minutes < s.to);
  if (running) return { open: true as const, until: fmt(running.to) };

  const next = today.find((s) => s.from > minutes);
  if (next) return { open: false as const, when: "hoy", at: fmt(next.from) };

  for (let step = 1; step <= 7; step++) {
    const day = (weekday + step) % 7;
    const first = (SCHEDULE[day] ?? [])[0];
    if (first) {
      const name = WEEK.find((d) => d.index === day)?.short ?? "";
      return { open: false as const, when: step === 1 ? "mañana" : name, at: fmt(first.from) };
    }
  }
  return { open: false as const, when: "", at: "" };
}

export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Gimnasio%20Dein-Ziel&query_place_id=ChIJgSPSRldTtpURPpqmjHTYH2w";
