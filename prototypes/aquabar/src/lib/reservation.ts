export type ReservationWindow = {
  id: "almuerzo" | "cena";
  label: string;
  range: string;
  startMinutes: number;
  endMinutes: number;
  stepMinutes: number;
};

export const RESERVATION_WINDOWS: ReservationWindow[] = [
  {
    id: "almuerzo",
    label: "Almuerzo",
    range: "12:00 a 15:30",
    startMinutes: 12 * 60,
    endMinutes: 15 * 60 + 30,
    stepMinutes: 30,
  },
  {
    id: "cena",
    label: "Cena",
    range: "20:00 a 23:30",
    startMinutes: 20 * 60,
    endMinutes: 23 * 60 + 30,
    stepMinutes: 30,
  },
];

function minutesToLabel(total: number): string {
  const h = Math.floor(total / 60)
    .toString()
    .padStart(2, "0");
  const m = (total % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

export function timeSlots(window: ReservationWindow): string[] {
  const slots: string[] = [];
  for (
    let t = window.startMinutes;
    t <= window.endMinutes;
    t += window.stepMinutes
  ) {
    slots.push(minutesToLabel(t));
  }
  return slots;
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}
