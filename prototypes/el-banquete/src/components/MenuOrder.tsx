"use client";

import { useMemo, useState } from "react";
import { Minus, Plus, Check } from "@phosphor-icons/react";
import { MENU, ARS } from "@/lib/menu";
import Reveal from "./Reveal";
import styles from "./MenuOrder.module.css";

export default function MenuOrder() {
  const [qty, setQty] = useState<Record<string, number>>({});
  const [confirmed, setConfirmed] = useState(false);

  const total = useMemo(
    () => MENU.reduce((sum, item) => sum + (qty[item.id] ?? 0) * item.price, 0),
    [qty]
  );
  const count = useMemo(() => Object.values(qty).reduce((a, b) => a + b, 0), [qty]);

  function change(id: string, delta: number) {
    setQty((prev) => {
      const next = Math.max(0, (prev[id] ?? 0) + delta);
      return { ...prev, [id]: next };
    });
    setConfirmed(false);
  }

  return (
    <section id="pedido" className={styles.section}>
      <Reveal>
        <div className={styles.header}>
          <h2 className={styles.title}>Armá tu pedido</h2>
          <p className={styles.sub}>Menú de ejemplo para la muestra. Elegí cantidades y mandalo.</p>
        </div>
      </Reveal>

      <Reveal>
        <ul className={styles.list}>
          {MENU.map((item) => (
            <li key={item.id} className={styles.row}>
              <div className={styles.info}>
                <span className={styles.name}>{item.name}</span>
                <span className={styles.note}>{item.note}</span>
              </div>
              <div className={styles.right}>
                <span className={styles.price}>{ARS.format(item.price)}</span>
                <div className={styles.stepper}>
                  <button
                    type="button"
                    aria-label={`Quitar ${item.name}`}
                    className={styles.stepBtn}
                    onClick={() => change(item.id, -1)}
                    disabled={(qty[item.id] ?? 0) === 0}
                  >
                    <Minus size={14} weight="bold" />
                  </button>
                  <span className={styles.stepValue}>{qty[item.id] ?? 0}</span>
                  <button
                    type="button"
                    aria-label={`Agregar ${item.name}`}
                    className={styles.stepBtn}
                    onClick={() => change(item.id, 1)}
                  >
                    <Plus size={14} weight="bold" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>

      {count > 0 && (
        <div className={styles.summaryBar}>
          <div className={styles.summaryText}>
            <span className={styles.summaryCount}>
              {count} {count === 1 ? "producto" : "productos"}
            </span>
            <span className={styles.summaryTotal}>{ARS.format(total)}</span>
          </div>
          {confirmed ? (
            <span className={styles.confirmedTag}>
              <Check size={16} weight="bold" />
              Pedido armado
            </span>
          ) : (
            <button type="button" className={styles.sendBtn} onClick={() => setConfirmed(true)}>
              Enviar pedido
            </button>
          )}
        </div>
      )}

      {confirmed && (
        <p className={styles.confirmNote}>
          Esta es una muestra: en la página real este botón envía el pedido directo al local.
        </p>
      )}
    </section>
  );
}
