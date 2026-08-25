import { GenderFemale, WifiHigh, Coffee } from "@phosphor-icons/react/dist/ssr";

const items = [
  { icon: GenderFemale, label: "Emprendimiento liderado por mujeres" },
  { icon: WifiHigh, label: "Wi-Fi gratis para clientas" },
  { icon: Coffee, label: "Patio al aire libre con café" },
];

export function InfoStrip() {
  return (
    <section className="border-y border-line bg-panel">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4 md:gap-4">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-start gap-2 md:items-center md:text-center">
            <Icon size={22} weight="regular" className="text-accent" />
            <span className="text-xs leading-snug text-ink-soft md:text-sm">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
