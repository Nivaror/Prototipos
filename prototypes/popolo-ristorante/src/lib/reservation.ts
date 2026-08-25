import { isClosedDay } from "./hours";

export type ReservationFields = {
  name: string;
  date: string;
  time: string;
  partySize: string;
};

export type ReservationErrors = Partial<Record<keyof ReservationFields, string>>;

function todayISO(): string {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

export function validateReservation(fields: ReservationFields): ReservationErrors {
  const errors: ReservationErrors = {};

  if (!fields.name.trim()) {
    errors.name = "Ingresá tu nombre.";
  }

  if (!fields.date) {
    errors.date = "Elegí una fecha.";
  } else if (fields.date < todayISO()) {
    errors.date = "La fecha ya pasó.";
  } else if (isClosedDay(fields.date)) {
    errors.date = "Cerramos los miércoles, elegí otro día.";
  }

  if (!fields.time) {
    errors.time = "Elegí un horario.";
  }

  const size = Number(fields.partySize);
  if (!fields.partySize || Number.isNaN(size) || size < 1 || size > 12) {
    errors.partySize = "Entre 1 y 12 personas.";
  }

  return errors;
}
