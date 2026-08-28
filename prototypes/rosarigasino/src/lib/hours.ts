// Open/closed status for Rosarigasino, computed client-side in Argentina time.
//
// The only source we have is the Maps listing's own summary: "open daily,
// roughly 8/9am to midnight" - no per-day breakdown. Inventing a precise
// per-day schedule (like puerto-pichon's real per-day hours) would misstate
// a fact we don't have, so this models a single honest approximate window
// every day of the week: 08:30 (midpoint of the stated 8-9am range) to
// 00:00 (midnight). Copy that surfaces this should say "aprox." rather than
// implying to-the-minute precision.

const ARGENTINA_TZ = "America/Argentina/Buenos_Aires";

const OPEN_MINUTE = 8 * 60 + 30; // 08:30, honest midpoint of "8/9am"
const CLOSE_MINUTE = 24 * 60; // midnight

export type OpenStatus = {
  isOpen: boolean;
  label: string;
};

function minutesNowInBuenosAires(date: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: ARGENTINA_TZ,
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);

  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return hour * 60 + minute;
}

export function getOpenStatus(date: Date = new Date()): OpenStatus {
  const nowMinutes = minutesNowInBuenosAires(date);
  const isOpen = nowMinutes >= OPEN_MINUTE && nowMinutes < CLOSE_MINUTE;

  return {
    isOpen,
    label: isOpen ? "Abierto ahora" : "Cerrado ahora",
  };
}

export const HOURS_DISPLAY = "Todos los días, aprox. 8/9 a 00 hs";
