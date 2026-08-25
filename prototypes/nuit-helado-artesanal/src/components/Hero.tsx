import Image from "next/image";
import { ArrowRight, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import heroPhoto from "../../public/images/hero-gelato-case.jpg";

const IG_URL = "https://www.instagram.com/nuitheladoartesanal";

// Single dominant full-bleed hero, no split — deliberately different from
// club-monaghan's asymmetric text/photo split hero (see sector fingerprints log).
export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[92dvh] items-end overflow-hidden">
      <Image
        src={heroPhoto}
        alt="Vitrina de helados artesanales de distintos colores y sabores"
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-ink/10" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-14 pt-24 sm:px-8 sm:pb-20">
        <h1 className="max-w-lg font-display text-5xl font-bold leading-[1.05] text-cream sm:text-6xl">
          Nuit, a un pedido de distancia
        </h1>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-cream/85 sm:text-lg">
          El clásico de La Florida ahora con pedido online. Elegí tus gustos y
          recibilo en casa o pasalo a buscar.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <a
            href="#pedido"
            className="flex items-center gap-2 rounded-full bg-raspberry px-6 py-3.5 text-sm font-semibold text-cream transition-transform active:scale-[0.97]"
          >
            Pedí ahora
            <ArrowRight size={18} weight="bold" />
          </a>
          <a
            href={IG_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-cream/50 px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:border-cream"
          >
            <InstagramLogo size={18} weight="bold" />
            Ver Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
