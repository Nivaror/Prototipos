"use client";

import { useState, type FormEvent } from "react";
import {
  Bicycle,
  CheckCircle,
  Minus,
  Plus,
} from "@phosphor-icons/react/dist/ssr";

const ITEMS = [
  { id: "hamburguesa", name: "Hamburguesa Fulano", price: 8900 },
  { id: "papas", name: "Papas con cheddar", price: 6200 },
  { id: "picada", name: "Picada para compartir", price: 14500 },
  { id: "cerveza", name: "Cerveza artesanal · pinta", price: 4200 },
];

function formatPrice(amount: number) {
  return amount.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });
}

export default function Delivery() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");

  function changeQuantity(id: string, amount: number) {
    setQuantities((current) => ({
      ...current,
      [id]: Math.max(0, (current[id] ?? 0) + amount),
    }));
    setConfirmed(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ITEMS.some((item) => (quantities[item.id] ?? 0) > 0)) {
      setError("Elegí al menos un producto para armar tu pedido.");
      return;
    }
    setError("");
    setConfirmed(true);
  }

  const total = ITEMS.reduce(
    (sum, item) => sum + item.price * (quantities[item.id] ?? 0),
    0,
  );

  return (
    <section className="delivery" id="delivery">
      <div className="wrap delivery__inner">
        <div className="delivery__copy">
          <span className="delivery__eyebrow">
            <Bicycle size={17} weight="fill" /> Fulano en tu casa
          </span>
          <h2>Pedí algo rico para compartir.</h2>
          <p>
            Elegí tus favoritos, dejá tu dirección y armá el pedido sin
            llamadas. En la versión real, el equipo confirma disponibilidad,
            cobertura y tiempo de entrega.
          </p>
          <div className="delivery__steps">
            <span><strong>01</strong> Elegís</span>
            <span><strong>02</strong> Dejás tus datos</span>
            <span><strong>03</strong> Fulano confirma</span>
          </div>
        </div>

        <form className="delivery__form" onSubmit={handleSubmit}>
          {confirmed ? (
            <div className="delivery__confirmation">
              <CheckCircle size={48} weight="fill" />
              <h3>¡Pedido simulado!</h3>
              <p>
                En el sitio real, Fulano recibiría tu pedido y se pondría en
                contacto para coordinar la entrega.
              </p>
              <button
                type="button"
                className="btn btn-secondary delivery__reset"
                onClick={() => setConfirmed(false)}
              >
                Armar otro pedido
              </button>
            </div>
          ) : (
            <>
              <fieldset className="delivery__fieldset">
                <legend>¿Qué te llevás?</legend>
                <div className="delivery__items">
                  {ITEMS.map((item) => {
                    const quantity = quantities[item.id] ?? 0;
                    return (
                      <div className="delivery__item" key={item.id}>
                        <div>
                          <strong>{item.name}</strong>
                          <span>{formatPrice(item.price)}</span>
                        </div>
                        <div className="delivery__stepper">
                          <button
                            type="button"
                            aria-label={`Quitar ${item.name}`}
                            onClick={() => changeQuantity(item.id, -1)}
                          >
                            <Minus size={15} weight="bold" />
                          </button>
                          <span aria-live="polite">{quantity}</span>
                          <button
                            type="button"
                            aria-label={`Agregar ${item.name}`}
                            onClick={() => changeQuantity(item.id, 1)}
                          >
                            <Plus size={15} weight="bold" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </fieldset>

              <div className="delivery__fields">
                <div className="field">
                  <label htmlFor="delivery-name">Nombre</label>
                  <input
                    id="delivery-name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Ej: Marcos Ferreyra"
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="delivery-address">Dirección de entrega</label>
                  <input
                    id="delivery-address"
                    type="text"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    placeholder="Calle, altura y referencia"
                    required
                  />
                </div>
              </div>

              {error && <p className="delivery__error">{error}</p>}

              <div className="delivery__total">
                <span>Total orientativo</span>
                <strong>{formatPrice(total)}</strong>
              </div>

              <button type="submit" className="btn btn-primary delivery__submit">
                <Bicycle size={19} weight="fill" />
                Confirmar pedido
              </button>

              <p className="delivery__note">
                Carta y precios orientativos para esta muestra.
              </p>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
