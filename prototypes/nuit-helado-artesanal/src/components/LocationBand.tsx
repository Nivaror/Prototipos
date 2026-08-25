import Image from "next/image";
import { MapPin, Clock, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import popsiclesPhoto from "../../public/images/popsicles-marble.jpg";

const IG_URL = "https://www.instagram.com/nuitheladoartesanal";

// Full-bleed photo band with centered overlay text — a third composition
// style (neither the split hero nor the wizard-plus-card layout above).
export function LocationBand() {
  return (
    <section id="ubicacion" className="relative isolate overflow-hidden py-24">
      <Image
        src={popsiclesPhoto}
        alt="Helados en palito sobre una mesada clara"
        fill
        placeholder="blur"
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-ink/80" />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6 px-5 text-center text-cream sm:px-8">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">
          Un clásico de La Florida, abierto todos los días
        </h2>

        <div className="flex flex-col items-center gap-2 text-sm text-cream/85">
          <p className="flex items-center gap-2">
            <MapPin size={18} weight="fill" className="text-raspberry" />
            Blvd. Rondeau 4360, La Florida, Rosario
          </p>
          <p className="flex items-center gap-2">
            <Clock size={18} weight="fill" className="text-raspberry" />
            Los 7 días, con horario extendido (viernes y sábados hasta la 1:30 h)
          </p>
        </div>

        <a
          href={IG_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-2 flex items-center gap-2 rounded-full border border-cream/50 px-6 py-3 text-sm font-semibold transition-colors hover:border-cream"
        >
          <InstagramLogo size={18} weight="bold" />
          @nuitheladoartesanal
        </a>
      </div>
    </section>
  );
}
