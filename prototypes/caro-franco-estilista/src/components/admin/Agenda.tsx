'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import s from './admin.module.css'
import { Estado, Modal } from '../ui'
import { NEGOCIO, PROFESIONALES, SERVICIOS, profesionalPorId, servicioPorId } from '@/config/negocio'
import { generarSlots, turnosBloqueantes } from '@/domain/disponibilidad'
import { minutosDisponibles } from '@/domain/estadisticas'
import {
  aHora, aMin, diaSemana, duracionTexto, fechaLarga, hoyISO, nombreDiaCorto,
  numeroDia, precioARS, rangoDias, sumarDias,
} from '@/domain/fecha'
import { useTurnos } from '@/hooks/useTurnos'
import type { EstadoTurno, Profesional, Turno } from '@/domain/tipos'

const PX_MIN = 1.15
// Respiro arriba y abajo para que la primera etiqueta de hora no quede cortada.
const PAD = 10

const CLASE: Record<EstadoTurno, string> = {
  confirmado: '', pendiente: s.tPendiente, completado: s.tCompletado,
  cancelado: s.tCancelado, 'no-asistio': s.tNoAsistio,
}

export default function Agenda() {
  const { turnos, excepciones, listo, repo } = useTurnos()
  const [fecha, setFecha] = useState(hoyISO())
  const [vista, setVista] = useState<'dia' | 'semana'>('dia')
  const [filtro, setFiltro] = useState<string>('todas')
  const [abierto, setAbierto] = useState<Turno | null>(null)
  const [cargando, setCargando] = useState(false)
  const [bloqueando, setBloqueando] = useState(false)

  const delDia = useMemo(() => turnos.filter((t) => t.fecha === fecha), [turnos, fecha])

  const visibles = useMemo(
    () => PROFESIONALES.filter((p) => filtro === 'todas' || p.id === filtro),
    [filtro],
  )

  // La grilla arranca en la apertura mas temprana del dia y termina en el
  // cierre mas tardio: no tiene sentido dibujar horas que nadie trabaja.
  const { inicio, fin } = useMemo(() => {
    const dow = diaSemana(fecha)
    const abiertos = PROFESIONALES.map((p) => p.horario[dow]).filter(Boolean) as { desde: string; hasta: string }[]
    if (!abiertos.length) return { inicio: 9 * 60, fin: 19 * 60 }
    return {
      inicio: Math.min(...abiertos.map((h) => aMin(h.desde))),
      fin: Math.max(...abiertos.map((h) => aMin(h.hasta))),
    }
  }, [fecha])

  const alto = (fin - inicio) * PX_MIN + PAD * 2
  const horas = useMemo(() => {
    const out: number[] = []
    for (let h = Math.ceil(inicio / 60) * 60; h <= fin; h += 60) out.push(h)
    return out
  }, [inicio, fin])

  const cerradoTodo = excepciones.find((e) => e.fecha === fecha && !e.profesionalId && e.tipo === 'cerrado')

  if (!listo) return <div className={s.vacio}>Cargando la agenda...</div>

  return (
    <>
      <div className={s.barra}>
        <div className={s.navDia}>
          <button className={s.navBtn} onClick={() => setFecha(sumarDias(fecha, vista === 'dia' ? -1 : -7))} aria-label="Anterior">‹</button>
          <button className={s.navBtn} onClick={() => setFecha(sumarDias(fecha, vista === 'dia' ? 1 : 7))} aria-label="Siguiente">›</button>
        </div>
        <span className={`${s.fechaTit} h3`}>{fechaLarga(fecha)}</span>
        {fecha !== hoyISO() && (
          <button className="btn btn-ghost btn-sm" onClick={() => setFecha(hoyISO())}>Hoy</button>
        )}
        <div className="sep" style={{ flex: 1 }} />
        <div className={s.tabs}>
          <button className={`${s.tab} ${vista === 'dia' ? s.tabOn : ''}`} onClick={() => setVista('dia')}>Día</button>
          <button className={`${s.tab} ${vista === 'semana' ? s.tabOn : ''}`} onClick={() => setVista('semana')}>Semana</button>
        </div>
        {vista === 'dia' && (
          <select
            value={filtro} onChange={(e) => setFiltro(e.target.value)}
            style={{ padding: '.45rem .7rem', borderRadius: 'var(--r-sm)', border: '1px solid var(--line-2)', background: 'var(--surface)' }}
            aria-label="Filtrar por profesional"
          >
            <option value="todas">Todas</option>
            {PROFESIONALES.map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}
          </select>
        )}
        <button className="btn btn-ghost btn-sm" onClick={() => setBloqueando(true)}>Bloquear tiempo</button>
        <button className="btn btn-accent btn-sm" onClick={() => setCargando(true)}>Cargar turno</button>
      </div>

      {cerradoTodo && (
        <p className="chip chip-bad" style={{ marginBottom: '1rem' }}>
          Salón cerrado: {cerradoTodo.motivo ?? 'sin actividad'}
        </p>
      )}

      {vista === 'dia' ? (
        <>
        {visibles.length > 2 && (
          <p className={s.pista}>Deslizá la agenda para ver a las demás.</p>
        )}
        <div className={s.agendaScroll}>
          <div className={s.agenda} style={{ ['--cols' as string]: visibles.length }}>
            <div className={s.cabCelda} />
            {visibles.map((p) => {
              const suyos = turnosBloqueantes(delDia, p.id, fecha)
              const mins = suyos.reduce((a, t) => a + t.duracionMin, 0)
              const disp = minutosDisponibles(p, [fecha])
              return (
                <div className={s.cabCelda} key={p.id}>
                  <Image src={p.foto} alt="" width={30} height={30} className="avatar" />
                  <span className={s.cabNom}>
                    <b>{p.nombre}</b>
                    <span>{suyos.length} turnos · {disp ? Math.round((mins / disp) * 100) : 0}% ocupada</span>
                  </span>
                </div>
              )
            })}

            <div className={s.ejeCelda} style={{ height: alto }}>
              {horas.map((h) => (
                <span key={h} className={s.ejeHora} style={{ top: (h - inicio) * PX_MIN + PAD }}>{aHora(h)}</span>
              ))}
            </div>

            {visibles.map((p) => {
              const dow = diaSemana(fecha)
              const horario = p.horario[dow]
              const suyos = delDia.filter((t) => t.profesionalId === p.id)
              const bloqueos = excepciones.filter(
                (e) => e.fecha === fecha && (!e.profesionalId || e.profesionalId === p.id),
              )
              return (
                <div key={p.id} className={`${s.col} ${!horario ? s.colCerrada : ''}`} style={{ height: alto }}>
                  {horas.map((h) => (
                    <span key={h} className={s.lineaHora} style={{ top: (h - inicio) * PX_MIN + PAD }} />
                  ))}

                  {horario?.cortes?.map((c, i) => (
                    <span key={i} className={s.bloqueo} style={{
                      top: (aMin(c.desde) - inicio) * PX_MIN + PAD,
                      height: (aMin(c.hasta) - aMin(c.desde)) * PX_MIN,
                    }}>Almuerzo</span>
                  ))}

                  {bloqueos.filter((b) => b.tipo === 'cerrado').map((b) => (
                    <span key={b.id} className={s.bloqueo} style={{ top: 0, height: alto }}>
                      {b.motivo ?? 'Bloqueado'}
                    </span>
                  ))}

                  {suyos.map((t) => {
                    const top = (aMin(t.hora) - inicio) * PX_MIN + PAD
                    const h = Math.max(t.duracionMin * PX_MIN, 26)
                    return (
                      <button
                        key={t.id} className={`${s.turno} ${CLASE[t.estado]}`}
                        style={{ top, height: h }} onClick={() => setAbierto(t)}
                      >
                        <b>{t.hora} {t.cliente.nombre}</b>
                        {h > 38 && <small>{t.servicioIds.map((x) => servicioPorId(x)?.nombre).join(' + ')}</small>}
                      </button>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
        </>
      ) : (
        <VistaSemana fecha={fecha} turnos={turnos} onDia={(d) => { setFecha(d); setVista('dia') }} />
      )}

      {abierto && (
        <DetalleTurno
          turno={abierto} onCerrar={() => setAbierto(null)}
          onEstado={(e) => { repo.actualizarTurno(abierto.id, { estado: e }); setAbierto(null) }}
          onNotas={(n) => { repo.actualizarTurno(abierto.id, { notas: n }); setAbierto(null) }}
          onBorrar={() => { repo.eliminarTurno(abierto.id); setAbierto(null) }}
        />
      )}

      {cargando && (
        <CargaManual
          fecha={fecha} turnos={turnos} excepciones={excepciones}
          onCerrar={() => setCargando(false)}
          onGuardar={(t) => { repo.crearTurno(t); setCargando(false) }}
        />
      )}

      {bloqueando && (
        <BloquearTiempo
          fecha={fecha}
          onCerrar={() => setBloqueando(false)}
          onGuardar={(x) => { repo.crearExcepcion(x); setBloqueando(false) }}
        />
      )}
    </>
  )
}

function VistaSemana({ fecha, turnos, onDia }: { fecha: string; turnos: Turno[]; onDia: (d: string) => void }) {
  const dias = useMemo(() => {
    const inicioSemana = sumarDias(fecha, -diaSemana(fecha))
    return rangoDias(inicioSemana, 7)
  }, [fecha])

  return (
    <div className={s.tablaWrap}>
      <table className={s.semana}>
        <thead>
          <tr>
            <th>Profesional</th>
            {dias.map((d) => (
              <th key={d}>
                <button onClick={() => onDia(d)} style={{ textAlign: 'left' }}>
                  {nombreDiaCorto(d)} {numeroDia(d)}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PROFESIONALES.map((p) => (
            <tr key={p.id}>
              <td><b style={{ fontWeight: 500 }}>{p.nombre}</b></td>
              {dias.map((d) => {
                const suyos = turnosBloqueantes(turnos, p.id, d)
                const mins = suyos.reduce((a, t) => a + t.duracionMin, 0)
                const disp = minutosDisponibles(p, [d])
                const pct = disp ? Math.min(100, Math.round((mins / disp) * 100)) : 0
                return (
                  <td key={d}>
                    {disp === 0 ? (
                      <span className="tiny muted">Libre</span>
                    ) : (
                      <div className={s.carga}>
                        <span className="tiny tnum">{suyos.length} · {pct}%</span>
                        <span className={s.cargaBar}><i style={{ width: `${pct}%` }} /></span>
                      </div>
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function DetalleTurno({
  turno, onCerrar, onEstado, onNotas, onBorrar,
}: {
  turno: Turno; onCerrar: () => void
  onEstado: (e: EstadoTurno) => void; onNotas: (n: string) => void; onBorrar: () => void
}) {
  const [notas, setNotas] = useState(turno.notas ?? '')
  const p = profesionalPorId(turno.profesionalId)

  return (
    <Modal titulo={turno.cliente.nombre} onCerrar={onCerrar}>
      <div style={{ display: 'grid', gap: '.45rem' }}>
        <Estado estado={turno.estado} />
        <div className="small">
          {fechaLarga(turno.fecha)} · {turno.hora} a {aHora(aMin(turno.hora) + turno.duracionMin)}
        </div>
        <div className="small muted">
          {turno.servicioIds.map((x) => servicioPorId(x)?.nombre).join(' + ')} · {duracionTexto(turno.duracionMin)}
        </div>
        <div className="small muted">Con {p?.nombre} · {turno.canal === 'web' ? 'reservado online' : 'cargado por el salón'}</div>
        <div className="small muted">Tel. {turno.cliente.telefono}</div>
        {turno.precioTotal !== null && <div className="small tnum">{precioARS(turno.precioTotal)}</div>}
      </div>

      <div className="campo">
        <label htmlFor="notas">Notas</label>
        <textarea id="notas" rows={2} value={notas} onChange={(e) => setNotas(e.target.value)} placeholder="Tono, alergias, lo que haya que recordar" />
      </div>

      <div className={s.acciones} style={{ justifyContent: 'flex-start' }}>
        {turno.estado !== 'confirmado' && <button className={s.accion} onClick={() => onEstado('confirmado')}>Confirmar</button>}
        {turno.estado !== 'completado' && <button className={s.accion} onClick={() => onEstado('completado')}>Completar</button>}
        {turno.estado !== 'no-asistio' && <button className={s.accion} onClick={() => onEstado('no-asistio')}>No asistió</button>}
        {turno.estado !== 'cancelado' && <button className={s.accion} onClick={() => onEstado('cancelado')}>Cancelar</button>}
      </div>
      <div className={s.acciones} style={{ justifyContent: 'space-between' }}>
        <button className={`${s.accion} ${s.accionMal}`} onClick={onBorrar}>Eliminar turno</button>
        <button className="btn btn-accent btn-sm" onClick={() => onNotas(notas)}>Guardar notas</button>
      </div>
    </Modal>
  )
}

function CargaManual({
  fecha, turnos, excepciones, onCerrar, onGuardar,
}: {
  fecha: string; turnos: Turno[]; excepciones: import('@/domain/tipos').Excepcion[]
  onCerrar: () => void; onGuardar: (t: Omit<Turno, 'id' | 'creadoEn'>) => void
}) {
  const [dia, setDia] = useState(fecha)
  const [profesionalId, setProfesionalId] = useState(PROFESIONALES[0].id)
  const [servicioId, setServicioId] = useState(SERVICIOS[0].id)
  const [hora, setHora] = useState('')
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [forzar, setForzar] = useState(false)

  const profesional = profesionalPorId(profesionalId) as Profesional
  const servicio = servicioPorId(servicioId)!
  const libres = useMemo(
    () => generarSlots(dia, profesional, servicio.duracionMin, turnos, excepciones, { ignorarPasado: true }),
    [dia, profesional, servicio, turnos, excepciones],
  )

  // Todos los horarios de la jornada, libres u ocupados: el turno que entra por
  // telefono no siempre respeta la grilla, y el salón necesita poder forzarlo.
  const todos = useMemo(() => {
    const h = profesional.horario[diaSemana(dia)]
    if (!h) return []
    const out: string[] = []
    for (let t = aMin(h.desde); t + servicio.duracionMin <= aMin(h.hasta); t += NEGOCIO.pasoSlotMin) out.push(aHora(t))
    return out
  }, [profesional, dia, servicio])

  const opciones = forzar ? todos : libres
  const ocupado = forzar && hora !== '' && !libres.includes(hora)

  return (
    <Modal titulo="Cargar turno" onCerrar={onCerrar} ancho={520}>
      <div style={{ display: 'grid', gap: '.8rem', gridTemplateColumns: '1fr 1fr' }}>
        <div className="campo">
          <label htmlFor="cm-dia">Día</label>
          <input id="cm-dia" type="date" value={dia} onChange={(e) => { setDia(e.target.value); setHora('') }} />
        </div>
        <div className="campo">
          <label htmlFor="cm-prof">Profesional</label>
          <select id="cm-prof" value={profesionalId} onChange={(e) => { setProfesionalId(e.target.value); setHora('') }}>
            {PROFESIONALES.map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}
          </select>
        </div>
        <div className="campo" style={{ gridColumn: '1 / -1' }}>
          <label htmlFor="cm-svc">Servicio</label>
          <select id="cm-svc" value={servicioId} onChange={(e) => { setServicioId(e.target.value); setHora('') }}>
            {PROFESIONALES.find((p) => p.id === profesionalId)!.serviciosIds.map((id) => {
              const x = servicioPorId(id)!
              return <option key={id} value={id}>{x.nombre} ({duracionTexto(x.duracionMin)})</option>
            })}
          </select>
        </div>
        <div className="campo">
          <label htmlFor="cm-nom">Nombre</label>
          <input id="cm-nom" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Clienta" />
        </div>
        <div className="campo">
          <label htmlFor="cm-tel">Teléfono</label>
          <input id="cm-tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="341 555 0000" inputMode="tel" />
        </div>
      </div>

      <div className="campo">
        <label htmlFor="cm-hora">Horario</label>
        <select id="cm-hora" value={hora} onChange={(e) => setHora(e.target.value)}>
          <option value="">Elegí un horario</option>
          {opciones.map((h) => (
            <option key={h} value={h}>{h}{forzar && !libres.includes(h) ? ' (ocupado)' : ''}</option>
          ))}
        </select>
        {opciones.length === 0 && <span className="error">No trabaja ese día.</span>}
      </div>

      <label className="small muted" style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
        <input type="checkbox" checked={forzar} onChange={(e) => { setForzar(e.target.checked); setHora('') }} />
        Mostrar también horarios ocupados
      </label>
      {ocupado && (
        <p className="chip chip-warn">Ese horario ya tiene un turno. Se va a superponer.</p>
      )}

      <button
        className="btn btn-accent"
        disabled={!hora || nombre.trim().length < 2}
        onClick={() => onGuardar({
          fecha: dia, hora, duracionMin: servicio.duracionMin, servicioIds: [servicioId],
          profesionalId, cliente: { nombre: nombre.trim(), telefono: telefono.trim() || 's/d' },
          precioTotal: servicio.precio, estado: 'confirmado', canal: 'manual',
        })}
      >
        Guardar turno
      </button>
    </Modal>
  )
}

function BloquearTiempo({
  fecha, onCerrar, onGuardar,
}: {
  fecha: string; onCerrar: () => void
  onGuardar: (x: Omit<import('@/domain/tipos').Excepcion, 'id'>) => void
}) {
  const [dia, setDia] = useState(fecha)
  const [quien, setQuien] = useState('todo')
  const [motivo, setMotivo] = useState('')

  return (
    <Modal titulo="Bloquear tiempo" onCerrar={onCerrar}>
      <p className="small muted">
        Feriado, vacaciones, un turno médico. El día bloqueado deja de ofrecer horarios.
      </p>
      <div className="campo">
        <label htmlFor="bl-dia">Día</label>
        <input id="bl-dia" type="date" value={dia} onChange={(e) => setDia(e.target.value)} />
      </div>
      <div className="campo">
        <label htmlFor="bl-quien">A quién afecta</label>
        <select id="bl-quien" value={quien} onChange={(e) => setQuien(e.target.value)}>
          <option value="todo">Todo el salón</option>
          {PROFESIONALES.map((p) => <option key={p.id} value={p.id}>Solo {p.nombre}</option>)}
        </select>
      </div>
      <div className="campo">
        <label htmlFor="bl-motivo">Motivo</label>
        <input id="bl-motivo" value={motivo} onChange={(e) => setMotivo(e.target.value)} placeholder="Feriado, vacaciones..." />
      </div>
      <button
        className="btn btn-accent"
        onClick={() => onGuardar({
          fecha: dia, tipo: 'cerrado', motivo: motivo.trim() || 'Bloqueado',
          ...(quien === 'todo' ? {} : { profesionalId: quien }),
        })}
      >
        Bloquear
      </button>
    </Modal>
  )
}
