/**
 * Isla Centenario Restaurant — confirmed from the Google Maps listing.
 * Miércoles a domingo, 11 a 18. Lunes y martes cerrado. No night service:
 * the listing recommends booking "para la cena", but the published hours end
 * at 18, so this page offers only the hours that are actually confirmed.
 * Kept import-free so scripts/check-schedule.ts can load this file directly.
 */
type Shift = { from: number; to: number };
const h = (hour: number, min = 0) => hour * 60 + min;

export const SCHEDULE: Record<number, Shift[]> = {
  0: [{ from: h(11), to: h(18) }], // Dom
  1: [],
  2: [],
  3: [{ from: h(11), to: h(18) }], // Mié
  4: [{ from: h(11), to: h(18) }], // Jue
  5: [{ from: h(11), to: h(18) }], // Vie
  6: [{ from: h(11), to: h(18) }], // Sáb
};

export const TICKET_IDLE = "De miércoles a domingo, 11 a 18 · Isla Centenario, Tigre";

export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Isla%20Centenario%20Restaurant&query_place_id=ChIJ7XyeYAClvJURVHHCSOlk3iQ";

export const TIME_SLOTS = [
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00",
];

export function canReserveOn(weekday: number) {
  return (SCHEDULE[weekday] ?? []).length > 0;
}

export const RESERVE_CTA = "Reservar mesa";
export const RESERVE_HELP =
  "De miércoles a domingo, de 11 a 18. Lunes y martes la isla está cerrada.";
export const RESERVE_ERROR =
  "Ese día está cerrado. Elegí entre miércoles y domingo.";
export const RESERVE_NOTE =
  "Prototipo de demostración: la reserva es una simulación y no llega al restaurante.";
export const RESERVE_CONFIRM =
  "Vista previa: esta reserva no salió de tu navegador. En la versión real llega antes de que te subas a cruzar.";
