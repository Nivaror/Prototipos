// La Cabra's confirmed hours (lead audit): split-shift schedule most days,
// 08:30-15:00 then 18:00-00:00, closed Monday. Unlike cuervo-blanco's single
// near-24h window (which needed a 25h-scale trick to cross midnight), this
// evening block ends exactly AT midnight, so no wraparound math is needed:
// each day is just two disjoint minute ranges, or none at all on Monday.

export type Shift = "manana" | "tarde" | null;

const DAY_NAMES = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
] as const;

const MONDAY = 1;

export const MORNING_OPEN = 8 * 60 + 30; // 08:30
export const MORNING_CLOSE = 15 * 60; // 15:00
export const EVENING_OPEN = 18 * 60; // 18:00
export const EVENING_CLOSE = 24 * 60; // 00:00 (same calendar day, no wrap)

export function isOpenDay(dayOfWeek: number): boolean {
  return dayOfWeek !== MONDAY;
}

export function dayLabel(dayOfWeek: number): string {
  return DAY_NAMES[dayOfWeek];
}

function minutesNow(d: Date): number {
  return d.getHours() * 60 + d.getMinutes();
}

function fmt(totalMin: number): string {
  const h = Math.floor(totalMin / 60) % 24;
  const m = totalMin % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export type Status = {
  isOpen: boolean;
  shift: Shift;
  label: string;
  changeLabel: string;
};

export function getStatus(now: Date = new Date()): Status {
  const day = now.getDay();
  const m = minutesNow(now);

  if (!isOpenDay(day)) {
    return {
      isOpen: false,
      shift: null,
      label: "Cerrado hoy",
      changeLabel: `Abre el ${dayLabel(day + 1 > 6 ? 0 : day + 1)} a las ${fmt(MORNING_OPEN)}`,
    };
  }

  if (m >= MORNING_OPEN && m < MORNING_CLOSE) {
    return {
      isOpen: true,
      shift: "manana",
      label: "Abierto ahora, turno mañana",
      changeLabel: `Cierra a las ${fmt(MORNING_CLOSE)}`,
    };
  }

  if (m >= MORNING_CLOSE && m < EVENING_OPEN) {
    return {
      isOpen: false,
      shift: null,
      label: "Cerrado entre turnos",
      changeLabel: `Vuelve a abrir a las ${fmt(EVENING_OPEN)}`,
    };
  }

  if (m >= EVENING_OPEN && m < EVENING_CLOSE) {
    return {
      isOpen: true,
      shift: "tarde",
      label: "Abierto ahora, turno tarde-noche",
      changeLabel: "Cierra a medianoche",
    };
  }

  return {
    isOpen: false,
    shift: null,
    label: "Cerrado ahora",
    changeLabel: `Abre a las ${fmt(MORNING_OPEN)}`,
  };
}

export const MORNING_LABEL = `${fmt(MORNING_OPEN)} a ${fmt(MORNING_CLOSE)}`;
export const EVENING_LABEL = `${fmt(EVENING_OPEN)} a medianoche`;

// Weekly grid data for the HorarioGrid centerpiece: 7 days, each with its
// two shift ranges (or none on Monday).
export type DayRow = {
  day: number;
  label: string;
  short: string;
  manana: boolean;
  tarde: boolean;
};

const SHORT_NAMES = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export function weekGrid(): DayRow[] {
  // Monday first for a readable week strip: Lun..Dom
  const order = [1, 2, 3, 4, 5, 6, 0];
  return order.map((day) => ({
    day,
    label: dayLabel(day),
    short: SHORT_NAMES[day],
    manana: isOpenDay(day),
    tarde: isOpenDay(day),
  }));
}
