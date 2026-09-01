"use client";

import { useState } from "react";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import {
  DELIVERY_ITEMS,
  formatARS,
  buildWhatsAppOrderLink,
  type DeliveryCategory,
} from "@/lib/delivery";

const CATEGORIES: DeliveryCategory[] = ["Para picar", "Platos", "Bebidas"];

export default function Delivery() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  function setQty(id: string, qty: number) {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(0, qty) }));
  }

  const total = DELIVERY_ITEMS.reduce(
    (sum, item) => sum + item.price * (quantities[item.id] ?? 0),
    0,
  );
  const hasItems = total > 0;

  return (
    <div className="delivery__box">
      {CATEGORIES.map((category) => (
        <div key={category} className="delivery__category">
          <h3 className="delivery__category-title">{category}</h3>
          {DELIVERY_ITEMS.filter((item) => item.category === category).map((item) => {
            const qty = quantities[item.id] ?? 0;
            return (
              <div key={item.id} className="delivery__row">
                <div>
                  <span className="delivery__item-name">{item.name}</span>
                  <span className="delivery__item-price">{formatARS(item.price)}</span>
                </div>
                <div className="stepper">
                  <button type="button" aria-label={`Restar ${item.name}`} onClick={() => setQty(item.id, qty - 1)}>
                    −
                  </button>
                  <span>{qty}</span>
                  <button type="button" aria-label={`Sumar ${item.name}`} onClick={() => setQty(item.id, qty + 1)}>
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ))}

      <p className="delivery__note">Precios orientativos, sujetos a confirmación por WhatsApp.</p>

      <div className="delivery__footer">
        <span className="delivery__total">Total: {formatARS(total)}</span>
        {hasItems ? (
          <a
            href={buildWhatsAppOrderLink(quantities)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <WhatsappLogo size={20} weight="fill" />
            Pedir por WhatsApp
          </a>
        ) : (
          <button type="button" className="btn btn-primary" disabled>
            <WhatsappLogo size={20} weight="fill" />
            Pedir por WhatsApp
          </button>
        )}
      </div>
    </div>
  );
}
