import { MapPin } from "@phosphor-icons/react/dist/ssr";
import { isOpenNow } from "@/lib/hours";

export function HoursLocation() {
  const open = isOpenNow();

  return (
    <section id="horarios" className="bg-[#12202b] py-20 text-white md:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[3fr_2fr] lg:gap-16">
        <div>
          <h2 className="font-display text-3xl font-semibold md:text-4xl">Horarios</h2>
          <div
            className={`mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${
              open ? "bg-emerald-500/15 text-emerald-300" : "bg-white/10 text-white/60"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${open ? "bg-emerald-400" : "bg-white/40"}`} />
            {open ? "Abierto ahora" : "Cerrado ahora"}
          </div>
          <p className="font-display mt-8 text-4xl font-semibold md:text-5xl">
            8:00 a 21:00
          </p>
          <p className="mt-2 text-white/70">Todos los días, sin excepción.</p>
        </div>
        <div className="flex flex-col justify-between rounded-2xl border border-white/12 bg-white/5 p-8">
          <div>
            <MapPin size={28} weight="light" className="text-[#c98a3e]" />
            <h3 className="font-display mt-6 text-xl font-semibold">Cómo llegar</h3>
            <p className="mt-3 text-sm text-white/75">
              José Hernández 742, Sarmiento, Rosario, Santa Fe.
            </p>
          </div>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Jos%C3%A9%20Hern%C3%A1ndez%20742%2C%20Rosario"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block w-fit rounded-md border border-white/25 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-white/10"
          >
            Ver en el mapa
          </a>
        </div>
      </div>
    </section>
  );
}
