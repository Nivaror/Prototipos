export type DayBlock = {
  label: string;
  blocks: string[];
  note?: string;
  closed?: boolean;
};

// Only Monday and Saturday times are confirmed in the source data (Google
// Maps listing). Tue-Fri are described as following "a similar split-block
// pattern" but no exact times were given, so they're shown as a pattern
// match rather than invented exact hours - inventing precise times here
// would be a checkable, contradictable fact, unlike genuinely unverifiable
// filler (menu items, staff names).
export const week: DayBlock[] = [
  { label: "Lunes", blocks: ["08:00 - 12:30", "14:00 - 22:00"] },
  { label: "Martes", blocks: [], note: "Mismo esquema que lunes" },
  { label: "Miércoles", blocks: [], note: "Mismo esquema que lunes" },
  { label: "Jueves", blocks: [], note: "Mismo esquema que lunes" },
  { label: "Viernes", blocks: [], note: "Mismo esquema que lunes" },
  { label: "Sábado", blocks: ["14:00 - 16:00"] },
  { label: "Domingo", blocks: [], closed: true },
];

// JS Date#getDay(): 0 = Sunday ... 6 = Saturday. Rotate to match `week`
// (Monday-first) ordering above.
export function todayIndex(): number {
  const jsDay = new Date().getDay();
  return jsDay === 0 ? 6 : jsDay - 1;
}
