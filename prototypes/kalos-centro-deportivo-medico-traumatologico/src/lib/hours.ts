// Confirmed hours: Mon-Fri 7:00-20:00, closed weekends (Google Maps listing).
const OPEN_DAYS = [1, 2, 3, 4, 5]; // Mon=1 ... Fri=5
const OPEN_HOUR = 7;
const CLOSE_HOUR = 20;

export function isOpenNow(date = new Date()): boolean {
  const day = date.getDay();
  const hour = date.getHours() + date.getMinutes() / 60;
  return OPEN_DAYS.includes(day) && hour >= OPEN_HOUR && hour < CLOSE_HOUR;
}

export const WEEK_ROW = [
  { label: "Lun", open: true },
  { label: "Mar", open: true },
  { label: "Mié", open: true },
  { label: "Jue", open: true },
  { label: "Vie", open: true },
  { label: "Sáb", open: false },
  { label: "Dom", open: false },
];

export const HOURS_TEXT = "Lunes a viernes, 7 a 20 hs";
export const ADDRESS_TEXT = "16 de Enero 8691, Rosario (Larrea y Empalme Graneros)";
export const RATING_TEXT = "4.8★ · 19 reseñas en Google";
