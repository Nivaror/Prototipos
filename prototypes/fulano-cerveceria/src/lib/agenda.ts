export type AgendaItem = {
  slug: string;
  title: string;
  description: string;
};

export const AGENDA_ITEMS: AgendaItem[] = [
  {
    slug: "karaoke",
    title: "Karaoke",
    description:
      "Noches de karaoke con la barra a mano. El día exacto se confirma en Facebook.",
  },
  {
    slug: "musica-en-vivo",
    title: "Música en vivo",
    description:
      "Bandas y solistas en vivo. La cartelera de la semana se publica en Facebook.",
  },
  {
    slug: "futbol",
    title: "Fútbol y deportes",
    description:
      "Partidos en pantalla para ver con amigos. Los horarios cambian según la fecha.",
  },
  {
    slug: "happy-hour",
    title: "Happy hour",
    description:
      "Precios especiales en tragos y cerveza en franjas horarias puntuales.",
  },
];
