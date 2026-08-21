/**
 * Birrería Del Paso — confirmed from the Google Maps listing.
 * Closed Monday to Wednesday. Thursday and Friday open at 19; Saturday and
 * Sunday from midday. Every night runs to 2 AM, stored as 26 * 60.
 * Kept import-free so scripts/check-schedule.ts can load this file directly.
 */
type Shift = { from: number; to: number };
const h = (hour: number, min = 0) => hour * 60 + min;

export const SCHEDULE: Record<number, Shift[]> = {
  0: [{ from: h(12), to: h(26) }], // Dom
  1: [],
  2: [],
  3: [],
  4: [{ from: h(19), to: h(26) }], // Jue
  5: [{ from: h(19), to: h(26) }], // Vie
  6: [{ from: h(12), to: h(26) }], // Sáb
};

export const OPEN_DAYS = [4, 5, 6, 0];

export const TICKET_IDLE = "De jueves a domingo, hasta las 2 · Paso de la Patria";

export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Birreria%20Del%20Paso&query_place_id=ChIJsVzwDmo5RZQRwZIF6izmVYw";

export const TIME_SLOTS = [
  "19:00", "19:30", "20:00", "20:30", "21:00", "21:30",
  "22:00", "22:30", "23:00", "23:30", "00:00",
];

export function canReserveOn(weekday: number) {
  return OPEN_DAYS.includes(weekday);
}

export const RESERVE_CTA = "Reservar mesa";
export const RESERVE_HELP =
  "De jueves a domingo. Lunes, martes y miércoles la birrería no abre.";
export const RESERVE_ERROR =
  "Ese día está cerrado. Elegí entre jueves y domingo.";
export const RESERVE_NOTE =
  "Prototipo de demostración: la reserva es una simulación y no llega al local.";
export const RESERVE_CONFIRM =
  "Vista previa: esta reserva no salió de tu navegador. En la versión real queda anotada en la lista de la noche.";
