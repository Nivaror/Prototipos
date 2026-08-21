/** Confirmed hours from the Google Maps listing: Fri/Sat/Sun 9 to 17, closed Mon-Thu. */
export const OPEN_FROM_MIN = 9 * 60;
export const OPEN_TO_MIN = 17 * 60;
export const HOURS_LABEL = "9 a 17";

/** Index matches Date#getDay(): 0 = Sunday. */
export const OPEN_DAYS = [0, 5, 6];

export const WEEK = [
  { index: 1, short: "Lun", long: "lunes" },
  { index: 2, short: "Mar", long: "martes" },
  { index: 3, short: "Mié", long: "miércoles" },
  { index: 4, short: "Jue", long: "jueves" },
  { index: 5, short: "Vie", long: "viernes" },
  { index: 6, short: "Sáb", long: "sábado" },
  { index: 0, short: "Dom", long: "domingo" },
];

export const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30",
];

export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=PARRILLA%20RESTAURANTE%20RUTA20&query_place_id=ChIJ8_dFPADJWpQRSPmf4HYmBGs";

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

export function isOpenNow() {
  const { weekday, minutes } = nowInArgentina();
  return OPEN_DAYS.includes(weekday) && minutes >= OPEN_FROM_MIN && minutes < OPEN_TO_MIN;
}

/** The next day the parrilla opens, phrased for a visitor reading it today. */
export function nextOpenLabel() {
  const { weekday, minutes } = nowInArgentina();
  if (OPEN_DAYS.includes(weekday) && minutes < OPEN_FROM_MIN) return "hoy";
  for (let step = 1; step <= 7; step++) {
    const day = (weekday + step) % 7;
    if (OPEN_DAYS.includes(day)) {
      const name = WEEK.find((d) => d.index === day)?.long ?? "";
      return step === 1 ? "mañana" : `el ${name}`;
    }
  }
  return "";
}

export function todayISOInArgentina() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(new Date());
}

/** Day of week for a plain YYYY-MM-DD string, read as a local calendar date. */
export function weekdayOfISO(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).getDay();
}

export function formatISO(iso: string) {
  if (!iso) return iso;
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}
