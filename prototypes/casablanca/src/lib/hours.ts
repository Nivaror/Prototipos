const TIMEZONE = "America/Argentina/Buenos_Aires";
const OPEN_MIN = 8 * 60;
const CLOSE_MIN = 1 * 60;

function minutesOf(date: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIMEZONE,
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return hour * 60 + minute;
}

export function isOpenNow(date: Date = new Date()): boolean {
  const now = minutesOf(date);
  return now >= OPEN_MIN || now < CLOSE_MIN;
}

if (process.env.NODE_ENV !== "production") {
  const check = (h: number, m: number, expected: boolean) => {
    const d = new Date(Date.UTC(2026, 0, 1, h, m));
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: TIMEZONE,
      hour: "numeric",
      hourCycle: "h23",
    }).formatToParts(d);
    const localHour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
    const got = isOpenNow(d);
    console.assert(
      got === expected,
      `hours.ts self-check failed: UTC ${h}:${m} (ARG hour ${localHour}) expected open=${expected} got=${got}`,
    );
  };
  check(11, 0, true); // 11:00 UTC = 08:00 ARG, opening edge
  check(6, 0, false); // 06:00 UTC = 03:00 ARG, closed
  check(1, 0, true); // 01:00 UTC = 22:00 ARG, open
  check(4, 30, false); // 04:30 UTC = 01:30 ARG, past close
}
