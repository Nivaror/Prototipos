/**
 * Confirmed from the Google Maps listing: Lun-Vie 8:00-21:00, cerrado sábado y domingo.
 * A single weekday shift, no midnight crossing, so this stays a tiny inline
 * check rather than the multi-shift schedule.ts engine other prototypes use.
 */
export const ADDRESS = "Baigorria 775, Alberdi, Rosario";
export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=KINAP%20Centro%20Integral%20Rehabilitacion&query_place_id=ChIJL8_i6Z5TtpURVOz4ZyJlEOc";

const OPEN_MIN = 8 * 60;
const CLOSE_MIN = 21 * 60;
const TZ = "America/Argentina/Buenos_Aires";

export function isOpenNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);

  if (weekday === "Sat" || weekday === "Sun") return false;
  const mins = hour * 60 + minute;
  return mins >= OPEN_MIN && mins < CLOSE_MIN;
}
