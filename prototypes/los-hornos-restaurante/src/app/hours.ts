/**
 * Los Hornos Restaurante — confirmed from the Google Maps listing.
 * Open all seven days with two services; the night one crosses midnight on
 * Friday and Saturday (12:30 AM, stored as 24.5 * 60).
 * Kept import-free so scripts/check-schedule.ts can load this file directly.
 */
type Shift = { from: number; to: number };
const h = (hour: number, min = 0) => hour * 60 + min;

export const SCHEDULE: Record<number, Shift[]> = {
  0: [{ from: h(11), to: h(14, 30) }, { from: h(20), to: h(24) }],       // Dom
  1: [{ from: h(11), to: h(14) }, { from: h(20), to: h(24) }],           // Lun
  2: [{ from: h(11), to: h(14) }, { from: h(20), to: h(24) }],           // Mar
  3: [{ from: h(11), to: h(14) }, { from: h(20), to: h(24) }],           // Mié
  4: [{ from: h(11), to: h(14) }, { from: h(20), to: h(24) }],           // Jue
  5: [{ from: h(11), to: h(14) }, { from: h(20), to: h(24, 30) }],       // Vie → 00:30
  6: [{ from: h(11, 30), to: h(14, 30) }, { from: h(20), to: h(24, 30) }], // Sáb → 00:30
};

export const TICKET_IDLE = "Todos los días, mediodía y noche · Ituzaingó";

export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Los%20Hornos%20Restaurante&query_place_id=ChIJi2BzmCI5V5QRgCfCOLV3u_Q";

export const FACEBOOK_URL = "https://www.facebook.com/www.loshornos.com.ar";

export const TIME_SLOTS = [
  "11:30", "12:00", "12:30", "13:00", "13:30",
  "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00",
];

/** Open every day, so no date is refused — the guard stays for the shared form. */
export function canReserveOn(weekday: number) {
  return (SCHEDULE[weekday] ?? []).length > 0;
}

export const RESERVE_CTA = "Reservar mesa";
export const RESERVE_HELP =
  "Abrimos los siete días: mediodía desde las 11 y noche desde las 20.";
export const RESERVE_ERROR = "Ese día no hay servicio.";
export const RESERVE_NOTE =
  "Prototipo de demostración: la reserva es una simulación y no llega al local.";
export const RESERVE_CONFIRM =
  "Vista previa: esta reserva no salió de tu navegador. En la versión real queda anotada en el turno que elegiste.";
