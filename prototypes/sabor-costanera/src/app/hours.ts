// Sabor Costanera: Mié-Lun 19:30-24:00, cerrado Martes. Timezone fijo Corrientes (UTC-3, sin DST).
const TZ = "America/Argentina/Buenos_Aires";

export type DayRow = {
  day: number; // 0 = domingo ... 6 = sábado (Date.getDay convention)
  label: string;
  short: string;
  openMinute: number | null; // minutos desde las 00:00, null = cerrado
  closeMinute: number | null;
};

const OPEN = 19 * 60 + 30; // 19:30
const CLOSE = 24 * 60; // 24:00 (medianoche, mismo día)

export const SCHEDULE: DayRow[] = [
  { day: 0, label: "Domingo", short: "Dom", openMinute: OPEN, closeMinute: CLOSE },
  { day: 1, label: "Lunes", short: "Lun", openMinute: OPEN, closeMinute: CLOSE },
  { day: 2, label: "Martes", short: "Mar", openMinute: null, closeMinute: null },
  { day: 3, label: "Miércoles", short: "Mié", openMinute: OPEN, closeMinute: CLOSE },
  { day: 4, label: "Jueves", short: "Jue", openMinute: OPEN, closeMinute: CLOSE },
  { day: 5, label: "Viernes", short: "Vie", openMinute: OPEN, closeMinute: CLOSE },
  { day: 6, label: "Sábado", short: "Sáb", openMinute: OPEN, closeMinute: CLOSE },
];

function nowInBuenosAires(): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());

  const weekdayShort = parts.find((p) => p.type === "weekday")?.value ?? "Sun";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");

  const map: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  return { day: map[weekdayShort] ?? 0, minutes: hour * 60 + minute };
}

function formatMinute(m: number): string {
  const h = Math.floor(m / 60) % 24;
  const min = m % 60;
  return `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
}

export type Status = {
  isOpen: boolean;
  headline: string;
  detail: string;
};

export function getStatus(): Status {
  const { day, minutes } = nowInBuenosAires();
  const today = SCHEDULE[day];

  if (today.openMinute !== null && minutes >= today.openMinute && minutes < today.closeMinute!) {
    return {
      isOpen: true,
      headline: "Abierto ahora",
      detail: `Hasta las ${formatMinute(today.closeMinute!)} hs`,
    };
  }

  // Buscar el próximo día con horario, empezando por hoy si todavía no abrió.
  for (let offset = 0; offset < 8; offset++) {
    const candidateDay = (day + offset) % 7;
    const row = SCHEDULE[candidateDay];
    if (row.openMinute === null) continue;
    if (offset === 0 && minutes >= row.openMinute) continue; // hoy ya cerró

    const when =
      offset === 0
        ? `hoy a las ${formatMinute(row.openMinute)} hs`
        : offset === 1
          ? `mañana a las ${formatMinute(row.openMinute)} hs`
          : `el ${row.label.toLowerCase()} a las ${formatMinute(row.openMinute)} hs`;

    return {
      isOpen: false,
      headline: "Cerrado ahora",
      detail: `Abre ${when}`,
    };
  }

  return { isOpen: false, headline: "Cerrado ahora", detail: "Consultá los horarios abajo" };
}
