"use client";

import { useState, type FormEvent } from "react";
import { X, CheckCircle, CreditCard } from "@phosphor-icons/react/dist/ssr";
import type { Plan } from "./Plans";
import styles from "./PaymentModal.module.css";

export default function PaymentModal({
  plan,
  onClose,
}: {
  plan: Plan;
  onClose: () => void;
}) {
  const [done, setDone] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setDone(true);
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} type="button" onClick={onClose} aria-label="Cerrar">
          <X size={18} weight="bold" />
        </button>

        {done ? (
          <div className={styles.success}>
            <CheckCircle size={40} weight="fill" className={styles.successIcon} />
            <h3 className={styles.successTitle}>¡Listo!</h3>
            <p className={styles.successBody}>
              Esta es una simulación de pago — {plan.name} ({plan.price}{" "}
              {plan.period}) no fue cobrado de verdad.
            </p>
          </div>
        ) : (
          <>
            <div className={styles.header}>
              <CreditCard size={22} weight="bold" />
              <div>
                <h3 className={styles.title}>{plan.name}</h3>
                <p className={styles.summary}>
                  {plan.price} {plan.period}
                </p>
              </div>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
              <label className={styles.field}>
                Número de tarjeta
                <input type="text" placeholder="4242 4242 4242 4242" required />
              </label>
              <div className={styles.row}>
                <label className={styles.field}>
                  Vencimiento
                  <input type="text" placeholder="MM/AA" required />
                </label>
                <label className={styles.field}>
                  CVV
                  <input type="text" placeholder="123" required />
                </label>
              </div>
              <label className={styles.field}>
                Nombre en la tarjeta
                <input type="text" placeholder="Como figura en la tarjeta" required />
              </label>
              <button type="submit" className={styles.payCta}>
                Confirmar pago
              </button>
              <p className={styles.disclaimer}>
                Simulación de ejemplo — no se procesan pagos reales.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
