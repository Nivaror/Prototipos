export type DaySchedule = { open: number; close: number } | null;

// Sunday = 0 ... Saturday = 6
const SCHEDULE: DaySchedule[] = [
  null, // Sunday: closed
  { open: 16, close: 22 }, // Monday
  { open: 16, close: 22 }, // Tuesday
  { open: 16, close: 22 }, // Wednesday
  { open: 16, close: 24 }, // Thursday
  { open: 16, close: 24 }, // Friday
  { open: 16, close: 24 }, // Saturday
];

export function isOpenAt(date: Date): boolean {
  const day = SCHEDULE[date.getDay()];
  if (!day) return false;
  const hour = date.getHours() + date.getMinutes() / 60;
  return hour >= day.open && hour < day.close;
}

export function scheduleFor(day: number): DaySchedule {
  return SCHEDULE[day];
}

export function timeSlotsFor(day: number): string[] {
  const day_ = SCHEDULE[day];
  if (!day_) return [];
  const slots: string[] = [];
  for (let h = day_.open; h < day_.close; h += 0.5) {
    const hour = Math.floor(h) % 24;
    const min = h % 1 === 0 ? "00" : "30";
    slots.push(`${String(hour).padStart(2, "0")}:${min}`);
  }
  return slots;
}
