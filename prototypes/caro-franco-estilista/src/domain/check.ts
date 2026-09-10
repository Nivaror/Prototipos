// Self-check del motor de disponibilidad. Correr: node src/domain/check.ts
// Es la unica logica del prototipo donde un bug no se ve a simple vista:
// un slot mal generado se nota recien cuando dos clientas caen a la misma hora.
import assert from 'node:assert'
import { generarSlots, buscarPrimeraDisponible, profesionalesPara } from './disponibilidad.ts'
import { PROFESIONALES, SERVICIOS } from '../config/negocio.ts'
import type { Turno } from './tipos.ts'
import { diaSemana, sumarDias, hoyISO } from './fecha.ts'

const caro = PROFESIONALES.find((p) => p.id === 'caro')!
const rocio = PROFESIONALES.find((p) => p.id === 'rocio')!

// Un martes futuro (dia 2) y un miercoles futuro, lejos de hoy para que la
// anticipacion minima no interfiera.
let martes = sumarDias(hoyISO(), 3)
while (diaSemana(martes) !== 2) martes = sumarDias(martes, 1)
const jueves = (() => { let d = martes; while (diaSemana(d) !== 4) d = sumarDias(d, 1); return d })()

const turno = (o: Partial<Turno>): Turno => ({
  id: 'x', fecha: martes, hora: '10:00', duracionMin: 60, servicioIds: ['corte'],
  profesionalId: 'caro', cliente: { nombre: 'T', telefono: '1' }, precioTotal: 0,
  estado: 'confirmado', canal: 'web', creadoEn: '', ...o,
})

// 1. Dia que no trabaja -> sin slots. Rocio no trabaja los martes.
assert.equal(generarSlots(martes, rocio, 60, [], []).length, 0, 'rocio no trabaja martes')

// 2. Caro si trabaja el martes 09:00-19:00 con corte 13:00-14:00.
const slotsCaro = generarSlots(martes, caro, 60, [], [])
assert.ok(slotsCaro.includes('09:00'), 'abre 09:00')
assert.ok(!slotsCaro.includes('12:30'), 'un turno de 60min a las 12:30 pisa el almuerzo')
assert.ok(!slotsCaro.includes('13:00'), 'no se reserva sobre el almuerzo')
assert.ok(slotsCaro.includes('14:00'), 'vuelve despues del almuerzo')
assert.ok(!slotsCaro.includes('18:30'), 'un turno de 60min no entra antes de cerrar 19:00')
assert.ok(slotsCaro.includes('18:00'), 'el ultimo turno de 60min arranca 18:00')

// 3. Un servicio largo no entra a ultima hora. Balayage 210min, cierre 19:00.
const largos = generarSlots(martes, caro, 210, [], [])
assert.ok(!largos.includes('16:00'), 'balayage no entra a las 16:00')
assert.ok(largos.includes('14:00'), 'balayage si entra a las 14:00')

// 4. Solapamiento por intervalo, no por hora de inicio. Un turno 10:00-12:00
//    tiene que bloquear tambien las 11:00, que no es su hora de inicio.
const conOcupado = generarSlots(martes, caro, 60, [turno({ hora: '10:00', duracionMin: 120 })], [])
assert.ok(!conOcupado.includes('11:00'), 'las 11:00 caen dentro de un turno de 10:00 a 12:00')
assert.ok(!conOcupado.includes('09:30'), 'las 09:30 con 60min se pisan con el de las 10:00')
assert.ok(conOcupado.includes('12:00'), 'a las 12:00 ya esta libre')

// 5. Un turno cancelado no bloquea.
const cancelado = generarSlots(martes, caro, 60, [turno({ hora: '10:00', duracionMin: 120, estado: 'cancelado' })], [])
assert.ok(cancelado.includes('11:00'), 'un turno cancelado libera el horario')

// 6. Excepcion de cierre total del salon.
const cerrado = generarSlots(martes, caro, 60, [], [
  { id: 'e1', fecha: martes, tipo: 'cerrado', motivo: 'feriado' },
])
assert.equal(cerrado.length, 0, 'salon cerrado no ofrece slots')

// 7. Excepcion de una sola profesional no afecta a las demas.
const soloCaro = generarSlots(martes, caro, 60, [], [
  { id: 'e2', fecha: martes, profesionalId: 'belen', tipo: 'cerrado' },
])
assert.ok(soloCaro.length > 0, 'el bloqueo de belen no toca la agenda de caro')

// 8. Filtro por servicio: solo Rocio hace peinado de novia.
const novia = profesionalesPara(PROFESIONALES, ['peinado-novia'])
assert.deepEqual(novia.map((p) => p.id), ['rocio'], 'peinado de novia solo lo hace rocio')
// Un combo que ninguna cubre entera no devuelve a nadie.
assert.equal(profesionalesPara(PROFESIONALES, ['balayage', 'maquillaje-peinado']).length, 0,
  'ninguna hace balayage y maquillaje+peinado a la vez')

// 9. "Sin preferencia" encuentra a alguien y respeta el filtro de servicio.
const dur = SERVICIOS.find((s) => s.id === 'peinado-novia')!.duracionMin
const primera = buscarPrimeraDisponible(novia, dur, hoyISO(), [], [])
assert.ok(primera, 'hay un primer turno para peinado de novia')
assert.equal(primera!.profesionalId, 'rocio')
assert.ok([4, 5, 6].includes(diaSemana(primera!.fecha)), 'rocio solo trabaja jue/vie/sab')

// 10. Sin preferencia reparte por carga: con caro cargada ese dia, elige otra.
const cargada = Array.from({ length: 6 }, (_, i) =>
  turno({ id: 'c' + i, fecha: jueves, hora: `0${9 + i}:00`.slice(-5), duracionMin: 45 }))
const reparto = buscarPrimeraDisponible(
  PROFESIONALES.filter((p) => p.serviciosIds.includes('brushing')), 40, jueves, cargada, [])
assert.ok(reparto && reparto.profesionalId !== 'caro', 'con caro cargada elige otra profesional')

// 11. Fechas pasadas no ofrecen turnos.
assert.equal(generarSlots(sumarDias(hoyISO(), -1), caro, 60, [], []).length, 0, 'ayer no')

console.log('disponibilidad: 11 checks OK')

// 12. ignorarPasado habilita el historial del seed y la carga manual.
assert.ok(generarSlots(sumarDias(hoyISO(), -7), caro, 60, [], [], { ignorarPasado: true }).length > 0,
  'con ignorarPasado si se generan slots historicos')
console.log('disponibilidad: +1 check ignorarPasado OK')
