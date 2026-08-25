"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus, ShoppingBag, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { menu, formatARS } from "@/lib/menu";

export function MenuOrder() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [confirmed, setConfirmed] = useState(false);

  const add = (id: string) => setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  const remove = (id: string) =>
    setCart((c) => {
      const next = { ...c };
      if (!next[id]) return next;
      next[id] -= 1;
      if (next[id] <= 0) delete next[id];
      return next;
    });

  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const total = Object.entries(cart).reduce(
    (sum, [id, qty]) => sum + qty * (menu.find((m) => m.id === id)?.price ?? 0),
    0
  );

  return (
    <section id="menu" className="bg-zinc-950 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-3xl text-white sm:text-4xl">Pedí para esta noche</h2>
        <p className="mt-2 max-w-md text-sm text-zinc-400">
          Elegí, sumá al pedido y confirmá. Así de simple sería reservar tu burger antes de venir.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {menu.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 rounded-2xl border border-white/10 bg-zinc-900 p-4"
            >
              {item.image ? (
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                  <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
                </div>
              ) : (
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-zinc-800 text-orange-500">
                  <ShoppingBag size={28} weight="regular" />
                </div>
              )}
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h3 className="font-display text-lg text-white">{item.name}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-400">{item.description}</p>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-semibold text-orange-400">{formatARS(item.price)}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => remove(item.id)}
                      disabled={!cart[item.id]}
                      aria-label={`Quitar ${item.name}`}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 text-white transition disabled:opacity-30"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-4 text-center text-sm text-white">{cart[item.id] ?? 0}</span>
                    <button
                      onClick={() => add(item.id)}
                      aria-label={`Agregar ${item.name}`}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-600 text-white transition hover:bg-orange-500 active:scale-[0.98]"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {count > 0 && !confirmed && (
          <div className="sticky bottom-4 z-30 mt-8 flex items-center justify-between rounded-2xl border border-orange-500/40 bg-zinc-900/95 px-5 py-4 backdrop-blur">
            <div className="flex items-center gap-2 text-sm text-white">
              <ShoppingBag size={18} weight="fill" className="text-orange-400" />
              {count} {count === 1 ? "producto" : "productos"} · {formatARS(total)}
            </div>
            <button
              onClick={() => setConfirmed(true)}
              className="rounded-full bg-orange-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-orange-500 active:scale-[0.98]"
            >
              Confirmar pedido
            </button>
          </div>
        )}

        {confirmed && (
          <div className="sticky bottom-4 z-30 mt-8 flex items-center gap-3 rounded-2xl border border-emerald-500/40 bg-zinc-900/95 px-5 py-4 backdrop-blur">
            <CheckCircle size={20} weight="fill" className="text-emerald-400" />
            <p className="text-sm text-white">
              Pedido recibido. Así de rápido podría confirmarse un pedido real desde tu web.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
