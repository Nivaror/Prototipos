/**
 * EN LO DE RAMON — confirmed from the Google Maps listing: open 24 hours,
 * all seven days. There is no week grid on this page because there is nothing
 * to compare: every day is identical and none of them ends.
 * Kept import-free so scripts/check-schedule.ts can load this file directly.
 */
type Shift = { from: number; to: number };

const ALL_DAY: Shift[] = [{ from: 0, to: 24 * 60 }];

export const SCHEDULE: Record<number, Shift[]> = {
  0: ALL_DAY, 1: ALL_DAY, 2: ALL_DAY, 3: ALL_DAY, 4: ALL_DAY, 5: ALL_DAY, 6: ALL_DAY,
};

export const TICKET_IDLE = "Abierto las 24 horas, los siete días";

export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=EN%20LO%20DE%20RAMON&query_place_id=ChIJj1lSuAg5V5QRTZjLhb3dDTw";

export const TIME_SLOTS = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);

/** Never closed, so no date is ever refused. */
export function canReserveOn() {
  return true;
}

export const RESERVE_CTA = "Reservar mesa";
export const RESERVE_HELP =
  "Cualquier día y cualquier hora: no hay un horario en el que no estemos.";
export const RESERVE_ERROR = "";
export const RESERVE_NOTE =
  "Prototipo de demostración: la reserva es una simulación y no llega al local.";
export const RESERVE_CONFIRM =
  "Vista previa: esta reserva no salió de tu navegador. En la versión real queda anotada, sea la hora que sea.";
