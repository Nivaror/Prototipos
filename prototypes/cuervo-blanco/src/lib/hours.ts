// Cuervo Blanco's confirmed hours (lead audit): "open daily, roughly 8/9am to
// 1am every day of the week" - no per-day breakdown exists in the source, so
// we honestly use one approximate daily window rather than inventing
// per-day precision. Midpoint of the 8-9am range is used for the open time.
export const OPEN_MIN = 8 * 60 + 30; // 08:30
export const CLOSE_MIN = 25 * 60; // 01:00 next day, expressed on a 25h scale

export type Status = {
  isOpen: boolean;
  label: string;
  changeLabel: string;
  currentHour: number; // 0-23, for highlighting "now" on the hour strip
};

// Is the hour block [h:00, h:00+60) open at any point? Used to render an
// honest 24-tick open/closed strip instead of a continuous progress bar.
export function hourIsOpen(h: number): boolean {
  return [h * 60, h * 60 + 24 * 60].some(
    (start) => start < CLOSE_MIN && start + 60 > OPEN_MIN,
  );
}

function minutesNow(d: Date): number {
  const m = d.getHours() * 60 + d.getMinutes();
  // hours before opening belong to "yesterday's" window on the 25h scale
  return m < OPEN_MIN ? m + 24 * 60 : m;
}

function fmt(totalMin: number): string {
  const h = Math.floor(totalMin / 60) % 24;
  const m = totalMin % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function getStatus(now: Date = new Date()): Status {
  const m = minutesNow(now);
  const isOpen = m >= OPEN_MIN && m < CLOSE_MIN;

  return {
    isOpen,
    label: isOpen ? "Abierto ahora" : "Cerrado ahora",
    changeLabel: isOpen
      ? `Cierra cerca de la ${fmt(CLOSE_MIN)}`
      : `Abre cerca de las ${fmt(OPEN_MIN)}`,
    currentHour: now.getHours(),
  };
}

export const OPEN_LABEL = fmt(OPEN_MIN);
export const CLOSE_LABEL = fmt(CLOSE_MIN);
