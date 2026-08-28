import { MapPin, Star, InstagramLogo } from "@phosphor-icons/react/dist/ssr";

// Closing band: the page's one deliberate light-to-dark theme switch (per
// the design skill's Color Block Story exception), textured with the same
// diptych seam motif rather than photography. No sector-library image fit
// a craft-beer bar (the only two unspent images left, hero-plated-dish and
// service-chef-cooking, are fine-dining kitchen shots), so this session's
// image budget stayed at zero by design, same call rosarigasino logged when
// its library didn't fit either.
export default function Nosotros() {
  return (
    <section className="nosotros">
      <div className="wrap nosotros__inner">
        <div className="nosotros__text">
          <h2>La Cabra Brewing Company</h2>
          <p>
            Un bar de barrio en Alberdi, con el horario partido que le da su
            nombre a esta muestra. Reservas para cualquiera de los dos
            turnos, sin depender de un mensaje directo.
          </p>
          <div className="nosotros__meta">
            <span>
              <MapPin size={18} weight="regular" />
              Dr. Pedro José Agrelo 2409, Rosario
            </span>
            <a
              href="https://instagram.com/lacabra.bar"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramLogo size={18} weight="regular" />
              instagram.com/lacabra.bar
            </a>
          </div>
        </div>
        <div className="nosotros__rating">
          <Star size={28} weight="fill" />
          <span className="nosotros__rating-num">4,0</span>
          <span className="nosotros__rating-count">756 reseñas</span>
        </div>
      </div>
    </section>
  );
}
