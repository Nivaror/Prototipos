// Weekly schedule for Chichilo's, sourced exactly from the confirmed lead
// audit (Nivaror Vault /leads/chichilos.md). Nothing here is invented or
// rounded — the "~" on Thu/Fri/Sat/Sun is preserved as an approximation in
// the label rather than presented as a precise hour, since the source data
// itself only gives an approximate start time.

export type DayInfo = {
  key: string;
  short: string; // 3-letter label for compact cells
  label: string; // full day name
  hours: string; // display string, exact per source
  note?: string;
  dominant?: boolean;
  // JS Date#getDay(): 0 = Sunday ... 6 = Saturday
  dow: number;
};

export const schedule: DayInfo[] = [
  {
    key: "miercoles",
    short: "MIÉ",
    label: "Miércoles",
    hours: "Abierto las 24 horas",
    note: "El único día de la semana sin cierre",
    dominant: true,
    dow: 3,
  },
  {
    key: "jueves",
    short: "JUE",
    label: "Jueves",
    hours: "Aprox. 19:00 a 00:00",
    dow: 4,
  },
  {
    key: "viernes",
    short: "VIE",
    label: "Viernes",
    hours: "Aprox. 19:00 a 00:00",
    dow: 5,
  },
  {
    key: "lunes",
    short: "LUN",
    label: "Lunes",
    hours: "9:00 a 17:00",
    dow: 1,
  },
  {
    key: "martes",
    short: "MAR",
    label: "Martes",
    hours: "00:00 a 23:30",
    dow: 2,
  },
  {
    key: "sabado",
    short: "SÁB",
    label: "Sábado",
    hours: "Aprox. 19:00 a 00:00",
    dow: 6,
  },
  {
    key: "domingo",
    short: "DOM",
    label: "Domingo",
    hours: "Aprox. 19:00 a 00:00",
    dow: 0,
  },
];
