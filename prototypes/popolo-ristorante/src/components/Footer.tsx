import { MapPin, LinkSimple } from "@phosphor-icons/react/dist/ssr";

export function Footer() {
  return (
    <footer className="bg-[var(--wine-dark)] text-[#f3ece9]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-14 md:flex-row md:items-start md:justify-between md:px-14">
        <div>
          <p className="font-display text-2xl font-semibold">Popolo Ristorante</p>
          <p className="mt-2 flex items-center gap-2 text-sm text-[#f3ece9]/70">
            <MapPin size={16} weight="bold" />
            Puccini 547, Rosario, Santa Fe
          </p>
        </div>
        <a
          href="https://linktr.ee/popoloristorante2"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-[#f3ece9]/70 transition hover:text-[#f3ece9]"
        >
          <LinkSimple size={16} weight="bold" />
          linktr.ee/popoloristorante2
        </a>
      </div>
    </footer>
  );
}
