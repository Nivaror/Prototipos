/**
 * Rotisería Don Franccesco — confirmed from the Google Maps listing.
 * Two services every day except Sunday, which is night only. Every night runs
 * to 00:30, stored as 24.5 * 60. Delivery and takeout only: the listing has no
 * dine-in option, which is why this page orders instead of booking a table.
 * Kept import-free so scripts/check-schedule.ts can load this file directly.
 */
type Shift = { from: number; to: number };
const h = (hour: number, min = 0) => hour * 60 + min;

export const SCHEDULE: Record<number, Shift[]> = {
  0: [{ from: h(20, 30), to: h(24, 30) }],                                    // Dom
  1: [{ from: h(11, 30), to: h(13, 30) }, { from: h(20, 30), to: h(24, 30) }], // Lun
  2: [{ from: h(11, 30), to: h(14) }, { from: h(20, 30), to: h(24, 30) }],     // Mar
  3: [{ from: h(11, 30), to: h(14) }, { from: h(20, 30), to: h(24, 30) }],     // Mié
  4: [{ from: h(11, 30), to: h(14) }, { from: h(20), to: h(24, 30) }],         // Jue
  5: [{ from: h(11, 30), to: h(13, 30) }, { from: h(20), to: h(24, 30) }],     // Vie
  6: [{ from: h(11, 30), to: h(13, 30) }, { from: h(20, 30), to: h(24, 30) }], // Sáb
};

export const TICKET_IDLE = "Delivery y retiro · Paso de la Patria";

export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Rotiser%C3%ADa%20Don%20Franccesco&query_place_id=ChIJq1qILwA5RZQR9qtHla3bZRA";

export const INSTAGRAM_URL = "https://www.instagram.com/foodtruckfranccesco";
