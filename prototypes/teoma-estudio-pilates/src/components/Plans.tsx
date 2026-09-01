"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import PaymentModal from "./PaymentModal";
import styles from "./Plans.module.css";

const plans = [
  {
    id: "clase-suelta",
    tone: "light",
    name: "Clase suelta",
    price: "$6.500",
    period: "por clase",
    body: "Ideal para probar pilates o funcional sin atarte a un plan.",
    features: ["1 clase, la disciplina que elijas", "Sin permanencia"],
    featured: false,
  },
  {
    id: "plan-8",
    tone: "dark",
    name: "Plan 8 clases",
    price: "$42.000",
    period: "por mes",
    body: "El plan más elegido: dos clases por semana, combinando disciplinas.",
    features: ["8 clases al mes", "Pilates y funcional combinables", "Válido 30 días"],
    featured: true,
  },
  {
    id: "plan-ilimitado",
    tone: "light",
    name: "Ilimitado",
    price: "$58.000",
    period: "por mes",
    body: "Para quienes entrenan seguido y quieren libertad de horarios.",
    features: ["Clases ilimitadas", "Pilates y funcional combinables", "Válido 30 días"],
    featured: false,
  },
] as const;

export type Plan = (typeof plans)[number];

export default function Plans() {
  const [selected, setSelected] = useState<Plan | null>(null);

  return (
    <section id="planes" className={styles.section}>
      <Reveal>
        <h2 className={styles.heading}>Planes</h2>
        <p className={styles.subheading}>
          Elegí cómo entrenar. Podés cambiar de plan cuando quieras.
        </p>
      </Reveal>
      <div className={styles.grid}>
        {plans.map((plan) => (
          <Reveal key={plan.id}>
            <article
              className={`${styles.card} ${styles[plan.tone]} ${
                plan.featured ? styles.featured : ""
              }`}
            >
              <h3 className={styles.cardTitle}>{plan.name}</h3>
              <p className={styles.cardBody}>{plan.body}</p>
              <div className={styles.priceRow}>
                <span className={styles.price}>{plan.price}</span>
                <span className={styles.period}>{plan.period}</span>
              </div>
              <ul className={styles.features}>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <button
                type="button"
                className={styles.cta}
                onClick={() => setSelected(plan)}
              >
                Elegir plan
              </button>
            </article>
          </Reveal>
        ))}
      </div>
      {selected && (
        <PaymentModal plan={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
