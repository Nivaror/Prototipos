import type { Profesional, Turno } from './tipos.ts'
import { aMin, diaSemana } from './fecha.ts'

// Agregaciones puras sobre Turno[]. Sin React, sin localStorage: lo mismo que
// corre en la demo corre despues en un backend sin tocarse.

const CUENTA = new Set(['confirmado', 'completado', 'pendiente'])
const esFacturable = (t: Turno) => t.estado === 'completado'

export const enRango = (t: Turno, desde: string, hasta: string) =>
  t.fecha >= desde && t.fecha <= hasta

export interface ResumenProfesional {
  profesionalId: string
  nombre: string
  turnos: number
  ingresos: number
  ocupacion: number      // 0..1
  minutosReservados: number
  minutosDisponibles: number
  cancelados: number
  noAsistio: number
}

/** Minutos que una profesional tiene abiertos entre dos fechas. */
export function minutosDisponibles(p: Profesional, fechas: string[]): number {
  return fechas.reduce((acc, f) => {
    const h = p.horario[diaSemana(f)]
    if (!h) return acc
    const cortes = (h.cortes ?? []).reduce((c, r) => c + (aMin(r.hasta) - aMin(r.desde)), 0)
    return acc + (aMin(h.hasta) - aMin(h.desde)) - cortes
  }, 0)
}

export function porProfesional(
  turnos: Turno[], profesionales: Profesional[], fechas: string[],
): ResumenProfesional[] {
  return profesionales.map((p) => {
    const suyos = turnos.filter((t) => t.profesionalId === p.id)
    const activos = suyos.filter((t) => CUENTA.has(t.estado))
    const minutosReservados = activos.reduce((a, t) => a + t.duracionMin, 0)
    const disp = minutosDisponibles(p, fechas)
    return {
      profesionalId: p.id,
      nombre: p.nombre,
      turnos: activos.length,
      ingresos: suyos.filter(esFacturable).reduce((a, t) => a + (t.precioTotal ?? 0), 0),
      minutosReservados,
      minutosDisponibles: disp,
      ocupacion: disp > 0 ? Math.min(1, minutosReservados / disp) : 0,
      cancelados: suyos.filter((t) => t.estado === 'cancelado').length,
      noAsistio: suyos.filter((t) => t.estado === 'no-asistio').length,
    }
  })
}

export function serviciosMasPedidos(
  turnos: Turno[], nombreDe: (id: string) => string, tope = 6,
): { id: string; nombre: string; cantidad: number }[] {
  const cuenta = new Map<string, number>()
  for (const t of turnos) {
    if (!CUENTA.has(t.estado)) continue
    for (const id of t.servicioIds) cuenta.set(id, (cuenta.get(id) ?? 0) + 1)
  }
  return [...cuenta.entries()]
    .map(([id, cantidad]) => ({ id, nombre: nombreDe(id), cantidad }))
    .sort((a, b) => b.cantidad - a.cantidad)
    .slice(0, tope)
}

export function ticketPromedio(turnos: Turno[]): number {
  const f = turnos.filter(esFacturable)
  if (!f.length) return 0
  return f.reduce((a, t) => a + (t.precioTotal ?? 0), 0) / f.length
}

/** Carga por dia de la semana (0..6) y por hora de inicio. */
export function picos(turnos: Turno[]) {
  const porDia = Array(7).fill(0) as number[]
  const porHora = new Map<number, number>()
  for (const t of turnos) {
    if (!CUENTA.has(t.estado)) continue
    porDia[diaSemana(t.fecha)]++
    const h = Math.floor(aMin(t.hora) / 60)
    porHora.set(h, (porHora.get(h) ?? 0) + 1)
  }
  return {
    porDia,
    porHora: [...porHora.entries()].sort((a, b) => a[0] - b[0]),
  }
}

export function tasaAusencias(turnos: Turno[]) {
  const total = turnos.length || 1
  const cancelados = turnos.filter((t) => t.estado === 'cancelado').length
  const noAsistio = turnos.filter((t) => t.estado === 'no-asistio').length
  return {
    cancelados, noAsistio, total: turnos.length,
    tasaCancelacion: cancelados / total,
    tasaNoShow: noAsistio / total,
  }
}

/**
 * Recurrentes vs nuevas: una clienta es recurrente si su telefono aparece en
 * mas de un turno. El telefono es la clave porque el nombre se escribe
 * distinto cada vez.
 */
export function recurrencia(turnos: Turno[]) {
  const porTel = new Map<string, number>()
  for (const t of turnos) {
    if (t.estado === 'cancelado') continue
    const k = t.cliente.telefono.replace(/\D/g, '')
    porTel.set(k, (porTel.get(k) ?? 0) + 1)
  }
  const clientas = [...porTel.values()]
  const recurrentes = clientas.filter((n) => n > 1).length
  return {
    clientas: clientas.length,
    recurrentes,
    nuevas: clientas.length - recurrentes,
    tasa: clientas.length ? recurrentes / clientas.length : 0,
  }
}

export function ingresosTotales(turnos: Turno[]): number {
  return turnos.filter(esFacturable).reduce((a, t) => a + (t.precioTotal ?? 0), 0)
}

export const turnosActivos = (turnos: Turno[]) => turnos.filter((t) => CUENTA.has(t.estado))
