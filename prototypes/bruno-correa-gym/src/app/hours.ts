export type ScheduleSource = "maps" | "instagram";

export const DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"] as const;

export const SCHEDULES: Record<ScheduleSource, Record<(typeof DAYS)[number], string>> = {
  maps: { Lun: "08:00 - 22:00", Mar: "08:00 - 22:00", Mié: "08:00 - 22:00", Jue: "08:00 - 22:00", Vie: "08:00 - 22:00", Sáb: "Cerrado", Dom: "Cerrado" },
  instagram: { Lun: "08:00 - 21:00", Mar: "08:00 - 21:00", Mié: "08:00 - 21:00", Jue: "08:00 - 21:00", Vie: "08:00 - 21:00", Sáb: "Cerrado", Dom: "Cerrado" },
};

export const SOURCE_LABELS: Record<ScheduleSource, string> = { maps: "Google Maps", instagram: "Instagram" };

export function getLiveStatus(source: ScheduleSource): { isOpen: boolean; label: string } {
  const now = new Date();
  const weekday = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "America/Argentina/Buenos_Aires" }).format(now);
  const dayIndex = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(weekday);
  if (dayIndex < 0 || dayIndex > 4) return { isOpen: false, label: "Cerrado hoy" };

  const hour = Number(new Intl.DateTimeFormat("en-US", { hour: "2-digit", hour12: false, timeZone: "America/Argentina/Buenos_Aires" }).format(now));
  const close = source === "maps" ? 22 : 21;
  const open = hour >= 8 && hour < close;
  return { isOpen: open, label: open ? "Abierto ahora" : "Cerrado ahora" };
}
