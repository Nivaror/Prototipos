import Delivery from "./Delivery";

export default function DeliverySection() {
  return (
    <section id="delivery" className="delivery">
      <div className="wrap delivery__inner">
        <div className="delivery__intro">
          <h2 className="font-display">Pedí para delivery</h2>
          <p>
            Armá tu pedido y lo mandás directo por WhatsApp, sin vueltas por
            Facebook.
          </p>
        </div>
        <Delivery />
      </div>
    </section>
  );
}
