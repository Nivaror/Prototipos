/**
 * El faro club nautico — confirmed from the Google Maps listing.
 * Open Friday, Saturday and Sunday only; closed Monday through Thursday.
 * Nothing here is inferred.
 */
/** Kept import-free so scripts/check-schedule.ts can load this file directly. */
type Shift = { from: number; to: number };
const h = (hour: number, min = 0) => hour * 60 + min;

export const SCHEDULE: Record<number, Shift[]> = {
  0: [{ from: h(11), to: h(19) }], // Dom
  1: [],
  2: [],
  3: [],
  4: [],
  5: [{ from: h(11), to: h(18) }], // Vie
  6: [{ from: h(11), to: h(18) }], // Sáb
};

export const OPEN_DAYS = [5, 6, 0];

export const TICKET_IDLE = "Viernes, sábado y domingo · Paso de la Patria";

export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=El%20faro%20club%20nautico&query_place_id=ChIJl9_UkVo5RZQR0PH07_yQxwM";

export const TIME_SLOTS = [
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00",
];

export function canReserveOn(weekday: number) {
  return OPEN_DAYS.includes(weekday);
}

export const RESERVE_CTA = "Reservar mesa";
export const RESERVE_HELP =
  "Solo viernes, sábado y domingo. Para el almuerzo se recomienda reservar: es el turno que más se llena.";
export const RESERVE_ERROR =
  "Ese día el club está cerrado. Elegí un viernes, sábado o domingo.";
export const RESERVE_NOTE =
  "Prototipo de demostración: la reserva es una simulación y no llega al club.";
export const RESERVE_CONFIRM =
  "Vista previa: esta reserva no salió de tu navegador. En la versión real queda en la lista del turno antes de que llegues.";
