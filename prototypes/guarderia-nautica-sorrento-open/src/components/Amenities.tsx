import { ShieldCheck, Waves, Lifebuoy, Car } from "@phosphor-icons/react/dist/ssr";

const AMENITIES = [
  { icon: ShieldCheck, label: "Seguridad las 24 horas" },
  { icon: Waves, label: "Acceso directo al río" },
  { icon: Lifebuoy, label: "Asistencia para botadura" },
  { icon: Car, label: "Estacionamiento para socios" },
];

export function Amenities() {
  return (
    <section id="instalaciones" className="bg-white py-16 md:py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-4 sm:px-6 md:grid-cols-4">
        {AMENITIES.map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-3 text-center">
            <Icon size={30} weight="light" className="text-[#12202b]" />
            <span className="text-sm text-[#12202b]/75">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
