import { Clock, CalendarCheck, Star } from "@phosphor-icons/react/dist/ssr";

// A thin three-chip info bar, not a full "horarios" section like the
// generic sector skeleton or a weekly-schedule grid/strip like chichilos's
// bento or popolo's seven-cell strip - Lo de Tere's hours are the same
// every day, so a big schedule visualization would be empty calories here.
export function InfoStrip() {
  const items = [
    { icon: Clock, label: "8 a 24 hs, todos los días" },
    { icon: CalendarCheck, label: "Reserva obligatoria" },
    { icon: Star, label: "4,2 · 3.822 reseñas en Google" },
  ];

  return (
    <section className="border-y border-white/10 bg-[var(--background)]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
        {items.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center justify-center gap-2.5 px-6 py-5 text-sm text-[var(--foreground)]/80"
          >
            <Icon size={18} weight="regular" className="text-[var(--accent-soft)]" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
