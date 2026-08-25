"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();

    if (!name || !email) {
      setError("Completá tu nombre y un email de contacto.");
      return;
    }
    setError("");
    setSent(true);
  }

  return (
    <section id="contacto" className="bg-[#f6f4ee] py-20 md:py-28">
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        <h2 className="font-display text-center text-3xl font-semibold text-[#12202b] md:text-4xl">
          Consultá disponibilidad
        </h2>
        <p className="mt-3 text-center text-sm text-[#12202b]/70">
          Dejanos tus datos y te contactamos con la info de guardado.
        </p>

        {sent ? (
          <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-[#12202b]/12 bg-white p-10 text-center">
            <CheckCircle size={36} weight="fill" className="text-emerald-600" />
            <p className="font-medium text-[#12202b]">Consulta recibida.</p>
            <p className="text-sm text-[#12202b]/70">
              Te vamos a responder a la brevedad con la disponibilidad y los planes.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-[#12202b]">
                Nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Tu nombre"
                className="rounded-md border border-[#12202b]/20 bg-white px-4 py-2.5 text-sm text-[#12202b] placeholder:text-[#12202b]/40 focus:border-[#c98a3e] focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-[#12202b]">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                className="rounded-md border border-[#12202b]/20 bg-white px-4 py-2.5 text-sm text-[#12202b] placeholder:text-[#12202b]/40 focus:border-[#c98a3e] focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium text-[#12202b]">
                Mensaje (opcional)
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                placeholder="Contanos qué necesitás guardar"
                className="rounded-md border border-[#12202b]/20 bg-white px-4 py-2.5 text-sm text-[#12202b] placeholder:text-[#12202b]/40 focus:border-[#c98a3e] focus:outline-none"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              className="mt-2 rounded-md bg-[#12202b] px-6 py-3 text-sm font-semibold text-white transition-transform active:scale-[0.98]"
            >
              Enviar consulta
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
