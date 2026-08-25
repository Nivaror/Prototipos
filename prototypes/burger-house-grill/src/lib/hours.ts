// Evening-only, every day: open 19:00, closes late (posted as "hasta tarde" since
// the source lead data gives a range, not a fixed nightly close time).
const OPEN_HOUR = 19;
const CLOSE_HOUR = 2; // next-day, so the open window wraps past midnight

export function isOpenNow(date: Date = new Date()): boolean {
  const hour = date.getHours();
  return hour >= OPEN_HOUR || hour < CLOSE_HOUR;
}

export function nextOpenLabel(date: Date = new Date()): string {
  if (isOpenNow(date)) return "Abierto ahora";
  const hoursUntil = OPEN_HOUR - date.getHours();
  if (hoursUntil <= 0) return "Abre pronto";
  if (hoursUntil === 1) return "Abre en 1 hora";
  return `Abre en ${hoursUntil} horas`;
}
