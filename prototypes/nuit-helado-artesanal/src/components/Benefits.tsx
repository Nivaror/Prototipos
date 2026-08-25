import { IceCream, Timer, ChatSlash } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./Reveal";

const ITEMS = [
  {
    icon: IceCream,
    text: "Elegís tus gustos exactos, como parado frente a la vitrina",
  },
  {
    icon: Timer,
    text: "Armás el pedido completo en menos de un minuto",
  },
  {
    icon: ChatSlash,
    text: "Nada de escribir y esperar respuesta por Instagram",
  },
];

// Horizontal scroll-snap chip strip: a different UI shape from a card grid,
// used because three short items still deserve rhythm, not another 3-up grid.
export function Benefits() {
  return (
    <section className="bg-mint py-14">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <h2 className="max-w-md font-display text-2xl font-bold text-ink sm:text-3xl">
            Pedir se volvió tan fácil como comerlo
          </h2>
        </Reveal>
        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {ITEMS.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex w-[78%] shrink-0 snap-start items-start gap-3 rounded-[20px] bg-cream px-5 py-5 sm:w-[340px]"
            >
              <Icon size={26} weight="duotone" className="shrink-0 text-raspberry" />
              <p className="text-sm leading-relaxed text-ink/85">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
