// Horario real (per Maps, sin horas exactas publicadas): cerrado lunes,
// noche todos los días abiertos, mediodía solo jueves/viernes/sábado/domingo.
// Bloques de servicio, no relojes inventados, por la misma razón que
// el-banquete y otros hermanos del rubro: la fuente no da hora exacta.

export type ServiceBlock = {
  id: "mediodia" | "noche";
  label: string;
};

const MIDDAY_WEEKDAYS = new Set([4, 5, 6, 0]); // jue, vie, sáb, dom (0 = domingo)
const CLOSED_WEEKDAY = 1; // lunes

export function isClosed(dateISO: string): boolean {
  const day = new Date(`${dateISO}T12:00:00`).getDay();
  return day === CLOSED_WEEKDAY;
}

export function blocksForDate(dateISO: string): ServiceBlock[] {
  if (isClosed(dateISO)) return [];
  const day = new Date(`${dateISO}T12:00:00`).getDay();
  const blocks: ServiceBlock[] = [];
  if (MIDDAY_WEEKDAYS.has(day)) {
    blocks.push({ id: "mediodia", label: "Mediodía" });
  }
  blocks.push({ id: "noche", label: "Noche" });
  return blocks;
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function addDaysISO(dateISO: string, days: number): string {
  const d = new Date(`${dateISO}T12:00:00`);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function formatDateLabel(dateISO: string): string {
  const d = new Date(`${dateISO}T12:00:00`);
  const label = d.toLocaleDateString("es-AR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export const PARTY_SIZES = [2, 3, 4, 5, 6, "7+"] as const;
export type PartySize = (typeof PARTY_SIZES)[number];

export type ReservationKind = "mesa" | "evento";

export const EVENT_TYPES = [
  "Cata de vinos",
  "Cumpleaños / celebración",
  "Evento privado / corporativo",
] as const;
