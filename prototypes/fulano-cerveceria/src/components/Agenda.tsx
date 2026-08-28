import {
  MicrophoneStage,
  MusicNotes,
  Television,
  BeerStein,
  FacebookLogo,
} from "@phosphor-icons/react/dist/ssr";
import { AGENDA_ITEMS } from "@/lib/agenda";

const ICONS = {
  karaoke: MicrophoneStage,
  "musica-en-vivo": MusicNotes,
  futbol: Television,
  "happy-hour": BeerStein,
} as const;

export default function Agenda() {
  return (
    <section className="agenda" id="agenda">
      <div className="wrap">
        <div className="agenda__head">
          <h2>Esto pasa en Fulano</h2>
          <p>
            Karaoke, música en vivo, fútbol y happy hour son parte de la
            semana acá. Hoy, la única forma de saber qué toca hoy es entrar a
            Facebook.
          </p>
        </div>

        <div className="agenda__row">
          {AGENDA_ITEMS.map((item) => {
            const Icon = ICONS[item.slug as keyof typeof ICONS];
            return (
              <article className="agenda__card" key={item.slug}>
                <span className="agenda__card-icon">
                  <Icon size={24} weight="fill" />
                </span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            );
          })}
        </div>

        <p className="agenda__footer">
          <FacebookLogo size={18} weight="fill" />
          <a
            href="https://facebook.com/FulanoCerveceria"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver la agenda de esta semana en Facebook
          </a>
        </p>
      </div>
    </section>
  );
}
