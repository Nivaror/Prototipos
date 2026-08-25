import { Anchor } from "@phosphor-icons/react/dist/ssr";
import { featuredPlan, otherPlans } from "@/lib/plans";

export function Plans() {
  return (
    <section id="servicios" className="bg-[#f6f4ee] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display max-w-md text-3xl font-semibold text-[#12202b] md:text-4xl">
          Planes de guardado
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="flex flex-col justify-between rounded-2xl bg-[#12202b] p-8 text-white md:p-10">
            <div>
              <Anchor size={28} weight="light" className="text-[#c98a3e]" />
              <h3 className="font-display mt-6 text-2xl font-semibold md:text-3xl">
                {featuredPlan.name}
              </h3>
              <p className="mt-4 max-w-sm text-white/80">{featuredPlan.description}</p>
            </div>
            <a
              href="#contacto"
              className="mt-8 inline-block w-fit rounded-md bg-[#c98a3e] px-6 py-2.5 text-sm font-semibold text-[#12202b] transition-transform active:scale-[0.98]"
            >
              Consultar disponibilidad
            </a>
          </div>
          <div className="flex flex-col gap-6">
            {otherPlans.map((plan) => (
              <div
                key={plan.name}
                className="flex-1 rounded-2xl border border-[#12202b]/12 bg-white p-6"
              >
                <h3 className="font-display text-lg font-semibold text-[#12202b]">
                  {plan.name}
                </h3>
                <p className="mt-2 text-sm text-[#12202b]/70">{plan.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
