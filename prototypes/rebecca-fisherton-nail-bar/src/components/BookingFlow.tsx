"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { CheckCircle, CaretLeft, MapPin } from "@phosphor-icons/react";
import {
  services,
  locations,
  formatARS,
  minutesToLabel,
  nextOpenDays,
  slotsForDay,
  formatDayLabel,
  type Service,
  type Location,
} from "@/lib/booking";

const steps = ["Sucursal", "Servicio", "Horario", "Confirmar"];

function StepHeader({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {steps.map((label, i) => {
        const n = i + 1;
        const done = n < current;
        const active = n === current;
        return (
          <div key={label} className="flex items-center gap-2 sm:gap-3">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                done
                  ? "bg-accent text-accent-ink"
                  : active
                    ? "border-2 border-accent text-accent"
                    : "border border-line text-ink-soft"
              }`}
            >
              {done ? <CheckCircle size={18} weight="fill" /> : n}
            </div>
            <span
              className={`hidden text-sm font-medium sm:block ${
                active ? "text-ink" : "text-ink-soft"
              }`}
            >
              {label}
            </span>
            {n < steps.length && (
              <div className="h-px w-6 bg-line sm:w-10" aria-hidden />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function BookingFlow() {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(1);
  const [locationId, setLocationId] = useState<string | null>(null);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [dateIndex, setDateIndex] = useState(0);
  const [time, setTime] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmed, setConfirmed] = useState<{
    code: string;
    location: Location;
    service: Service;
    date: Date;
    time: number;
  } | null>(null);

  const days = useMemo(() => nextOpenDays(8), []);
  const location = locations.find((l) => l.id === locationId) ?? null;
  const service = services.find((s) => s.id === serviceId) ?? null;
  const selectedDate = days[dateIndex];
  const slots = useMemo(
    () =>
      service && location ? slotsForDay(selectedDate, service, location) : [],
    [service, location, selectedDate],
  );

  function pickLocation(l: Location) {
    setLocationId(l.id);
    setTime(null);
  }

  function pickService(s: Service) {
    setServiceId(s.id);
    setTime(null);
  }

  function pickDate(i: number) {
    setDateIndex(i);
    setTime(null);
  }

  function confirm() {
    if (!location || !service || time === null) return;
    const code = `RB-${location.id.slice(0, 3).toUpperCase()}-${selectedDate.getDate()}${selectedDate.getMonth() + 1}-${time}`;
    setConfirmed({ code, location, service, date: selectedDate, time });
    setStep(5);
  }

  function resetAll() {
    setStep(1);
    setLocationId(null);
    setServiceId(null);
    setDateIndex(0);
    setTime(null);
    setName("");
    setEmail("");
    setConfirmed(null);
  }

  const variants = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, x: 16 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -16 },
      };

  return (
    <section id="reservar" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
        Reservá en 4 pasos
      </h2>
      <p className="mt-3 max-w-[52ch] text-ink-soft">
        Elegís sucursal, servicio y horario, todo sin salir de
        rebeccanailbar.com.ar.
      </p>

      <div className="mt-10 rounded-2xl border border-line bg-panel p-5 sm:p-8">
        {step < 5 && <StepHeader current={step} />}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="s0" {...variants} transition={{ duration: 0.25 }} className="mt-8">
              <p className="text-sm font-medium text-ink-soft">
                ¿En qué sucursal te queda mejor?
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {locations.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => pickLocation(l)}
                    className={`rounded-xl border p-4 text-left transition-colors ${
                      locationId === l.id
                        ? "border-accent bg-accent/10"
                        : "border-line hover:border-ink/30"
                    }`}
                  >
                    <span className="flex items-center gap-2 font-semibold text-ink">
                      <MapPin size={16} className="shrink-0 text-accent" />
                      {l.name}
                    </span>
                    <span className="mt-1 block text-xs text-ink-soft">
                      {l.address}
                    </span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                disabled={!location}
                onClick={() => setStep(2)}
                className="mt-6 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-ink transition-transform disabled:cursor-not-allowed disabled:opacity-40 enabled:active:scale-[0.98]"
              >
                Continuar
              </button>
            </motion.div>
          )}

          {step === 2 && location && (
            <motion.div key="s1" {...variants} transition={{ duration: 0.25 }} className="mt-8">
              <p className="text-sm font-medium text-ink-soft">
                Servicios en {location.name}
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {services.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => pickService(s)}
                    className={`rounded-xl border p-4 text-left transition-colors ${
                      serviceId === s.id
                        ? "border-accent bg-accent/10"
                        : "border-line hover:border-ink/30"
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-semibold text-ink">{s.name}</span>
                      <span className="whitespace-nowrap text-sm font-semibold text-accent">
                        {formatARS(s.price)}
                      </span>
                    </div>
                    <span className="mt-1 block text-xs text-ink-soft">
                      {s.duration} min
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1 rounded-full border border-line px-5 py-3 text-sm font-semibold text-ink hover:border-ink/30"
                >
                  <CaretLeft size={16} /> Atrás
                </button>
                <button
                  type="button"
                  disabled={!service}
                  onClick={() => setStep(3)}
                  className="rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-ink transition-transform disabled:cursor-not-allowed disabled:opacity-40 enabled:active:scale-[0.98]"
                >
                  Continuar
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && location && service && (
            <motion.div key="s2" {...variants} transition={{ duration: 0.25 }} className="mt-8">
              <p className="text-sm font-medium text-ink-soft">Elegí un día</p>
              <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                {days.map((d, i) => (
                  <button
                    key={d.toISOString()}
                    type="button"
                    onClick={() => pickDate(i)}
                    className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium capitalize transition-colors ${
                      i === dateIndex
                        ? "border-accent bg-accent text-accent-ink"
                        : "border-line text-ink-soft hover:border-ink/30"
                    }`}
                  >
                    {formatDayLabel(d)}
                  </button>
                ))}
              </div>

              <p className="mt-6 text-sm font-medium text-ink-soft">
                Horarios disponibles en {location.name} para{" "}
                {service.name.toLowerCase()}
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
                {slots.map((slot) => (
                  <button
                    key={slot.time}
                    type="button"
                    disabled={!slot.available}
                    onClick={() => setTime(slot.time)}
                    className={`rounded-full border px-3 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:border-line disabled:text-ink-soft/40 disabled:line-through ${
                      time === slot.time
                        ? "border-accent bg-accent text-accent-ink"
                        : "border-line text-ink hover:border-ink/30"
                    }`}
                  >
                    {minutesToLabel(slot.time)}
                  </button>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1 rounded-full border border-line px-5 py-3 text-sm font-semibold text-ink hover:border-ink/30"
                >
                  <CaretLeft size={16} /> Atrás
                </button>
                <button
                  type="button"
                  disabled={time === null}
                  onClick={() => setStep(4)}
                  className="rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-ink transition-transform disabled:cursor-not-allowed disabled:opacity-40 enabled:active:scale-[0.98]"
                >
                  Continuar
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && location && service && time !== null && (
            <motion.div key="s3" {...variants} transition={{ duration: 0.25 }} className="mt-8">
              <div className="rounded-xl border border-line bg-bg p-4 text-sm text-ink-soft">
                <p className="font-semibold text-ink">{service.name}</p>
                <p className="mt-1 flex items-start gap-1.5">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-accent" />
                  {location.name} — {location.address}
                </p>
                <p className="mt-1">
                  <span className="capitalize">{formatDayLabel(selectedDate)}</span>{" "}
                  a las {minutesToLabel(time)}
                </p>
                <p className="mt-1">{formatARS(service.price)}</p>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-ink">
                  Nombre
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre"
                    className="rounded-lg border border-line bg-panel px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 focus:border-accent focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-ink">
                  Email (opcional)
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="para la confirmación"
                    className="rounded-lg border border-line bg-panel px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 focus:border-accent focus:outline-none"
                  />
                </label>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex items-center gap-1 rounded-full border border-line px-5 py-3 text-sm font-semibold text-ink hover:border-ink/30"
                >
                  <CaretLeft size={16} /> Atrás
                </button>
                <button
                  type="button"
                  disabled={name.trim().length < 2}
                  onClick={confirm}
                  className="rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-ink transition-transform disabled:cursor-not-allowed disabled:opacity-40 enabled:active:scale-[0.98]"
                >
                  Confirmar reserva
                </button>
              </div>
            </motion.div>
          )}

          {step === 5 && confirmed && (
            <motion.div
              key="s4"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-8 flex flex-col items-start gap-4"
            >
              <CheckCircle size={40} weight="fill" className="text-accent" />
              <div>
                <p className="font-display text-xl font-semibold text-ink">
                  Turno reservado, {name.split(" ")[0]}.
                </p>
                <p className="mt-1 text-sm text-ink-soft">
                  {confirmed.service.name} en {confirmed.location.name},{" "}
                  {formatDayLabel(confirmed.date)} a las{" "}
                  {minutesToLabel(confirmed.time)}. Código {confirmed.code}.
                </p>
                <p className="mt-1 text-sm text-ink-soft">
                  {confirmed.location.address}
                </p>
              </div>
              <button
                type="button"
                onClick={resetAll}
                className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink hover:border-ink/30"
              >
                Hacer otra reserva
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
