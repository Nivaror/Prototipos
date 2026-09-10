'use client'

import type { Excepcion, Turno } from '../domain/tipos.ts'
import { generarSeed } from './seed.ts'

// localStorage detras de una interfaz. El dia que haya backend se cambia el
// adapter y la UI no se entera.

const CLAVE = 'caro-franco:v1'

export interface Estado { turnos: Turno[]; excepciones: Excepcion[] }

const vacio = (): Estado => ({ turnos: [], excepciones: [] })

function leer(): Estado {
  if (typeof window === 'undefined') return vacio()
  try {
    const crudo = window.localStorage.getItem(CLAVE)
    if (!crudo) {
      const seed = generarSeed()
      window.localStorage.setItem(CLAVE, JSON.stringify(seed))
      return seed
    }
    const parseado = JSON.parse(crudo) as Estado
    if (!Array.isArray(parseado.turnos)) return vacio()
    return { turnos: parseado.turnos, excepciones: parseado.excepciones ?? [] }
  } catch {
    // localStorage bloqueado (modo privado, cookies off): la demo sigue
    // funcionando en memoria por esta sesion.
    return generarSeed()
  }
}

function escribir(e: Estado) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(CLAVE, JSON.stringify(e))
  } catch { /* sin persistencia, no rompemos la demo */ }
  window.dispatchEvent(new Event('turnos:cambio'))
}

const nuevoId = () => 't-' + Math.random().toString(36).slice(2, 10)

export const repositorio = {
  estado: leer,

  crearTurno(t: Omit<Turno, 'id' | 'creadoEn'>): Turno {
    const e = leer()
    const turno: Turno = { ...t, id: nuevoId(), creadoEn: new Date().toISOString() }
    escribir({ ...e, turnos: [...e.turnos, turno] })
    return turno
  },

  actualizarTurno(id: string, cambios: Partial<Turno>) {
    const e = leer()
    escribir({ ...e, turnos: e.turnos.map((t) => (t.id === id ? { ...t, ...cambios } : t)) })
  },

  eliminarTurno(id: string) {
    const e = leer()
    escribir({ ...e, turnos: e.turnos.filter((t) => t.id !== id) })
  },

  crearExcepcion(x: Omit<Excepcion, 'id'>) {
    const e = leer()
    escribir({ ...e, excepciones: [...e.excepciones, { ...x, id: nuevoId() }] })
  },

  eliminarExcepcion(id: string) {
    const e = leer()
    escribir({ ...e, excepciones: e.excepciones.filter((x) => x.id !== id) })
  },

  /** El boton "reiniciar demo" del admin. */
  reiniciar() {
    if (typeof window === 'undefined') return
    try { window.localStorage.removeItem(CLAVE) } catch {}
    escribir(generarSeed())
  },
}
