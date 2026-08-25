"use client";

import { useState } from "react";
import Image from "next/image";
import { Coffee, ForkKnife, Martini, Popcorn } from "@phosphor-icons/react/dist/ssr";

type Category = {
  id: string;
  label: string;
  icon: typeof Coffee;
  items: { name: string; note: string }[];
};

// Placeholder menu: the audit gives no confirmed menu, so this is plausible
// generic café-bar filler per core/prototype-workflow.md's placeholder rules
// (no invented prices, no invented signature dish).
const CATEGORIES: Category[] = [
  {
    id: "cafe",
    label: "Café",
    icon: Coffee,
    items: [
      { name: "Espresso", note: "Simple o doble" },
      { name: "Cortado", note: "Clásico de barra" },
      { name: "Café con leche", note: "En jarrito o vaso" },
      { name: "Submarino", note: "Chocolate caliente con barrita" },
    ],
  },
  {
    id: "tostados",
    label: "Tostados",
    icon: ForkKnife,
    items: [
      { name: "Tostado de jamón y queso", note: "Pan de miga o francés" },
      { name: "Tostado de milanesa", note: "Con lechuga y tomate" },
      { name: "Sándwich de miga", note: "Triple, surtido" },
      { name: "Medialunas", note: "Dulces o saladas, de a 2" },
    ],
  },
  {
    id: "bebidas",
    label: "Bebidas",
    icon: Martini,
    items: [
      { name: "Cerveza tirada", note: "Pinta o schop" },
      { name: "Cerveza en botella", note: "Rubia o IPA" },
      { name: "Fernet con cola", note: "Trago de la casa" },
      { name: "Gin tonic", note: "Con botánicos" },
    ],
  },
  {
    id: "picar",
    label: "Para picar",
    icon: Popcorn,
    items: [
      { name: "Papas fritas", note: "Porción para compartir" },
      { name: "Rabas", note: "Con salsa golf" },
      { name: "Tabla de fiambres y quesos", note: "Para 2-3 personas" },
      { name: "Maní y aceitunas", note: "Para acompañar el trago" },
    ],
  },
];

export function Menu() {
  const [activeId, setActiveId] = useState(CATEGORIES[0].id);
  const active = CATEGORIES.find((c) => c.id === activeId)!;

  return (
    <section id="menu" className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">
          Menú
        </h2>
        <p className="hidden text-sm text-ink-soft md:block">
          Una selección de lo que vas a encontrar en la carta.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div className="flex gap-2 overflow-x-auto pb-1 md:flex-col md:overflow-visible">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = cat.id === activeId;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveId(cat.id)}
                aria-pressed={isActive}
                className={`flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-colors md:shrink ${
                  isActive
                    ? "border-terracotta bg-terracotta text-white"
                    : "border-slate-soft bg-surface text-ink hover:border-terracotta/50"
                }`}
              >
                <Icon size={20} weight={isActive ? "fill" : "regular"} />
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-[1.3fr_1fr]">
          <ul className="divide-y divide-slate-soft rounded-2xl border border-slate-soft bg-surface">
            {active.items.map((item) => (
              <li key={item.name} className="flex flex-col gap-0.5 px-5 py-4">
                <span className="font-semibold text-ink">{item.name}</span>
                <span className="text-sm text-ink-soft">{item.note}</span>
              </li>
            ))}
          </ul>

          <div className="relative hidden overflow-hidden rounded-2xl sm:block">
            <Image
              src="https://images.unsplash.com/photo-1668446377138-c763c16e99f0?w=1200&q=75&auto=format&fit=crop"
              alt="Tostado recién hecho"
              fill
              sizes="30vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
