import Image from "next/image";
import { Guitar, SoccerBall, ForkKnife } from "@phosphor-icons/react/dist/ssr";
import { WEEKLY_AGENDA, groupAgenda, type AgendaKind } from "@/lib/agenda";

const ICON_BY_KIND: Record<AgendaKind, typeof Guitar> = {
  musica: Guitar,
  deportes: SoccerBall,
  cena: ForkKnife,
};

export default function Agenda() {
  const groups = groupAgenda(WEEKLY_AGENDA);

  return (
    <section id="agenda" className="agenda">
      <div className="wrap agenda__inner">
        <div className="agenda__photo">
          <Image
            src="/images/agenda-salon-ambiente.jpg"
            alt="Salón de Rosarigasino, ambientado para las noches de música en vivo"
            width={1400}
            height={1400}
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
        <div className="agenda__content">
          <h2 className="agenda__title font-display">Agenda de la semana</h2>
          <p className="agenda__lead">
            Además de la cena, Rosarigasino arma la semana entre música en vivo y
            fútbol en pantalla. Este es el ritmo habitual.
          </p>
          <ul className="agenda__list">
            {groups.map((group) => {
              const Icon = ICON_BY_KIND[group.kind];
              return (
                <li key={group.label} className={`agenda__row agenda__row--${group.kind}`}>
                  <Icon size={26} weight="duotone" />
                  <div>
                    <span className="agenda__day">{group.label}</span>
                    <span className="agenda__detail">{group.detail}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
