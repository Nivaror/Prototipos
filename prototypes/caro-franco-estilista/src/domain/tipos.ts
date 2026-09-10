export interface Rango { desde: string; hasta: string }

export interface Servicio {
  id: string
  nombre: string
  categoria: string
  duracionMin: number
  precio: number | null
  descripcion?: string
}

export type DiaHorario = { desde: string; hasta: string; cortes?: Rango[] } | null

/** 0 = domingo ... 6 = sabado. null = no trabaja ese dia. */
export type HorarioSemanal = Record<number, DiaHorario>

export interface Profesional {
  id: string
  nombre: string
  rol: string
  foto: string
  serviciosIds: string[]
  horario: HorarioSemanal
}

export interface Excepcion {
  id: string
  fecha: string
  profesionalId?: string
  tipo: 'cerrado' | 'horario-especial'
  horario?: Rango
  motivo?: string
}

export type EstadoTurno =
  | 'pendiente' | 'confirmado' | 'completado' | 'cancelado' | 'no-asistio'

export interface Turno {
  id: string
  fecha: string
  hora: string
  duracionMin: number
  servicioIds: string[]
  profesionalId: string
  cliente: { nombre: string; telefono: string; email?: string }
  precioTotal: number | null
  estado: EstadoTurno
  notas?: string
  canal: 'web' | 'manual'
  creadoEn: string
}
