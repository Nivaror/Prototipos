import Image from "next/image";
import { Wheelchair, Baby } from "@phosphor-icons/react/dist/ssr";

const WHEELCHAIR_FACTS = [
  "Entrada accesible para personas en silla de ruedas",
  "Espacio y mesas accesibles",
  "Estacionamiento accesible",
  "Sanitarios accesibles",
];

const FAMILY_FACTS = [
  "Menú para niños",
  "Sillas altas disponibles",
  "Cambiador de pañales",
];

export function AccessibilityPanel() {
  return (
    <section className="grid grid-cols-1 bg-[#18130f] md:grid-cols-2">
      <div className="flex flex-col justify-center gap-10 px-4 py-20 sm:px-6 md:px-14 md:py-28">
        <h2 className="font-display text-3xl text-[#f3ece1] sm:text-4xl">
          Pensado para que vengas como quieras
        </h2>

        <div>
          <div className="flex items-center gap-2 text-[#e4805f]">
            <Wheelchair size={20} weight="fill" />
            <p className="text-sm font-semibold uppercase tracking-wide">Accesibilidad</p>
          </div>
          <ul className="mt-3 flex flex-col gap-1.5 text-sm leading-relaxed text-[#f3ece1]/75">
            {WHEELCHAIR_FACTS.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-2 text-[#e4805f]">
            <Baby size={20} weight="fill" />
            <p className="text-sm font-semibold uppercase tracking-wide">Con la familia</p>
          </div>
          <ul className="mt-3 flex flex-col gap-1.5 text-sm leading-relaxed text-[#f3ece1]/75">
            {FAMILY_FACTS.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative min-h-[320px]">
        <Image
          src="/images/detail-table-setting.jpg"
          alt="Mesa servida en Escauriza"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
