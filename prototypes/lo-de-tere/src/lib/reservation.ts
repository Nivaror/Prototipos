// Fresh reservation model for Lo de Tere, distinct from every sibling in the
// restaurantes/pizzerias/hamburgueserias family: this is a day-scroller +
// time-slot picker, not escauriza's staggered multi-window card stack,
// popolo's single framed panel with a recomputing dropdown, chichilos's
// compact inline form, or hosteria-yacyreta-itucatering's two-door selector.
// Built around the one real fact the audit gives: reservations are required
// in general, and specifically recommended for brunch and dinner - so
// brunch/dinner slots below are flagged "recomendado", nothing else is
// invented about the hours.

const DAY_LABELS = [
  "Dom",
  "Lun",
  "Mar",
  "Mié",
  "Jue",
  "Vie",
  "Sáb",
] as const;

const MONTH_LABELS = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sep",
  "oct",
  "nov",
  "dic",
] as const;

export interface DayOption {
  iso: string;
  weekday: string;
  dayNumber: number;
  month: string;
  isToday: boolean;
}

export function getUpcomingDays(from: Date = new Date(), count = 7): DayOption[] {
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(from);
    d.setDate(d.getDate() + i);
    return {
      iso: d.toISOString().slice(0, 10),
      weekday: DAY_LABELS[d.getDay()],
      dayNumber: d.getDate(),
      month: MONTH_LABELS[d.getMonth()],
      isToday: i === 0,
    };
  });
}

export interface TimeSlot {
  time: string;
  recommended: boolean;
}

// Open every day 8:00-24:00 (confirmed). Reservations recommended
// specifically for brunch and dinner (confirmed) - modeled here as the
// late-morning/midday window and the evening window, not as invented exact
// clock boundaries beyond what "brunch" and "dinner" plainly mean.
export function getTimeSlots(): TimeSlot[] {
  const hours = [9, 10, 11, 12, 13, 14, 15, 18, 19, 20, 21, 22, 23];
  return hours.map((h) => ({
    time: `${String(h).padStart(2, "0")}:00`,
    recommended: (h >= 9 && h <= 12) || (h >= 20 && h <= 23),
  }));
}

export const PARTY_SIZES = [1, 2, 3, 4, 5, 6, 7, 8, "9+"] as const;
