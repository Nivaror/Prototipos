import { GenderFemale, WifiHigh, Coffee } from "@phosphor-icons/react/dist/ssr";

const items = [
  { icon: GenderFemale, label: "Emprendimiento liderado por mujeres" },
  { icon: WifiHigh, label: "Wi-Fi gratis para clientas" },
  { icon: Coffee, label: "Patio al aire libre con café" },
];

export function InfoStrip() {
  return (
    <section className="border-y border-line bg-panel">
      <div className="mx-auto flex max-w-3xl flex-wrap items-start justify-center gap-x-10 gap-y-6 px-4 py-8 text-center sm:px-6">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex w-40 flex-col items-center gap-2 sm:w-44">
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
