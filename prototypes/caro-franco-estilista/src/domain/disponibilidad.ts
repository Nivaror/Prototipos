import type { Excepcion, Profesional, Turno } from './tipos.ts'
import { NEGOCIO } from '../config/negocio.ts'
import { aHora, aMin, ahoraMin, diaSemana, hoyISO, sumarDias } from './fecha.ts'

/** Un turno ocupa [inicio, fin) en minutos desde medianoche. */
function intervalo(t: Turno): [number, number] {
  const i = aMin(t.hora)
  return [i, i + t.duracionMin]
}

const solapa = (a: [number, number], b: [number, number]) => a[0] < b[1] && b[0] < a[1]

export interface OpcionesSlots {
  /** Permite generar slots en el pasado y saltear la anticipacion minima.
   *  Lo usan el seed (historial) y la carga manual del salon. */
  ignorarPasado?: boolean
}

const CANCELADOS = new Set(['cancelado', 'no-asistio'])

/** Turnos que efectivamente bloquean la agenda de esa profesional ese dia. */
export function turnosBloqueantes(
  turnos: Turno[], profesionalId: string, fecha: string,
): Turno[] {
  return turnos.filter(
    (t) => t.profesionalId === profesionalId && t.fecha === fecha && !CANCELADOS.has(t.estado),
  )
}

/**
 * Horarios de inicio posibles para una profesional en una fecha, dada una
 * duracion. Funcion pura: no toca React ni localStorage.
 */
export function generarSlots(
  fecha: string,
  profesional: Profesional,
  duracionRequerida: number,
  turnosExistentes: Turno[],
  excepciones: Excepcion[],
  opciones: OpcionesSlots = {},
): string[] {
  if (duracionRequerida <= 0) return []

  // 1. Horario base de esa profesional para ese dia de la semana.
  let base = profesional.horario[diaSemana(fecha)]
  if (!base) return []
  let cortes = base.cortes ?? []

  // 2. Excepciones: cierre total del salon, o de esa profesional, o un
  //    horario especial que reemplaza el rango del dia.
  for (const e of excepciones) {
    if (e.fecha !== fecha) continue
    if (e.profesionalId && e.profesionalId !== profesional.id) continue
    if (e.tipo === 'cerrado') return []
    if (e.tipo === 'horario-especial' && e.horario) {
      base = { desde: e.horario.desde, hasta: e.horario.hasta }
      cortes = []
    }
  }

  const apertura = aMin(base.desde)
  const cierre = aMin(base.hasta)

  const ocupados = turnosBloqueantes(turnosExistentes, profesional.id, fecha).map(intervalo)
  const cortesMin: [number, number][] = cortes.map((c) => [aMin(c.desde), aMin(c.hasta)])

  // 7. Nadie reserva a las 14:55 para las 15:00. El seed y la carga manual
  //    del salon si pueden pisar esa regla (ignorarPasado).
  const minimo = fecha === hoyISO() && !opciones.ignorarPasado
    ? ahoraMin() + NEGOCIO.anticipacionMinimaHoras * 60
    : -Infinity
  if (fecha < hoyISO() && !opciones.ignorarPasado) return []

  const slots: string[] = []
  for (let t = apertura; t + duracionRequerida <= cierre; t += NEGOCIO.pasoSlotMin) {
    // 4. El servicio tiene que entrar completo antes del cierre: un balayage
    //    de 210 min no puede empezar 17:00 si cierra 19:00.
    const rango: [number, number] = [t, t + duracionRequerida + NEGOCIO.bufferMin]
    if (t < minimo) continue
    // 5. Comparacion de intervalos, no de horas de inicio.
    if (ocupados.some((o) => solapa(rango, o))) continue
    // 6. Almuerzo y demas cortes del dia.
    if (cortesMin.some((c) => solapa(rango, c))) continue
    slots.push(aHora(t))
  }
  return slots
}

export function tieneDisponibilidad(
  fecha: string, profesional: Profesional, duracion: number,
  turnos: Turno[], excepciones: Excepcion[], opciones: OpcionesSlots = {},
): boolean {
  return generarSlots(fecha, profesional, duracion, turnos, excepciones, opciones).length > 0
}

/**
 * Alimenta "Sin preferencia" y el "proximo turno: jue 11" de cada tarjeta.
 */
export function buscarPrimeraDisponible(
  profesionales: Profesional[],
  duracion: number,
  desde: string,
  turnos: Turno[],
  excepciones: Excepcion[],
  dias = NEGOCIO.diasVisibles,
): { profesionalId: string; fecha: string; hora: string } | null {
  for (let i = 0; i < dias; i++) {
    const fecha = sumarDias(desde, i)
    let mejor: { profesionalId: string; hora: string; carga: number } | null = null
    for (const p of profesionales) {
      const slots = generarSlots(fecha, p, duracion, turnos, excepciones)
      if (!slots.length) continue
      // Desempata por menor carga ese dia: reparte la agenda sola.
      const carga = turnosBloqueantes(turnos, p.id, fecha).length
      if (!mejor || carga < mejor.carga) {
        mejor = { profesionalId: p.id, hora: slots[0], carga }
      }
    }
    if (mejor) return { profesionalId: mejor.profesionalId, fecha, hora: mejor.hora }
  }
  return null
}

/** Profesionales que hacen todos los servicios elegidos. */
export function profesionalesPara(
  profesionales: Profesional[], servicioIds: string[],
): Profesional[] {
  if (!servicioIds.length) return profesionales
  return profesionales.filter((p) => servicioIds.every((id) => p.serviciosIds.includes(id)))
}
