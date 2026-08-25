"use client";

import { useState, type FormEvent } from "react";
import { Bicycle, Storefront, CheckCircle } from "@phosphor-icons/react/dist/ssr";

const ITEMS = [
  "Café + medialunas",
  "Tostado de jamón y queso",
  "Picada para compartir",
  "Cerveza tirada (pinta)",
];

type Mode = "delivery" | "retirar";

export function QuickOrder() {
  const [mode, setMode] = useState<Mode>("delivery");
  const [selected, setSelected] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  function toggleItem(item: string) {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Contanos tu nombre para el pedido.");
      return;
    }
    if (selected.length === 0) {
      setError("Elegí al menos un producto.");
      return;
    }
    setError(null);
    // Demo only: no backend, nothing is actually sent anywhere.
    setSent(true);
  }

  function reset() {
    setSent(false);
    setSelected([]);
    setName("");
    setNote("");
    setError(null);
  }

  return (
    <section id="pedir" className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
      <div className="mx-auto max-w-xl">
        <h2 className="text-center text-2xl font-bold tracking-tight text-ink md:text-3xl">
          Pedí para delivery o retiro
        </h2>
        <p className="mt-2 text-center text-sm text-ink-soft">
          Dejanos tus datos y lo coordinamos. Sin llamadas, sin esperas.
        </p>

        <div className="mt-8 rounded-[28px] border border-slate-soft bg-surface p-6 shadow-sm md:p-8">
          {sent ? (
            <div className="flex flex-col items-center py-6 text-center">
              <CheckCircle size={48} weight="fill" className="text-open" />
              <h3 className="mt-4 text-xl font-semibold text-ink">
                ¡Pedido registrado!
              </h3>
              <p className="mt-2 max-w-[38ch] text-sm text-ink-soft">
                Esta es una demo: en el sitio real, el equipo de KAAPI
                recibiría este pedido y se contactaría para coordinar la{" "}
                {mode === "delivery" ? "entrega" : "hora de retiro"}.
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-6 rounded-full border border-slate-soft px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-terracotta/50"
              >
                Hacer otro pedido
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-2 gap-2 rounded-full bg-paper p-1">
                <button
                  type="button"
                  onClick={() => setMode("delivery")}
                  aria-pressed={mode === "delivery"}
                  className={`flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                    mode === "delivery"
                      ? "bg-terracotta text-white"
                      : "text-ink-soft"
                  }`}
                >
                  <Bicycle size={18} weight="bold" />
                  Delivery
                </button>
                <button
                  type="button"
                  onClick={() => setMode("retirar")}
                  aria-pressed={mode === "retirar"}
                  className={`flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                    mode === "retirar"
                      ? "bg-terracotta text-white"
                      : "text-ink-soft"
                  }`}
                >
                  <Storefront size={18} weight="bold" />
                  Retirar
                </button>
              </div>

              <fieldset className="mt-6">
                <legend className="text-sm font-semibold text-ink">
                  ¿Qué te llevás?
                </legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {ITEMS.map((item) => {
                    const isSelected = selected.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleItem(item)}
                        aria-pressed={isSelected}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                          isSelected
                            ? "border-terracotta bg-terracotta-100 text-terracotta-dark"
                            : "border-slate-soft text-ink-soft hover:border-terracotta/50"
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="mt-6 flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-semibold text-ink">
                  Tu nombre
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Como para llamarte al pedido"
                  className="rounded-xl border border-slate-soft bg-white px-4 py-3 text-ink placeholder:text-ink-soft focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                />
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <label htmlFor="note" className="text-sm font-semibold text-ink">
                  {mode === "delivery" ? "Dirección de entrega" : "Aclaraciones"}{" "}
                  <span className="font-normal text-ink-soft">(opcional)</span>
                </label>
                <textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={2}
                  placeholder={
                    mode === "delivery"
                      ? "Calle, altura y referencia"
                      : "Horario aproximado de retiro"
                  }
                  className="resize-none rounded-xl border border-slate-soft bg-white px-4 py-3 text-ink placeholder:text-ink-soft focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                />
              </div>

              {error && (
                <p className="mt-3 text-sm font-medium text-closed">{error}</p>
              )}

              <button
                type="submit"
                className="mt-6 w-full rounded-full bg-terracotta px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-terracotta-dark"
              >
                Confirmar pedido
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
