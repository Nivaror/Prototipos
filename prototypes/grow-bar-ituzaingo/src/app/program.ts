/**
 * The weekly billing board. The Maps listing confirms WHAT Grow Bar does on a
 * given night (bar con juegos, deportes, karaoke, música en vivo, presentaciones
 * en vivo, hora feliz, comidas de madrugada) but never WHICH night each one
 * lands on, so the night-by-night assignment below is demo content: plausible,
 * drawn only from the confirmed list, and editable on the page itself. Editing
 * it live is the point of the demo, since loading the week is exactly the job
 * this page is meant to take off WhatsApp.
 */
export type Night = {
  weekday: number;
  title: string;
  note: string;
};

export const PROGRAM: Night[] = [
  { weekday: 1, title: "Bar con juegos", note: "Mesas de juego abiertas toda la noche" },
  { weekday: 2, title: "Noche de deportes", note: "Los partidos de la fecha en pantalla" },
  { weekday: 3, title: "Hora feliz extendida", note: "Tragos y cerveza a precio de hora feliz" },
  { weekday: 4, title: "Karaoke", note: "Micrófono libre desde que abrimos" },
  { weekday: 5, title: "Música en vivo", note: "Banda invitada y barra hasta las 03:00" },
  { weekday: 6, title: "Presentaciones en vivo", note: "Show sobre el escenario, terraza abierta" },
  { weekday: 0, title: "Domingo de mesa larga", note: "Cena tranquila, grupos y familias" },
];

export const PROGRAM_STORAGE_KEY = "grow-bar-cartelera-v1";
