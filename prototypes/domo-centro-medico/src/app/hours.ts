/**
 * Confirmed from the lead's Google Maps listing: Lun-Vie 9:00-19:00,
 * Sab 9:00-12:30, cerrado domingo. Two different shifts (weekday vs. the
 * shorter Saturday morning) plus a half-hour Saturday close, so this stays
 * its own small check rather than the single-shift pattern a Mon-Fri-only
 * clinic could get away with.
 */
export const ADDRESS = "Pueyrredón 1219, S2000QII Rosario, Santa Fe";
export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=DOMO%20Centro%20M%C3%A9dico%20Rosario&query_place_id=ChIJr_8G35Krt5URFQuwRN75uEY";

const WEEKDAY_OPEN_MIN = 9 * 60;
const WEEKDAY_CLOSE_MIN = 19 * 60;
const SATURDAY_OPEN_MIN = 9 * 60;
const SATURDAY_CLOSE_MIN = 12 * 60 + 30;
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
  const mins = hour * 60 + minute;

  if (weekday === "Sun") return false;
  if (weekday === "Sat") return mins >= SATURDAY_OPEN_MIN && mins < SATURDAY_CLOSE_MIN;
  return mins >= WEEKDAY_OPEN_MIN && mins < WEEKDAY_CLOSE_MIN;
}
