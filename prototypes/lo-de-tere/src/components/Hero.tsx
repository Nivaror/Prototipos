import Image from "next/image";
import { OpenBadge } from "./OpenBadge";

// Overlapping/layered asymmetric hero: a portrait photo bleeds to the right
// screen edge, and a solid panel carrying the copy sits offset on top of it
// (not beside it in a clean 50/50 split, and not as a scrim under
// bottom-anchored text). A floating status badge is pinned at the seam
// between panel and photo, breaking both rectangles. This composition isn't
// used by any sibling in the restaurantes/pizzerias/hamburgueserias family:
// not grow-bar-ituzaingo's asymmetric-bleed-with-headline-on-photo, not
// escauriza's full-bleed-scrim, not popolo's clean symmetric 50/50 split,
// not chichilos's top/bottom band, not burger-house-grill's centered framed
// product card.
export function Hero() {
  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden bg-[var(--background)]">
      <div className="relative h-[46vh] w-full md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[64%]">
        <Image
          src="/images/hero-chef-plating.jpg"
          alt="Cocina de Lo de Tere terminando un plato"
          fill
          priority
          sizes="(min-width: 768px) 64vw, 100vw"
          className="object-cover object-[center_28%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent md:hidden" />
      </div>

      <div className="relative z-10 px-6 pb-14 pt-8 md:min-h-[100dvh] md:px-0">
        <div className="mx-auto max-w-7xl md:relative md:h-[100dvh]">
          <p className="font-display text-sm font-semibold tracking-wide text-[var(--accent-soft)] md:absolute md:left-0 md:top-10">
            Lo de Tere
          </p>

          <div className="mt-6 rounded-3xl border border-white/5 bg-[var(--panel)] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.5)] md:absolute md:left-0 md:top-1/2 md:mt-0 md:w-[50%] md:-translate-y-1/2 md:p-12">
            <h1 className="font-display text-4xl font-semibold leading-[1.08] text-[var(--foreground)] md:text-5xl">
              Reservá tu mesa en Lo de Tere sin llamar por teléfono.
            </h1>
            <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-[var(--foreground)]/75">
              Abrimos los siete días de 8 a 24 hs y la reserva es obligatoria.
              Hoy eso solo se coordina por teléfono. Así podría verse online.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#reservar"
                className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(61,107,214,0.45)] transition hover:bg-[var(--accent-soft)]"
              >
                Reservar mesa
              </a>
              <a
                href="#catering"
                className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-[var(--foreground)]/90 transition hover:border-white/35"
              >
                Ver catering
              </a>
            </div>

            <div className="mt-8 md:hidden">
              <OpenBadge />
            </div>
          </div>

          <div className="hidden md:block md:absolute md:left-[42%] md:top-[68%] md:-translate-y-1/2">
            <OpenBadge />
          </div>
        </div>
      </div>
    </section>
  );
}
