// Real service windows, from the confirmed Google Maps hours (Lun-Jue 12-15:30 y 20-24,
// Vie 12-15:30 y 20-1, Sáb 12-16:30 y 20-1, Dom 12-16:30 y 20-24). Brunch and almuerzo
// share the same midday block per the business's own Google listing (both are separately
// recommended reservation categories, but no separate hours are given for either) -
// shown honestly as one shared window rather than inventing a split.

export type WindowId = "brunch" | "almuerzo" | "cena";

export interface ReservationWindow {
  id: WindowId;
  label: string;
  timeRange: string;
  note: string;
  slots: string[];
}

const MIDDAY_SLOTS = ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00"];
const EVENING_SLOTS = ["20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"];

export const RESERVATION_WINDOWS: ReservationWindow[] = [
  {
    id: "brunch",
    label: "Brunch",
    timeRange: "12 a 15:30 hs",
    note: "Comparte franja con el almuerzo, hasta 16:30 hs los fines de semana.",
    slots: MIDDAY_SLOTS,
  },
  {
    id: "almuerzo",
    label: "Almuerzo",
    timeRange: "12 a 15:30 hs",
    note: "Hasta 16:30 hs los sábados y domingos.",
    slots: MIDDAY_SLOTS,
  },
  {
    id: "cena",
    label: "Cena",
    timeRange: "20 a 24 hs",
    note: "Hasta la 1 hs los viernes y sábados.",
    slots: EVENING_SLOTS,
  },
];

export const MAX_PARTY_SIZE = 12;

export function isValidPartySize(value: number): boolean {
  return Number.isInteger(value) && value >= 1 && value <= MAX_PARTY_SIZE;
}
