"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Truck,
  Storefront,
} from "@phosphor-icons/react";
import { FLAVORS, SIZES, formatPrice, canAddFlavor, type Size } from "@/lib/order";

type Mode = "delivery" | "pickup";

const STEP_LABELS = ["Formato", "Gustos", "Entrega", "Confirmar"];

export function OrderFlow() {
  const [step, setStep] = useState(1);
  const [sizeId, setSizeId] = useState<string | null>(null);
  const [flavors, setFlavors] = useState<string[]>([]);
  const [mode, setMode] = useState<Mode>("delivery");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const size: Size | null = useMemo(
    () => SIZES.find((s) => s.id === sizeId) ?? null,
    [sizeId],
  );

  function toggleFlavor(id: string) {
    setFlavors((prev) => {
      if (prev.includes(id)) return prev.filter((f) => f !== id);
      if (!canAddFlavor(prev, size)) return prev;
      return [...prev, id];
    });
  }

  const canGoStep2 = size !== null;
  const canGoStep3 = flavors.length > 0;
  const canGoStep4 = mode === "pickup" || address.trim() !== "";
  const canConfirm = name.trim() !== "";

  function next() {
    if (step === 1 && !canGoStep2) return;
    if (step === 2 && !canGoStep3) return;
    if (step === 3 && !canGoStep4) return;
    setStep((s) => Math.min(4, s + 1));
  }

  function back() {
    setStep((s) => Math.max(1, s - 1));
  }

  function handleConfirm() {
    if (!canConfirm) return;
    setConfirmed(true);
  }

  const flavorNames = flavors
    .map((id) => FLAVORS.find((f) => f.id === id)?.name)
    .filter(Boolean)
    .join(", ");

  return (
    <section id="pedido" className="bg-cream py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
          Armá tu pedido
        </h2>
        <p className="mt-2 max-w-md text-sm text-ink/70">
          Los mismos gustos de siempre, en cuatro pasos rápidos.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          {/* Wizard */}
          <div className="rounded-[24px] border border-ink/10 bg-white/60 p-6 sm:p-8">
            {!confirmed && (
              <ol className="mb-7 flex gap-2 text-xs font-semibold text-ink/40">
                {STEP_LABELS.map((label, i) => (
                  <li
                    key={label}
                    className={`flex items-center gap-2 ${
                      i + 1 === step ? "text-raspberry" : ""
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] ${
                        i + 1 <= step
                          ? "bg-raspberry text-cream"
                          : "bg-ink/10 text-ink/50"
                      }`}
                    >
                      {i + 1}
                    </span>
                    {label}
                    {i < STEP_LABELS.length - 1 && (
                      <span className="hidden text-ink/20 sm:inline">/</span>
                    )}
                  </li>
                ))}
              </ol>
            )}

            {confirmed ? (
              <div className="flex flex-col items-center gap-4 py-10 text-center">
                <CheckCircle size={48} weight="fill" className="text-raspberry" />
                <h3 className="font-display text-2xl font-bold text-ink">
                  ¡Pedido confirmado!
                </h3>
                <p className="max-w-sm text-sm leading-relaxed text-ink/70">
                  {name}, tu {size?.label.toLowerCase()} con {flavorNames} está en
                  camino{mode === "pickup" ? " a estar listo para retirar" : ""}.
                </p>
                <p className="max-w-sm text-xs text-ink/40">
                  Esto es una muestra: en el sitio real, esta confirmación también
                  llegaría por mensaje.
                </p>
              </div>
            ) : (
              <>
                {step === 1 && (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {SIZES.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => {
                          setSizeId(s.id);
                          setFlavors((prev) => prev.slice(0, s.maxFlavors));
                        }}
                        className={`rounded-[16px] border px-4 py-4 text-left transition-colors ${
                          sizeId === s.id
                            ? "border-raspberry bg-raspberry-100"
                            : "border-ink/12 hover:border-raspberry/50"
                        }`}
                      >
                        <p className="font-display font-bold text-ink">{s.label}</p>
                        <p className="mt-1 text-xs text-ink/60">{s.format}</p>
                        <p className="mt-2 text-sm font-semibold text-raspberry">
                          {formatPrice(s.price)}
                        </p>
                      </button>
                    ))}
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <p className="mb-4 text-xs font-medium text-ink/50">
                      {flavors.length}/{size?.maxFlavors} gustos elegidos
                    </p>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {FLAVORS.map((f) => {
                        const selected = flavors.includes(f.id);
                        const disabled = !selected && !canAddFlavor(flavors, size);
                        return (
                          <button
                            key={f.id}
                            type="button"
                            disabled={disabled}
                            onClick={() => toggleFlavor(f.id)}
                            className={`flex flex-col items-center gap-2 rounded-[16px] border px-3 py-4 text-center transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                              selected
                                ? "border-raspberry bg-raspberry-100"
                                : "border-ink/12 hover:border-raspberry/50"
                            }`}
                          >
                            <span
                              className="h-8 w-8 rounded-full border border-ink/10"
                              style={{ backgroundColor: f.tone }}
                            />
                            <span className="text-xs font-medium text-ink/85">
                              {f.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="flex flex-col gap-5">
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setMode("delivery")}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-full border px-4 py-3 text-sm font-semibold transition-colors ${
                          mode === "delivery"
                            ? "border-raspberry bg-raspberry-100 text-raspberry-dark"
                            : "border-ink/15 text-ink/70"
                        }`}
                      >
                        <Truck size={18} weight="bold" />
                        Delivery
                      </button>
                      <button
                        type="button"
                        onClick={() => setMode("pickup")}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-full border px-4 py-3 text-sm font-semibold transition-colors ${
                          mode === "pickup"
                            ? "border-raspberry bg-raspberry-100 text-raspberry-dark"
                            : "border-ink/15 text-ink/70"
                        }`}
                      >
                        <Storefront size={18} weight="bold" />
                        Retiro en el local
                      </button>
                    </div>

                    {mode === "delivery" ? (
                      <div className="flex flex-col gap-2">
                        <label htmlFor="address" className="text-sm text-ink/80">
                          Dirección de entrega
                        </label>
                        <input
                          id="address"
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Calle, número y barrio"
                          className="rounded-[12px] border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink outline-none placeholder:text-ink/35 focus:border-raspberry"
                        />
                      </div>
                    ) : (
                      <p className="rounded-[12px] bg-mint px-4 py-3 text-sm text-ink/75">
                        Retirás en Blvd. Rondeau 4360, La Florida, Rosario.
                      </p>
                    )}
                  </div>
                )}

                {step === 4 && (
                  <div className="flex flex-col gap-5">
                    <div className="rounded-[12px] bg-mint px-4 py-3 text-sm text-ink/80">
                      <p>
                        <span className="font-semibold">{size?.label}</span> ·{" "}
                        {flavorNames}
                      </p>
                      <p className="mt-1 text-ink/60">
                        {mode === "delivery" ? `Envío a ${address}` : "Retiro en el local"}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-sm text-ink/80">
                        Nombre
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Tu nombre"
                        className="rounded-[12px] border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink outline-none placeholder:text-ink/35 focus:border-raspberry"
                      />
                    </div>
                  </div>
                )}

                <div className="mt-7 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={back}
                    disabled={step === 1}
                    className="flex items-center gap-1.5 text-sm font-medium text-ink/60 transition-colors hover:text-ink disabled:opacity-0"
                  >
                    <ArrowLeft size={16} weight="bold" />
                    Volver
                  </button>

                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={next}
                      disabled={
                        (step === 1 && !canGoStep2) ||
                        (step === 2 && !canGoStep3) ||
                        (step === 3 && !canGoStep4)
                      }
                      className="flex items-center gap-2 rounded-full bg-raspberry px-6 py-3 text-sm font-semibold text-cream transition-transform active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Siguiente
                      <ArrowRight size={16} weight="bold" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleConfirm}
                      disabled={!canConfirm}
                      className="rounded-full bg-raspberry px-6 py-3 text-sm font-semibold text-cream transition-transform active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Confirmar pedido
                    </button>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Live summary */}
          <div className="rounded-[24px] bg-ink px-6 py-6 text-cream lg:sticky lg:top-24">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-cream/50">
              Tu pedido
            </p>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              <div className="flex items-center justify-between border-b border-cream/10 pb-3">
                <span className="text-cream/60">Formato</span>
                <span className="font-medium">{size ? size.label : "Sin elegir"}</span>
              </div>
              <div className="flex items-center justify-between border-b border-cream/10 pb-3">
                <span className="text-cream/60">Gustos</span>
                <span className="max-w-[55%] text-right font-medium">
                  {flavors.length > 0 ? flavorNames : "Sin elegir"}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-cream/10 pb-3">
                <span className="text-cream/60">Entrega</span>
                <span className="font-medium">
                  {mode === "delivery" ? "A domicilio" : "Retiro en el local"}
                </span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-cream/60">Total</span>
                <span className="font-display text-lg font-bold text-raspberry">
                  {size ? formatPrice(size.price) : "-"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
