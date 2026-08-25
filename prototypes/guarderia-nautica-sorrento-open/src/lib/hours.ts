const OPEN_HOUR = 8;
const CLOSE_HOUR = 21;

export function isOpenNow(date = new Date()): boolean {
  const hour = date.getHours();
  return hour >= OPEN_HOUR && hour < CLOSE_HOUR;
}
