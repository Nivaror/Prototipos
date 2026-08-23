"use client";

import { useMemo, useState } from "react";
import styles from "./Order.module.css";
import { MENU } from "./menu-data";

type Cart = Record<string, number>;

const ALL_ITEMS = MENU.flatMap((group) => group.items);

export function Order() {
  const [cart, setCart] = useState<Cart>({});
  const [confirmed, setConfirmed] = useState(false);

  const lines = useMemo(
    () =>
      Object.entries(cart)
        .filter(([, qty]) => qty > 0)
        .map(([id, qty]) => ({
          item: ALL_ITEMS.find((i) => i.id === id)!,
          qty,
        })),
    [cart],
  );

  const totalItems = lines.reduce((sum, line) => sum + line.qty, 0);

  function addItem(id: string) {
    setCart((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  }

  function removeItem(id: string) {
    setCart((prev) => {
      const next = { ...prev, [id]: Math.max(0, (prev[id] ?? 0) - 1) };
      return next;
    });
  }

  if (confirmed) {
    return (
      <div className={styles.confirmCard}>
        <p className={styles.confirmEyebrow}>Pedido armado</p>
        <ul className={styles.confirmList}>
          {lines.map(({ item, qty }) => (
            <li key={item.id}>
              <span className={styles.confirmQty}>{qty}x</span>
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
        <p className={styles.confirmNote}>
          Esto es una vista previa. Todavía no se envió ningún pedido a Sabor
          Costanera: es una demostración de cómo podría funcionar un pedido
          desde su propio sitio, en lugar de tener que llamar sin saber qué
          hay disponible.
        </p>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={() => {
            setConfirmed(false);
            setCart({});
          }}
        >
          Armar otro pedido
        </button>
      </div>
    );
  }

  return (
    <div className={styles.orderLayout}>
      <div className={styles.menuColumn}>
        {MENU.map((group) => (
          <div key={group.id} className={styles.menuGroup}>
            <h3 className={styles.menuGroupLabel}>{group.label}</h3>
            <div className={styles.menuRows}>
              {group.items.map((item) => {
                const qty = cart[item.id] ?? 0;
                return (
                  <div key={item.id} className={styles.menuRow}>
                    <div className={styles.menuRowText}>
                      <span className={styles.menuRowName}>{item.name}</span>
                      <span className={styles.menuRowNote}>{item.note}</span>
                    </div>
                    <div className={styles.stepper}>
                      <button
                        type="button"
                        className={styles.stepperButton}
                        onClick={() => removeItem(item.id)}
                        disabled={qty === 0}
                        aria-label={`Quitar ${item.name}`}
                      >
                        −
                      </button>
                      <span className={styles.stepperValue}>{qty}</span>
                      <button
                        type="button"
                        className={styles.stepperButton}
                        onClick={() => addItem(item.id)}
                        aria-label={`Agregar ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <aside className={styles.ticketColumn}>
        <div className={styles.ticket}>
          <h3 className={styles.ticketTitle}>Tu pedido</h3>
          {lines.length === 0 ? (
            <p className={styles.ticketEmpty}>
              Elegí algo del menú para armar tu pedido.
            </p>
          ) : (
            <ul className={styles.ticketList}>
              {lines.map(({ item, qty }) => (
                <li key={item.id} className={styles.ticketLine}>
                  <span>{item.name}</span>
                  <span className={styles.ticketQty}>x{qty}</span>
                </li>
              ))}
            </ul>
          )}
          <button
            type="button"
            className={styles.primaryButton}
            disabled={totalItems === 0}
            onClick={() => setConfirmed(true)}
          >
            Confirmar pedido
          </button>
        </div>
      </aside>
    </div>
  );
}
