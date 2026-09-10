'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import s from './admin.module.css'
import { PROFESIONALES, servicioPorId } from '@/config/negocio'
import {
  ingresosTotales, picos, porProfesional, recurrencia, serviciosMasPedidos,
  tasaAusencias, ticketPromedio, turnosActivos,
} from '@/domain/estadisticas'
import { aHora, hoyISO, precioARS, rangoDias, sumarDias } from '@/domain/fecha'
import { useTurnos } from '@/hooks/useTurnos'

const PERIODOS = [
  { dias: 7, label: '7 días' },
  { dias: 30, label: '30 días' },
  { dias: 90, label: '90 días' },
]

const DIAS_NOM = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

export default function Estadisticas() {
  const { turnos, listo } = useTurnos()
  const [dias, setDias] = useState(30)

  const { desde, hasta, fechas } = useMemo(() => {
    const hasta = hoyISO()
    const desde = sumarDias(hasta, -(dias - 1))
    return { desde, hasta, fechas: rangoDias(desde, dias) }
  }, [dias])

  const rango = useMemo(
    () => turnos.filter((t) => t.fecha >= desde && t.fecha <= hasta),
    [turnos, desde, hasta],
  )

  const resumen = useMemo(() => porProfesional(rango, PROFESIONALES, fechas), [rango, fechas])
  const top = useMemo(() => serviciosMasPedidos(rango, (id) => servicioPorId(id)?.nombre ?? id), [rango])
  const ausencias = useMemo(() => tasaAusencias(rango), [rango])
  const recur = useMemo(() => recurrencia(rango), [rango])
  const pico = useMemo(() => picos(rango), [rango])
  const activos = turnosActivos(rango)
  const ingresos = ingresosTotales(rango)
  const ticket = ticketPromedio(rango)

  const maxIngreso = Math.max(1, ...resumen.map((r) => r.ingresos))
  const maxServicio = Math.max(1, ...top.map((t) => t.cantidad))
  const maxDia = Math.max(1, ...pico.porDia)
  const maxHora = Math.max(1, ...pico.porHora.map(([, n]) => n))

  if (!listo) return <div className={s.vacio}>Calculando...</div>

  return (
    <>
      <div className={s.barra}>
        <div className={s.tabs}>
          {PERIODOS.map((p) => (
            <button key={p.dias} className={`${s.tab} ${dias === p.dias ? s.tabOn : ''}`} onClick={() => setDias(p.dias)}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className={s.kpis}>
        <div className={`card ${s.kpi}`}>
          <b>Turnos</b>
          <span className={s.kpiNum}>{activos.length}</span>
          <span className={s.kpiPie}>{(activos.length / dias).toFixed(1)} por día</span>
        </div>
        <div className={`card ${s.kpi}`}>
          <b>Facturado</b>
          <span className={s.kpiNum}>{precioARS(ingresos)}</span>
          <span className={s.kpiPie}>solo turnos completados</span>
        </div>
        <div className={`card ${s.kpi}`}>
          <b>Ticket promedio</b>
          <span className={s.kpiNum}>{precioARS(Math.round(ticket))}</span>
          <span className={s.kpiPie}>por turno completado</span>
        </div>
        <div className={`card ${s.kpi}`}>
          <b>No asistieron</b>
          <span className={s.kpiNum}>{(ausencias.tasaNoShow * 100).toFixed(1)}%</span>
          <span className={s.kpiPie}>{ausencias.noAsistio} turnos perdidos sin aviso</span>
        </div>
      </div>

      <div className={s.grid2}>
        <div className={`card ${s.panelG}`}>
          <h3>Por profesional</h3>
          <div className={s.barras}>
            {resumen.map((r) => (
              <div className={s.barraFila} key={r.profesionalId}>
                <div className={s.barraTop}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '.45rem' }}>
                    <Image src={PROFESIONALES.find((p) => p.id === r.profesionalId)!.foto} alt="" width={22} height={22} className="avatar" />
                    {r.nombre}
                  </span>
                  <span className="tnum">{precioARS(r.ingresos)}</span>
                </div>
                <span className={s.barraPista}><i style={{ width: `${(r.ingresos / maxIngreso) * 100}%` }} /></span>
                <span className="tiny muted tnum">{r.turnos} turnos · {r.cancelados} cancelados · {r.noAsistio} sin avisar</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`card ${s.panelG}`}>
          <h3>Ocupación</h3>
          <p className="small muted" style={{ marginTop: '-.5rem' }}>
            Horas reservadas sobre las horas que cada una tiene abiertas.
          </p>
          <div className={s.barras}>
            {resumen.map((r) => (
              <div className={s.barraFila} key={r.profesionalId}>
                <div className={s.barraTop}>
                  <span>{r.nombre}</span>
                  <span className="tnum">{Math.round(r.ocupacion * 100)}%</span>
                </div>
                <span className={s.barraPista}><i style={{ width: `${r.ocupacion * 100}%` }} /></span>
                <span className="tiny muted tnum">
                  {Math.round(r.minutosReservados / 60)} h de {Math.round(r.minutosDisponibles / 60)} h
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={`card ${s.panelG}`}>
          <h3>Servicios más pedidos</h3>
          <div className={s.barras}>
            {top.map((t) => (
              <div className={s.barraFila} key={t.id}>
                <div className={s.barraTop}><span>{t.nombre}</span><span className="tnum">{t.cantidad}</span></div>
                <span className={s.barraPista}><i style={{ width: `${(t.cantidad / maxServicio) * 100}%` }} /></span>
              </div>
            ))}
          </div>
        </div>

        <div className={`card ${s.panelG}`}>
          <h3>Días y horarios pico</h3>
          <svg viewBox="0 0 320 110" role="img" aria-label="Turnos por día de la semana" style={{ width: '100%', height: 'auto' }}>
            {pico.porDia.map((n, i) => {
              const h = (n / maxDia) * 64
              return (
                <g key={i}>
                  <rect x={i * 45 + 8} y={84 - h} width={30} height={h} rx={4} fill="var(--accent)" opacity={n ? 1 : .25} />
                  <text x={i * 45 + 23} y={100} textAnchor="middle" fontSize={10} fill="var(--muted)">{DIAS_NOM[i]}</text>
                  {n > 0 && <text x={i * 45 + 23} y={80 - h} textAnchor="middle" fontSize={9} fill="var(--muted)">{n}</text>}
                </g>
              )
            })}
          </svg>
          <div className={s.barras}>
            {pico.porHora.map(([h, n]) => (
              <div className={s.barraFila} key={h}>
                <div className={s.barraTop}><span className="tnum">{aHora(h * 60)}</span><span className="tnum">{n}</span></div>
                <span className={s.barraPista}><i style={{ width: `${(n / maxHora) * 100}%` }} /></span>
              </div>
            ))}
          </div>
        </div>

        <div className={`card ${s.panelG}`}>
          <h3>Clientas</h3>
          <div className={s.barras}>
            <div className={s.barraFila}>
              <div className={s.barraTop}><span>Ya habían venido</span><span className="tnum">{recur.recurrentes}</span></div>
              <span className={s.barraPista}><i style={{ width: `${recur.tasa * 100}%` }} /></span>
            </div>
            <div className={s.barraFila}>
              <div className={s.barraTop}><span>Nuevas</span><span className="tnum">{recur.nuevas}</span></div>
              <span className={s.barraPista}><i style={{ width: `${(1 - recur.tasa) * 100}%`, background: 'var(--line-2)' }} /></span>
            </div>
          </div>
          <p className="small muted">
            {recur.clientas} clientas distintas en el período. {Math.round(recur.tasa * 100)}% volvió al menos una vez.
          </p>
        </div>

        <div className={`card ${s.panelG}`}>
          <h3>Cancelaciones y ausencias</h3>
          <div className={s.barras}>
            <div className={s.barraFila}>
              <div className={s.barraTop}><span>Canceladas con aviso</span><span className="tnum">{ausencias.cancelados}</span></div>
              <span className={s.barraPista}><i style={{ width: `${ausencias.tasaCancelacion * 100}%`, background: 'var(--line-2)' }} /></span>
            </div>
            <div className={s.barraFila}>
              <div className={s.barraTop}><span>No asistió, sin avisar</span><span className="tnum">{ausencias.noAsistio}</span></div>
              <span className={s.barraPista}><i style={{ width: `${ausencias.tasaNoShow * 100}%`, background: 'var(--bad)' }} /></span>
            </div>
          </div>
          <p className="small muted">
            Son problemas distintos. El de abajo es el que se corta pidiendo seña, y este número es el que lo justifica.
          </p>
        </div>
      </div>
    </>
  )
}
