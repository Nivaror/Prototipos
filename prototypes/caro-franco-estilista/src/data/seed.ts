import type { Excepcion, Turno } from '../domain/tipos.ts'
import { PROFESIONALES, SERVICIOS, servicioPorId } from '../config/negocio.ts'
import { generarSlots } from '../domain/disponibilidad.ts'
import { diaSemana, hoyISO, sumarDias } from '../domain/fecha.ts'

// Sin seed, la duena abre el link en el celular y ve una agenda vacia: la demo
// no muestra nada. Estos turnos se generan alrededor de la fecha en que se
// abre la demo, asi no envejecen.

// LCG: los mismos datos en cualquier dispositivo, sin traer una dependencia.
function rng(semilla: number) {
  let s = semilla >>> 0
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296)
}

const PILA = [
  'Sofía', 'Malena', 'Julieta', 'Camila', 'Antonella', 'Valentina', 'Micaela',
  'Delfina', 'Rocío', 'Agostina', 'Brenda', 'Luciana', 'Paula', 'Florencia',
  'Carla', 'Abril', 'Milagros', 'Guadalupe', 'Noelia', 'Ayelén', 'Tamara',
  'Belén', 'Nadia', 'Ariana', 'Josefina', 'Martina', 'Lucía', 'Renata',
  'Catalina', 'Emilia', 'Victoria', 'Pilar', 'Ludmila', 'Yamila', 'Priscila',
]

const APELLIDOS = [
  'Peralta', 'Quiroga', 'Bravo', 'Ferreyra', 'Ruiz Díaz', 'Godoy', 'Sosa',
  'Ibarra', 'Cabrera', 'Leiva', 'Villalba', 'Maidana', 'Benítez', 'Arias',
  'Ojeda', 'Zárate', 'Acuña', 'Ríos', 'Farías', 'Moyano', 'Escobar',
  'Cardozo', 'Giménez', 'Ledesma', 'Aguirre', 'Barrios', 'Coronel', 'Duarte',
  'Medina', 'Ponce', 'Roldán', 'Sandoval', 'Vera', 'Zalazar', 'Ocampo',
]

// El padron de clientas: mas grande que la cantidad de turnos por mes, para
// que la division entre nuevas y recurrentes de un numero creible en vez de
// "100% recurrentes", que es lo que pasa si el pool es chico.
const PADRON = 165
const REGULARES = 55

const nombreDe = (i: number) => `${PILA[i % PILA.length]} ${APELLIDOS[(i * 13 + 3) % APELLIDOS.length]}`

const telefono = (i: number) => `341${String(4000000 + i * 73813).slice(0, 7)}`

export function generarSeed(): { turnos: Turno[]; excepciones: Excepcion[] } {
  const hoy = hoyISO()
  const r = rng(20260910)
  const turnos: Turno[] = []

  const excepciones: Excepcion[] = [
    {
      id: 'exc-1', fecha: sumarDias(hoy, 12), tipo: 'cerrado',
      motivo: 'Feriado',
    },
    {
      id: 'exc-2', fecha: sumarDias(hoy, 4), profesionalId: 'belen',
      tipo: 'cerrado', motivo: 'Curso de coloración',
    },
  ]

  // 35 dias atras (historial para las estadisticas) hasta 14 adelante
  // (agenda con turnos ya tomados).
  for (let d = -35; d <= 14; d++) {
    const fecha = sumarDias(hoy, d)
    const pasado = d < 0

    for (const p of PROFESIONALES) {
      if (!p.horario[diaSemana(fecha)]) continue

      const objetivo = 2 + Math.floor(r() * 4)
      for (let k = 0; k < objetivo; k++) {
        // Elige un servicio que esa profesional efectivamente hace.
        const sid = p.serviciosIds[Math.floor(r() * p.serviciosIds.length)]
        const serv = servicioPorId(sid)
        if (!serv) continue

        // A veces se suma un segundo servicio: color + corte es el ticket real.
        const ids = [sid]
        if (r() < 0.22) {
          const extra = p.serviciosIds.find(
            (x) => x !== sid && (servicioPorId(x)?.duracionMin ?? 999) <= 45,
          )
          if (extra) ids.push(extra)
        }
        const duracion = ids.reduce((a, x) => a + (servicioPorId(x)?.duracionMin ?? 0), 0)

        // Se apoya en el mismo motor que usa la clienta: el seed nunca crea un
        // turno que el sistema consideraria imposible.
        const posibles = generarSlots(
          fecha, p, duracion, turnos, excepciones, { ignorarPasado: true },
        )
        if (!posibles.length) continue
        const hora = posibles[Math.floor(r() * posibles.length)]

        // 62% de los turnos son de clientas que ya vinieron; el resto, nuevas.
        const idx = r() < 0.62
          ? Math.floor(r() * REGULARES)
          : REGULARES + Math.floor(r() * (PADRON - REGULARES))
        const dado = r()
        const estado: Turno['estado'] = pasado
          ? (dado < 0.08 ? 'no-asistio' : dado < 0.14 ? 'cancelado' : 'completado')
          : (dado < 0.25 ? 'pendiente' : 'confirmado')

        turnos.push({
          id: `s-${fecha}-${p.id}-${k}`,
          fecha, hora, duracionMin: duracion,
          servicioIds: ids,
          profesionalId: p.id,
          cliente: { nombre: nombreDe(idx), telefono: telefono(idx) },
          precioTotal: ids.reduce((a, x) => a + (servicioPorId(x)?.precio ?? 0), 0),
          estado,
          canal: r() < 0.45 ? 'manual' : 'web',
          creadoEn: new Date().toISOString(),
        })
      }
    }
  }
  return { turnos, excepciones }
}

export const SERVICIOS_SEED = SERVICIOS
