import { Wine, Martini, Sparkle, ForkKnife } from "@phosphor-icons/react/dist/ssr";

const categories = [
  {
    label: "Tintos de la casa",
    note: "Selección de vinos tintos argentinos, por copa o botella.",
    Icon: Wine,
    featured: true,
  },
  {
    label: "Cócteles de autor",
    note: "Creaciones propias de la barra.",
    Icon: Martini,
    featured: false,
  },
  {
    label: "Espumantes",
    note: "Para brindar en grupo.",
    Icon: Sparkle,
    featured: false,
  },
  {
    label: "Tabla para compartir",
    note: "Quesos y fiambres.",
    Icon: ForkKnife,
    featured: false,
  },
];

export function MenuTeaser() {
  return (
    <section id="carta" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <h2 className="font-display text-3xl font-semibold text-wine-100 md:text-4xl">
        Lo que vas a encontrar en la carta
      </h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr] lg:grid-rows-2">
        {categories.map(({ label, note, Icon, featured }) => (
          <div
            key={label}
            className={
              featured
                ? "flex flex-col justify-between rounded-2xl border border-gold-600/40 bg-gradient-to-br from-wine-700 to-wine-900 p-7 lg:row-span-2"
                : "flex flex-col justify-between rounded-2xl border border-wine-700/60 bg-wine-900 p-6"
            }
          >
            <Icon
              size={30}
              weight="light"
              className={featured ? "text-gold-400" : "text-gold-500/80"}
            />
            <div className="mt-6">
              <h3 className="font-display text-xl font-semibold text-wine-100">
                {label}
              </h3>
              <p className="mt-1.5 text-sm text-wine-100/65">{note}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
