import { Star, Truck, Storefront } from "@phosphor-icons/react/dist/ssr";

// Slim trust band directly under the hero (never inside it, per hero-stack rule).
export function StatsStrip() {
  return (
    <section className="border-b border-ink/8 bg-cream">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-5 py-8 sm:grid-cols-3 sm:px-8">
        <div className="flex items-center gap-3">
          <Star size={22} weight="fill" className="shrink-0 text-raspberry" />
          <p className="text-sm text-ink/80">
            <span className="font-display font-bold text-ink">4.5</span> · 2.335
            reseñas en Google
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Truck size={22} weight="fill" className="shrink-0 text-raspberry" />
          <p className="text-sm text-ink/80">Delivery a domicilio, todos los días</p>
        </div>
        <div className="flex items-center gap-3">
          <Storefront size={22} weight="fill" className="shrink-0 text-raspberry" />
          <p className="text-sm text-ink/80">Retiro en el local, sin esperar turno</p>
        </div>
      </div>
    </section>
  );
}
