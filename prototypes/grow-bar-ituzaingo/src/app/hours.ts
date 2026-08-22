/**
 * GROW BAR, Ituzaingó (Corrientes). Hours confirmed from the Google Maps
 * listing: 20:00 to 01:00 Thursday and Sunday through Wednesday, 19:00 to
 * 03:00 Friday and Saturday. Every closing time crosses midnight, so shifts
 * are stored as minutes past their own day's midnight (01:00 = 25 * 60).
 * Kept import-free apart from the shared helpers so a node script can load it.
 */
import { h, type Schedule } from "./schedule";

const NIGHT: { from: number; to: number }[] = [{ from: h(20), to: h(25) }];
const WEEKEND: { from: number; to: number }[] = [{ from: h(19), to: h(27) }];

export const SCHEDULE: Schedule = {
  0: NIGHT,   // domingo
  1: NIGHT,   // lunes
  2: NIGHT,   // martes
  3: NIGHT,   // miércoles
  4: NIGHT,   // jueves
  5: WEEKEND, // viernes
  6: WEEKEND, // sábado
};

export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Grow%20Bar%20%7C%20Comidas%20y%20bebidas%20en%20Ituzaing%C3%B3&query_place_id=ChIJyVsKf3g5V5QRVpR6P3-gPF4";

export const ADDRESS = "Calle 7, C. F y, W3302 Ituzaingó, Corrientes";
export const RATING = { score: "4,7", reviews: 33 };

/**
 * Grow Bar closes after midnight every single night, so "closes past midnight"
 * says nothing. What actually sets the weekend apart is the 03:00 close, so the
 * long-night flag is drawn at 02:00 and only Friday and Saturday trip it.
 */
export function isLongNight(shifts: { from: number; to: number }[]) {
  return shifts.some((shift) => shift.to >= 26 * 60);
}
