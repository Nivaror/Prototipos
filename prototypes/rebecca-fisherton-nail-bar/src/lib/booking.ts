export type Service = {
  id: string;
  name: string;
  duration: number;
  price: number;
  blurb: string;
};

export const services: Service[] = [
  {
    id: "semi",
    name: "Esmaltado semipermanente",
    duration: 45,
    price: 18000,
    blurb: "Color con brillo de larga duración, manos prolijas por semanas.",
  },
  {
    id: "pedicura",
    name: "Pedicura spa",
    duration: 60,
    price: 22000,
    blurb: "Exfoliación, hidratación y esmaltado, pies descansados.",
  },
  {
    id: "combo",
    name: "Combo manos y pies",
    duration: 90,
    price: 34000,
    blurb: "El ritual completo, ideal con un café en el patio mientras esperás.",
  },
  {
    id: "express",
    name: "Esmaltado express",
    duration: 25,
    price: 9500,
    blurb: "Retoque rápido de color entre reuniones.",
  },
];

const HOURS: Record<number, { open: number; close: number } | null> = {
  0: null,
  1: { open: 14 * 60, close: 19 * 60 },
  2: { open: 9 * 60, close: 20 * 60 },
  3: { open: 9 * 60, close: 20 * 60 },
  4: { open: 9 * 60, close: 20 * 60 },
  5: { open: 9 * 60, close: 20 * 60 },
  6: { open: 9 * 60, close: 15 * 60 },
};

export function formatARS(amount: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function minutesToLabel(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

export function nextOpenDays(count: number, from = new Date()) {
  const days: Date[] = [];
  const cursor = new Date(from);
  cursor.setHours(0, 0, 0, 0);
  while (days.length < count) {
    if (HOURS[cursor.getDay()]) days.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

function pseudoRandom(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h % 5;
}

export function slotsForDay(date: Date, service: Service) {
  const hours = HOURS[date.getDay()];
  if (!hours) return [];
  const dateKey = date.toISOString().slice(0, 10);
  const slots: { time: number; available: boolean }[] = [];
  for (let t = hours.open; t + service.duration <= hours.close; t += 30) {
    const taken = pseudoRandom(`${dateKey}-${t}-${service.id}`) === 0;
    slots.push({ time: t, available: !taken });
  }
  return slots;
}

export function formatDayLabel(date: Date) {
  const label = date.toLocaleDateString("es-AR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  return label.replace(".", "");
}
