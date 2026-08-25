import { Star, CalendarCheck, MapPin } from "@phosphor-icons/react/dist/ssr";

const FACTS = [
  { icon: Star, label: "4.4★ · 149 reseñas en Google" },
  { icon: CalendarCheck, label: "Abierto los 7 días, 8 a 21 hs" },
  { icon: MapPin, label: "Sarmiento, Rosario" },
];

export function TrustStrip() {
  return (
    <section className="border-b border-[#12202b]/10 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-4 px-4 py-6 text-sm text-[#12202b]/80 sm:flex-row sm:gap-10 sm:px-6">
        {FACTS.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2">
            <Icon size={18} weight="fill" className="text-[#c98a3e]" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
