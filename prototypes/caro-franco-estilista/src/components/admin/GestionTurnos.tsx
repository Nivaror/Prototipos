'use client'

import { useMemo, useState } from 'react'
import s from './admin.module.css'
import { Estado, Modal } from '../ui'
import { PROFESIONALES, SERVICIOS, profesionalPorId, servicioPorId } from '@/config/negocio'
import { generarSlots } from '@/domain/disponibilidad'
import { duracionTexto, fechaCorta, fechaLarga, hoyISO, precioARS, rangoDias, sumarDias } from '@/domain/fecha'
import { useTurnos } from '@/hooks/useTurnos'
import type { EstadoTurno, Turno } from '@/domain/tipos'

const ESTADOS: EstadoTurno[] = ['pendiente', 'confirmado', 'completado', 'cancelado', 'no-asistio']

export default function GestionTurnos() {
  const { turnos, excepciones, listo, repo } = useTurnos()
  const [desde, setDesde] = useState(hoyISO())
  const [hasta, setHasta] = useState(sumarDias(hoyISO(), 30))
  const [estado, setEstado] = useState('todos')
  const [profesional, setProfesional] = useState('todas')
  const [servicio, setServicio] = useState('todos')
  const [reprogramar, setReprogramar] = useState<Turno | null>(null)
  const [notas, setNotas] = useState<Turno | null>(null)

  const filtrados = useMemo(() => turnos
    .filter((t) => t.fecha >= desde && t.fecha <= hasta)
    .filter((t) => estado === 'todos' || t.estado === estado)
    .filter((t) => profesional === 'todas' || t.profesionalId === profesional)
    .filter((t) => servicio === 'todos' || t.servicioIds.includes(servicio))
    .sort((a, b) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora)),
    [turnos, desde, hasta, estado, profesional, servicio])

  if (!listo) return <div className={s.vacio}>Cargando turnos...</div>

  return (
    <>
      <div className={s.filtros}>
        <div className="campo">
          <label htmlFor="f-desde">Desde</label>
          <input id="f-desde" type="date" value={desde} onChange={(e) => setDesde(e.target.value)} />
        </div>
        <div className="campo">
          <label htmlFor="f-hasta">Hasta</label>
          <input id="f-hasta" type="date" value={hasta} onChange={(e) => setHasta(e.target.value)} />
        </div>
        <div className="campo">
          <label htmlFor="f-estado">Estado</label>
          <select id="f-estado" value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option value="todos">Todos</option>
            {ESTADOS.map((x) => <option key={x} value={x}>{x === 'no-asistio' ? 'No asistió' : x[0].toUpperCase() + x.slice(1)}</option>)}
          </select>
        </div>
        <div className="campo">
          <label htmlFor="f-prof">Profesional</label>
          <select id="f-prof" value={profesional} onChange={(e) => setProfesional(e.target.value)}>
            <option value="todas">Todas</option>
            {PROFESIONALES.map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}
          </select>
        </div>
        <div className="campo">
          <label htmlFor="f-svc">Servicio</label>
          <select id="f-svc" value={servicio} onChange={(e) => setServicio(e.target.value)}>
            <option value="todos">Todos</option>
            {SERVICIOS.map((x) => <option key={x.id} value={x.id}>{x.nombre}</option>)}
          </select>
        </div>
        <span className="small muted" style={{ paddingBottom: '.7rem' }}>
          {filtrados.length} {filtrados.length === 1 ? 'turno' : 'turnos'}
        </span>
      </div>

      {filtrados.length === 0 ? (
        <div className={`card ${s.vacio}`}>
          No hay turnos con esos filtros. Probá ampliando el rango de fechas.
        </div>
      ) : (
        <div className={s.tablaWrap}>
          <table className={s.tabla}>
            <thead>
              <tr>
                <th>Cuándo</th><th>Clienta</th><th>Servicio</th><th>Profesional</th>
                <th>Estado</th><th style={{ textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((t) => (
                <tr key={t.id}>
                  <td>
                    <div>{fechaCorta(t.fecha)}</div>
                    <div className="small muted tnum">{t.hora} · {duracionTexto(t.duracionMin)}</div>
                  </td>
                  <td>
                    <div>{t.cliente.nombre}</div>
                    <div className="small muted tnum">{t.cliente.telefono}</div>
                    {t.notas && <div className="tiny muted">{t.notas}</div>}
                  </td>
                  <td>
                    <div>{t.servicioIds.map((x) => servicioPorId(x)?.nombre).join(' + ')}</div>
                    {t.precioTotal !== null && <div className="small muted tnum">{precioARS(t.precioTotal)}</div>}
                  </td>
                  <td>
                    <div>{profesionalPorId(t.profesionalId)?.nombre}</div>
                    <div className="tiny muted">{t.canal === 'web' ? 'online' : 'salón'}</div>
                  </td>
                  <td><Estado estado={t.estado} /></td>
                  <td>
                    <div className={s.acciones}>
                      {t.estado === 'pendiente' && <button className={s.accion} onClick={() => repo.actualizarTurno(t.id, { estado: 'confirmado' })}>Confirmar</button>}
                      {t.estado === 'confirmado' && <button className={s.accion} onClick={() => repo.actualizarTurno(t.id, { estado: 'completado' })}>Completar</button>}
                      {t.estado !== 'no-asistio' && t.estado !== 'completado' && (
                        <button className={s.accion} onClick={() => repo.actualizarTurno(t.id, { estado: 'no-asistio' })}>No asistió</button>
                      )}
                      <button className={s.accion} onClick={() => setReprogramar(t)}>Reprogramar</button>
                      <button className={s.accion} onClick={() => setNotas(t)}>Notas</button>
                      {t.estado !== 'cancelado' && <button className={s.accion} onClick={() => repo.actualizarTurno(t.id, { estado: 'cancelado' })}>Cancelar</button>}
                      <button
                        className={`${s.accion} ${s.accionMal}`}
                        onClick={() => confirm(`¿Eliminar el turno de ${t.cliente.nombre}?`) && repo.eliminarTurno(t.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {reprogramar && (
        <Reprogramar
          turno={reprogramar} turnos={turnos} excepciones={excepciones}
          onCerrar={() => setReprogramar(null)}
          onGuardar={(fecha, hora) => { repo.actualizarTurno(reprogramar.id, { fecha, hora }); setReprogramar(null) }}
        />
      )}

      {notas && (
        <EditarNotas
          turno={notas} onCerrar={() => setNotas(null)}
          onGuardar={(n) => { repo.actualizarTurno(notas.id, { notas: n }); setNotas(null) }}
        />
      )}
    </>
  )
}

function Reprogramar({
  turno, turnos, excepciones, onCerrar, onGuardar,
}: {
  turno: Turno; turnos: Turno[]; excepciones: import('@/domain/tipos').Excepcion[]
  onCerrar: () => void; onGuardar: (fecha: string, hora: string) => void
}) {
  const [fecha, setFecha] = useState(turno.fecha)
  const [hora, setHora] = useState('')
  const p = profesionalPorId(turno.profesionalId)!

  // Reusa el mismo motor que la clienta: reprogramar no puede generar un
  // horario que el sistema no aceptaria en una reserva normal.
  const libres = useMemo(
    () => generarSlots(fecha, p, turno.duracionMin, turnos.filter((t) => t.id !== turno.id), excepciones),
    [fecha, p, turno, turnos, excepciones],
  )
  const dias = useMemo(() => rangoDias(hoyISO(), 30), [])

  return (
    <Modal titulo={`Reprogramar a ${turno.cliente.nombre}`} onCerrar={onCerrar}>
      <p className="small muted">
        Ahora: {fechaLarga(turno.fecha)} a las {turno.hora} con {p.nombre}.
      </p>
      <div className="campo">
        <label htmlFor="rp-dia">Nuevo día</label>
        <select id="rp-dia" value={fecha} onChange={(e) => { setFecha(e.target.value); setHora('') }}>
          {dias.map((d) => <option key={d} value={d}>{fechaLarga(d)}</option>)}
        </select>
      </div>
      <div className="campo">
        <label htmlFor="rp-hora">Nuevo horario</label>
        <select id="rp-hora" value={hora} onChange={(e) => setHora(e.target.value)}>
          <option value="">Elegí un horario</option>
          {libres.map((h) => <option key={h} value={h}>{h}</option>)}
        </select>
        {libres.length === 0 && <span className="error">{p.nombre} no tiene lugar ese día para {duracionTexto(turno.duracionMin)}.</span>}
      </div>
      <button className="btn btn-accent" disabled={!hora} onClick={() => onGuardar(fecha, hora)}>
        Mover turno
      </button>
    </Modal>
  )
}

function EditarNotas({
  turno, onCerrar, onGuardar,
}: { turno: Turno; onCerrar: () => void; onGuardar: (n: string) => void }) {
  const [n, setN] = useState(turno.notas ?? '')
  return (
    <Modal titulo={`Notas de ${turno.cliente.nombre}`} onCerrar={onCerrar}>
      <div className="campo">
        <label htmlFor="nt">Notas</label>
        <textarea id="nt" rows={4} value={n} onChange={(e) => setN(e.target.value)} placeholder="Tono usado, alergias, preferencias" />
      </div>
      <button className="btn btn-accent" onClick={() => onGuardar(n)}>Guardar</button>
    </Modal>
  )
}
