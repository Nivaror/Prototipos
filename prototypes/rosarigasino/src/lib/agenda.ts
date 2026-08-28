// Weekly agenda pattern for the live-music / sports-viewing centerpiece.
//
// The Maps listing confirms Rosarigasino offers live music and sports
// viewing, but gives no specific artist names, exact dates, or fixtures -
// none of that is checkable, so none of it is invented here. This models
// a generic, plausible WEEKLY PATTERN only ("viernes: musica en vivo"),
// never a specific listing ("Viernes 4/9: Los Tal"). See
// core/prototype-workflow.md's placeholder-content rule.

export type AgendaKind = "musica" | "deportes" | "cena";

export type AgendaDay = {
  day: string;
  kind: AgendaKind;
  detail: string;
};

export const WEEKLY_AGENDA: AgendaDay[] = [
  { day: "Lunes", kind: "cena", detail: "Servicio de cena a la carta" },
  { day: "Martes", kind: "cena", detail: "Servicio de cena a la carta" },
  { day: "Miércoles", kind: "cena", detail: "Servicio de cena a la carta" },
  { day: "Jueves", kind: "cena", detail: "Servicio de cena a la carta" },
  { day: "Viernes", kind: "musica", detail: "Música en vivo desde la noche" },
  { day: "Sábado", kind: "musica", detail: "Música en vivo desde la noche" },
  { day: "Domingo", kind: "deportes", detail: "Fútbol en pantalla, horario según fixture" },
];

export const AGENDA_KIND_LABEL: Record<AgendaKind, string> = {
  musica: "Música en vivo",
  deportes: "Fútbol en pantalla",
  cena: "Cena",
};

export type AgendaGroup = {
  label: string;
  kind: AgendaKind;
  detail: string;
};

// Collapses the 7 daily rows into consecutive-run clusters (Lunes a jueves,
// Viernes y sábado, Domingo) so the section shows 3 grouped chunks instead
// of a 7-row list, per the design skill's "long lists need grouping" rule.
export function groupAgenda(days: AgendaDay[]): AgendaGroup[] {
  const groups: { days: string[]; kind: AgendaKind; detail: string }[] = [];

  for (const entry of days) {
    const last = groups[groups.length - 1];
    if (last && last.kind === entry.kind) {
      last.days.push(entry.day);
    } else {
      groups.push({ days: [entry.day], kind: entry.kind, detail: entry.detail });
    }
  }

  return groups.map((g) => ({
    kind: g.kind,
    detail: g.detail,
    label:
      g.days.length === 1
        ? g.days[0]
        : g.days.length === 2
          ? `${g.days[0]} y ${g.days[1]}`
          : `${g.days[0]} a ${g.days[g.days.length - 1]}`,
  }));
}
