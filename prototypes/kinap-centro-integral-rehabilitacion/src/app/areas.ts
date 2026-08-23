/**
 * The nine areas are real, confirmed categories from the business's own Maps
 * listing. Descriptions are plausible generic filler (what each specialty
 * typically covers), not invented specifics about KINAP itself — per the
 * prototype placeholder-content rule.
 */
export type Area = {
  id: string;
  icon: "walk" | "barbell" | "waves" | "fork" | "heartbeat" | "wind" | "brain" | "stethoscope" | "cycle";
  name: string;
  blurb: string;
};

export const AREAS: Area[] = [
  {
    id: "kinesiologia",
    icon: "walk",
    name: "Kinesiología",
    blurb: "Recuperación de lesiones y rehabilitación funcional, con seguimiento personalizado.",
  },
  {
    id: "gimnasio",
    icon: "barbell",
    name: "Gimnasio",
    blurb: "Entrenamiento de fuerza y acondicionamiento, dentro del mismo centro.",
  },
  {
    id: "pileta",
    icon: "waves",
    name: "Pileta cubierta",
    blurb: "Hidroterapia y ejercicio en agua climatizada, para bajo impacto articular.",
  },
  {
    id: "nutricion",
    icon: "fork",
    name: "Nutrición",
    blurb: "Planes alimentarios a medida, según el objetivo o tratamiento en curso.",
  },
  {
    id: "fisioterapia",
    icon: "heartbeat",
    name: "Fisioterapia",
    blurb: "Tratamiento manual y equipamiento especializado para dolor y movilidad.",
  },
  {
    id: "pilates",
    icon: "wind",
    name: "Pilates",
    blurb: "Fortalecimiento del core y trabajo postural, en clases guiadas.",
  },
  {
    id: "psicologia",
    icon: "brain",
    name: "Psicología",
    blurb: "Acompañamiento profesional, tanto individual como parte de un tratamiento integral.",
  },
  {
    id: "salud",
    icon: "stethoscope",
    name: "Consultas de salud",
    blurb: "Atención general y derivación a la especialidad que corresponda dentro del centro.",
  },
  {
    id: "rehabilitacion",
    icon: "cycle",
    name: "Rehabilitación",
    blurb: "Programas de recuperación combinando varias de las áreas de arriba según el caso.",
  },
];
