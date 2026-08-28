// Lo de Tere is open every day, 8:00 to 24:00 (confirmed on the lead's Google
// listing). Written fresh for this prototype: no other sibling in the
// restaurantes/pizzerias/hamburgueserias family has a uniform-every-day
// schedule, so there's no "closed day" or "multiple windows" branch to
// handle here, unlike escauriza's three windows or popolo's Wednesday
// closure.
export function isOpenNow(date: Date = new Date()): boolean {
  const hour = Number(
    new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: false,
      timeZone: "America/Argentina/Buenos_Aires",
    }).format(date)
  );
  return hour >= 8 && hour < 24;
}
