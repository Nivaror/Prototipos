'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import s from './Reserva.module.css'
import { CATEGORIAS, NEGOCIO, PROFESIONALES, SERVICIOS, profesionalPorId, servicioPorId } from '@/config/negocio'
import { buscarPrimeraDisponible, generarSlots, profesionalesPara } from '@/domain/disponibilidad'
import { aMin, duracionTexto, fechaLarga, hoyISO, nombreDiaCorto, numeroDia, nombreMes, precioARS, rangoDias, sumarDias } from '@/domain/fecha'
import { useTurnos } from '@/hooks/useTurnos'
import type { Profesional } from '@/domain/tipos'

const PASOS = ['Servicio', 'Con quién', 'Día', 'Hora', 'Tus datos'] as const
const SIN_PREF = '__sin_preferencia__'

export default function Reserva({ compacto = false }: { compacto?: boolean }) {
  const { turnos, excepciones, listo, repo } = useTurnos()

  const [paso, setPaso] = useState(0)
  const [servicioIds, setServicioIds] = useState<string[]>([])
  const [categoria, setCategoria] = useState(CATEGORIAS[0])
  const [profesionalId, setProfesionalId] = useState<string | null>(null)
  const [fecha, setFecha] = useState<string | null>(null)
  const [hora, setHora] = useState<string | null>(null)
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [errores, setErrores] = useState<{ nombre?: string; telefono?: string }>({})
  const [confirmado, setConfirmado] = useState<null | { fecha: string; hora: string; profesionalId: string }>(null)

  const duracion = useMemo(
    () => servicioIds.reduce((a, id) => a + (servicioPorId(id)?.duracionMin ?? 0), 0),
    [servicioIds],
  )
  const precio = useMemo(
    () => servicioIds.reduce((a, id) => a + (servicioPorId(id)?.precio ?? 0), 0),
    [servicioIds],
  )

  const habilitadas = useMemo(
    () => profesionalesPara(PROFESIONALES, servicioIds),
    [servicioIds],
  )

  // La profesional efectiva: la elegida, o la de menor carga si eligio
  // "sin preferencia".
  const efectiva: Profesional | null = useMemo(() => {
    if (!profesionalId) return null
    if (profesionalId !== SIN_PREF) return profesionalPorId(profesionalId) ?? null
    if (!fecha) return null
    const r = buscarPrimeraDisponible(habilitadas, duracion, fecha, turnos, excepciones, 1)
    return r ? profesionalPorId(r.profesionalId) ?? null : null
  }, [profesionalId, fecha, habilitadas, duracion, turnos, excepciones])

  const dias = useMemo(() => rangoDias(hoyISO(), NEGOCIO.diasVisibles), [])

  // Un dia esta disponible si al menos una de las candidatas tiene hueco.
  const diasConHueco = useMemo(() => {
    if (!listo || !duracion || !profesionalId) return new Set<string>()
    const candidatas = profesionalId === SIN_PREF
      ? habilitadas
      : [profesionalPorId(profesionalId)].filter(Boolean) as Profesional[]
    const set = new Set<string>()
    for (const d of dias) {
      if (candidatas.some((p) => generarSlots(d, p, duracion, turnos, excepciones).length > 0)) set.add(d)
    }
    return set
  }, [listo, dias, duracion, profesionalId, habilitadas, turnos, excepciones])

  const slots = useMemo(() => {
    if (!fecha || !efectiva || !duracion) return []
    return generarSlots(fecha, efectiva, duracion, turnos, excepciones)
  }, [fecha, efectiva, duracion, turnos, excepciones])

  // Cascada hacia atras: si cambia el servicio, la profesional elegida puede
  // no hacerlo, y la hora elegida puede ya no existir. Sin esto el wizard
  // muestra horarios fantasma.
  useEffect(() => {
    if (profesionalId && profesionalId !== SIN_PREF && !habilitadas.some((p) => p.id === profesionalId)) {
      setProfesionalId(null); setFecha(null); setHora(null)
    }
  }, [habilitadas, profesionalId])

  useEffect(() => {
    if (fecha && diasConHueco.size && !diasConHueco.has(fecha)) { setFecha(null); setHora(null) }
  }, [diasConHueco, fecha])

  useEffect(() => {
    if (hora && !slots.includes(hora)) setHora(null)
  }, [slots, hora])

  const toggleServicio = (id: string) =>
    setServicioIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const puedeAvanzar = [
    servicioIds.length > 0,
    !!profesionalId,
    !!fecha,
    !!hora,
    nombre.trim().length > 1 && telefono.replace(/\D/g, '').length >= 6,
  ][paso]

  function confirmar() {
    const err: typeof errores = {}
    if (nombre.trim().length < 2) err.nombre = 'Poné tu nombre para identificar el turno.'
    if (telefono.replace(/\D/g, '').length < 6) err.telefono = 'Necesitamos un teléfono para avisarte cualquier cambio.'
    setErrores(err)
    if (Object.keys(err).length) return
    if (!fecha || !hora || !efectiva) return

    repo.crearTurno({
      fecha, hora, duracionMin: duracion, servicioIds,
      profesionalId: efectiva.id,
      cliente: { nombre: nombre.trim(), telefono: telefono.trim() },
      precioTotal: precio, estado: 'pendiente', canal: 'web',
    })
    setConfirmado({ fecha, hora, profesionalId: efectiva.id })
  }

  function reiniciar() {
    setConfirmado(null); setPaso(0); setServicioIds([]); setProfesionalId(null)
    setFecha(null); setHora(null); setNombre(''); setTelefono(''); setErrores({})
  }

  if (!listo) {
    return <div className={s.vacio}>Cargando la agenda...</div>
  }

  if (confirmado) {
    const p = profesionalPorId(confirmado.profesionalId)
    return (
      <div className="card">
        <div className={s.exito}>
          <div className={s.exitoIcon} aria-hidden>✓</div>
          <div>
            <h3 className="h2">Turno reservado</h3>
            <p className="lead" style={{ marginTop: '.4rem' }}>
              Te esperamos el {fechaLarga(confirmado.fecha)} a las {confirmado.hora} con {p?.nombre}.
            </p>
          </div>
          <div className={s.resumen} style={{ width: '100%', maxWidth: 420 }}>
            {servicioIds.map((id) => (
              <div className={s.fila} key={id}>
                <span>{servicioPorId(id)?.nombre}</span>
                <span className="muted tnum">{duracionTexto(servicioPorId(id)?.duracionMin ?? 0)}</span>
              </div>
            ))}
            <div className={`${s.fila} ${s.total}`}>
              <span>Total estimado</span>
              <span className="tnum">{precioARS(precio)}</span>
            </div>
          </div>
          <div className={s.barra}>
            <a className="btn btn-accent" href={NEGOCIO.whatsapp} target="_blank" rel="noreferrer">
              Avisar por WhatsApp
            </a>
            <button className="btn btn-ghost" onClick={reiniciar}>Sacar otro turno</button>
          </div>
          <p className={s.aviso}>
            Queda como pendiente hasta que el salón lo confirme. Podés verlo entrar en vivo en el panel del salón.
          </p>
        </div>
      </div>
    )
  }

  const listaServicios = SERVICIOS.filter((x) => x.categoria === categoria)

  return (
    <div className={s.wizard}>
      <nav className={s.pasos} aria-label="Pasos de la reserva">
        {PASOS.map((p, i) => (
          <button
            key={p}
            className={`${s.paso} ${i === paso ? s.pasoActual : i < paso ? s.pasoHecho : ''}`}
            onClick={() => i < paso && setPaso(i)}
            disabled={i > paso}
            aria-current={i === paso ? 'step' : undefined}
          >
            <b>{i < paso ? '✓' : i + 1}</b>{p}
          </button>
        ))}
      </nav>

      <div className={`card ${s.panel}`} style={{ padding: compacto ? '1.1rem' : '1.4rem' }}>
        {paso === 0 && (
          <>
            <div className={s.tituloPaso}>
              <h3 className="h3">¿Qué te vas a hacer?</h3>
              <span className="small muted">Podés elegir más de uno</span>
            </div>
            <div className={s.cats}>
              {CATEGORIAS.map((c) => (
                <button key={c} className={`${s.cat} ${c === categoria ? s.catOn : ''}`} onClick={() => setCategoria(c)}>
                  {c}
                </button>
              ))}
            </div>
            <div className={s.servicios}>
              {listaServicios.map((x) => {
                const on = servicioIds.includes(x.id)
                return (
                  <button key={x.id} className={`${s.servicio} ${on ? s.servicioOn : ''}`} onClick={() => toggleServicio(x.id)} aria-pressed={on}>
                    <span className={s.tick} aria-hidden>✓</span>
                    <span className={s.servicioTxt}>
                      <span className={s.servicioTop}>
                        <b className="h3" style={{ fontSize: '.98rem' }}>{x.nombre}</b>
                        <span className="small tnum">{x.precio === null ? 'a consultar' : precioARS(x.precio)}</span>
                      </span>
                      <span className="small muted">{duracionTexto(x.duracionMin)}{x.descripcion ? ` · ${x.descripcion}` : ''}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </>
        )}

        {paso === 1 && (
          <>
            <div className={s.tituloPaso}>
              <h3 className="h3">¿Con quién?</h3>
              <span className="small muted">{duracionTexto(duracion)} en total</span>
            </div>
            {habilitadas.length === 0 ? (
              <p className={s.vacio}>
                Ninguna profesional hace toda esa combinación junta. Probá sacando un turno por separado.
              </p>
            ) : (
              <div className={s.profes}>
                <button
                  className={`${s.profe} ${s.profeSin} ${profesionalId === SIN_PREF ? s.profeOn : ''}`}
                  onClick={() => { setProfesionalId(SIN_PREF); setFecha(null); setHora(null) }}
                >
                  <span className={s.sinFoto} aria-hidden>✽</span>
                  <span>
                    <b className="h3" style={{ fontSize: '.98rem' }}>Sin preferencia</b>
                    <span className="small muted" style={{ display: 'block' }}>
                      Te asignamos a la que tenga más lugar
                    </span>
                  </span>
                </button>
                {habilitadas.map((p) => {
                  const prox = buscarPrimeraDisponible([p], duracion, hoyISO(), turnos, excepciones)
                  return (
                    <button
                      key={p.id}
                      className={`${s.profe} ${profesionalId === p.id ? s.profeOn : ''}`}
                      onClick={() => { setProfesionalId(p.id); setFecha(null); setHora(null) }}
                    >
                      <Image className="avatar" src={p.foto} alt="" width={52} height={52} />
                      <span>
                        <b className="h3" style={{ fontSize: '.98rem' }}>{p.nombre}</b>
                        <span className="small muted" style={{ display: 'block' }}>{p.rol}</span>
                        <span className="tiny" style={{ display: 'block', color: 'var(--accent-ink)', marginTop: '.15rem' }}>
                          {prox ? `Próximo turno: ${nombreDiaCorto(prox.fecha)} ${numeroDia(prox.fecha)}` : 'Sin lugar este mes'}
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>
            )}
          </>
        )}

        {paso === 2 && (
          <>
            <div className={s.tituloPaso}>
              <h3 className="h3">¿Qué día?</h3>
              <span className="small muted">Los días en gris no tienen lugar para {duracionTexto(duracion)}</span>
            </div>
            <div className={s.dias}>
              {dias.map((d) => {
                const hay = diasConHueco.has(d)
                return (
                  <button
                    key={d} disabled={!hay}
                    className={`${s.dia} ${fecha === d ? s.diaOn : ''}`}
                    onClick={() => { setFecha(d); setHora(null) }}
                  >
                    <span className={s.diaNom}>{nombreDiaCorto(d)}</span>
                    <span className={s.diaNum}>{numeroDia(d)}</span>
                    <span className={s.diaMes}>{nombreMes(d).slice(0, 3)}</span>
                  </button>
                )
              })}
            </div>
          </>
        )}

        {paso === 3 && (
          <>
            <div className={s.tituloPaso}>
              <h3 className="h3">¿A qué hora?</h3>
              <span className="small muted">
                {fecha ? fechaLarga(fecha) : ''}{efectiva ? ` · ${efectiva.nombre}` : ''}
              </span>
            </div>
            {slots.length === 0 ? (
              <p className={s.vacio}>No quedan horarios libres ese día. Probá con otro.</p>
            ) : (
              <>
                {([['Mañana', (h: string) => aMin(h) < 12 * 60], ['Tarde', (h: string) => aMin(h) >= 12 * 60]] as const).map(
                  ([titulo, filtro]) => {
                    const grupo = slots.filter(filtro)
                    if (!grupo.length) return null
                    return (
                      <div className={s.franja} key={titulo}>
                        <span className={s.franjaTit}>{titulo}</span>
                        <div className={s.horas}>
                          {grupo.map((h) => (
                            <button key={h} className={`${s.hora} ${hora === h ? s.horaOn : ''} tnum`} onClick={() => setHora(h)}>
                              {h}
                            </button>
                          ))}
                        </div>
                      </div>
                    )
                  },
                )}
              </>
            )}
          </>
        )}

        {paso === 4 && (
          <>
            <h3 className="h3">Tus datos</h3>
            <div className={s.form}>
              <div className="campo">
                <label htmlFor="r-nombre">Nombre y apellido</label>
                <input id="r-nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Como te anotamos" autoComplete="name" />
                {errores.nombre && <span className="error">{errores.nombre}</span>}
              </div>
              <div className="campo">
                <label htmlFor="r-tel">Teléfono</label>
                <input id="r-tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="341 555 0000" inputMode="tel" autoComplete="tel" />
                {errores.telefono && <span className="error">{errores.telefono}</span>}
              </div>
              <div className={s.resumen}>
                {servicioIds.map((id) => (
                  <div className={s.fila} key={id}>
                    <span>{servicioPorId(id)?.nombre}</span>
                    <span className="muted tnum">{duracionTexto(servicioPorId(id)?.duracionMin ?? 0)}</span>
                  </div>
                ))}
                <div className={s.fila}>
                  <span className="muted">Cuándo</span>
                  <span>{fecha ? fechaLarga(fecha) : ''} · {hora}</span>
                </div>
                <div className={s.fila}>
                  <span className="muted">Con</span>
                  <span>{efectiva?.nombre}</span>
                </div>
                <div className={`${s.fila} ${s.total}`}>
                  <span>Total estimado</span>
                  <span className="tnum">{precioARS(precio)}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className={s.barra}>
        {paso > 0 && <button className="btn btn-ghost btn-sm" onClick={() => setPaso(paso - 1)}>Atrás</button>}
        {paso < 4 ? (
          <button className="btn btn-accent" disabled={!puedeAvanzar} onClick={() => setPaso(paso + 1)}>Continuar</button>
        ) : (
          <button className="btn btn-accent" disabled={!puedeAvanzar} onClick={confirmar}>Confirmar turno</button>
        )}
        {duracion > 0 && (
          <span className="small muted">
            {servicioIds.length} {servicioIds.length === 1 ? 'servicio' : 'servicios'} · {duracionTexto(duracion)} · {precioARS(precio)}
          </span>
        )}
      </div>
    </div>
  )
}
