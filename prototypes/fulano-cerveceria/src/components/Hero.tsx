import Link from "next/link";
import {
  MicrophoneStage,
  MusicNotes,
  Television,
  BeerStein,
  Star,
  MapPin,
} from "@phosphor-icons/react/dist/ssr";

const TAGS = [
  { icon: MicrophoneStage, label: "Karaoke" },
  { icon: MusicNotes, label: "Música en vivo" },
  { icon: Television, label: "Fútbol y deportes" },
  { icon: BeerStein, label: "Happy hour" },
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero__inner">
        <div className="hero__copy">
          <h1>
            <em>Fulano</em>, de un vistazo.
          </h1>
          <p className="hero__subtext">
            Karaoke, música en vivo, fútbol y happy hour ya pasan acá, pero
            solo se ven en Facebook. Así podría verse.
          </p>
          <div className="hero__ctas">
            <Link href="#agenda" className="btn btn-primary">
              Ver la agenda
            </Link>
            <Link href="#reservas" className="btn btn-secondary">
              Reservar mesa
            </Link>
          </div>
          <div className="hero__facts">
            <span>
              <Star size={15} weight="fill" />
              4★ · 1.870 reseñas en Google
            </span>
            <span>
              <MapPin size={15} weight="fill" />
              Av. Alberdi 699, Rosario
            </span>
          </div>
        </div>

        <div className="hero__asset">
          <p className="hero__asset-label">Esta semana en Fulano</p>
          <div className="hero__tags">
            {TAGS.map(({ icon: Icon, label }) => (
              <div className="hero__tag" key={label}>
                <span className="hero__tag-icon">
                  <Icon size={20} weight="fill" />
                </span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
