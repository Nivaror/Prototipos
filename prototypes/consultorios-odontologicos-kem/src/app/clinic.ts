/**
 * Confirmed from the Google Maps listing: opens 9:00, 4.8★ over 55 reviews,
 * San Juan 3943, Rosario. The full weekly schedule was NOT captured in the
 * scrape, so this page never renders an open/closed state or a week grid —
 * it would be invented. Slots below are a demo range, labelled as such.
 */
export const OPENS_AT = "9:00";

export const MAPS_URL =
  "https://www.google.com/maps/place/Consultorios+Odontol%C3%B3gicos+KEM/@-32.9433132,-60.677997,918m/data=!3m2!1e3!4b1!4m6!3m5!1s0x95b7ad6df3b84e27:0xfa475d5503053f8!8m2!3d-32.9433132!4d-60.677997!16s%2Fg%2F11ghq415w9";

export const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00",
];

/** Placeholder list — replaced by the clinic's real treatments before any real use. */
export const REASONS = [
  "Primera consulta",
  "Control",
  "Limpieza",
  "Urgencia / dolor",
  "Otro",
];

const TZ = "America/Argentina/Buenos_Aires";

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
