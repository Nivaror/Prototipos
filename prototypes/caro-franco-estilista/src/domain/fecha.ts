// Zona fija: el calculo de slots no puede depender del reloj del dispositivo
// que abre la demo.
export const TZ = 'America/Argentina/Buenos_Aires'

const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
const DIAS_CORTO = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb']
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

/** "2026-09-15" en la zona del salon, no en la del navegador. */
export function hoyISO(): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(new Date())
}

/** Minutos desde medianoche, hora local del salon. */
export function ahoraMin(): number {
  const s = new Intl.DateTimeFormat('en-GB', {
    timeZone: TZ, hour: '2-digit', minute: '2-digit', hour12: false,
  }).format(new Date())
  return aMin(s)
}

export function aMin(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

export function aHora(min: number): string {
  const h = Math.floor(min / 60)
  const m = min % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

/** Parsea "2026-09-15" como fecha civil, sin corrimiento por UTC. */
export function partes(iso: string): { y: number; m: number; d: number } {
  const [y, m, d] = iso.split('-').map(Number)
  return { y, m, d }
}

export function diaSemana(iso: string): number {
  const { y, m, d } = partes(iso)
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay()
}

export function sumarDias(iso: string, n: number): string {
  const { y, m, d } = partes(iso)
  const t = new Date(Date.UTC(y, m - 1, d + n))
  return t.toISOString().slice(0, 10)
}

export function rangoDias(desde: string, cantidad: number): string[] {
  return Array.from({ length: cantidad }, (_, i) => sumarDias(desde, i))
}

export const nombreDia = (iso: string) => DIAS[diaSemana(iso)]
export const nombreDiaCorto = (iso: string) => DIAS_CORTO[diaSemana(iso)]
export const numeroDia = (iso: string) => partes(iso).d
export const nombreMes = (iso: string) => MESES[partes(iso).m - 1]

/** "jue 11 de septiembre" */
export function fechaLarga(iso: string): string {
  return `${nombreDiaCorto(iso)} ${numeroDia(iso)} de ${nombreMes(iso)}`
}

/** "mié 9 sep" - para tablas, donde la fecha larga rompe en dos lineas. */
export function fechaCorta(iso: string): string {
  return `${nombreDiaCorto(iso)} ${numeroDia(iso)} ${nombreMes(iso).slice(0, 3)}`
}

export function esHoy(iso: string): boolean {
  return iso === hoyISO()
}

export function precioARS(n: number): string {
  return '$' + n.toLocaleString('es-AR')
}

export function duracionTexto(min: number): string {
  const h = Math.floor(min / 60)
  const m = min % 60
  if (h === 0) return `${m} min`
  if (m === 0) return `${h} h`
  return `${h} h ${m} min`
}
