import { Star } from "@phosphor-icons/react/dist/ssr";

export default function Reputation() {
  return (
    <section className="reputation">
      <div className="wrap reputation__inner">
        <div className="reputation__number font-display">
          4,3
          <Star size={40} weight="fill" aria-hidden="true" />
        </div>
        <p className="reputation__text">
          2.503 reseñas en Google avalan la mesa y el ambiente de siempre.
        </p>
      </div>
    </section>
  );
}
