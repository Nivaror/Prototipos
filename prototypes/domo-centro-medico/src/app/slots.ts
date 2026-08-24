/**
 * Mock turnero data. There is no real booking backend behind DOMO's site yet
 * (that is the entire gap this prototype demonstrates), so the week grid
 * below is illustrative filler: real weekday shape (Lun-Vie 9-19, Sab
 * 9-12:30, confirmed on the lead's listing) with a deterministic, generic
 * "some slots already taken" pattern layered on top so the grid doesn't read
 * as an empty placeholder. Deterministic on purpose (a pure function of day
 * and hour, no Math.random/Date.now) so server and client render the same
 * markup and hydration never mismatches.
 */
export type Slot = {
  time: string;
  taken: boolean;
};

export type DaySlots = {
  label: string;
  shortLabel: string;
  slots: Slot[];
};

const WEEKDAY_HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const SATURDAY_HOURS = [9, 10, 11, 12];

const DAY_NAMES = [
  { label: "Lunes", shortLabel: "Lun" },
  { label: "Martes", shortLabel: "Mar" },
  { label: "Miércoles", shortLabel: "Mié" },
  { label: "Jueves", shortLabel: "Jue" },
  { label: "Viernes", shortLabel: "Vie" },
  { label: "Sábado", shortLabel: "Sáb" },
];

function fmt(hour: number) {
  return `${String(hour).padStart(2, "0")}:00`;
}

// A fixed, hand-picked "already taken" pattern per day index (0=Lunes .. 5=Sábado),
// keyed by hour. Illustrative only, not derived from anything real.
const TAKEN_HOURS: Record<number, number[]> = {
  0: [9, 13, 16],
  1: [10, 11, 17],
  2: [9, 14],
  3: [12, 15, 18],
  4: [10, 16, 17],
  5: [9, 11],
};

export function getWeekSlots(): DaySlots[] {
  return DAY_NAMES.map((day, i) => {
    const hours = i === 5 ? SATURDAY_HOURS : WEEKDAY_HOURS;
    const taken = TAKEN_HOURS[i] ?? [];
    return {
      label: day.label,
      shortLabel: day.shortLabel,
      slots: hours.map((h) => ({ time: fmt(h), taken: taken.includes(h) })),
    };
  });
}

export const REASONS = [
  { id: "primera", label: "Primera consulta ginecológica" },
  { id: "control", label: "Control / seguimiento" },
  { id: "ive-ile", label: "Turno IVE/ILE" },
  { id: "otro", label: "Otro motivo" },
];
